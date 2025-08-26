import { AadhaarDetails } from "../../types/aadhaarData";

export interface IOcrService {
  processAadhaar(frontPath: string, backPath: string): Promise<AadhaarDetails>;
}
