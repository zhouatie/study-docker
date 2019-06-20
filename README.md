# docker从入门到实战

## docker基础

### 介绍

docker是一个开源的应用容器引擎，开发者可以打包自己的应用到容器里面，然后迁移到其他机器的docker应用中，可以实现快速部署。如果出现的故障，可以通过镜像，快速恢复服务。

举个例子，公司一般都会有多套环境，那么如何保持多套的运行环境一致，这个时候就可以用到docker。且当要求增加一套环境的时候，你无需在一个新服务器上一个个环境安装、配置。只需要运行下docker。同时官方还提供了[Docker Hub](https://hub.docker.com/)，拥有大量的高质量的官方镜像。你可以将自己的镜像上传上去。有点类似于`github`。

### 安装

官方提供了安装教程，挺详细的。[官方安装教程](https://docs.docker.com/install/)

### docker起步

第一步：执行下`docker -v`确认下是否成功安装了docker

如果成功安装了，命令行将会输出入docker的版本号。如下：

`Docker version 18.09.2, build 6247962`

docker的整个生命周期大致可分为：
1. 镜像
2. 容器
3. 仓库

这里以`ubuntu`镜像为例，介绍下镜像

在下载`ubuntu`镜像之前运行下`docker images(查看镜像命令)`查看下本地的镜像。如果你还没下载过镜像的话，当然会出现空。这里贴下我本地的镜像
```javascript
➜  study-docker git:(master) ✗ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
todolist_static     latest              de5e325037e9        2 hours ago         1.05GB
todolist_nodejs     latest              53efd80e03e1        2 hours ago         898MB
ubuntu              18.04               7698f282e524        4 weeks ago         69.9MB
mysql               latest              990386cbd5c0        5 weeks ago         443MB
node                8                   a5c31320f223        6 weeks ago         895MB
mysql               5.6                 73829d7b6139        6 weeks ago         256MB
```

使用拉取镜像命令`docker pull` 拉取`ubuntu`镜像：`docker pull ubuntu`。当你不指定版本时，默认拉取latest版本。
```javascript
➜  study-docker git:(master) ✗ docker pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
5b7339215d1d: Pull complete 
14ca88e9f672: Pull complete 
a31c3b1caad4: Pull complete 
b054a26005b7: Pull complete 
Digest: sha256:9b1702dcfe32c873a770a32cfd306dd7fc1c4fd134adfb783db68defc8894b3c
Status: Downloaded newer image for ubuntu:latest
➜  study-docker git:(master) ✗ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              4c108a37151f        12 hours ago        64.2MB
```

也可安装指定版本镜像：`docker pull ubuntu:18.04`

接下来基于`ubuntu`镜像启动一个容器

`docker run --name first -it ubuntu bash`

- --name 用于指定容器名
- it 用于交互式命令行操作，如下面例子运行后，会打开容器的命令行
- 上面的ubuntu指的镜像，默认基于latest。除非指定版本 如ubuntu:18.04

运行上面的命令后，命令行工具就会自动进入容器的命令行。如果想要退出该命令行界面，可输入`exit`以退出。


```JavaScript
➜  study-docker git:(master) ✗ docker run --name first -it ubuntu bash
root@b7862a018c2c:/# 
```

如果想让该容器在**后台**运行可以通过加`-d`配置来让该容器在**后台**运行。后台运行，命令行工具不会进入该容器。

使用`docker ps`查看当前运行中的容器。

```javascript
➜  study-docker git:(master) ✗ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
cf8375f48225        ubuntu              "bash"              15 seconds ago      Up 14 seconds                           first
```

使用`-d`来让容器在后台运行
```javascript
➜  study-docker git:(master) ✗ docker run --name first -itd ubuntu bash
6df29a09d1f1bb0041b7eb59b5288162471ed8a663007f88c6a30e3fd1f4fbe2
```
命令行会返回容器id


使用`docker container ls` 查看所有容器列表（不包括停止运行的容器）

```JavaScript
➜  study-docker git:(master) ✗ docker container ls -a
CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS               NAMES
cf8375f48225        ubuntu              "bash"              About a minute ago   Up About a minute                       first
```

使用`docker stop <容器id或容器名称>`停止容器的运行。
```javascript
➜  study-docker git:(master) ✗ docker stop 6df29a09d1f1
6df29a09d1f1
```
执行命令后，会返回你刚输入容器的id。上面的容器id不需要填全。就想git的commit id一样。

这个时候通过`docker container ls`是查不到容器信息的。需要用`docker container ls -a`来查看。
```javascript
➜  study-docker git:(master) ✗ docker container ls -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
6df29a09d1f1        ubuntu              "bash"              5 minutes ago       Exited (0) 4 minutes ago
```
可以看到STATUS一栏处，该容器是处于停止状态的。

使用`docker rm <容器id 或者 容器昵称>`
```javascript
➜  node git:(master) docker container ls -a
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
a217eea7188f        ubuntu              "/bin/bash"         11 seconds ago      Exited (0) 10 seconds ago                       dreamy_ishizaka
```
执行`docker rm a21` (id可以不输全)
```javascript
➜  node git:(master) docker rm a21
a21
```
执行完之后，命令行会返回之前输入的容器id

使用`docker container prune`，来清空停用状态的容器。

使用`docker exec`命令进入运行中的容器

如想进入刚才后台运行的容器的交互式界面:`docker exec -it <容器名称 或者 容器id> bash`

```javascript
➜  study-docker git:(master) ✗ docker exec -it first bash
root@2a87b2f62a6e:/#
```

**想查看更多关于docker的命令，[点击这里](https://www.runoob.com/docker/docker-command-manual.html)**


### Dockerfile

举个`node`镜像的例子

新建一个文件夹

我这里就新建一个名为node的文件夹，具体文件可参照我的github项目的[node目录](https://github.com/zhouatie/study-docker/tree/master/node)

```javascript
// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.end('success')
})

app.listen(6001)
```

```javascript
// Dockerfile
FROM node:8

WORKDIR /home/node

COPY ../ ../

RUN npm install

CMD npm start
```

指令介绍
- FROM 我这个node例子是基于node8镜像

- WORKDIR 指定工作区。

- COPY 将本地目录文件拷贝到docker中

- RUN 运行一个容器，每个RUN都会生成一个容器

- CMD 执行命令，与RUN相似

> 注意 有必要添加.dockerignore文件，文件中可以填写你不想打包进容器的文件。类似于.gitignore

```javascript
// .dockerignore
/node_modules
package-lock.json
```

详细解释，详见[dockerfile](https://yeasy.gitbooks.io/docker_practice/content/image/dockerfile/)


`docker build` 命令用于使用 Dockerfile 创建镜像

执行：`docker build -t mynode .`;

- -t: 镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。tag不写默认为latest版本

要注意后面的.  这个表示Dockerfile文件在当前目录。

构建镜像成功之后：

```javascript
➜  node git:(master) ✗ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mynode              latest              3cd10521f802        10 hours ago        898MB
```

接下来就基于该镜像运行一个node容器:
`docker run --name mynode -p 4001:6001 mynode`

- --name: 表示该容器的匿名
- -p: 表示端口映射，因为主机的ip跟容器的ip是不同的，需要把容器的服务映射到0.0.0.0:自己设置的主机端口，host不填默认为0.0.0.0。 <主机端口>:<容器中端口>；

```javascript
➜  node git:(master) ✗ docker run --name mynode -p 4001:6001 mynode

> example2@1.0.0 start /home/node
> node index.js
```

浏览器访问`localhost:4001`,页面会展示出node响应的`success`字符串了。

构建完镜像后，你觉得不需要该镜像，想删除怎么办呢？

首先执行：`docker images`列出镜像列表

```javascript
➜  node git:(master) ✗ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mynode              latest              3cd10521f802        10 hours ago        898MB
```

使用`docker rmi <image id>`来删除镜像：`docker rmi 3cd10521f802`,如果提醒该镜像被容器占用着，那么你就需要先删除该容器(参考上面介绍的命令)。




## docker实战
