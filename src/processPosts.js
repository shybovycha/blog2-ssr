const fs = require('fs');
const path = require('path');

const { format: formatDate, parse: parseDate, isValid: isValidDate } = require('date-fns');

const matter = require('gray-matter');
const { marked } = require('marked');

const Prism = require('prismjs');

require('prismjs/components/prism-c');
require('prismjs/components/prism-cpp');
require('prismjs/components/prism-clike');
require('prismjs/components/prism-ruby');
require('prismjs/components/prism-haskell');
require('prismjs/components/prism-elm');
require('prismjs/components/prism-purescript');
require('prismjs/components/prism-antlr4');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-cmake');
require('prismjs/components/prism-clojure');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-avro-idl');
require('prismjs/components/prism-basic');
require('prismjs/components/prism-crystal');
require('prismjs/components/prism-json');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-java');
require('prismjs/components/prism-sql');
require('prismjs/components/prism-squirrel');
require('prismjs/components/prism-chaiscript');
require('prismjs/components/prism-lua');
require('prismjs/components/prism-markdown');
require('prismjs/components/prism-nasm');
require('prismjs/components/prism-markup-templating');
require('prismjs/components/prism-php');
require('prismjs/components/prism-erlang');
require('prismjs/components/prism-scala');
require('prismjs/components/prism-python');
require('prismjs/components/prism-zig');
require('prismjs/components/prism-vim');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-swift');
require('prismjs/components/prism-rust');
require('prismjs/components/prism-css');
require('prismjs/components/prism-sass');
require('prismjs/components/prism-less');
require('prismjs/components/prism-regex');
require('prismjs/components/prism-reason');
require('prismjs/components/prism-protobuf');
require('prismjs/components/prism-prolog');
require('prismjs/components/prism-ini');
require('prismjs/components/prism-go');
require('prismjs/components/prism-groovy');
require('prismjs/components/prism-git');
require('prismjs/components/prism-glsl');
require('prismjs/components/prism-flow');
require('prismjs/components/prism-elixir');
require('prismjs/components/prism-d');
require('prismjs/components/prism-ocaml');
require('prismjs/components/prism-fsharp');
require('prismjs/components/prism-diff');
require('prismjs/components/prism-handlebars');
require('prismjs/components/prism-pug');
require('prismjs/components/prism-yaml');
require('prismjs/components/prism-dot');
require('prismjs/components/prism-scss');
require('prismjs/components/prism-less');
require('prismjs/components/prism-gherkin');

// console.log('>>> PRISMJS languages:', Object.keys(Prism.languages));

marked.setOptions({
    gfm: true, // GitHub-flavoured Markdown
    xhtml: true, // self-close single tags
    smartypants: true, // dashes and ellipses

    highlight(code, language) {
        if (!Prism.languages[language]) {
            if (language) {
                console.warn(`Can't find language "${language}" for code ${code}`);
            }

            return code;
        }

        return Prism.highlight(code, Prism.languages[language], language);
    },
});

const cache = new Map();

const parsePostDate = (postPath, frontMatter) => {
    const fileDate = path.basename(postPath).replace(/^(\d{4}-\d{2}-\d{2}).+$/, '$1');
    const fallbackDate = parseDate(fileDate, 'yyyy-MM-dd', new Date());

    const frontMatterDate = frontMatter.date ? parseDate(frontMatter.date, 'yyyy-MM-dd HH:mm:ss XXXXX', new Date()) : null;

    if (frontMatterDate && isValidDate(frontMatterDate)) {
        return frontMatterDate;
    }

    if (fallbackDate && isValidDate(fallbackDate)) {
        return fallbackDate;
    }

    return new Date();
};

const loadPost = (absoluteFilePath, postDir) => {
    const postPath = path.relative(postDir, absoluteFilePath);
    const timestamp = fs.statSync(absoluteFilePath).mtimeMs;

    const cached = cache.get(postPath);

    if (cached && timestamp === cached.timestamp) {
        return cached.post;
    }

    const src = fs.readFileSync(absoluteFilePath, 'utf-8');
    const { data: frontMatter, excerpt, content } = matter(src, { excerpt: true, excerpt_separator: '<!--more-->' });

    const postLink = postPath.replace(/^(\d+)-(\d+)-(\d+)-(.+)\.md$/, '$1/$2/$3/$4.html');

    const post = {
        title: frontMatter.title,
        link: postLink,
        timestamp: parsePostDate(postPath, frontMatter),
        excerpt: marked.parse(excerpt), //.replace(/<lazyimg /g, '<lazy-img '),
        content: marked.parse(content), //.replace(/<lazyimg /g, '<lazy-img '),
    };

    cache.set(postPath, {
        timestamp,
        post
    });

    return post;
};

const getFilesRec = (dir) => {
    const result = [];
    const queue = [dir];

    while (queue.length > 0) {
        const p = queue.shift();

        const stat = fs.lstatSync(p);

        if (stat.isDirectory()) {
            fs.readdirSync(p).forEach(f => queue.push(path.join(p, f)));
        } else {
            result.push(p);
        }
    }

    return result;
};

const loadPosts = () => {
    if (cache.size > 0) {
        return Object.values(cache).sort((a, b) => b.timestamp - a.timestamp);
    }

    const postDir = path.resolve(__dirname, '../posts');

    return getFilesRec(postDir)
        .map((file) => loadPost(file, postDir))
        .sort((a, b) => b.timestamp - a.timestamp);;
};

module.exports = {
    loadPosts,
};
