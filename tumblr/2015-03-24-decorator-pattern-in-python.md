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

    <main class="svelte-1gr3n62"><article><h1>Decorator pattern in Python</h1>

    <time>24 Mar 2015 at 09:41</time>

    <div class="content"><p>Just found some interesting way of implementing Decorator design pattern in Python.</p>

<p>As <strong>Jason Smith</strong> said in his book (<strong>Elemental Design Patterns</strong>), <em>“design patterns may be implemened in different ways in different programming languages”</em>.</p>

<p>That’s said, design patterns are not some set of classes which will be implemented in a very similar way in different languages - they are just a way of doing something.</p>

<p>Thus, Decorator pattern is a way of wrapping some method’s or class’ behaviour. In Python it may be done with <strong>Context Managers:</strong></p>

<pre><code class="language-python"><span class="token keyword">from</span> contextlib <span class="token keyword">import</span> contextmanager

<span class="token decorator annotation punctuation">@contextmanager</span>
<span class="token keyword">def</span> <span class="token function">tag</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">"&lt;%s>"</span> <span class="token operator">%</span> name<span class="token punctuation">,</span>
    <span class="token keyword">yield</span>
    <span class="token keyword">print</span> <span class="token string">"&lt;/%s>"</span> <span class="token operator">%</span> name<span class="token punctuation">,</span>

<span class="token keyword">with</span> tag<span class="token punctuation">(</span><span class="token string">"h1"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">"moo"</span><span class="token punctuation">,</span>

<span class="token keyword">print</span>

<span class="token keyword">with</span> tag<span class="token punctuation">(</span><span class="token string">"div"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span> <span class="token string">"foo"</span><span class="token punctuation">,</span>
</code></pre>
<p>This code will end up wrapping <code>print "foo"</code> and <code>print "moo"</code> methods with printing some HTML tags around &lsquo;em:</p>

<pre><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>moo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>foo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre>
<p>That is interesting as it implements Decorator design pattern in a bit hard-coded way, but using language features, not OOP ones.</p>

<p>Compare it to the <em>"standard"</em> OOP implementation in Python:</p>

<pre><code class="language-python"><span class="token comment"># -*-coding:utf-8 -*-</span>
<span class="token keyword">class</span> <span class="token class-name">SimpleText</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>text <span class="token operator">=</span> text

    <span class="token keyword">def</span> <span class="token function">content</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>text

    <span class="token keyword">def</span> <span class="token function">__str__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>content<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">TagDecorator</span><span class="token punctuation">(</span>SimpleText<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">,</span> tag<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span>TagDecorator<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>tag <span class="token operator">=</span> tag

    <span class="token keyword">def</span> <span class="token function">content</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">'&lt;{0}>{1}&lt;/{0}>'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>tag<span class="token punctuation">,</span> <span class="token builtin">super</span><span class="token punctuation">(</span>TagDecorator<span class="token punctuation">,</span> self<span class="token punctuation">)</span><span class="token punctuation">.</span>content<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

a <span class="token operator">=</span> SimpleText<span class="token punctuation">(</span><span class="token string">'moo'</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'SimpleText: %s'</span> <span class="token operator">%</span> a<span class="token punctuation">)</span>

b <span class="token operator">=</span> TagDecorator<span class="token punctuation">(</span><span class="token string">'moo'</span><span class="token punctuation">,</span> <span class="token string">'h1'</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'TagDecorator (h1): %s'</span> <span class="token operator">%</span> b<span class="token punctuation">)</span>
</code></pre>
<p>This one looks a bit&hellip; ugly&hellip; right? And though Python does not really care of which type are <code>a</code> and <code>b</code>, we may not need all this class hierarchy.</p>

<p>This is the might of <strong>context managers</strong>!</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>