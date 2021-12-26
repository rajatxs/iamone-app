import { api } from '../http'

/** clear auth related tokens */
export function clearAuthTokens() {
   localStorage.removeItem('ACCESS_TOKEN');
   localStorage.removeItem('REFRESH_TOKEN');
}

export function redirectToLoginPage() {
   window.location.href = '/login.html';
}

export async function fetchSiteMetadata(url) {
   const response = await api.post('/clink/metadata', {
      url
   })

   return response.data
}
