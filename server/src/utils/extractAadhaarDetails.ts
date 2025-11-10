import {
  AadhaarDetails,
  AadhaarFrontData,
  AadhaarBackData,
} from "../types/aadhaarData";
import calculateAgeBand from "./calculateAgeBand";

export default function extractAadhaarDetails(
  frontData: AadhaarFrontData,
  backData: AadhaarBackData
): AadhaarDetails {
  const frontUidClean = frontData.uid.replace(/\s/g, "");
  const backUidClean = backData.uid.replace(/\s/g, "");
  const isUidMatch =
    frontUidClean === backUidClean && frontUidClean.length === 12;

  const ageBand = calculateAgeBand(frontData.dob);

  return {
    ...backData,
    ...frontData,
    isUidMatch,
    ageBand,
  };
}
