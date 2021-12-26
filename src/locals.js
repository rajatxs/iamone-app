const locals = {
   /** Access token */
   get accessToken() {
      return localStorage.getItem("ACCESS_TOKEN");
   },

   /** Refresh token */
   get refreshToken() {
      return localStorage.getItem("REFRESH_TOKEN");
   },

   /** Authorization header */
   get authHeader() {
      return ["Bearer", this.accessToken || ""].join(" ");
   },
};

export default locals;
