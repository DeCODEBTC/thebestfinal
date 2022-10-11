import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export interface IInputProps<T = FieldValues> {
  formReferenceData: UseFormReturn<T, any>
  name: Path<T>
  label?: string
  placeholder?: string
  disabled?: boolean
}
