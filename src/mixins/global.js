import Vue from "vue";
import { clearAuthTokens, redirectToLoginPage } from "../utils/common";
import { REMOTE_SERVER_URL, REMOTE_API_SERVER_URL } from "../config";

export default Vue.extend({
   filters: {
      /**
       * Create remote API URL
       * @param {string} endpoint
       */
      REMOTE_API_URL(endpoint) {
         return REMOTE_API_SERVER_URL.concat(endpoint);
      },

      /**
       * Create remote URL
       * @param {string} endpoint
       */
      REMOTE_URL(endpoint) {
         return REMOTE_SERVER_URL.concat(endpoint);
      },

      /**
       * Returns url of user image
       * @param {string} id
       */
      USER_IMAGE(id) {
         return REMOTE_API_SERVER_URL.concat("/user/image/" + id);
      },

      /**
       * Returns relative url of social icon
       * @param {string} key
       */
      SOCIAL_ICON(key) {
         return `/icons/${key}.svg`;
      },
   },

   computed: {
      /** live page url */
      $livePageUrl() {
         return (
            REMOTE_SERVER_URL + "/" + this.$store.getters["user/user"].username
         );
      },
   },

   methods: {
      /**
       * truncate long text
       * @param {string} val - Value
       * @param {number} len - Text length
       */
      truncate(val, len) {
         return val.substring(0, len).concat((val.length >= len)? '...': '');
      },

      /**
       * trigger form submit event
       * @param {string} refName - Reference name
       */
      submitForm(refName) {
         const form = this.$refs[refName];

         if (form instanceof HTMLFormElement) {
            form.requestSubmit();
         }
      },

      logout() {
         clearAuthTokens();
         redirectToLoginPage();
      },
   },
});
