const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');


const ValidateInput = ({target}) => {
    if (target.value.length > 3) {
        button.removeAttribute('disabled');
    }else{
    button.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('player', input.value);
    window.location = 'indexgame3.html';
    // window.location = 'https://example.com';
}

input.addEventListener('input', ValidateInput);
form.addEventListener('submit', handleSubmit);
