const connStr = "Server=XXX;Database=XXX;User Id=XXX;Password=XXX";
const sql = require('mssql');

sql.connect(connStr)
    .then(conn => createTable(conn))
    .catch(err => console.log('erro!' + err));

function createTable(conn) {
    
    const table = new sql.Table('Products');
    table.create = true;
    table.columns.add('ID', sql.Int, {nullable: false, primary: true});
    table.columns.add('Name', sql.NVarChar(150), {nullable: false});
    table.columns.add('Price', sql.Decimal(12, 3), {nullable: false});
    table.rows.add(1, 'product 1', '123.450');
    table.rows.add(2, 'product 2', '987.654');
    table.rows.add(3, 'product 3', '654.320');

    const request = new sql.Request();
    request.bulk(table)
        .then(result => console.log('Table created!'))
        .catch(err => console.log('Erro no bulk' + err));
}