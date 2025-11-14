localStorage.clear();

const quizSelect = document.getElementById('quiz-select');
const startBtn = document.getElementById('start-quiz');
const quizContainer = document.getElementById('quiz-container');
const quizTitle = document.getElementById('quiz-title');
const questionBox = document.getElementById('question-box');
const answersBox = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('next-question');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const bestScore = document.getElementById('best-score');
const restartBtn = document.getElementById('restart');

let collections = [];
let currentQuiz = null;
let currentIndex = 0;
let score = 0;

window.addEventListener('DOMContentLoaded', loadQuizz);

async function loadQuizz() {
  try {
    const response = await fetch('src/data/quizzes.json');
    const data = await response.json();

    
    collections = [{
      title: "Quantum Physics Quiz",
      cards: data.map(q => ({
        id: q.id,
        question: q.question,
        answer: q.answer
      }))
    }];

    updateQuizSelect();

  } catch (err) {
    console.error("Erreur en chargeant les quizzes:", err);
  }
}

function updateQuizSelect() {
  quizSelect.innerHTML = `<option value="">-- Sélectionne un quiz --</option>`;

  collections.forEach(col => {
    const opt = document.createElement('option');
    opt.value = col.title;
    opt.textContent = col.title;
    quizSelect.appendChild(opt);
  });
}

startBtn.addEventListener('click', () => {
  const selectedTitle = quizSelect.value;
  if (!selectedTitle) return alert("Choisis un quiz d'abord !");

  currentQuiz = collections.find(c => c.title === selectedTitle);
  if (!currentQuiz || currentQuiz.cards.length === 0)
    return alert("Cette collection est vide !");

  currentIndex = 0;
  score = 0;

  quizTitle.textContent = currentQuiz.title;
  document.getElementById('quiz-selection').classList.add('hidden');
  quizContainer.classList.remove('hidden');

  showQuestion();
});

function showQuestion() {
  const card = currentQuiz.cards[currentIndex];
  questionBox.textContent = card.question;
  feedback.textContent = '';
  answersBox.innerHTML = '';

  const answers = shuffle([
    card.answer,
    ...getRandomAnswers(card.answer)
  ]);

  answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.className = "bg-aymane-violet text-body-bg py-2 px-4 rounded-md hover:scale-105 transition";
    btn.addEventListener('click', () => checkAnswer(answer, card.answer));
    answersBox.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    feedback.textContent = "✅ Correct !";
    score++;
  } else {
    feedback.textContent = `❌ Mauvais ! Réponse correcte : ${correct}`;
  }

  [...answersBox.children].forEach(btn => btn.disabled = true);
}

nextQuestionBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= currentQuiz.cards.length) {
    endQuiz();
  } else {
    showQuestion();
  }
});

function endQuiz() {
  quizContainer.classList.add('hidden');
  resultBox.classList.remove('hidden');

  scoreText.textContent = `Ton score : ${score} / ${currentQuiz.cards.length}`;

  const bestKey = `bestScore_${currentQuiz.title}`;
  const prevBest = parseInt(localStorage.getItem(bestKey)) || 0;

  if (score > prevBest)
    localStorage.setItem(bestKey, score);

  bestScore.textContent = `Meilleur score : ${Math.max(score, prevBest)}`;
}

restartBtn.addEventListener('click', () => {
  resultBox.classList.add('hidden');
  document.getElementById('quiz-selection').classList.remove('hidden');
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomAnswers(excludeAnswer) {
  const allAnswers = collections.flatMap(c => c.cards.map(card => card.answer));
  const unique = [...new Set(allAnswers)].filter(a => a !== excludeAnswer);
  return shuffle(unique).slice(0, 3);
}

