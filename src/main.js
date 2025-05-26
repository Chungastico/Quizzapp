import './style.css';
import { renderHome } from './views/home.js';
import { startQuiz } from './views/questions.js';

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