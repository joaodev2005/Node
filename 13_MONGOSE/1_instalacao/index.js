const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const conn = require('./db/conn.js');

const productRoutes = require('./routes/productRoutes.js');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({ extended: true })
)

app.use(express.json());

app.use(express.static('public'));

app.use('/products', productRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000!')
})