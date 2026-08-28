const fases = [
  {
    tipo: "Imagem",
    pergunta: "Qual animal aparece na imagem?",
    imagem: "imgs/minegame4/buzzbuzz.jpeg",
    dica: "Observe as asas e o corpo pequeno.",
    correta: "Abelha",
    opcoes: ["Abelha", "Aranha", "Barata"],
    explicacao: "A abelha é um inseto que pode voar e ajudar na polinização."
  },
  {
    tipo: "Imagem",
    pergunta: "Qual animal tem orelhas grandes?",
    imagem: "imgs/minegame4/coelho.jpeg",
    dica: "Ele pula e costuma ser associado a cenouras.",
    correta: "Coelho",
    opcoes: ["Pato", "Coelho", "Panda"],
    explicacao: "O coelho tem orelhas grandes e patas fortes para saltar."
  },
  {
    tipo: "Categoria",
    pergunta: "Qual desses vive na água?",
    imagem: "imgs/minegame4/golf.jpeg",
    dica: "Pense no ambiente onde o animal nada.",
    correta: "Golfinho",
    opcoes: ["Golfinho", "Gato", "Coruja"],
    explicacao: "O golfinho é um mamífero aquático. Aqui treinamos categoria por ambiente."
  },
  {
    tipo: "Pista",
    pergunta: "Quem é conhecido pelos olhos grandes e hábitos noturnos?",
    imagem: "imgs/minegame4/coruja.jpeg",
    dica: "A pista fala sobre comportamento e aparência.",
    correta: "Coruja",
    opcoes: ["Coruja", "Ovelha", "Cachorro"],
    explicacao: "A coruja é uma ave frequentemente ativa à noite e reconhecida pelos olhos grandes."
  },
  {
    tipo: "Categoria",
    pergunta: "Qual destes pode ser animal de estimação?",
    imagem: "imgs/minegame4/doguinho.jpeg",
    dica: "Pense em um animal que pode viver com famílias.",
    correta: "Cachorro",
    opcoes: ["Tigre", "Cachorro", "Leão"],
    explicacao: "O cachorro pode viver perto das pessoas. Essa fase treina associação por contexto."
  },
  {
    tipo: "Imagem",
    pergunta: "Qual animal tem tromba?",
    imagem: "imgs/minegame4/elefante.jpeg",
    dica: "Observe a parte comprida no rosto.",
    correta: "Elefante",
    opcoes: ["Elefante", "Macaco", "Pato"],
    explicacao: "O elefante usa a tromba para cheirar, tocar, beber água e pegar objetos."
  },
  {
    tipo: "Pista",
    pergunta: "Qual animal produz teias?",
    imagem: "imgs/minegame4/aranha.jpeg",
    dica: "A pista fala sobre algo que o animal constrói.",
    correta: "Aranha",
    opcoes: ["Aranha", "Abelha", "Joaninha"],
    explicacao: "Muitas aranhas produzem teias. Essa fase trabalha relação entre animal e ação."
  }
];

let faseAtual = 0;
let vidas = 5;
let bloqueado = false;

const vidasSpan = document.getElementById("vidas");
const faseSpan = document.getElementById("fase");
const mensagem = document.getElementById("mensagem");
const animalImage = document.getElementById("animalImage");
const categoryLabel = document.getElementById("categoryLabel");
const questionText = document.getElementById("questionText");
const hintText = document.getElementById("hintText");
const options = document.getElementById("options");

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function renderFase() {
  bloqueado = false;
  const fase = fases[faseAtual];

  vidasSpan.textContent = vidas;
  faseSpan.textContent = `${faseAtual + 1}/${fases.length}`;
  categoryLabel.textContent = fase.tipo;
  questionText.textContent = fase.pergunta;
  hintText.textContent = fase.dica;
  animalImage.src = fase.imagem;
  animalImage.alt = `Imagem: ${fase.correta}`;
  mensagem.textContent = "";
  mensagem.className = "feedback";
  options.innerHTML = "";

  shuffle(fase.opcoes).forEach((opcao) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = opcao;
    button.addEventListener("click", () => responder(opcao));
    options.appendChild(button);
  });
}

function responder(opcao) {
  if (bloqueado) return;
  bloqueado = true;

  const fase = fases[faseAtual];

  if (opcao === fase.correta) {
    mensagem.textContent = `Muito bem! ${fase.explicacao}`;
    mensagem.className = "feedback success";
    faseAtual++;
  } else {
    vidas--;
    mensagem.textContent = `Boa tentativa. A resposta era ${fase.correta}. ${fase.explicacao}`;
    mensagem.className = "feedback attention";
  }

  setTimeout(proximaEtapa, 1900);
}

function proximaEtapa() {
  if (vidas <= 0) {
    finalizar("Fim da trilha. Faça uma pausa e tente novamente depois.");
    return;
  }

  if (faseAtual >= fases.length) {
    finalizar("Trilha completa! Você praticou observar, comparar e classificar animais.");
    return;
  }

  renderFase();
}

function finalizar(texto) {
  questionText.textContent = texto;
  hintText.textContent = "O aprendizado também acontece quando repetimos com calma.";
  options.innerHTML = "";
  mensagem.textContent = "";

  const restart = document.createElement("button");
  restart.type = "button";
  restart.textContent = "Jogar novamente";
  restart.addEventListener("click", () => {
    faseAtual = 0;
    vidas = 5;
    renderFase();
  });
  options.appendChild(restart);
}

renderFase();
