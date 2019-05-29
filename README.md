https://juejin.im/post/5a498ad9f265da43052ef8d6
https://juejin.im/post/5c2c69cee51d450d9707236e
https://juejin.im/entry/577a70eac4c97100557b9c5e
node: 
https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/


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