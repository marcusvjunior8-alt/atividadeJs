const prompt = require('prompt-sync')();
const fs = require('fs');

const ARQUIVO = 'tarefas.json';
let tarefas = [];

function carregarDados() {
    if (fs.existsSync(ARQUIVO)) {
        const dados = fs.readFileSync(ARQUIVO, 'utf8');
        tarefas = JSON.parse(dados);
    }
}

function salvarDados() {
    fs.writeFileSync(ARQUIVO, JSON.stringify(tarefas, null, 2));
}

function gerarId() {
    return tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;
}

function exibirIndicadores() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;
    
    console.log(`\n[Indicadores] Totais: ${total} | Concluídas: ${concluidas} | Pendentes: ${pendentes}`);
}

function cadastrarTarefa() {
    console.log("\n--- Nova Tarefa ---");
    const titulo = prompt("Título: ");
    const descricao = prompt("Descrição: ");
    const prioridade = prompt("Prioridade (Alta, Media, Baixa): ").toLowerCase();
    const prazo = prompt("Prazo (AAAA-MM-DD): ");

    tarefas.push({
        id: gerarId(),
        titulo,
        descricao,
        prioridade,
        prazo,
        concluida: false
    });

    salvarDados();
    console.log("Tarefa cadastrada com sucesso!");
}

function editarTarefa() {
    console.log("\n--- Editar Tarefa ---");
    const id = parseInt(prompt("ID da tarefa: "));
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        console.log("Tarefa não encontrada.");
        return;
    }

    const titulo = prompt(`Título (${tarefa.titulo}): `);
    const descricao = prompt(`Descrição (${tarefa.descricao}): `);
    const prioridade = prompt(`Prioridade (${tarefa.prioridade}): `).toLowerCase();
    const prazo = prompt(`Prazo (${tarefa.prazo}): `);

    if (titulo) tarefa.titulo = titulo;
    if (descricao) tarefa.descricao = descricao;
    if (prioridade) tarefa.prioridade = prioridade;
    if (prazo) tarefa.prazo = prazo;

    salvarDados();
    console.log("Tarefa atualizada com sucesso!");
}

function excluirTarefa() {
    console.log("\n--- Excluir Tarefa ---");
    const id = parseInt(prompt("ID da tarefa: "));
    const index = tarefas.findIndex(t => t.id === id);

    if (index === -1) {
        console.log("Tarefa não encontrada.");
        return;
    }

    tarefas.splice(index, 1);
    salvarDados();
    console.log("Tarefa excluída com sucesso!");
}

function marcarConcluida() {
    console.log("\n--- Concluir Tarefa ---");
    const id = parseInt(prompt("ID da tarefa: "));
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        console.log("Tarefa não encontrada.");
        return;
    }

    tarefa.concluida = true;
    salvarDados();
    console.log("Tarefa marcada como concluída!");
}

function listarTarefas() {
    console.log("\n--- Listar Tarefas ---");
    console.log("Filtros: 1-Todas | 2-Pendentes | 3-Concluídas | 4-Atrasadas");
    const filtro = prompt("Opção de filtro: ");
    
    console.log("Ordenação: 1-Prazo | 2-Prioridade");
    const ordenacao = prompt("Opção de ordenação: ");

    let lista = [...tarefas];
    const hoje = new Date().toISOString().split('T')[0];

    if (filtro === '2') lista = lista.filter(t => !t.concluida);
    if (filtro === '3') lista = lista.filter(t => t.concluida);
    if (filtro === '4') lista = lista.filter(t => !t.concluida && t.prazo < hoje);

    if (ordenacao === '1') {
        lista.sort((a, b) => new Date(a.prazo) - new Date(b.prazo));
    } else if (ordenacao === '2') {
        const peso = { alta: 3, media: 2, baixa: 1 };
        lista.sort((a, b) => (peso[b.prioridade] || 0) - (peso[a.prioridade] || 0));
    }

    if (lista.length === 0) {
        console.log("Nenhuma tarefa encontrada para os critérios selecionados.");
        return;
    }

    lista.forEach(t => {
        const status = t.concluida ? "[X]" : (t.prazo < hoje ? "[ATRASADA]" : "[ ]");
        console.log(`${t.id} - ${status} ${t.titulo} | Prioridade: ${t.prioridade} | Prazo: ${t.prazo}`);
    });
}

function iniciarSistema() {
    carregarDados();
    
    while (true) {
        console.log("\n=== Gerenciador de Tarefas ===");
        exibirIndicadores();
        console.log("1. Cadastrar Tarefa");
        console.log("2. Listar Tarefas");
        console.log("3. Marcar como Concluída");
        console.log("4. Editar Tarefa");
        console.log("5. Excluir Tarefa");
        console.log("6. Sair");
        
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === '1') cadastrarTarefa();
        else if (opcao === '2') listarTarefas();
        else if (opcao === '3') marcarConcluida();
        else if (opcao === '4') editarTarefa();
        else if (opcao === '5') excluirTarefa();
        else if (opcao === '6') break;
        else console.log("Opção inválida!");
    }
}

iniciarSistema();