
export interface AuthState {
   _status: boolean
}

export interface AuthPayload {
   username?: string,
   email?: string,
   password: string
}

export interface AuthSuccessResponse {
   accessToken: string,
   refreshToken: string
}
