import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
import ToastContainer from './ToastContainer'
import { ToastContext, IToastMessages } from './toastContext'

const ToastProvider: React.FC<any> = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessages[]>([])

  const addToast = ({ type, title = '' }: Omit<IToastMessages, 'id'>): void => {
    const id = uuid()
    const toast = {
      id,
      type,
      title,
    }

    setMessages((oldMessages) => [...oldMessages, toast])
  }

  const removeToast = (id: string): void => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer messages={messages} />
      {children}
    </ToastContext.Provider>
  )
}

export { ToastProvider }
