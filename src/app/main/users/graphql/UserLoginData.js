import { gql } from "@apollo/client";

const UserLoginFields = gql`
  fragment UserLoginFields on User {
    id
    email
    firstName
    lastName
    profileImage
    role {
      id
      name
      accesses {
        id
        slug
        name
        can_view
        can_view_own
        can_edit
        can_create
        can_delete
      }
    }
  }
`;

export const loginDataFields = gql`
  ${UserLoginFields}
  fragment LoginDataFields on LoginData {
    token
    user {
      ...UserLoginFields
    }
  }
`;

export default UserLoginFields;
