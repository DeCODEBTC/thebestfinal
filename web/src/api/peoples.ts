import { AxiosResponse } from 'axios'
import { IPeople } from '../interfaces/models'
import { api } from './api'

export interface ICreatePeopleRequest {
  name: string
}

export const createPeople = async (params: ICreatePeopleRequest): Promise<AxiosResponse<any>> => {
  return api.post('/people', params)
}
export const getPeoples = async (): Promise<AxiosResponse<IPeople[]>> => {
  return api.get('/people')
}
export const updatePeoples = async (id: number, params: ICreatePeopleRequest): Promise<AxiosResponse<any>> => {
  return api.put(`/people/${id}`, params)
}
export const deletePeoples = async (id: number): Promise<AxiosResponse<any>> => {
  return api.delete(`/people/${id}`)
}
