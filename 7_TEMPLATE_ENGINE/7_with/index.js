const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars');


app.get('/dashboard', (req, res) => {

    const items = ["item 1", "item 2", "item 3", "item 4", "item 5"];

    res.render('dashboard', {items});
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprenda Node.js',
        category: 'JavaScript',
        body: 'Estou aprendendo Node.js',
        comments: 4
    }

    res.render('blogpost', {post});
})

app.get('/', (req, res) => {

    const user = {
        name: 'John',
        surname: 'Doe',
        age: 30,
        admin: true
    }

    const auth = false;

    res.render('home', {user: user, auth});
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});