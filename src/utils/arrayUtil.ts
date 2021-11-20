import { User } from '@/interfaces/user'
import { sortBy, reverse, prop } from 'ramda'

var sortAscendingArrayBySpesificKey = (array: Record<string, string>[] | User[], key: string) => sortBy(prop(key), array)
var sortDescendingArrayBySpesificKey = (array: Record<string, string>[] | User[], key: string) => reverse(sortAscendingArrayBySpesificKey(array, key))

export {
  sortAscendingArrayBySpesificKey,
  sortDescendingArrayBySpesificKey
}