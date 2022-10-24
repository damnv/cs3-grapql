import model.entry_comment as EntryComment
import model.module as Module

def lambda_handler(event, context):
    # TODO implement
    arguments = event.get('arguments')
    entry_id = arguments.get('entry_id')
    module_id = arguments.get('module_id')
    limit = arguments.get('limit')
    currentPage = arguments.get('currentPage')
    repliesLimit = arguments.get('repliesLimit')

    user_id = 1
    sort = arguments.get('sort')
    if not repliesLimit: repliesLimit = 3
    if not limit: limit = 5
    if not currentPage: currentPage = 1
    offset = (int(currentPage) - 1) * int(limit)

    module = Module.getModuleById(module_id) if module_id else None
    reaction_ids = None
    if module:
        reaction_ids = module['reaction_ids']

    result = EntryComment.getCommentsByEntryId(entry_id, sort, limit, offset)
    total = EntryComment.countComment(entry_id)

    comments = {}
    comments["total"] = total
    comments["sort"] = str(sort)
    comments["currentPage"] = int(currentPage)
    comments["limit"] = int(limit)
    comments["items"] = []
    options = {
        "reaction_ids": reaction_ids,
        "user_id": user_id
    }
    if result:
        for item in result:
            comment = EntryComment.getOptionEntryCommentResponse(item, options)
            comment['replies'] = {}
            comment['replies']['total'] = item['num_comment']
            comment['replies']["currentPage"] = 1
            comment['replies']["limit"] = repliesLimit
            comment['replies']["items"] = []

            replies = EntryComment.getChildComments(item['id'], sort, repliesLimit, 0)
            if replies:
                for subItem in replies:
                    optionReplies = {
                        "reaction_ids": reaction_ids,
                        "user_id": user_id,
                        "is_child_comment": True
                    }
                    reply = EntryComment.getOptionEntryCommentResponse(subItem['id'], optionReplies)
                    comment['replies']["items"].append(reply)
            comments['items'].append(comment)

    response = {
        "result_code": 0,
        "data": comments
    }

    return response
    return {
        "result_code": 0,
        "data": {
            "total": 999,
            "currentPage": 1,
            "limit": 20,
            "items": [
                {
                    "id": 1,
                    "entryId": 1,
                    "user": {
                        "id": 1,
                        "nickname": "aaaaa",
                        "birthday": "1944-01-01",
                        "profileImg": "http://placeimg.com/300/200/people",
                        "introduction": "abc"
                    },
                    "content": "xxxxxxx",
                    "medias": [
                        {
                            "url": "",
                            "type": "img/png"
                        }
                    ],
                    "reactions": {
                        "total": 20,
                        "items": [
                            {
                                "id": 1,
                                "count": 20,
                                "icon": "/images/sample.jpg"
                            }
                        ]
                    },
                    "actionStatus": {
                        "reaction": "01",
                        "follow": False,
                        "mute": False
                    },
                    "createdTime": 1665467683035,
                    "replies": {
                        "total": 200,
                        "currentPage": 1,
                        "limit": 5,
                        "items": [
                            {
                                "id": 2,
                                "user": {
                                    "id": 1,
                                    "nickname": "aaaaa",
                                    "birthday": "1944-01-01",
                                    "profileImg": "http://placeimg.com/300/200/people",
                                    "introduction": "abc"
                                },
                                "commentId": 10,
                                "createdTime": 1665467683035,
                                "content": "reply",
                                "reactions": {
                                    "total": 20,
                                    "items": [
                                        {
                                            "id": 1,
                                            "count": 20,
                                            "icon": "/images/sample.jpg"
                                        }
                                    ]
                                },
                                "actionStatus": {
                                    "reaction": "01",
                                    "follow": False,
                                    "mute": False
                                }
                            }
                        ]
                    }
                }
            ]
        }
    }
