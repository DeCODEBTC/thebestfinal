import React from 'react'

// import { Container } from './styles';

// select https://fonts.google.com/icons?selected=Material+Icons icon
interface IIconProps {
  icon: string
  className?: string
}

const Icon: React.FC<IIconProps> = ({ icon, className = '' }) => {
  return <span className={`material-icons ${className}`}>{icon}</span>
}

export default Icon
