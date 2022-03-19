import Vue from "vue";
import { clearAuthTokens, redirectToLoginPage } from "../utils/common";
import { BASE_URL, REMOTE_SERVER_URL, REMOTE_API_SERVER_URL, STATIC_RESOURCE_URL } from "../config";

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
       * Returns absolute url of static resource
       * @param {string} path 
       */
      STATIC_URL(path) {
         return STATIC_RESOURCE_URL + '/' + path;
      },

      /**
       * Returns relative url of social icon
       * @param {string} key
       */
      SOCIAL_ICON(key) {
         return `${STATIC_RESOURCE_URL}/images/social-icons/${key}.svg`;
      },
   },

   computed: {
      /** live page url */
      $livePageUrl() {
         return (
            BASE_URL + "/" + this.$store.getters["user/user"].username
         );
      },

      /** Profile image url */
      $USER_PROFILE_IMAGE() {
         return this.$store.getters['user/profileImageUrl'];
      },
   },

   methods: {

      /** 
       * Resolve absolute url of static resource
       * @param {string} path
       */
      staticUrl(path) {
         return STATIC_RESOURCE_URL + '/' + path;
      },

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
