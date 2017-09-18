window.onload = function() {
//define variables
    var questionArea = document.getElementsByClassName("questions")[0];
    var answerArea = document.getElementsByClassName("answers")[0];
    var current = 0;

// Un objeto que contiene todas las preguntas + posibles respuestas.
// En la matriz -> el último dígito da la posición de respuesta correcta
    var quizContent = {
            "La pelicula más taquillera de Pixar?": ["El Rey Leon", "Los Increibles", "Frozen", 2],
            "Pelicula animada más premiada?": ["Buscando a Nemo", "El rey Leon", "UP", 1],
            "La pelicula ganadora del Oscara  mejor animacion 2004?": ["Enredados", "Los Increibles", "Toy Story", 1],
            "Largometraje con mas nominaciones al oscar?": ["Wall-E", "Monster Inc","Dory", 0],
            "Record al debút más grande para un pelicula animada?": ["Bichos", "Bolt","Ratatouille",2],
        };

function loadImg(curr) {
    //variable que contiene la direccion de las imagenes
    var imgCont = ["assets/img/fondo.png","assets/img/sou.png","assets/img/pumba.png","assets/img/in.png","assets/img/fro.png"];
    var imgArea =document.getElementsByClassName("img-questions")[0];
    var questionimg = imgCont[curr];
        imgArea.setAttribute('src',questionimg);
}

function loadQuestion(curr) {;
    var question = Object.keys(quizContent)[curr];
    //eliminar todo en el área de preguntas
        questionArea.innerHTML = "";
    //agregar todas las respuestas posibles el área de respuesta
        questionArea.innerHTML = question;
}

function loadAnswers(curr) {
    // esto carga todas las respuestas posibles de la pregunta dada
    // debe agarrar la matriz de respuesta necesaria con la ayuda de la var actual
    // las respuestas se añadirán con una función onclick
    // agarrar las respuestas
    var answers = quizContent[Object.keys(quizContent)[curr]];
        //vacía el campo de respuesta
    answerArea.innerHTML = "";
        //agregar todas las respuestas posibles el área de respuesta
    for ( i = 0; i < answers.length - 1; i += 1) {
        var createDiv = document.createElement("div");
            createDiv.setAttribute('class','col-lg-4 col-sm-4 col-xs-12');
        var createBtn = document.createElement("button");
            createBtn.setAttribute('class','btn btn-huge');
        var createSpanA = document.createElement("span");
            createSpanA.setAttribute('class','letter');
        var createSpanB = document.createElement("span");
            createSpanB.setAttribute('class','letter');
        var createSpanC = document.createElement("span");
            createSpanC.setAttribute('class','letter');
        var text = document.createTextNode(answers[i])
            createBtn.appendChild(text);
            createDiv.appendChild(createBtn);
            //esto añade la función onclick en la respuesta, ejecutando una función para verificar la corrección
            createDiv.addEventListener("click", checkAnswer(i, answers));
            answerArea.appendChild(createDiv);
    }
}

function checkAnswer(i, arr) {
    // esta es la función que se ejecutará cuando se haga clic en una de las respuestas
    // compruebe si la respuesta dada es la misma que la respuesta correcta
    // después de esto, compruebe si es la última pregunta del cuestionario
    // si es la última pregunta, vacía la zona de respuesta y deja que el usuario sepa que terminó
    return function() {
        var userAnswer = i;
        var correctAnswer = arr[arr.length - 1];
        if (userAnswer === correctAnswer) {
            addChecker(true)
        } else {
            addChecker(false)
        }
        if (current < Object.keys(quizContent).length - 1) {
            current += 1
            loadImg(current);
            loadQuestion(current);
            loadAnswers(current);
        } else {
            questionArea.innerHTML = "Terminaste!!!"
            answerArea.innerHTML = ""
        }
    }
}

function addChecker(bool) {
    // agrega un elemento div a la página para ver si es verdadero / falso
    var checker = document.getElementsByClassName("checker")[0];
    var createDiv = document.createElement("div");
    var txt = document.createTextNode(current + 1);
        createDiv.appendChild(txt);
    if (bool) {
        createDiv.className += "correct"
        checker.appendChild(createDiv);
    } else {
        createDiv.className += "false"
        checker.appendChild(createDiv);
    }
}

//inicie el cuestionario enseguida
loadQuestion(current);
loadAnswers(current);
loadImg(current);
};