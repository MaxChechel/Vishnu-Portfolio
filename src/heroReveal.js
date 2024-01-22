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
            height: '0%',
            duration: 1,
            ease: 'power3.out',
        })
        .to(
            '.loader_main-text',
            {
                y: '-100%',
                duration: 0.5,
                opacity: 0,
            },
            '<40%'
        );
}
