const url = require('url');
const address = 'http://www.meusite.com.br/?param1=valor1&param2=valor2';
const parseUrl1 = new url.URL(address);

console.log(parseUrl1);
console.log(parseUrl1.searchParams);
console.log(parseUrl1.searchParams.get('param1'));