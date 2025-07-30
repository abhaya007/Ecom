import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      //required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      //required: [true, 'Product description is required'],
    },
    brand: {
      type: String,
      //required: true,
    },
    category: {
      type: String,
      //required: [true, 'Product category is required'],
    },
    status: {
      type: String,
      //required: [true, 'status is required'],
    },
    price: {
      type: Number,
      //required: [true, 'Price is required'],
      min: 0,
    },
    discount: {
      type: Number,
      default: 0, // percentage (0–100)
      min: 0,
      max: 100,
    },
    finalPrice: {
      type: Number, // Computed at save time
    },
    stock: {
      type: Number,
      //required: true,
      min: 0,
    },
   image: {
      type: String,
      default: "",
    },
  
    variants: [
      {
        color: String,
        size: String,
        stock: Number,
      },
    ],
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: '',
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate final price
productSchema.pre('save', function (next) {
  this.finalPrice = this.price - (this.price * this.discount) / 100;
  next();
});

const Product = mongoose.model('Product', productSchema);
export default Product;
