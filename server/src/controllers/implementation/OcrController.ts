import { NextFunction, Request, Response } from "express";
import path from "path";
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

      // const extractedAadhaarData = await this.ocrService.processAadhaar(
      //   aadhaarFrontPath,
      //   aadhaarBackPath
      // );
      const extractedAadhaarData = {
        address:
          "saray dan shah, KATRAULI, Poore Durgi, Phoolpur, Allahabad, Uttar Pradesh",
        pincode: "212402",
        uid: "8867 0905 4086",
        name: "RAUSHAN KUMAR",
        dob: "26/07/1994",
        gender: "MALE",
        isUidMatch: false,
        ageBand: "30-40 (Age: 31)",
      };
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
