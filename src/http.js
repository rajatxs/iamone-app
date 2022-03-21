import axios from "axios";
import { clearAuthTokens, redirectToLoginPage } from "./utils/common";
import { REMOTE_API_SERVER_URL, BASE_URL } from "./config";
import locals from "./locals";

export const api = axios.create({
   baseURL: REMOTE_API_SERVER_URL,
   responseType: "json",
   headers: {
      Accept: "application/json",
      Authorization: locals.authHeader,
   },
   validateStatus(status) {
      let validate = false;

      switch (status) {
         case 200:
         case 201:
            validate = true;
            break;

         case 401:
            clearAuthTokens();
            redirectToLoginPage();
            validate = false;
            break;
      }

      return validate;
   },
});

export const templateApi = axios.create({
   baseURL: BASE_URL + "/x/templates",
   responseType: "text",
   headers: {
      Accept: "text/html, text/plain",
   },
});
