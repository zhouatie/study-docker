var mysql = require('mysql');
var connection = mysql.createConnection({
    host:"0.0.0.0",
    user:"mymysql1",
    password:"123456",
    database:"oa",
    port: 3307
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();