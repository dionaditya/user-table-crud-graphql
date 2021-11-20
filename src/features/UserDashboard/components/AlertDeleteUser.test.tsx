import React, { useState } from 'react'
import { screen, fireEvent, render } from '@testing-library/react'
import { AlertDeleteUser } from './AlertDeleteUser'
import { AdhocProvider } from '../../../utils/testUtils'

const mockOnDeleteButtonClicked = jest.fn()

const MockedComponent: React.FC = () => {
  const [isAlertDeleteUserOpen, setAlertUserDeleteOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setAlertUserDeleteOpen(true)}>Open alert delete user</button>
      {isAlertDeleteUserOpen && (
        <AlertDeleteUser
          isOpen={isAlertDeleteUserOpen}
          onCancelButtonClicked={() => setAlertUserDeleteOpen(false)}
          onDeleteButtonClicked={() => {
            setAlertUserDeleteOpen(false)
            mockOnDeleteButtonClicked()
          }}
        />
      )}
    </div>
  )
}

describe('Component: UserFormModal', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should open alert delete user and trigger delete user', () => {
    render(
      <AdhocProvider>
        <MockedComponent />
      </AdhocProvider>,
    )

    expect(screen.queryByText('Open alert delete user')).not.toBeNull()

    fireEvent.click(screen.getByText('Open alert delete user'))

    expect(screen.queryByText('Delete User')).not.toBeNull()

    fireEvent.click(screen.getByText('Delete'))

    expect(mockOnDeleteButtonClicked).toHaveBeenCalledTimes(1)

    expect(screen.queryByText('Delete User')).toBeNull()
  })

  it('should open alert delete user and cancel delete user', () => {
    render(
      <AdhocProvider>
        <MockedComponent />
      </AdhocProvider>,
    )

    expect(screen.queryByText('Open alert delete user')).not.toBeNull()

    fireEvent.click(screen.getByText('Open alert delete user'))

    expect(screen.queryByText('Delete User')).not.toBeNull()

    fireEvent.click(screen.getByText('Cancel'))

    expect(mockOnDeleteButtonClicked).toHaveBeenCalledTimes(0)

    expect(screen.queryByText('Delete User')).toBeNull()
  })

})
