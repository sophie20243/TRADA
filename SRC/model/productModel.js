import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    min: 2,
    max: 60

  },
  stock: {
    type: Number,
    required: true,
    min: 1,
  },  
  costPrice: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
    valiate: {
      validator: (value) => {
        return this.costPrice < value;
      },
      message: `Selling price({VALUE}) cannot be less than the cost price`,
    },
  },
  profit: Number,
});

productSchema.pre("save", function (next) {
  this.profit = (this.sellingPrice - this.costPrice) * this.quantity;
  next()
});

const Product = mongoose.model("Product", productSchema);
export default Product

