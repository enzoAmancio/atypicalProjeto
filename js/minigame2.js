const emotions = [
  {
    image: "imgs/minegame2/feliz.jpeg", 
    answer: "Alegria"
  },
  {
    image: "imgs/minegame2/triste.png", 
    answer: "Tristeza"
  },
  {
    image: "imgs/minegame2/raiva.png", 
    answer: "Raiva"
  },
  {
    image: "imgs/minegame2/fome.png", 
    answer: "Fome"
  },
  {
    image: "imgs/minegame2/surpreso.jpg", 
    answer: "Surpreso"
  }
];

let currentEmotion;

function loadEmotion() {
  const randomIndex = Math.floor(Math.random() * emotions.length);
  currentEmotion = emotions[randomIndex];
  document.getElementById("emotion-image").src = currentEmotion.image;
  document.getElementById("feedback").textContent = "";
}

function checkAnswer(button) {
  const userAnswer = button.textContent;
  const feedback = document.getElementById("feedback");

  if (userAnswer === currentEmotion.answer) {
    feedback.textContent = "✅ Acertou!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `❌ Errou! Era ${currentEmotion.answer}.`;
    feedback.style.color = "red";
  }

  setTimeout(loadEmotion, 2000); 
}

loadEmotion();