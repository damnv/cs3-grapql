import sys
import logging
import env
import pymysql

#rds settings
host  = env.rds_host
dbuser = env.rds_username
password = env.rds_password
database = env.rds_database
port = env.rds_port

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def make_connection():
    try:
        return pymysql.connect(
            host=host,
            user=dbuser,
            port=int(port),
            passwd=password,
            db=database,
            connect_timeout=5)
    except pymysql.MySQLError as e:
        logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
        logger.error(e)
        sys.exit()
        return False

def fetchAll(query):
    result = []
    conn = make_connection()
    if not query or conn == False:
        return result
    cursor = conn.cursor()
    cursor.execute(query)

    columns = cursor.description
    for value in cursor.fetchall():
        row = {}
        for (index,column) in enumerate(value):
            row[columns[index][0]] = column
        result.append(row)
    return result

def fetchOne(query):
    result = {}
    conn = make_connection()
    if not query or conn == False:
        return result
    cursor = conn.cursor()
    cursor.execute(query)

    columns = cursor.description
    row = cursor.fetchone()
    if not row:
        return result
    for (index,column) in enumerate(row):
        result[columns[index][0]] = column
    return result

def insertUpdate(sql, data):
    result = []
    conn = make_connection()
    if not sql or not data or conn == False:
        return result
    cursor = conn.cursor()
    cursor.execute(sql, data)
    conn.commit()
    if cursor.lastrowid:
        return cursor.lastrowid
    else:
        return False