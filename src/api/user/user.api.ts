import { request } from 'graphql-request'
import { BASE_URL } from '../../utils/apiUtils'
import { GET_ALL_USER } from './queries/user'
import { User } from '../../interfaces/user'

const getAllUser = async () => {
  const { users } =  await request(`${BASE_URL}/graphql`, GET_ALL_USER)
  return users as User[]
}

export const userApi = {
  getAllUser,
}