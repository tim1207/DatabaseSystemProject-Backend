import express from "express";
import categoryController from "../controller/category.controller.js";

const router = express.Router();
router.get("/", categoryController.getCategories);

export default router;
