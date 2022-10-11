import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import * as authApi from '../../../../api/auth'
import { Button } from '../../../../components/button'
import Inputs from '../../../../components/Input'
import BoxContainer from '../../../../components/layout/Container'
import { useToast } from '../../../../hooks/ToastProvider/toastContext'
import useAccessToken from '../../../../hooks/useAccessToken'
import { Container } from './styles'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [loadSubmit, setLoadSubmit] = useState(false)
  const { setAccessToken } = useAccessToken()

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })

  const form = useForm<authApi.ISignInRequest>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (dataParams: authApi.ISignInRequest): Promise<void> => {
    setLoadSubmit(true)
    await authApi
      .signIn(dataParams)
      .then(({ data }) => {
        addToast({
          title: 'Autenticado com sucesso!',
          type: 'success',
        })
        setLoadSubmit(false)
        setAccessToken(data.token)
        navigate('/')
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="card-header teste">
            <strong>Login</strong>
          </div>

          <div className="card-body">
            <Inputs.Text formReferenceData={form} name="email" type="email" label="E-mail" />
            <Inputs.Text formReferenceData={form} name="password" type="password" label="Senha" />
            <Button.Primary onClick={() => {}} type="submit" loadSubmit={loadSubmit} title="Entrar" />
            <Button.Outline onClick={() => navigate('/auth/sign-up')} type="button" title="Cadastre-se" />
          </div>
        </form>
      </BoxContainer>
    </Container>
  )
}

export default SignIn
