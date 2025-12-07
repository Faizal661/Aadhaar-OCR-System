import { NextFunction, Request, Response } from "express";
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
  private readonly _ocrService: IOcrService;

  constructor(
    @inject("OcrService")
    ocrService: IOcrService
  ) {
    this._ocrService = ocrService;
  }

  public extractAadhaarDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
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

      const aadhaarFrontBuffer: Buffer = files.aadhaarFront[0].buffer;
      const aadhaarBackBuffer: Buffer = files.aadhaarBack[0].buffer;

      const extractedAadhaarData = await this._ocrService.processAadhaar(
        aadhaarFrontBuffer,
        aadhaarBackBuffer
      );

      res.status(HttpResCode.OK).json({
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
