import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export default function slider() {
    const splide = new Splide('.splide', {
        type: 'loop',
        drag: 'free',
        arrows: false,
        gap: '2rem',
        pagination: false,
        focus: 'center',
        perPage: 3,
        autoScroll: {
            speed: 1,
        },
        breakpoints: {
            640: {
                perPage: 2,
                gap: '1rem',
            },
        },
    }).mount({ AutoScroll });

    //splide.mount();
}
