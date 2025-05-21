import './style.css';
import { renderHome } from './views/home.js';
import { renderQuestion } from './views/questions.js';

import { htmlQuestions } from './data/html.js';
import { cssQuestions } from './data/css.js';
import { jsQuestions } from './data/js.js';
import { pythonQuestions } from './data/python.js';

document.querySelector('#app').innerHTML = renderHome();


setTimeout(() => {
  document.querySelectorAll("button[data-topic]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const topic = btn.dataset.topic;


      if (topic === "html") startQuiz(htmlQuestions);
      if (topic === "css") startQuiz(cssQuestions);
      if (topic === "js") startQuiz(jsQuestions);
      if (topic === "python") startQuiz(pythonQuestions);
    });
  });
}, 0);

function startQuiz(questions) {
  const total = questions.length;
  let index = 0;
  let score = 0;
  let timer = 20;
  let countdown;
  let answered = false;

  render();
  function render() {
    document.querySelector('#app').innerHTML = renderQuestion(questions[index], index, total, timer);
    const optionBtns = document.querySelectorAll(".option-btn");
    const nextBtn = document.getElementById("nextBtn");
    const timerSpan = document.getElementById("timer");

    countdown = setInterval(() => {
      timer--;
      timerSpan.textContent = timer;
      if (timer === 0 && !answered) {
        showAnswer(-1); 
      }
    }, 1000);

    optionBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!answered) {
          const selected = parseInt(btn.dataset.index);
          showAnswer(selected);
        }
      });
    });

    nextBtn.addEventListener("click", () => {
      index++;
      timer = 20;
      answered = false;
      if (index < total) {
        render();
      } else {
        showResult();
      }
    });
  }

  function showAnswer(selected) {
    answered = true;
    clearInterval(countdown);
    const correct = questions[index].answer;
    const optionBtns = document.querySelectorAll(".option-btn");

    optionBtns.forEach((btn, i) => {
      btn.disabled = true;
      btn.classList.remove("bg-gray-700");
      if (i === correct) {
        btn.classList.add("bg-green-600");
      } else {
        btn.classList.add("bg-red-600");
      }
    });

    if (selected === correct) {
      score++;
    }

    document.getElementById("nextBtn").classList.remove("hidden");

    setTimeout(() => {
      if (document.getElementById("nextBtn")) {
        document.getElementById("nextBtn").click();
      }
    }, 3000);
  }

  function showResult() {
    document.querySelector('#app').innerHTML = `
      <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div class="bg-gray-800 p-10 rounded-xl text-center space-y-4">
          <h2 class="text-2xl font-bold">¡Quiz terminado!</h2>
          <p class="text-lg">Obtuviste <span class="text-purple-400">${score}</span> de <span>${total}</span> puntos.</p>
          <button onclick="location.reload()" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
            Volver al inicio
          </button>
        </div>
      </div>
    `;
  }
}

