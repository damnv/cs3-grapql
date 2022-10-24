import services.rds_utils as RDU
from datetime import datetime

def isFollowing(user_id, following_user_id):
    if not following_user_id or not user_id: return None
    query = "SELECT * FROM `cs_user_follow` WHERE (deleted IS NULL) AND (user_id =  " + str(user_id) + ") AND (user_id =  " + str(following_user_id) + ")"

    result = RDU.fetchOne(query)
    return True if result else False
