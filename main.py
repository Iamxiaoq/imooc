import logging

import config
from imooc import Imooc

logging.basicConfig(**config.log_config)


imooc = Imooc()
assert config.username and config.password, '请先配置可用的username和password'
imooc.init(config.username, config.password)
