import { Splide } from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export default function slider() {
    const splide = new Splide('.splide', {
        type: 'loop',
        drag: 'free',
        arrows: false,
        pagination: false,
        focus: 'center',
        perPage: 3,
        autoScroll: {
            speed: 1,
        },
    }).mount({ AutoScroll });

    //splide.mount();
}
