const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');
const Address = require('./models/Address');

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

    if (newsletter === 'on') {
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

app.get('/users/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({
        raw: true,
        where: {
            id: id
        }
    });

    res.render('userview', { user });
})

app.post('/users/delete/:id', async (req, res) => {

    const id = req.params.id;

    await User.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/');
    }).catch((err) => console.log(err));

})

app.get('/users/edit/:id', function (req, res) {
    const id = req.params.id
  
    User.findOne({
      include: Address,
      where: {
        id: id,
      },
    })
      .then((user) => {
        res.render('useredit', { user: user.get({ plain: true }) })
      })
      .catch((err) => console.log(err))
  })

app.post('/users/update', async (req, res) => {

    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = req.body.newsletter;

    if (newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    const userData = {
        id,
        name,
        occupation,
        newsletter
    }

    await User.update(userData, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/');
    }).catch((err) => console.log(err));
})

app.get('/', async (req, res) => {

    const users = await User.findAll({
        raw: true
    });

    res.render('home', { users });
});

app.post('/address/create', async (req, res) => {

    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    const userId = req.body.userId;

    const address = {
        street,
        number,
        city,
        userId
    }

    Address.create(address)

    res.redirect(`/users/${userId}`);
})

conn.sync()
    //conn.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        })
    }).catch((err) => console.log(err));