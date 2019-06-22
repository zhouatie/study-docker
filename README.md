# docker从入门到实战

## 前言

文本将分为两篇（基础篇与实战篇）介绍docker从入门到实战。基础篇包括简介、安装、起步、基础的命令、及一个node例子。实战篇会分享一个项目。技术栈为vue、node、mysql、docker-compose。如果你觉得有收获欢迎给我的github点赞。

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

本次实战案例是todolist。技术栈为vue、node、mysql。具体代码见项目目录[todolist](https://github.com/zhouatie/study-docker/tree/master/todolist),下面就不一一贴代码了。就讲下重点。

下面我就顺着依赖关系来讲，所以先从mysql开始讲起

### 构建mysql

执行：`docker run --name mymysql -d -p 3308:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql`

- --name 给mysql容器设置匿名
- -d表示后台运行
- -p表示将容器的3306端口的映射到本地的3308端口，如果不设置的话，本地是无法访问该MySQL服务的。
- -e MYSQL_ROOT_PASSWORD 设置root的账号密码。
- mysql 后面不指定版本话，默认会latest版本

在执行该语句之前，假如你之前没有pull过mysql镜像。docker在本地找不到你要的镜像就会帮你从docker仓库拉取mysql:latest镜像。

这个时候容器就启动成功了。

尝试下用navicat连接下试试

鼠标放入黄色小三角出现如下报错。

```javascript
2013 - Lost connection to MySQL server at 'reading initial communication packet', system error: 0 "Internal error/check (Not system error)"
```

这是因为mysql8以上，都会使用新的验证方式。

不妨查下信息: `select host,user,plugin,authentication_string from mysql.user; `
```javascript
mysql> select host,user,plugin,authentication_string from mysql.user;
+-----------+------------------+-----------------------+------------------------------------------------------------------------+
| host      | user             | plugin                | authentication_string                                                  |
+-----------+------------------+-----------------------+------------------------------------------------------------------------+
| %         | root             | caching_sha2_password | *6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9                              |
| localhost | mysql.infoschema | caching_sha2_password | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED |
| localhost | mysql.session    | caching_sha2_password | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED |
| localhost | mysql.sys        | caching_sha2_password | $A$005$THISISACOMBINATIONOFINVALIDSALTANDPASSWORDTHATMUSTNEVERBRBEUSED |
)7k44VulAglQJgGpvgSG.ylA/rdbkqWjiqQJiq3DGsug5HIy3 |ord | $A$005$0pU+sGm[on
+-----------+------------------+-----------------------+------------------------------------------------------------------------+
```

plugin一栏可看到都是caching_sha2_password。

那么如何才能将其改成可连接的呢？只需要将其plugin改成mysql_native_password就可以访问了。

`ALTER user 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';`

你可以先用上面查询账户信息查下是否修改成功了。

修改成功后，可以尝试下用navicat连接下mysql。不出意外的会就能成功连接上了。

当然我下面的例子用mysql:5.6，方便操作，不需要修改plugin。

执行命令：`docker run --name mymysql -d -e MYSQL_ROOT_PASSWORD=123456 -p 3308:3306  mysql:5.6`

启动容器后可以执行：`docker exec -it mymysql bash`进入容器

执行：`mysql -uroot -p123456`进入mysql控制台

执行：`show databases;`查看mysql数据库
```javascript
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
+--------------------+
3 rows in set (0.00 sec)
```

执行：`create database todolist;`创建todolist应用的数据库

执行：`show databases;`查看刚刚创建的todolist数据库
```javascript
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| todolist           |
+--------------------+
4 rows in set (0.00 sec)
```
可以看到数据库中多了个todolist数据库

接下来选择该todolist数据库

执行：`use todolist;`选中该数据库

创建表:
```javascript
CREATE TABLE list (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255),
    checked INT(11) DEFAULT 0
    )
```

执行：`show tables;`查看todolist数据库下的表
```javascript
mysql> show tables;
+--------------------+
| Tables_in_todolist |
+--------------------+
| list               |
+--------------------+
1 row in set (0.00 sec)
```

执行：`describe list;`查看表
```
mysql> describe list;
+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | int(11)      | NO   | PRI | NULL    | auto_increment |
| text    | varchar(255) | YES  |     | NULL    |                |
| checked | int(11)      | YES  |     | 0       |                |
+---------+--------------+------+-----+---------+----------------+
3 rows in set (0.01 sec)
```

执行：`insert into list set checked = 0, text = 'haha'` 往表中插入一条数据；

执行：`select * from list;`
```javascript
mysql> select * from list;
+----+------+---------+
| id | text | checked |
+----+------+---------+
|  1 | haha |       0 |
+----+------+---------+
1 row in set (0.01 sec)
```

一切正常

### 构建node

mysql服务启动好了，接下来就是启动node服务，并连接刚启动的mysql服务了。

话不多说，直接上代码，解释看注释

```javascript
// index.js
const mysql = require('mysql'); // mysql包
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // post请求需要引入的包
app.use(bodyParser.json());

// mysql配置（用于连接刚启动的mysql服务）
const opt = {
    host: 'localhost',
    user: 'root',
    port: '3308',
    password: '123456',
    database: 'todolist'
};

const connection = mysql.createConnection(opt);

const sqlFn = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, filelds) => {
            if (err) throw err;
            resolve(results);
        });
    })
}

connection.connect(async (err) => {
    if (err) throw err;
    console.log('mysql connncted success!');
})

// todolist 列表查询
app.get('/getList', async (req, res) => {
    const sql = `SELECT * FROM list`;

    const data = await sqlFn(sql);

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

// todolist 插入数据
app.post('/insert', async (req, res) => {
    const sql = `INSERT INTO list SET checked = ${req.body.checked}, text = '${req.body.text}'`;
    const data = await sqlFn(sql);

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.listen(3000);

```

执行: `node index.js`后，控制台输入

```javascript
➜  server git:(master) ✗ node index.js  
mysql connncted success!
```

表示node服务连接mysql服务成功；

浏览器可以访问下`localhost:3000/getList`

```javascript
{"code":0,"data":[{"id":1,"text":"haha","checked":0}],"message":"success"}
```

页面将会出现刚才我们sql插入到数据库的数据

既然代码没有问题，那么我们接下来就把他构建成镜像。

在当前文件夹新建名为Dockerfile的文件

```sh
# 基于最新的 node 镜像
FROM node:8
# 复制当前目录下所有文件到目标镜像 /app/ 目录下
COPY . /todolist/server
# 修改工作目录
WORKDIR /todolist/server
# 安装依赖
RUN ["npm", "install"]
# 启动 node server
ENTRYPOINT ["node", "index.js"]

```

执行：`docker build -t mynode .`，生成node镜像

- -t:表示给该镜像添加版本，这里不写默认为latest

可通过`docker images`查看本地的镜像。

```javascript
➜  server git:(master) ✗ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mynode              latest              3e8de2825063        4 seconds ago       898MB
```

可以看到第一个镜像就是我们刚刚构建的镜像

```javascript
➜  server git:(master) ✗ docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mynode              latest              3e8de2825063        4 seconds ago       898MB
```

接下来运行基于这个镜像的容器

执行：``


### 构建vue

todolist的静态页面，我是通过vue-cli3搭建的。
执行`vue create app` 创建项目。

进入项目根目录执行`npm run serve`页面是否正常执行。

然后编写简易的具有增删改查的todolist应用。具体代码见[todolist](https://github.com/zhouatie/study-docker/tree/master/todolist)。

