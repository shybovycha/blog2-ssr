<article>
    <h1>
        {#if isPreview}
            <a href="{baseUrl}/{link}">{ title }</a>
        {:else}
            { title }
        {/if}
    </h1>

    <Date date={timestamp} />

    {#if excerpt && isPreview}
        <div class="excerpt">{@html excerpt}</div>

        <a href="{baseUrl}/{link}" class="btn">Read more</a>
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
    export let baseUrl = '';
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
</style>
