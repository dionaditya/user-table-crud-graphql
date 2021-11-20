import { sortAscendingArrayBySpesificKey, sortDescendingArrayBySpesificKey } from '../arrayUtil'

describe('Util: arrayUtil', () => {
  const array = [{
    id: 'test1',
    name: 'john1'
  }, {
    id: 'test3',
    name: 'john3'
    }, {
    id: 'test2',
    name: 'john2'
  }]
  it('return sorted array by each key with ascending direction', () => {
    expect(sortAscendingArrayBySpesificKey(array, 'id')).toEqual([{
      id: 'test1',
      name: 'john1'
    }, {
      id: 'test2',
      name: 'john2'
      }, {
      id: 'test3',
      name: 'john3'
    }])
  })

  it('return sorted array by each key with descending direction', () => {
    expect(sortDescendingArrayBySpesificKey(array, 'id')).toEqual([{
      id: 'test3',
      name: 'john3'
    }, {
      id: 'test2',
      name: 'john2'
      }, {
      id: 'test1',
      name: 'john1'
    }])
  })
})