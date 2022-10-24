import services.rds_utils as RDU
from datetime import datetime
import hashlib

def isClipped(url, user_id):
    if not url or not user_id: return None
    query = "SELECT * FROM `cs_clip` WHERE (deleted IS NULL) AND (user_id =  " + str(user_id) + ") AND (short_url =  " + createShortUrl(url) + ")"

    result = RDU.fetchOne(query)
    return True if result else False

def createShortUrl(url):
    result = hashlib.md5(url.encode())
    return result.hexdigest()[:10]