//Definir constantes locais:
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const sql = require('mssql');
const connStr = "Server=XXX;Database=XXX;User Id=XXX;Password=XXX";

//Fazer conexão global
sql.connect(connStr)
    .then(conn => global.conn = conn)
    .catch(err => console.log(err));

//configurar o body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//definir rotas
const router = express.Router();

router.get('/', (req, res) => res.json({message: 'Funcionando!'}));
app.use('/', router);

router.get('/products', (req, res) => {

    execSQLQuery('SELECT * FROM Products', res)
});

//iniciar servidor
app.listen(port);
console.log('API funcionando!');

//executa consultas no banco usando o pool de conexões global (conn)
function execSQLQuery(sqlQry, res) {

    global.conn.request()
                .query(sqlQry)
                .then(result => res.json(result.recordset))
                .catch(err => res.json(err));
};

