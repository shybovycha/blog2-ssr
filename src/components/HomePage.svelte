<Layout title={title} css={css} baseUrl={baseUrl}>
    <Home slot="content" posts={posts} pageIndex={pageIndex} numPages={numPages} baseUrl={baseUrl}/>

    <Paginator pageIndex={pageIndex} numPages={numPages} slot="footer" baseUrl={baseUrl}/>
</Layout>

<script>
    import Layout from './Layout.svelte';
    import Paginator from './Paginator.svelte';
    import Home from './Home.svelte';

    export let posts = [];
    export let pageIndex = 0;
    export let numPages = 0;

    export let title = 'Home';
    export let css = null;
    
    export let baseUrl = '';
</script>
