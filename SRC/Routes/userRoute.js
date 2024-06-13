import express from "express";
import { deleteUser, getAllUsers, getSingleUser } from "../controller/userController.js";

const router = express.Router();

router.get("",getAllUsers);
router.get("/:id",getSingleUser);
router.delete("/:id", deleteUser)

export default router;
