import crypto from "crypto"; // lightweight unique fallback
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    images: [{ type: String }],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Generate slug if not present or name changed
LocationSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    const base = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    const suffix = crypto.randomBytes(3).toString("hex"); // avoid collisions
    this.slug = `${base}-${suffix}`;
  }
  next();
});

// toJSON transform: expose id, hide _id & __v
LocationSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

// Static finder by id or slug
LocationSchema.statics.findByIdentifier = function (identifier) {
  if (mongoose.isValidObjectId(identifier)) {
    return this.findById(identifier);
  }
  return this.findOne({ slug: identifier });
};

// Helpful compound index (optional)
LocationSchema.index({ createdAt: -1 });

export const Location = mongoose.model("Location", LocationSchema);
