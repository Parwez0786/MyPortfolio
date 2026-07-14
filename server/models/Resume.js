const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
    fileName: { type: String, default: "resume.pdf" },
    resourceType: { type: String, default: "raw" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
