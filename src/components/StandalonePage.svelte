<Layout title={title} css={css} baseUrl={baseUrl}>
    <article slot="content">
        {@html content}
    </article>
</Layout>

<script>
    import Layout from './Layout.svelte';

    export let content = '';

    export let title = 'Page';
    export let css = null;

    export let baseUrl = '';
</script>