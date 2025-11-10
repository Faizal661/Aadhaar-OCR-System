export interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

export interface AadhaarFrontData {
  name: string;
  dob: string; 
  uid: string; 
  gender: 'MALE' | 'FEMALE' ;
}

export interface AadhaarBackData {
  address: string;
  pincode: string; 
  uid: string; 
}

export interface AadhaarDetails extends AadhaarFrontData {
  address: string;
  pincode: string;
  isUidMatch: boolean; 
  ageBand: string; 
}