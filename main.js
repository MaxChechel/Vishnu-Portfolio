import Lenis from '@studio-freight/lenis';
import imagesLoaded from 'imagesloaded';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flip from 'gsap/dist/Flip';

const worksLink = document.querySelector('#works-link');
const contactLink = document.querySelector('#contact-link');
const aboutLink = document.querySelector('#about-link');
const aboutMenuClose = document.querySelector('.about_top-row .button');
const aboutOverlay = document.querySelector('.bg-overlay');
const navLinks = document.querySelectorAll('.navbar_link');
const navLinkShape = document.querySelector('.navbar_link-shape');
const navMenu = document.querySelector('.navbar_menu');
const aboutMenu = document.querySelector('.about_component');

gsap.registerPlugin(ScrollTrigger, Flip);

let mm = gsap.matchMedia();

document.addEventListener('DOMContentLoaded', () => {
    //Nav menu bg change on scroll
    gsap.to(navMenu, {
        background: 'rgba(255, 255, 255, .8)',
        duration: 0.6,
        scrollTrigger: {
            trigger: navMenu,
            start: '+=50',
            toggleActions: 'play none none reverse',
        },
    });

    //Window to top on page refresh
    let isRefreshing = false;
    window.addEventListener('beforeunload', function () {
        isRefreshing = true;
    });
    window.addEventListener('unload', function () {
        if (isRefreshing) {
            window.scrollTo(0, 0);
        }
    });
    let lenis;
    imagesLoaded('.page-wrapper', () => {
        lenis = new Lenis({
            duration: 1.1,
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

    mm.add('(hover:hover)', () => {
        navLinks.forEach(function (link) {
            link.addEventListener('mouseenter', function () {
                const state = Flip.getState(navLinkShape, {
                    props: 'opacity',
                    simple: true,
                });
                navLinkShape.classList.add('is-active');

                this.appendChild(navLinkShape);

                Flip.from(state, {
                    absolute: true,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            });
        });

        navMenu.addEventListener('mouseleave', function () {
            const state = Flip.getState(navLinkShape, {
                props: 'opacity',
                simple: true,
            });
            navLinkShape.classList.remove('is-active');
            Flip.from(state, {
                absolute: true,
                duration: 0.3,
                ease: 'power2.out',
                scale: true,
            });
        });
    });

    //About menu
    const aboutMenuOpenTl = gsap.timeline({ paused: true });
    const aboutMenuCloseTl = gsap.timeline({ paused: true });

    gsap.set('[data-about-inner]', {
        x: '3%',
        opacity: 0,
    });

    aboutMenuOpenTl
        .to(aboutMenu, {
            width: '100%',
            duration: 1.5,
            ease: 'power3.out',
        })
        .to(
            '.bg-overlay',
            {
                opacity: 1,
                duration: 0.6,
                pointerEvents: 'all',
            },
            0
        )
        .to(
            '[data-about-inner]',
            {
                opacity: 1,
                x: '0%',
                duration: 0.9,
                ease: 'power2.out',
                stagger: { amount: 0.5 },
            },
            0.15
        );

    aboutMenuCloseTl
        .to(aboutMenu, {
            width: '0%',
            duration: 0.5,
            ease: 'power3.out',
        })
        .to(
            '[data-about-inner]',
            {
                opacity: 0,
                x: '3%',
                duration: 0.7,
                ease: 'power2.out',
            },
            0.2
        )
        .to(
            '.bg-overlay',
            {
                opacity: 0,
                duration: 0.4,
                pointerEvents: 'none',
            },
            '<75%'
        );

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutMenuOpenTl.restart();
        lenis.stop();
    });
    aboutMenuClose.addEventListener('click', (e) => {
        e.preventDefault();
        aboutMenuCloseTl.restart();
        lenis.start();
    });
    aboutOverlay.addEventListener('click', (e) => {
        aboutMenuCloseTl.restart();
        lenis.start();
    });
    //Accessibility for about
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            aboutMenuCloseTl.restart();
            lenis.start();
            aboutLink.focus();
        }
    });
});
