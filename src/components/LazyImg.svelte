<svelte:options tag="lazy-img" />

<img data-src="{ src }" alt="{ alt }" bind:this={ imgElt } />

<script>
    import { onMount } from 'svelte';

    console.log('HELLO IMAGE', src);

    onMount(() => {
        const onIntersect = entries => 
            entries
                .filter(entry => entry.isIntersecting)
                .forEach(entry => {
                    // const imgElt = entry.target;
                    const src = imgElt.dataset.src;

                    imgElt.src = src;
                    imgElt.removeAttribute('data-src');

                    observer.unobserve(imgElt);
                });

        const observer = new IntersectionObserver(onIntersect, {
            rootMargin: '200px',
            threshold: 0.5
        });
    });

    let imgElt = null;

    export let src = "";
    export let alt = "";
</script>
