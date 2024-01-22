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
                duration: 0.6,
                y: '0%',
                transformOrigin: 'center center',
                rotationX: 0,
                rotationZ: 0,
                ease: 'power4.out',
                stagger: { each: 0.075 },
            },
            '<20%'
        );
}
