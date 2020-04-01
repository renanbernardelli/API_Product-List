const connStr = "Server=XXX;Database=XXX;User Id=XX;Password=XXX";
const sql = require('mssql');

sql.connect(connStr)
    .then(conn => console.log('conectou'))
    .catch(err => console.log('erro!' + err));