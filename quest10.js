const prompt = require('prompt-sync')();

let estudantes = [];

function cadastrar() {
    let matricula = prompt('Matrícula: ');

    if (estudantes.find(e => e.matricula === matricula)) {
        console.log('Erro: Matrícula já existe!\n');
        return;
    }

    let nome = prompt('Nome: ');
    let turma = prompt('Turma: ');

    estudantes.push({ matricula, nome, turma, notas: [], frequencia: [] });
    console.log('Estudante cadastrado!\n');
}

function consultar() {
    let busca = prompt('Buscar por nome ou turma (deixe vazio para todos): ').toLowerCase();
    let resultados = estudantes.filter(e => e.nome.toLowerCase().includes(busca) || e.turma.toLowerCase().includes(busca));
    
    if (resultados.length === 0) {
        console.log('Nenhum estudante encontrado.\n');
        return;
    }

    console.log('');
    resultados.forEach(e => {
        let media = e.notas.length > 0 ? (e.notas.reduce((a, b) => a + b, 0) / e.notas.length).toFixed(2) : 'N/A';
        console.log(`Matrícula: ${e.matricula} | Nome: ${e.nome} | Turma: ${e.turma} | Média: ${media}`);
    });
    console.log('');
}

function editar() {
    let matricula = prompt('Matrícula do estudante: ');
    let estudante = estudantes.find(e => e.matricula === matricula);
    
    if (!estudante) {
        console.log('Erro: Estudante não encontrado!\n');
        return;
    }

    let nome = prompt(`Novo Nome (${estudante.nome}): `);
    let turma = prompt(`Nova Turma (${estudante.turma}): `);

    if (nome) estudante.nome = nome;
    if (turma) estudante.turma = turma;

    console.log('Cadastro atualizado!\n');
}

function excluir() {
    let matricula = prompt('Matrícula do estudante: ');
    let index = estudantes.findIndex(e => e.matricula === matricula);
    
    if (index === -1) {
        console.log('Erro: Estudante não encontrado!\n');
        return;
    }

    estudantes.splice(index, 1);
    console.log('Estudante excluído!\n');
}

function lancarNotas() {
    let matricula = prompt('Matrícula do estudante: ');
    let estudante = estudantes.find(e => e.matricula === matricula);
    
    if (!estudante) {
        console.log('Erro: Estudante não encontrado!\n');
        return;
    }

    let n1 = parseFloat(prompt('Nota 1: '));
    let n2 = parseFloat(prompt('Nota 2: '));
    let n3 = parseFloat(prompt('Nota 3: '));

    estudante.notas = [n1, n2, n3];
    console.log('Notas registradas!\n');
}

function lancarFrequencia() {
    let matricula = prompt('Matrícula do estudante: ');
    let estudante = estudantes.find(e => e.matricula === matricula);
    
    if (!estudante) {
        console.log('Erro: Estudante não encontrado!\n');
        return;
    }

    let status = prompt('Status (P-Presença | F-Falta | FJ-Falta Justificada): ').toUpperCase();
    estudante.frequencia.push(status);
    console.log('Frequência registrada!\n');
}

function dashboard() {
    console.log('\n--- Dashboard Escolar ---');
    if (estudantes.length === 0) {
        console.log('Nenhum dado cadastrado.\n');
        return;
    }

    let total = estudantes.length;
    let somaGeral = 0;
    let alunosComNotas = 0;
    let alertas = 0;

    estudantes.forEach(e => {
        if (e.notas.length > 0) {
            let media = e.notas.reduce((a, b) => a + b, 0) / e.notas.length;
            somaGeral += media;
            alunosComNotas++;
        }

        let faltasConsecutivas = 0;
        for (let f of e.frequencia) {
            if (f === 'F') {
                faltasConsecutivas++;
                if (faltasConsecutivas > 3) {
                    alertas++;
                    break;
                }
            } else {
                faltasConsecutivas = 0;
            }
        }
    });

    let mediaGeral = alunosComNotas > 0 ? (somaGeral / alunosComNotas).toFixed(2) : 'N/A';

    console.log(`Total de Estudantes: ${total}`);
    console.log(`Média Geral da Escola: ${mediaGeral}`);
    console.log(`Estudantes em Alerta Pedagógico (Faltas): ${alertas}\n`);
}

while (true) {
    console.log('1-Cadastrar | 2-Consultar | 3-Editar | 4-Excluir');
    let opcao = prompt('5-Notas | 6-Frequência | 7-Dashboard | 8-Sair : ');
    
    if (opcao === '1') {
        cadastrar();
    } else if (opcao === '2') {
        consultar();
    } else if (opcao === '3') {
        editar();
    } else if (opcao === '4') {
        excluir();
    } else if (opcao === '5') {
        lancarNotas();
    } else if (opcao === '6') {
        lancarFrequencia();
    } else if (opcao === '7') {
        dashboard();
    } else if (opcao === '8') {
        break;
    }
}