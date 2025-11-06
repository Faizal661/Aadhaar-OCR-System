import multer from "multer";
import { MAX_UPLOAD_SIZE_BYTES } from "../constants/app-config.constants";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_UPLOAD_SIZE_BYTES ,
  },
});

const uploadAadhaarImages = upload.fields([
  {
    name: "aadhaarFront",
    maxCount: 1,
  },
  {
    name: "aadhaarBack",
    maxCount: 1,
  },
]);

export default uploadAadhaarImages;
