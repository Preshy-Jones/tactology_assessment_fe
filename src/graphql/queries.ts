import { gql } from "@apollo/client";
export const GET_DEPARTMENTS_QUERY = gql`
  query GetDepartments($page: Int, $limit: Int) {
    GetDepartments(page: $page, limit: $limit) {
      departments {
        id
        name
        subDepartments {
          id
          name
        }
      }
      total
      page
      limit
      totalPages
    }
  }
`;
