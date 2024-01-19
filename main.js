import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const worksLink = document.querySelector('#works-link');
const contactLink = document.querySelector('#contact-link');

gsap.registerPlugin('ScrollTrigger');

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(1 - t, 4)),
        direction: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    //Scroll to for navigation links on click
    worksLink.addEventListener('click', () => {
        lenis.scrollTo('#projects');
    });
    contactLink.addEventListener('click', () => {
        lenis.scrollTo('#bottom');
    });
});
