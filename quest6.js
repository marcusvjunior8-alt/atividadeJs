const prompt = require('prompt-sync')();

let estoque = [];

function listar() {
    console.log('\n--- Estoque ---');
    let totalEstoque = 0;
    
    estoque.forEach(p => {
        let destaque = p.quantidade < 5 ? ' [ALERTA: ESTOQUE BAIXO]' : '';
        let totalProduto = p.quantidade * p.preco;
        totalEstoque += totalProduto;
        
        console.log(`Código: ${p.codigo} | Produto: ${p.nome} | Qtd: ${p.quantidade}${destaque} | Preço: R$ ${p.preco.toFixed(2)}`);
    });
    
    console.log(`Valor total em estoque: R$ ${totalEstoque.toFixed(2)}\n`);
}

function cadastrar() {
    let codigo = prompt('Código: ');
    
    if (estoque.find(p => p.codigo === codigo)) {
        console.log('Erro: Código já existe!\n');
        return;
    }

    let nome = prompt('Nome: ');
    let quantidade = parseInt(prompt('Quantidade: '));
    let preco = parseFloat(prompt('Preço unitário: '));

    estoque.push({ codigo, nome, quantidade, preco });
    listar();
}

function entrada() {
    let codigo = prompt('Código do produto: ');
    let produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log('Erro: Produto não encontrado!\n');
        return;
    }

    let qtd = parseInt(prompt('Quantidade de entrada: '));
    produto.quantidade += qtd;
    listar();
}

function saida() {
    let codigo = prompt('Código do produto: ');
    let produto = estoque.find(p => p.codigo === codigo);

    if (!produto) {
        console.log('Erro: Produto não encontrado!\n');
        return;
    }

    let qtd = parseInt(prompt('Quantidade de saída: '));
    
    if (qtd > produto.quantidade) {
        console.log('Erro: Quantidade indisponível para saída!\n');
        return;
    }

    produto.quantidade -= qtd;
    listar();
}

while (true) {
    let opcao = prompt('1-Cadastrar | 2-Entrada | 3-Saída | 4-Listar | 5-Sair : ');
    
    if (opcao === '1') {
        cadastrar();
    } else if (opcao === '2') {
        entrada();
    } else if (opcao === '3') {
        saida();
    } else if (opcao === '4') {
        listar();
    } else if (opcao === '5') {
        break;
    }
}