import { Request, Response } from "express";

interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

const uploadImages = (req: Request, res: Response): Response => {
  const files = req.files as MulterFiles | undefined;
  console.log("🚀 files:", files)

  if (!files || !files.aadhaarFront || !files.aadhaarBack) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const aadhaarFront = files.aadhaarFront[0];
  const aadhaarBack = files.aadhaarBack[0];

  console.log("🚀  aadhaarFront:", aadhaarFront);
  console.log("🚀  aadhaarBack:", aadhaarBack);

  return res.status(200).json({
    message: "images are uploaded successfully",
    fileNames: {
      front: aadhaarFront.filename,
      back: aadhaarBack.filename,
    },
  });
};

export default uploadImages;
