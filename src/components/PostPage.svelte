<Layout title={title} css={css}>
    <Post title={title} content={content} timestamp={timestamp} slot="content"/>
</Layout>

<script>
    import Layout from './Layout.svelte';
    import Post from './Post.svelte';

    export let title;
    export let content;
    export let timestamp;

    export let css = null;
</script>
