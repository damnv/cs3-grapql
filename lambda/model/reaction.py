import services.rds_utils as RDU
from datetime import datetime
import model.entry_plus as EntryPlus


def getReactions(ids = None):
    query = "SELECT `cs_reaction_master`.* FROM `cs_reaction_master` WHERE (deleted IS NULL)"
    if ids: query += " AND (id IN (" + ids + "))"
    query += "ORDER BY `sort_no` ASC"

    return RDU.fetchAll(query)

def getOptionReactions(reaction_ids, entry_id):
    reactions = []
    if not reaction_ids: return reactions
    result = getReactions(reaction_ids)
    if result:
        for item in result:
            reaction = {}
            reaction['id'] = item['id']
            reaction['icon'] = item['reaction_img']
            reaction['name'] = item['reaction_name']
            reaction['count'] = EntryPlus.getCountEntryPlus(entry_id, item['id'])
            reactions.append(reaction)

    return reactions