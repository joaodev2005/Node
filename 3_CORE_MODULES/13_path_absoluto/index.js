const path = require('path');

console.log(path.resolve('arquivo.txt'));


const midFolder = 'relatorio';
const fileName = 'juca.pdf';

const finalPath = path.join("/", "arquivos", midFolder, fileName);

console.log(finalPath);