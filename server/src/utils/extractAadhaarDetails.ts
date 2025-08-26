import { AadhaarDetails } from "../types/aadhaarData";

function extractAadhaarDetails(
  frontText: string,
  backText: string
): AadhaarDetails {
  console.log("🚀 ~ extractAadhaarDetails ~ frontText:", frontText);
  console.log("🚀 ~ extractAadhaarDetails ~ backText:", backText);

  const result: AadhaarDetails = {
    name: null,
    dob: null,
    gender: null,
    UID: null,
    address: null,
    pincode: null,
    isUIDsame: false,
  };

  // UID
  const uidFrontMatch = frontText.match(/\d{4}\s?\d{4}\s?\d{4}/);
  const uidBackMatch = backText.match(/\d{4}\s?\d{4}\s?\d{4}/);
  result.UID = uidFrontMatch ? uidFrontMatch[0].replace(/\s/g, "") : null;
  result.isUIDsame =
    result.UID !== null && uidBackMatch !== null
      ? result.UID === uidBackMatch[0].replace(/\s/g, "")
      : false;

  // Name
  const nameMatch = frontText.match(/Name\s*[:\-]?\s*([A-Z\s]+)/i);
  result.name = nameMatch ? nameMatch[1].trim() : null;

  // DOB
  const dobMatch = frontText.match(
    /DOB\s*[:\-]?\s*(\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})/i
  );
  result.dob = dobMatch ? dobMatch[1] : null;

  // Gender
  const genderMatch = frontText.match(/(Male|Female|Transgender)/i);
  result.gender = genderMatch ? genderMatch[1] : null;

  // Address
  const addressMatch = backText.match(
    /address[:\-]?\s*([\s\S]+?)(Uttar Pradesh|[A-Z]{2,} - \d{6})/i
  );
  result.address = addressMatch
    ? addressMatch[1].replace(/\n/g, " ").trim()
    : null;

  // Pincode
  const pincodeMatch = backText.match(/\d{6}/g);
  result.pincode = pincodeMatch ? pincodeMatch[pincodeMatch.length - 1] : null;

  // Age band calculation
  if (result.dob) {
    const birthYearMatch = result.dob.match(/\d{4}/);
    if (birthYearMatch) {
      const birthYear = parseInt(birthYearMatch[0], 10);
      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      if (age < 20) result.ageBand = "<20";
      else if (age < 30) result.ageBand = "20-30";
      else if (age < 40) result.ageBand = "30-40";
      else if (age < 50) result.ageBand = "40-50";
      else result.ageBand = "50+";
    }
  }

  return result;
}

export default extractAadhaarDetails;
