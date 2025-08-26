import "reflect-metadata";
import { container } from "tsyringe";
import "../config/tsyringe.container"
import { Router } from "express";
import uploadAadhaarImages from "../middlewares/multer.middleware";
import { IOcrController } from "../controllers/interface/IOcrController";

const router = Router();
const OcrController = container.resolve<IOcrController>("OcrController");

router.post(
  "/",
  uploadAadhaarImages,
  (req, res, next) => OcrController.extractAadhaarDetails(req, res, next)
);

export default router;
