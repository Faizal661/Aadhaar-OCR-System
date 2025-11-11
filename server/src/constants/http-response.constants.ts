export const enum HttpResCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,

  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export const enum HttpResMsg {
  SUCCESS = "Operation successful",
  CREATED = "Resource successfully created",
  ACCEPTED = "Request accepted",
  NO_CONTENT = "No content",

  BAD_REQUEST = "Bad request",
  UNAUTHORIZED = "Unauthorized access",
  FORBIDDEN = "Access forbidden",
  NOT_FOUND = "Resource not found",
  METHOD_NOT_ALLOWED = "Method not allowed",
  REQUEST_TIMEOUT = "Request timeout",
  CONFLICT = "Conflict",
  TOO_MANY_REQUESTS = "Too manny requests",

  INTERNAL_SERVER_ERROR = "Internal server error",
  BAD_GATEWAY = "Bad gateway",
  SERVICE_UNAVAILABLE = "Service unavailable",

  //Other responses

  SERVER_CONNECTION = `Server connection   ✅`,
  ROUTE_NOT_FOUND = `Server End Point Not Found`,
  SOMETHING_WENT_WRONG = "Something went wrong.",

  IMAGE_SIZE_TOO_LARGE = "Image size limit exceeded",
  BOTH_IMAGES_NEEDED = "Both files were needed to extract details.",

  FAILED_TO_EXTRACT_DETAILS = "Failed to extract aadhaar details",
  FAILED_TO_PARSE_JSON = "Failed to parse JSON from Gemini API. Data structure error.",
  FAILED_TO_REMOVE_FILES = "Failed to remove files.",
  UID_IS_NOT_SAME = "UID is not same in both images",
}
