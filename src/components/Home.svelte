{#each posts as { title, timestamp, excerpt, content, link }}
    <Post title={title} timestamp={timestamp} excerpt={excerpt} content={content} link={link} isPreview />
{/each}

<script>
	import Post from './Post.svelte';

    export let posts = [];
</script>

<style>
    :root {
        --left-side: 200px;
        --right-side: 200px;
        --nav-height: 64px;
        --background-color: #FFD166;
        --primary-color: #06D6A0;
        --primary-accent-color: #049F76;
        --secondary-color: #118AB2;
        --sub-color: #073B4C;
        --nav-background: #fff;
        --article-background: #fff
    }

    body {
        padding: 0;
        margin: 0;
        color: var(--sub-color);
        background: var(--background-color);
        font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 18px;
        display: grid;
        grid-template: var(--nav-height) auto var(--nav-height)/var(--left-side) calc(100% - var(--left-side) - var(--right-side)) var(--right-side)
    }

    nav.top .links {
        grid-area: 1/2/2/3;
        display: flex;
        align-items: center
    }

    nav.top .links a {
        margin-right: 1em
    }

    a {
        color: var(--secondary-color);
        text-decoration: none
    }

    a:hover,
    a:active {
        color: var(--sub-color)
    }

    footer {
        grid-area: 3/1/4/4;
        background: #fff;
        display: inline-grid;
        grid-template: 100%/var(--left-side) auto var(--right-side)
    }

    footer nav {
        grid-area: 1/2/2/3;
        display: inline-grid;
        grid-template: 1fr / 1fr 1fr 1fr
    }

    footer nav div {
        display: flex;
        align-items: center
    }

    footer nav .prev {
        grid-area: 1/1/2/2;
        justify-content: flex-start
    }

    footer nav .current {
        grid-area: 1/2/2/3;
        justify-content: center
    }

    footer nav .next {
        grid-area: 1/3/2/4;
        justify-content: flex-end
    }

    nav.top {
        background-color: var(--nav-background);
        display: inline-grid;
        grid-template: 100%/var(--left-side) auto var(--right-side);
        grid-area: 1/1/2/4
    }

    main {
        grid-area: 2/2/3/3;
        margin-top: 1em;
        display: flex;
        flex-direction: column
    }
</style>
