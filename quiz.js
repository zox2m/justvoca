let quizData = [];


function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function startQuiz() {
    // Get all keys from local storage
    const keys = Object.keys(localStorage);

    //단어장이 비었다면
    if (keys.length === 0) {
        console.log('No vocabulary data found.');
        return;
    }

    quizData = [];
    
    // Select a random key
    const randomIndex = getRandomIndex(keys.length);
    const randomKey = keys[randomIndex];

    // Get the value (meaning) for the random key
    const randomValue = localStorage.getItem(randomKey);

    // Create an array of 4 possible meanings (including the correct one)
    const meanings = [randomValue];

    while (meanings.length < 4) {
        const randomMeaning = localStorage.getItem(keys[getRandomIndex(keys.length)]);

        if (!meanings.includes(randomMeaning)) {
        meanings.push(randomMeaning);
        }
    }

    // Shuffle the meanings array
    meanings.sort(() => Math.random() - 0.5);

     // Clear previous quiz elements
     const quizContainer = document.getElementById('quizContainer');
     //quizContainer.style.color = 'black';
     quizContainer.innerHTML = '';

     // Display the quiz question
     const questionElement = document.createElement('h2');
     questionElement.textContent = randomKey;
     quizContainer.appendChild(questionElement);

     // Create and display answer options
     meanings.forEach((meaning) => {
        const optionElement = document.createElement('button');
        optionElement.textContent = meaning;
        optionElement.addEventListener('click', () => handleAnswer(optionElement, randomValue));
        quizContainer.appendChild(optionElement);
      });
    
}

function handleAnswer(optionElement, correctAnswer) {
    const quizContainer = document.getElementById('quizContainer');

    if (optionElement.textContent === correctAnswer) {
      quizContainer.textContent = 'Correct!';
      quizContainer.style.color = 'green';
    } else {
      quizContainer.textContent = 'Incorrect!';
      quizContainer.style.color = 'red';
    }
}



//다음 문제 표시 함수
function presentNextQuestion() {
    const quizContainer = document.getElementById('quizContainer');

    if (quizData.length === 0) {
      // Display all answers
      quizContainer.innerHTML = '';

      quizData.forEach((quiz) => {
        const questionElement = document.createElement('h2');
        questionElement.textContent = quiz.key;
        quizContainer.appendChild(questionElement);

        const answerElement = document.createElement('p');
        answerElement.textContent = quiz.value;
        quizContainer.appendChild(answerElement);
      });

      return;
    }

    const currentQuiz = quizData.pop();

    // Clear previous question
    quizContainer.innerHTML = '';

    // Display the quiz question
    const questionElement = document.createElement('h2');
    questionElement.textContent = currentQuiz.key;
    quizContainer.appendChild(questionElement);

    // Create and display answer options
    const optionElement = document.createElement('button');
    optionElement.textContent = 'Show Answer';
    optionElement.addEventListener('click', () => showAnswer(currentQuiz.value));
    quizContainer.appendChild(optionElement);
  }




//정답 공개 함수
function showAnswer(answer) {
const quizContainer = document.getElementById('quizContainer');

// Clear current question
quizContainer.innerHTML = '';

// Display the answer
const answerElement = document.createElement('p');
answerElement.textContent = answer;
quizContainer.appendChild(answerElement);

// Proceed to the next question
setTimeout(presentNextQuestion, 2000);
}