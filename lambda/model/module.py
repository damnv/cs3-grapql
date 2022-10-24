import services.rds_utils as RDU
from datetime import datetime

def getModuleById(module_id):
    if not module_id: return None

    query ="SELECT * FROM `cs_module` WHERE (deleted IS NULL) AND (id = " + str(module_id) + ")"

    return RDU.fetchOne(query)

def getModuleByAlias(alias):
    if not alias: return None

    query ="SELECT * FROM `cs_module` WHERE (deleted IS NULL) AND (alias = " + str(alias) + ")"

    return RDU.fetchOne(query)