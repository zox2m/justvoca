let quizData = [];


function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

function startQuiz() {
    const keys = Object.keys(localStorage);

    if (keys.length === 0) {
      console.log('No vocabulary data found.');
      return;
    }

    quizData = [];

    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      quizData.push({ key, value });
    });

    shuffleArray(quizData);
    presentNextQuestion();
    
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
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