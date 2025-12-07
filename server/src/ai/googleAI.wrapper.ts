import { GoogleGenAI, Schema, Type } from "@google/genai";
import { HttpResCode, HttpResMsg } from "../constants/http-response.constants";
import CustomError from "../errors/CustomError";

const MODEL = "gemini-2.5-flash";
const MIME_TYPE = "image/jpeg";

export interface IGoogleAIWrapper {
  extractData<T>(
    prompt: string,
    imageBuffer: Buffer,
    schema: Schema
  ): Promise<T>;
}

export class GoogleAIWrapper implements IGoogleAIWrapper {
  private aiClient: GoogleGenAI; 

  constructor(apiKey: string) {
    this.aiClient = new GoogleGenAI({ apiKey });
  }

  public async extractData<T>(
    prompt: string,
    imageBuffer: Buffer,
    schema: { type: Type; properties: { [key: string]: any } }
  ): Promise<T> {
    try {
      const base64Image = imageBuffer.toString("base64");
      
      const response = await this.aiClient.models.generateContent({
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
          responseSchema: schema,
        },
      });

      const jsonString = response.text!.trim();
      if (!jsonString) {
        throw new Error("AI returned an empty response.");
      }

      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error("AI Wrapper Error:", error);
      throw new CustomError(
        `${HttpResMsg.FAILED_TO_EXTRACT_DETAILS}: AI call failed.`,
        HttpResCode.BAD_REQUEST 
      );
    }
  }
}