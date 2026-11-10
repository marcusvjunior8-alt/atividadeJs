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

function pesquisarPorNome() {
    console.log("\n--- Pesquisa por Nome ---");
    const termo = prompt("Digite o nome exato do aluno: ").toLowerCase();
    
    const aluno = alunos.find(a => a.nome.toLowerCase() === termo);

    if (aluno) {
        console.log("1 resultado encontrado:");
        console.log(`Matrícula: ${aluno.matricula} | Nome: ${aluno.nome} | Curso: ${aluno.curso}`);
    } else {
        console.log("Nenhum registro corresponde à pesquisa.");
    }
}

function filtrarPorCurso() {
    console.log("\n--- Filtro por Curso ---");
    const termo = prompt("Digite o nome do curso: ").toLowerCase();
    
    const resultados = alunos.filter(a => a.curso.toLowerCase() === termo);

    if (resultados.length > 0) {
        console.log(`${resultados.length} resultado(s) encontrado(s):`);
        resultados.forEach(aluno => {
            console.log(`Matrícula: ${aluno.matricula} | Nome: ${aluno.nome} | Curso: ${aluno.curso}`);
        });
    } else {
        console.log("Nenhum registro corresponde à pesquisa.");
    }
}

function iniciarSistema() {
    while (true) {
        console.log("\n=== Sistema de Gestão de Alunos ===");
        console.log("1. Cadastrar novo aluno");
        console.log("2. Listar alunos cadastrados");
        console.log("3. Pesquisar aluno por nome");
        console.log("4. Filtrar alunos por curso");
        console.log("5. Sair");
        
        const opcao = prompt("Escolha uma opção: ");

        if (opcao === '1') {
            cadastrarAluno();
        } else if (opcao === '2') {
            listarAlunos();
        } else if (opcao === '3') {
            pesquisarPorNome();
        } else if (opcao === '4') {
            filtrarPorCurso();
        } else if (opcao === '5') {
            console.log("Encerrando o sistema...");
            break;
        } else {
            console.log("Opção inválida! Digite uma opção de 1 a 5.");
        }
    }
}

iniciarSistema();