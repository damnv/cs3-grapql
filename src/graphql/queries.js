import gql from "graphql-tag";

export const GET_COMMENT_ENTRY_QUERY = gql`
  query MyQuery($page: Int, $entryId: Int, $sort: String, $limit: Int) {
    getCommentsByEntryId(
      page: $page
      entry_id: $entryId
      limit: $limit
      module_id: 35
      sort: $sort
    ) {
      result_code
      data {
        currentPage
        items {
          commentId
          actionStatus {
            reaction
            follow
            mute
          }
          content
          createdTime
          entryId
          id
          medias {
            type
            url
          }
          reactions {
            total
            items {
              id
              icon
              count
              caption
            }
          }
          replies {
            currentPage
            limit
            sort
            total
            items {
              user {
                id
                isAdmin
                nickname
                profileImg
                title
              }
              reactions {
                total
                items {
                  caption
                  count
                  icon
                  id
                }
              }
              id
              entryId
              createdTime
              content
              comments
              commentId
              actionStatus {
                follow
                mute
                reaction
              }
            }
          }
          user {
            id
            isAdmin
            nickname
            profileImg
            title
          }
        }
        limit
        sort
        total
      }
    }
  }
`;

export const GET_ENTRY_QUERY = gql`
  query MyQuery($entryId: Int!) {
    getEntryById(id: $entryId) {
      data {
        actionStatus {
          clip
          follow
          reaction
          mute
        }
        caption
        category {
          caption
          description
          id
          img
        }
        comment
        createdTime
        curationSource
        description
        id
        view
        user {
          isAdmin
          id
          nickname
          profileImg
          title
        }
        tags
        thumbnail
        reactions {
          total
          items {
            caption
            count
            icon
            id
          }
        }
        spot {
          city
          country
          name
          region
          street
        }
        module {
          alias
          caption
          id
        }
        medias {
          type
          url
        }
      }
      result_code
    }
  }
`;

export const GET_ENTRIES_QUERY = gql`
  query MyQuery($page: Int, $limit: Int, $sort: String) {
    getEntries(page: $page, limit: $limit, sort: $sort) {
      result_code
      data {
        currentPage
        items {
          actionStatus {
            clip
            follow
            mute
            reaction
          }
          caption
          category {
            caption
            description
            id
            img
          }
          comment
          createdTime
          curationSource
          description
          id
          medias {
            type
            url
          }
          module {
            alias
            caption
            id
          }
          reactions {
            total
            items {
              caption
              count
              icon
              id
            }
          }
          tags
          spot {
            name
            country
            region
            city
            street
          }
          thumbnail
          view
          user {
            id
            isAdmin
            nickname
            profileImg
            title
          }
        }
        limit
        sort
        total
      }
    }
  }
`;

export const GET_SUB_COMMENTS_QUERY = gql`
  query MyQuery(
    $commentId: Int!
    $entryId: Int!
    $currentPage: Int
    $limit: Int
    $sort: String
    $moduleId: Int
  ) {
    getSubComments(
      comment_id: $commentId
      entry_id: $entryId
      currentPage: $currentPage
      limit: $limit
      sort: $sort
      module_id: $moduleId
    ) {
      result_code
      data {
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
          reactions {
            items {
              id
              icon
              count
              caption
            }
            total
          }
          user {
            id
            isAdmin
            nickname
            profileImg
            title
          }
        }
        currentPage
      }
    }
  }
`;

export const GET_ENTRIES_USER_QUERY = gql`
  query MyQuery(
    $limit: Int!
    $page: Int!
    $sort: String!
    $user_id: Int!
  ) {
    getEntriesByUserId(
      limit: $limit
      page: $page
      sort: $sort
      user_id: $user_id) {
      data {
        currentPage
        items {
          caption
          actionStatus {
            clip
            follow
            mute
            reaction
          }
          comment
          category {
            caption
            description
            id
            img
          }
          createdTime
          curationSource
          description
          id
          medias {
            type
            url
          }
          module {
            alias
            caption
            id
          }
          reactions {
            total
            items {
              caption
              count
              icon
              id
            }
          }
          spot {
            city
            country
            name
            region
            street
          }
          tags
          thumbnail
          view
          user {
            title
            id
            isAdmin
            nickname
            profileImg
          }
        }
        limit
        sort
        total
      }
      error {
        error_code
        error_message
        error_params
      }
      result_code
    }
  }
`;