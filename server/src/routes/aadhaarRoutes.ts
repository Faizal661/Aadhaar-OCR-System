import { Router } from "express";
import multer from "multer";
import uploadImages from "../controllers/uploadController";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload-aadhaar",
  upload.fields([
    {
      name: "aadhaarFront",
      maxCount: 1,
    },
    {
      name: "aadhaarBack",
      maxCount: 1,
    },
  ]),
  uploadImages
);

export default router;
