import { renderQuestion } from './questionsView.js';

let currentIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 20;
let selected = false;

export function startQuiz(questions) {
  currentIndex = 0;
  score = 0;
  renderCurrentQuestion(questions);
}

function renderCurrentQuestion(questions) {
  const currentQuestion = questions[currentIndex];
  document.querySelector('#app').innerHTML = renderQuestion(currentQuestion, currentIndex, questions.length, timeLeft);
  selected = false;

  const optionBtns = document.querySelectorAll('.option-btn');
  const nextBtn = document.getElementById('nextBtn');

  startTimer(() => {
    if (!selected) {
      disableOptions(optionBtns);
      showNextBtn(nextBtn, questions);
    }
  });

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (selected) return;
      selected = true;

      const selectedIndex = parseInt(btn.dataset.index);
      const correctIndex = currentQuestion.answer;

      if (selectedIndex === correctIndex) {
        btn.classList.add('bg-green-600');
        score++;
      } else {
        btn.classList.add('bg-red-600');
        optionBtns[correctIndex].classList.add('bg-green-600');
      }

      disableOptions(optionBtns);
      showNextBtn(nextBtn, questions);
    });
  });

  nextBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    currentIndex++;
    if (currentIndex < questions.length) {
      resetTimer();
      renderCurrentQuestion(questions);
    } else {
      showResults(score, questions.length);
    }
  });
}

function disableOptions(buttons) {
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.remove('hover:bg-gray-600'); // ❌ desactiva hover visual
    btn.classList.add('cursor-default', 'opacity-70');
  });
}

function showNextBtn(btn, questions) {
  btn.classList.remove('hidden');
  setTimeout(() => {
    btn.click();
  }, 3000); // ⏱ auto siguiente en 3s
}

function startTimer(onExpire) {
  const timerEl = document.getElementById('timer');
  timeLeft = 20;
  timerEl.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      onExpire();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 20;
}

function showResults(score, total) {
  document.querySelector('#app').innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white text-center">
      <div class="bg-gray-800 p-8 rounded-xl max-w-md space-y-6">
        <h2 class="text-3xl font-bold">¡Quiz completado!</h2>
        <p class="text-xl">Puntaje final: ${score} / ${total}</p>
        <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded">
          Volver al inicio
        </button>
      </div>
    </div>
  `;
}
