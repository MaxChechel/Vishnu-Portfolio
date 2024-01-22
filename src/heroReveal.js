import gsap from 'gsap';

export default function heroReveal() {
    const tl = gsap.timeline();

    tl.to('.loader_main-text', {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        y: '0%',
        transformOrigin: 'center bottom',
        rotationX: 0,
    })
        .to('.loader', {
            delay: 0.4,
            height: '0%',
            duration: 1,
            ease: 'power3.out',
        })
        .to(
            '.loader_main-text',
            {
                duration: 0.5,
                filter: 'blur(40px)',
                opacity: 0,
                ease: 'power4.in',
            },
            '<10%'
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
