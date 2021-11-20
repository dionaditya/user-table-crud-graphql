import React from 'react'
import { useQuery } from 'react-query'
import { userApi } from '../../api/user'
import { User } from '../../interfaces/user'

const COLUMNS = [
  {
    name: 'id',
    data_mapper: 'user_id',
  },
  {
    name: 'name',
    data_mapper: 'user_name',
  },
  {
    name: 'email',
    data_mapper: 'email',
  },
  {
    name: 'registered',
    data_mapper: 'registered',
  },
]

const UserDashboard = () => {
  const { data: users = [] } = useQuery<User[]>('user', async () => userApi.getAllUser())

  return (
    <div>
      <table>
        <thead>
          <tr>
            {COLUMNS.map(column => {
              return <th key={column.name}>{column.name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map(user => {
              return (
                <tr key={user.user_id}>
                  {COLUMNS.map(column => {
                    return <td key={column.name + user.user_id}>{user[column.data_mapper]}</td>
                  })}
                </tr>
              )
            })}
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}

export { UserDashboard }
