from collections import namedtuple
import logging

from client import Client
import utils
import config


User = namedtuple('User', 'nickname uid token')


class Imooc:
    def __init__(self):
        self._host = 'https://m.imooc.com'
        headers = {
            'user-agent': config.ua,
            'referer': self._host,  # 图片加了防盗链
        }
        self._client = Client(headers)
        self._user = None

        self._logger = logging.getLogger('imooc')

    def init(self, username, password):
        '''初始化 加载cookie 登录 保存cookie'''
        if self.load_cookies(config.cookie_file):
            self._user = self.get_user()
            if self._user:
                self._logger.info(f'{self._user.nickname} 加载cookies成功')
                return True
        login_result = self.login(username, password)
        if login_result:
            self.save_cookies(config.cookie_file)
            return True
        return False

    def login(self, username, password, verify=''):
        '''h5 登录'''
        login_json = self.post_login(username, password, verify)
        msg = login_json['msg']
        if '验证码' in msg:
            self.download_verifycode(config.img_file)
            prompt = f'验证码图片已经保存到{config.img_file}，请手动输入验证码: '
            verify = utils.ensure_input(prompt, length=4)
            return self.login(username, password, verify)
        elif msg == '密码错误' or msg == '账号未注册':
            self._logger.info(f'{username} {msg}')
            return False
        elif msg == '成功':
            # self._coding_token_url = login_json['data']['url'][1]  # 实战token
            www_token_url = login_json['data']['url'][0]
            # callback 参数是必须的
            www_token_url = f'{www_token_url}&callback=jQuery21009533020387524274_1551541029085'
            token_text = self._client.get_text(www_token_url)  # 访问ssologin 初始化cookies
            if 'uid' not in token_text:
                self._logger.warning(f'{username} 登录失败 {token_text}')
                return False
            self._user = self.get_user()
            if self._user:
                self._logger.info(f'{self._user.nickname} 登录成功')
                return True
            else:
                self._logger.warning(f'{username} 登录失败')
                return False
        else:
            self._logger.error(f'未能处理到的登录请求返回 {login_json}')
            return False

    def post_login(self, username, password, verify):
        '''登录请求POST'''
        url = f'{self._host}/passport/user/login'
        password = self.encrypt_password(password)
        data = {
            'username': username,
            'password': password,
            'verify': verify,
            'referer': self._host,  # 会校验来源
            'pwencode': 1,
        }
        return self._client.post_json(url, data=data)

    def save_cookies(self, cookie_file):
        cookies = self._client.get_cookies()
        save_result = utils.save_json_obj(cookies, cookie_file)
        msg = '保存cookie成功' if save_result else '保存cookie失败'
        self._logger.info(msg)
        return save_result

    def load_cookies(self, cookie_file):
        cookies = utils.load_json_obj(cookie_file)
        if not cookies:
            return False
        self._client.set_cookies(cookies)
        return True

    def encrypt_password(self, password):
        # 初始化 pubkey code
        if not hasattr(self, '_pubkey'):
            key_json = self.prelogin()
            self._pubkey = key_json['pubkey']
            self._code = key_json['code']

        ts = utils.ts()
        text = f'{self._code}\t{ts}\t{password}'
        return utils.rsa_encrypt(self._pubkey, text)

    def get_user(self):
        '''
            获取当前登录用户
            return: 已经登录返回当前用户 未登录返回None
        '''
        url = f'{self._host}/api/user/userInfo'
        response = self._client.get(url)
        if 'nickname' in response.text:
            user_json = response.json()['data'][0]
            return User(user_json['nickname'], user_json['uid'], user_json['token'])
        else:
            return None

    def prelogin(self):
        url = f'{self._host}/passport/user/prelogin'
        return self._client.get_json(url)

    def download_verifycode(self, img_file):
        url = f'{self._host}/passport/user/verifycode'
        self._client.download(url, img_file)
