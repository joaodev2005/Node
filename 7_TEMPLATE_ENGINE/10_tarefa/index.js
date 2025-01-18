const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials']  // Correct path to partials
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const products = [
    { id: 1, name: 'Notebook', price: 2499, discount: 0.15 },
    { id: 2, name: 'Smartphone', price: 1999, discount: 0.1 },
    { id: 3, name: 'Tablet', price: 1499, discount: 0.05 },
];

app.get('/product/:id', (req, res) => {
    const produtoId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === produtoId);

    if (product) {
        res.render('partials/produto', { produto: product });  
    } else {
        res.status(404).send('Produto não encontrado');
    }
});

app.get('/', (req, res) => {
    res.render('home', { products: products });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
