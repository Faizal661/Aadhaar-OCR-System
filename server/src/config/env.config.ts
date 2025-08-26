import CustomError from "../errors/CustomError";
import { EnvErrMsg } from "../constants/env-error-messages.constants";
import { HttpResCode } from "../constants/http-response.constants";

const env = {
  get PORT(): number {
    const port = process.env.PORT;
    if (!port) {
      throw new CustomError(
        EnvErrMsg.PORT_UNDEFINED,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    }
    const portNumber = parseInt(port, 10);
    if (isNaN(portNumber)) {
      throw new CustomError(EnvErrMsg.PORT_INVALID, HttpResCode.BAD_REQUEST);
    }
    return portNumber;
  },

  get CLIENT_ORIGIN() {
    if (!process.env.CLIENT_ORIGIN) {
      throw new CustomError(
        EnvErrMsg.CLIENT_ORIGIN_UNDEFINED,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    }
    return process.env.CLIENT_ORIGIN;
  },

  get GOOGLE_APPLICATION_CREDENTIALS() {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new CustomError(
        EnvErrMsg.GOOGLE_APPLICATION_CREDENTIALS_UNDEFINED,
        HttpResCode.INTERNAL_SERVER_ERROR
      );
    }
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  },
};

export default env;
