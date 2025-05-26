# Quizzapp 🎯

Quizzapp es una aplicación interactiva de preguntas tipo quiz desarrollada con HTML, CSS y JavaScript puro. Está diseñada para evaluar conocimientos sobre distintas temáticas de forma divertida y dinámica.

## 🚀 Funcionalidades

- Interfaz fullscreen responsiva.
- Categorías de preguntas: HTML, CSS, JavaScript y Python.
- 1 pregunta a la vez, sin posibilidad de regresar.
- Límite de tiempo por pregunta (2 segundos).
- Transición automática a la siguiente pregunta (tras responder o agotarse el tiempo).
- Contador de puntuación.
- Barra de progreso visual.

## 🧠 Lógica del juego (JavaScript)

La lógica central del quiz está en el archivo `main.js`, y sigue la siguiente estructura:

1. **Inicio del quiz**
   - Se carga la primera pregunta con `renderCurrentQuestion()`.
   - Se reinician los valores: índice actual y puntaje.

2. **Temporizador por pregunta**
   - `startTimer()` crea un intervalo de 2 segundos.
   - Si el usuario no responde a tiempo, se marca incorrecta automáticamente.

3. **Selección de respuesta**
   - Se desactivan las opciones después de seleccionar.
   - Se valida si es correcta y se actualiza el puntaje.
   - Cambia automáticamente a la siguiente pregunta después de 2 segundos.

4. **Final del quiz**
   - Se muestra la puntuación total y opción de reiniciar.

## 🛠️ Tecnologías utilizadas

- HTML5
- Tailwind CSS
- JavaScript



