// Variáveis 
let requestURL = 'https://quiz-trainee.herokuapp.com/questions'; // Link para perguntas/respostas
let request = new XMLHttpRequest(); // Instanciando um novo objeto XHR
let signal = false; // Sinalizador
let sigLis = false; // Sinalizado btn
let numQ; // Num de questões
let answer; // Resposta
let indQ = 0; // Indice questão
let sumPont; // Maior pontuação possivel
let sumJog = 0; // Pontuação do jogador
let titulo = document.getElementById('titulo'); // Titulo
let btnConfirmar = document.getElementById('confirmar'); // Botão Next
let listaRespostas = document.getElementById('listaRespostas'); // Lista de respostas
let resultFinal = document.getElementById('resultado'); // Resultado

// Funções
request.onload = function () { // Aguardando a Resposta
    answer = request.response; // Atribuindo a answer, a resposta dada pelo servidor
    numQ = answer.length; // Número de questões
    sumPont = 3 * numQ;
}

function radioSelect () { // Ouvindo eventos que ocorrem com a listaRespostas.
    sigLis = true;
}

function limparSelecao () { // Limpando seleção dos inputs
    sigLis = false;
    for ( let i = 0 ; i < 4 ; i++ ) {
        if ( (listaRespostas.children[i].children[0].checked) === true ) {
            listaRespostas.children[i].children[0].checked = false;
            sumJog = ( sumJog + answer[indQ - 1].options[i].value ); // Recebendo o valor da opção escolhida pelo jogador
        } else {
            listaRespostas.children[i].children[0].checked = false;
        }
    }
}

function escreverQuestao () { // escreverQuestao
    titulo.textContent = answer[indQ].title; // Alterando o titulo
    for ( let i = 0 ; i < 4 ; i++ ) {
        // Alterando os itens das questões
        listaRespostas.children[i].children[1].textContent = answer[indQ].options[i].answer;
    }
}

function finalizarQuiz () { // finalizarQuiz
    let perPont = 0; // Porcentagem apresentada no final do quiz
    sigLis = true;
    titulo.textContent = "QUIZ DOS VALORES DA GTI"; // Titulo inicial/final
    listaRespostas.style.display = "none"; // Escondendo listaRespostas
    perPont = ( (sumJog / sumPont) * 100 ); // Calculo da porcetagem de acertos do jogador
    resultFinal.textContent = "Sua pontuação: " + perPont + "%"; // Apresentando a pontuação do jogador
    btnConfirmar.textContent = "Refazer quiz";
}

function reiniciarQuiz () { // reiniciarQuiz
    listaRespostas.style.display = "block"; 
    resultFinal.textContent = ""; // Limpando o resultado
    btnConfirmar.textContent = "PROXIMA";
    indQ = 0;
    sumJog = 0; // Zerando a pontuação do jogador
    escreverQuestao();
    indQ++;
}

function mostrarQuestao () { // mostrarQuestao
    if ( !signal ) {
        signal = true;
        escreverQuestao();
        listaRespostas.style.display = "block"; // Exibindo listaRespostas
        btnConfirmar.textContent = "PROXIMA"; // Alterando o texto do botão
        indQ++;
    } else if ( signal && sigLis ) {
        limparSelecao();
        if ( indQ <= (numQ - 1) ) {
            escreverQuestao();
            indQ++;
        } else {
            if ( indQ === numQ ) {
                finalizarQuiz();
                indQ++;
            } else {
                reiniciarQuiz();
            }
        }  
    }
}

for ( let i = 0 ; i < 4 ; i++ ) { // Quando input for selecionado, a função radioSelect será chamada
    listaRespostas.children[i].children[0].onclick = radioSelect;
}

request.open('GET', requestURL, true); // Abrindo uma solicitação
request.responseType = 'json'; // Informando o tipo da estrutura de dados
request.send(); // Enviando o pedido 