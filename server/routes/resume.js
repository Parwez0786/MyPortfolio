const express = require("express");
const fs = require("fs");
const path = require("path");
const Resume = require("../models/Resume");
const { protect } = require("../middleware/auth");
const {
  cloudinary,
  uploadPdf,
  uploadPdfToCloudinary,
} = require("../config/cloudinary");

const router = express.Router();

const uploadsDir = path.join(__dirname, "../uploads");
const localResumePath = path.join(uploadsDir, "resume.pdf");

const ensureUploadsDir = () => {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
};

const destroyCloudinaryResume = async (resume) => {
  if (!resume?.publicId) return;
  const types = [resume.resourceType, "image", "raw"].filter(Boolean);
  for (const resourceType of [...new Set(types)]) {
    try {
      await cloudinary.uploader.destroy(resume.publicId, { resource_type: resourceType });
      break;
    } catch (e) {
      // try next resource type
    }
  }
};

router.get("/", async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ updatedAt: -1 });
    const hasLocal = fs.existsSync(localResumePath);
    if (!resume && !hasLocal) {
      return res.json({ url: null, fileName: null, available: false });
    }
    res.json({
      url: resume?.url || null,
      fileName: resume?.fileName || "resume.pdf",
      updatedAt: resume?.updatedAt || null,
      available: true,
      fileUrl: "/api/resume/file",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Public stream — used by Resume page preview + download
router.get("/file", async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");

    if (fs.existsSync(localResumePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'inline; filename="resume.pdf"');
      res.setHeader("Cache-Control", "no-store");
      return fs.createReadStream(localResumePath).pipe(res);
    }

    const resume = await Resume.findOne().sort({ updatedAt: -1 });
    if (!resume?.publicId && !resume?.url) {
      return res.status(404).json({ message: "No resume uploaded" });
    }

    const resourceType = resume.resourceType || "image";
    const signedUrl = cloudinary.url(resume.publicId, {
      resource_type: resourceType,
      type: "upload",
      secure: true,
      sign_url: true,
      format: "pdf",
    });

    const remote = await fetch(signedUrl);
    if (!remote.ok) {
      // last resort: try stored URL
      const fallback = await fetch(resume.url);
      if (!fallback.ok) {
        return res.status(502).json({
          message: "Could not fetch resume from storage. Please re-upload from admin.",
        });
      }
      const buf = Buffer.from(await fallback.arrayBuffer());
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${resume.fileName || "resume.pdf"}"`
      );
      return res.send(buf);
    }

    const buffer = Buffer.from(await remote.arrayBuffer());
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${resume.fileName || "resume.pdf"}"`
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", protect, uploadPdf.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "PDF resume file is required" });
    }

    ensureUploadsDir();
    fs.writeFileSync(localResumePath, req.file.buffer);

    let uploaded = null;
    try {
      uploaded = await uploadPdfToCloudinary(req.file.buffer, req.file.originalname);
    } catch (e) {
      console.error("Cloudinary resume upload failed (local copy kept):", e.message);
    }

    const existing = await Resume.findOne().sort({ updatedAt: -1 });
    if (existing) {
      await destroyCloudinaryResume(existing);
    }

    const payload = {
      url: uploaded?.secure_url || "/api/resume/file",
      publicId: uploaded?.public_id || "",
      fileName: req.file.originalname || "resume.pdf",
      resourceType: uploaded?.resource_type || "image",
    };

    let resume;
    if (existing) {
      existing.url = payload.url;
      existing.publicId = payload.publicId;
      existing.fileName = payload.fileName;
      existing.resourceType = payload.resourceType;
      resume = await existing.save();
    } else {
      resume = await Resume.create(payload);
    }

    res.status(201).json({
      url: resume.url,
      fileName: resume.fileName,
      updatedAt: resume.updatedAt,
      available: true,
      fileUrl: "/api/resume/file",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
