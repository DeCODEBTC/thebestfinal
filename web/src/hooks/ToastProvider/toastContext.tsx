import { createContext, useContext } from 'react'

export interface IToastMessages {
  id: string
  type: 'success' | 'error' | 'info' | 'alert'
  title?: string
}

interface IToastContextData {
  addToast(message: Omit<IToastMessages, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData)

function useToast(): IToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastContext, useToast }
