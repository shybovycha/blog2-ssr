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

    <main class="svelte-1gr3n62"><article><h1>Strongly-typed front-end: experiment 2, simple application, in ReasonML</h1>

    <time>19 Apr 2021 at 00:23</time>

    <div class="content"><p>For the sake of experiment, I have decided to implement the very same application in ReasonML → ReScript by Facebook.</p>
<p>Starting the React Hooks example on <a href="https://reasonml.github.io/en/try">Try ReasonML</a> website, you get this code, which resembles some of the React features, just in a slightly weird syntax:</p>
<pre><code class="language-ocaml"><span class="token punctuation">[</span><span class="token operator">@</span>bs<span class="token punctuation">.</span>config <span class="token punctuation">{</span>jsx<span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">module</span> Counter <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token operator">@</span>react<span class="token punctuation">.</span>component<span class="token punctuation">]</span>
  <span class="token keyword">let</span> make <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token label property">~name</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">(</span>count<span class="token punctuation">,</span> setCount<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>p<span class="token operator">></span> <span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span>name <span class="token operator">++</span> <span class="token string">" clicked "</span> <span class="token operator">++</span> string_of_int<span class="token punctuation">(</span>count<span class="token punctuation">)</span> <span class="token operator">++</span> <span class="token string">" times"</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">&lt;/</span>p<span class="token operator">></span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">_</span> <span class="token operator">=></span> setCount<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> count <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>
        <span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Click me"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;/</span>div<span class="token operator">></span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

ReactDOMRe<span class="token punctuation">.</span>renderToElementWithId<span class="token punctuation">(</span><span class="token operator">&lt;</span>Counter name<span class="token operator">=</span><span class="token string">"Counter"</span> <span class="token operator">/></span><span class="token punctuation">,</span> <span class="token string">"preview"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Starting off by defining the enum type for shape:</p>
<pre><code class="language-ocaml"><span class="token keyword">type</span> Shape <span class="token operator">=</span> Circle <span class="token operator">|</span> Square<span class="token punctuation">;</span>
</code></pre>
<p>And immediately getting an error:</p>
<pre><code>Line 4:8-12 A type name must start with a lower-case letter or an underscore
</code></pre>
<p>That one is easy to fix:</p>
<pre><code class="language-ocaml"><span class="token keyword">type</span> shape <span class="token operator">=</span> Circle <span class="token operator">|</span> Square<span class="token punctuation">;</span>
</code></pre>
<p>Now, add some markup:</p>
<pre><code class="language-ocaml"><span class="token punctuation">[</span><span class="token operator">@</span>react<span class="token punctuation">.</span>component<span class="token punctuation">]</span>
<span class="token keyword">let</span> make <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token label property">~name</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token punctuation">(</span>_shape<span class="token punctuation">,</span> setShape<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> None<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">,</span> setValue<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> <span class="token punctuation">(</span>area<span class="token punctuation">,</span> setArea<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>select<span class="token operator">></span>
      <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">""</span><span class="token operator">></span> Choose shape <span class="token operator">&lt;/</span>option<span class="token operator">></span>
      <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">"circle"</span><span class="token operator">></span> Circle <span class="token operator">&lt;/</span>option<span class="token operator">></span>
      <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">"square"</span><span class="token operator">></span> Square <span class="token operator">&lt;/</span>option<span class="token operator">></span>
    <span class="token operator">&lt;/</span>select<span class="token operator">></span>
    <span class="token operator">&lt;</span>input <span class="token keyword">value</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">value</span><span class="token punctuation">}</span> <span class="token operator">/></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span> <span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span>string_of_float<span class="token punctuation">(</span>area<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">&lt;/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>button<span class="token operator">></span>
      <span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Calculate"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;/</span>button<span class="token operator">></span>
  <span class="token operator">&lt;/</span>div<span class="token operator">></span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<!--more-->

<p>And getting hit by another error:</p>
<pre><code>We&#39;ve found a bug for you!
OCaml preview 14:52-57

The variant constructor Choose can&#39;t be found.

- If it&#39;s defined in another module or file, bring it into scope by:
  - Annotating it with said module name: let food = MyModule.Apple
  - Or specifying its type: let food: MyModule.fruit = Apple
- Constructors and modules are both capitalized. Did you want the latter?
  Then instead of let foo = Bar, try module Foo = Bar.
</code></pre>
<p>Not extremely helpful. Having to look into the OCaml code compiled from ReasonML:</p>
<pre><code class="language-ocaml"><span class="token punctuation">[</span><span class="token operator">@@@</span>bs<span class="token punctuation">.</span>config <span class="token punctuation">{</span> jsx <span class="token operator">=</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token keyword">module</span> Counter <span class="token operator">=</span>
  <span class="token keyword">struct</span>
    <span class="token keyword">type</span> shape <span class="token operator">=</span>
      <span class="token operator">|</span> Circle
      <span class="token operator">|</span> Square
    <span class="token keyword">let</span> make <span class="token label property">~name</span>  <span class="token operator">=</span>
      <span class="token keyword">let</span> <span class="token punctuation">(</span>_shape<span class="token punctuation">,</span>setShape<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState <span class="token punctuation">(</span><span class="token keyword">fun</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token operator">-></span> None<span class="token punctuation">)</span> <span class="token keyword">in</span>
      <span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">,</span>setValue<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState <span class="token punctuation">(</span><span class="token keyword">fun</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token operator">-></span> <span class="token number">0.0</span><span class="token punctuation">)</span> <span class="token keyword">in</span>
      <span class="token keyword">let</span> <span class="token punctuation">(</span>area<span class="token punctuation">,</span>setArea<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState <span class="token punctuation">(</span><span class="token keyword">fun</span> <span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token operator">-></span> <span class="token number">0.0</span><span class="token punctuation">)</span> <span class="token keyword">in</span>
      <span class="token punctuation">(</span><span class="token punctuation">(</span>div
          <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">(</span>select
                         <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token punctuation">(</span>option <span class="token label property">~value</span><span class="token punctuation">:</span><span class="token string">""</span>
                                        <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span>Choose<span class="token punctuation">;</span> shape<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                                   <span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                   <span class="token punctuation">(</span><span class="token punctuation">(</span>option
                                       <span class="token label property">~value</span><span class="token punctuation">:</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"circle"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>reason<span class="token punctuation">.</span>raw_literal
                                                           <span class="token string">"circle"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                                       <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span>Circle<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                                   <span class="token punctuation">(</span><span class="token punctuation">(</span>option
                                       <span class="token label property">~value</span><span class="token punctuation">:</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"square"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>reason<span class="token punctuation">.</span>raw_literal
                                                           <span class="token string">"square"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
                                       <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span>Square<span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">(</span><span class="token punctuation">(</span>input <span class="token label property">~value</span> <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">(</span><span class="token punctuation">(</span>p <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span>React<span class="token punctuation">.</span>string <span class="token punctuation">(</span>string_of_float area<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">(</span><span class="token punctuation">(</span>button
                        <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span>React<span class="token punctuation">.</span>string
                                     <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"Calculate"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>reason<span class="token punctuation">.</span>raw_literal
                                                     <span class="token string">"Calculate"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@@</span>react<span class="token punctuation">.</span>component <span class="token punctuation">]</span>
  <span class="token keyword">end</span>
<span class="token keyword">let</span> <span class="token punctuation">_</span> <span class="token operator">=</span>
  ReactDOMRe<span class="token punctuation">.</span>renderToElementWithId
    <span class="token punctuation">(</span><span class="token punctuation">(</span>Counter<span class="token punctuation">.</span>createElement
        <span class="token label property">~name</span><span class="token punctuation">:</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"Counter"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>reason<span class="token punctuation">.</span>raw_literal <span class="token string">"Counter"</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token label property">~children</span><span class="token punctuation">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">[</span><span class="token operator">@</span>JSX <span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"preview"</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token operator">@</span>reason<span class="token punctuation">.</span>raw_literal <span class="token string">"preview"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre>
<p>Seems that this JSX does not work well with strings. Looking into the original example, one can deduct the format:</p>
<pre><code class="language-jsx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>option</span><span class="token punctuation">></span></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token string">"Choose shape"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>option</span><span class="token punctuation">></span></span>
</code></pre>
<p>And having to replace this everywhere in the JSX:</p>
<pre><code class="language-ocaml"><span class="token punctuation">[</span><span class="token operator">@</span>react<span class="token punctuation">.</span>component<span class="token punctuation">]</span>
<span class="token keyword">let</span> make <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token label property">~name</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token punctuation">(</span>_shape<span class="token punctuation">,</span> setShape<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> None<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">,</span> setValue<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> <span class="token punctuation">(</span>area<span class="token punctuation">,</span> setArea<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token operator">&lt;</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span>select<span class="token operator">></span>
      <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">""</span><span class="token operator">></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Choose shape"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;/</span>option<span class="token operator">></span>
      <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">"circle"</span><span class="token operator">></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Circle"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;/</span>option<span class="token operator">></span>
      <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">"square"</span><span class="token operator">></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Square"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;/</span>option<span class="token operator">></span>
    <span class="token operator">&lt;/</span>select<span class="token operator">></span>
    <span class="token operator">&lt;</span>input <span class="token keyword">value</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">value</span><span class="token punctuation">}</span> <span class="token operator">/></span>
    <span class="token operator">&lt;</span>p<span class="token operator">></span> <span class="token punctuation">{</span><span class="token string">"Area:"</span> <span class="token operator">++</span> React<span class="token punctuation">.</span>string<span class="token punctuation">(</span>string_of_float<span class="token punctuation">(</span>area<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">&lt;/</span>p<span class="token operator">></span>
    <span class="token operator">&lt;</span>button<span class="token operator">></span>
      <span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Calculate"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;/</span>button<span class="token operator">></span>
  <span class="token operator">&lt;/</span>div<span class="token operator">></span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>And the next error is</p>
<pre><code>We&#39;ve found a bug for you!
OCaml preview 33:30-34

This has type:
  float
But somewhere wanted:
  string

You can convert a float to a string with string_of_float.
</code></pre>
<p>Seems that <code>value={value}</code> does not work out of the box too, since the <code>value</code> variable has the type <code>float</code> and this version of React expects it to be <code>string</code>. Okay, let’s use that <code>string_of_float</code> function:</p>
<pre><code class="language-ocaml"><span class="token operator">&lt;</span>input <span class="token keyword">value</span><span class="token operator">=</span><span class="token punctuation">{</span>string_of_float<span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">/></span>
</code></pre>
<p>Apparently it is also not good enough:</p>
<pre><code>Warning number 3
OCaml preview 33:37-51

deprecated: Pervasives.string_of_float
Please use Js.Float.toString instead, string_of_float generates unparseable floats
</code></pre>
<p>So it should be</p>
<pre><code class="language-ocaml"><span class="token operator">&lt;</span>input <span class="token keyword">value</span><span class="token operator">=</span><span class="token punctuation">{</span>Js<span class="token punctuation">.</span>Float<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token operator">/></span>
</code></pre>
<p>Okay, only the unused state setters left. Let’s implement the <code>shapeChanged</code> and the <code>calculateArea</code> helpers first:</p>
<pre><code class="language-ocaml"><span class="token keyword">let</span> shapeChanged <span class="token operator">=</span> <span class="token punctuation">(</span>shapeStr<span class="token punctuation">:</span> string<span class="token punctuation">)</span><span class="token punctuation">:</span> option<span class="token punctuation">(</span>shape<span class="token punctuation">)</span> <span class="token operator">=></span>
      switch shapeStr <span class="token punctuation">{</span>
        <span class="token operator">|</span> <span class="token string">"circle"</span> <span class="token operator">=></span> Some<span class="token punctuation">(</span>Circle<span class="token punctuation">)</span>
        <span class="token operator">|</span> <span class="token string">"square"</span> <span class="token operator">=></span> Some<span class="token punctuation">(</span>Square<span class="token punctuation">)</span>
        <span class="token operator">|</span> <span class="token punctuation">_</span> <span class="token operator">=></span> None
      <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> calculateArea <span class="token operator">=</span> <span class="token punctuation">(</span>_shape<span class="token punctuation">:</span> shape<span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">:</span> float<span class="token punctuation">)</span> <span class="token operator">=></span>
      switch _shape <span class="token punctuation">{</span>
        <span class="token operator">|</span> Circle <span class="token operator">=></span> Js<span class="token punctuation">.</span>Math<span class="token punctuation">.</span>PI <span class="token operator">*</span> <span class="token keyword">value</span> <span class="token operator">*</span> <span class="token keyword">value</span>
        <span class="token operator">|</span> Square <span class="token operator">=></span> <span class="token keyword">value</span> <span class="token operator">*</span> <span class="token keyword">value</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>The <code>Js.Math.PI</code> is not accessible, apparently:</p>
<pre><code>We&#39;ve found a bug for you!
OCaml preview 20:23-32

The variant constructor Js.Math.PI can&#39;t be found.

- If it&#39;s defined in another module or file, bring it into scope by:
  - Annotating it with said module name: let food = MyModule.Apple
  - Or specifying its type: let food: MyModule.fruit = Apple
- Constructors and modules are both capitalized. Did you want the latter?
  Then instead of let foo = Bar, try module Foo = Bar.
</code></pre>
<p>According to the <a href="https://rescript-lang.org/docs/manual/latest/api/js/math#_pi">docs</a>, it is <code>Js.Math._PI</code>. But even after fixing that, there is a mysterious error now:</p>
<pre><code>We&#39;ve found a bug for you!
OCaml preview 20:23-33

This has type:
  float
But somewhere wanted:
  int

You can convert a float to a int with int_of_float.If this is a literal, you want a number without a trailing dot (e.g. 20).
</code></pre>
<p>The error happens on this OCaml line:</p>
<pre><code class="language-ocaml"><span class="token operator">|</span> Circle  <span class="token operator">-></span> <span class="token punctuation">(</span>Js<span class="token punctuation">.</span>Math<span class="token punctuation">.</span>_PI <span class="token operator">*</span> <span class="token keyword">value</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token keyword">value</span>
</code></pre>
<p>Not helpful at all. The trick is that OCaml uses different operators for integer and floating-point math. This should do the trick:</p>
<pre><code class="language-ocaml"><span class="token operator">|</span> Circle <span class="token operator">-></span> Js<span class="token punctuation">.</span>Math<span class="token punctuation">.</span>_PI <span class="token operator">*.</span> <span class="token keyword">value</span> <span class="token operator">*.</span> <span class="token keyword">value</span>
</code></pre>
<p>Now, the last bit: connecting the component to the state:</p>
<pre><code class="language-ocaml"><span class="token operator">&lt;</span>select onChange<span class="token operator">=</span><span class="token punctuation">{</span> event <span class="token operator">=></span> setShape<span class="token punctuation">(</span>shapeChanged<span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token operator">></span>
</code></pre>
<p>As usual, an error:</p>
<pre><code>We&#39;ve found a bug for you!
OCaml preview 26:62-67

The record field target can&#39;t be found.

If it&#39;s defined in another module or file, bring it into scope by:
- Annotating it with said module name: let baby = {MyModule.age: 3}
- Or specifying its type: let baby: MyModule.person = {age: 3}
</code></pre>
<p>Apparently, this JSX implementation has <a href="https://reasonml.github.io/reason-react/docs/en/event">its own ways</a> of accessing event’s props:</p>
<pre><code class="language-ocaml">ReactEvent<span class="token punctuation">.</span>Form<span class="token punctuation">.</span>target<span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">#</span><span class="token directive property">#value</span>
</code></pre>
<p>The issue is that this code is a valid BuckleScript, but not ReasonML. These intuitions <a href="https://rescript-lang.org/docs/manual/latest/migrate-from-bucklescript-reason">described in docs</a> won’t work:</p>
<pre><code class="language-ocaml">setShape<span class="token punctuation">(</span>shapeChanged<span class="token punctuation">(</span>ReactEvent<span class="token punctuation">.</span>Form<span class="token punctuation">.</span>target<span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>
<p>And here we go again:</p>
<pre><code>We&#39;ve found a bug for you!
OCaml preview 27:75-79

The record field value can&#39;t be found.

If it&#39;s defined in another module or file, bring it into scope by:
- Annotating it with said module name: let baby = {MyModule.age: 3}
- Or specifying its type: let baby: MyModule.person = {age: 3}
setShape(shapeChanged(ReactEvent.Form.target(event)[&quot;value&quot;]))

We&#39;ve found a bug for you!
OCaml preview 27:45-74

This has type:
  &lt; .. &gt; Js.t
But somewhere wanted:
  &#39;a array
</code></pre>
<p>I am yet to figure out WTF is going on there, but the rough solution would be to just smash some JS code in:</p>
<pre><code class="language-ocaml"><span class="token operator">&lt;</span>select onChange<span class="token operator">=</span><span class="token punctuation">{</span> event <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> v<span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">%</span>bs<span class="token punctuation">.</span>raw <span class="token string">{| event.target.value |}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> s<span class="token punctuation">:</span> option<span class="token punctuation">(</span>shape<span class="token punctuation">)</span> <span class="token operator">=</span> shapeChanged<span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
        setShape<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
</code></pre>
<p>That worked just enough to show yet another error:</p>
<pre><code>We&#39;ve found a bug for you!
OCaml preview 28:48

This has type:
  shape option
But somewhere wanted:
  &#39;a option -&gt; &#39;a option
</code></pre>
<p>This is because state setters take a function, not just a value:</p>
<pre><code class="language-ocaml">setShape<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> s<span class="token punctuation">)</span>
</code></pre>
<p>And the whole event handler can be simplified a little bit:</p>
<pre><code class="language-ocaml"><span class="token operator">&lt;</span>select onChange<span class="token operator">=</span><span class="token punctuation">{</span> event <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> v<span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">%</span>bs<span class="token punctuation">.</span>raw <span class="token string">{| event.target.value |}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        setShape<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> shapeChanged<span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
</code></pre>
<p>This breaks some of the type checking benefits, but it just works ™️ ©</p>
<p>Back to the other event handlers:</p>
<pre><code class="language-ocaml"><span class="token operator">&lt;</span>input <span class="token keyword">value</span><span class="token operator">=</span><span class="token punctuation">{</span>Js<span class="token punctuation">.</span>Float<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">}</span> onChange<span class="token operator">=</span><span class="token punctuation">{</span> event <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> v<span class="token punctuation">:</span> string <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">%</span>bs<span class="token punctuation">.</span>raw <span class="token string">{| event.target.value |}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        setValue<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> float_of_string<span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">/></span>
</code></pre>
<p>Surprisingly enough, here ReasonML is totally fine with <code>float_of_string</code>.</p>
<pre><code class="language-ocaml"><span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span> <span class="token punctuation">_</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        setArea<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> Belt<span class="token punctuation">.</span>Option<span class="token punctuation">.</span>mapWithDefault<span class="token punctuation">(</span>_shape<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> s <span class="token operator">=></span> calculateArea<span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
</code></pre>
<p>Tricky <code>Belt</code> library way to work with <code>option</code>s.</p>
<p>Now that the code is done and seems to work in the playground, it is time to introduce yet another issue with raw technology by Facebook: it has actually <strong>four</strong> completely different and incompatible versions:</p>
<ul>
<li>OCaml, with all of the libraries provided by Facebook</li>
<li>BuckleScript, the back-end of the ReasonML (<a href="https://rescript-lang.org/blog/bucklescript-is-rebranding">rebranding announcement</a>, <a href="https://rescript-lang.org/blog/bucklescript-8-1-new-syntax">differences</a>)</li>
<li>ReasonML, the old version of the language (<a href="https://reasonml.github.io/blog/">blogs up to 2018</a>)</li>
<li>ReScript, the new version of the language (<a href="https://rescript-lang.org/docs/manual/latest/migrate-from-bucklescript-reason">differences</a>)</li>
</ul>
<p>Each of them has incompatible syntax, all of them use the docs of one another (in particular, React docs are written for BuckleScript, but refer to ReScript docs).</p>
<p>Despite the bold proclamations like</p>
<blockquote>
<p>// ReScript / old Reason syntax should parse just
// fine (go to the “Settings” panel for toggling syntax).</p>
</blockquote>
<p>And</p>
<blockquote>
<p>What Will Change with ReScript?</p>
<p>Technically, not much. One of our main goals is to keep backwards compatibility for existing BuckleScript codebases and will provide an automated upgrade path from .re (Reason) to .res (ReScript) files.</p>
<p>The BuckleScript compiler toolchain and its new .res syntax will be unified into one platform called ReScript. Upgrading from the bs-platform to the soon-to-be-published ReScript npm package will just be a matter of updating your package.json file. Syntax wise, we believe that previous Reason users will feel right at home.</p>
<p>ReScript will continue shipping the old Reason v3.6 syntax as well and it will be possible to mix .re and .res files in one codebase (same with libraries).</p>
</blockquote>
<p>If you try to run the ReasonML code that works in ReasonML playground in ReScript playground, you will notice that it does not even compile:</p>
<pre><code>[E] Line 6, column 19:
Missing expression
[E] Line 12, column 49:
Type parameters require angle brackets:
  option&lt;shape&gt;
[E] Line 27, column 32:
Did you forget a `,` here? 
[E] Line 27, column 57:
Did you forget a `}` here? 
[E] Line 36, column 32:
Did you forget a `,` here? 
</code></pre>
<p>With a few changes following intuition (and not those useless error messages), one can get it to compile:</p>
<pre><code class="language-ocaml"><span class="token operator">//</span> no more <span class="token punctuation">[</span><span class="token operator">%</span>bs<span class="token punctuation">]</span> annotations
<span class="token keyword">module</span> Counter <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">type</span> shape <span class="token operator">=</span> Circle <span class="token operator">|</span> Square<span class="token punctuation">;</span>
  
  <span class="token operator">@</span>react<span class="token punctuation">.</span>component <span class="token operator">//</span> annotations look more java<span class="token operator">-</span>like <span class="token operator">or</span> typescript<span class="token operator">-</span>like
  <span class="token keyword">let</span> make <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> <span class="token punctuation">(</span>_shape<span class="token punctuation">,</span> setShape<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> None<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">,</span> setValue<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> <span class="token punctuation">(</span>area<span class="token punctuation">,</span> setArea<span class="token punctuation">)</span> <span class="token operator">=</span> React<span class="token punctuation">.</span>useState<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token number">0.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token operator">//</span> option<span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> is now option<span class="token operator">&lt;</span><span class="token keyword">type</span><span class="token operator">></span>
    <span class="token keyword">let</span> shapeChanged <span class="token operator">=</span> <span class="token punctuation">(</span>shapeStr<span class="token punctuation">:</span> string<span class="token punctuation">)</span><span class="token punctuation">:</span> option<span class="token operator">&lt;</span>shape<span class="token operator">></span> <span class="token operator">=></span>
      switch shapeStr <span class="token punctuation">{</span>
        <span class="token operator">|</span> <span class="token string">"circle"</span> <span class="token operator">=></span> Some<span class="token punctuation">(</span>Circle<span class="token punctuation">)</span>
        <span class="token operator">|</span> <span class="token string">"square"</span> <span class="token operator">=></span> Some<span class="token punctuation">(</span>Square<span class="token punctuation">)</span>
        <span class="token operator">|</span> <span class="token punctuation">_</span> <span class="token operator">=></span> None
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    
    <span class="token keyword">let</span> calculateArea <span class="token operator">=</span> <span class="token punctuation">(</span>_shape<span class="token punctuation">:</span> shape<span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">:</span> float<span class="token punctuation">)</span> <span class="token operator">=></span>
      switch _shape <span class="token punctuation">{</span>
        <span class="token operator">|</span> Circle <span class="token operator">=></span> Js<span class="token punctuation">.</span>Math<span class="token punctuation">.</span>_PI <span class="token operator">*.</span> <span class="token keyword">value</span> <span class="token operator">*.</span> <span class="token keyword">value</span>
        <span class="token operator">|</span> Square <span class="token operator">=></span> <span class="token keyword">value</span> <span class="token operator">*.</span> <span class="token keyword">value</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>select onChange<span class="token operator">=</span><span class="token punctuation">{</span> event <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token operator">//</span> the issue <span class="token keyword">with</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token keyword">value</span> is somewhat resolved
        <span class="token keyword">let</span> v<span class="token punctuation">:</span> string <span class="token operator">=</span> ReactEvent<span class="token punctuation">.</span>Form<span class="token punctuation">.</span>target<span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        setShape<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> shapeChanged<span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">""</span><span class="token operator">></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Choose shape"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;/</span>option<span class="token operator">></span>
        <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">"circle"</span><span class="token operator">></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Circle"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;/</span>option<span class="token operator">></span>
        <span class="token operator">&lt;</span>option <span class="token keyword">value</span><span class="token operator">=</span><span class="token string">"square"</span><span class="token operator">></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Square"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;/</span>option<span class="token operator">></span>
      <span class="token operator">&lt;/</span>select<span class="token operator">></span>
      
      <span class="token operator">&lt;</span>input <span class="token keyword">value</span><span class="token operator">=</span><span class="token punctuation">{</span>Js<span class="token punctuation">.</span>Float<span class="token punctuation">.</span>toString<span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">}</span> onChange<span class="token operator">=</span><span class="token punctuation">{</span> event <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> v<span class="token punctuation">:</span> string <span class="token operator">=</span> ReactEvent<span class="token punctuation">.</span>Form<span class="token punctuation">.</span>target<span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token string">"value"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        setValue<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> float_of_string<span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">/></span>
      
      <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Area:"</span> <span class="token operator">++</span> Js<span class="token punctuation">.</span>Float<span class="token punctuation">.</span>toString<span class="token punctuation">(</span>area<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;/</span>p<span class="token operator">></span>

      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span> <span class="token punctuation">_</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        setArea<span class="token punctuation">(</span><span class="token punctuation">_</span> <span class="token operator">=></span> Belt<span class="token punctuation">.</span>Option<span class="token punctuation">.</span>mapWithDefault<span class="token punctuation">(</span>_shape<span class="token punctuation">,</span> <span class="token number">0.0</span><span class="token punctuation">,</span> s <span class="token operator">=></span> calculateArea<span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">></span>
        <span class="token punctuation">{</span>React<span class="token punctuation">.</span>string<span class="token punctuation">(</span><span class="token string">"Calculate"</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;/</span>button<span class="token operator">></span>
    <span class="token operator">&lt;/</span>div<span class="token operator">></span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>TL;DR:</p>
<LazyImg src="/images/strongly-typed-front-end/one-can-not-simply.png" alt="One can't simply..." />
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>