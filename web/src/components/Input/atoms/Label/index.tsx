import React from 'react'

// import { Container } from './styles';
interface ILabelProps {
  label?: string
}
const Label: React.FC<ILabelProps> = ({ label }) => {
  return label ? <label className="form-label">{label}</label> : <></>
}

export default Label
