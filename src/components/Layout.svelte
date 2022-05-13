<slot></slot>

<slot name="header">
    <div class="links">
        <a class="nav-link nav-item" href="/">Home</a>
        <a class="nav-link nav-item" href="/about/">About</a>
    </div>
</slot>

<nav class="top">

</nav>

<main>
    <slot name="content">
        No content
    </slot>
</main>

<footer>
    <slot name="footer"></slot>
</footer>

{@html `<script src="/lazyLoadImages.js"></script>`}
