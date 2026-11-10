const fs = require('fs');
const prompt = require('prompt-sync')();

const ARQUIVO = 'gestao_escolar.json';
let estudantes = [];

function carregarDados() {
    if (fs.existsSync(ARQUIVO)) {
        const dados = fs.readFileSync(ARQUIVO, 'utf8');
        estudantes = JSON.parse(dados);
    }
}

function salvarDados() {
    fs.writeFileSync(ARQUIVO, JSON.stringify(estudantes, null, 2));
}

function calcularMedia(notas) {
    if (!notas || notas.length === 0) return 0;
    const soma = notas.reduce((acc, n) => acc + n, 0);
    return soma / notas.length;
}

function verificarAcompanhamento(historicoFrequencia) {
    let faltasConsecutivas = 0;
    for (let reg of historicoFrequencia) {
        if (reg.status === 'F') {
            faltasConsecutivas++;
            if (faltasConsecutivas > 3) return true;
        } else {
            faltasConsecutivas = 0;
        }
    }
    return false;
}

function cadastrarEstudante() {
    console.log("\n--- Novo Cadastramento de Estudante ---");
    const matricula = prompt("Matrícula: ");

    if (estudantes.some(e => e.matricula === matricula)) {
        console.log("Erro: Matrícula já cadastrada.");
        return;
    }

    const nome = prompt("Nome: ");
    const turma = prompt("Turma: ").toUpperCase();
    const curso = prompt("Curso: ");

    estudantes.push({
        matricula,
        nome,
        turma,
        curso,
        notas: [],
        historicoFrequencia: []
    });

    salvarDados();
    console.log("Estudante cadastrado com sucesso!");
}

function listarEstudantes() {
    console.log("\n--- Consulta de Estudantes ---");
    if (estudantes.length === 0) {
        console.log("Nenhum estudante cadastrado.");
        return;
    }

    const busca = prompt("Pesquisar por nome/curso/turma (deixe em branco para todos): ").toLowerCase();
    
    let lista = estudantes.filter(e => 
        e.nome.toLowerCase().includes(busca) || 
        e.curso.toLowerCase().includes(busca) || 
        e.turma.toLowerCase().includes(busca)
    );

    if (lista.length === 0) {
        console.log("Nenhum estudante encontrado com esse critério.");
        return;
    }

    console.log(`\nResultados encontrados: ${lista.length}`);
    lista.forEach(e => {
        const media = calcularMedia(e.notas);
        const necessitaAcompanhamento = verificarAcompanhamento(e.historicoFrequencia);
        const alerta = necessitaAcompanhamento ? " [ALERTA: ACOMPANHAMENTO PEDAGÓGICO]" : "";
        
        console.log(`Matrícula: ${e.matricula} | Nome: ${e.nome} | Turma: ${e.turma} | Curso: ${e.curso} | Média: ${media.toFixed(2)}${alerta}`);
    });
}

function editarEstudante() {
    console.log("\n--- Editar Cadastro ---");
    const matricula = prompt("Matrícula do estudante: ");
    const e = estudantes.find(item => item.matricula === matricula);

    if (!e) {
        console.log("Estudante não encontrado.");
        return;
    }

    const novoNome = prompt(`Nome (${e.nome}): `);
    const novaTurma = prompt(`Turma (${e.turma}): `).toUpperCase();
    const novoCurso = prompt(`Curso (${e.curso}): `);

    if (novoNome) e.nome = novoNome;
    if (novaTurma) e.turma = novaTurma;
    if (novoCurso) e.curso = novoCurso;

    salvarDados();
    console.log("Cadastro atualizado com sucesso!");
}

function excluirEstudante() {
    console.log("\n--- Excluir Cadastro ---");
    const matricula = prompt("Matrícula do estudante: ");
    const index = estudantes.findIndex(item => item.matricula === matricula);

    if (index === -1) {
        console.log("Estudante não encontrado.");
        return;
    }

    estudantes.splice(index, 1);
    salvarDados();
    console.log("Estudante removido com sucesso!");
}

function registrarNotas() {
    console.log("\n--- Registrar Notas ---");
    const matricula = prompt("Matrícula do estudante: ");
    const e = estudantes.find(item => item.matricula === matricula);

    if (!e) {
        console.log("Estudante não encontrado.");
        return;
    }

    const n1 = parseFloat(prompt("Nota 1: "));
    const n2 = parseFloat(prompt("Nota 2: "));
    const n3 = parseFloat(prompt("Nota 3: "));

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
        console.log("Erro: Informe notas válidas.");
        return;
    }

    e.notas = [n1, n2, n3];
    salvarDados();
    console.log(`Notas registradas. Nova média: ${calcularMedia(e.notas).toFixed(2)}`);
}

