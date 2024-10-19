// externo
const minimist = require('minimist');

// interno
// const soma = require('./soma').soma

// const args = minimist(process.argv.slice(2));

// const a = parseInt(args['a'])
// const b = parseInt(args['b'])

// soma(a, b)

//teste

const testeSoma = require('./testeSoma');

const args = minimist(process.argv.slice(2));

const a = parseInt(args['a'])
const b = parseInt(args['b'])
const c = parseInt(args['c'])

testeSoma.soma(a, b, c)