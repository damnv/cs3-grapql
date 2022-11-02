import gql from "graphql-tag";

export const PLA_POST_MUTATION = gql`
  mutation MyMutation(
    $caption: String!
    $moduleId: Int!
    $description: String!
    $images: String!
    $categoryId: Int!
    $accessToken: String
  ) {
    createEntry(
      caption: $caption
      images: $images
      module_id: $moduleId
      description: $description
      category_l_id: $categoryId
      access_token: $accessToken
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

export const CREATE_COMMENT_MUTATION = gql`
  mutation MyMutation(
    $entryId: Int!
    $accessToken: String!
    $description: String!
    $commentImg: String
    $commentId: Int
  ) {
    createComment(
      access_token: $accessToken
      entry_id: $entryId
      description: $description
      comment_img: $commentImg
      comment_id: $commentId
    ) {
      result_code
      data {
        commentId
        content
        createdTime
        entryId
        id
        reactions {
          items {
            caption
            count
            icon
            id
          }
          total
        }
        replies {
          currentPage
          total
          sort
          limit
          items {
            actionStatus {
              clip
              follow
              mute
              reaction
            }
            id
            entryId
            createdTime
            content
            comments
            commentId
          }
        }
        user {
          title
          profileImg
          nickname
          isAdmin
          id
        }
      }
      result_code
    }
  }
`;

export const CREATE_COMMENT_PLUS_MUTATION = gql`
  mutation MyMutation(
    $commentId: Int!
    $reactionId: Int!
    $accessToken: String
  ) {
    createCommentPlus(
      comment_id: $commentId
      reaction_id: $reactionId
      access_token: $accessToken
    ) {
      result_code
      data {
        reactions {
          total
          items {
            caption
            count
            icon
            id
          }
        }
        actionStatus {
          reaction
          mute
        }
      }
    }
  }
`;

export const CREATE_ENTRY_PLUS_MUTATION = gql`
  mutation MyMutation($entryId: Int!, $reactionId: Int!, $accessToken: String) {
    createEntryPlus(
      entry_id: $entryId
      reaction_id: $reactionId
      access_token: $accessToken
    ) {
      data {
        actionStatus {
          reaction
        }
        reactions {
          items {
            caption
            count
            icon
            id
          }
          total
        }
      }
      result_code
    }
  }
`;

export const DELETE_ENTRY_PLUS_MUTATION = gql`
  mutation MyMutation($entryId: Int!, $accessToken: String) {
    deleteEntryPlus(access_token: $accessToken, entry_id: $entryId) {
      data {
        actionStatus {
          reaction
        }
        reactions {
          items {
            caption
            count
            icon
            id
          }
          total
        }
      }
      result_code
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
mutation MyMutation($accessToken: String!, $id: Int!) {
  deleteComment(access_token: $accessToken, id: $id) {
    result_code
  }
}`;

export const DELETE_ENTRY_MUTATION = gql`
mutation MyMutation($entryId: Int!, $accessToken: String!) {
  deleteEntry(entry_id: $entryId, access_token: $accessToken) {
    result_code
  }
}
`;

export const REPORT_MUTATION = gql`
mutation MyMutation(
  $entryId: Int!
  $accessToken: String!
  $targetTable: String
  $url: String
  $violateDetail: String
  $violateType: String!

) {
  createEntryReport(
    entry_id: $entryId
    access_token: $accessToken
    target_table: $targetTable
    url: $url
    violate_detail: $violateDetail
    violate_type: $violateType
  ) {
    result_code
  }
}
`;
export const CLIP_ENTRY_MUTATION = gql`
mutation MyMutation(
  $entryId: Int!
  $accessToken: String!
  $url: String!
  $caption: String
  $img: String
) {
  createEntryClip(
    access_token: $accessToken
      entry_id: $entryId
      url: $url
      caption: $caption
      img: $img
  ) {
    result_code
  }
}
`;

export const  FOLLOW_USER_MUTATION = gql`
mutation MyMutation($followingUserId: Int!, $accessToken: String!) {
  createUserFollow(
    following_user_id: $followingUserId
    access_token: $accessToken
  ) {
    result_code
  }
}
`;
