const mysql = require('mysql');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3308',
    password: '123456',
    database: 'todolist'
});

connection.connect(err => {
    if (err) throw err;
    console.log('mysql connncted success!');
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