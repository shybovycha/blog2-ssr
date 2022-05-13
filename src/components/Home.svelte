<nav class="top">
    <div class="links">
        <a class="nav-link nav-item" href="/">Home</a>
        <a class="nav-link nav-item" href="/about/">About</a>
    </div>
</nav>

<main>
    {#each posts as { title, timestamp, excerpt, content, link }}
        <Post title={title} timestamp={timestamp} excerpt={excerpt} content={content} link={link} isPreview />
    {/each}
</main>

<footer>
    <nav>
        {#if pageIndex > 0}
            <div class="prev">
                <a href="/page{ pageIndex }.html" class="prev">&larr; Previous page</a>
            </div>
        {/if}

        <div class="current">Page #{ pageIndex + 1 } of { numPages }</div>

        {#if pageIndex < numPages - 1}
            <div class="next">
                <a href="/page{ pageIndex + 2 }.html" class="next">Next page &rarr;</a>
            </div>
        {/if}
    </nav>
</footer>

{@html `<script src="/lazyLoadImages.js"></script>`}

<script>
	import Post from './Post.svelte';

    export let posts = [];
    export let pageIndex = 0;
    export let numPages = 0;
</script>
