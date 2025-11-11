import CustomError from "../../errors/CustomError";
import { IOcrService } from "../interface/IOcrService";
import extractAadhaarDetails from "../../utils/extractAadhaarDetails";
import { GoogleGenAI } from "@google/genai";
import * as fs from "fs/promises";
import {
  HttpResCode,
  HttpResMsg,
} from "../../constants/http-response.constants";
import {
  AadhaarBackData,
  AadhaarDetails,
  AadhaarFrontData,
} from "../../types/aadhaarData";
import FRONT_SCHEMA from "../../schema/aadhaarFront.schema";
import BACK_SCHEMA from "../../schema/adhaarBack.schema";
import {
  BACK_PAGE_DETAILS_EXTRACTION_PROMPT,
  FRONT_PAGE_DETAILS_EXTRACTION_PROMPT,
} from "../../constants/ai-prompts.constants";

const MODEL = "gemini-2.5-flash";
const MIME_TYPE = "image/jpeg";

export default class OcrService implements IOcrService {
  private ai: GoogleGenAI;
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.OCR_API_KEY });
  }
  async processAadhaar(
    frontPath: string,
    backPath: string
  ): Promise<AadhaarDetails> {
    let frontData: AadhaarFrontData;
    let backData: AadhaarBackData;

    try {
      const [extractedFrontData, extractedBackData] = await Promise.all([
        this._extractFrontDetails(frontPath),
        this._extractBackDetails(backPath),
      ]);

      frontData = extractedFrontData;
      backData = extractedBackData;

      const parsedData = extractAadhaarDetails(frontData, backData);
      console.log("🚀 ~ Final Validated Aadhaar Data:", parsedData);

      return parsedData;
    } catch (error) {
      console.error(HttpResMsg.FAILED_TO_EXTRACT_DETAILS, error);

      if (error instanceof CustomError) {
        throw error;
      }
      if (error instanceof SyntaxError) {
        console.error(HttpResMsg.FAILED_TO_PARSE_JSON)
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

  private async _extractFrontDetails(
    filePath: string
  ): Promise<AadhaarFrontData> {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = imageBuffer.toString("base64");

    const prompt = FRONT_PAGE_DETAILS_EXTRACTION_PROMPT;

    try {
      const response = await this.ai.models.generateContent({
        model: MODEL,
        contents: [
          { text: prompt },
          {
            inlineData: {
              data: base64Image,
              mimeType: MIME_TYPE,
            },
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: FRONT_SCHEMA,
        },
      });

      const jsonString = response.text!.trim();
      return JSON.parse(jsonString) as AadhaarFrontData;
    } catch (error) {
      console.error("OCR API Error (Front Side):", error);
      throw this._handleApiError(error);
    }
  }

  private async _extractBackDetails(
    filePath: string
  ): Promise<AadhaarBackData> {
    const imageBuffer = await fs.readFile(filePath);
    const base64Image = imageBuffer.toString("base64");

    const prompt = BACK_PAGE_DETAILS_EXTRACTION_PROMPT;

    try {
      const response = await this.ai.models.generateContent({
        model: MODEL,
        contents: [
          { text: prompt },
          {
            inlineData: {
              data: base64Image,
              mimeType: MIME_TYPE,
            },
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: BACK_SCHEMA,
        },
      });

      const jsonString = response.text!.trim();
      return JSON.parse(jsonString) as AadhaarBackData;
    } catch (error) {
      console.error("OCR API Error (Back Side):", error);
      throw this._handleApiError(error);
    }
  }

  private _handleApiError(error: any): CustomError | Error {
    console.error("OCR API Response Error Data:", error.response.data);
    return new CustomError(
      `OCR API Failed: ${error.response.data.message || "Unknown API error"}`,
      HttpResCode.BAD_REQUEST
    );
  }
}
