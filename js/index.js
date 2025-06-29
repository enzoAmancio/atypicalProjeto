
const botao = document.getElementById('botao-saiba-mais');
let textoOriginal = 'Saiba mais';
let textoHover = 'Saiba mais >';

// Troca ao passar o mouse
botao.addEventListener('mouseenter', () => {
  botao.textContent = textoHover;
});
botao.addEventListener('mouseleave', () => {
  botao.textContent = textoOriginal;
});

// Troca ao clicar (mantém "Saiba mais >" após o clique)
botao.addEventListener('click', () => {
  botao.textContent = textoHover;
  window.location.href = 'doacao.html'
});



function mostrarTexto (){
  alert('Oie')
  const texto = document.getElementById('texto')
    texto.innerText= 'Ola'
}