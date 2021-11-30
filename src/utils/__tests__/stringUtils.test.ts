import { stringSimilarity } from '../stringUtils'

describe('Utils: stringUtils', () => {
  test('return string similarity in percent', () => {
    expect(stringSimilarity('tes2', 'tes1') * 100).toEqual(60)
  })
})