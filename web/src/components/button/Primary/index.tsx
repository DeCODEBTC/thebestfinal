import React from 'react'

interface IPrimaryProps {
  loadSubmit?: boolean
  title: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: ([key]: any) => any
  btnSize?: 'btn-lg' | 'btn-sm'
  id?: string
}
const Primary: React.FC<IPrimaryProps> = ({
  loadSubmit,
  onClick,
  title,
  disabled = false,
  type,
  btnSize,
  id,
  className,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={
        loadSubmit ? `btn btn-primary ${btnSize} loading ${className}` : `btn btn-primary ${btnSize} ${className}`
      }
      type={type}
      id={id}
      disabled={disabled}
      {...rest}
    >
      {title}
    </button>
  )
}

export default Primary
