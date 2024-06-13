import express from "express";
import { createSales, getAllSales, getSale,deleteSale, } from "../controller/salesController.js";

const router = express.Router();
router.post("",createSales);
router.get("",getAllSales);
router.get("/:id",getSale);
router.delete("/:id", deleteSale)

export default router;
