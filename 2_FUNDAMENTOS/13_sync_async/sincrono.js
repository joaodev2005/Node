import fs from 'fs';

console.log('Inicio');

fs.writeFileSync('arquivo.txt', 'Conteudo');
console.log('Fim');