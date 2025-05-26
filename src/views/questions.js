let currentIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 20; // ← tiempo para responder
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

  startTimer(() => {
    if (!selected) {
      disableOptions(optionBtns, currentQuestion.answer);
      // esperar 2 segundos después de que se acabe el tiempo
      goToNext(questions);
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

      disableOptions(optionBtns, correctIndex);
      goToNext(questions); // ← espera 2s antes de cambiar
    });
  });
}

function disableOptions(buttons) {
  buttons.forEach((btn) => {
    btn.disabled = true;
    btn.classList.remove('hover:bg-gray-600');
    btn.classList.add('cursor-default', 'opacity-70');
  });
}

function goToNext(questions) {
  clearInterval(timerInterval);
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      timeLeft = 20;
      renderCurrentQuestion(questions);
    } else {
      showResults(score, questions.length);
    }
  }, 2000); // ← espera 2s antes de cambiar
}

function startTimer(onTimeout) {
  clearInterval(timerInterval);
  timeLeft = 20;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      onTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('timer');
  if (timerEl) timerEl.textContent = timeLeft;
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

function renderQuestion(questionObj, currentIndex, total, timer) {
  return `
    <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div class="bg-gray-800 p-6 rounded-xl w-full max-w-xl space-y-6">
        <div class="flex justify-between items-center text-sm text-gray-400">
          <span>Pregunta ${currentIndex + 1} de ${total}</span>
          <span>Tiempo restante: <span id="timer">${timer}</span>s</span>
        </div>

        <h2 class="text-xl font-semibold break-words">${questionObj.question}</h2>

        <div id="options" class="flex flex-col gap-3">
          ${questionObj.options.map((opt, i) => `
            <button class="option-btn bg-gray-700 transition rounded p-3 text-left" data-index="${i}">
              ${opt}
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
