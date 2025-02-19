const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));