const descriptionMd = `Sortable column with react-query and Graphql`

const description = descriptionMd
  .replace(/\[([^\]]+)\](\([^)]+\)|\[[^\]]+\])/g, '$1')
  .replace(/\n/g, '')
  .replace(/\s{2,}/g, ' ')
  .trim()

module.exports = {
  title: 'User Management',
  descriptionMd,
  description,
  url: 'https://www.seongland.com',
  twitterUsername: '@dionaditya',
  email: 'dionjatingaleh@gmail.com',
  socials: {
    GitHub: 'https://github.com/dionaditya/user-table-crud-graphql',
    Twitter: 'https://twitter.com/dionaditya',
  },
  bgColor: '#1A202C',
  themeColor: '#46c0aE',
}
