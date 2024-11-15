import chalk from 'chalk';
import inquirer from 'inquirer';

import fs from 'fs';

operation();

function operation() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'O que voce deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }])
        .then((answer) => {

            const action = answer['action'];

            switch (action) {
                case 'Criar conta':
                    createAccount();
                    break;
                case 'Depositar':
                    deposit();
                    break;
                case 'Sacar':
                    break;
                case 'Consultar saldo':
                    break;
                case 'Sair':
                    console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'));
                    process.exit();
                    break;
                default:
                    console.log('Acao invalida');
                    break;
            }

            // if (action === 'Criar conta') {
            //     createAccount();
            // }

        })
        .catch((err) => console.log(err));
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por criar uma conta'));
    console.log(chalk.green('Defina as opcoes da sua conta a seguir'));

    buildAccount();
}

function buildAccount() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Digite o nome da sua conta',
            }
        ]).then((answer) => {
            const accountName = answer['accountName'];
            console.log(accountName);

            if (!fs.existsSync('accounts')) {
                fs.mkdirSync('accounts');
            }

            if (fs.existsSync(`accounts/${accountName}.json`)) {
                console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome'));
                buildAccount();
                return;
            }

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                '{"balance": 0}',
                function (err) {
                    console.log(err);
                }
            )

            console.log(chalk.green('Conta criada com sucesso!'));
            operation();
        })
        .catch((err) => console.log(err));
}

