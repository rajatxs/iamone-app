
const storage = {

   /** Check whether clientId id exists or not */
   get hasClientId(): boolean {
      return !!this.clientId
   },

   /** Get clientId */
   get clientId(): string {
      return localStorage.getItem('CLIENT_ID') || ''
   },

   /** Set clientId */
   set clientId(id: string) {
      localStorage.setItem('CLIENT_ID', id)
   }
}

export default storage
