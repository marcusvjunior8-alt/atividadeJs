const prompt = require('prompt-sync')();
let n =  Number(prompt('digite um n°:'))

console.log(`\nTabuada do ${n}:`);
        for (let i = 1; i <= 10; i++) {
            console.log(`${n} x ${i} = ${n * i}`);
        }