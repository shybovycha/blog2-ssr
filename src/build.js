const fs = require('fs');
const path = require('path');

const { chunk } = require('lodash');

const { loadPosts } = require('./processPosts');

const registerSvelte = require('svelte/register');

registerSvelte({
    css: true,
    customElement: true,
    preserveComments: false,
});

// const LazyImg = require('../components/LazyImg.svelte').default;

const Home = require('./components/Home.svelte').default;
const Post = require('./components/Post.svelte').default;

const posts = loadPosts();

// index pages
const pageSize = 10;

const pages = chunk(posts, pageSize);

pages.forEach((posts, pageIdx) => {
    const { html } = Home.render({ posts });

    const fileName = pageIdx === 0 ? 'index.html' : `page${pageIdx + 1}.html`;
    const filePath = path.join(__dirname, '..', 'dist', fileName);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);
});

// specific posts
posts.forEach((post) => {
    const { html } = Post.render({ ...post });

    const filePath = path.join(__dirname, '..', 'dist', post.link);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);
});
