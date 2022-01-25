const isProd = process.env.NODE_ENV === "production";

export const REMOTE_SERVER_URL = isProd
   ? "https://iamone.link"
   : "http://localhost:5000";

export const REMOTE_API_SERVER_URL = REMOTE_SERVER_URL + "/_/api";

export const REMOTE_THEME_SOURCE_URL = REMOTE_SERVER_URL + "/_/themes";
