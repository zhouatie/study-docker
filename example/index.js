const Koa = require('koa');
const Router = require('koa-router');
const mysql = require('mysql');

const app = new Koa();
const router = new Router();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: '3308',
    password: '123456'
});

connection.connect(err => {
    if (err) throw err;
    console.log('mysql connncted success!');
})

router.get('/', ctx => {
    ctx.body = 'Visit index';
})

router.get('/createdb', ctx => {
    return new Promise(resolve => {
        const sql = `CREATE DATABASE mysqlkoa`;

        connection.query(sql, (err) => {
            if (err) throw err;
            ctx.body = {
                code: 200,
                msg: `create database mysqlkoa success!`
            }
            resolve();
        });
    })
})

router.get('/createtable', ctx => {
    return new Promise(resolve => {
        const sql = `CREATE TABLE fe_frame(
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        author VARCHAR(255)
      )`;
        connection.query(sql, (err, results, filelds) => {
            if (err) throw err;
            ctx.body = {
                code: 200,
                msg: `create table of fe_frame success!`
            }
            resolve();
        })
    })
})

router.get('/insert', ctx => {
    return new Promise(resolve => {
        const sql = `INSERT INTO fe_frame(name, author)
      VALUES('vue', 'Evan')`;
        connection.query(sql, (err) => {
            if (err) throw err;
            ctx.body = {
                cde: 200,
                msg: `insert data to fe_frame success!`
            }
            resolve();
        })
    })
})

router.get('/insertmulti', ctx => {
    return new Promise(resolve => {
        const sql = `INSERT INTO fe_frame(name, author)
      VALUES ?`;
        const values = [
            ['React', 'Facebook'],
            ['Angular', 'Google'],
            ['jQuery', 'John Resig']
        ];
        connection.query(sql, [values], (err, result) => {
            if (err) throw err;
            ctx.body = {
                code: 200,
                msg: `insert ${result.affectedRows} data to fe_frame success!`
            }
            resolve();
        })
    })
})

router.get('/delete', ctx => {
    return new Promise(resolve => {
        const name = ctx.query.name;
        const sql = `DELETE FROM fe_frame WHERE name = '${name}'`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            ctx.body = {
                code: 200,
                msg: `delete ${result.affectedRows} data from fe_frame success!`
            };
            resolve();
        })
    })
})

router.get('/update', ctx => {
    return new Promise(resolve => {
        const sql = `UPDATE fe_frame SET author = 'Evan You' WHERE NAME = 'vue'`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            ctx.body = {
                code: 200,
                msg: `update ${result.affectedRows} data from fe_frame success!`
            };
            resolve();
        })
    })
})

router.get('/select', ctx => {
    return new Promise(resolve => {
        let name = ctx.query.name;
        const sql = `SELECT * FROM fe_frame WHERE name = '${name}'`;
        connection.query(sql, (err, result) => {
            if (err) throw err;
            ctx.body = {
                code: 200,
                data: result
            }
            resolve();
        })
    })
})

app.use(router.routes());

app.listen(3000);