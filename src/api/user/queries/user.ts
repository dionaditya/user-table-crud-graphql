import { gql } from 'graphql-request'

export const GET_ALL_USER = gql`
    query {
        users {
            user_id
            user_name
            email
            registered
        }
    }
`;
