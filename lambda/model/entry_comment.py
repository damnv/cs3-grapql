import services.rds_utils as RDU
from datetime import datetime
import model.user as User
import model.reaction as Reaction
import model.user_follow as UserFollow
import model.user_mute as UserMute
import model.entry_comment_plus as EntryCommentPlus
import pytz
tokyoTz = pytz.timezone("Asia/Tokyo")

STATUS_NEW       = '1'
STATUS_APPROVAL  = '2'

def sortCondition(sort):
    condition = 'created DESC'
    if not sort: return condition
    switcher = {
        "new" : 'created DESC',
        "modified" : 'modified DESC'
    }
    return switcher.get(sort, "created DESC")

def getCommentsByEntryId(entry_id, sort, limit, offset):
    if not entry_id: return None
    sort = sortCondition(sort)

    query = "SELECT `ec`.*"
    query += "FROM `cs_entry_comment` AS `ec` "
    query += "INNER JOIN `cs_user` AS `us` ON ec.user_id = us.id "
    query += "WHERE (ec.deleted IS NULL) AND (us.deleted IS NULL) AND (ec.status in (" + STATUS_NEW + ", " + STATUS_APPROVAL + ")) AND (ec.comment_id IS NULL) AND (ec.entry_id = " + str(entry_id) + ")"

    query += " ORDER BY `ec`." + sort + ", `ec`.`id` DESC"

    if limit:
        if offset: query += " LIMIT " + str(limit) + " OFFSET " + str(offset)
        else: query += " LIMIT " + str(limit)

    return RDU.fetchAll(query)

def countComment(entry_id, comment_id = None):
    if not entry_id and not comment_id: return 0

    query = "SELECT COUNT(`ec`.id) as cnt"
    query += "FROM `cs_entry_comment` AS `ec` "
    query += "INNER JOIN `cs_user` AS `us` ON ec.user_id = us.id "
    query += "WHERE (ec.deleted IS NULL) AND (us.deleted IS NULL) AND (ec.status in (" + STATUS_NEW + ", " + STATUS_APPROVAL + ")) AND (ec.comment_id IS NULL)"
    if entry_id: query += " AND (ec.entry_id = " + str(entry_id) + ")"
    if comment_id: query += " AND (ec.comment_id = " + str(comment_id) + ")"
    result = RDU.fetchOne(query)

    return result['cnt'] if result else 0

def getChildComments(comment_id, sort, limit, offset):
    if not comment_id: return None
    sort = input['sort'] if 'sort' in input else None
    sort = sortCondition(sort)

    query = "SELECT `ec`.*"
    query += "FROM `cs_entry_comment` AS `ec` "
    query += "INNER JOIN `cs_user` AS `us` ON ec.user_id = us.id "
    query += "WHERE (ec.deleted IS NULL) AND (us.deleted IS NULL) AND (ec.status in (" + STATUS_NEW + ", " + STATUS_APPROVAL + ")) AND (ec.comment_id IS NULL) AND (ec.comment_id = " + str(comment_id) + ")"

    query += " ORDER BY `ec`." + sort + ", `ec`.`id` DESC"

    if limit:
        if offset: query += " LIMIT " + str(limit) + " OFFSET " + str(offset)
        else: query += " LIMIT " + str(limit)

    return RDU.fetchAll(query)

def getOptionEntryCommentResponse(item, options):
    user_id = options['user_id'] if 'user_id' in options and options['user_id'] else None
    reaction_ids = options['reaction_ids'] if 'reaction_ids' in options and options['reaction_ids'] else None
    isChildComment = True if 'is_child_comment' in options and options['is_child_comment'] else False
    comment = {}
    comment['id'] = item['id']
    comment['content'] = item['description']
    comment["createdTime"] = item['created'].timestamp()
    comment["commentId"] = item['comment_id']
    comment["entryId"] = item['entry_id']
    comment['reactions'] = {}
    comment['reactions']['total'] = item['num_good']
    comment['reactions']["items"] = Reaction.getOptionReactions(reaction_ids, item['id'])
    if not isChildComment: comment["medias"] = convertImage(item)
    user = User.getUserById(item['user_id'])
    if user:
        comment['user'] = {}
        comment['user']['id'] = user['id']
        comment['user']['nickname'] = user['nickname']
        comment['user']['profileImg'] = user['profile_img']
        comment['user']['title'] = user['title']
        comment['user']['isAdmin'] = user['is_admin']
    comment['actionStatus'] = {}
    comment['actionStatus']['reaction'] = EntryCommentPlus.isEntryCommentPlus(item['id'], user_id)
    comment['actionStatus']['follow'] =  UserFollow.isFollowing(user_id, item['user_id'])
    comment['actionStatus']['mute'] =  UserMute.isMuting(user_id, item['user_id'])
    return comment

def convertImage(item):
    images = []
    if item['img']:
        image = {}
        image['url'] = item['img']
        image['type'] = item['img_type']
        images.append(image)

    if item['img2']:
        image = {}
        image['url'] = item['img2']
        image['type'] = item['img_type2']
        images.append(image)

    return images