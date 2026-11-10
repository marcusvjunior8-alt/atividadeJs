const prompt = require('prompt-sync')();

const estoque = [];

function listarEstoque() {
    console.log("\n--- Listagem de Estoque ---");
    if (estoque.length === 0) {
        console.log("Estoque vazio.");
        return;
    }

    let valorTotal = 0;

    estoque.forEach(produto => {
        const destaque = produto.quantidade < 5 ? " [ALERTA: ESTOQUE BAIXO]" : "";
        console.log(`Código: ${produto.codigo} | Produto: ${produto.nome} | Qtd: ${produto.quantidade}${destaque} | Preço Un: R$ ${produto.preco.toFixed(2)}`);
        valorTotal += produto.quantidade * produto.preco;
    });

    console.log(`\nValor total em estoque: R$ ${valorTotal.toFixed(2)}`);
}

function cadastrarProduto() {
    console.log("\n--- Cadastro de Produto ---");
    const codigo = prompt("Código do produto: ");

    const existe = estoque.some(p => p.codigo === codigo);
    if (existe) {
        console.log("Erro: Código já cadastrado.");
        return;
    }

    const nome = prompt("Nome do produto: ");
    const quantidade = parseInt(prompt("Quantidade inicial: "));
    const preco = parseFloat(prompt("Preço unitário: "));

    if (isNaN(quantidade) || quantidade < 0 || isNaN(preco) || preco < 0) {
        console.log("Erro: Valores numéricos inválidos.");
        return;
    }

    estoque.push({ codigo, nome, quantidade, preco });
    listarEstoque();
}

function entradaMercadoria() {
    console.log("\n--- Entrada de Mercadoria ---");
    const codigo = prompt("Código do produto: ");
    
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) {
        console.log("Erro: Produto não encontrado.");
        return;
    }

    const qtdEntrada = parseInt(prompt("Quantidade de entrada: "));
    if (isNaN(qtdEntrada) || qtdEntrada <= 0) {
        console.log("Erro: Quantidade inválida.");
        return;
    }

    produto.quantidade += qtdEntrada;
    listarEstoque();
}

function saidaMercadoria() {
    console.log("\n--- Saída de Mercadoria ---");
    const codigo = prompt("Código do produto: ");
    
    const produto = estoque.find(p => p.codigo === codigo);
    if (!produto) {
        console.log("Erro: Produto não encontrado.");
        return;
    }

    const qtdSaida = parseInt(prompt("Quantidade de saída: "));
    if (isNaN(qtdSaida) || qtdSaida <= 0) {
        console.log("Erro: Quantidade inválida.");
        return;
    }

    if (qtdSaida > produto.quantidade) {
        console.log("Erro: Operação negada. Saída superior à quantidade disponível.");
        return;
    }

    produto.quantidade -= qtdSaida;
    listarEstoque();
}

function iniciarSistema() {
    while (true) {
        console.log("\n=== Sistema de Controle de Estoque ===");
        console.log("1. Cadastrar Produto");
        console.log("2. Registrar Entrada");
        console.log("3. Registrar Saída");
        console.log("4. Exibir Estoque");
        console.log("5. Sair");
        
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === '1') {
            cadastrarProduto();
        } else if (opcao === '2') {
            entradaMercadoria();
        } else if (opcao === '3') {
            saidaMercadoria();
        } else if (opcao === '4') {
            listarEstoque();
        } else if (opcao === '5') {
            break;
        } else {
            console.log("Opção inválida!");
        }
    }
}

iniciarSistema();