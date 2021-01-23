// Variáveis 

// Link para perguntas/respostas
let requestURL = 'https://quiz-trainee.herokuapp.com/questions';
// Resposta
let answer;
// Instanciando um novo objeto XHR
let request = new XMLHttpRequest();
// Sinalizador
let signal = false;
// Num de questões
let numQ;
// Indice
let indQ = 0;

// Funções

// Aguardando a Resposta
request.onload = function(){
    answer = request.response;
    numQ = answer.length;
}
// Teste
function next(){
    if (!signal){
        console.log('Test');
        signal = true;
    } else {
        console.log('Acabou');
    }
}



// "Main"

// Abrindo uma solicitação
request.open('GET', requestURL, true);
// Informando o tipo da estrutura de dados
request.responseType = 'json';
// Enviando o pedido 
request.send();



/*
const inputext = document.querySelector("#inputext")
const button = document.querySelector("#btn")
const ListUl = document.querySelector(".lista")

let signal = false;

button.addEventListener("click", function(){
        // Quantidade de itens na lista
        const qtde = inputext.value 
        const generator = conte(1, qtde)
                        .map(y => `<li>Item ${y}</li>` )
                        .join('')
        // Alterando conteúdo de ListUl
        ListUl.innerHTML = generator
})

function conte(inicio,fim){
    let result = []
    for(number = inicio; number <= fim; number++){
        result.push(number)
    }
    return result;
}
*/