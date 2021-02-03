# scp-shell

基于scp2的前端自动化部署方案，一行命令实现上传并部署

## 安装

```shell
npm install --dev scp-shell
```

也可以全局安装

```shell
npm install -g scp-shell
```

## 初始化

先执行初始化命令在项目根目录生成配置文件`.scprc`，并自动会将`.scprc`追加到`.gitignore`内容中

```shell
scp-shell init
```

## 修改配置文件

`.scprc` 配置文件里区分三个环境变量，各个环境的配置项一样，配置值根据各个环境自行修改
* dev  开发环境
* test 测试环境
* prod 线上环境

### 1. 属性说明
| 属性名 | 说明 | 默认值 |
| ----- | ---- | ----- |
| build | 项目打包目录 | `/dist` |
| host | 服务器IP | 127.0.0.1 |
| post | 服务器SCP端口号 | `22` |
| username | 服务器登录账号 | root |
| password | 服务器登录密码 | 123 |
| path | 服务器目标目录 | `/home/static` |

## 部署

```shell
# 部署至 开发环境
scp-shell deploy --env.dev

# 部署至 测试环境
scp-shell deploy --env.test

# 部署至 线上环境
scp-shell deploy --env.prod

```
其他命令
```shell
# 部署前，对前一次的部署文件进行备份
scp-shell deploy --env.test --backup

# 部署前，清空目标文件夹
scp-shell deploy --env.test --clear

# 对前一次的部署文件进行备份，并清空目标文件夹
scp-shell deploy --env.test --backup --clear
```
