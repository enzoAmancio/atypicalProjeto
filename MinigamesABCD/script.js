const objetos = [
  { palavra: "BOLA", imagem: "img/bola.png" },
  { palavra: "SAPO", imagem: "img/sapo.png" },
  { palavra: "UVA", imagem: "img/uva.png" },
  { palavra: "LIVRO", imagem: "img/livro.png" },
  { palavra: "GATO", imagem: "img/gato.png" },
  { palavra: "COELHO", imagem: "img/coelho.png" },
  { palavra: "TESTE", imagem: }
];

let estrelas = 0;
let objetoAtual = null;
let filaObjetos = [];

const som = document.getElementById("somCorreto");
som.volume = 0.3;
const palavraDiv = document.getElementById("palavra");
const letrasDiv = document.getElementById("areaLetras");
const mensagem = document.getElementById("mensagem");
const imagem = document.getElementById("imagemObjeto");
const estrelasSpan = document.getElementById("estrelas");
const titulo = document.getElementById("faseTitulo");

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function criarFilaObjetos() {
  filaObjetos = [...objetos];
  embaralhar(filaObjetos);
}

function carregarObjeto() {
  mensagem.textContent = "";
  palavraDiv.innerHTML = "";
  letrasDiv.innerHTML = "";

  if (filaObjetos.length === 0) {
    criarFilaObjetos();
  }

  const obj = filaObjetos.shift();
  objetoAtual = obj;

  imagem.src = obj.imagem;
  imagem.style.display = "inline";

  const letras = obj.palavra.split("");

  letras.forEach(letra => {
    const div = document.createElement("div");
    div.className = "dropzone";
    div.dataset.correto = letra;
    palavraDiv.appendChild(div);
  });

  letras.forEach(letra => {
    const div = document.createElement("div");
    div.className = "letra";
    div.draggable = true;
    div.textContent = letra;
    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", letra);
    });
    letrasDiv.appendChild(div);
  });

  const zonas = document.querySelectorAll(".dropzone");
  zonas.forEach(z => {
    z.addEventListener("dragover", e => e.preventDefault());
    z.addEventListener("drop", e => {
      e.preventDefault();
      const letra = e.dataTransfer.getData("text");
      if (z.textContent === "") {
        z.textContent = letra;
        verificarPalavra();
      }
    });
  });
}

function verificarPalavra() {
  const zonas = document.querySelectorAll(".dropzone");
  let completa = true;
  zonas.forEach(z => {
    if (z.textContent !== z.dataset.correto) completa = false;
  });

  if (completa) {
    som.play();
    estrelas++;
    estrelasSpan.textContent = estrelas;
    mensagem.textContent = "Muito bem!";
    mensagem.style.color = "green";
    setTimeout(() => {
      if (estrelas >= 5) {
        if (confirm("Você ganhou 5 estrelas! Deseja continuar jogando?")) {
          estrelas = 0;
          estrelasSpan.textContent = estrelas;
          carregarObjeto();
        } else {
          mensagem.textContent = "Parabéns! Jogo finalizado.";
          palavraDiv.innerHTML = "";
          letrasDiv.innerHTML = "";
          imagem.style.display = "none";
        }
      } else {
        carregarObjeto();
      }
    }, 1500);
  }
}

// Iniciar
criarFilaObjetos();
carregarObjeto();
