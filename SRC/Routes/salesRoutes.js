import express from "express";
import salesController from "../controller/salesController.js";

const router = express.Router();

router.route("/").post(salesController.createSales).get(salesController.getAllSales);
router.route("/:id").get(salesController.getSale).delete(salesController.deleteSale);


export default router;
