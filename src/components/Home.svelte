{#each posts as { title, timestamp, excerpt, content, link }}
    <Post title={title} timestamp={timestamp} excerpt={excerpt} content={content} link={link} baseUrl={baseUrl} isPreview />
{/each}

<script>
	import Post from './Post.svelte';

    export let posts = [];

    export let baseUrl = '';
</script>
