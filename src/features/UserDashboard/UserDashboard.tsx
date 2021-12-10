/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import { userApi } from '../../api/user'
import { User } from '../../interfaces/user'
import { UserFormModal } from './components/UserFormModal'
import { useToast } from '@chakra-ui/react'
import { AlertDeleteUser } from './components/AlertDeleteUser'
import {
  Flex,
  Text,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import { sortAscendingArrayBySpesificKey, sortDescendingArrayBySpesificKey } from '../../utils/arrayUtil'
import { compareAsc, compareDesc } from 'date-fns'
import { stringSimilarity } from '../../utils/stringUtils'

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
    name: 'score',
    data_mapper: 'score',
  },
  {
    name: 'registered',
    data_mapper: 'registered',
  },
]

const DEFAULT_USER_FORM_VALUE = {
  user_name: '',
  user_id: '',
  email: '',
  registered: '',
  score: 0,
}

type SortDirection = 'ASC' | 'DESC' | 'NONE'

interface ISortParams {
  currentSortDirection: SortDirection
  sortedColumn: string
}

const useSortDirection = () => {
  const [sortParams, setSortParams] = useState<ISortParams>({
    currentSortDirection: 'NONE',
    sortedColumn: '',
  })

  const setNextDirection = (selectedColumn: string) => {
    let nextSortDirection: SortDirection = 'NONE'
    let prevSortDirection: SortDirection = sortParams.currentSortDirection

    if (selectedColumn !== sortParams.sortedColumn) {
      prevSortDirection = 'NONE'
    }

    switch (prevSortDirection) {
      case 'ASC':
        nextSortDirection = 'DESC'
        break
      case 'DESC':
        nextSortDirection = 'NONE'
        break
      default:
        nextSortDirection = 'ASC'
    }
    setSortParams({
      currentSortDirection: nextSortDirection,
      sortedColumn: selectedColumn,
    })
  }

  return { sortParams, setNextDirection }
}

const sortCurrentUserList = (currentSortDirection: SortDirection, sortedColumn: string, userList: User[]) => {
  if (currentSortDirection === 'ASC') {
    return sortAscendingArrayBySpesificKey(userList, sortedColumn)
  }

  if (currentSortDirection === 'DESC') {
    return sortDescendingArrayBySpesificKey(userList, sortedColumn)
  }

  return userList
}

const sortCurrentUserListByRegisteredColumn = (currentSortDirection: SortDirection, userList: User[]) => {
  return userList.sort((prevUserList, currentUserList) => {
    if (currentSortDirection === 'ASC') {
      return compareAsc(new Date(currentUserList.registered), new Date(prevUserList.registered))
    }

    if (currentSortDirection === 'DESC') {
      return compareDesc(new Date(currentUserList.registered), new Date(prevUserList.registered))
    }

    return 0
  })
}

