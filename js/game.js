const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const feedback = document.querySelector(".game-feedback");
const restartButton = document.getElementById("restart");

const characters = [
  "Alegria",
  "Ansiedade",
  "Medo",
  "Raiva",
  "Surpresa",
  "Tristeza",
  "Vergonha",
  "Tedio"
];

const prompts = {
  Alegria: "Conte uma coisa que trouxe alegria hoje.",
  Ansiedade: "Qual pausa pode ajudar quando o corpo fica agitado?",
  Medo: "Quem pode ajudar quando aparece medo?",
  Raiva: "Qual frase segura ajuda a pedir uma pausa?",
  Surpresa: "O que podemos perguntar quando algo muda de repente?",
  Tristeza: "Que cuidado pode acolher tristeza?",
  Vergonha: "Como pedir tempo para responder?",
  Tedio: "Que atividade calma pode ser escolhida?"
};

let firstCard = null;
let secondCard = null;
let locked = false;
let matchedPairs = 0;
let loop = null;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function createElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

function createCard(character) {
  const card = createElement("button", "card");
  const front = createElement("span", "face front");
  const back = createElement("span", "face back");

  front.style.backgroundImage = `url('imgs/minigame3/${character}.jpg')`;
  card.type = "button";
  card.dataset.character = character;
  card.setAttribute("aria-label", `Carta de emoção ${character}`);
  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", () => revealCard(card));

  return card;
}

function revealCard(card) {
  if (locked || card === firstCard || card.classList.contains("matched")) return;

  card.classList.add("reveal-card");

  if (!firstCard) {
    firstCard = card;
    feedback.textContent = "Escolha outra carta.";
    return;
  }

  secondCard = card;
  locked = true;
  checkCards();
}

function checkCards() {
  const firstCharacter = firstCard.dataset.character;
  const secondCharacter = secondCard.dataset.character;

  if (firstCharacter === secondCharacter) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;
    feedback.textContent = `Par: ${firstCharacter}. ${prompts[firstCharacter]}`;
    resetSelection();
    checkEndGame();
    return;
  }

  feedback.textContent = "Ainda não formou par. Observe as imagens e tente lembrar.";

  setTimeout(() => {
    firstCard.classList.remove("reveal-card");
    secondCard.classList.remove("reveal-card");
    resetSelection();
  }, 900);
}

function resetSelection() {
  firstCard = null;
  secondCard = null;
  locked = false;
}

function checkEndGame() {
  if (matchedPairs < grid.children.length / 2) return;

  clearInterval(loop);
  feedback.textContent = `Muito bem! Você encontrou todos os pares em ${timer.textContent} segundos.`;
}

function loadGame() {
  clearInterval(loop);
  grid.innerHTML = "";
  timer.textContent = "0";
  matchedPairs = 0;
  resetSelection();

  const selected = shuffle(characters).slice(0, 6);
  const deck = shuffle([...selected, ...selected]);

  deck.forEach((character) => {
    grid.appendChild(createCard(character));
  });

  feedback.textContent = "Escolha duas cartas para começar.";
  loop = setInterval(() => {
    timer.textContent = String(Number(timer.textContent) + 1);
  }, 1000);
}

window.onload = () => {
  spanPlayer.textContent = localStorage.getItem("player") || "Jogador";
  restartButton.addEventListener("click", loadGame);
  loadGame();
};
