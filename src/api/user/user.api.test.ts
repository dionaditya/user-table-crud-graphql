import * as graphqlRequest from 'graphql-request'
import { userApi } from './user.api'
import { mockUserData } from '../../__mocks__/mockUserData'


describe('api: user', () => {
  it('return users data', async () => {

    jest.spyOn(graphqlRequest, 'request').mockReturnValue(
      Promise.resolve({
        users: mockUserData
      }),
    )

    const users = await userApi.getAllUser()

    expect(users).toEqual([
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
    ])
  })

  it('should call add user data request and return user data', async () => {

    jest.spyOn(graphqlRequest, 'request').mockReturnValue(
      Promise.resolve({
        add_user_data: mockUserData[0]
      }),
    )

    const user = await userApi.addUserData({
      user_name: 'Trevor Macejkovic',
      email: 'Alvera8@hotmail.com',
      registered: '2026-06-18T09:02:28Z',
    })

    expect(user).toEqual({
      user_id: 'NTI2MTE1NzIwOA==',
      user_name: 'Trevor Macejkovic',
      email: 'Alvera8@hotmail.com',
      registered: '2026-06-18T09:02:28Z',
    })
  })

  it('should call update user data request and return updated user data', async () => {

    jest.spyOn(graphqlRequest, 'request').mockReturnValue(
      Promise.resolve({
        update_user_data: mockUserData[0]
      }),
    )

    const user = await userApi.updateUserData('testID',  {
      user_id: 'NTI2MTE1NzIwOA==',
      user_name: 'Trevor Macejkovic',
      email: 'Alvera8@hotmail.com',
      registered: '2026-06-18T09:02:28Z',
    })

    expect(user).toEqual({
      user_id: 'NTI2MTE1NzIwOA==',
      user_name: 'Trevor Macejkovic',
      email: 'Alvera8@hotmail.com',
      registered: '2026-06-18T09:02:28Z',
    })
  })

  it('should call delete user data request', async () => {

    jest.spyOn(graphqlRequest, 'request').mockReturnValue(
      Promise.resolve({
        delete_user_data: mockUserData[0]
      }),
    )

    const user = await userApi.deleteUserData('testID', mockUserData[0])

    expect(user).toBeTruthy()
  })
})
