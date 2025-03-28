const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');

const app = express();

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/users/create', (req, res) => {
    res.render('adduser');
});

app.post('/users/create', async (req, res) => {

    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({
        name,
        occupation,
        newsletter
    }).then(() => {
        res.redirect('/');
    }).catch((err) => console.log(err));
})


app.get('/', async(req, res) => {

    const users = await User.findAll({
        raw: true
    });

    res.render('home', {users});
});

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    })
}).catch((err) => console.log(err));