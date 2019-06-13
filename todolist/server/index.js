const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// app.get('/getList', async (req, res) => {
//     res.json({
//         code: 0,
//         data: [],
//         message: 'success'
//     })
// })
const opt = {
    host: 'localhost',
    user: 'root',
    port: '3308',
    password: '123456'
};
let connection = mysql.createConnection(opt);

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
    // console.log(connection)
    // const findDatabase = `select t.table_name from information_schema.TABLES t where t.TABLE_SCHEMA ="database_name" and t.TABLE_NAME ='table_name'`
    const findDatabase = `select count(*) from information_schema.TABLES t where t.TABLE_SCHEMA ="todolist"`
    const data = await sqlFn(findDatabase);
    console.log(data[0], data[0]['count(*)'], !Boolean(data[0]['count(*)']));
    if (!data[0]['count(*)']) {
        const result = await sqlFn('create database todolist');
        connection = mysql.createConnection({...opt, ...{database: 'todolist'}});

        // const sql = `CREATE TABLE list (
        //     id INT(11) AUTO_INCREMENT PRIMARY KEY,
        //     text VARCHAR(255),
        //     check INT(11) DEFAULT 0
        //     )`;
        // const result2 = await sqlFn(sql);
        // console.log(result2, 'reslult2');
    }
})
app.get('/sql', async (req, res) => {
    const sql = req.query.sql;

    const data = await sqlFn(sql);
    const a = data.find(o => o.Tables_in_mysql === 'user');
    console.log(data);
    console.log(a)
    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.get('/getList', async (req, res) => {
    const sql = `SELECT * FROM list`;

    const data = await new Promise((resolve, reject) => {
        connection.query(sql, (err, results, filelds) => {
            if (err) throw err;
            resolve(results);
        });
    })

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.post('/insert', async (req, res) => {
    const sql = `INSERT INTO list SET checked = ${req.body.checked}, text = '${req.body.text}'`;
    console.log(sql)
    const data = await new Promise((resolve, reject) => {
        connection.query(sql, (err, results, filelds) => {
            if (err) throw err;
            resolve(results);
        });
    })

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.put('/check', async (req, res) => {
    const sql = `UPDATE list SET checked = 1 WHERE id = ${req.body.id}`;
    const data = await new Promise((resolve, reject) => {
        connection.query(sql, (err, results, filelds) => {
            if (err) throw err;
            resolve(results);
        });
    })

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})

app.post('/delete', async (req, res) => {
    const sql = `DELETE FROM list WHERE id = ${req.body.id}`;
    const data = await new Promise((resolve, reject) => {
        connection.query(sql, (err, results, filelds) => {
            if (err) throw err;
            resolve(results);
        });
    })

    res.json({
        code: 0,
        data,
        message: 'success'
    })
})
app.listen(3000);