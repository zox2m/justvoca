
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

function createResult(){
    // 테이블로 정리하려고 함!! 
    const tableElement = document.createElement('table');
    const tableHeaderElement = document.createElement('th');
    tableElement.append(tableHeaderElement.append('스펠링'));
    tableElement.append(tableHeaderElement.append('정답'));
    tableElement.append(tableHeaderElement.append('내가 고른 답'));

    answers.forEach((answer, index) => {
        const resultElement = document.createElement('p');
        resultElement.textContent = `${index + 1}: Spelling: ${answer.question}, Your Answer: ${answer.selectedAnswer}, Correct Answer: ${answer.correctAnswer}`;
        quizContainer.appendChild(resultElement);
    
    });
}