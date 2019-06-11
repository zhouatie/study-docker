# 基于最新的 node 镜像
FROM node:latest
# 复制当前目录下所有文件到目标镜像 /app/ 目录下
COPY . /todolist/app
# 修改工作目录
WORKDIR /todolist/app
# yarn 一下，安装依赖
RUN ["npm", "install"]
# 启动 node server
ENTRYPOINT ["npm", "run", "serve"]