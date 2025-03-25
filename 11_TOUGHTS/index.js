// const express = require('express');
// const exphbs = require('express-handlebars');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const flash = require('connect-flash');

// const app = express();

// const conn = require('./db/conn');

// const Tought = require('./models/Tought');
// const User = require('./models/User');

// const toughtRoutes = require('./routes/toughtRoutes');
// const authRoutes = require('./routes/authRoutes');

// const ToughtsController = require('./controllers/ToughtController');

// app.engine('handlebars', exphbs.engine());
// app.set('view engine', 'handlebars');

// app.use(
//     express.urlencoded({
//         extended: true
//     })
// )

// app.use(express.json());

// app.use(
//     session({
//         name: 'session',
//         secret: 'nosso_secret',
//         resave: false,
//         saveUninitialized: false,
//         store: new FileStore({
//             logFn: function () { },
//             path: require('path').join(require('os').tmpdir(), 'sessions')
//         }),
//         cookie: {
//             secure: false,
//             maxAge: 3600000,
//             httpOnly: true
//         },
//         cookie: {
//             secure: false,
//             maxAge: 3600000,
//             expires: new Date(Date.now() + 3600000),
//             httpOnly: true
//         }
//     })
// )

// app.use(flash());

// app.use((req, res, next) => {
//     res.locals.messages = req.flash();
//     next();
// });

// app.use(express.static('public'));

// app.use((req, res, next) => {

//     console.log(req.session.userId);

//     if (req.session.userId) {
//         res.locals.session = req.session;
//     }
//     next();
// })

// app.use('/toughts', toughtRoutes);
// app.use('/', authRoutes);

// app.get('/', ToughtsController.showToughts);


// conn.sync()
// .then(() => {
//     app.listen(3000, () => {
//         console.log('Servidor rodando na porta 3000');
//     })
// }).catch((err) => console.log(err));

const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

const app = express();

const conn = require("./db/conn");

// Models
const Tought = require("./models/Tought");

// routes
const toughtRoutes = require("./routes/toughtRoutes");
const authRoutes = require("./routes/authRoutes");
const ToughController = require("./controllers/ToughtController");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// flash messages
app.use(flash());

app.use(express.static("public"));

// set session to res
app.use((req, res, next) => {
  // console.log(req.session)
  console.log(req.session.userid);

  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/toughts", toughtRoutes);
app.use("/", authRoutes);

app.get("/", ToughController.showToughts);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err)); 