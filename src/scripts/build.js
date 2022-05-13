const fs = require('fs');
const path = require('path');

const { chunk } = require('lodash');

const { loadPosts } = require('./processPosts');

const registerSvelte = require('svelte/register');

registerSvelte({
    customElement: true,
    preserveComments: false,
});

const Layout = require('../components/Layout.svelte').default;
const Paginator = require('../components/Paginator.svelte').default;

const HomePage = require('../components/HomePage.svelte').default;
const PostPage = require('../components/PostPage.svelte').default;

const Home = require('../components/Home.svelte').default;
const Post = require('../components/Post.svelte').default;

const posts = loadPosts();

// index pages
const pageSize = 10;

const pages = chunk(posts, pageSize);

pages.forEach((posts, pageIdx) => {
    const { html, css } = Layout.render({}, { $$slots: { content: () => Home.render({ posts }).html, footer: () => Paginator.render({ pageIndex: pageIdx, numPages: pages.length }) } });

    const fileName = pageIdx === 0 ? 'index.html' : `page${pageIdx + 1}.html`;
    const filePath = path.join(__dirname, '..', '..', 'dist', fileName);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // console.log('>>> CSS:', css);

    fs.writeFileSync(filePath, html);
});

// specific posts
posts.forEach((post) => {
    const { html, css } = PostPage.render({ ...post });

    const filePath = path.join(__dirname, '..', '..', 'dist', post.link);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // console.log('>>> CSS:', css);

    fs.writeFileSync(filePath, html);
});
