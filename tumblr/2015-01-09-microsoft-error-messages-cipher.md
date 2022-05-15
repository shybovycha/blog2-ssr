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

    <main class="svelte-1gr3n62"><article><h1>Microsoft&#39; error messages cipher</h1>

    <time>09 Jan 2015 at 20:43</time>

    <div class="content"><p>I have a T-SQL trigger creation script, which runs OK:</p>
<pre><code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TRIGGER</span> data_modified <span class="token keyword">ON</span> Northwind<span class="token punctuation">.</span>dbo<span class="token punctuation">.</span>Customers <span class="token keyword">FOR</span> <span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span>
<span class="token keyword">AS</span>

<span class="token keyword">declare</span> <span class="token variable">@rows</span> <span class="token keyword">as</span> <span class="token keyword">int</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@rows</span> <span class="token operator">=</span> @<span class="token variable">@ROWCOUNT</span><span class="token punctuation">;</span>

<span class="token keyword">IF</span> <span class="token variable">@rows</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">BEGIN</span>
    <span class="token keyword">print</span> <span class="token string">'no rows were affected'</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>

<span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> inserted<span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> deleted<span class="token punctuation">)</span>
    <span class="token keyword">begin</span>
        <span class="token keyword">print</span> <span class="token string">'updated '</span> <span class="token operator">+</span> <span class="token variable">@rows</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span>
    <span class="token keyword">else</span>
    <span class="token keyword">begin</span>
        <span class="token keyword">print</span> <span class="token string">'inserted '</span> <span class="token operator">+</span> <span class="token variable">@rows</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
<span class="token keyword">else</span>
<span class="token keyword">begin</span>
    <span class="token keyword">print</span> <span class="token string">'deleted '</span> <span class="token operator">+</span> <span class="token variable">@rows</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>
</code></pre>
<p>Yet, when I run some <code>INSERT</code> query, I got an error saying:</p>
<pre><code>Msg 245, Level 16, State 1, Procedure data_modified, Line 21
Conversion failed when converting the varchar value &#39;inserted &#39; to data type int.
</code></pre>
<p>Mysterious, isn’t it? Let’s dig in, shall we?</p>
<!--more-->

<p>Let’s look onto the source of that trigger, at line 18:</p>
<pre><code class="language-sql"><span class="token keyword">USE</span> <span class="token punctuation">[</span>Northwind<span class="token punctuation">]</span>
GO
<span class="token comment">/****** Object:  Trigger [dbo].[data_modified]    Script Date: 09.01.2015 18:18:14 ******/</span>
<span class="token keyword">SET</span> ANSI_NULLS <span class="token keyword">ON</span>
GO
<span class="token keyword">SET</span> QUOTED_IDENTIFIER <span class="token keyword">ON</span>
GO
    <span class="token keyword">ALTER</span> <span class="token keyword">TRIGGER</span> <span class="token punctuation">[</span>dbo<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span>data_modified<span class="token punctuation">]</span> <span class="token keyword">ON</span> <span class="token punctuation">[</span>Northwind<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span>dbo<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">[</span>Customers<span class="token punctuation">]</span> <span class="token keyword">FOR</span> <span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span>
    <span class="token keyword">AS</span>

    <span class="token keyword">declare</span> <span class="token variable">@rows</span> <span class="token keyword">as</span> <span class="token keyword">int</span><span class="token punctuation">;</span>
    <span class="token keyword">set</span> <span class="token variable">@rows</span> <span class="token operator">=</span> @<span class="token variable">@ROWCOUNT</span><span class="token punctuation">;</span>

    <span class="token keyword">IF</span> <span class="token variable">@rows</span> <span class="token operator">=</span> <span class="token number">0</span>
    <span class="token keyword">BEGIN</span>
        <span class="token keyword">print</span> <span class="token string">'no rows were affected'</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span>

    <span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> inserted<span class="token punctuation">)</span>
    <span class="token keyword">begin</span>
        <span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> deleted<span class="token punctuation">)</span>
        <span class="token keyword">begin</span>
            <span class="token keyword">print</span> <span class="token string">'updated '</span> <span class="token operator">+</span> <span class="token variable">@rows</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
        <span class="token keyword">end</span>
        <span class="token keyword">else</span>
        <span class="token keyword">begin</span>
            <span class="token keyword">print</span> <span class="token string">'inserted '</span> <span class="token operator">+</span> <span class="token variable">@rows</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
        <span class="token keyword">end</span>
    <span class="token keyword">end</span>
    <span class="token keyword">else</span>
    <span class="token keyword">begin</span>
        <span class="token keyword">print</span> <span class="token string">'deleted '</span> <span class="token operator">+</span> <span class="token variable">@rows</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span>
