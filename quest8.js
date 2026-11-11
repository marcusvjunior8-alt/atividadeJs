const prompt = require('prompt-sync')();

let tarefas = [];
let idCounter = 1;

function exibirIndicadores() {
    let concluidas = tarefas.filter(t => t.concluida).length;
    let pendentes = tarefas.length - concluidas;
    console.log(`\n--- Indicadores ---`);
    console.log(`Total: ${tarefas.length} | Concluídas: ${concluidas} | Pendentes: ${pendentes}\n`);
}

function cadastrar() {
    let titulo = prompt('Título: ');
    let descricao = prompt('Descrição: ');
    let prioridade = prompt('Prioridade (1-Alta, 2-Média, 3-Baixa): ');
    let prazo = prompt('Prazo (AAAA-MM-DD): ');
    
    tarefas.push({ id: idCounter++, titulo, descricao, prioridade, prazo, concluida: false });
    console.log('Tarefa cadastrada!\n');
}

function listar() {
    let filtro = prompt('Filtro (1-Todas | 2-Pendentes | 3-Concluídas | 4-Atrasadas): ');
    let ordem = prompt('Ordenar por (1-Prazo | 2-Prioridade): ');

    let lista = [...tarefas];
    let hoje = new Date().toISOString().split('T')[0];

    if (filtro === '2') lista = lista.filter(t => !t.concluida);
    if (filtro === '3') lista = lista.filter(t => t.concluida);
    if (filtro === '4') lista = lista.filter(t => !t.concluida && t.prazo < hoje);

    if (ordem === '1') {
        lista.sort((a, b) => a.prazo.localeCompare(b.prazo));
    } else if (ordem === '2') {
        lista.sort((a, b) => a.prioridade.localeCompare(b.prioridade));
    }

    console.log('\n--- Lista de Tarefas ---');
    if (lista.length === 0) {
        console.log('Nenhuma tarefa encontrada.');
    }

    lista.forEach(t => {
        let status = t.concluida ? '[Concluída]' : (t.prazo < hoje ? '[Atrasada]' : '[Pendente]');
        let prio = t.prioridade === '1' ? 'Alta' : (t.prioridade === '2' ? 'Média' : 'Baixa');
        console.log(`ID: ${t.id} | ${status} ${t.titulo} | Prio: ${prio} | Prazo: ${t.prazo}`);
    });
    console.log('');
}

function editar() {
    let id = parseInt(prompt('ID da tarefa para editar: '));
    let tarefa = tarefas.find(t => t.id === id);
    
    if (!tarefa) {
        console.log('Erro: Tarefa não encontrada!\n');
        return;
    }

    let titulo = prompt(`Título (${tarefa.titulo}): `);
    let descricao = prompt(`Descrição (${tarefa.descricao}): `);
    let prioridade = prompt(`Prioridade (${tarefa.prioridade}): `);
    let prazo = prompt(`Prazo (${tarefa.prazo}): `);

    if (titulo) tarefa.titulo = titulo;
    if (descricao) tarefa.descricao = descricao;
    if (prioridade) tarefa.prioridade = prioridade;
    if (prazo) tarefa.prazo = prazo;

    console.log('Tarefa atualizada!\n');
}

function excluir() {
    let id = parseInt(prompt('ID da tarefa para excluir: '));
    let index = tarefas.findIndex(t => t.id === id);
    
    if (index === -1) {
        console.log('Erro: Tarefa não encontrada!\n');
        return;
    }
    
    tarefas.splice(index, 1);
    console.log('Tarefa excluída!\n');
}

function concluir() {
    let id = parseInt(prompt('ID da tarefa para concluir: '));
    let tarefa = tarefas.find(t => t.id === id);
    
    if (!tarefa) {
        console.log('Erro: Tarefa não encontrada!\n');
        return;
    }

    tarefa.concluida = true;
    console.log('Tarefa marcada como concluída!\n');
}

while (true) {
    exibirIndicadores();
    let opcao = prompt('1-Cadastrar | 2-Listar | 3-Editar | 4-Excluir | 5-Concluir | 6-Sair : ');
    
    if (opcao === '1') {
        cadastrar();
    } else if (opcao === '2') {
        listar();
    } else if (opcao === '3') {
        editar();
    } else if (opcao === '4') {
        excluir();
    } else if (opcao === '5') {
        concluir();
    } else if (opcao === '6') {
        break;
    }
}