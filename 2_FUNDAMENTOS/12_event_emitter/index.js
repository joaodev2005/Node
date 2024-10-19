import EventEmitter from 'events';

const emitter = new EventEmitter();

emitter.on('start', () => {
    console.log('Durante');
})

console.log('Antes')

emitter.emit('start');

console.log('Depois')