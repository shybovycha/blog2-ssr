const onIntersect = entries =>
    entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => {
            const lazyImgElt = entry.target;
            const src = lazyImgElt.dataset.src;

            lazyImgElt.src = src;

            observer.unobserve(lazyImgElt);
        });

const observer = new IntersectionObserver(onIntersect, {
    rootMargin: '200px',
    threshold: 0.5
});

const images = [...document.body.querySelectorAll('img[data-src]')];

images.forEach(lazyImgElt => observer.observe(lazyImgElt));
