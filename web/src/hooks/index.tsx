import React from 'react'
import { ModalProvider } from './ModalProvider'
import { ToastProvider } from './ToastProvider'

export const AppProvider: React.FC<any> = ({ children }) => {
  return (
    <ToastProvider>
      <ModalProvider>{children}</ModalProvider>
    </ToastProvider>
  )
}
