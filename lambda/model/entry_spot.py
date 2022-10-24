import services.rds_utils as RDU
from datetime import datetime

def getEntrySpotByEntryId(entry_id):
    if not entry_id: return None

    query ="SELECT * FROM `cs_entry_spot` WHERE (deleted IS NULL) AND (entry_id = " + str(entry_id) + ")"

    return RDU.fetchOne(query)