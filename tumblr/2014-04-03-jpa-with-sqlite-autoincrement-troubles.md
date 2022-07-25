<style>:root{--left-side:200px;--right-side:200px;--nav-height:64px;--background-color:#FFD166;--primary-color:#06D6A0;--primary-accent-color:#049F76;--secondary-color:#118AB2;--sub-color:#073B4C;--nav-background:#fff;--article-background:#fff
    }body.svelte-1gr3n62.svelte-1gr3n62{padding:0;margin:0;color:var(--sub-color);background:var(--background-color);font-family:Roboto, "Helvetica Neue", Arial, sans-serif;font-size:18px;display:grid;grid-template:var(--nav-height) auto var(--nav-height)/var(--left-side) calc(100% - var(--left-side) - var(--right-side)) var(--right-side)
    }nav.top.svelte-1gr3n62 .links.svelte-1gr3n62{grid-area:1/2/2/3;display:flex;align-items:center
    }nav.top.svelte-1gr3n62 .links a.svelte-1gr3n62{margin-right:1em
    }a.svelte-1gr3n62.svelte-1gr3n62{color:var(--secondary-color);text-decoration:none
    }a.svelte-1gr3n62.svelte-1gr3n62:hover,a.svelte-1gr3n62.svelte-1gr3n62:active{color:var(--sub-color)
    }footer.svelte-1gr3n62.svelte-1gr3n62{grid-area:3/1/4/4;background:#fff;display:inline-grid;grid-template:100%/var(--left-side) auto var(--right-side)
    }nav.top.svelte-1gr3n62.svelte-1gr3n62{background-color:var(--nav-background);display:inline-grid;grid-template:100%/var(--left-side) auto var(--right-side);grid-area:1/1/2/4
    }main.svelte-1gr3n62.svelte-1gr3n62{grid-area:2/2/3/3;margin-top:1em;display:flex;flex-direction:column
    }@media screen and (max-width: 1340px){:root{--left-side:0px;--right-side:0px
        }body.svelte-1gr3n62.svelte-1gr3n62{background:var(--background-color)
        }nav.top.svelte-1gr3n62 .links.svelte-1gr3n62{justify-content:space-around
        }}
.btn.svelte-7idbpu{display:inline-flex;font-size:18px;color:#fff;background:var(--primary-color);padding:10px;border-radius:8px
    }.btn.svelte-7idbpu:hover{background:var(--primary-accent-color);color:#fff
    }</style><!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" href="/images/favicon-compressed.webp">
    <link rel="shortcut icon" href="/images/favicon-compressed.webp">
    <link rel="apple-touch-icon" href="/images/favicon-compressed.webp">

    <link rel="stylesheet" href="/shared.css">
    <link rel="stylesheet" href="/prism.css">

    <title>Document</title></head>
<body class="svelte-1gr3n62"><nav class="top svelte-1gr3n62">
            <div class="links svelte-1gr3n62"><a class="nav-link nav-item svelte-1gr3n62" href="/">Home</a>
                <a class="nav-link nav-item svelte-1gr3n62" href="/about/">About</a></div>
        </nav>

    <main class="svelte-1gr3n62"><article><h1>JPA with SQLite autoincrement troubles</h1>

    <time>03 Apr 2014 at 09:46</time>

    <div class="content"><p>Today i&rsquo;ve got an exception when JPA was trying to insert a new row to a table.</p>

<p>My model definition was like this:</p>

<pre><code class="language-java"><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Merchant</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy<span class="token operator">=</span><span class="token class-name">GenerationType</span><span class="token punctuation">.</span>IDENTITY<span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>

    <span class="token comment">// ...</span>

    <span class="token keyword">public</span> <span class="token class-name">Merchant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>   <span class="token punctuation">}</span>

    <span class="token comment">// ...</span>
</code></pre>
<p>And the table creation script was the following:</p>

<pre><code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> MERCHANT
<span class="token punctuation">(</span>
    ID <span class="token keyword">INTEGER</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    NAME <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    BANKNAME <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    SWIFT <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    ACCOUNT <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    CHARGE <span class="token keyword">REAL</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    PERIOD <span class="token keyword">INTEGER</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    MINSUM <span class="token keyword">REAL</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    TOTAL <span class="token keyword">REAL</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>I faced some strange exceptions like <em>id could not be null</em>, <em>SQL error or missing database (near &ldquo;values&rdquo;: syntax error)</em>, etc.</p>

<p>The solution to this consists of two steps:</p>

<ul><li><strong>in database:</strong> remove the <strong>AUTOINCREMENT</strong> and <strong>NOT NULL</strong> annotations from the <strong>ID</strong> column as SQLite will automatically increment its value (in DB)</li>
<li><strong>in entity&rsquo; code:</strong> remove the <em>GenerationStrategyType</em> from the <strong>id</strong> member annotation</li>
</ul>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>