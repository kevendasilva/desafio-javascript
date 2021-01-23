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
    titulo.textContent = answer[indQ].title;
    for (let i = 1 ; i < 8 ; i += 2){
        listaRespostas.childNodes[i].childNodes[1].textContent = answer[indQ].options[Math.floor(i / 2)].answer;
    }
    console.log("Questão escrita com sucesso");
}

function finalizarQuiz(){ // finalizarQuiz
    titulo.textContent = "QUIZ DOS VALORES DA GTI";
    btnConfirmar.textContent = "Refazer quiz";
    listaRespostas.style.display = "none";
    console.log("Quiz finalizado");
}

function reiniciarQuiz(){ // reiniciarQuiz
    console.log("Quiz reiniciado");
    btnConfirmar.textContent = "Próxima";
    listaRespostas.style.display = "block";
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
        listaRespostas.style.display = "block";
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