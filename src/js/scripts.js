$(document).ready(function() {
    //Fixed menu
    const nav = document.querySelector('.header');
    function fixNav() {
        if (window.scrollY > 0) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    }
    fixNav();
    window.addEventListener('scroll', fixNav);

//Hamburger menu
    const hamburger = document.querySelector('.header__hamburger');
    hamburger.addEventListener('click', function () {
        document.querySelector('.header__nav').classList.toggle('expand');
        this.classList.toggle('active');
    });
});