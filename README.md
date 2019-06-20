# docker

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



https://juejin.im/post/5a498ad9f265da43052ef8d6

https://juejin.im/post/5c2c69cee51d450d9707236e
https://juejin.im/entry/577a70eac4c97100557b9c5e
node: 
https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/

docker node mongodb
https://www.cnblogs.com/zhangyanbo/p/5851644.html

docker 命令
https://www.runoob.com/docker/docker-command-manual.html


docker container ls
终止状态的容器可以用 docker container ls -a 命令看到

docker container start
docker container start objective_wozniak

查看顶层镜像列表：docker image ls
docker image ls -a 查看所有镜像列表
docker image ls -q 镜像列表会是镜像id组成
$ docker image ls --format "{{.ID}}: {{.Repository}}"
5f515359c7f8: redis
或者打算以表格等距显示，并且有标题行，和默认一样，不过自己定义列：
$ docker image ls --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
IMAGE ID REPOSITORY TAG
5f515359c7f8 redis latest

如果要删除本地的镜像，可以使用 docker image rm 命令，其格式为：
$ docker image rm [选项] <镜像1> [<镜像2> ...]
docker image rm 501






$ mkdir mynginx
$ cd mynginx
$ touch Dockerfile





FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html



所谓定制镜像，那一定是以一个镜像为基础，在其上进行定制。就像我们之前运行了一个 nginx 镜像的容器，再进行修改一样，基础镜像是必须指定的。而 FROM 就是指定 基础镜像，因此一个 Dockerfile 中 FROM 是必备的指令，并且必须是第一条指令。



RUN 指令是用来执行命令行命令的。由于命令行的强大能力，RUN 指令在定制镜像时是最常用的指令之一。其格式有两种：
shell 格式：RUN <命令>，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 RUN 指令就是这种格式。
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
exec 格式：RUN ["可执行文件", "参数1", "参数2"]，这更像是函数调用中的格式。



每一个FROM  或者 RUN 都会独立成一个镜像



docker build [选项] <上下文路径/URL/-> 构建镜像



docker build -t nginx:v3 .

如果注意，会看到 docker build 命令最后有一个 .。. 表示当前目录，而 Dockerfile 就在当前目录，因此不少初学者以为这个路径是在指定 Dockerfile 所在路径，这么理解其实是不准确的。如果对应上面的命令格式，你可能会发现，这是在指定 上下文路径

当构建的时候，用户会指定构建镜像上下文的路径，docker build 命令得知这个路径后，会将路径下的所有内容打包，然后上传给 Docker 引擎。这样 Docker 引擎收到这个上下文包后，展开就会获得构建镜像所需的一切文件。



新建并启动 docker run

例如，下面的命令输出一个 “Hello World”，之后终止容器。
$ docker run ubuntu:18.04 /bin/echo 'Hello world'



下面的命令则启动一个 bash 终端，允许用户进行交互。
$ docker run -t -i ubuntu:18.04 /bin/bash

root@af8bae53bdd3:/#



其中，-t 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， -i 则让容器的标准输入保持打开。



当利用 docker run 来创建容器时，Docker 在后台运行的标准操作包括：
检查本地是否存在指定的镜像，不存在就从公有仓库下载
利用镜像创建并启动一个容器
分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
从地址池配置一个 ip 地址给容器
执行用户指定的应用程序
执行完毕后容器被终止



可以利用 docker container start 命令，直接将一个已经终止的容器启动运行。

使用 docker run -d 运行容器，让 Docker 在后台运行



docker container ls 查看容器信息



docker container stop 来终止一个运行中的容器



用户通过 exit 命令或 Ctrl+d 来退出终端时，所创建的容器立刻终止。



docker stop amazing_cori



处于终止状态的容器，可以通过 docker container start 命令来重新启动。



docker container restart 命令会将一个运行态的容器终止，然后再重新启动它。



docker exec在运行的容器中执行命令

docker exec -i -t mynginx /bin/bash



docker ps -a 命令查看已经在运行的容器，然后使用容器 ID 进入容器

docker exec -it 9df70f9a0714 /bin/bash





如果要导出本地某个容器，可以使用 docker export 命令。

$ docker container ls -a
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
7691a814370e ubuntu:18.04 "/bin/bash" 36 hours ago Exited (0) 21 hours ago test
$ docker export 7691a814370e > ubuntu.tar



可以使用 docker import 从容器快照文件中再导入为镜像，例如
$ cat ubuntu.tar | docker import - test/ubuntu:v1.0
$ docker image ls
REPOSITORY TAG IMAGE ID CREATED VIRTUAL SIZE
test/ubuntu v1.0 9d37a6082e97 About a minute ago 171.3 MB



可以使用 docker container rm 来删除一个处于终止状态的容器。例如
$ docker container rm trusting_newton
trusting_newton



用 docker container ls -a 命令可以查看所有已经创建的包括终止状态的容器，如果数量太多要一个个删除可能会很麻烦，用下面的命令可以清理掉所有处于终止状态的容器。
$ docker container prune



docker logs <contain name | contain id>

docker logs 2b1b7a428627 查看docker容器的输出日志





Docker是基于Linux 64bit的，无法在32bit的linux/Windows/unix环境下使用





Dockerfile

WORKDIR <工作目录路径>

