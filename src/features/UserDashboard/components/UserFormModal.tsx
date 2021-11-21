import React, { useState, Fragment, useEffect } from 'react'
import { CustomModal } from '../../../components/CustomModal'
import { User } from '../../../interfaces/user'
import { FormControl, FormLabel, Input, Button, Flex, Text } from '@chakra-ui/react'

interface IUserFormModalProps {
  isOpen: boolean
  userData: User
  isUpdate: boolean
  onClickSaveButton: (userData: User) => void
  onClickCloseButton: () => void
}

interface UserForm {
  label: string
  data_mapper: string
  isDisabled?: boolean
  placeholder?: string
  validation?: (value: string) => boolean
  errorMessage?: string
}

const isEmailValid = (email: string) => {
  const emailValidation = /\S+@\S+\.\S+/
  return emailValidation.test(email)
}

const USER_FORMS: UserForm[] = [
  {
    label: 'ID',
    data_mapper: 'user_id',
    isDisabled: true,
  },
  {
    label: 'Name',
    placeholder: 'eg: John Doe',
    data_mapper: 'user_name',
    validation: (value: string) => value.length > 0,
    errorMessage: 'Name cannot be blank',
  },
  {
    label: 'Email',
    placeholder: 'eg: johndoe@mail.com',
    data_mapper: 'email',
    validation: isEmailValid,
    errorMessage: 'Your email invalid',
  },
  {
    label: 'Score',
    placeholder: 'Insert user score',
    data_mapper: 'score',
    validation: (value: string | number) => {
      return typeof value !== 'string'
    },
    errorMessage: 'Please submit user score'
  },
]

const UserFormModal: React.FC<IUserFormModalProps> = ({
  isOpen,
  isUpdate,
  onClickCloseButton,
  userData,
  onClickSaveButton,
}) => {
  const [userDataFormState, setUserDataFormState] = useState<User | null>(null)
  const [shouldRenderError, setShouldRenderError] = useState(false)

  const isFormError = (userForm: UserForm, formValue: string) => {
    if (!userForm.validation) {
      return true
    }

    return !userForm.validation(formValue)
  }

  useEffect(() => {
    setUserDataFormState(userData)
  }, [userData])

  const handleUserForm = (newValue: string | number, data_mapper: string) => {
    setUserDataFormState({
      ...userDataFormState,
      [data_mapper]: newValue,
    })
  }

  if (!userDataFormState) {
    return null
  }

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        modalTitle={isUpdate ? 'Update User Data' : 'Add New User'}
        modalBody={
          <Fragment>
            {USER_FORMS.map(userForm => {
              const shouldHideIdField = !isUpdate && userForm.label === 'ID'
              const isScoreFields = userForm.data_mapper === "score"

              if (shouldHideIdField) {
                return null
              }

              return (
                <FormControl mb={6} key={userForm.label}>
                  <FormLabel>{userForm.label}</FormLabel>
                  <Input
                    placeholder={userForm?.placeholder}
                    isInvalid={isFormError(userForm, userDataFormState[userForm.data_mapper]) && shouldRenderError}
                    errorBorderColor="red.300"
                    disabled={userForm.isDisabled}
                    value={userDataFormState[userForm.data_mapper]}
                    onChange={event => handleUserForm(event.target.value, userForm.data_mapper)}
                    type={isScoreFields ? 'number' : 'text'}
                  />
                  {userForm?.errorMessage &&
                    shouldRenderError &&
                    isFormError(userForm, userDataFormState[userForm.data_mapper]) && (
                      <Text
                        color="red.300"
                        css={{
                          fontSize: '13px',
                        }}
                      >
                        {userForm.errorMessage}
                      </Text>
                    )}
                </FormControl>
              )
            })}
          </Fragment>
        }
        modalFooter={
          <Flex>
            <Button
              mr={6}
              colorScheme="blue"
              css={{
                marginRight: '4px',
              }}
              onClick={() => {
                if (userDataFormState && userDataFormState.user_name.length > 0 && isEmailValid(userDataFormState.email)) {
                  onClickSaveButton(userDataFormState)
                  setShouldRenderError(false)
                } else {
                  setShouldRenderError(true)
                }
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={() => onClickCloseButton()}>
              Close
            </Button>
          </Flex>
        }
        onClickCloseButton={onClickCloseButton}
      />
    </>
  )
}

export { UserFormModal }
