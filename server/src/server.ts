import express, { Response, Request } from "express";
import cors from "cors";
import aadhaarRoutes from "../src/routes/aadhaarRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
console.log("CLIENT_ORIGIN", process.env.CLIENT_ORIGIN);
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api", aadhaarRoutes);

app.listen(PORT, () => {
  console.log("server is running on port ✅✅✅");
});
