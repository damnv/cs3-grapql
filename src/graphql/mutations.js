import gql from "graphql-tag";

export const PLA_POST_MUTATION = gql`
  mutation MyMutation(
    $caption: String
    $moduleId: Int
    $description: String!
    $images: String!
    $categoryId: Int
    $spot: String
  ) {
    createEntry(
      caption: $caption
      images: $images
      module_id: $moduleId
      description: $description
      category_l_id: $categoryId
      spot: $spot
    ) {
      error{
        error_code
        error_message
      }
      result_code
      data {
        id
      }
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation MyMutation(
    $entryId: Int!
    $description: String!
    $commentImg: String
    $commentId: Int
  ) {
    createComment(
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
  mutation MyMutation($commentId: Int!, $reactionId: Int!) {
    createCommentPlus(comment_id: $commentId, reaction_id: $reactionId) {
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
  mutation MyMutation($entryId: Int!, $reactionId: Int!) {
    createEntryPlus(entry_id: $entryId, reaction_id: $reactionId) {
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
  mutation MyMutation($entryId: Int!) {
    deleteEntryPlus(entry_id: $entryId) {
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
  mutation MyMutation($id: Int!) {
    deleteComment(id: $id) {
      result_code
    }
  }
`;

export const DELETE_ENTRY_MUTATION = gql`
  mutation MyMutation($entryId: Int!) {
    deleteEntry(entry_id: $entryId) {
      error {
        error_code
        error_message
      }
      result_code
    }
  }
`;

export const REPORT_MUTATION = gql`
  mutation MyMutation(
    $entryId: Int!
    $targetTable: String
    $url: String
    $violateDetail: String
    $violateType: Int!
  ) {
    createEntryReport(
      entry_id: $entryId
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
    $url: String!
    $caption: String
    $img: String
  ) {
    createEntryClip(
      entry_id: $entryId
      url: $url
      caption: $caption
      img: $img
    ) {
      result_code
    }
  }
`;

export const FOLLOW_USER_MUTATION = gql`
  mutation MyMutation($followingUserId: Int!) {
    createUserFollow(following_user_id: $followingUserId) {
      result_code
    }
  }
`;

export const UPDATE_ENTRY_MUTATION = gql`
  mutation MyMutation (
    $description: String!
    $entry_id: Int!
    $images: String!
    $caption: String!
    $category_l_id: Int!
    $module_id: Int!
  ) {
    updateEntry(
      description: $description
      entry_id: $entry_id
      images: $images
      caption: $caption
      category_l_id: $category_l_id
      module_id: $module_id
    ) {
      data {
        id
      }
      result_code
      error {
        error_code
        error_message
        error_params
      }
    }
  }
`;