import React, { createContext, useCallback, useContext, useState } from 'react'
import Modal from '../../components/feedback/Modal'

export interface IOpenModalProps {
  title: string
  elementChildren: React.ReactElement | React.ReactElement[]
}

interface IModalProps {
  openModal(data: IOpenModalProps): void
  closeModal(): void
  isOpen: boolean
}

const ModalContext = createContext<IModalProps>({} as IModalProps)

interface IModalProvider {
  children: React.FC | React.ReactElement | React.ReactElement[]
}
const ModalProvider: React.FC<IModalProvider> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [arrayListModal, setArrayListModal] = useState<IOpenModalProps[]>([])

  const closeModal = (): void => {
    setArrayListModal(arrayListModal.slice(0, -1))
    setIsOpen(false)
    document.body.style.overflowY = 'scroll'
    document.removeEventListener('keydown', closeModal)
  }

  const openModal = useCallback((data: IOpenModalProps): void => {
    setArrayListModal([...arrayListModal, data])
  }, [])

  return (
    <ModalContext.Provider value={{ closeModal, isOpen, openModal }}>
      <>
        {arrayListModal.map((itemModal, index) => (
          <Modal key={index} modalProps={itemModal} />
        ))}
        {children}
      </>
    </ModalContext.Provider>
  )
}

function useModal(): IModalProps {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}

export { ModalProvider, useModal }
