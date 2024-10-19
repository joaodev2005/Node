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
})
.catch((err) => {
    console.log(err);
})