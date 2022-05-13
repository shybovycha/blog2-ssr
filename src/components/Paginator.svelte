<nav class="bottom">
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

<script>
    export let pageIndex = 0;
    export let numPages = 0;
</script>

<style>
    nav.bottom {
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
</style>
