import Product from "../model/productModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res, next) => {
  const { productName, stock, costPrice, sellingPrice } = req.body;

  const newProduct = await Product.create({
    productName,
    stock,
    costPrice,
    sellingPrice,
  });

  res.status(200).json({
    status: "success",
    data: { product: newProduct },
  });
});


export const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find();
  
    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    });
  });
  
  // Read Single Product
  export const getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
  
    res.status(200).json({
      status: "success",
      message: "product gotten successfully",
      data: { product },
    });
  });
  
  // Update Product
  export const updateProduct = catchAsync(async (req, res, next) => {
    const { productName, stock, costPrice, sellingPrice } = req.body;
  
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName,
        stock,
        costPrice,
        sellingPrice,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  
    if (!updatedProduct) {
      return next(new AppError("Product not found", 404));
    }
  
    res.status(200).json({
      status: "success",
      message: "product updated successfully",
      data: { product: updatedProduct },
    });
  });
  
  // Delete Product
  export const deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
  
    if (!product) {
      return next(new AppError("Product not found", 404));
    }
  
    res.status(204).json({
      status: "success",
      message: "product deleted successfully",
      data: null,
    });
  });
  
  export default {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
  };