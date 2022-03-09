import express from "express";
import imgController from "../controller/img.controller.js";
const router = express.Router();


router.get("/:filename([0-9a-f]{32})", imgController.loadImg);


export default router;