const prompt = require('prompt-sync')();

const alunos = [];

function cadastrar(){
    let matricula = prompt('Matricula: ')

    if(alunos.find(aluno=> aluno.matricula === matricula)){
        console.log('Error: Matrícula já existe')
        return
    }
    let nome = prompt('nome:')
    let idade = prompt('idade:')
    let curso = prompt('curso:')

    alunos.push({nome,idade,curso,matricula})
    console.log('aluno cadastrado!\n')
}

function pesquisarNome(){
    let busca = prompt('buscar nome:').toLocaleLowerCase
    let resultados = alunos.find(aluno => aluno.nome.toLocaleLowerCase() === busca)

    if(resultados.legth > 0){
        console.log(`\n${resultados.length} resultado(s) encontrado(s):`)
        resultados.forEach(a => {
            console.log(`Matrícula: ${a.matricula} | Nome: ${a.nome} | Curso: ${a.curso}`)
        })
        console.log('')
    }else {
        console.log('\nNenhum registro corresponde à pesquisa.\n')
    }
}
while(true){
    let opcao = prompt('1-Cadastrar | 2-Pesquisar Nome | 3-Filtrar Curso | 4-Sair : ')
    if (opcao === '1') {
        cadastrar()
    } else if (opcao === '2') {
        pesquisarNome()
    } else if (opcao === '3') {
        filtrarCurso()
    } else if (opcao === '4') {
        break
    }
}
