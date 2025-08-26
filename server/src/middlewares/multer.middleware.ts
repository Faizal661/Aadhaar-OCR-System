import multer from "multer";

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
    fileSize: 5 * 1024 * 1024,
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
