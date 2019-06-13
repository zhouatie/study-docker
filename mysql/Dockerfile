FROM mysql:5.6
 #设置免密登录
ENV MYSQL_ALLOW_EMPTY_PASSWORD yes
# ENV MYSQL_ROOT_PASSWORD 123456
 
#将所需文件放到容器中
COPY setup.sh ./setup.sh
COPY createtable.sql ./createtable.sql
COPY privileges.sql ./privileges.sql
 
#设置容器启动时执行的命令
CMD ["sh", "/setup.sh"]