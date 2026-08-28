const rounds = [
  {
    image: "imgs/minegame2/feliz.jpeg",
    emotion: "Alegria",
    context: "Você conseguiu terminar uma atividade e alguém comemorou com você.",
    emotionOptions: ["Alegria", "Tristeza", "Raiva"],
    strategyQuestion: "Uma forma segura de mostrar alegria é:",
    strategyOptions: ["Compartilhar com alguém", "Empurrar quem está perto", "Gritar no ouvido de todos"],
    helpfulStrategy: "Compartilhar com alguém",
    modelPhrase: "Eu gostei disso!"
  },
  {
    image: "imgs/minegame2/triste.png",
    emotion: "Tristeza",
    context: "Um brinquedo que você queria usar quebrou.",
    emotionOptions: ["Medo", "Tristeza", "Surpresa"],
    strategyQuestion: "Quando a tristeza aparece, pode ajudar:",
    strategyOptions: ["Pedir acolhimento", "Bater nos objetos", "Fingir sempre que está tudo bem"],
    helpfulStrategy: "Pedir acolhimento",
    modelPhrase: "Estou triste. Pode ficar comigo?"
  },
  {
    image: "imgs/minegame2/raiva.png",
    emotion: "Raiva",
    context: "A rotina mudou sem aviso e você não estava preparado.",
    emotionOptions: ["Raiva", "Alegria", "Fome"],
    strategyQuestion: "Uma escolha segura para lidar com raiva é:",
    strategyOptions: ["Pedir pausa e respirar", "Machucar alguém", "Quebrar alguma coisa"],
    helpfulStrategy: "Pedir pausa e respirar",
    modelPhrase: "Preciso de uma pausa."
  },
  {
    image: "imgs/minegame2/fome.png",
    emotion: "Fome",
    context: "Seu corpo está pedindo comida e fica difícil se concentrar.",
    emotionOptions: ["Fome", "Vergonha", "Alegria"],
    strategyQuestion: "Para comunicar essa necessidade, você pode dizer:",
    strategyOptions: ["Estou com fome", "Sair sem avisar", "Ficar irritado sem tentar pedir"],
    helpfulStrategy: "Estou com fome",
    modelPhrase: "Estou com fome. Posso comer?"
  },
  {
    image: "imgs/minegame2/surpreso.jpg",
    emotion: "Surpresa",
    context: "Um som diferente apareceu de repente.",
    emotionOptions: ["Tristeza", "Surpresa", "Raiva"],
    strategyQuestion: "Quando algo inesperado acontece, pode ajudar:",
    strategyOptions: ["Perguntar o que aconteceu", "Correr sem olhar", "Ignorar qualquer mudança"],
    helpfulStrategy: "Perguntar o que aconteceu",
    modelPhrase: "O que aconteceu?"
  }
];

let queue = [];
let currentRound = null;
let completed = 0;

const image = document.getElementById("emotion-image");
const roundLabel = document.getElementById("round-label");
const progressBar = document.getElementById("progress-bar");
const stepLabel = document.getElementById("step-label");
const challengeTitle = document.getElementById("challenge-title");
const context = document.getElementById("emotion-context");
const options = document.getElementById("options");
const feedback = document.getElementById("feedback");

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startGame() {
  queue = shuffle(rounds);
  completed = 0;
  loadRound();
}

function loadRound() {
  currentRound = queue.shift();
  image.src = currentRound.image;
  image.alt = `Expressão relacionada a ${currentRound.emotion}`;
  feedback.textContent = "";
  feedback.className = "feedback";
  updateProgress();
  renderEmotionStep();
}

function updateProgress() {
  roundLabel.textContent = `Rodada ${completed + 1} de ${rounds.length}`;
  progressBar.style.width = `${(completed / rounds.length) * 100}%`;
}

function renderEmotionStep() {
  stepLabel.textContent = "Etapa 1";
  challengeTitle.textContent = "Qual emoção ou necessidade aparece?";
  context.textContent = currentRound.context;
  renderOptions(currentRound.emotionOptions, checkEmotion);
}

function renderStrategyStep() {
  stepLabel.textContent = "Etapa 2";
  challengeTitle.textContent = currentRound.strategyQuestion;
  context.textContent = `Frase que pode ajudar: "${currentRound.modelPhrase}"`;
  renderOptions(currentRound.strategyOptions, checkStrategy);
}

function renderOptions(items, handler) {
  options.innerHTML = "";
  shuffle(items).forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = item;
    button.addEventListener("click", () => handler(item));
    options.appendChild(button);
  });
}

function checkEmotion(answer) {
  if (answer === currentRound.emotion) {
    feedback.textContent = `Isso! É ${currentRound.emotion}. Agora vamos escolher uma atitude segura.`;
    feedback.className = "feedback success";
    setTimeout(renderStrategyStep, 900);
  } else {
    feedback.textContent = `Boa tentativa. Observe a expressão e tente achar ${currentRound.emotion}.`;
    feedback.className = "feedback attention";
  }
}

function checkStrategy(answer) {
  if (answer === currentRound.helpfulStrategy) {
    completed++;
    progressBar.style.width = `${(completed / rounds.length) * 100}%`;
    feedback.textContent = `Boa escolha. Você pode usar: "${currentRound.modelPhrase}"`;
    feedback.className = "feedback success";
    setTimeout(nextRound, 1400);
  } else {
    feedback.textContent = "Essa escolha pode não ajudar. Procure uma opção segura para comunicar ou se regular.";
    feedback.className = "feedback attention";
  }
}

function nextRound() {
  if (completed >= rounds.length) {
    challengeTitle.textContent = "Você concluiu a jornada!";
    context.textContent = "Hoje você praticou reconhecer emoções, comunicar necessidades e escolher estratégias seguras.";
    options.innerHTML = "";
    feedback.textContent = "Jogue de novo em outro momento para repetir com calma.";
    feedback.className = "feedback success";
    roundLabel.textContent = "Jornada completa";
    return;
  }

  loadRound();
}

startGame();
