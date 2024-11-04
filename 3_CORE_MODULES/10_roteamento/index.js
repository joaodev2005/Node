const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {

    const q = url.parse(req.url, true);
    const name = q.pathname.substring(1);

    if (name.includes('.html')) {
       if(fs.existsSync(name)) {
        fs.readFile(name, 'utf8', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        })
       } else {
        fs.readFile('404.html', 'utf8', (err, data) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        }) 
       }
    } 
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})