const mysql = require('mysql'); // mysql包
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // post请求需要引入的包
app.use(bodyParser.json());

// mysql配置（用于连接刚启动的mysql服务）
const opt = {
    host: '192.168.1.105', // 此处填上你的ip地址
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
    console.log(1111);
    const data = await sqlFn(sql);
    console.log(data, '2222');
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

app.listen(4000);