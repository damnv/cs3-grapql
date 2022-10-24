import services.rds_utils as RDU
from datetime import datetime

def getCountEntryPlus(entry_id, reaction_id = None):
    if not entry_id: return 0
    query = "SELECT COUNT(id) as cnt FROM `cs_entry_plus` WHERE (deleted IS NULL) AND (entry_id =  " + str(entry_id) + ")"
    if reaction_id: query += " AND (reaction_id =  " + str(reaction_id) + ")"

    result = RDU.fetchOne(query)
    return result['cnt'] if result else 0

def getEntryPlus(entry_id, user_id):
    if not entry_id or not user_id: return None
    query = "SELECT * FROM `cs_entry_plus` WHERE (deleted IS NULL) AND (entry_id =  " + str(entry_id) + ") AND (user_id =  " + str(user_id) + ")"

    return RDU.fetchOne(query)

def isEntryPlus(entry_id, user_id):
    result = getEntryPlus(entry_id, user_id)
    if not result: return None
    return result['reaction_id'] if result['reaction_id'] else True
