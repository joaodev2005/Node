import chalk from 'chalk';
import readline from 'readline';
import inquirer from 'inquirer';

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// const question = (res) => {
//     console.log(chalk.black.bgYellow(res));
// }

// rl.question("Qual seu nome? ", (nome) => {
//     rl.question("Qual sua idade? ", (idade) => {
//         rl.question("Qual seu job? ", (job) => {
//             question(`Ola ${nome}, voce tem ${idade} anos e trabalha como ${job}`);
//             rl.close();
//         })
//     })
// })


inquirer
    .prompt([
        { name: 'p1', message: 'qual seu nome?' },
        { name: 'p2', message: 'qual sua idade?' },
        { name: 'p3', message: 'qual seu job?' }
    ])
    .then((answers) => {

        if(!answers['p1'] || !answers['p2'] || !answers['p3']) {
            throw new Error('Todos os campos sao obrigatorios');
        }

        if(!Number.isInteger(parseInt(answers['p2']))) {
            throw new Error('A idade deve ser um numero inteiro');
        }

        const response = (`${answers['p1']} tem ${answers['p2']} anos e trabalha como ${answers['p3']}`);

        console.log(chalk.black.bgYellow(response));
    })
    .catch((err) => {
        console.log(err);
    })

