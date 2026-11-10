const prompt = require('prompt-sync')();
const fs = require('fs');

const ARQUIVO = 'dashboard_escolar.json';
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

function cadastrarEstudante() {
    console.log("\n--- Cadastrar Estudante ---");
    const matricula = prompt("Matrícula: ");

    if (estudantes.some(e => e.matricula === matricula)) {
        console.log("Erro: Matrícula já cadastrada.");
        return;
    }

    const nome = prompt("Nome: ");
    const turma = prompt("Turma (ex: 1A, 2B): ").toUpperCase();
    
    const nota1 = parseFloat(prompt("Nota 1: "));
    const nota2 = parseFloat(prompt("Nota 2: "));
    const nota3 = parseFloat(prompt("Nota 3: "));

    const presencas = parseInt(prompt("Aulas presentes: "));
    const totalAulas = parseInt(prompt("Total de aulas ministradas: "));

    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(presencas) || isNaN(totalAulas) || totalAulas <= 0) {
        console.log("Erro: Dados numéricos inválidos.");
        return;
    }

    estudantes.push({
        matricula,
        nome,
        turma,
        notas: [nota1, nota2, nota3],
        presencas,
        totalAulas
    });

    salvarDados();
    console.log("Estudante cadastrado com sucesso!");
    exibirDashboard();
}

function calcularStatus(media) {
    if (media >= 7.0) return 'Aprovado';
    if (media >= 5.0) return 'Recuperação';
    return 'Reprovado';
}

function desenharBarra(porcentagem) {
    const tamanhoMaximo = 20;
    const blocosPreenchidos = Math.round((porcentagem / 100) * tamanhoMaximo);
    const barra = '█'.repeat(blocosPreenchidos) + '░'.repeat(tamanhoMaximo - blocosPreenchidos);
    return `[${barra}] ${porcentagem.toFixed(1)}%`;
}

function exibirDashboard() {
    console.log("\n=============================================");
    console.log("       DASHBOARD DE INDICADORES ESCOLARES     ");
    console.log("=============================================");

    if (estudantes.length === 0) {
        console.log("Nenhum dado cadastrado.");
        return;
    }

    const filtroTurma = prompt("Filtrar por turma (deixe em branco para TODAS): ").toUpperCase();

    let dadosFiltrados = estudantes;
    if (filtroTurma) {
        dadosFiltrados = estudantes.filter(e => e.turma === filtroTurma);
    }

    if (dadosFiltrados.length === 0) {
        console.log(`Nenhum registro encontrado para a turma ${filtroTurma}.`);
        return;
    }

    const resumoEstudantes = dadosFiltrados.map(e => {
        const somaNotas = e.notas.reduce((acc, n) => acc + n, 0);
        const media = somaNotas / e.notas.length;
        const freqPercentual = (e.presencas / e.totalAulas) * 100;
        const status = calcularStatus(media);

        return {
            ...e,
            media,
            freqPercentual,
            status
        };
    });

    const somaDasMedias = resumoEstudantes.reduce((acc, e) => acc + e.media, 0);
    const mediaGeralTurma = somaDasMedias / resumoEstudantes.length;

    const somaFrequencias = resumoEstudantes.reduce((acc, e) => acc + e.freqPercentual, 0);
    const mediaFrequenciaTurma = somaFrequencias / resumoEstudantes.length;

    const aprovados = resumoEstudantes.filter(e => e.status === 'Aprovado').length;
    const recuperacao = resumoEstudantes.filter(e => e.status === 'Recuperação').length;
    const reprovados = resumoEstudantes.filter(e => e.status === 'Reprovado').length;

    const total = resumoEstudantes.length;
    const pctAprovados = (aprovados / total) * 100;
    const pctRecuperacao = (recuperacao / total) * 100;
    const pctReprovados = (reprovados / total) * 100;

    console.log(`\nTurma: ${filtroTurma || 'TODAS'} | Total de Alunos: ${total}`);
    console.log(`Média Geral de Desempenho: ${mediaGeralTurma.toFixed(2)}`);
    console.log(`Frequência Média Geral: ${mediaFrequenciaTurma.toFixed(1)}%`);

    console.log("\n--- GRÁFICOS DE DESEMPENHO (PERCENTUAIS) ---");
    console.log(`Aprovados:    ${desenharBarra(pctAprovados)} (${aprovados})`);
    console.log(`Recuperação:  ${desenharBarra(pctRecuperacao)} (${recuperacao})`);
    console.log(`Reprovados:   ${desenharBarra(pctReprovados)} (${reprovados})`);

    console.log("\n--- DETALHAMENTO DOS ESTUDANTES ---");
    resumoEstudantes.forEach(e => {
        console.log(`Nome: ${e.nome} | Turma: ${e.turma} | Média: ${e.media.toFixed(2)} | Freq: ${e.freqPercentual.toFixed(1)}% | Status: ${e.status}`);
    });
}

function iniciarSistema() {
    carregarDados();

    while (true) {
        console.log("\n=== Menu Principal ===");
        console.log("1. Cadastrar Estudante e Notas");
        console.log("2. Visualizar Dashboard / Indicadores");
        console.log("3. Sair");

        const opcao = prompt("Escolha uma opção: ");

        if (opcao === '1') {
            cadastrarEstudante();
        } else if (opcao === '2') {
            exibirDashboard();
        } else if (opcao === '3') {
            break;
        } else {
            console.log("Opção inválida!");
        }
    }
}

iniciarSistema();