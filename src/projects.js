import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function projectSections(section) {
    gsap.set('.project_cms-item h3 .char', { opacity: 0.25 });
    section.forEach((section, i) => {
        const slug = section.getAttribute('data-project-slug');
        const currentOrder = section.querySelector('.text-caption:first-child');
        const sectionsCount = section.querySelector('.text-caption:last-child');
        //Set order
        currentOrder.textContent = `0${i + 1}`;
        sectionsCount.textContent = `0${section.length}`;

        //Set id
        section.setAttribute('id', slug);

        //ScrollTrigger for headings reveal
        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            once: true,
            onEnter: () => {
                gsap.to(section.querySelectorAll('.char'), {
                    opacity: 1,
                    stagger: { each: 0.01 },
                });
            },
        });
    });
}
