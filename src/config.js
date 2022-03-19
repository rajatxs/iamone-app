export const IS_PROD = process.env.NODE_ENV === "production";
export const REMOTE_SERVER_URL = IS_PROD? "https://api.iamone.link": "http://localhost:5000";
export const REMOTE_API_SERVER_URL = REMOTE_SERVER_URL + "/x/api";
export const REMOTE_THEME_SOURCE_URL = REMOTE_SERVER_URL + "https://www.iamone.link/x/themes";
export const STATIC_RESOURCE_URL = "https://static.iamone.link";
export const BASE_URL = "https://www.iamone.link"
