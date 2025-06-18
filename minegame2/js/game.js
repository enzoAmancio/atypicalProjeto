 const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
let loop;

const characters = [
    'Alegria',
    'Ansiedade',
    'Inveja',
    'Medo',
    'Nojinho',
    'Raiva',
    'Surpresa',
    'Tedio',
    'Tristeza',
    'Vergonha',
];


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}!Seu tempo foi: ${timer.innerHTML}`);
        setTimeout(() => location.reload(), 1500);
    }

}

let firstcard = '';
let secondcard = '';

const checkCards = () => {
    const firstcharacter = firstcard.getAttribute('data-character');
    const secondcharacter = secondcard.getAttribute('data-character');
    if (firstcharacter === secondcharacter) {
        firstcard.firstChild.classList.add('disable-card');
        secondcard.firstChild.classList.add('disable-card');
        firstcard = '';
        secondcard = '';
        checkEndGame();
    }else{
        setTimeout(() => {
            
        firstcard.classList.remove('reveal-card');
        secondcard.classList.remove('reveal-card');
        firstcard = '';
        secondcard = '';
    }, 500);
}
}
let cartasViradas = [];
let bloqueado = false;
function virarCarta(carta) {
    if(bloqueado || carta.classList.contains('virada') || cartasViradas.length >= 2) return;
       carta.classList.add('virada');
       cartasViradas.push(carta);
       if (cartasViradas.length ===2){
            bloqueado =true;
            setTimeout(() =>{
                if (cartasViradas[0].dataset.valor === cartasViradas[1].dataset.valor){
                }else {
                    cartasViradas.forEach(c => c.classList.remove('virada'));
                }
                cartasViradas = [];
                bloqueado = false;
            },1000);
       }
}
const revealCard = ({ target }) => {
    if (
        target.parentNode.classList.contains('reveal-card') ||
        firstcard && secondcard
    ) {
        return;
    }

    target.parentNode.classList.add('reveal-card');

    if (firstcard === '') {
        firstcard = target.parentNode;
    } else if (secondcard === '') {
        secondcard = target.parentNode;
        checkCards();
    }
}
const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    front.style.backgroundImage = `url('../img/${character}.jpg')`;

    card.appendChild (front);
    card.appendChild (back);

    card.addEventListener('click',revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadgame = () => {

    	const duplicateCharacters = [ ...characters, ...characters ];

        const shuffledCharacters = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

const startTime = () => {
    loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
} 

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    timer.innerHTML = '0';
    loadgame();
    startTime();
}