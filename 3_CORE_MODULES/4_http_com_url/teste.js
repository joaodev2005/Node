const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {

    const urlInfo = require('url').parse(req.url, true);
    const n1 = urlInfo.query.n1;
    const n2 = urlInfo.query.n2;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html', 'charset=utf-8');

    if (!n1 || !n2) {
        res.end('<h1>Por favor, informe os valores</h1><form method="get"><input type="text" name="n1"/><input type="text" name="n2"/><input type="submit" value="enviar"/></form>');
    } else {
        res.end(`<h1>${n1} + ${n2} = ${parseInt(n1) + parseInt(n2)}</h1>`)
    }

})

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})