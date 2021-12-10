import { ldapconfigApi } from './ldapConfig.api'
import mockPorfilesData from '../../__mocks__/profiles.json'

var globalRef:any =global;

globalRef.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ ...mockPorfilesData }),
  })
);

describe('api: ldapConfig', () => {
  it('return profiles data', async () => {
    const profiles = await ldapconfigApi.getProfiles()

    expect(profiles)
  })
})