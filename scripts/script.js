// Variáveis 
let requestURL = 'https://quiz-trainee.herokuapp.com/questions'; // Link para perguntas/respostas
let request = new XMLHttpRequest(); // Instanciando um novo objeto XHR
let signal = false; // Sinalizador
let sigLis = false;
let numQ; // Num de questões
let answer; // Resposta
let indQ = 0; // Indice
let sumPont; // Maior pontuação possivel
let sumJog = 0; // Pontuação do jogador
let titulo = document.getElementById('titulo'); // Titulo
let btnConfirmar = document.getElementById('confirmar'); // Botão Next
let divResultado = document.getElementById('resultado'); // Resultado
let listaRespostas = document.getElementById('listaRespostas'); // Lista de respostas
let resultFinal = document.getElementById('resultado');


// Funções
request.onload = function(){ // Aguardando a Resposta
    answer = request.response;
    numQ = answer.length;
    sumPont = 3 * numQ;
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
        if ((listaRespostas.children[i].children[0].checked) === true){
            listaRespostas.children[i].children[0].checked = false;
            sumJog = (sumJog + answer[indQ - 1].options[i].value);
            console.log(sumJog);
        } else {
            listaRespostas.children[i].children[0].checked = false;
        }
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
    let perPont = 0;
    sigLis = true;
    titulo.textContent = "QUIZ DOS VALORES DA GTI";
    listaRespostas.style.display = "none";
    perPont = ((sumJog / sumPont) * 100);
    resultFinal.textContent = "Sua pontuação: " + perPont + "%";
    btnConfirmar.textContent = "Refazer quiz";
    console.log("Quiz finalizado");
}

function reiniciarQuiz(){ // reiniciarQuiz
    console.log("Quiz reiniciado");
    listaRespostas.style.display = "block";
    resultFinal.textContent = "";
    btnConfirmar.textContent = "PROXIMA";
    indQ = 0;
    sumJog = 0;
    escreverQuestao();
    indQ++;
}

function mostrarQuestao(){ // mostrarQuestao
    if (!signal){
        signal = true;
        escreverQuestao();
        listaRespostas.style.display = "block";
        btnConfirmar.textContent = "PROXIMA";
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