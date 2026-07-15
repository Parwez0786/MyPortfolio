const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [imageSchema],
      default: [],
    },
    // Kept for older documents; prefer images[]
    imgUrl: {
      type: String,
      default: "",
    },
    imgPublicId: {
      type: String,
      default: "",
    },
    ghLink: {
      type: String,
      default: "",
    },
    demoLink: {
      type: String,
      default: "",
    },
    isBlog: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    endedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

projectSchema.methods.toClientJSON = function toClientJSON() {
  const obj = this.toObject();
  let images = Array.isArray(obj.images) ? [...obj.images] : [];

  if (!images.length && obj.imgUrl) {
    images = [{ url: obj.imgUrl, publicId: obj.imgPublicId || "" }];
  }

  // Backward compat if an older doc only had completedAt
  const startedAt = obj.startedAt || null;
  const endedAt = obj.endedAt || obj.completedAt || null;

  return {
    ...obj,
    images,
    imgUrl: images[0]?.url || obj.imgUrl || "",
    startedAt,
    endedAt,
  };
};

module.exports = mongoose.model("Project", projectSchema);
