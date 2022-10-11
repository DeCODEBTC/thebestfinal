import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { IToastMessages, useToast } from '../../toastContext'

interface IToastProps {
  message: IToastMessages
  style?: any
}

const typesToastClassName = {
  success: 'toast-success',
  error: 'toast-error',
  info: 'toast-primary',
  alert: 'toast-warning',
}

const Toast: React.FC<IToastProps> = ({ message, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 6000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.5 }}
      layout
      role="status"
      className={'toast py-1 ' + typesToastClassName[message.type]}
      style={{ marginBottom: 10, borderRadius: '10px !important' }}
    >
      <button className="btn btn-clear float-right" type="button" onClick={() => removeToast(message.id)} />
      {message.title?.substring(0, 60)}
    </motion.div>
  )
}

export default Toast
