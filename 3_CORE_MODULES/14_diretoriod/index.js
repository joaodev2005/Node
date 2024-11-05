const fs = require('fs');


fs.existsSync('pasta');

if (fs.existsSync('pasta')) {
    console.log('Arquivo existe');
} else {
    console.log('Arquivo não existe');
}


fs.mkdirSync('pasta', { recursive: true });