import LOCAL_STORAGE_KEYS from '../constants/localStorage'

interface UseAccessToken {
  getAccessToken: () => string
  removeAccessToken: () => void
  setAccessToken: (token: string) => void
}

const useAccessToken = (): UseAccessToken => {
  return {
    getAccessToken: () => localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) ?? '',
    removeAccessToken: () => localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
    setAccessToken: (token: string) => {
      if (token) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token)
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
      }
    },
  }
}

export default useAccessToken
