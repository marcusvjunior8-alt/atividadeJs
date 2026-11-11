const prompt = require('prompt-sync')();

let estudantes = [];

function cadastrar() {
    let matricula = prompt('Matrícula: ');
    let nome = prompt('Nome: ');
    let turma = prompt('Turma: ');
    
    let n1 = parseFloat(prompt('Nota 1: '));
    let n2 = parseFloat(prompt('Nota 2: '));
    let n3 = parseFloat(prompt('Nota 3: '));
    
    let presencas = parseInt(prompt('Presenças: '));
    let aulas = parseInt(prompt('Total de aulas: '));

    estudantes.push({
        matricula, nome, turma, 
        notas: [n1, n2, n3], 
        presencas, aulas
    });
    console.log('Aluno cadastrado com sucesso!\n');
}

function dashboard() {
    let filtroTurma = prompt('Filtrar por turma (deixe vazio para ver todas): ');
    
    let lista = filtroTurma ? estudantes.filter(e => e.turma === filtroTurma) : estudantes;

    if (lista.length === 0) {
        console.log('Nenhum registo encontrado.\n');
        return;
    }

    let estatisticas = lista.map(e => {
        let somaNotas = e.notas.reduce((acumulador, nota) => acumulador + nota, 0);
        let media = somaNotas / e.notas.length;
        let freq = (e.presencas / e.aulas) * 100;
        
        let status = media >= 7 ? 'Aprovado' : (media >= 5 ? 'Recuperação' : 'Reprovado');
        
        return { media, freq, status };
    });

    let somaGeral = estatisticas.reduce((acc, e) => acc + e.media, 0);
    let mediaGeral = somaGeral / estatisticas.length;

    let total = estatisticas.length;
    let aprovados = estatisticas.filter(e => e.status === 'Aprovado').length;
    let rec = estatisticas.filter(e => e.status === 'Recuperação').length;
    let reprovados = estatisticas.filter(e => e.status === 'Reprovado').length;

    console.log(`\n--- Dashboard (${filtroTurma || 'Geral'}) ---`);
    console.log(`Total de Estudantes: ${total}`);
    console.log(`Média Geral: ${mediaGeral.toFixed(2)}`);
    console.log(`Aprovados: ${aprovados} (${((aprovados/total)*100).toFixed(1)}%)`);
    console.log(`Em Recuperação: ${rec} (${((rec/total)*100).toFixed(1)}%)`);
    console.log(`Reprovados: ${reprovados} (${((reprovados/total)*100).toFixed(1)}%)\n`);
}

while (true) {
    let opcao = prompt('1-Cadastrar | 2-Dashboard | 3-Sair : ');
    
    if (opcao === '1') {
        cadastrar();
    } else if (opcao === '2') {
        dashboard();
    } else if (opcao === '3') {
        break;
    }
}