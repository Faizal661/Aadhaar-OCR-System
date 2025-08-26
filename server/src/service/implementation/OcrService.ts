import { HttpResCode, HttpResMsg } from "../../constants/http-response.constants";
import CustomError from "../../errors/CustomError";
import fs from "fs/promises";
import { IOcrService } from "../interface/IOcrService";
import vision from "@google-cloud/vision";
import extractAadhaarDetails from "../../utils/extractAadhaarDetails";
import { AadhaarDetails } from "../../types/aadhaarData";

export default class OcrService implements IOcrService {
  async processAadhaar(
    frontPath: string,
    backPath: string
  ): Promise<AadhaarDetails> {
    try {
      console.log("1, before google vision");
      const [frontText, backText] = await Promise.all([
        this.extractTextUsingGoogleVision(frontPath),
        this.extractTextUsingGoogleVision(backPath),
      ]);
      console.log("2, after google vision");

      const parsedData = extractAadhaarDetails(frontText, backText);
      console.log("🚀 ~ OcrService ~ processAadhaar ~ parsedData:", parsedData);

      if (!parsedData.isUIDsame) {
        throw new CustomError(
          HttpResMsg.UID_IS_NOT_SAME,
          HttpResCode.BAD_REQUEST
        );
      }

      return parsedData;
    } catch (error) {
      console.error(HttpResMsg.FAILED_TO_EXTRACT_DETAILS);
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError(
        HttpResMsg.FAILED_TO_EXTRACT_DETAILS,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    } finally {
      try {
        await Promise.all([fs.unlink(frontPath), fs.unlink(backPath)]);
      } catch (err) {
        console.warn(HttpResMsg.FAILED_TO_REMOVE_FILES, err);
      }
    }
  }

  async extractTextUsingGoogleVision(imagePath: string): Promise<string> {
    try {
      const [result] = await this.client.textDetection(imagePath);
      return result.fullTextAnnotation?.text || "";
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  private client = new vision.ImageAnnotatorClient();

}
