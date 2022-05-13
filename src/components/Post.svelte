<article>
    <h2><a href="/{link}">{ title }</a></h2>
    <time>{timestamp}</time>

    {#if excerpt && isPreview}
        <div class="excerpt">{@html excerpt}</div>

        <a href="/{link}" class="btn">Read more</a>
    {:else}
        <div class="content">{@html content}</div>
    {/if}
</article>

{#if !isPreview}
    {@html `<script src="/lazyLoadImages.js"></script>`}
{/if}

<script>
    export let title;
    export let content;
    export let excerpt;
    export let timestamp;
    export let link;
    export let isPreview = false;
</script>
