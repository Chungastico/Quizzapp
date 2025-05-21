export function renderHome() {
    return `
        <div class="min-h-screen bg-cover bg-center flex items-center justify-center" style="background-image: url('./src/assets/bg-home.png')">
        <div class="bg-white/10 backdrop-blur-md p-10 rounded-xl max-w-xl w-full text-white">
            <h1 class="text-4xl font-bold mb-2 leading-tight">
            Quiz de programación<br>
            <span class="text-purple-400">Nivel Basico!</span>
            </h1>
            <p class="mb-8 text-gray-300">Elige un tema para empezar :D</p>

            <div class="flex flex-col gap-4">
            <button data-topic="html" class="w-full flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-left">
                <img src="./src/assets/icons/html.png" alt="HTML" class="w-6 h-6" />
                <span>HTML</span>
            </button>
            <button data-topic="css" class="w-full flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-left">
                <img src="./src/assets/icons/css.png" alt="CSS" class="w-6 h-6" />
                <span>CSS</span>
            </button>
            <button data-topic="js" class="w-full flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-left">
                <img src="./src/assets/icons/js.png" alt="JavaScript" class="w-6 h-6" />
                <span>JavaScript</span>
            </button>
            <button data-topic="python" class="w-full flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-left">
                <img src="./src/assets/icons/python.png" alt="Python" class="w-6 h-6" />
                <span>Python</span>
            </button>
            </div>
        </div>
        </div>
    `;
}
