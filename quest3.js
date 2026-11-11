const prompt = require('prompt-sync')();

let nome_p = prompt('digite o nome do produto:')
let valor_u = parseFloat(prompt('digite o valor:'))
let qtd = parseInt(prompt('digite a quantidade:'))
let desconto = parseFloat(prompt('digite o percentual de desconto:'))
let subtotal = valor_u * qtd
let economia = subtotal / (desconto / 100)
let total = subtotal - economia

console.log('----- Simulador Compras -----')
if (valor_u > 0 && qtd > 0 && desconto > 0) {
    console.log(`produto: ${nome_p}\nvalor: R$ ${valor_u.toFixed(2)}\nquantidade: ${qtd}\ndesconto: ${desconto}%\nsubtotal: R$ ${subtotal.toFixed(2)}\neconomia: R$ ${economia.toFixed(2)}\ntotal a pagar: R$ ${total.toFixed(2)}`);
}else {
    console.log('Erro: Valores inválidos.');
}
