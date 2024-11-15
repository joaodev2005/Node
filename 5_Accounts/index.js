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

            console.log(action);
            
        })
        .catch((err) => console.log(err));
}

