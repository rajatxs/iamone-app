import { api } from './axios'

export async function fetchSiteMetadata(url: string) {
   const response = await api.post('/clink/metadata', {
      url
   })

   return response.data
}
