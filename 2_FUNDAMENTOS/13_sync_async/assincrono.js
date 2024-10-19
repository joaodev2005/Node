import fs from 'fs';

console.log('Inicio');

fs.writeFile('arquivo.txt', 'Dev full cycle', function (err)  {
    setTimeout(() => {
        console.log('Arquivo criado');
    }, 1000);
})

console.log('Fim');


setTimeout(() => {
    console.clear();
}, 5000)