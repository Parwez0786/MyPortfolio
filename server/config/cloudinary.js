const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

const cloudName = (process.env.CLOUDINARY_CLOUD_NAME || "").trim();
const apiKey = (process.env.CLOUDINARY_API_KEY || "").trim();
const apiSecret = (process.env.CLOUDINARY_API_SECRET || "").trim();

if (!cloudName || !apiKey || !apiSecret) {
  console.warn(
    "Cloudinary env vars missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in server/.env"
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const uploadPdf = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      (file.originalname && file.originalname.toLowerCase().endsWith(".pdf"));
    if (isPdf) cb(null, true);
    else cb(new Error("Only PDF files are allowed"));
  },
});

const uploadToCloudinary = (fileBuffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio-projects" },
      (error, result) => {
        if (error) {
          const msg = error.message || String(error);
          if (/Invalid Signature/i.test(msg)) {
            return reject(
              new Error(
                "Cloudinary Invalid Signature — check CLOUDINARY_API_SECRET (and cloud name/api key) in server/.env. Copy them again from the Cloudinary Dashboard → Account Details."
              )
            );
          }
          return reject(error);
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

const uploadPdfToCloudinary = (fileBuffer, originalName = "resume.pdf") =>
  new Promise((resolve, reject) => {
    const publicId = `resume_${Date.now()}`;
    // Upload PDF as "image" so Cloudinary allows public delivery (raw often returns 401 ACL)
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio-resume",
        resource_type: "image",
        public_id: publicId,
        format: "pdf",
        type: "upload",
        access_mode: "public",
      },
      (error, result) => {
        if (error) {
          const msg = error.message || String(error);
          if (/Invalid Signature/i.test(msg)) {
            return reject(
              new Error(
                "Cloudinary Invalid Signature — check CLOUDINARY_API_SECRET (and cloud name/api key) in server/.env."
              )
            );
          }
          return reject(error);
        }
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });

module.exports = {
  cloudinary,
  upload,
  uploadPdf,
  uploadToCloudinary,
  uploadPdfToCloudinary,
};
