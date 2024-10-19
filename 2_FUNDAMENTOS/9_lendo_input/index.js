import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Qual seu nome? ", (nome) => {
    console.log(`Olá ${nome}`);

    rl.close();
})