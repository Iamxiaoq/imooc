import base64
import time
import json
import os
import logging

from Crypto.Cipher import PKCS1_v1_5
from Crypto.PublicKey import RSA


logger = logging.getLogger('utils')


def rsa_encrypt(pubkey, text):
    '''rsa 加密'''
    e = int(pubkey, 16)
    key = RSA.construct((e, 65537))
    cipher = PKCS1_v1_5.new(key)
    cipher_text = cipher.encrypt(text.encode())
    return base64.b64encode(cipher_text).decode()


def ts():
    '''获取当前时间戳'''
    return int(time.time())


def ensure_input(prompt='请输入:', length=0):
    '''
    prompt: 输入提示符
    length: 输入的内容长度，小于等于0时不校验长度
    '''
    while True:
        try:
            text = input(prompt)
            text = text.strip()
            if text:
                if length <= 0 or len(text) == length:
                    return text
                else:
                    logger.warning(f'请输入长度为{length}的内容')
        except Exception as e:
            logger.error(f'输入出错 {e}，结束请按Ctrl+C')


def load_json_obj(file):
    if not os.path.isfile(file):
        return
    try:
        with open(file, encoding='utf-8') as f:
            content = f.read()
            return json.loads(content)
    except Exception as e:
        logger.exception('从文件读取对象失败')


def save_json_obj(json_obj, file):
    try:
        json_str = json.dumps(json_obj, indent=4)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(json_str)
        return True
    except Exception as e:
        logger.exception('保存对象到文件失败')
        return False
