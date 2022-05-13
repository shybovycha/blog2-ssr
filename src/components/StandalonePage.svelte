<Layout>
    <article slot="content">
        {@html content}
    </article>
</Layout>

<script>
    import Layout from './Layout.svelte';

    export let content = '';
</script>