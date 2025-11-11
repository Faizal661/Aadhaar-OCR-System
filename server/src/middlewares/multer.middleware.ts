import multer from "multer";
import * as fs from "fs";
import * as path from "path";
import { MAX_UPLOAD_SIZE_BYTES } from "../constants/app-config.constants";

const UPLOADS_PATH = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOADS_PATH)) {
      fs.mkdirSync(UPLOADS_PATH, { recursive: true });
    }
    cb(null, UPLOADS_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_UPLOAD_SIZE_BYTES,
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
