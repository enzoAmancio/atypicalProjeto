const mobileMenu = document.querySelector('.mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
});