import "reflect-metadata";
import { container } from "tsyringe";

import { IOcrController } from "../controllers/interface/IOcrController";
import { IOcrService } from "../service/interface/IOcrService";
import OcrController from "../controllers/implementation/OcrController";
import OcrService from "../service/implementation/OcrService";
import { GoogleAIWrapper, IGoogleAIWrapper } from "../ai/googleAI.wrapper";

container.register<IGoogleAIWrapper>("GoogleAIWrapper", {
  useFactory: () => new GoogleAIWrapper(process.env.OCR_API_KEY!),
});

container.register<IOcrController>("OcrController", {
  useClass: OcrController,
});
container.register<IOcrService>("OcrService", { useClass: OcrService });
