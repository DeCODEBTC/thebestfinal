import { AxiosError } from 'axios'
import LOCAL_STORAGE_KEYS from '../../constants/localStorage'

export const PUBLIC_ROUTES = ['/auth/sign-in', '/500']

const unauthorizedResponseInterceptor = (error: AxiosError): Promise<AxiosError> => {
  const status = error.response?.status

  if (status === 401 && !PUBLIC_ROUTES.includes(window.location.pathname)) {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    window.location.href = '/auth/sign-in'
  }
  return Promise.reject(error)
}

export default unauthorizedResponseInterceptor
