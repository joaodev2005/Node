const fs = require('fs');

fs.unlink('arquivo.txt', function (err)  {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Arquivo removido com sucesso');
})