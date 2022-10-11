import React from 'react'
import Icon from '../../layout/Icon'

interface IIconProps {
  loadSubmit?: boolean
  icon: string
  type?: 'button' | 'submit'
  btnSize?: 'btn-lg' | 'btn-sm'
  onClick: () => void
}
const IconButton: React.FC<IIconProps> = ({ loadSubmit, onClick, icon, type, btnSize, ...rest }) => {
  return (
    <button
      onClick={onClick}
      className={loadSubmit ? `btn btn-action ${btnSize} loading ` : `btn btn-action ${btnSize}`}
      type={type}
      {...rest}
    >
      <Icon icon={icon} />
    </button>
  )
}

export default IconButton
