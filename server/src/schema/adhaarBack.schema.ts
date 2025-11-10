import { Schema, Type } from "@google/genai";

const BACK_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    address: {
      type: Type.STRING,
      description: "The complete address including village, street, district, and state.",
    },
    pincode: {
      type: Type.STRING,
      description: "The 6-digit Pincode.",
    },
    uid: {
      type: Type.STRING,
      description: "The 12-digit Aadhaar number, potentially with spaces.",
    },
  },
  required: ["address", "pincode", "uid"],
};

export default BACK_SCHEMA