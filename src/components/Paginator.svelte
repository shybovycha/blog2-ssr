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

<script>
    export let pageIndex = 0;
    export let numPages = 0;
</script>