import { inject, injectable } from "tsyringe";
import CustomError from "../../errors/CustomError";
import { IOcrService } from "../interface/IOcrService";
import extractAadhaarDetails from "../../utils/extractAadhaarDetails";
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
import { GoogleAIWrapper, IGoogleAIWrapper } from "../../ai/googleAI.wrapper";

@injectable()
export default class OcrService implements IOcrService {
  private readonly _aiWrapper: IGoogleAIWrapper;

  constructor(@inject("GoogleAIWrapper") aiWrapper: IGoogleAIWrapper) {
    this._aiWrapper = aiWrapper;
  }

  public async processAadhaar(
    frontBuffer: Buffer,
    backBuffer: Buffer
  ): Promise<AadhaarDetails> {
    try {
      const [frontData, backData] = await Promise.all([
        this._extractFrontDetails(frontBuffer),
        this._extractBackDetails(backBuffer),
      ]);

      const parsedData = extractAadhaarDetails(frontData, backData);
      return parsedData;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      console.error(HttpResMsg.FAILED_TO_EXTRACT_DETAILS, error);
      throw new CustomError(
        HttpResMsg.FAILED_TO_EXTRACT_DETAILS,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async _extractFrontDetails(
    imageBuffer: Buffer
  ): Promise<AadhaarFrontData> {
    return this._aiWrapper.extractData<AadhaarFrontData>(
      FRONT_PAGE_DETAILS_EXTRACTION_PROMPT,
      imageBuffer,
      FRONT_SCHEMA
    );
  }

  private async _extractBackDetails(
    imageBuffer: Buffer
  ): Promise<AadhaarBackData> {
    return this._aiWrapper.extractData<AadhaarBackData>(
      BACK_PAGE_DETAILS_EXTRACTION_PROMPT,
      imageBuffer,
      BACK_SCHEMA
    );
  }
}
