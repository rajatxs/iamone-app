import axios from 'axios'
import storage from './storage'
import env from './env'

const { remoteUrl } = env
const clientId = storage.clientId
const apiHeaders: any = {
   // 'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
   'Accept': 'application/json',
   'Content-Type': 'application/json'
}

if (clientId) {
   apiHeaders['X-Client-Id'] = clientId
}

export const api = axios.create({
   baseURL: remoteUrl + '/_/api',
   headers: apiHeaders,
   responseType: 'json',
})

export const templateApi = axios.create({
   baseURL: remoteUrl + '/_/templates',
   headers: {
      'Accept': 'text/plain'
   },
   responseType: 'text'
})
