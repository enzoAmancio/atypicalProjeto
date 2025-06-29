// ——— Dados do jogo ———
const objetos = [
  { palavra: "BOLA",   imagem: "img/bola.png" },
  { palavra: "SAPO",   imagem: "img/sapo.png" },
  { palavra: "UVA",    imagem: "img/uva.png" },
  { palavra: "LIVRO",  imagem: "img/livro.png" },
  { palavra: "GATO",   imagem: "img/gato.png" },
  { palavra: "COELHO", imagem: "img/coelho.png" },
];

// ——— Estado e elementos ———
let estrelas = 0;
let filaObjetos = [];
let palavraAtual = ""; // <-- variável global para guardar a palavra atual

const som        = document.getElementById("somCorreto"); som.volume = 0.3;
const palavraDiv = document.getElementById("palavra");
const letrasDiv  = document.getElementById("areaLetras");
const mensagem   = document.getElementById("mensagem");
const imagem     = document.getElementById("imagemObjeto");
const estrelasSp = document.getElementById("estrelas");

// ——— Touch universal ———
let tocando = false, letraSolta = null, cloneMovel = null;

function habilitarToqueNaLetra(elem) {
  elem.addEventListener("touchstart", iniciarToque, { passive: false });
}

function iniciarToque(e) {
  e.preventDefault();
  tocando = true;
  letraSolta = e.currentTarget;

  cloneMovel = letraSolta.cloneNode(true);
  cloneMovel.style.position = "fixed";
  cloneMovel.style.pointerEvents = "none";
  cloneMovel.style.opacity = "0.9";
  cloneMovel.style.zIndex = "1000";
  document.body.appendChild(cloneMovel);

  letraSolta.style.opacity = "0.4";
  moverToque(e);

  document.addEventListener("touchmove", moverToque, { passive: false });
  document.addEventListener("touchend", soltarToque);
  document.addEventListener("touchcancel", soltarToque);
}

function moverToque(e) {
  if (!tocando || !cloneMovel) return;
  const t = e.touches[0];
  cloneMovel.style.left = `${t.clientX - cloneMovel.offsetWidth / 2}px`;
  cloneMovel.style.top = `${t.clientY - cloneMovel.offsetHeight / 2}px`;
}

function soltarToque(e) {
  if (!tocando) return;
  const t = e.changedTouches[0];
  const alvo = document.elementFromPoint(t.clientX, t.clientY);

  if (alvo && alvo.classList.contains("dropzone") && alvo.textContent === "") {
    alvo.textContent = letraSolta.textContent;
    letraSolta.remove(); // ← Remove da área de letras
    verificarPalavra();
  }

  letraSolta.style.opacity = "1";
  cloneMovel.remove();

  document.removeEventListener("touchmove", moverToque);
  document.removeEventListener("touchend", soltarToque);
  document.removeEventListener("touchcancel", soltarToque);

  tocando = false;
  letraSolta = cloneMovel = null;
}

// ——— NOVO: Função para permitir remover letras da dropzone ———
function ativarRemocaoDeLetras(dropzone) {
  dropzone.addEventListener("click", () => {
    const letra = dropzone.textContent;
    if (letra !== "") {
      // Cria letra de volta na área de letras
      const novaLetra = document.createElement("div");
      novaLetra.className = "letra";
      novaLetra.draggable = true;
      novaLetra.textContent = letra;

      novaLetra.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text", letra);
      });

      habilitarToqueNaLetra(novaLetra);

      letrasDiv.appendChild(novaLetra);
      dropzone.textContent = ""; // limpa a dropzone
    }
  });
}

// ——— Funções principais ———
function embaralhar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Aqui, removemos letras para a ordem original da palavra
function removerLetras() {
  // limpa a área de letras antes de recriar as letras
  letrasDiv.innerHTML = "";

  // limpa todas as dropzones
  document.querySelectorAll("#palavra .dropzone").forEach(drop => {
    drop.textContent = "";
  });

  // recria as letras na ordem correta da palavraAtual
  palavraAtual.split("").forEach(letra => {
    const novaLetra = document.createElement("div");
    novaLetra.className = "letra";
    novaLetra.draggable = true;
    novaLetra.textContent = letra;

    novaLetra.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", letra);
    });

    habilitarToqueNaLetra(novaLetra);

    letrasDiv.appendChild(novaLetra);
  });
}

function criarFilaObjetos() {
  filaObjetos = [...objetos];
  embaralhar(filaObjetos);
}

function carregarObjeto() {
  mensagem.textContent = "";
  palavraDiv.innerHTML = "";
  letrasDiv.innerHTML = "";

  if (filaObjetos.length === 0) criarFilaObjetos();
  const obj = filaObjetos.shift();

  palavraAtual = obj.palavra; // guarda a palavra atual

  imagem.src = obj.imagem;
  imagem.style.display = "inline";

  // Cria lacunas
  obj.palavra.split("").forEach(letra => {
    const div = document.createElement("div");
    div.className = "dropzone";
    div.dataset.correto = letra;

    // permitir clique para remover a letra
    ativarRemocaoDeLetras(div);

    palavraDiv.appendChild(div);
  });

  // Cria letras na ordem original (sem embaralhar aqui)
  obj.palavra.split("").forEach(letra => {
    const div = document.createElement("div");
    div.className = "letra";
    div.draggable = true;
    div.textContent = letra;

    // Mouse
    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", letra);
    });

    // Toque
    habilitarToqueNaLetra(div);

    letrasDiv.appendChild(div);
  });

  // Dropzones para mouse
  document.querySelectorAll(".dropzone").forEach(z => {
    z.addEventListener("dragover", e => e.preventDefault());

    z.addEventListener("drop", e => {
      e.preventDefault();
      const letra = e.dataTransfer.getData("text");
      if (z.textContent === "") {
        z.textContent = letra;

        // Remove letra correspondente da área de letras
        const blocos = document.querySelectorAll(".letra");
        for (const b of blocos) {
          if (b.textContent === letra) {
            b.remove();
            break;
          }
        }

        verificarPalavra();
      }
    });
  });
}

function verificarPalavra() {
  const completa = [...document.querySelectorAll(".dropzone")]
    .every(z => z.textContent === z.dataset.correto);

  if (!completa) return;

  som.play();
  estrelas++;
  estrelasSp.textContent = estrelas;
  mensagem.textContent = "Muito bem!";
  mensagem.style.color = "green";

  setTimeout(() => {
    if (estrelas >= 5) {
      if (confirm("Você ganhou 5 estrelas! Deseja continuar jogando?")) {
        estrelas = 0;
        estrelasSp.textContent = "0";
        carregarObjeto();
      } else {
        mensagem.textContent = "Parabéns! Jogo finalizado.";
        palavraDiv.innerHTML = letrasDiv.innerHTML = "";
        imagem.style.display = "none";
      }
    } else {
      carregarObjeto();
    }
  }, 1500);
}

// ——— Inicializa o jogo ———
criarFilaObjetos();
carregarObjeto();
