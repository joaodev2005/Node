const express = require('express');

const app = express();
const port = 5000;

const projectRoutes = require('./projects');

app.use(express.static('public'));

app.use('/projects', projectRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})