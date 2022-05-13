<Layout>
    <Post title={title} content={content} timestamp={timestamp} slot="content"/>
</Layout>

<script>
    import Layout from './Layout.svelte';
    import Post from './Post.svelte';

    export let title;
    export let content;
    export let timestamp;
</script>
