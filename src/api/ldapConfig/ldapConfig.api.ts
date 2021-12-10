import mockProfilesData from '../../__mocks__/profiles.json'

const getProfiles = async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProfilesData.data);
    }, 300);
  });
}

export const ldapconfigApi = {
  getProfiles
}