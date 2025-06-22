/*const buttons = document.querySelectorAll('.btn-tea');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        const item = button.closest('.carousel-item');
        if (item) item.classList.add('blurred');
    });

    button.addEventListener('mouseleave', () => {
        const item = button.closest('.carousel-item');
        if (item) item.classList.remove('blurred');
    });
});*/
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
