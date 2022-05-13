<h1>Blog</h1>

{#each posts as { title, timestamp, excerpt, content, link }}
    <Post title={title} timestamp={timestamp} excerpt={excerpt} content={content} link={link} isPreview />
{/each}

<script>
	import Post from './Post.svelte';

    export let posts = [];
</script>
