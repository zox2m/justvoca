function getRandomIndex(max) {
return Math.floor(Math.random() * max);
}

function startQuiz() {
// Get all keys from local storage
const keys = Object.keys(localStorage);

if (keys.length === 0) {
    console.log('No vocabulary data found.');
    return;
}

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

console.log('Quiz Word:', randomKey);
console.log('Options:', meanings);
}

