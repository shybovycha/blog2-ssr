const fsPromise = require('fs/promises');
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

// index pages
const posts = loadPosts(POSTS_DIR);

const postPages = chunk(posts, PAGE_SIZE);

const pages = getFilesRec(PAGES_DIR);

const processIndexPages = () =>
    Promise.all(
        postPages.map((posts, pageIdx) => {
            const { css: { code: css } } = HomePage.render({ posts, pageIndex: pageIdx, numPages: postPages.length, baseUrl: BASE_URL });
            const { html } = HomePage.render({ posts, pageIndex: pageIdx, numPages: postPages.length, baseUrl: BASE_URL, css });

            const fileName = pageIdx === 0 ? 'index.html' : `page${pageIdx + 1}.html`;
            const filePath = path.join(OUTPUT_DIR, fileName);

            const dir = path.dirname(filePath);

            return fsPromise.mkdir(dir, { recursive: true })
                .then(() => fsPromise.writeFile(filePath, `<style>${css.code}</style>` + html))
                .then(() => console.log(`Processed index page #${pageIdx + 1} / ${postPages.length}`));
        })
    );

// specific posts
const processPostPages = () =>
    Promise.all(
        posts.map((post) => {
            const { css: { code: css } } = PostPage.render({ ...post, baseUrl: BASE_URL });
            const { html } = PostPage.render({ ...post, css, baseUrl: BASE_URL });

            const filePath = path.join(OUTPUT_DIR, post.link);
            const dir = path.dirname(filePath);

            return fsPromise.mkdir(dir, { recursive: true })
                .then(() => fsPromise.writeFile(filePath, html))
                .then(() => console.log('Processed post', filePath));
        })
    );

// standalone pages
const processStandalonePages = () =>
    Promise.all(
        pages.map((pageFilename) => {
            return fsPromise.readFile(pageFilename, 'utf-8')
                .then(pageSrc => {
                    const { excerpt: { title }, content } = processContent(pageSrc);

                    const { css: { code: css } } = StandalonePage.render({ content, baseUrl: BASE_URL });
                    const { html } = StandalonePage.render({ content, css, title, baseUrl: BASE_URL });

                    const fileName = pageFilename.replace(PAGES_DIR, '').replace(/\..+$/, '.html');
                    const filePath = path.join(OUTPUT_DIR, fileName);

                    const dir = path.dirname(filePath);

                    return fsPromise.mkdir(dir, { recursive: true })
                        .then(() => fsPromise.writeFile(filePath, html))
                        .then(() => console.log('Processed page', filePath));
                });
        })
    );

// copy public files
const processPublicFiles = () =>
    Promise.all(
        getFilesRec(PUBLIC_DIR).map((filePath) => {
            const filename = path.basename(filePath);
            const sourcePath = path.dirname(filePath.replace(PUBLIC_DIR, ''));
            const outputDirPath = path.join(OUTPUT_DIR, sourcePath);
            const outputPath = path.join(outputDirPath, filename);

            fsPromise.mkdir(outputDirPath, { recursive: true })
                .then(() => fsPromise.copyFile(filePath, outputPath));
        })
    );

// copy PrismJS theme CSS
const processAdditionalFiles = () => {
    const prismThemePath = path.join(__dirname, '..', '..', 'node_modules', 'prismjs', 'themes', `${PRISM_THEME}.min.css`);

    fsPromise.copyFile(prismThemePath, path.join(OUTPUT_DIR, 'prism.css'));
};

// generate sitemap and robots.txt
const processRobots = () => {
    const robots = `
    User-agent: *
    Allow: /
    Sitemap: ${DOMAIN}${BASE_URL}/sitemap.txt
    `;

    return fsPromise.writeFile(path.join(OUTPUT_DIR, 'robots.txt'), robots);
};

const processSitemap = () => {
    const sitemap = [
        ...(posts.map(({ link }) => link)),
        ...(pages.map((pageFilename) => pageFilename.replace(PAGES_DIR, '').replace(/\..+$/, '.html'))),
        ...(postPages.map((_, pageIdx) => pageIdx === 0 ? 'index.html' : `page${pageIdx + 1}.html`)),
    ].map((path) => `${DOMAIN}${BASE_URL}/${path}`).join('\n');

    return fsPromise.writeFile(path.join(OUTPUT_DIR,'sitemap.txt'), sitemap);
};

// clean
const clean = () =>
    fsPromise.rm(OUTPUT_DIR, { recursive: true });

clean().then(() =>
    Promise.all([
        processIndexPages(),
        processPostPages(),
        processStandalonePages(),
        processPublicFiles(),
        processAdditionalFiles(),
        processRobots(),
        processSitemap(),
    ]))
    .then(() => console.log('[DEBUG] Done'))
    .catch(e => console.error('[ERROR] Failed to build', e));
