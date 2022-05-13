const fs = require('fs');
const path = require('path');

const { chunk } = require('lodash');

const { loadPosts, getFilesRec, processContent } = require('./processPosts');

const registerSvelte = require('svelte/register');

registerSvelte({
    customElement: false, // otherwise slots & CSS won't work
    preserveComments: false,
    css: true,
});

const HomePage = require('../components/HomePage.svelte').default;
const PostPage = require('../components/PostPage.svelte').default;
const StandalonePage = require('../components/StandalonePage.svelte').default;

const PAGE_SIZE = 10;

const BASE_DIR = path.join(__dirname, '..', '..');
const OUTPUT_DIR = path.join(BASE_DIR, 'dist');
const PAGES_DIR = path.join(BASE_DIR, 'pages');
const POSTS_DIR = path.join(BASE_DIR, 'posts');
const PUBLIC_DIR = path.join(BASE_DIR, 'public');
const PRISM_THEME = 'prism';

// clean
if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
}

// index pages
const posts = loadPosts(POSTS_DIR);

const postPages = chunk(posts, PAGE_SIZE);

postPages.forEach((posts, pageIdx) => {
    const { html, css } = HomePage.render({ posts, pageIndex: pageIdx, numPages: postPages.length });

    const fileName = pageIdx === 0 ? 'index.html' : `page${pageIdx + 1}.html`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, `<style>${css.code}</style>` + html);
});

// specific posts
posts.forEach((post) => {
    const { html, css } = PostPage.render({ ...post });

    const filePath = path.join(OUTPUT_DIR, post.link);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, `<style>${css.code}</style>` + html);
});

// standalone pages
const pages = getFilesRec(PAGES_DIR);

pages.forEach((pageFilename) => {
    const pageSrc = fs.readFileSync(pageFilename, 'utf-8');

    const { content } = processContent(pageSrc);

    const { html, css } = StandalonePage.render({ content });

    const fileName = pageFilename.replace(PAGES_DIR, '').replace(/\..+$/, '.html');
    const filePath = path.join(OUTPUT_DIR, fileName);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, `<style>${css.code}</style>` + html);
});

// copy public files
getFilesRec(PUBLIC_DIR).forEach((filePath) => {
    const filename = path.basename(filePath);
    const sourcePath = path.dirname(filePath.replace(PUBLIC_DIR, ''));
    const outputDirPath = path.join(OUTPUT_DIR, sourcePath);
    const outputPath = path.join(outputDirPath, filename);

    if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
    }

    fs.copyFileSync(filePath, outputPath);
});

// copy PrismJS theme CSS
const prismThemePath = path.join(__dirname, '..', '..', 'node_modules', 'prismjs', 'themes', `${PRISM_THEME}.min.css`);
fs.copyFileSync(prismThemePath, path.join(OUTPUT_DIR, 'prism.css'));
