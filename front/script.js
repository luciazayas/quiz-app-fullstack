const API_URL_QUESTION = "http://localhost:3000/quiz/question";
const quiz = document.getElementById('quiz')
const submitBtn = document.getElementById('submit')
const startBtn = document.getElementById('start')

let currentQuiz = 0
let score = 0
let questions = [];

loadQuiz()

async function loadQuiz() {
    try{
  const res = await fetch(API_URL_QUESTION);
  questions = await res.json();
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
    document.getElementById("resultado").innerHTML = "Error al cargar";
  }
   showQuestion();
}

function showQuestion() {
  submitBtn.disabled = true;
  quiz.innerHTML = "";

  const q = questions[currentQuiz];
  const questionEl = document.createElement("h2");
  questionEl.innerHTML = q.question;
  quiz.appendChild(questionEl);

  q.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.onclick = () => selectAnswer(btn, q.correct_answer);
    quiz.appendChild(btn);
  });
}

function selectAnswer(button, correct) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((b) => (b.disabled = true));

  if (button.textContent === correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  submitBtn.disabled = false;
}


async function enviarPuntuacion(score) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión para guardar tu puntuación.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/quiz/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ score }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("ultimoMensaje", data.message);
    } 
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    localStorage.setItem("ultimoMensaje", data.message);
  }
  
}



submitBtn.addEventListener('click', async () => {
     currentQuiz++;
  if (currentQuiz < questions.length) {
    showQuestion();
  } else {
    await enviarPuntuacion(score)
    window.location.href = "score.html";
  }
})

