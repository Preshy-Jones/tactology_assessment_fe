import { gql } from "@apollo/client";

export const GET_DEPARTMENTS_QUERY = gql`
  query GetDepartments {
    getDepartments {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;
