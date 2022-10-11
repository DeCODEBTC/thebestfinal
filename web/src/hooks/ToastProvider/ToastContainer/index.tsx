import React from 'react'
import { IToastMessages } from '../toastContext'

import { Container } from './styles'
import Toast from './Toast'
interface ToastContainerProps {
  messages: IToastMessages[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    messages && (
      <Container>
        {messages.map((message) => (
          <Toast message={message} style={{}} key={message.id} />
        ))}
      </Container>
    )
  )
}

export default ToastContainer
