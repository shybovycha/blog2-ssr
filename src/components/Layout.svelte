<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <nav class="top">
        <slot name="header">
            <div class="links">
                <a class="nav-link nav-item" href="/">Home</a>
                <a class="nav-link nav-item" href="/about/">About</a>
            </div>
        </slot>
    </nav>

    <main>
        <slot name="content">
            No content
        </slot>
    </main>

    {#if $$slots.footer}
        <footer>
            <slot name="footer"></slot>
        </footer>
    {/if}

    {@html `<script src="/lazyLoadImages.js"></script>`}
    {@html `<link rel="stylesheet" href="/shared.css" />`}
    {@html `<link rel="stylesheet" href="/prism.css" />`}
</body>
</html>

<style>
    :root {
        --left-side: 200px;
        --right-side: 200px;
        --nav-height: 64px;
        --background-color: #FFD166;
        --primary-color: #06D6A0;
        --primary-accent-color: #049F76;
        --secondary-color: #118AB2;
        --sub-color: #073B4C;
        --nav-background: #fff;
        --article-background: #fff
    }

    body {
        padding: 0;
        margin: 0;
        color: var(--sub-color);
        background: var(--background-color);
        font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 18px;
        display: grid;
        grid-template: var(--nav-height) auto var(--nav-height)/var(--left-side) calc(100% - var(--left-side) - var(--right-side)) var(--right-side)
    }

    nav.top .links {
        grid-area: 1/2/2/3;
        display: flex;
        align-items: center
    }

    nav.top .links a {
        margin-right: 1em
    }

    a {
        color: var(--secondary-color);
        text-decoration: none
    }

    a:hover,
    a:active {
        color: var(--sub-color)
    }

    footer {
        grid-area: 3/1/4/4;
        background: #fff;
        display: inline-grid;
        grid-template: 100%/var(--left-side) auto var(--right-side)
    }

    nav.top {
        background-color: var(--nav-background);
        display: inline-grid;
        grid-template: 100%/var(--left-side) auto var(--right-side);
        grid-area: 1/1/2/4
    }

    main {
        grid-area: 2/2/3/3;
        margin-top: 1em;
        display: flex;
        flex-direction: column
    }

    @media screen and (max-width: 1340px) {
        :root {
            --left-side: 0px;
            --right-side: 0px
        }

        body {
            background: var(--background-color)
        }

        nav.top .links {
            justify-content: space-around
        }
    }
</style>
