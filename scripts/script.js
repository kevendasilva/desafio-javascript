// Variáveis 
let requestURL = 'https://quiz-trainee.herokuapp.com/questions'; // Link para perguntas/respostas
let answer; // Resposta
let request = new XMLHttpRequest(); // Instanciando um novo objeto XHR
let signal = false; // Sinalizador
let sigLis = false;
let numQ; // Num de questões
let indQ = 0; // Indice
let titulo = document.getElementById('titulo'); // Titulo
let btnConfirmar = document.getElementById('confirmar'); // Botão Next
let divResultado = document.getElementById('resultado'); // Resultado
let listaRespostas = document.getElementById('listaRespostas'); // Lista de respostas
let inputL = listaRespostas.children;


// Funções
request.onload = function(){ // Aguardando a Resposta
    answer = request.response;
    numQ = answer.length;
}

// Ouvindo eventos que ocorrem com a listaRespostas.
function radioSelect(){
    sigLis = true;
    console.log("Para de clicar, pfv!");
}
for (let i = 0 ; i < 4 ; i++){
    listaRespostas.children[i].children[0].onclick = radioSelect;
}

function limparSelecao(){ // Limpando seleção dos inputs
    sigLis = false;
    for (let i = 0 ; i < 4 ; i++){
        listaRespostas.children[i].children[0].checked = false;
    }
}

function escreverQuestao(){ // escreverQuestao
    titulo.textContent = answer[indQ].title;
    for (let i = 0 ; i < 4 ; i++){
        listaRespostas.children[i].children[1].textContent = answer[indQ].options[i].answer;
    }
    console.log("Questão escrita com sucesso");
}

function finalizarQuiz(){ // finalizarQuiz
    sigLis = true;
    titulo.textContent = "QUIZ DOS VALORES DA GTI";
    listaRespostas.style.display = "none";
    btnConfirmar.textContent = "Refazer quiz";
    console.log("Quiz finalizado");
}

function reiniciarQuiz(){ // reiniciarQuiz
    console.log("Quiz reiniciado");
    listaRespostas.style.display = "block";
    btnConfirmar.textContent = "Próxima";
    indQ = 0;
    escreverQuestao();
    indQ++;
}

function mostrarQuestao(){ // mostrarQuestao
    if (!signal){
        signal = true;
        escreverQuestao();
        listaRespostas.style.display = "block";
        btnConfirmar.textContent = "Próxima";
        indQ++;
    } else if (signal && sigLis) {
        limparSelecao();
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