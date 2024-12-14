import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    Login(username: $username, password: $password) {
      access_token
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_DEPARTMENT_MUTATION = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    CreateDepartment(input: $input) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;

export const UPDATE_DEPARTMENT_MUTATION = gql`
  mutation UpdateDepartment(
    $id: Int!
    $name: String!
    $subDepartments: [CreateSubDepartmentInput!]
  ) {
    UpdateDepartment(
      input: { id: $id, name: $name, subDepartments: $subDepartments }
    ) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;

export const DELETE_DEPARTMENT_MUTATION = gql`
  mutation DeleteDepartment($id: Int!) {
    DeleteDepartment(id: $id)
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation RegisterUser($input: CreateUserInput!) {
    RegisterUser(input: $input) {
      id
      username
    }
  }
`;
