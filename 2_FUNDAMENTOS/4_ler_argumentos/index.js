console.log(process.argv);

const args = process.argv.slice(2);
console.log(args);

const nome = args[0].split('=')[1];
console.log(nome);

const idade = args[1].split('=')[1];
console.log(idade);

const job = args[2].split('=')[1];
console.log(job);

console.log(`Ele se chama ${nome} quer ser ${job} e tem ${idade} anos`)