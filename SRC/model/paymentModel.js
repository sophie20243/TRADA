import mongoose  from "mongoose";

const paymentSchema = mongoose.Schema({
    cardNumber: {
      type: Number,
      min: 5,
      max: 30
  
    },
    expiryDate: {
      type: Date,
      required: true,
      
    },
    CVC: {
      type: Number,
      required: true,
    }, 
    
    country: {
      type: string,
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
  
  