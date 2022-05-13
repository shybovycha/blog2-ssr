const onIntersect = entries =>
    entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => {
            const imgElt = entry.target;
            const src = imgElt.dataset.src;

            imgElt.src = src;
            imgElt.removeAttribute('data-src');

            observer.unobserve(imgElt);
        });

const observer = new IntersectionObserver(onIntersect, {
    rootMargin: '200px',
    threshold: 0.5
});

const images = [...document.body.querySelectorAll('img[data-src]')];

console.log(images);

images.forEach(imgElt => observer.observe(imgElt));
