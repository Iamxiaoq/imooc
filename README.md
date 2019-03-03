# 慕课网的 H5 登录

## 项目依赖
请在>=py36下运行，本项目使用 pipenv 管理，当然也可手动安装依赖而不创建虚拟环境。
- requests http请求
- pycryptodome rsa加密库   
    pycryptodome 是 pycrypto 的更新版，在 Windows 下依赖 winrandom，winrandom 有可能会安装失败，可通过 `pipenv install https://download.lfd.uci.edu/pythonlibs/u2hcgva4/winrandom-1.2.1-cp36-cp36m-win_amd64.whl` 解决。

## 食用方式

```
$ git clone https://github.com/xiaoq1024/imooc.git
$ cd imooc
# 修改config.py 至少加入可用的username和password
$ pipenv install
$ pipenv shell
$ python main.py
```

## todo
添加下载功能
