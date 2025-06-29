// Jogo com fases de imagem + curiosidades sobre animais

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const vidasSpan = document.getElementById("vidas");
const faseSpan = document.getElementById("fase");
const mensagem = document.getElementById("mensagem");

const titulo = document.getElementById('titulo');
const texto = titulo.textContent; 
titulo.textContent = '';  // limpa o texto para animação

let i = 0;
function digitar() {
  if (i < texto.length) {
    titulo.textContent += texto.charAt(i);
    i++;
    setTimeout(digitar, 100); 
  }
}
digitar();

let vidas = 5;
let faseAtual = 0;
const somAcerto = new Audio("sounds/somAcerto.mp3");
const somErro = new Audio("sounds/somErro.mp3");
const musicaFundo = document.getElementById("musicaFundo");
musicaFundo.volume = 0.5;

function tocarTrecho(audio, inicio, duracao) {
  audio.currentTime = inicio;
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, duracao * 1500);
}

const fases = [
  {
    imagem: "img/abelha.jpeg",
    correta: "Abelha",
    opcoes: ["Abelha", "Barata", "Aranha"]
  },
  {
    imagem: "img/aranha.jpeg",
    correta: "Aranha",
    opcoes: ["Cobra", "Abelha", "Aranha"]
  },
  {
    imagem: "img/barata.jpeg",
    correta: "Barata",
    opcoes: ["Caranguejo", "Barata", "Coruja"]
  },
  {
    imagem: "img/cachorro.jpeg", // corrigido typo aqui
    correta: "Cachorro",
    opcoes: ["Cachorro", "Coelho", "Cobra"]
  },
  {
    imagem: "img/caranguejo.jpeg",
    correta: "Caranguejo",
    opcoes: ["Caranguejo", "Barata", "Aranha"]
  },
  {
    imagem: "img/cobra.jpeg",
    correta: "Cobra",
    opcoes: ["Cachorro", "Coruja", "Cobra"]
  },
  {
    imagem: "img/coelhos.jpeg",
    correta: "Coelho",
    opcoes: ["Coelho", "Caranguejo", "Abelha"]
  },
  {
    imagem: "img/elefante.jpeg",
    correta: "Elefante",
    opcoes: ["Elefante", "Cavalo", "Cobra"]
  },
  {
    imagem: "img/galo.jpeg",
    correta: "Galo",
    opcoes: ["Cachorro", "Galo", "Coelho"]
  },
  {
    imagem: "img/golfinho.jpeg",
    correta: "Golfinho",
    opcoes: ["Gato", "Galo", "Golfinho"]
  },
  {
    imagem: "img/joaninha.jpeg",
    correta: "Joaninha",
    opcoes: ["Joaninha", "Cachorro", "Gato"]
  },
  {
    imagem: "img/leao.jpeg",
    correta: "Leão",
    opcoes: ["Cachorro", "Leão", "Coelho"]
  },
  {
    imagem: "img/macaco.jpeg",
    correta: "Macaco",
    opcoes: ["Leão", "Galo", "Macaco"]
  },
  {
    imagem: "img/ovelha.jpeg",
    correta: "Ovelha",
    opcoes: ["Ovelha", "Galo", "Macaco"]
  },
  {
    imagem: "img/panda.jpeg",
    correta: "Panda",
    opcoes: ["Ovelha", "Galo", "Panda"]
  },
  {
    imagem: "img/pato.jpeg",
    correta: "Pato",
    opcoes: ["Ovelha", "Pato", "Macaco"]
  },
  {
    imagem: "img/tigre.jpeg",
    correta: "Tigre",
    opcoes: ["Ovelha", "Pato", "Tigre"]
  },

  // Curiosidades
  {
    tipo: "curiosidade",
    curiosidade: "Esse animal não dorme à noite e é conhecido pelos olhos grandes.",
    correta: "Coruja",
    opcoes: ["Ovelha", "Pato", "Coruja"]
  },
  {
    tipo: "curiosidade",
    curiosidade: "Esse animal produz mel e é conhecido por voar em jardins.",
    correta: "Abelha",
    opcoes: ["Ovelha", "Abelha", "Coruja"]
  },
  {
    tipo: "curiosidade",
    curiosidade: "Esse animal produz teias e gosta de ficar em lugares altos.",
    correta: "Aranha",
    opcoes: ["Aranha", "Cachorro", "Gato"]
  },
  {
    tipo: "curiosidade",
    curiosidade: "Esse animal vive em esgotos e costuma assustar pelas aparência.",
    correta: "Barata",
    opcoes: ["Ovelha", "Barata", "Coruja"]
  },
  {
    tipo: "curiosidade",
    curiosidade: "Esse animal é o melhor amigo do homem e tem quatro patas.",
    correta: "Cachorro",
    opcoes: ["Gato", "Leão", "Cachorro"]
  },
  {
    tipo: "curiosidade",
    curiosidade: "Esse animal tem rabo e costuma comer bananas.",
    correta: "Macaco",
    opcoes: ["Gato", "Macaco", "Cachorro"]
  }
];

function embaralhar(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function carregarImagem(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
}

async function desenharFase() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mensagem.textContent = "";
  vidasSpan.textContent = vidas;
  faseSpan.textContent = faseAtual + 1;

  if (faseAtual >= fases.length) {
    mensagem.textContent = "🎉 Parabéns! Você venceu!";
    return;
  }

  const fase = fases[faseAtual];
  const botoes = [];
  const opcoes = embaralhar([...fase.opcoes]);

  ctx.font = "22px Arial";
  ctx.textAlign = "center";

  if (fase.tipo === "curiosidade") {
    ctx.fillStyle = "#000";
    ctx.fillText("🧠 Curiosidade:", canvas.width / 2, 100);
    ctx.fillText(fase.curiosidade, canvas.width / 2, 150);
    ctx.fillText("Selecione o animal correspondente:", canvas.width / 2, 200);
  } else {
    const imgAnimal = await carregarImagem(fase.imagem);
    ctx.drawImage(imgAnimal, canvas.width / 2 - 150, 50, 300, 300);
    // Removido somErro.play() daqui
  }

  for (let i = 0; i < opcoes.length; i++) {
    const texto = opcoes[i];
    const x = canvas.width / 2;
    const y = 400 + i * 60;

    ctx.fillStyle = "#ADD8E6";
    ctx.fillRect(x - 100, y - 25, 200, 50);

    ctx.fillStyle = "#000";
    ctx.fillText(texto, x, y + 5);

    botoes.push({ x: x - 100, y: y - 25, w: 200, h: 50, texto });
  }

  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let botao of botoes) {
      if (
        mouseX >= botao.x &&
        mouseX <= botao.x + botao.w &&
        mouseY >= botao.y &&
        mouseY <= botao.y + botao.h
      ) {
        verificarResposta(botao.texto === fase.correta);
        break;
      }
    }
  };
}

function verificarResposta(correto) {
  if (correto) {
    tocarTrecho(somAcerto, 0, 0.5);
    mensagem.textContent = "✅ Acertou!";
    faseAtual++;
  } else {
    somErro.play();  // Som de erro só aqui, no momento do erro
    mensagem.textContent = " Errou!";
    vidas--;
    if (vidas <= 0) {
      mensagem.textContent = " Fim de jogo!";
      canvas.onclick = null;
      return;
    }
  }

  setTimeout(() => desenharFase(), 1000);
}

desenharFase();
