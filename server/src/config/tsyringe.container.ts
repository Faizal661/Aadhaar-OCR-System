import "reflect-metadata";
import { container } from "tsyringe";
import { IOcrController } from "../controllers/interface/IOcrController";
import { IOcrService } from "../service/interface/IOcrService";
import OcrController from "../controllers/implementation/OcrController";
import OcrService from "../service/implementation/OcrService";

container.register<IOcrController>('OcrController',{useClass:OcrController})
container.register<IOcrService>('OcrService',{useClass:OcrService})