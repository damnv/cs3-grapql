import services.rds_utils as RDU
from datetime import datetime

def isMuting(user_id, mute_user_id):
    if not mute_user_id or not user_id: return None
    query = "SELECT * FROM `cs_user_mute` WHERE (deleted IS NULL) AND (user_id =  " + str(user_id) + ") AND (mute_user_id =  " + str(mute_user_id) + ")"

    result = RDU.fetchOne(query)
    return True if result else False
