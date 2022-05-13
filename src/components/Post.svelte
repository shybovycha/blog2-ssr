<article>
    <h1>
        {#if isPreview}
            <a href="/{link}">{ title }</a>
        {:else}
            { title }
        {/if}
    </h1>

    <Date date={timestamp} />

    {#if excerpt && isPreview}
        <div class="excerpt">{@html excerpt}</div>

        <a href="/{link}" class="btn">Read more</a>
    {:else}
        <div class="content">{@html content}</div>
    {/if}
</article>

<script>
    import Date from './Date.svelte';

    export let title;
    export let content;
    export let excerpt;
    export let timestamp;
    export let link;
    export let isPreview = false;
</script>

<style>
    .btn {
        display: inline-flex;
        font-size: 18px;
        color: #fff;
        background: var(--primary-color);
        padding: 10px;
        border-radius: 8px
    }

    .btn:hover {
        background: var(--primary-accent-color);
        color: #fff
    }

    article {
        margin-bottom: 1em;
        padding: 1em;
        background: var(--article-background);
        border-radius: 5px;
        font-size: 18px
    }

    @media screen and (max-width: 1340px) {
        article {
            border-radius: 0
        }
    }
</style>
