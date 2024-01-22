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
        .to(
            '.loader_main-text',
            {
                delay: 0.5,
                duration: 0.6,
                transformOrigin: 'center top',
                rotationX: 2,
                filter: 'blur(20px)',
                opacity: 0,
                y: '100%',
                ease: 'power4.out',
            },
            '<'
        )
        .to('.loader', {
            height: '0%',
            duration: 1,
            ease: 'expo.out',
        })
        .to(
            '.loader_bottom-text',
            {
                duration: 0.4,
                opacity: 0,
            },
            '<'
        );
}
