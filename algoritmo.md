Inicio Algoritmo

    // VARIÁVEIS
    numQ = número de questões
    indQ = questão atual = 0
    signal = falso

    FUNÇÃO reiniciarQuiz()
        indQ = 0;
        escreverQuestão()
        indQ++
    
    FUNÇÃO finalizarQuiz()
        Titulo = "QUIZ DOS VALORES DA GTI"
        apresentar(pontos%);
        btn.Titulo = "Refazer quiz"

    FUNÇÃO escreverQuestão()
        Titulo = questão[indQ].titulo
        form = questões

    FUNÇÃO next()
        SE (!signal)
            signal = verdadeiro
            escreverQuestão()
            btn.titulo = "Próxima"
            indQ++
        SENÃO
            SE (indQ <= (numQ - 1))
                escreverQuestão()
                indQ++
            SENÃO  
                SE (indQ = (numQ))
                    finalizarQuiz()
                    indQ++              
                SENÃO
                    reiniciarQuiz()
            

Fim Algoritmo
