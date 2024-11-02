const fs = require('fs');

const oldFileName = 'arquivo.txt';
const newFileName = 'arquivo_renomeado.txt';

fs.rename(oldFileName, newFileName, function (err)  {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Arquivo renomeado com sucesso');
})