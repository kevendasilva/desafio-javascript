// Variáveis 
let requestURL = 'https://quiz-trainee.herokuapp.com/questions'; // Link para perguntas/respostas
let answer; // Resposta
let request = new XMLHttpRequest(); // Instanciando um novo objeto XHR
let signal = false; // Sinalizador
let numQ; // Num de questões
let indQ = 0; // Indice
let titulo = document.getElementById('titulo'); // Titulo
let btnConfirmar = document.getElementById('confirmar'); // Botão Next
let divResultado = document.getElementById('resultado'); // Resultado
let listaRespostas = document.getElementById('listaRespostas'); // Lista de respostas

// Funções
request.onload = function(){ // Aguardando a Resposta
    answer = request.response;
    numQ = answer.length;
}

function escreverQuestao(){ // escreverQuestao
    console.log("Questão escrita com sucesso");
}

function finalizarQuiz(){ // finalizarQuiz
    btnConfirmar.textContent = "Refazer quiz";
    console.log("Quiz finalizado");
}

function reiniciarQuiz(){ // reiniciarQuiz
    console.log("Quiz reiniciado");
    btnConfirmar.textContent = "Próxima";
    indQ = 0;
    escreverQuestao();
    indQ++;
}

function geraOpcoes(){ // geraOpcoes
    
}

function mostrarQuestao(){ // mostrarQuestao
    if (!signal){
        signal = true;
        escreverQuestao();
        btnConfirmar.textContent = "Próxima";
        indQ++;
    } else {
        if (indQ <= (numQ - 1)){
            escreverQuestao();
            indQ++;
        } else {
            if (indQ === numQ){
                finalizarQuiz();
                indQ++;
            } else {
                reiniciarQuiz();
            }
        }  
    }
}

// "Main"

// Abrindo uma solicitação
request.open('GET', requestURL, true);
// Informando o tipo da estrutura de dados
request.responseType = 'json';
// Enviando o pedido 
request.send();