const UserDashboard = () => {
  const { data: users = [] } = useQuery<User[]>('user', async () => userApi.getAllUser())
  const [usersList, setUserList] = useState(users)
  const [isUserFormModalOpen, setUserFormModalOpen] = useState(false)
  const [userFormValue, setUserFormValue] = useState({
    ...DEFAULT_USER_FORM_VALUE,
  })
  const [isUpdateSession, setUpdateSession] = useState(false)
  const [isAlertDeleteUserOpen, setAlerDeleteUserOpen] = React.useState(false)
  const { sortParams, setNextDirection } = useSortDirection()
  const [searchQuery, setSearchQuery] = useState('')

  const [hoveredRow, setHoveredRow] = useState('')

  const toast = useToast()

  useEffect(() => {
    setUserList([...users])
  }, [users.length])

  useEffect(() => {
    const { sortedColumn, currentSortDirection } = sortParams
    if (!sortedColumn) {
      return
    }

    if (sortedColumn !== 'registered') {
      setUserList(prevUserList => sortCurrentUserList(currentSortDirection, sortedColumn, prevUserList))
    } else {
      setUserList(prevUserList => sortCurrentUserListByRegisteredColumn(currentSortDirection, prevUserList))
    }
  }, [sortParams])

  const updateUserData = useMutation(({ id, userData }: any) => userApi.updateUserData(id, userData), {
    onSuccess: userData => {
      toast({
        title: 'User data heve been updated.',
        description: `User with id: ${userData.user_id} updated`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      const remainsUserData = usersList.filter(user => user.user_id !== userData.user_id)

      setUserList([userData, ...remainsUserData])
    },
    onError: error => {
      console.log(error.toString())
      toast({
        title: 'Failed to update user data',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
  })

  const deleteUserData = useMutation(({ id, userData }: any) => userApi.deleteUserData(id, userData), {
    onSuccess: userData => {
      toast({
        title: 'User data heve been deleted.',
        description: `User with id: ${userData.user_id} deleted`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })

      const remainsUserData = usersList.filter(user => user.user_id !== userData.user_id)

      setUserList([...remainsUserData])
    },
    onError: error => {
      toast({
        title: 'Failed to delete user data',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
  })

  const addNewUser = useMutation(({ userData }: any) => userApi.addUserData(userData), {
    onSuccess: newUser => {
      setUserList([newUser, ...usersList])
      toast({
        title: 'New User created.',
        description: "We've created user account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    },
    onError: error => {
      console.log(error.toString())
      toast({
        title: 'Failed to create new user.',
        description: error.toString(),
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    },
  })

  const onModalSaveButtonClicked = (userData: User) => {
    if (isUpdateSession) {
      updateUserData.mutate({ id: 'test', userData })
      setUpdateSession(false)
      setUserFormModalOpen(false)
    } else {
      setUserFormModalOpen(false)
      addNewUser.mutate({ userData })
    }
  }

  return (
    <div>
      <Flex width="100%" justifyContent="space-between" marginBottom={10}>
        <Flex alignItems="center">
          <Heading as="h2" size="xl">
            User
          </Heading>
          <Text
            css={{
              marginLeft: 20,
              fontWeight: 100,
            }}
          >
            {usersList.length} items
          </Text>
        </Flex>
        <Button
          varian="primary"
          onClick={() => {
            setUserFormModalOpen(true)
            setUserFormValue(DEFAULT_USER_FORM_VALUE)
          }}
        >
          Add new user
        </Button>
      </Flex>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',
          marginBottom: '20px'
        }}
      >
        <InputGroup size="md">
          <InputLeftElement>
            <IconButton background="transparent" icon={<SearchIcon />} aria-label="search icon"/>
          </InputLeftElement>
          <Input
            placeholder="Basic usage"
            css={{
              background: 'white',
              width: '200px',
              paddingLeft: '32px',
            }}
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value)
            }}
          />
        </InputGroup>
      </div>

      <Table variant="simple">
        <Thead>
          <Tr
            css={{
              position: 'sticky',
              top: 0,
              left: 0,
              zIndex: 2,
              background: 'white  ',
            }}
          >
            {COLUMNS.map(column => {
              return (
                <Th
                  css={{
                    cursor: 'pointer',
                  }}
                  key={column.name}
                  onClick={() => setNextDirection(column.data_mapper)}
                >
                  <Flex>
                    <Text>{column.name}</Text>
                    {sortParams.sortedColumn === column.data_mapper && sortParams.currentSortDirection === 'ASC' && (
                      <ArrowDownIcon />
                    )}

                    {sortParams.sortedColumn === column.data_mapper && sortParams.currentSortDirection === 'DESC' && (
                      <ArrowUpIcon />
                    )}
                  </Flex>
                </Th>
              )
            })}
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {usersList.length > 0 &&
            usersList.filter((user) => {
              return searchQuery.length > 0 ? stringSimilarity(searchQuery, user.user_name) >= 0.1 : true
            }).map((user, rowIndex) => {
              return (
                <Tr
                  key={user.user_id}
                  onMouseEnter={() => {
                    setHoveredRow(user.user_id)
                  }}
                  onMouseLeave={() => {
                    setHoveredRow('')
                  }}
                  css={{
                    height: 80,
                  }}
                >
                  {COLUMNS.map((column, columnIndex) => {
                    return (
                      <Td
                        onClick={() => {
                          setUserFormValue({ ...user })
                          setUserFormModalOpen(true)
                          setUpdateSession(true)
                        }}
                        css={{
                          marginRight: '6px',
                          fontWeight: column.name === 'name' ? 'bold' : 'normal',
                          cursor: column.name === 'name' ? 'pointer' : '',
                        }}
                        key={column.name + user.user_id}
                        data-testid={`row-${rowIndex}-column-${columnIndex}`}
                      >
                        {user[column.data_mapper]}
                      </Td>
                    )
                  })}
                  <Td>
                    {hoveredRow === user.user_id && (
                      <IconButton
                        aria-label={`delete-${user.user_id}`}
                        icon={<DeleteIcon />}
                        onClick={() => {
                          setUserFormValue({ ...user })
                          setAlerDeleteUserOpen(true)
                        }}
                      />
                    )}
                  </Td>
                </Tr>
              )
            })}
        </Tbody>
      </Table>
      {isUserFormModalOpen && (
        <UserFormModal
          isOpen={isUserFormModalOpen}
          onClickCloseButton={() => setUserFormModalOpen(false)}
          onClickSaveButton={onModalSaveButtonClicked}
          userData={userFormValue}
          isUpdate={isUpdateSession}
        />
      )}

      {isAlertDeleteUserOpen && (
        <AlertDeleteUser
          isOpen={isAlertDeleteUserOpen}
          onCancelButtonClicked={() => {
            setAlerDeleteUserOpen(false)
          }}
          onDeleteButtonClicked={() => {
            deleteUserData.mutate({ id: userFormValue.user_id, userData: userFormValue })
            setAlerDeleteUserOpen(false)
          }}
        />
      )}
    </div>
  )
}

export { UserDashboard }
