import React from 'react'
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react'

interface IModalProps {
  isOpen: boolean
  onClickCloseButton: () => void
  modalBody: React.ReactNode
  modalTitle: React.ReactNode | string
  modalFooter: React.ReactNode
}

const CustomModal: React.FC<IModalProps> = ({isOpen, onClickCloseButton, modalBody, modalFooter, modalTitle}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClickCloseButton} size={'lg'}>
        <ModalOverlay />
        <ModalContent
          
        >
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          >
           {modalBody}
          </ModalBody>

          <ModalFooter>
            {modalFooter}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export {
  CustomModal
}