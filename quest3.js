const prompt = require('prompt-sync')();

function calcularDesconto(subtotal, percentualDesconto) {
    return subtotal * (percentualDesconto / 100);
}

function iniciarSimulador() {
    console.log("\n--- Simulador de Compras ---");

const nomeProduto = prompt("Nome do produto: ");
const valorUnitario = parseFloat(prompt("Valor unitário (R$): "));
const quantidade = parseInt(prompt("Quantidade: "));
const percentualDesconto = parseFloat(prompt("Percentual de desconto (%): "));

if (isNaN(valorUnitario) || valorUnitario < 0) {
    console.log("Erro: O valor unitário não pode ser negativo ou inválido.");
    return;
}

if (isNaN(quantidade) || quantidade <= 0) {
    console.log("Erro: A quantidade deve ser um número válido e maior que zero.");
    return;
}

if (isNaN(percentualDesconto) || percentualDesconto < 0 || percentualDesconto > 100) {
    console.log("Erro: O desconto não pode ser negativo nem maior que 100%.");
    return;
}

const subtotal = valorUnitario * quantidade;
const valorEconomizado = calcularDesconto(subtotal, percentualDesconto);
const totalAPagar = subtotal - valorEconomizado;

console.log("\n--- Resumo da Compra ---");
console.log(`Produto: ${nomeProduto}`);
console.log(`Subtotal: R$ ${subtotal.toFixed(2)}`);
console.log(`Valor economizado: R$ ${valorEconomizado.toFixed(2)}`);
console.log(`Total a pagar: R$ ${totalAPagar.toFixed(2)}`);
}

iniciarSimulador();