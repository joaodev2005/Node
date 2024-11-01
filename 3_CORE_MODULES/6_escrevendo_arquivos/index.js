const http = require('http');
const fs = require('fs');

const port = 3000;

let number = 0;

function incrementNumber() {
    number += 1
    return number 
}

const server = http.createServer((req, res) => {

    const urlInfo = require('url').parse(req.url, true);
    const name = urlInfo.query.name;

    if (!name) {
        fs.readFile('index.html', 'utf8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        })
    } else {
        fs.appendFile('arquivo.txt',  `${incrementNumber()} ${name}` + '\n', function (err, data) {
            res.writeHead(302, {
                'Location': '/'
            })
            return res.end();
        })
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})