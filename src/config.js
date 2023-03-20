export const IS_PROD = process.env.NODE_ENV === "production";
export const REMOTE_SERVER_URL = IS_PROD? "https://api.iamone.link": "http://localhost:5000";
export const REMOTE_API_SERVER_URL = REMOTE_SERVER_URL;
export const REMOTE_THEME_SOURCE_URL = REMOTE_SERVER_URL + "https://iamone-render-functions.vercel.app/x/themes";
export const STATIC_RESOURCE_URL = "https://rajatxs.github.io/iamone-static";
export const BASE_URL = "https://iamone-render-functions.vercel.app";
