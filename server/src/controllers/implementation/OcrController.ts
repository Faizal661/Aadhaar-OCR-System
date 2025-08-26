import { NextFunction, Request, Response } from "express";
import { createWorker } from "tesseract.js";
import path from "path";
import extractAadhaarDetails from "../../utils/extractAadhaarDetails";
import { inject, injectable } from "tsyringe";
import { IOcrController } from "../interface/IOcrController";
import { IOcrService } from "../../service/interface/IOcrService";
import { MulterFiles } from "../../types/aadhaarData";
import {
  HttpResCode,
  HttpResMsg,
} from "../../constants/http-response.constants";
import CustomError from "../../errors/CustomError";

@injectable()
export default class OcrController implements IOcrController {
  private ocrService: IOcrService;

  constructor(
    @inject("OcrService")
    ocrService: IOcrService
  ) {
    this.ocrService = ocrService;
  }

  async extractAadhaarDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const files = req.files as MulterFiles;

      if (!files || !files.aadhaarFront || !files.aadhaarBack) {
        return next(
          new CustomError(
            HttpResMsg.BOTH_IMAGES_NEEDED,
            HttpResCode.BAD_REQUEST
          )
        );
      }

      const aadhaarFrontPath = path.join(
        __dirname,
        "../../../uploads",
        files.aadhaarFront[0].filename
      );

      const aadhaarBackPath = path.join(
        __dirname,
        "../../../uploads",
        files.aadhaarBack[0].filename
      );

      const result = await this.ocrService.processAadhaar(
        aadhaarFrontPath,
        aadhaarBackPath
      );
      res.status(200).json({
        message: HttpResMsg.IMAGE_UPLOADED_SUCCESSFULLY,
        result,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        HttpResMsg.FAILED_TO_EXTRACT_DETAILS,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    }
  }
}

// const worker = await createWorker("eng");

// try {
//   const {
//     data: { text: frontText },
//   } = await worker.recognize(aadhaarFrontPath);
//   const {
//     data: { text: backText },
//   } = await worker.recognize(aadhaarBackPath);
//   console.log("🚀 ~ uploadImages ~ frontText:", frontText);
//   console.log("🚀 ~ uploadImages ~ backText:", backText);

//   await worker.terminate();

//   const extractedAadhaarData = extractAadhaarDetails(frontText, backText);
//   console.log(
//     "🚀 ~ uploadImages ~ extractedAadhaarData:",
//     extractedAadhaarData
//   );

//   res.status(200).json({
//     message: "Images uploaded and parsed successfully",
//   });
// } catch (err) {
//   // await worker.terminate();
//   res
//     .status(500)
//     .json({ message: "Error during OCR processing", error: err });
// }
