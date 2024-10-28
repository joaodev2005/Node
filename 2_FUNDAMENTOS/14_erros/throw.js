const x = 10;

if(!Number.isInteger(x)){
    throw new Error('x não e um numero inteiro');
}

console.log('continue...');