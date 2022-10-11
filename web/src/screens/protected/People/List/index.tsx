import { AxiosError } from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deletePeoples, getPeoples } from '../../../../api/peoples'
import { queryClient } from '../../../../App'
import { Button } from '../../../../components/button'
import { useModal } from '../../../../hooks/ModalProvider'
import { useToast } from '../../../../hooks/ToastProvider/toastContext'
import useAccessToken from '../../../../hooks/useAccessToken'
import { IPeople } from '../../../../interfaces/models'
import Form from '../Form'

const PeopleList: React.FC = () => {
  const { openModal } = useModal()
  const { removeAccessToken } = useAccessToken()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { data, isLoading } = useQuery('peoples_query', () => getPeoples().then((res) => res.data))

  const appendPeople = (people?: IPeople) => {
    openModal({
      title: people ? 'Atualizar pessoa' : 'Adicionar pessoa',
      elementChildren: <Form people={people} />,
    })
  }
  const removePeople = (id: number) => {
    deletePeoples(id)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Pessoa deletada com sucesso !',
        })
        queryClient.invalidateQueries('peoples_query')
      })
      .catch((err: AxiosError<any>) => {
        addToast({
          title: err?.response?.data.message ?? '',
          type: 'error',
        })
      })
  }

  const logout = () => {
    navigate('/auth/sign-in')
    removeAccessToken()
  }

  return (
    <div className="col-10 col-mx-auto  mt-2">
      <Button.Icon icon="close" onClick={logout} type="button" />
      <div className="mt-2">
        <Button.SuccessButton className="mb-2" title="Adicionar Pessoa" onClick={() => appendPeople()} type="button" />
        <div className="card">
          <table className="table ">
            <thead className="bg-gray">
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td>...loading</td>
                </tr>
              ) : (
                data?.map((people) => (
                  <tr key={people.id}>
                    <td>{people.id}</td>
                    <td>{people.name}</td>
                    <td>
                      <div className="d-flex">
                        <i className="icon icon-edit c-hand mx-2" onClick={() => appendPeople(people)} />
                        <i className="icon icon-delete c-hand" onClick={() => removePeople(people.id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PeopleList
