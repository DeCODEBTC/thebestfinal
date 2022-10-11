import React from 'react'

// import { BoxContainer } from './styles';

interface IBoxContainerProps {
  children: React.ReactElement | React.ReactElement[]
  className?: string
}

const BoxContainer: React.FC<IBoxContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`card ${className || 'my-2 '}`}
      style={{
        padding: '1rem',
        border: 'none',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
      }}
    >
      {children}
    </div>
  )
}

export default BoxContainer
