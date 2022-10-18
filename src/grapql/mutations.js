import gql from "graphql-tag";

const PLA_POST_MUTATION = gql`
  mutation MyMutation(
    $caption: String!
    $moduleId: Int!
    $description: String!
    $images: String!
    $categoryId: Int!
    $userId: Int!
  ) {
    createEntry(
      input: {
        caption: $caption
        images: $images
        module_id: $moduleId
        description: $description
        category_l_id: $categoryId
        user_id: $userId
      }
    ) {
      result_code
      data {
        caption
        created
        id
        description
      }
    }
  }
`;
export default PLA_POST_MUTATION;
