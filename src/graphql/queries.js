import gql from "graphql-tag";

export const GET_COMMENT_ENTRY_QUERY = gql`
  query MyQuery(
    $currentPage: Int
    $entryId: Int
    $accessToken: String
    $sort: String
    $limit: Int
  ) {
    getCommentsByEntryId(
      currentPage: $currentPage
      entry_id: $entryId
      limit: $limit
      module_id: 35
      sort: $sort
      access_token: $accessToken
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
  query MyQuery($entryId: Int!, $accessToken: String) {
    getEntryById(id: $entryId, access_token: $accessToken) {
      data {
        actionStatus {
          clip
          follow
          reaction
          mute
        }
        caption
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
  query MyQuery(
    $currentPage: Int
    $limit: Int
    $sort: String
    $accessToken: String
  ) {
    getEntries(
      currentPage: $currentPage
      limit: $limit
      sort: $sort
      access_token: $accessToken
    ) {
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
  $accessToken: String
  $currentPage: Int
  $limit: Int
  $sort: String
  $moduleId: Int
) {
  getSubComments(
    comment_id: $commentId
    entry_id: $entryId
    access_token: $accessToken
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
