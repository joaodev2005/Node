const express = require('express');

const app = express();
const port = 3000;

const path = require('path');

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json());

const basePath = path.join(__dirname, 'template');

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`);
})

app.post('/users/save', (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const age = req.body.age;

    console.log(`Nome: ${name}`);
    console.log(`Idade: ${age}`);

    res.sendFile(`${basePath}/users.html`);
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id;

    console.log(`Usuario: ${id}`);

    res.sendFile(`${basePath}/users.html`);
})

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})

