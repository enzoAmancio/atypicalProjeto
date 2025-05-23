const buttons = document.querySelectorAll('.btn-tea');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        const item = button.closest('.carousel-item');
        if (item) item.classList.add('blurred');
    });

    button.addEventListener('mouseleave', () => {
        const item = button.closest('.carousel-item');
        if (item) item.classList.remove('blurred');
    });
});