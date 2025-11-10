export interface AadhaarDetails {
  name: string;
  dob: string;
  uid: string;
  gender: "MALE" | "FEMALE";
  address: string;
  pincode: string;
  isUidMatch: boolean;
  ageBand: string;
}
