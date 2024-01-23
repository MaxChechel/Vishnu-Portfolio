import Lenis from '@studio-freight/lenis';
import imagesLoaded from 'imagesloaded';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flip from 'gsap/dist/Flip';

import wrapLines from './src/utils';
import projectSections from './src/projects';
import heroReveal from './src/heroReveal';
import slider from './src/slider';

const worksLink = document.querySelector('#works-link');
const contactLink = document.querySelector('#contact-link');
const aboutLink = document.querySelector('#about-link');
const aboutMenuClose = document.querySelector('.about_top-row .button');
const aboutOverlay = document.querySelector('.bg-overlay');
const navLinks = document.querySelectorAll('.navbar_link');
const navLinkShape = document.querySelector('.navbar_link-shape');
const navMenu = document.querySelector('.navbar_menu');
const aboutMenu = document.querySelector('.about_component');
const statsSection = document.querySelector('.section_stats');

const projectsLinkListItem = document.querySelectorAll(
    '.header_projects-list-item'
);
const projectsSections = document.querySelectorAll('.project_cms-item');

gsap.registerPlugin(ScrollTrigger, Flip);

let mm = gsap.matchMedia();
let lenis;

let heroRevealTl;

document.addEventListener('DOMContentLoaded', () => {
    //Split text
    const split = new SplitType('h1, .header_subtext ,.project_cms-item h3', {
        type: 'chars,words,lines',
    });
    wrapLines('h1 .line');
    wrapLines('.header_subtext .line');

    //Hero reveal
    heroRevealTl = heroReveal();
    heroRevealTl.play();

    //Projects sections
    projectSections(projectsSections);
    //Projects links
    projectsLinkListItem.forEach((link) => {
        const slug = link.getAttribute('data-project-slug');
        link.addEventListener('click', () => {
            lenis.scrollTo(`#${slug}`);
        });
    });

    //Nav menu bg change on scroll
    let nav = document.querySelector('.navbar_menu-blur');
    mm.add('(max-width: 479px)', () => {
        nav = document.querySelector('.navbar_container');
    });
    gsap.to(nav, {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
            trigger: nav,
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

    //Slider
    //Initialize  slider
    slider();

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

        //Stats section
        const countNums = statsSection.querySelectorAll('[data-count]');
        //Get number that should be displayed
        let followersNum = statsSection.querySelector(
            "[data-count='followers']"
        ).textContent;
        let likesNum = statsSection.querySelector(
            "[data-count='likes']"
        ).textContent;
        let shotssNum = statsSection.querySelector(
            "[data-count='shots']"
        ).textContent;
        //Set start number
        countNums.forEach((item) => {
            let startNum;
            if (item.getAttribute('data-count') === 'followers') startNum = 10;
            if (item.getAttribute('data-count') === 'likes') startNum = 70;
            if (item.getAttribute('data-count') === 'shots') startNum = 240;

            item.textContent = startNum;
        });
        ScrollTrigger.create({
            trigger: statsSection,
            start: 'top 40%',
            once: true,
            onEnter: () => {
                countNums.forEach((item) => {
                    let finalNum;
                    if (item.getAttribute('data-count') === 'followers')
                        finalNum = followersNum;
                    if (item.getAttribute('data-count') === 'likes')
                        finalNum = likesNum;
                    if (item.getAttribute('data-count') === 'shots')
                        finalNum = shotssNum;
                    console.log(finalNum);
                    gsap.to(item, {
                        duration: 1.5,
                        innerHTML: finalNum,
                        snap: 'innerHTML',
                        ease: 'none',
                        onUpdate: function () {
                            item.innerHTML = Math.ceil(
                                this.targets()[0].innerHTML
                            );
                        },
                    });
                });
            },
        });

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
    let documentWidth = window.innerWidth;
    let aboutMenuTime = documentWidth / 1000;
    const aboutMenuOpenTl = gsap.timeline({ paused: true });
    const aboutMenuCloseTl = gsap.timeline({ paused: true });

    gsap.set('[data-about-inner]', {
        x: '3%',
        opacity: 0,
    });

    aboutMenuOpenTl
        .to(aboutMenu, {
            width: '100%',
            duration: aboutMenuTime,
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
                duration: 0.5,
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
            '<85%'
        );

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (!aboutMenu.classList.contains('is-opened')) {
            aboutMenu.classList.add('is-opened');
            aboutMenuOpenTl.restart();
            lenis.stop();
        }
    });
    aboutMenuClose.addEventListener('click', (e) => {
        e.preventDefault();
        if (
            !aboutMenuOpenTl.isActive() &&
            aboutMenu.classList.contains('is-opened')
        ) {
            aboutMenu.classList.remove('is-opened');
            aboutMenuCloseTl.restart();
            lenis.start();
            aboutLink.focus();
        }
    });
    aboutOverlay.addEventListener('click', (e) => {
        if (
            !aboutMenuOpenTl.isActive() &&
            aboutMenu.classList.contains('is-opened')
        ) {
            aboutMenu.classList.remove('is-opened');
            aboutMenuCloseTl.restart();
            lenis.start();
            aboutLink.focus();
        }
    });
    //Accessibility for about
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            if (
                !aboutMenuOpenTl.isActive() &&
                aboutMenu.classList.contains('is-opened')
            ) {
                aboutMenu.classList.remove('is-opened');
                aboutMenuCloseTl.restart();
                lenis.start();
                aboutLink.focus();
            }
        }
    });
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Browser tab is hidden');
    } else {
        console.log('Browser tab is visible');
        heroRevealTl.restart();
    }
});
