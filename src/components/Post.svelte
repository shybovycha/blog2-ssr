<article>
    <h2><a href="/{link}">{ title }</a></h2>

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
    img {
        max-width: 100%
    }

    pre {
        overflow: scroll
    }

    pre.highlight {
        overflow: auto;
        padding: .5em
    }

    button.btn {
        border: none
    }

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

    h1 {
        font-size: 36px
    }

    h2 {
        font-size: 24px
    }

    h3 {
        font-size: 20px
    }

    h1,
    h2,
    h3 {
        margin-top: 0
    }

    kbd {
        border-radius: 8px;
        background: #fff;
        padding: 10px;
        box-shadow: 1px 4px #dedede;
        text-shadow: 1px 3px #dedede;
        display: inline-flex;
        margin: 4px 0;
        border: 1px solid #dedede
    }

    @media screen and (max-width: 1340px) {
        :root {
            --left-side: 0px;
            --right-side: 0px
        }

        body {
            background: var(--background-color)
        }

        nav.top .links {
            justify-content: space-around
        }

        main article {
            border-radius: 0
        }
    }
</style>
