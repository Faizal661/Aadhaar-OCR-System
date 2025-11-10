import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "reflect-metadata";
import cors from "cors";
import aadhaarRoutes from "../src/routes/aadhaarRoutes";
import CustomError from "./errors/CustomError";
import { HttpResCode, HttpResMsg } from "./constants/http-response.constants";
import errorHandler from "./middlewares/error-handler.middleware";
import env from "./config/env.config";

const app = express();
const PORT = env.PORT || 5000;

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));

app.use(express.json());

app.use("/api/parse-aadhaar", aadhaarRoutes);

app.use((req, res, next) => {
  next(new CustomError(HttpResMsg.ROUTE_NOT_FOUND, HttpResCode.NOT_FOUND));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(HttpResMsg.SERVER_CONNECTION);
});
