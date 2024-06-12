import Sales from "../model/salesModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// class ProductController {
//   constructor(description, quantity, costPrice, sellingPrice, profit) {
//     this.description = description;
//     this.quantity = quantity;
//     this.costPrice = costPrice;
//     this.sellingPrice = sellingPrice;
//   }

//   calculateProfit() {
//     return (this.sellingPrice - this.costPrice) * this.quantity;
//   }
// }

export const createSales = catchAsync(async (req, res, next) => {
  const { description, quantity, costPrice, sellingPrice } = req.body;

  const sale = await Sales.create({
    description,
    sellingPrice,
    quantity,
    costPrice,
  });

  res.status(200).json({
    statusText: "success",
    data: { sale },
  });
});

export const getAllSales = catchAsync(async (req, res, next) => {
  const sales = await Sales.find().exec();

  res.status(200).json({
    statusText: "success",
    numResult: sales.length,
    data: { sales },
  });
});

export const getSale = catchAsync(async (req, res, next) => {
  const sale = await Sales.findById(req.params.id);

  if (!sale) {
    return next(new AppError("Sale not found", 404));
  }

  res.status(200).json({
    statusText: "success",
    data: { sale },
  });
});
 
export const deleteSale = catchAsync(async (req, res, next) => {
  const sale = await Sales.findByIdAndDelete(req.params.id);

  if (!sale) {
    return next(new AppError("Sale not found", 404));
  }

  res.status(201).json({
    statusText: "success",
    data: { deletedSale: sale },
  });
});

export default {
  createSales,
  getAllSales,
  getSale,
  deleteSale,
};
