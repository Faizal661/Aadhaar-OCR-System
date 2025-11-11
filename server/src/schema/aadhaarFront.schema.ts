import { Schema, Type } from "@google/genai";

const FRONT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: "The full name of the resident in capital letters.",
    },
    dob: {
      type: Type.STRING,
      description: "The Date of Birth (e.g., DD/MM/YYYY) or Year of Birth (YYYY).",
    },
    uid: {
      type: Type.STRING,
      description: "The 12-digit Aadhaar number, potentially with spaces.",
    },
    gender: {
      type: Type.STRING,
      enum: ["MALE", "FEMALE"],
      description: "The gender of the resident.",
    },
  },
  required: ["name", "dob", "uid", "gender"],
};

export default FRONT_SCHEMA;