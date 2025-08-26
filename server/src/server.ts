import "reflect-metadata";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import aadhaarRoutes from "../src/routes/aadhaarRoutes";
import CustomError from "./errors/CustomError";
import { HttpResCode, HttpResMsg } from "./constants/http-response.constants";
import errorHandler from "./middlewares/error-handler.middleware";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());


app.use("/api/parse-aadhaar", aadhaarRoutes);

app.use((req, res, next) => {
  next(new CustomError(HttpResMsg.ROUTE_NOT_FOUND, HttpResCode.NOT_FOUND));
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(HttpResMsg.SERVER_CONNECTION);
});
