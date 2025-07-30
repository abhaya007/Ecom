import mongoose, { Schema } from "mongoose";

const categorySchema = Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    productCount: { type: Number, default: 0 }, // optional, can be updated via aggregation
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;