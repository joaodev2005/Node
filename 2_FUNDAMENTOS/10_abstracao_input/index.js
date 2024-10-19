import inquirer from "inquirer";

inquirer.prompt([
    {
        name: 'p1',
        type: 'input',
        message: 'qual seu nome?'
    },
    {
        name: 'p2',
        type: 'input',
        message: 'gosta do japao?'
    }
])
.then((answers) => {
    console.log(answers);

    const nome = answers['p1'];
    const gostaJapao = answers['p2'];

    console.log(`Ola ${nome}, voce gosta de japao? ${gostaJapao}`);
})
.catch((err) => {
    console.log(err);
})