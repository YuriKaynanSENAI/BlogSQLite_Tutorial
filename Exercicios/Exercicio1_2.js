// Para usar o prompt no nodejs é preciso instalar essa lib 'prompt-sync'

let prompt = require("prompt-sync");
prompt = prompt();

//const n1 = prompt("Digite o primeiro número: ");//

// // 1.1
// const preco = parseFloat(prompt('Qual o preço do produto? '));
// const desconto = parseFloat(prompt('Qual o desconto ? '));

// function calcularDesconto(preco, desconto){
//     const novoValor = preco - (preco * desconto / 100);
//     console.log("O novo valor com o desconto é: ", novoValor);
// }

// calcularDesconto(preco, desconto);

// //1.2
// const celsius = parseFloat(prompt('Qual a temperatura em celsius? '));

// function Converter(celsius){
//     const F = (celsius * 9 / 5) + 32;
//     console.log("A temperatura em Fahrenheit é: ", F);
// }

// Converter(celsius);

// //1.3
// const P = parseFloat(prompt('Qual o seu valor inicial? '));
// const R = parseFloat(prompt('Qual a sua taxa? '));
// const T = parseFloat(prompt('A quanto a tempo? '));

// function calcularJuros(P, R, T){
//     const J = P * (R / 100) * T;
//     console.log("O juros cauculado é de: ", J);
// }

// calcularJuros(P, R, T);

// //2.1
// const number1 = parseFloat(prompt('Digite o primeiro numero: '));
// const number2 = parseFloat(prompt('Digite o segundo numero: '));

// function maiorNumero(number1, number2){
//     if (number1 > number2){
//         console.log(`O ${number1} é maior.`);
//     }else if(number1 < number2){
//         console.log(`O ${number2} é maior.`);
//     }else{
//         console.log("Ambos os números são iguais");
//     }
// }

// maiorNumero(number1, number2);

// // 2.2
// const idade = parseFloat(prompt('Qual a sua idade? '));

// function classificarIdade(idade){
//     if (idade <= 12){
//         console.log("Você é criança.")
//     }else if (idade <18){
//         console.log("Você é adolecente.")
//     }else{
//         console.log("você é adulto.")
//     }
// }

// classificarIdade(idade);

// // 2.3
// const nota = parseFloat(prompt('Qual foi a sua nota? '));

// function validarNota(nota){
//     if(nota > 10){
//         console.log(false)
//     }else if(nota < 0){
//         console.log(false)
//     }else{
//         console.log(true)
//     }
// }

// validarNota(nota);

// // 3.1
// const nota1 = parseFloat(prompt('Nota 1 do aluno: '))
// const nota2 = parseFloat(prompt('Nota 2 do aluno: '))
// const nota3 = parseFloat(prompt('Nota 3 do aluno: '))
// media = 0;
// media = (parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3)) /3;

// console.log(`A média do aluno foi ${media.toFixed(2)}.`);

// const faltas = parseFloat(prompt('Quanto você faltou? '))
// falta = 0;
// falta = faltas / 100;

// function verificarAprovacao(media, faltas){
//     if (media >= 7 && faltas < 0.25 ){
//         console.log("Aprovado!")
//     }else{
//         console.log("Reprovado!")
//     }
// }

// verificarAprovacao(media, faltas);

// // 3.2

// const valor = prompt("Digite um numero: ");
// const min = prompt("Digite um vamor minimo: ");
// const max = prompt("Digite um valor maximo: ");

// function estaNoIntervalo(valor, min, max) {
//   if (valor < max && min < max) {
//     console.log(true);
//   } else {
//     console.log(false);
//   }
// }

// estaNoIntervalo(valor, min, max);

// //3.3
// const user = prompt("Digite seu usúario: ");
// const pass = prompt("Digite sua senha: ");

// function verificarLogin(user, pass) {
//   if (user === "Admin" && pass === "1234") {
//  console.log(`Bem vindo ${user}!`);
//  } else {
//    console.log("Acesso negado! corrija sua senha ou usuario!");
//  }
//}

//verificarLogin(user, pass);
