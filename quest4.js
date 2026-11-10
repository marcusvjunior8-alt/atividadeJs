const prompt = require('prompt-sync')();

const alunos = [];

function cadastrarAluno() {
    console.log("\n--- Cadastro de Aluno ---");
    const matricula = prompt("Matrícula: ");

    const matriculaExiste = alunos.some(aluno => aluno.matricula === matricula);
    if (matriculaExiste) {
        console.log("Erro: Esta matrícula já está cadastrada no sistema.");
        return;
    }

    const nome = prompt("Nome: ");
    const idade = parseInt(prompt("Idade: "));
    const curso = prompt("Curso: ");

    alunos.push({
        matricula: matricula,
        nome: nome,
        idade: idade,
        curso: curso
    });

    console.log("Aluno cadastrado com sucesso!");
}

function listarAlunos() {
    console.log("\n--- Lista de Alunos ---");
    console.log(`Total de alunos: ${alunos.length}\n`);

    if (alunos.length === 0) {
        console.log("Nenhum aluno cadastrado ainda.");
        return;
    }

    alunos.forEach((aluno, index) => {
        console.log(`${index + 1}. Matrícula: ${aluno.matricula} | Nome: ${aluno.nome} | Idade: ${aluno.idade} | Curso: ${aluno.curso}`);
    });
}

function iniciarSistema() {
    while (true) {
        console.log("\n=== Sistema de Gestão de Alunos ===");
        console.log("1. Cadastrar novo aluno");
        console.log("2. Listar alunos cadastrados");
        console.log("3. Sair");
        
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === '1') {
            cadastrarAluno();
        } else if (opcao === '2') {
            listarAlunos();
        } else if (opcao === '3') {
            console.log("Encerrando o sistema...");
            break;
        } else {
            console.log("Opção inválida! Digite 1, 2 ou 3.");
        }
    }
}

iniciarSistema();