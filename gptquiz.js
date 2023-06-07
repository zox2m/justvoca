
let quizData = [];
let currentQuestion = 0;
let answers = [];

function startQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    const keys = Object.keys(localStorage);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const question = randomKey;
    const correctAnswer = localStorage.getItem(randomKey);

    const options = [correctAnswer];
    const values = Object.values(localStorage);


    while (options.length < 4) {
        const randomValue = values[Math.floor(Math.random() * values.length)];
        if (!options.includes(randomValue)) {
            options.push(randomValue);
        }
    }
    options.sort(() => Math.random() - 0.5);
    
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

function presentNextQuestion() {
const quizContainer = document.getElementById('quizContainer');

if (currentQuestion === quizData.length) {
    // Display results
    displayResults();
    return;
}

const currentQuiz = quizData[currentQuestion];

// Clear previous question
quizContainer.innerHTML = '';

// Display the quiz question
const questionElement = document.createElement('h2');
questionElement.classList.add('quiz-question');
questionElement.textContent = currentQuiz.key;
quizContainer.appendChild(questionElement);

// Create and display answer options
const optionsElement = document.createElement('div');
optionsElement.classList.add('quiz-options');

const answersArray = getAllAnswers(currentQuiz.value);
shuffleArray(answersArray);

answersArray.forEach((answer) => {
    const optionElement = document.createElement('button');
    optionElement.classList.add('quiz-option');
    optionElement.textContent = answer;
    optionElement.addEventListener('click', () => selectAnswer(answer));
    optionsElement.appendChild(optionElement);
});

quizContainer.appendChild(optionsElement);
}

function getAllAnswers(correctAnswer) {
const answersArray = [correctAnswer];

const keys = Object.keys(localStorage);
keys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== correctAnswer) {
    answersArray.push(value);
    }
});

return answersArray;
}

function selectAnswer(answer) {
answers.push({
    question: quizData[currentQuestion].key,
    selectedAnswer: answer,
    correctAnswer: quizData[currentQuestion].value
});

currentQuestion++;
presentNextQuestion();
}

function displayResults() {
    const quizContainer = document.getElementById('quizContainer');

    // Clear current question
    quizContainer.innerHTML = '';
    createResult();
}

function createResult() {
    const tableElement = document.createElement('table');
  
    // 테이블 헤더 생성
    const theadElement = document.createElement('thead');
    const tableHeaderRow = document.createElement('tr');
    const headerCells = ['스펠링', '정답', '내가 고른 답','정오'];
  
    headerCells.forEach((headerText) => {
      const tableHeaderCell = document.createElement('th');
      tableHeaderCell.textContent = headerText;
      tableHeaderRow.appendChild(tableHeaderCell);
    });
  
    theadElement.appendChild(tableHeaderRow);
    tableElement.appendChild(theadElement);
  
    // 테이블 본문 생성
    const tbodyElement = document.createElement('tbody');
    
    answers.forEach((answer, index) => {
      const tableRow = document.createElement('tr');
      
      const spellingCell = document.createElement('td');
      spellingCell.textContent = answer.question;
      tableRow.appendChild(spellingCell);
      
      const correctAnswerCell = document.createElement('td');
      correctAnswerCell.textContent = answer.correctAnswer;
      tableRow.appendChild(correctAnswerCell);
      
      const selectedAnswerCell = document.createElement('td');
      selectedAnswerCell.textContent = answer.selectedAnswer;
      tableRow.appendChild(selectedAnswerCell);
    
      const resultCell = document.createElement('td');
      if (answer.correctAnswer == answer.selectAnswer) {
        resultCell.textContent = 'O';
        resultCell.style.color = 'green';
      } else{
        resultCell.textContent = 'X';
        resultCell.style.color = 'red';
      }      
      tableRow.appendChild(resultCell);
      
      tbodyElement.appendChild(tableRow);
    });
  
    tableElement.appendChild(tbodyElement);
  
    // 결과를 출력할 컨테이너에 테이블 추가
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';
    resultContainer.appendChild(tableElement);
  }