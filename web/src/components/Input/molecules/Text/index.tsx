import React, { useMemo } from 'react'
import ContainerInput from '../../atoms/ContainerInput'
import Label from '../../atoms/Label'
import SpanError from '../../atoms/SpanError'
import { IInputProps } from '../../defaulSettings'

interface ITextProps<T = any> extends IInputProps<T> {
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  type?: React.HTMLInputTypeAttribute
}

const Text = <T,>(props: ITextProps<T>): React.ReactElement<T> => {
  const { label, name, type = 'text', placeholder, formReferenceData, onBlur, ...rest } = props
  const { formState, register } = formReferenceData

  const { error } = useMemo(() => {
    return formReferenceData.getFieldState(name)
  }, [formState.errors])

  return (
    <ContainerInput hasError={!!error}>
      <Label label={label} />
      <input
        {...rest}
        className="form-input"
        type={type}
        id={`input-${name}`}
        placeholder={placeholder || label}
        {...register(name, { onBlur })}
      />
      <SpanError error={error?.message} />
    </ContainerInput>
  )
}

export default Text
