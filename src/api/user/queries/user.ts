import { gql } from 'graphql-request'

export const GET_ALL_USER = gql`
    query {
        users {
            user_id
            user_name
            email
            registered
            score
        }
    }
`;

export const ADD_USER_DATA = gql`
    mutation {
      add_user_data(userData: "2") {
        user_id
        user_name
        email
        registered
        score
      }
    }
`;


export const UPDATE_USER_DATA = gql`
    mutation {
      update_user_data(id: "2", updatedUserData: "2") {
        user_id
        user_name
        email
        registered
        score
      }
    }
`;

export const DELETE_USER_DATA = gql`
    mutation {
      delete_user_data(id: "2") {
        user_id
        user_name
        email
        registered
        score
      }
    }
`;
