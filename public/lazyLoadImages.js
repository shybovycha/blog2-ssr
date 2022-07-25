const onIntersect = entries =>
    entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => {
            const lazyImgElt = entry.target;
            const src = lazyImgElt.getAttribute('src');

            const imgElt = document.createElement('img');
            
            imgElt.src = src;
            lazyImgElt.appendChild(imgElt);

            observer.unobserve(lazyImgElt);
        });

const observer = new IntersectionObserver(onIntersect, {
    rootMargin: '200px',
    threshold: 0.5
});

const images = [...document.body.querySelectorAll('lazyimg')];

images.forEach(lazyImgElt => observer.observe(lazyImgElt));
