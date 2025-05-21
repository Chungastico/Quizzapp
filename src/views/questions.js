export function renderQuestion(questionObj, currentIndex, total, timer) {
    return `
        <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
        <div class="bg-gray-800 p-6 rounded-xl w-full max-w-xl space-y-6">
            <div class="flex justify-between items-center text-sm text-gray-400">
            <span>Pregunta ${currentIndex + 1} de ${total}</span>
            <span>Tiempo restante: <span id="timer">${timer}</span>s</span>
            </div>

            <h2 class="text-xl font-semibold">${questionObj.question}</h2>

            <div id="options" class="flex flex-col gap-3">
            ${questionObj.options.map((opt, i) => `
                <button class="option-btn bg-gray-700 hover:bg-gray-600 transition rounded p-3 text-left" data-index="${i}">
                ${opt}
                </button>
            `).join('')}
            </div>

            <button id="nextBtn" class="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white mt-4 hidden">
            Siguiente
            </button>
        </div>
        </div>
    `;
}
