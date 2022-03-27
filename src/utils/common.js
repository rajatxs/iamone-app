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

/**
 * Returns random filename
 * @param {string} extension 
 */
export function generateRandomFilename(extension) {
   let name = (Math.floor(Math.random() * 10e16)).toString(32);
   let timestamp = Date.now().toString(32);

   return `${name}_${timestamp}.${extension}`;
}
