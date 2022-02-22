export const IS_PROD = process.env.NODE_ENV === "production";
export const REMOTE_SERVER_URL = IS_PROD? "https://iamone.link": "http://localhost:5000";
export const REMOTE_API_SERVER_URL = REMOTE_SERVER_URL + "/x/api";
export const REMOTE_THEME_SOURCE_URL = REMOTE_SERVER_URL + "/x/api/page/themes";
export const STATIC_RESOURCE_URL = "https://static.iamone.link";
