const express = require('express');
const mysql = require('mysql');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Banco de dados conectado com sucesso');

    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    })
});

