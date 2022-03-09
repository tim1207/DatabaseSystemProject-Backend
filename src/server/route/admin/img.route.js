import express from "express";
import multer  from 'multer';
import imgController from "../../controller/admin/img.controller.js";

const storage = multer.memoryStorage()
const upload = multer({storage:storage })
const router = express.Router();

router.post("/upload", upload.single("image"), imgController.uploadImg);

export default router;