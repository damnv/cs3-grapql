import json
import jwt
from jwt import PyJWKClient

import sys
sys.path.append('../')
import env
import const

def validate_id_token(id_token):
    if not id_token or not env.AUTH0_APP_DOMAIN:
        return {
            "result_code": const.RESULT_CODE_ERROR,
            "message": 'idtoken is not null'
        }

    message = ''
    try:
        url = env.AUTH0_APP_DOMAIN + '/.well-known/jwks.json'
        jwks_client = PyJWKClient(url)
        headers = jwt.get_unverified_header(id_token)
        signing_key = jwks_client.get_signing_key_from_jwt(id_token)

        data = jwt.decode(
            id_token,
            signing_key.key,
            algorithms=[headers.get("alg")],
            options={
                "verify_signature": True,
                "verify_exp": True,
                "verify_iat": True,
                "verify_iss": True,
                "verify_aud": False,
            },
        )

    except jwt.InvalidTokenError as e:
        message = "InvalidTokenError"
    except jwt.DecodeError as e:
        message = "DecodeError"
    except jwt.InvalidSignatureError as e:
        message = "InvalidSignatureError"
    except jwt.ExpiredSignatureError as e:
        message = "ExpiredSignatureError"
    except jwt.InvalidIssuerError as e:
        message = "InvalidIssuerError"
    except jwt.InvalidIssuedAtError as e:
        message = "InvalidIssuedAtError"
    except Exception as e:
        message = 'パラメータの形式が無効です。'

    if message != '':
        return {
            "result_code": const.RESULT_CODE_ERROR,
            "message": message
        }
    if 'email' in data:
        return {
            "result_code": const.RESULT_CODE_SUCCESS,
            "data": data
        }
    return {
            "result_code": const.RESULT_CODE_ERROR,
            "message": 'パラメータの形式が無効です。'
        }