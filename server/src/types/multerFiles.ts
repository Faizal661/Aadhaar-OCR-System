export type MulterFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer; 
};

export type MulterFiles = {
    aadhaarFront?: MulterFile[];
    aadhaarBack?: MulterFile[];
    [fieldname: string]: MulterFile[] | undefined;
};

// export interface MulterFiles {
//   [fieldname: string]: Express.Multer.File[];
// }