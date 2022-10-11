import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { createAccount } from '../../../../api/auth'
import { Button } from '../../../../components/button'
import Inputs from '../../../../components/Input'
import BoxContainer from '../../../../components/layout/Container'
import { useToast } from '../../../../hooks/ToastProvider/toastContext'
import { Container } from './styles'

interface IFormDataProps {
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [loadSubmit, setLoadSubmit] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })

  const formReferenceData = useForm<IFormDataProps>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (responseDataForms: IFormDataProps) => {
    setLoadSubmit(true)
    await createAccount(responseDataForms)
      .then(() => {
        addToast({
          title: 'Conta criada com sucesso!',
          type: 'success',
        })
        navigate('/auth/sign-in')
      })
      .catch((err: AxiosError<any>) => {
        addToast({
          title: err?.response?.data.message ?? '',
          type: 'error',
        })
      })

    setLoadSubmit(false)
  }

  return (
    <Container>
      <BoxContainer>
        <form onSubmit={formReferenceData.handleSubmit(onSubmit)}>
          <div className="card-header center">
            <h5 className="text-center">
              <strong>Criar conta</strong>
            </h5>
          </div>

          <div className="card-body">
            <Inputs.Text formReferenceData={formReferenceData} type="email" name="email" label="E-mail" />
            <Inputs.Text formReferenceData={formReferenceData} name="password" type="password" label="Senha" />
            <Button.Primary onClick={() => {}} type="submit" loadSubmit={loadSubmit} title="Criar" />
            <Button.Outline onClick={() => navigate('/auth/sign-in')} type="button" title="Ir para o login" />
          </div>
        </form>
      </BoxContainer>
    </Container>
  )
}

export default SignUp
