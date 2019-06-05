const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3307',
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
app.listen(3000);