const UNDEFINED_MSG = "environment variable is not defined.";
const INVALID_MSG = "environment variable is not a valid number.";

export const enum EnvErrMsg {
  PORT_UNDEFINED = `${"PORT"} ${UNDEFINED_MSG}`,
  CLIENT_ORIGIN_UNDEFINED = `${"CLIENT_ORIGIN"} ${UNDEFINED_MSG}`,
  GOOGLE_APPLICATION_CREDENTIALS_UNDEFINED= `${"GOOGLE_APPLICATION_CREDENTIALS"} ${UNDEFINED_MSG}`,

  PORT_INVALID = `${"PORT"} ${INVALID_MSG}`,
}
