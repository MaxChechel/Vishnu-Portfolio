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
        .to('.loader', {
            delay: 0.4,
            height: '0%',
            duration: 0.9,
            ease: 'expo.out',
        })
        .to(
            '.loader_main-text',
            {
                duration: 0.4,
                filter: 'blur(40px)',
                opacity: 0,
                ease: 'power4.out',
            },
            '<'
        )
        .to(
            '.loader_bottom-text',
            {
                duration: 0.4,
                opacity: 0,
            },
            '<'
        );
}
