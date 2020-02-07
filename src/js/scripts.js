$(document).ready(function() {
    // Smooth scroll for links
    $('.smooth-scroll').click(function(e){
        e.preventDefault();
        var target = $($(this).attr('href'));
        if(target.length){
            var scrollTo = target.offset().top - 70;
            $('body, html').animate({scrollTop: scrollTo+'px'}, 800);
        }
    });

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

    // Dynamic copyright date
    $('#year').html(new Date().getFullYear());
});