之前提到一些初学者常犯的错误是把 Dockerfile 等同于 Shell 脚本来书写，这种错误的理解还可能会导致出现下面这样的错误：
RUN cd /app
RUN echo "hello" > world.txt
如果将这个 Dockerfile 进行构建镜像运行后，会发现找不到 /app/world.txt 文件，或者其内容不是 hello。原因其实很简单，在 Shell 中，连续两行是同一个进程执行环境，因此前一个命令修改的内存状态，会直接影响后一个命令；而在 Dockerfile 中，这两行 RUN 命令的执行环境根本不同，是两个完全不同的容器。这就是对 Dockerfile 构建分层存储的概念不了解所导致的错误。





Dockerfile

FROM ....

...

创建镜像

docker build -t my-nodejs-app

启动node容器的服务



docker run -p 49160:8080 -d zhouatie/node-web-app （docker run -p 本地端口:容器node服务端口 -d 镜像名）

docker run -it --rm --name my-running-app my-nodejs-app 



 Docker Compose

组合多个容器一起运行

docker-compose build  
docker-compose up



### mysql



mkdir -p ~/mysql/data ~/mysql/logs ~/mysql/conf

docker run -p 3306:3306 --name mymysql -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:laster



-p 3306:3306：将容器的 3306 端口映射到主机的 3306 端口。

-v -v $PWD/conf:/etc/mysql/conf.d：将主机当前目录下的 conf/my.cnf 挂载到容器的 /etc/mysql/my.cnf。
-v $PWD/logs:/logs：将主机当前目录下的 logs 目录挂载到容器的 /logs。
-v $PWD/data:/var/lib/mysql ：将主机当前目录下的data目录挂载到容器的 /var/lib/mysql 。
-e MYSQL_ROOT_PASSWORD=123456：初始化 root 用户的密码。



docker也是有ip的

启动mysql：
docker run --name=mysql -itd -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql 
查看容器ip

docker inspect <容器id> | grep IPAddre



navcat连接mysql：

https://blog.csdn.net/weixin_42242494/article/details/80630267

设置可访问

docker exec -it mysql(容器名字) bash



mysql -uroot -p(接上密码)

mysql -uroot -p123456 

查看用户信息

 select host,user,plugin,authentication_string from mysql.user;    

修改plugin为mysql_native_password 才能访问

ALTER user 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';  



mysql 控制台命令

https://blog.csdn.net/tww85/article/details/52778683


docker cp 拷贝 

从主机拷贝到docker ：docker cp <host path>  <contain_name>:<docker path>

从docker拷贝到主机： docker cp <contain_name>:<docker path> <host path>



docker node



https://juejin.im/post/5b2cb6986fb9a00e3a5aa279



dockerfile

# 基于最新的 node 镜像
FROM node:latest
# 复制当前目录下所有文件到目标镜像 /app/ 目录下
COPY . /app/
# 修改工作目录
WORKDIR /app/
# yarn 一下，安装依赖
RUN ["yarn"]
# 启动 node server
ENTRYPOINT ["node", "index.js"]



### build

docker build -t zhouatie/todolist-server:v1 .



docker run -it -d -p <主机端口>:<容器内的服务端口> <镜像名>

docker run -it -p 4000:3000 zhouatie/todolist-server:v3





国内镜像

https://registry.docker-cn.com/



中科大镜像文档地址： https://mirrors.ustc.edu.cn/help/dockerhub.html



编写 Dockerfile

https://www.cnblogs.com/bigberg/p/9001584.html





docker build -t zhouatie/todolist-static:v5 .

docker run -itd -p 4000:3000 zhouatie/todolist-server:v7

-t 表示添加标签

. 表示当前目录即 Dockerfile所在的目录



删除镜像

docker rmi <镜像id>



查看端口映射配置

docker port nostalgic_morse 5000

查看该容器5000端口映射的主机ip端口





docker-compose node mysql

https://blog.csdn.net/qq_25243451/article/details/88316654



docker network 实现互通(好简单，创建一个网络填写下类型 然后其他应用的network配置下这个网络就可以了）

通过别名实现互通 --link？？？

link

    - mysql

访问的时候直接 mysql:3000???





volumn数据卷？？？



别人的配置引发的思考

https://segmentfault.com/q/1010000018279435



docker 系列教程

http://www.itmuch.com/docker/01-docker-summary/



docker中查看ip

用ip addr show



docker network create --driver bridge network_name

创建网桥



其他容器都可以

docker run --network=<NETWORK>





查看网桥连接的容器

docker network ls



如果

services

    :nodejs

静态通过 http://nodejs:3000 能调通

services

    :nodejs1
静态通过 http://nodejs:3000 不能调通

  nodejs1:
    build: ./server/
    container_name: nodejs

静态通过 http://nodejs:3000 能调通


上面实例说明 容器会把services名字或者容器名字当做容器网络标识



初始化mysql

https://blog.csdn.net/hjxzb/article/details/84927567



mysql通过Dockerfile创建表

https://www.jb51.net/article/115422.htm



wait-for-it

https://www.jianshu.com/p/92d327f7f886



docker 删除none 镜像



删除none的镜像，要先删除镜像中的容器。要删除镜像中的容器，必须先停止容器。

$ docker images

$ docker rmi $(docker images | grep "none" | awk '{print $3}') 
直接删除带none的镜像，直接报错了。提示先停止容器。

$ docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }') //停止容器

$ docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }') //删除容器

$ docker rmi $(docker images | grep "none" | awk '{print $3}') //删除镜像




今日必须做：


整理docker命令

整理docker文档