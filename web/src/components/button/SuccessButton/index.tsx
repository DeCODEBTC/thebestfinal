import React from 'react'

interface ISuccessButtonProps {
  loadSubmit?: boolean
  disabled?: boolean
  title: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick: ([key]: any) => any
  btnSize?: 'btn-lg' | 'btn-sm'
}
const SuccessButton: React.FC<ISuccessButtonProps> = ({
  loadSubmit,
  disabled = false,
  onClick,
  title,
  type,
  className,
  btnSize,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        loadSubmit ? `btn btn-success ${btnSize} loading ${className}` : `btn btn-success ${btnSize} ${className}`
      }
      type={type}
      {...rest}
    >
      {title}
    </button>
  )
}

export default SuccessButton
