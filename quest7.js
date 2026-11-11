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
    let curso = prompt('Curso: ');

    estudantes.push({ matricula, nome, turma, curso, frequencia: [] });
    console.log('Estudante cadastrado!\n');
}

function registrarFrequencia() {
    let matricula = prompt('Matrícula: ');
    let estudante = estudantes.find(e => e.matricula === matricula);

    if (!estudante) {
        console.log('Erro: Estudante não encontrado!\n');
        return;
    }

    let data = prompt('Data (DD/MM/AAAA): ');
    let status = prompt('Status (P-Presença | F-Falta | FJ-Falta Justificada): ').toUpperCase();

    if (status !== 'P' && status !== 'F' && status !== 'FJ') {
        console.log('Erro: Status inválido!\n');
        return;
    }

    estudante.frequencia.push({ data, status });
    console.log('Frequência registrada!\n');
}

function relatorio() {
    console.log('\n--- Relatório de Frequência ---');
    
    estudantes.forEach(e => {
        let p = 0, f = 0, fj = 0;
        let consecutivas = 0;
        let alerta = '';

        e.frequencia.forEach(reg => {
            if (reg.status === 'P') {
                p++;
                consecutivas = 0;
            } else if (reg.status === 'FJ') {
                fj++;
                consecutivas = 0;
            } else if (reg.status === 'F') {
                f++;
                consecutivas++;
                if (consecutivas > 3) {
                    alerta = ' [ALERTA: Mais de 3 faltas consecutivas!]';
                }
            }
        });

        console.log(`\nMatrícula: ${e.matricula} | Aluno: ${e.nome}${alerta}`);
        console.log(`Presenças: ${p} | Faltas: ${f} | Justificadas: ${fj}`);
        
        e.frequencia.forEach(reg => {
            console.log(` - ${reg.data}: ${reg.status}`);
        });
    });
    console.log('');
}

while (true) {
    let opcao = prompt('1-Cadastrar | 2-Registrar Frequência | 3-Relatório | 4-Sair : ');
    
    if (opcao === '1') {
        cadastrar();
    } else if (opcao === '2') {
        registrarFrequencia();
    } else if (opcao === '3') {
        relatorio();
    } else if (opcao === '4') {
        break;
    }
}