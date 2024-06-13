import express from "express";
import { createSales, deleteSale, getAllSales, getSale } from "../controller/salesController.js";


const router = express.Router();

router.post("/create",createSales)
router.get("/",getAllSales);
router.delete("/:id",deleteSale);
router.get("/:id",getSale);

export default router;
