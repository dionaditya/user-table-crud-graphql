import { screen, fireEvent } from '@testing-library/react'
import { UserDashboard } from './UserDashboard'
import { renderWithQueryClient } from '../../utils/testUtils'
import { userApi } from '../../api/user'
import { User } from '@/interfaces/user'
import { act } from 'react-dom/test-utils'

function defuse(promise) {
  promise.catch(() => {})
  return promise
}

describe('Feature: UserDashboard', () => {
  jest.spyOn(userApi, 'getAllUser').mockReturnValue(
    Promise.resolve([
      {
        user_id: 'NTI2MTE1NzIwOA==',
        user_name: 'Trevor Macejkovic',
        email: 'Alvera8@hotmail.com',
        registered: '2026-06-18T09:02:28Z',
      },
      {
        user_id: 'NzM5MTM4OTY1Nw==',
        user_name: 'Margaret Gerlach',
        email: 'Clarabelle.Stark@hotmail.com',
        registered: '2019-09-10T03:59:18Z',
      },
      {
        user_id: 'NDMxODY2ODk5NQ==',
        user_name: 'Marion Robel II',
        email: 'Verda_Fritsch0@yahoo.com',
        registered: '2013-02-12T02:04:47Z',
      },
      {
        user_id: 'MzQ2NTkzOTEzMQ==',
        user_name: 'Delia Rolfson',
        email: 'Cordelia.McKenzie27@hotmail.com',
        registered: '2013-12-26T12:51:48Z',
      },
    ] as User[]),
  )

  const addUserDataSpy = jest.spyOn(userApi, 'addUserData').mockReturnValue(
    Promise.resolve({
      user_id: 'NTI2MTE1NzIwOA==e',
      user_name: 'John Doe',
      email: 'johndoe@mail.com',
      registered: '2026-06-18T09:02:28Z',
    } as User),
  )

  const updateUserDataSpy = jest.spyOn(userApi, 'updateUserData').mockReturnValueOnce(
    Promise.resolve({
      user_id: 'NTI2MTE1NzIwOA==',
      user_name: 'John Doe',
      email: 'johndoe@mail.com',
      registered: '2026-06-18T09:02:28Z',
    } as User),
  )

  it('should display user data correctly', async () => {
    await renderWithQueryClient(UserDashboard)

    expect(screen.queryByText('Trevor Macejkovic')).not.toBeNull()
    expect(screen.queryByText('Marion Robel II')).not.toBeNull()
    expect(screen.queryByText('Delia Rolfson')).not.toBeNull()
  })

  it('should add new user to user table', async () => {
    addUserDataSpy.mockReturnValueOnce(
      defuse(new Promise((resolve, reject) => setTimeout(() => reject(new Error('Oops')), 0))),
    )

    await renderWithQueryClient(UserDashboard)

    fireEvent.click(screen.getByText('Add new user'))

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

    await act(async () => {
      fireEvent.click(screen.getByText('Save'))
    })

    expect(screen.queryByText('Failed to create new user.')).not.toBeNull()

    addUserDataSpy.mockReturnValueOnce(
      Promise.resolve({
        user_id: 'NTI2MTE1NzIwOA==e',
        user_name: 'John Doe',
        email: 'johndoe@mail.com',
        registered: '2026-06-18T09:02:28Z',
      } as User),
    )

    fireEvent.click(screen.getByText('Add new user'))

    expect(screen.queryByText('ID')).toBeNull()

    fireEvent.click(screen.getByText('Save'))

    expect(screen.queryByText('Name cannot be blank')).not.toBeNull()

    fireEvent.change(screen.getByPlaceholderText('eg: John Doe'), { target: { value: 'John Doe' } })

    fireEvent.click(screen.getByText('Save'))

    expect(screen.queryByText('Name cannot be blank')).toBeNull()

    expect(screen.queryByText('Your email invalid')).not.toBeNull()

    fireEvent.change(screen.getByPlaceholderText('eg: johndoe@mail.com'), { target: { value: 'johndoe@mail.com' } })

    expect(screen.queryByText('Your email invalid')).toBeNull()

    await act(async () => {
      fireEvent.click(screen.getByText('Save'))
    })

    expect(screen.queryByText('John Doe')).not.toBeNull()

    expect(screen.queryByText('Add New User')).toBeNull()

    fireEvent.click(screen.getByText('Add new user'))

    expect(screen.queryByText('Add New User')).not.toBeNull()

    fireEvent.click(screen.getByText('Close'))

    expect(screen.queryByText('Add New User')).toBeNull()
  })

  it('should call update user data request and display updated data to user table', async () => {
    await renderWithQueryClient(UserDashboard)

    fireEvent.click(screen.getByText('Trevor Macejkovic'))

    expect(screen.queryByText('Update User Data')).not.toBeNull()

    fireEvent.change(screen.getByPlaceholderText('eg: John Doe'), { target: { value: 'John Doe' } })

    fireEvent.change(screen.getByPlaceholderText('eg: johndoe@mail.com'), { target: { value: 'johndoe@mail.com' } })

    await act(async () => {
      fireEvent.click(screen.getByText('Save'))
    })

    expect(screen.queryByText('John Doe')).not.toBeNull()

    expect(screen.queryByText('Trevor Macejkovic')).toBeNull()
  })

  it('should delete user from user list', async () => {
    jest.spyOn(userApi, 'deleteUserData').mockReturnValueOnce(
      Promise.resolve({
        user_id: 'NTI2MTE1NzIwOA==',
        user_name: 'John Doe',
        email: 'johndoe@mail.com',
        registered: '2026-06-18T09:02:28Z',
      } as User),
    )

    await renderWithQueryClient(UserDashboard)

    fireEvent.mouseEnter(screen.getByText('Trevor Macejkovic'))

    expect(screen.queryByLabelText('delete-NTI2MTE1NzIwOA==')).not.toBeNull()

    fireEvent.click(screen.queryByLabelText('delete-NTI2MTE1NzIwOA=='))

    expect(screen.queryByText('Delete User')).not.toBeNull()

    await act(async () => {
      fireEvent.click(screen.getByText('Delete'))
    })

    expect(screen.queryByText('NTI2MTE1NzIwOA==')).toBeNull()
  })

  it('should sort data by column value correctly', async () => {
    await renderWithQueryClient(UserDashboard)

    expect(screen.queryByTestId('row-0-column-0')).not.toBeNull()

    await act(async () => {
      fireEvent.click(screen.getByText('name'))
    })

    expect(screen.getByTestId('row-0-column-1').textContent).toEqual('Delia Rolfson')

    await act(async () => {
      fireEvent.click(screen.getByText('name'))
    })

    expect(screen.getByTestId('row-0-column-1').textContent).toEqual('Trevor Macejkovic')

    await act(async () => {
      fireEvent.click(screen.getByText('name'))
    })

    expect(screen.getByTestId('row-0-column-1').textContent).toEqual('Trevor Macejkovic')

    await act(async () => {
      fireEvent.click(screen.getByText('registered'))
    })

    expect(screen.getByTestId('row-0-column-1').textContent).toEqual('Trevor Macejkovic')

    await act(async () => {
      fireEvent.click(screen.getByText('registered'))
    })

    expect(screen.getByTestId('row-0-column-1').textContent).toEqual('Trevor Macejkovic')

    await act(async () => {
      fireEvent.click(screen.getByText('registered'))
    })

    expect(screen.getByTestId('row-0-column-1').textContent).toEqual('Marion Robel II')
  })
})
