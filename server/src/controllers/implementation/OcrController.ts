import { NextFunction, Request, Response } from "express";
import path from "path";
import * as fs from "fs";
import { inject, injectable } from "tsyringe";
import { IOcrController } from "../interface/IOcrController";
import { IOcrService } from "../../service/interface/IOcrService";
import {
  HttpResCode,
  HttpResMsg,
} from "../../constants/http-response.constants";
import CustomError from "../../errors/CustomError";
import { MulterFiles } from "../../types/multerFiles";

@injectable()
export default class OcrController implements IOcrController {
  private ocrService: IOcrService;

  constructor(
    @inject("OcrService")
    ocrService: IOcrService
  ) {
    this.ocrService = ocrService;
  }

  public extractAadhaarDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // const UPLOADS_DIR = path.join(__dirname, "../../../uploads");

      const files = req.files as MulterFiles;

      if (!files || !files.aadhaarFront || !files.aadhaarBack) {
        return next(
          new CustomError(
            HttpResMsg.BOTH_IMAGES_NEEDED,
            HttpResCode.BAD_REQUEST
          )
        );
      }

      // const aadhaarFrontPath = path.join(
      //   UPLOADS_DIR,
      //   files.aadhaarFront[0].filename
      // );

      // const aadhaarBackPath = path.join(
      //   UPLOADS_DIR,
      //   files.aadhaarBack[0].filename
      // );

      const aadhaarFrontBuffer: Buffer = files.aadhaarFront[0].buffer;
      const aadhaarBackBuffer: Buffer = files.aadhaarBack[0].buffer;

      const extractedAadhaarData = await this.ocrService.processAadhaar(
        aadhaarFrontBuffer,
        aadhaarBackBuffer
      );

      res.status(200).json({
        message: HttpResMsg.SUCCESS,
        extractedAadhaarData,
      });

      return;
    } catch (error) {
      if (error instanceof CustomError) {
        return next(error);
      }
      return next(
        new CustomError(
          HttpResMsg.FAILED_TO_EXTRACT_DETAILS,
          HttpResCode.INTERNAL_SERVER_ERROR
        )
      );
    }
  };
}