</code></pre>
<p>Here’s the error:</p>
<pre><code class="language-sql"><span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> inserted<span class="token punctuation">)</span>
</code></pre>
<p>But wait, that can’t be true!</p>
<p>The problem is a bit deeper, with the <code>@rows</code> variable:</p>
<pre><code class="language-sql"><span class="token keyword">print</span> <span class="token string">'updated '</span> <span class="token operator">+</span> <span class="token variable">@rows</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
</code></pre>
<p>while being declared as:</p>
<pre><code class="language-sql"><span class="token keyword">declare</span> <span class="token variable">@rows</span> <span class="token keyword">as</span> <span class="token keyword">int</span><span class="token punctuation">;</span>
</code></pre>
<p>It can not be printed right away, so it needs to be cast:</p>
<pre><code class="language-sql"><span class="token keyword">CREATE</span> <span class="token keyword">TRIGGER</span> data_modified <span class="token keyword">ON</span> Northwind<span class="token punctuation">.</span>dbo<span class="token punctuation">.</span>Customers <span class="token keyword">FOR</span> <span class="token keyword">INSERT</span><span class="token punctuation">,</span> <span class="token keyword">UPDATE</span><span class="token punctuation">,</span> <span class="token keyword">DELETE</span>
<span class="token keyword">AS</span>

<span class="token keyword">declare</span> <span class="token variable">@rows</span> <span class="token keyword">as</span> <span class="token keyword">int</span><span class="token punctuation">;</span>
<span class="token keyword">declare</span> <span class="token variable">@rows_s</span> <span class="token keyword">as</span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@rows</span> <span class="token operator">=</span> @<span class="token variable">@ROWCOUNT</span><span class="token punctuation">;</span>
<span class="token keyword">set</span> <span class="token variable">@rows_s</span> <span class="token operator">=</span> cast<span class="token punctuation">(</span><span class="token variable">@rows</span> <span class="token keyword">as</span> <span class="token keyword">varchar</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">IF</span> <span class="token variable">@rows</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token keyword">BEGIN</span>
    <span class="token keyword">print</span> <span class="token string">'no rows were affected'</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>

<span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> inserted<span class="token punctuation">)</span>
<span class="token keyword">begin</span>
    <span class="token keyword">if</span> <span class="token keyword">exists</span><span class="token punctuation">(</span><span class="token keyword">select</span> <span class="token operator">*</span> <span class="token keyword">from</span> deleted<span class="token punctuation">)</span>
    <span class="token keyword">begin</span>
        <span class="token keyword">print</span> <span class="token string">'updated '</span> <span class="token operator">+</span> <span class="token variable">@rows_s</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span>
    <span class="token keyword">else</span>
    <span class="token keyword">begin</span>
        <span class="token keyword">print</span> <span class="token string">'inserted '</span> <span class="token operator">+</span> <span class="token variable">@rows_s</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
<span class="token keyword">else</span>
<span class="token keyword">begin</span>
    <span class="token keyword">print</span> <span class="token string">'deleted '</span> <span class="token operator">+</span> <span class="token variable">@rows_s</span> <span class="token operator">+</span> <span class="token string">' rows'</span><span class="token punctuation">;</span>
<span class="token keyword">end</span>
</code></pre>
<p>Try to guess where’s your mistake, using that error message! 😉</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>