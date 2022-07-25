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

    <main class="svelte-1gr3n62"><article><h1>Rails tips</h1>

    <time>09 Feb 2015 at 09:09</time>

    <div class="content"><p>Found these on HabraHabr today. Here are some tricks I found usefull.</p>

<h2>Private methods are not actually private</h2>

<p>Let us have class:</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">Moo</span>
  <span class="token keyword">private</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">foo</span></span>
    puts <span class="token string-literal"><span class="token string">'foo'</span></span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>Here, class method <code>foo</code> is not private:</p>

<pre><code class="language-ruby">Foo<span class="token punctuation">.</span>foo
<span class="token operator">=></span> <span class="token string-literal"><span class="token string">'foo'</span></span>
</code></pre>
<h2>Instance with params</h2>

<p>Oftenly there is a need to create a class instance and set it some params (or, maybe, call some methods on it). It's done usually like this:</p>

<pre><code class="language-ruby">moo <span class="token operator">=</span> <span class="token class-name">Moo</span><span class="token punctuation">.</span><span class="token keyword">new</span>
moo<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'foo'</span></span>
moo<span class="token punctuation">.</span>bar
</code></pre>
<p>This can be shortened with the use of `tap` method:</p>

<pre><code class="language-ruby">moo <span class="token operator">=</span> <span class="token class-name">Moo</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">.</span>tap <span class="token punctuation">{</span> <span class="token operator">|</span>a<span class="token operator">|</span> a<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'foo'</span></span><span class="token punctuation">;</span> a<span class="token punctuation">.</span>bar <span class="token punctuation">}</span>
</code></pre>
<p>Yet, it is more ruby-convenient and ruby-style to do it with the initialization block:</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">Moo</span>
  attr_accessor <span class="token symbol">:foo</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span><span class="token operator">&amp;</span>block<span class="token punctuation">)</span>
    <span class="token keyword">yield</span> <span class="token keyword">self</span> <span class="token keyword">if</span> block_given<span class="token operator">?</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">bar</span></span>
    puts <span class="token string-literal"><span class="token string">"bar!"</span></span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

moo <span class="token operator">=</span> <span class="token class-name">Moo</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token keyword">do</span> <span class="token operator">|</span>a<span class="token operator">|</span>
  a<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'foo'</span></span>
  a<span class="token punctuation">.</span>bar
<span class="token keyword">end</span>

puts moo<span class="token punctuation">.</span>foo
</code></pre>
<p>Or even like this:</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">Moo</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span><span class="token operator">&amp;</span>block<span class="token punctuation">)</span>
    instance_eval <span class="token operator">&amp;</span>block <span class="token keyword">if</span> block_given<span class="token operator">?</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">moo</span></span><span class="token punctuation">(</span>val <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
    <span class="token variable">@moo</span> <span class="token operator">=</span> val <span class="token keyword">unless</span> val<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
    <span class="token variable">@moo</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">bar</span></span>
    puts <span class="token string-literal"><span class="token string">"bar!"</span></span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

a <span class="token operator">=</span> <span class="token class-name">Moo</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token keyword">do</span>
  moo <span class="token string-literal"><span class="token string">'moo~!'</span></span>
  bar
<span class="token keyword">end</span>

puts a<span class="token punctuation">.</span>moo
</code></pre>
<h2>Code-dependent migrations</h2>

<p>When you have your migrations using your code, for example, like this:</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">CreateDataVolumes</span> <span class="token operator">&lt;</span> ActiveRecord<span class="token double-colon punctuation">::</span>Migration
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">up</span></span>
    Data<span class="token double-colon punctuation">::</span><span class="token constant">VOLUMES</span><span class="token punctuation">.</span>times <span class="token keyword">do</span> <span class="token operator">|</span>volume<span class="token operator">|</span>
      create_table <span class="token string-literal"><span class="token string">"data_</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">volume</span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span> <span class="token keyword">do</span> <span class="token operator">|</span>t<span class="token operator">|</span>
        <span class="token comment"># ...</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>you then have a problem when updating your code. In our example, if you remove the constant <code>Data::VOLUMES</code>, you will have to either manually search for all the usages of this constant, or have a really <em>intelliJent</em> IDE ;)</p>

<p>Rather than using your existing code, stub it and copy-and-paste all migration-dependent code to the stubbing class:</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">CreateDataVolumes</span> <span class="token operator">&lt;</span> ActiveRecord<span class="token double-colon punctuation">::</span>Migration
  <span class="token keyword">class</span> <span class="token class-name">Data</span> <span class="token operator">&lt;</span> <span class="token constant">AR</span><span class="token double-colon punctuation">::</span>Base
    <span class="token constant">VOLUMES</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">up</span></span>
    Data<span class="token double-colon punctuation">::</span><span class="token constant">VOLUMES</span><span class="token punctuation">.</span>times <span class="token keyword">do</span> <span class="token operator">|</span>volume<span class="token operator">|</span>
      <span class="token comment"># ...</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>Example with constant is rather stupid, whilst you may have some more critical code.</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>