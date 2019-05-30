var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"192.168.1.109",
    user:"mymysql",
    password:"123456",
    database:"oa",
    port: 3308
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();