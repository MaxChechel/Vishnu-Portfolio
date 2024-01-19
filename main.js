import Lenis from '@studio-freight/lenis';

const worksLink = document.querySelector('#works-link');
const contactLink = document.querySelector('#contact-link');

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(1 - t, 4)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 1.5,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    //Scroll to for navigation links on click
    worksLink.addEventListener('click', () => {
        lenis.scrollTo('#projects');
    });
    contactLink.addEventListener('click', () => {
        lenis.scrollTo('#bottom');
    });
});
