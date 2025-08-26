import { NextFunction, Request, Response } from "express";

export interface IOcrController {
  extractAadhaarDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>
}
