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

const BASE_URL = '/blog2-ssr';
const DOMAIN = 'https://shybovycha.github.io';

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
    const { css: { code: css } } = HomePage.render({ posts, pageIndex: pageIdx, numPages: postPages.length, baseUrl: BASE_URL });
    const { html } = HomePage.render({ posts, pageIndex: pageIdx, numPages: postPages.length, baseUrl: BASE_URL, css });

    const fileName = pageIdx === 0 ? 'index.html' : `page${pageIdx + 1}.html`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, `<style>${css.code}</style>` + html);

    console.log(`Processed index page #${pageIdx + 1} / ${postPages.length}`);
});

// specific posts
posts.forEach((post) => {
    const { css: { code: css } } = PostPage.render({ ...post, baseUrl: BASE_URL });
    const { html } = PostPage.render({ ...post, css, baseUrl: BASE_URL });

    const filePath = path.join(OUTPUT_DIR, post.link);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);

    console.log('Processed post', filePath);
});

// standalone pages
const pages = getFilesRec(PAGES_DIR);

pages.forEach((pageFilename) => {
    const pageSrc = fs.readFileSync(pageFilename, 'utf-8');

    const { excerpt: { title }, content } = processContent(pageSrc);

    const { css: { code: css } } = StandalonePage.render({ content, baseUrl: BASE_URL });
    const { html } = StandalonePage.render({ content, css, title, baseUrl: BASE_URL });

    const fileName = pageFilename.replace(PAGES_DIR, '').replace(/\..+$/, '.html');
    const filePath = path.join(OUTPUT_DIR, fileName);

    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html);

    console.log('Processed page', filePath);
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

// generate sitemap and robots.txt
const robots = `
User-agent: *
Allow: /
Sitemap: ${DOMAIN}${BASE_URL}/sitemap.txt
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'robots.txt'), robots);

const sitemap = [
    ...(posts.map(({ link }) => link)),
    ...(pages.map((pageFilename) => pageFilename.replace(PAGES_DIR, '').replace(/\..+$/, '.html'))),
    ...(postPages.map((_, pageIdx) => pageIdx === 0 ? 'index.html' : `page${pageIdx + 1}.html`)),
].map((path) => `${DOMAIN}${BASE_URL}/${path}`).join('\n');

fs.writeFileSync(path.join(OUTPUT_DIR,'sitemap.txt'), sitemap);
