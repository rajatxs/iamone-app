import axios from "axios";
import { clearAuthTokens, redirectToLoginPage } from "./utils/common";
import { API_URL, PLATFORM_URL } from "./config";
import locals from "./locals";

export const api = axios.create({
   baseURL: API_URL,
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

export const platformAPI = axios.create({
   baseURL: PLATFORM_URL
});
