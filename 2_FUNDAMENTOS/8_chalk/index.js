import chalk from 'chalk';

const nota = 10;

switch (true) {
    case (nota >= 9):
        console.log(chalk.green('Quadro de honra!'));
        break;
    case (nota >= 7):
        console.log(chalk.green('Aprovado!'));
        break;
    case (nota >= 5):
        console.log(chalk.yellow('Recuperação!'));
        break;
    default:
        console.log(chalk.red('Reprovado!'));
}



setTimeout(() => {
    console.clear();
}, 5000)