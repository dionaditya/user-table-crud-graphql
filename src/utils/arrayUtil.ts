import { User } from '@/interfaces/user'
import { sortBy, reverse, prop } from 'ramda'

const sortAscendingArrayBySpesificKey = (array: Record<string, string>[] | User[], key: string) => sortBy(prop(key), array)
const sortDescendingArrayBySpesificKey = (array: Record<string, string>[] | User[], key: string) => reverse(sortAscendingArrayBySpesificKey(array, key))

export {
  sortAscendingArrayBySpesificKey,
  sortDescendingArrayBySpesificKey
}