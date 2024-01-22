import gsap from 'gsap';

export default function heroReveal() {
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
            transformOrigin: 'center center',
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
        );
}
