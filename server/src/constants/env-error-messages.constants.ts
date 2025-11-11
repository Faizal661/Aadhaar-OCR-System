const UNDEFINED_MSG = "environment variable is undefined.";
const INVALID_MSG = "environment variable is invalid.";

export const enum EnvErrMsg {
  
  PORT_UNDEFINED = `PORT ${UNDEFINED_MSG}`,
  CLIENT_ORIGIN_UNDEFINED = `CLIENT_ORIGIN ${UNDEFINED_MSG}`,
  OCR_API_TOKEN = `OCR_API_TOKEN ${UNDEFINED_MSG}`,

  PORT_INVALID = `PORT ${INVALID_MSG}`,
}
