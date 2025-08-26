export interface AadhaarDetails {
  name: string | null;
  dob: string | null;
  gender: string | null;
  UID: string | null;
  address: string | null;
  pincode: string | null;
  ageBand?: string;
  isUIDsame: boolean;
}

export interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}
