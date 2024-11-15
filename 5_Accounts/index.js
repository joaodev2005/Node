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

            if (action === 'Criar conta') {
                createAccount();
            }
            
        })
        .catch((err) => console.log(err));
}

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por criar uma conta'));
    console.log(chalk.green('Defina as opcoes da sua conta a seguir'));
}