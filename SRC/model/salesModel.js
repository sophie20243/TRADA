import mongoose from "mongoose";

const salesSchema = mongoose.Schema({
  description: {
    type: String,
    min: 10,
    max: 60

  },
  quantity: {
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

salesSchema.pre("save", function (next) {
  this.profit = (this.sellingPrice - this.costPrice) * this.quantity;
  next()
});

const Sales = mongoose.model("Sales", salesSchema);
export default Sales;

