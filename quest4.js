const prompt = require('prompt-sync')();

let alunos = [];

function cadastrar() {
    let matricula = prompt('Matrícula: ');

    if (alunos.find(aluno => aluno.matricula === matricula)) {
        console.log('Erro: Matrícula já existe!');
        return;
    }

    let nome = prompt('Nome: ');
    let idade = prompt('Idade: ');
    let curso = prompt('Curso: ');

    alunos.push({ nome, idade, curso, matricula });
    console.log('Aluno cadastrado!\n');
}

function listar() {
    console.log(`\nTotal de alunos cadastrados: ${alunos.length}`);
    
    alunos.forEach(aluno => {
        console.log(`Matrícula: ${aluno.matricula} | Nome: ${aluno.nome} | Idade: ${aluno.idade} | Curso: ${aluno.curso}`);
    });
    console.log('');
}

while (true) {
    let opcao = prompt('1-Cadastrar | 2-Listar | 3-Sair : ');
    
    if (opcao === '1') {
        cadastrar();
    } else if (opcao === '2') {
        listar();
    } else if (opcao === '3') {
        break;
    }
}