const questions = [
  {
    question: "Um carro freia bruscamente até parar. Qual fórmula representa a relação entre a velocidade final, inicial, aceleração e espaço percorrido?",
    options: [
      "v = s / t",
      "v = v₀ + at",
      "v² = v₀² + 2aΔs",
      "F = ma"
    ],
    answer: 2,
    explanation: "A fórmula correta é \\( v^2 = v_0^2 + 2a \\Delta s \\), pois relaciona a variação de velocidade com aceleração e deslocamento sem depender do tempo."
  },
  {
    question: "Um corpo lançado verticalmente atinge uma altura máxima. Qual fórmula relaciona a altura, a velocidade inicial e a aceleração da gravidade?",
    options: [
      "s = v₀t + ½at²",
      "v = v₀ + at",
      "v² = v₀² + 2aΔs",
      "F = m·g"
    ],
    answer: 2,
    explanation: "A equação \\( v^2 = v_0^2 + 2a \\Delta s \\) pode ser usada aqui, com \\( a = -g \\) e \\( v = 0 \\) no ponto mais alto, para encontrar a altura máxima."
  },
  {
    question: "Um móvel se desloca com velocidade constante. Qual fórmula melhor representa esse movimento?",
    options: [
      "v = s / t",
      "v = v₀ + at",
      "s = v₀t + ½at²",
      "v² = v₀² + 2aΔs"
    ],
    answer: 0,
    explanation: "No movimento uniforme, usamos \\( v = \\frac{s}{t} \\), já que a velocidade é constante e não há aceleração."
  },
  {
    question: "Em uma queda livre, qual fórmula permite calcular a altura em função do tempo?",
    options: [
      "s = v₀t + ½gt²",
      "F = ma",
      "v = s / t",
      "v = v₀ + gt"
    ],
    answer: 0,
    explanation: "Em quedas com \\( v_0 = 0 \\), usamos \\( s = \\frac{1}{2}gt^2 \\), proveniente da equação \\( s = v_0t + \\frac{1}{2}gt^2 \\)."
  },
  {
    question: "Qual fórmula representa a segunda lei de Newton?",
    options: [
      "P = m·g",
      "F = m·a",
      "F = Δq / Δt",
      "E = m·c²"
    ],
    answer: 1,
    explanation: "A Segunda Lei de Newton é \\( F = ma \\), que define a força resultante como o produto da massa pela aceleração."
  },
  // [... continue adicionando as questões até chegar a 50 ...]
];

// Início do jogo
let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.querySelector("button").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = `\$begin:math:text$${opt}\\$end:math:text$`;
    btn.onclick = () => selectOption(index);
    optionsDiv.appendChild(btn);
  });
  MathJax.typesetPromise();
}

function selectOption(index) {
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => btn.disabled = true);
  buttons[q.answer].classList.add("correct");
  if (index !== q.answer) {
    buttons[index].classList.add("incorrect");
  } else {
    score++;
  }

  const explanation = document.createElement("p");
  explanation.innerHTML = q.explanation;
  document.getElementById("options").appendChild(explanation);
  document.getElementById("nextBtn").style.display = "inline-block";
  MathJax.typesetPromise();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    document.getElementById("nextBtn").style.display = "none";
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  const resultDiv = document.getElementById("result");
  resultDiv.style.display = "block";
  resultDiv.innerHTML = `<h2>Você acertou ${score} de ${questions.length} questões!</h2>`;
}
