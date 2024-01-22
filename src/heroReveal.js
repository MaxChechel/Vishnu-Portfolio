import gsap from 'gsap';

export default function heroReveal() {
    const tl = gsap.timeline();

    tl.to('.loader_main-text', {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.4,
    });
}
