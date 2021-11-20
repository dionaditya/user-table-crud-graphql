import React, {useState, useRef} from 'react'
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter} from '@chakra-ui/react'

interface IAlertDeleteUserProps {
  isOpen: boolean
  onCancelButtonClicked: () => void
  onDeleteButtonClicked: () => void
}

const AlertDeleteUser: React.FC<IAlertDeleteUserProps> = ({isOpen, onCancelButtonClicked, onDeleteButtonClicked}) => {
  const cancelRef = useRef()

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCancelButtonClicked}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCancelButtonClicked}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteButtonClicked} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export {
  AlertDeleteUser
}