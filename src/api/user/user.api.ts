import { request } from 'graphql-request'
import { BASE_URL } from '../../utils/apiUtils'
import { GET_ALL_USER, UPDATE_USER_DATA, ADD_USER_DATA } from './queries/user'
import { User } from '../../interfaces/user'

const getAllUser = async () => {
  const { users } =  await request(`${BASE_URL}/graphql`, GET_ALL_USER)
  return users as User[]
}

const addUserData = async (userData: Omit<User, 'user_id'>) => {
  const {add_user_data: user_data} = await request(`${BASE_URL}/graphql`, ADD_USER_DATA, {
    userData: JSON.stringify(userData)
  })

  const {email, user_name} = userData
  return {...user_data, email, user_name} as User
}

const updateUserData = async (id: string, updatedUserData: User) => {
  await request(`${BASE_URL}/graphql`, UPDATE_USER_DATA, {
    id,
    updatedUserData: JSON.stringify(updatedUserData)
  })
  return updatedUserData as User
}

const deleteUserData = async (id: string, userData: User) => {
  await request(`${BASE_URL}/graphql`, UPDATE_USER_DATA, {
    id,
  })
  return userData as User
}


export const userApi = {
  getAllUser,
  addUserData,
  updateUserData,
  deleteUserData
}