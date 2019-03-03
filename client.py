import time

import requests


class Client:

    default_ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'

    def __init__(self, headers={}):
        headers.setdefault('user-agent', self.default_ua)
        self._session = requests.session()
        self._session.headers = headers

    def get(self, url, **kwargs):
        return self._request('get', url, **kwargs)

    def post(self, url, **kwargs):
        return self._request('post', url, **kwargs)

    def get_json(self, url, **kwargs):
        response = self.get(url, **kwargs)
        return response.json()

    def post_json(self, url, **kwargs):
        response = self.post(url, **kwargs)
        return response.json()

    def get_text(self, url, **kwargs):
        response = self.get(url, **kwargs)
        return response.text

    def post_text(self, url, **kwargs):
        response = self.post(url, **kwargs)
        return response.text

    def download(self, url, file):
        response = self.get(url, stream=True)
        with open(file, 'wb') as f:
            for chunk in response.iter_content(10 * 1024):
                f.write(chunk)

    def get_cookie(self, key):
        return self._session.cookies[key]

    def get_cookies(self):
        return requests.utils.dict_from_cookiejar(self._session.cookies)

    def set_cookies(self, cookies):
        cj = requests.utils.cookiejar_from_dict(cookies)
        self._session.cookies = cj

    def update_cookie(self, **kwargs):
        cookies = self.get_cookies()
        cookies.update(kwargs)
        self.set_cookies(cookies)

    def _request(self, method, *args, **kwargs):
        kwargs.setdefault('timeout', 60)
        # kwargs.setdefault('verify', False)
        method = getattr(self._session, method)
        error = None
        for _ in range(3):
            try:
                return method(*args, **kwargs)
            except Exception as e:
                error = e
                print(f'{method.__name__} {e}')
                time.sleep(1)
        raise error
