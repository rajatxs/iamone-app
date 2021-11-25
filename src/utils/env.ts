
export default {
   get remoteUrl(): string {
      return (process.env.VUE_APP_REMOTE_API_SERVER_URL || '')
   }
}
