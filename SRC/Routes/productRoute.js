import express from "express";
const router = express.Router();
import { createProduct,deleteProduct, getAllProducts, getProduct, updateProduct } from "../controller/productController.js";


router.post("/create",createProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
