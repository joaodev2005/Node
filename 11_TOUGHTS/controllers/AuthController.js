// const User = require('../models/User');

// const bcrypt = require('bcryptjs');

// module.exports = class AuthController {
//     static login(req, res) {
//         res.render('auth/login');
//     }

//     static register(req, res) {
//         res.render('auth/register');
//     }

//     static async registerPost(req, res) {

//         const { name, email, password, confirmpassword } = req.body;

//         if (password != confirmpassword) {
//             req.flash('message', 'Senhas não conferem');
//             res.render('auth/register');

//             return;
//         }

//         const checkIfUserExists = await User.findOne({ where: { email: email } });

//         if (checkIfUserExists) {
//             req.flash('message', 'Email em uso');
//             res.render('auth/register');

//             return;
//         }

//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(password, salt);

//         const user = {
//             name,
//             email,
//             password: hashedPassword
//         }

//         try {
//             const createdUser = await User.create(user);

//             req.session.userId = createdUser.id;

//             req.flash('message', 'User created successfully');

//             req.session.save(() => {
//                 res.redirect('/');
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
    
const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class UserController {
  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {
    const { email, password } = req.body

    // find user
    const user = await User.findOne({ where: { email: email } })

    if (!user) {
      req.flash('message', 'Usuário não encontrado!')
      res.render('auth/login')

      return
    }

    // compare password
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      req.flash('message', 'Senha inválida!')
      res.render('auth/login')

      return
    }

    // auth user
    req.session.userid = user.id

    req.flash('message', 'Login realizado com sucesso!')

    req.session.save(() => {
      res.redirect('/')
    })
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body

    // passwords match validation
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')

      return
    }

    // email validation
    const checkIfUserExists = await User.findOne({ where: { email: email } })

    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está em uso!')
      res.render('auth/register')

      return
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      email,
      password: hashedPassword,
    }

    User.create(user)
      .then((user) => {
        // initialize session
        req.session.userid = user.id

        // console.log('salvou dado')
        // console.log(req.session.userid)

        req.session.userid = user.id

        req.flash('message', 'Cadastro realizado com sucesso!')

        req.session.save(() => {
          res.redirect('/')
        })
      })
      .catch((err) => console.log(err))
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  }
}
