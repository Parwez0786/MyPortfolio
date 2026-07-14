const express = require("express");
const Project = require("../models/Project");
const { protect } = require("../middleware/auth");
const { upload, uploadToCloudinary, cloudinary } = require("../config/cloudinary");

const router = express.Router();

const projectImageUpload = upload.any();

const collectUploadedFiles = (req) => {
  const files = Array.isArray(req.files) ? req.files : [];
  return files.filter(
    (f) =>
      f.fieldname === "images" ||
      f.fieldname === "image" ||
      (f.mimetype && f.mimetype.startsWith("image/"))
  );
};

const destroyImage = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (e) {
    console.error("Failed to delete image:", e.message);
  }
};

const uploadFiles = async (files = []) => {
  const uploaded = [];
  for (const file of files) {
    const result = await uploadToCloudinary(file.buffer);
    uploaded.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
  }
  return uploaded;
};

const parseRemovePublicIds = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return String(value)
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
  }
};

const getImages = (project) => {
  if (project.images && project.images.length) {
    return project.images.map((img) => ({
      url: img.url,
      publicId: img.publicId || "",
    }));
  }
  if (project.imgUrl) {
    return [{ url: project.imgUrl, publicId: project.imgPublicId || "" }];
  }
  return [];
};

const syncLegacyImageFields = (project, images) => {
  project.images = images;
  project.imgUrl = images[0]?.url || "";
  project.imgPublicId = images[0]?.publicId || "";
};

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects.map((p) => p.toClientJSON()));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", protect, projectImageUpload, async (req, res) => {
  try {
    const { title, description, ghLink, demoLink, isBlog } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const files = collectUploadedFiles(req);
    if (!files.length) {
      return res.status(400).json({ message: "At least one project image is required" });
    }

    const images = await uploadFiles(files);

    const project = await Project.create({
      title,
      description,
      ghLink: ghLink || "",
      demoLink: demoLink || "",
      isBlog: isBlog === "true" || isBlog === true,
      images,
      imgUrl: images[0].url,
      imgPublicId: images[0].publicId,
    });

    res.status(201).json(project.toClientJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", protect, projectImageUpload, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const { title, description, ghLink, demoLink, isBlog } = req.body;

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (ghLink !== undefined) project.ghLink = ghLink;
    if (demoLink !== undefined) project.demoLink = demoLink;
    if (isBlog !== undefined) {
      project.isBlog = isBlog === "true" || isBlog === true;
    }

    let images = getImages(project);
    const removeIds = new Set(parseRemovePublicIds(req.body.removePublicIds));

    if (removeIds.size) {
      const kept = [];
      for (const img of images) {
        if (img.publicId && removeIds.has(img.publicId)) {
          await destroyImage(img.publicId);
        } else {
          kept.push(img);
        }
      }
      images = kept;
    }

    const files = collectUploadedFiles(req);
    if (files.length > 0) {
      const uploaded = await uploadFiles(files);
      images = [...images, ...uploaded];
    }

    if (!images.length) {
      return res.status(400).json({ message: "Project must have at least one image" });
    }

    syncLegacyImageFields(project, images);
    await project.save();
    res.json(project.toClientJSON());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const images = getImages(project);
    for (const img of images) {
      await destroyImage(img.publicId);
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
