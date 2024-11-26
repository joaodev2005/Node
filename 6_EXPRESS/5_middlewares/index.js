const express = require('express');

const app = express();
const port = 3000;

const path = require('path');

const basePath = path.join(__dirname, 'template');

const checkAuth = (req, res, next ) => {

    req.authStatus = false;

    if (req.authStatus) {
        console.log('Usuário autorizado!');
        next();
    } else {
        res.send('Usuário não autorizado!')
    }

}

app.use(checkAuth);

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`);
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})