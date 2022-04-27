const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    hamburger.classList.toggle('hamburger--active');
    menu.classList.toggle('menu--active');
})
menu.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('menu__link')) {
        hamburger.classList.remove('hamburger--active');
        menu.classList.remove('menu--active');
    }
})