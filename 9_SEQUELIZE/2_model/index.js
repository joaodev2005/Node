// const express = require('express');
// const mysql = require('mysql');
// const exphbs = require('express-handlebars');

// const app = express();

// app.use(express.urlencoded({
//     extended: true
// }))

// app.use(express.json());

// app.engine('handlebars', exphbs.engine());
// app.set('view engine', 'handlebars');

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.post('/tasks/inserttask', (req, res) => {
//     const title = req.body.title;

//     const sql = `INSERT INTO tasks (title) VALUES ('${title}')`;

//     conn.query(sql, (err) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.redirect('/');
//     })
// })

// app.get('/tasks', (req, res) => {
//     const sql = `SELECT * FROM tasks`;

//     conn.query(sql, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.render('tasks', { tasks: data });
//     })
// })

// app.post('/tasks/removetask/:id', (req, res) => {

//     const id = req.params.id;

//     const sql = `DELETE FROM tasks WHERE id = ${id}`;

//     conn.query(sql, (err) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         res.redirect('/tasks');
//     })
// })

// app.get('/tasks/edit/:id', (req, res) => {
    
//     const id = req.params.id;

//     const sql = `SELECT * FROM tasks WHERE id = ${id}`;

//     conn.query(sql, (err, data) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         const task = data[0];
//         res.render('edittask', { task });
//     })
// })

// app.post('/tasks/updatetask', (req, res) => {
//     const id = req.body.id;
//     const title = req.body.title;

//     const sql = `UPDATE tasks SET title = '${title}' WHERE id = ${id}`;

//     conn.query(sql, (err) => {
//         if (err) {
//             console.log(err);
//             return;
//         }    
//         res.redirect('/tasks');
//     })
// })

// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'todo'
// });

// conn.connect((err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('Banco de dados conectado com sucesso');

//     app.listen(3000, () => {
//         console.log('Servidor rodando na porta 3000');
//     })
// });
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

app.get('/', (req, res) => {
    res.render('home');
});

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    })
}).catch((err) => console.log(err));