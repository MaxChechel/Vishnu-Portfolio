//Wrap lines from in overflow-hidden container
export default function wrapLines(selector) {
    document.querySelectorAll(selector).forEach((line) => {
        const wrapEl = document.createElement('div');
        wrapEl.classList = 'overflow-hidden';
        line.parentNode.appendChild(wrapEl);
        wrapEl.appendChild(line);
    });
}
