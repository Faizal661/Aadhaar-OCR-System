import { Request, Response, NextFunction } from "express";
import { BaseError } from "../errors/BaseError";
import { HttpResCode, HttpResMsg } from "../constants/http-response.constants";
import multer from "multer";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Custom Error Handling
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({ message: err.message });
  }

  // Multer size limit error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      res
        .status(HttpResCode.BAD_REQUEST)
        .json({ message: HttpResMsg.IMAGE_SIZE_TOOLARGE });
    }
  }
  
  // Handle server errors
  res.status(500).json({
    error: HttpResMsg.INTERNAL_SERVER_ERROR,
    message: err.message || HttpResMsg.SOMETHING_WENT_WRONG,
  });
};

export default errorHandler;
