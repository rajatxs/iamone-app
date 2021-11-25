import { Doc } from './'

export interface User extends Doc {
   username: string,
   fullname?: string,
   bio?: string,
   company?: string,
   email: string,
   emailVerified?: boolean,
   image?: string,
   createdAt?: string,
}

export interface UserState {
   _loaded: boolean,
   _data: User
}


