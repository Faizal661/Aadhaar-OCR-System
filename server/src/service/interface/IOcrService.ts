import { AadhaarDetails } from "../../types/aadhaarData";

export interface IOcrService {
  processAadhaar(frontBuffer: Buffer, backBuffer: Buffer): Promise<AadhaarDetails>;
}
