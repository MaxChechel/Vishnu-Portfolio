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

document.addEventListener('DOMContentLoaded', () => {
    //Split text
    const split = new SplitType('h1, .header_subtext ,.project_cms-item h3', {
        type: 'chars,words,lines',
    });
    wrapLines('h1 .line');
    wrapLines('.header_subtext .line');

    //Hero reveal
    heroReveal();

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
    let nav = navMenu;
    mm.add('(max-width: 479px)', () => {
        nav = document.querySelector('.navbar_container');
    });
    gsap.to(nav, {
        background: 'rgba(255, 255, 255, .8)',
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
        const tl = gsap.timeline();

        tl.to('.loader_main-text', {
            delay: 0.2,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.7,
            y: '0%',
            transformOrigin: 'center bottom',
            rotationX: 0,
            ease: 'power4.out',
        })
            .to('.loader_main-text', {
                delay: 0.1,
                duration: 0.6,
                transformOrigin: 'top center',
                rotationX: 2,
                filter: 'blur(10px)',
                opacity: 0,
                y: '100%',
                ease: 'power4.in',
            })
            .to('.loader', {
                delay: 0.1,
                height: '0%',
                duration: 1,
                ease: 'expo.out',
            })
            .to(
                '.loader_bottom-text',
                {
                    duration: 0.3,
                    opacity: 0,
                },
                '<0%'
            )
            .to(
                'h1 .word',
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.65,
                    y: '0%',
                    transformOrigin: 'center center',
                    rotationX: 0,
                    rotationZ: 0,
                    ease: 'power4.out',
                    stagger: { each: 0.075 },
                },
                '<20%'
            )
            .to(
                '.header_subtext .line',
                {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.55,
                    y: '0%',
                    rotationZ: 0,
                    transformOrigin: 'left bottom',
                    ease: 'power4.out',
                    stagger: { each: 0.05 },
                },
                '<30%'
            )
            .to(
                '.header_projects-list-link',
                {
                    width: '100%',
                    duration: 0.6,
                    ease: 'power4.out',
                    stagger: { each: 0.075 },
                },
                '<10%'
            )
            .to(
                '.header_projects-list-wrap .text-caption',
                {
                    y: '0%',
                    opacity: 1,
                    filter: 'blur(0px)',
                    transformOrigin: 'left bottom',
                    rotationZ: 0,
                    duration: 0.5,
                    ease: 'power4.out',
                },
                '<0%'
            )
            .to(
                '.header_projects-link-text',
                {
                    y: '0%',
                    opacity: 1,
                    transformOrigin: 'left bottom',
                    filter: 'blur(0px)',
                    rotationZ: 0,
                    duration: 0.5,
                    ease: 'power4.out',
                    stagger: { each: 0.075 },
                },
                '<0%'
            )
            .to(
                '.navbar_container',
                {
                    y: '0%',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power4.out',
                },
                '<30%'
            )
            .to(
                '.marquee_component',
                {
                    x: '0%',
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    ease: 'power4.out',
                },
                '<0%'
            );
    }
});