function registrarFalta() {
    console.log("\n--- Registrar Frequência ---");
    const matricula = prompt("Matrícula do estudante: ");
    const e = estudantes.find(item => item.matricula === matricula);

    if (!e) {
        console.log("Estudante não encontrado.");
        return;
    }

    const data = prompt("Data (DD/MM/AAAA): ");
    console.log("Status: [P] Presença | [F] Falta não justificada | [FJ] Falta Justificada");
    const status = prompt("Opção: ").toUpperCase();

    if (!['P', 'F', 'FJ'].includes(status)) {
        console.log("Erro: Opção de frequência inválida.");
        return;
    }

    e.historicoFrequencia.push({ data, status });
    salvarDados();
    console.log("Frequência registrada!");

    if (verificarAcompanhamento(e.historicoFrequencia)) {
        console.log(`\n!!! ALERTA DE ACOMPANHAMENTO !!!\nO aluno ${e.nome} atingiu mais de 3 faltas não justificadas consecutivas.`);
    }
}

function exibirPainelIndicadores() {
    console.log("\n=============================================");
    console.log("          PAINEL DE INDICADORES              ");
    console.log("=============================================");

    if (estudantes.length === 0) {
        console.log("Sem dados para gerar indicadores.");
        return;
    }

    const total = estudantes.length;
    let somaMedias = 0;
    let emAcompanhamento = 0;
    let aprovados = 0;

    estudantes.forEach(e => {
        const media = calcularMedia(e.notas);
        somaMedias += media;
        if (media >= 7.0) aprovados++;
        if (verificarAcompanhamento(e.historicoFrequencia)) emAcompanhamento++;
    });

    const mediaGeral = somaMedias / total;
    const taxaAprovacao = (aprovados / total) * 100;

    console.log(`Total de Estudantes: ${total}`);
    console.log(`Média Geral da Instituição: ${mediaGeral.toFixed(2)}`);
    console.log(`Taxa de Aprovados: ${taxaAprovacao.toFixed(1)}%`);
    console.log(`Estudantes em Acompanhamento Pedagógico: ${emAcompanhamento}`);
}

function gerarRelatorioFormatado() {
    console.log("\n===================================================================");
    console.log("                 RELATÓRIO INTEGRADO DE GESTÃO ESCOLAR             ");
    console.log("===================================================================");
    
    if (estudantes.length === 0) {
        console.log("Nenhum dado disponível.");
        return;
    }

    estudantes.forEach(e => {
        const media = calcularMedia(e.notas);
        const totalRegistros = e.historicoFrequencia.length;
        const faltas = e.historicoFrequencia.filter(f => f.status === 'F').length;
        const alerta = verificarAcompanhamento(e.historicoFrequencia) ? "SIM" : "NÃO";

        console.log(`\n[Matrícula: ${e.matricula}] ${e.nome}`);
        console.log(`Turma: ${e.turma} | Curso: ${e.curso}`);
        console.log(`Notas: ${e.notas.join(', ') || 'N/A'} | Média: ${media.toFixed(2)}`);
        console.log(`Total Aulas Registradas: ${totalRegistros} | Faltas: ${faltas} | Acompanhamento: ${alerta}`);
        console.log("-".repeat(67));
    });
}

function menuNavegacao() {
    carregarDados();

    while (true) {
        console.log("\n=== SISTEMA INTEGRADO DE GESTÃO ESCOLAR ===");
        console.log("1. Cadastrar Estudante");
        console.log("2. Consultar / Pesquisar / Filtrar");
        console.log("3. Editar Cadastro");
        console.log("4. Excluir Cadastro");
        console.log("5. Lançar Notas");
        console.log("6. Lançar Frequência");
        console.log("7. Painel de Indicadores");
        console.log("8. Gerar Relatório de Impressão");
        console.log("9. Sair");

        const opcao = prompt("Escolha uma opção: ");

        if (opcao === '1') cadastrarEstudante();
        else if (opcao === '2') listarEstudantes();
        else if (opcao === '3') editarEstudante();
        else if (opcao === '4') excluirEstudante();
        else if (opcao === '5') registrarNotas();
        else if (opcao === '6') registrarFalta();
        else if (opcao === '7') exibirPainelIndicadores();
        else if (opcao === '8') gerarRelatorioFormatado();
        else if (opcao === '9') break;
        else console.log("Opção inválida!");
    }
}

menuNavegacao();