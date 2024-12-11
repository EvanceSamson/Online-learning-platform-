const quizData = [
    { question: "What is the capital city of Malawi?", options: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"], correct: 0 },
    { question: "Who is known as the Father and Founder of Malawi?", options: ["John Chilembwe", "Kamuzu Banda", "Bakili Muluzi", "Hastings Banda"], correct: 1 },
    { question: "Which lake is famously associated with Malawi?", options: ["Lake Victoria", "Lake Malawi", "Lake Tanganyika", "Lake Nyasa"], correct: 1 },
    { question: "When did Malawi gain independence?", options: ["1958", "1964", "1975", "1960"], correct: 1 },
    { question: "What is Malawi's national currency?", options: ["Kwacha", "Shilling", "Rand", "Pula"], correct: 0 },
    { question: "Which is the largest city in Malawi by population?", options: ["Lilongwe", "Blantyre", "Mzuzu", "Zomba"], correct: 1 },
    { question: "What is the traditional dance of the Chewa people?", options: ["Gule Wamkulu", "Beni", "Malipenga", "Chioda"], correct: 0 },
    { question: "Who was the first female president of Malawi?", options: ["Ellen Johnson", "Joyce Banda", "Catherine Kanima", "Grace Chiumia"], correct: 1 },
    { question: "What year did Malawi become a republic?", options: ["1966", "1964", "1970", "1985"], correct: 0 },
    { question: "What does the black color in the Malawian flag represent?", options: ["Mineral wealth", "Freedom", "The African people", "Unity"], correct: 2 }
];

let currentQuestion = 0;
let score = 0;

const questionNumberElement = document.getElementById("question-number");
const questionTextElement = document.getElementById("question-text");
const optionsElements = document.querySelectorAll(".option");
const progressBar = document.getElementById("progress-bar");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const resultSection = document.getElementById("result-section");
const quizSection = document.getElementById("quiz-section");
const correctAnswersElement = document.getElementById("correct-answers");
const finalScoreElement = document.getElementById("final-score");

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];
    questionNumberElement.textContent = `Question ${currentQuestion + 1}`;
    questionTextElement.textContent = currentQuiz.question;

    optionsElements.forEach((button, index) => {
        button.textContent = currentQuiz.options[index];
        button.classList.remove("selected");
        button.disabled = false;
    });

    feedbackElement.classList.add("hidden");
    nextButton.disabled = true;
}

function selectOption(index) {
    optionsElements.forEach(button => button.classList.remove("selected"));
    optionsElements[index].classList.add("selected");
    nextButton.disabled = false;

    feedbackElement.textContent =
        index === quizData[currentQuestion].correct ? "✅ Correct!" : "❌ Incorrect.";
    feedbackElement.classList.remove("hidden");
}

function goToNextQuestion() {
    const selectedOption = Array.from(optionsElements).findIndex(button =>
        button.classList.contains("selected")
    );

    if (selectedOption === quizData[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        updateProgressBar();
        loadQuestion();
    } else {
        showResults();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResults() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    correctAnswersElement.textContent = score;
    finalScoreElement.textContent = `${score * 10}%`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    progressBar.style.width = "0%";
    quizSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    loadQuestion();
}

loadQuestion();