const prompt = require('prompt-sync')();
let media = 7;
let nota1 = parseFloat(prompt('digite a nota: '))
let nota2 = parseFloat(prompt('digite a nota: '))
let nota3 = parseFloat(prompt('digite a nota: '))
let nota4 = parseFloat(prompt('digite a nota: '))
let media_aluno = (nota1+nota2+nota3+nota4)/4

if(media_aluno >= 7){
    console.log('aprovado')
}else if(media_aluno >= 5){
    console.log('recuperação')
}else{
    console.log('reprovado')
}