import { AxiosError } from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { createPeople, ICreatePeopleRequest, updatePeoples } from '../../../../api/peoples'
import { queryClient } from '../../../../App'
import { Button } from '../../../../components/button'
import Inputs from '../../../../components/Input'
import { useModal } from '../../../../hooks/ModalProvider'
import { useToast } from '../../../../hooks/ToastProvider/toastContext'
import { IPeople } from '../../../../interfaces/models'

interface IForm {
  people?: IPeople
}
const Form: React.FC<IForm> = ({ people }) => {
  const form = useForm<ICreatePeopleRequest>({
    defaultValues: people,
  })
  const { closeModal } = useModal()
  const { addToast } = useToast()

  const appendPeople = useMutation((data: ICreatePeopleRequest) => {
    return people ? updatePeoples(people.id, data).then((res) => res.data) : createPeople(data).then((res) => res.data)
  })

  const onSubmit = (data: ICreatePeopleRequest) => {
    appendPeople
      .mutateAsync(data)
      .then(() => {
        queryClient.invalidateQueries('peoples_query')
        closeModal()
      })
      .catch((err: AxiosError<any>) => {
        addToast({
          title: err?.response?.data.message ?? '',
          type: 'error',
        })
      })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="card-body">
        <Inputs.Text formReferenceData={form} name="name" type="text" label="Nome" />
        <Button.Primary
          onClick={() => {}}
          type="submit"
          loadSubmit={appendPeople.isLoading}
          title={people ? 'Atualizar' : 'Criar'}
        />
      </div>
    </form>
  )
}

export default Form
