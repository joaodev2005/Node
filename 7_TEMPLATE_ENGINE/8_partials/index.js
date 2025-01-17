const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials']
});

app.engine('handlebars', hbs.engine)
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

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprenda Node.js',
            category: 'JavaScript',
            body: 'Estou aprendendo Node.js',
            comments: 4
        },
        {
            title: 'Aprenda PHP',
            category: 'PHP',
            body: 'Estou aprendendo PHP',
            comments: 2
        },
        {
            title: 'Aprenda Python',
            category: 'Python',
            body: 'Estou aprendendo Python',
            comments: 8
        },
        {
            title: 'Aprenda Java',
            category: 'Java',
            body: 'Estou aprendendo Java',
            comments: 0
        },
        {
            title: 'Aprenda C#',
            category: 'C#',
            body: 'Estou aprendendo C#',
            comments: 0
        }
    ]

    res.render('blog', {posts});
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