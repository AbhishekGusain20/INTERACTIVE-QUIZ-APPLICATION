const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Color Style Sheet", "Cascading Style Sheet", "Creative Style Sheet", "Computer Style Sheet"],
    answer: "Cascading Style Sheet"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answerListEl = document.getElementById('answer-list');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  feedbackEl.textContent = "";
  answerListEl.innerHTML = "";
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach(option => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option);
    li.appendChild(btn);
    answerListEl.appendChild(li);
  });
}

function selectAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    feedbackEl.style.color = "green";
    score++;
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${correct}`;
    feedbackEl.style.color = "red";
  }

  Array.from(answerListEl.getElementsByTagName("button")).forEach(btn => {
    btn.disabled = true;
  });

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  answerListEl.innerHTML = "";
  feedbackEl.textContent = "";
  scoreEl.textContent = `🎉 Your score: ${score} / ${quizData.length}`;
  nextBtn.style.display = "none";
}

loadQuestion();

