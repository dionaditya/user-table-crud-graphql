import React, { useState } from 'react'
import { screen, fireEvent, render } from '@testing-library/react'
import { UserFormModal } from './UserFormModal'
import { AdhocProvider } from '../../../utils/testUtils'
import { User } from '../../../interfaces/user'

const mockOnSaveButtonClicked = jest.fn()

const MockedComponent: React.FC<{ userData: User; isUpdateSession: boolean }> = ({ userData, isUpdateSession }) => {
  const [isUserFormModalOpen, setUserFormModalOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setUserFormModalOpen(true)}>Open user form modal</button>
      {isUserFormModalOpen && (
        <UserFormModal
          isOpen={isUserFormModalOpen}
          onClickCloseButton={() => setUserFormModalOpen(false)}
          onClickSaveButton={(userData) => {
            setUserFormModalOpen(false)
            mockOnSaveButtonClicked(userData)
          }}
          userData={userData}
          isUpdate={isUpdateSession}
        />
      )}
    </div>
  )
}

describe('Component: UserFormModal', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render add new user modal form correctly', () => {
    render(
      <AdhocProvider>
        <MockedComponent
          userData={{
            user_id: '',
            user_name: '',
            email: '',
            registered: '',
          }}
          isUpdateSession={false}
        />
      </AdhocProvider>,
    )

    expect(screen.queryByText('Open user form modal')).not.toBeNull()

    fireEvent.click(screen.getByText('Open user form modal'))

    expect(screen.queryByText('Add New User')).not.toBeNull()

    expect(screen.queryByText('ID')).toBeNull()

    fireEvent.click(screen.getByText('Save'))

    expect(screen.queryByText('Name cannot be blank')).not.toBeNull()

    fireEvent.change(screen.getByPlaceholderText('eg: John Doe'), { target: { value: 'John Doe' } })

    fireEvent.click(screen.getByText('Save'))

    expect(screen.queryByText('Name cannot be blank')).toBeNull()

    expect(screen.queryByText('Your email invalid')).not.toBeNull()

    fireEvent.change(screen.getByPlaceholderText('eg: johndoe@mail.com'), { target: { value: 'johndoe@mail.com' } })

    expect(screen.queryByText('Your email invalid')).toBeNull()

    fireEvent.click(screen.getByText('Save'))

    expect(mockOnSaveButtonClicked).toHaveBeenCalledWith({
      user_id: '',
      user_name: 'John Doe',
      email: 'johndoe@mail.com',
      registered: '',
    })

    expect(screen.queryByText('Add New User')).toBeNull()

    fireEvent.click(screen.getByText('Open user form modal'))

    expect(screen.queryByText('Add New User')).not.toBeNull()

    fireEvent.click(screen.getByText('Close'))

    expect(screen.queryByText('Add New User')).toBeNull()
  })

  it('should render update user data modal form correctly', () => {
    render(
      <AdhocProvider>
        <MockedComponent
          userData={  {
            user_id: 'NTI2MTE1NzIwOA==',
            user_name: 'Trevor Macejkovic',
            email: 'Alvera8@hotmail.com',
            registered: '2026-06-18T09:02:28Z',
          }}
          isUpdateSession={true}
        />
      </AdhocProvider>,
    )

    expect(screen.queryByText('Open user form modal')).not.toBeNull()

    fireEvent.click(screen.getByText('Open user form modal'))

    expect(screen.queryByText('Update User Data')).not.toBeNull()

    expect(screen.queryByText('ID')).not.toBeNull()

    fireEvent.change(screen.getByPlaceholderText('eg: John Doe'), { target: { value: 'John Doe' } })

    fireEvent.click(screen.getByText('Save'))

    expect(mockOnSaveButtonClicked).toHaveBeenCalledWith({
      user_id: 'NTI2MTE1NzIwOA==',
      user_name: 'John Doe',
      email: 'Alvera8@hotmail.com',
      registered: '2026-06-18T09:02:28Z',
    })
  })
})
