const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const opt = {
    host: 'db',
    user: 'root',
    port: '3306',
    password: '123456'
};
console.log('connect1')
let connection = mysql.createConnection(opt);
console.log('connect2')

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
    console.log('connect3')

    const findDatabase = `show databases like 'todolist'`
    const database = await sqlFn(findDatabase);

    if (!database.length) {
        const result = await sqlFn('create database todolist');
    }
    console.log('connect4')

    connection = await mysql.createConnection({...opt, ...{database: 'todolist'}});
    console.log('connect5')

    const findTables = `show tables like 'list'`;
    const tables = await sqlFn(findTables);
    console.log('connect6')

    if (!tables.length) {
        const sql = `CREATE TABLE list (
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            text VARCHAR(255),
            checked INT(11) DEFAULT 0
            )`;
        const result = await sqlFn(sql);
    }
    console.log('connect7')
})

app.get('/sql', async (req, res) => {
    const sql = req.query.sql;

    const data = await sqlFn(sql);
    const a = data.find(o => o.Tables_in_mysql === 'user');
    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.get('/getList', async (req, res) => {
    const sql = `SELECT * FROM list`;

    const data = await sqlFn(sql);

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.post('/insert', async (req, res) => {
    const sql = `INSERT INTO list SET checked = ${req.body.checked}, text = '${req.body.text}'`;
    const data = await sqlFn(sql);

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.put('/check', async (req, res) => {
    const sql = `UPDATE list SET checked = 1 WHERE id = ${req.body.id}`;
    const data = await sqlFn(sql);

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.post('/delete', async (req, res) => {
    const sql = `DELETE FROM list WHERE id = ${req.body.id}`;
    const data = await sqlFn(sql);

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})
app.listen(3000);