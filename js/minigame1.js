const objetos = [
  { palavra: "UVA", imagem: "imgs/minigame1/uva.png", dica: "Fruta pequena que cresce em cachos.", silabas: "U-VA", nivel: "Inicial", frase: "Eu posso pedir: quero uva." },
  { palavra: "BOLA", imagem: "imgs/minigame1/bola.png", dica: "Objeto usado para brincar, chutar ou jogar.", silabas: "BO-LA", nivel: "Inicial", frase: "Eu posso dizer: vamos brincar de bola." },
  { palavra: "GATO", imagem: "imgs/minigame1/gato.png", dica: "Animal de estimação que costuma miar.", silabas: "GA-TO", nivel: "Inicial", frase: "Eu posso falar: o gato miou." },
  { palavra: "CASA", imagem: "imgs/minigame1/casa.png", dica: "Lugar onde pessoas moram e descansam.", silabas: "CA-SA", nivel: "Intermediário", frase: "Eu posso comunicar: quero ir para casa." },
  { palavra: "LIVRO", imagem: "imgs/minigame1/livro.png", dica: "Objeto com páginas usado para ler histórias.", silabas: "LI-VRO", nivel: "Intermediário", frase: "Eu posso pedir: leia o livro comigo." },
  { palavra: "COELHO", imagem: "imgs/minigame1/coelho.png", dica: "Animal com orelhas grandes.", silabas: "CO-E-LHO", nivel: "Desafio", frase: "Eu posso falar: o coelho tem orelhas grandes." },
  { palavra: "ESTRELA", imagem: "imgs/minigame1/estrela.png", dica: "Brilha no céu durante a noite.", silabas: "ES-TRE-LA", nivel: "Desafio", frase: "Eu posso dizer: vi uma estrela no céu." }
];

let filaObjetos = [];
let objetoAtual = null;
let letrasUsadas = [];
let estrelas = 0;
let dicaVisivel = false;

const som = document.getElementById("somCorreto");
const palavraDiv = document.getElementById("palavra");
const letrasDiv = document.getElementById("areaLetras");
const mensagem = document.getElementById("mensagem");
const imagem = document.getElementById("imagemObjeto");
const estrelasSp = document.getElementById("estrelas");
const pistaObjeto = document.getElementById("pistaObjeto");
const fraseObjeto = document.getElementById("fraseObjeto");
const nivelAtual = document.getElementById("nivelAtual");

som.volume = 0.2;

function embaralhar(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function iniciarFila() {
  filaObjetos = embaralhar(objetos);
}

function carregarObjeto() {
  if (filaObjetos.length === 0) iniciarFila();

  objetoAtual = filaObjetos.shift();
  letrasUsadas = [];
  dicaVisivel = false;

  imagem.src = objetoAtual.imagem;
  imagem.alt = `Imagem de ${objetoAtual.palavra.toLowerCase()}`;
  nivelAtual.textContent = `Nível ${objetoAtual.nivel}`;
  pistaObjeto.textContent = "Observe a imagem e toque nas letras na ordem correta.";
  fraseObjeto.textContent = "";
  mensagem.textContent = "";

  renderPalavra();
  renderLetras();
}

function renderPalavra() {
  palavraDiv.innerHTML = "";

  objetoAtual.palavra.split("").forEach((letra, index) => {
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "dropzone";
    slot.textContent = letrasUsadas[index] || "";
    slot.setAttribute("aria-label", letrasUsadas[index] ? `Letra ${letrasUsadas[index]}` : "Espaço vazio");
    slot.addEventListener("click", () => removerLetra(index));
    palavraDiv.appendChild(slot);
  });
}

function renderLetras() {
  letrasDiv.innerHTML = "";
  const extras = ["A", "E", "I", "O", "S", "T"].filter((letra) => !objetoAtual.palavra.includes(letra)).slice(0, 2);
  const letras = embaralhar([...objetoAtual.palavra.split(""), ...extras]);

  letras.forEach((letra) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "letra";
    botao.textContent = letra;
    botao.addEventListener("click", () => escolherLetra(letra));
    letrasDiv.appendChild(botao);
  });
}

function escolherLetra(letra) {
  if (letrasUsadas.length >= objetoAtual.palavra.length) return;

  const letraEsperada = objetoAtual.palavra[letrasUsadas.length];

  if (letra === letraEsperada) {
    letrasUsadas.push(letra);
    mensagem.textContent = "Boa! Continue na próxima letra.";
    mensagem.className = "mensagem success";
    renderPalavra();
    verificarPalavra();
  } else {
    mensagem.textContent = `Quase. A próxima letra começa o som "${letraEsperada}". Tente novamente.`;
    mensagem.className = "mensagem attention";
  }
}

function removerLetra(index) {
  if (!letrasUsadas[index]) return;

  letrasUsadas = letrasUsadas.slice(0, index);
  mensagem.textContent = "Sem problema. Vamos voltar um passo.";
  mensagem.className = "mensagem attention";
  renderPalavra();
}

function verificarPalavra() {
  if (letrasUsadas.join("") !== objetoAtual.palavra) return;

  som.play();
  estrelas++;
  estrelasSp.textContent = estrelas;
  fraseObjeto.textContent = objetoAtual.frase;
  mensagem.textContent = `Você montou ${objetoAtual.palavra}. Agora leia a frase em voz alta.`;
  mensagem.className = "mensagem success";

  setTimeout(() => {
    if (estrelas >= 5) {
      mensagem.textContent = "Você ganhou 5 estrelas. Faça uma pausa ou continue quando quiser.";
      estrelas = 0;
      estrelasSp.textContent = "0";
    }
    carregarObjeto();
  }, 2600);
}

function mostrarDica() {
  if (!objetoAtual) return;

  dicaVisivel = !dicaVisivel;
  pistaObjeto.textContent = dicaVisivel
    ? `Dica: ${objetoAtual.dica} Sílabas: ${objetoAtual.silabas}.`
    : "Observe a imagem e toque nas letras na ordem correta.";
}

function removerLetras() {
  letrasUsadas = [];
  fraseObjeto.textContent = "";
  mensagem.textContent = "Tudo bem, vamos recomeçar esta palavra.";
  mensagem.className = "mensagem attention";
  renderPalavra();
}

iniciarFila();
carregarObjeto();
