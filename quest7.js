const prompt = require('prompt-sync')();
const fs = require('fs');

const ARQUIVO = 'dados_frequencia.json';
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
    console.log("\n--- Cadastro de Estudante ---");
    const matricula = prompt("Matrícula: ");

    if (estudantes.some(e => e.matricula === matricula)) {
        console.log("Erro: Matrícula já cadastrada.");
        return;
    }

    const nome = prompt("Nome: ");
    const turma = prompt("Turma: ");
    const curso = prompt("Curso: ");

    estudantes.push({
        matricula,
        nome,
        turma,
        curso,
        historico: []
    });

    salvarDados();
    console.log("Estudante cadastrado com sucesso!");
}

function registrarFrequencia() {
    console.log("\n--- Registrar Frequência ---");
    const matricula = prompt("Matrícula do estudante: ");
    
    const estudante = estudantes.find(e => e.matricula === matricula);
    if (!estudante) {
        console.log("Erro: Estudante não encontrado.");
        return;
    }

    const data = prompt("Data (DD/MM/AAAA): ");
    console.log("Status: [P] Presença | [F] Falta não justificada | [FJ] Falta Justificada");
    const status = prompt("Opção: ").toUpperCase();

    if (!['P', 'F', 'FJ'].includes(status)) {
        console.log("Erro: Status inválido.");
        return;
    }

    estudante.historico.push({ data, status });
    
    estudante.historico.sort((a, b) => {
        const [diaA, mesA, anoA] = a.data.split('/');
        const [diaB, mesB, anoB] = b.data.split('/');
        return new Date(`${anoA}-${mesA}-${diaA}`) - new Date(`${anoB}-${mesB}-${diaB}`);
    });

    salvarDados();
    console.log("Registro salvo com sucesso.");
    
    verificarAlertas(estudante);
}

function verificarAlertas(estudante) {
    let faltasConsecutivas = 0;
    
    for (let registro of estudante.historico) {
        if (registro.status === 'F') {
            faltasConsecutivas++;
            if (faltasConsecutivas > 3) {
                console.log(`\n!!! ALERTA PEDAGÓGICO !!!`);
                console.log(`Estudante ${estudante.nome} (${estudante.matricula}) possui mais de 3 faltas consecutivas sem justificativa!`);
                return;
            }
        } else {
            faltasConsecutivas = 0;
        }
    }
}

function gerarRelatorio() {
    console.log("\n--- Relatório de Frequência ---");
    
    if (estudantes.length === 0) {
        console.log("Nenhum estudante cadastrado.");
        return;
    }

    estudantes.forEach(e => {
        console.log(`\nEstudante: ${e.nome} | Matrícula: ${e.matricula} | Turma: ${e.turma} | Curso: ${e.curso}`);
        
        let presencas = 0;
        let faltas = 0;
        let justificadas = 0;

        e.historico.forEach(reg => {
            console.log(`  - Data: ${reg.data} | Status: ${reg.status}`);
            if (reg.status === 'P') presencas++;
            if (reg.status === 'F') faltas++;
            if (reg.status === 'FJ') justificadas++;
        });

        console.log(`Resumo: Presenças: ${presencas} | Faltas: ${faltas} | Justificadas: ${justificadas}`);
        
        verificarAlertas(e);
    });
}

function iniciarSistema() {
    carregarDados();
    
    while (true) {
        console.log("\n=== Sistema de Monitoramento Escolar ===");
        console.log("1. Cadastrar Estudante");
        console.log("2. Registrar Frequência");
        console.log("3. Emitir Relatório e Alertas");
        console.log("4. Sair");
        
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === '1') {
            cadastrarEstudante();
        } else if (opcao === '2') {
            registrarFrequencia();
        } else if (opcao === '3') {
            gerarRelatorio();
        } else if (opcao === '4') {
            break;
        } else {
            console.log("Opção inválida!");
        }
    }
}

iniciarSistema();