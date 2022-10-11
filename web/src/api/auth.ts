import { AxiosResponse } from 'axios'
import { api } from './api'

export interface ISignInRequest {
  email: string
  password: string
}

interface ICreateAccountResponse {
  id: number
  email: string
}

interface ISignInSuccessResponse {
  user: ICreateAccountResponse
  token: string
}

export const signIn = async (params: ISignInRequest): Promise<AxiosResponse<ISignInSuccessResponse>> => {
  return api.post('/signin', params)
}

export const createAccount = async (params: ISignInRequest): Promise<AxiosResponse<ICreateAccountResponse>> => {
  return api.post('/signup', params)
}
