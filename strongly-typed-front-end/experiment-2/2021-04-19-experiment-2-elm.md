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

    <main class="svelte-1gr3n62"><article><h1>Strongly-typed front-end: experiment 2, simple application, in Elm</h1>

    <time>19 Apr 2021 at 00:23</time>

    <div class="content"><p>(Heavily over-opinionated statement) Elm forces you to handle error scenarios when writing the code.</p>
<p><a href="https://codesandbox.io/s/inspiring-diffie-lq0u2">Sandbox</a></p>
<p>This is pretty much a translation of a TypeScript code from above:</p>
<pre><code class="language-haskell"><span class="token keyword">module</span> <span class="token constant">Main</span> <span class="token hvariable">exposing</span> <span class="token punctuation">(</span><span class="token operator">..</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Browser</span>
<span class="token import-statement"><span class="token keyword">import</span> Html</span> <span class="token hvariable">exposing</span> <span class="token punctuation">(</span><span class="token constant">Html</span><span class="token punctuation">,</span> <span class="token hvariable">button</span><span class="token punctuation">,</span> <span class="token builtin">div</span><span class="token punctuation">,</span> <span class="token hvariable">text</span><span class="token punctuation">,</span> <span class="token hvariable">input</span><span class="token punctuation">,</span> <span class="token hvariable">select</span><span class="token punctuation">,</span> <span class="token hvariable">option</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Html<span class="token punctuation">.</span>Attributes</span> <span class="token hvariable">exposing</span> <span class="token punctuation">(</span><span class="token hvariable">value</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Html<span class="token punctuation">.</span>Events</span> <span class="token hvariable">exposing</span> <span class="token punctuation">(</span><span class="token hvariable">onClick</span><span class="token punctuation">,</span> <span class="token hvariable">onInput</span><span class="token punctuation">)</span>

<span class="token comment">-- util</span>

<span class="token keyword">type</span> <span class="token constant">Shape</span> <span class="token operator">=</span> <span class="token constant">Circle</span> <span class="token operator">|</span> <span class="token constant">Square</span>

<span class="token hvariable">calculateArea</span> <span class="token operator">:</span> <span class="token constant">Shape</span> <span class="token operator">-></span> <span class="token constant">Float</span> <span class="token operator">-></span> <span class="token constant">Float</span>
<span class="token hvariable">calculateArea</span> <span class="token hvariable">shape</span> <span class="token hvariable">value</span> <span class="token operator">=</span>
  <span class="token keyword">case</span> <span class="token hvariable">shape</span> <span class="token keyword">of</span>
    <span class="token constant">Circle</span> <span class="token operator">-></span> <span class="token builtin">pi</span> <span class="token operator">*</span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>
    
    <span class="token constant">Square</span> <span class="token operator">-></span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>
    
<span class="token comment">-- MAIN</span>

<span class="token hvariable">main</span> <span class="token operator">=</span>
  <span class="token hvariable">Browser<span class="token punctuation">.</span>sandbox</span> <span class="token punctuation">{</span> <span class="token builtin">init</span> <span class="token operator">=</span> <span class="token builtin">init</span><span class="token punctuation">,</span> <span class="token hvariable">update</span> <span class="token operator">=</span> <span class="token hvariable">update</span><span class="token punctuation">,</span> <span class="token hvariable">view</span> <span class="token operator">=</span> <span class="token hvariable">view</span> <span class="token punctuation">}</span>

<span class="token comment">-- MODEL</span>

<span class="token keyword">type</span> <span class="token hvariable">alias</span> <span class="token constant">Model</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token constant">Shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token operator">:</span> <span class="token constant">Float</span><span class="token punctuation">,</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token constant">Float</span> <span class="token punctuation">}</span>

<span class="token builtin">init</span> <span class="token operator">:</span> <span class="token constant">Model</span>
<span class="token builtin">init</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span> <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token hvariable">area</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span>

<span class="token comment">-- UPDATE</span>

<span class="token keyword">type</span> <span class="token constant">Msg</span>
  <span class="token operator">=</span> <span class="token constant">ShapeChanged</span> <span class="token constant">Shape</span>
  <span class="token operator">|</span> <span class="token constant">ValueChanged</span> <span class="token constant">Float</span>
  <span class="token operator">|</span> <span class="token constant">CalculateArea</span>

<span class="token hvariable">update</span> <span class="token operator">:</span> <span class="token constant">Msg</span> <span class="token operator">-></span> <span class="token constant">Model</span> <span class="token operator">-></span> <span class="token constant">Model</span>
<span class="token hvariable">update</span> <span class="token hvariable">msg</span> <span class="token hvariable">model</span> <span class="token operator">=</span>
  <span class="token keyword">case</span> <span class="token hvariable">msg</span> <span class="token keyword">of</span>
    <span class="token constant">ShapeChanged</span> <span class="token hvariable">shape</span> <span class="token operator">-></span>
      <span class="token punctuation">{</span> <span class="token hvariable">model</span> <span class="token operator">|</span> <span class="token hvariable">shape</span> <span class="token operator">=</span> <span class="token hvariable">shape</span> <span class="token punctuation">}</span>

    <span class="token constant">ValueChanged</span> <span class="token hvariable">value</span> <span class="token operator">-></span>
      <span class="token punctuation">{</span> <span class="token hvariable">model</span> <span class="token operator">|</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span>
      
    <span class="token constant">CalculateArea</span> <span class="token operator">-></span>
      <span class="token punctuation">{</span> <span class="token hvariable">model</span> <span class="token operator">|</span> <span class="token hvariable">area</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token hvariable">calculateArea</span> <span class="token hvariable">model</span><span class="token punctuation">.</span><span class="token hvariable">shape</span> <span class="token hvariable">model</span><span class="token punctuation">.</span><span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token comment">-- VIEW</span>

<span class="token hvariable">onShapeChanged</span> <span class="token operator">:</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Msg</span>
<span class="token hvariable">onShapeChanged</span> <span class="token hvariable">shape</span> <span class="token operator">=</span> 
  <span class="token keyword">case</span> <span class="token hvariable">shape</span> <span class="token keyword">of</span>
    <span class="token string">"circle"</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token constant">Circle</span>
    <span class="token string">"square"</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token constant">Square</span>

<span class="token hvariable">onValueChanged</span> <span class="token operator">:</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Msg</span>
<span class="token hvariable">onValueChanged</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token constant">ValueChanged</span> <span class="token punctuation">(</span><span class="token hvariable">Maybe<span class="token punctuation">.</span>withDefault</span> <span class="token number">0</span> <span class="token punctuation">(</span><span class="token hvariable">String<span class="token punctuation">.</span>toFloat</span> <span class="token hvariable">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token hvariable">view</span> <span class="token operator">:</span> <span class="token constant">Model</span> <span class="token operator">-></span> <span class="token constant">Html</span> <span class="token constant">Msg</span>
<span class="token hvariable">view</span> <span class="token hvariable">model</span> <span class="token operator">=</span>
  <span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span> <span class="token hvariable">select</span> <span class="token punctuation">[</span> <span class="token hvariable">onInput</span> <span class="token hvariable">onShapeChanged</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> 
      <span class="token hvariable">option</span> <span class="token punctuation">[</span> <span class="token hvariable">value</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">text</span> <span class="token string">"Choose shape"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span> 
      <span class="token hvariable">option</span> <span class="token punctuation">[</span> <span class="token hvariable">value</span> <span class="token string">"circle"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">text</span> <span class="token string">"Circle"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token hvariable">option</span> <span class="token punctuation">[</span> <span class="token hvariable">value</span> <span class="token string">"square"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">text</span> <span class="token string">"Square"</span> <span class="token punctuation">]</span> <span class="token punctuation">]</span>
    <span class="token punctuation">,</span> <span class="token hvariable">input</span> <span class="token punctuation">[</span> <span class="token hvariable">value</span> <span class="token punctuation">(</span><span class="token hvariable">String<span class="token punctuation">.</span>fromFloat</span> <span class="token hvariable">model</span><span class="token punctuation">.</span><span class="token hvariable">value</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token hvariable">onInput</span> <span class="token hvariable">onValueChanged</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">,</span> <span class="token hvariable">button</span> <span class="token punctuation">[</span> <span class="token hvariable">onClick</span> <span class="token constant">CalculateArea</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">text</span> <span class="token string">"Calculate area"</span> <span class="token punctuation">]</span>
    <span class="token punctuation">,</span> <span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">text</span> <span class="token punctuation">(</span><span class="token string">"Area: "</span> <span class="token operator">++</span> <span class="token punctuation">(</span><span class="token hvariable">String<span class="token punctuation">.</span>fromFloat</span> <span class="token hvariable">model</span><span class="token punctuation">.</span><span class="token hvariable">area</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">]</span>
    <span class="token punctuation">]</span>
</code></pre>
<p>Note that it won’t compile:</p>
<pre><code>-- TYPE MISMATCH ----------------------------------------------- Jump To Problem

Something is off with the body of the `init` definition:

29| init = { shape = &quot;&quot;, value = 0, area = 0 }
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The body is a record of type:

    { area : Float, shape : String, value : Float }

But the type annotation on `init` says it should be:

    Model
</code></pre>
<!--more-->

<p>You can’t have a default value for a type (the way enums are implemented in Elm / Haskell / ML-like languages) that is outside of the type values’ range. You have to either use a valid value or stick to something like <code>Maybe</code>:</p>
<pre><code class="language-haskell"><span class="token keyword">type</span> <span class="token hvariable">alias</span> <span class="token constant">Model</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token operator">:</span> <span class="token constant">Float</span><span class="token punctuation">,</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token constant">Float</span> <span class="token punctuation">}</span>

<span class="token builtin">init</span> <span class="token operator">:</span> <span class="token constant">Model</span>
<span class="token builtin">init</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span> <span class="token operator">=</span> <span class="token constant">Nothing</span><span class="token punctuation">,</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token hvariable">area</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span>

<span class="token comment">-- UPDATE</span>

<span class="token keyword">type</span> <span class="token constant">Msg</span>
  <span class="token operator">=</span> <span class="token constant">ShapeChanged</span> <span class="token punctuation">(</span><span class="token constant">Maybe</span> <span class="token constant">Shape</span><span class="token punctuation">)</span>
  <span class="token operator">|</span> <span class="token constant">ValueChanged</span> <span class="token constant">Float</span>
  <span class="token operator">|</span> <span class="token constant">CalculateArea</span>

<span class="token hvariable">update</span> <span class="token operator">:</span> <span class="token constant">Msg</span> <span class="token operator">-></span> <span class="token constant">Model</span> <span class="token operator">-></span> <span class="token constant">Model</span>
<span class="token hvariable">update</span> <span class="token hvariable">msg</span> <span class="token hvariable">model</span> <span class="token operator">=</span>
  <span class="token keyword">case</span> <span class="token hvariable">msg</span> <span class="token keyword">of</span>
    <span class="token constant">ShapeChanged</span> <span class="token hvariable">shape</span> <span class="token operator">-></span>
      <span class="token punctuation">{</span> <span class="token hvariable">model</span> <span class="token operator">|</span> <span class="token hvariable">shape</span> <span class="token operator">=</span> <span class="token hvariable">shape</span> <span class="token punctuation">}</span>

    <span class="token constant">ValueChanged</span> <span class="token hvariable">value</span> <span class="token operator">-></span>
      <span class="token punctuation">{</span> <span class="token hvariable">model</span> <span class="token operator">|</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span>
      
    <span class="token constant">CalculateArea</span> <span class="token operator">-></span>
      <span class="token punctuation">{</span> <span class="token hvariable">model</span> <span class="token operator">|</span> <span class="token hvariable">area</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token hvariable">Maybe<span class="token punctuation">.</span>withDefault</span> <span class="token number">0</span> <span class="token punctuation">(</span><span class="token constant">Maybe</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token punctuation">(</span><span class="token operator">\</span><span class="token hvariable">shape</span> <span class="token operator">-></span> <span class="token hvariable">calculateArea</span> <span class="token hvariable">shape</span> <span class="token hvariable">model</span><span class="token punctuation">.</span><span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token hvariable">model</span><span class="token punctuation">.</span><span class="token hvariable">shape</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token comment">-- VIEW</span>

<span class="token hvariable">onShapeChanged</span> <span class="token operator">:</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Msg</span>
<span class="token hvariable">onShapeChanged</span> <span class="token hvariable">shape</span> <span class="token operator">=</span> 
  <span class="token keyword">case</span> <span class="token hvariable">shape</span> <span class="token keyword">of</span>
    <span class="token string">"circle"</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Circle</span><span class="token punctuation">)</span>
    <span class="token string">"square"</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Square</span><span class="token punctuation">)</span>
    <span class="token hvariable">_</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token constant">Nothing</span>

<span class="token hvariable">onValueChanged</span> <span class="token operator">:</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Msg</span>
<span class="token hvariable">onValueChanged</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token constant">ValueChanged</span> <span class="token punctuation">(</span><span class="token hvariable">Maybe<span class="token punctuation">.</span>withDefault</span> <span class="token number">0</span> <span class="token punctuation">(</span><span class="token hvariable">String<span class="token punctuation">.</span>toFloat</span> <span class="token hvariable">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>
<p>See how this simple fact changes the whole implementation. Not sure if that is a good news, though.</p>
<p>Now even with these changes the code won’t compile, since there is one code path uncovered - user selecting a value other than <code>circle</code> or <code>square</code> (the default one):</p>
<pre><code>-- MISSING PATTERNS -------------------------------------------- Jump To Problem

This `case` does not have branches for all possibilities:

54|&gt;  case shape of
55|&gt;    &quot;circle&quot; -&gt; ShapeChanged (Just Circle)
56|&gt;    &quot;square&quot; -&gt; ShapeChanged (Just Square)

Missing possibilities include:

    _

I would have to crash if I saw one of those. Add branches for them!

Hint: If you want to write the code for each branch later, use `Debug.todo` as a
placeholder. Read &lt;https://elm-lang.org/0.19.1/missing-patterns&gt; for more
guidance on this workflow.
</code></pre>
<p>Elm <em>forces</em> you to cover that path.</p>
<pre><code class="language-haskell"><span class="token hvariable">onShapeChanged</span> <span class="token operator">:</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Msg</span>
<span class="token hvariable">onShapeChanged</span> <span class="token hvariable">shape</span> <span class="token operator">=</span> 
  <span class="token keyword">case</span> <span class="token hvariable">shape</span> <span class="token keyword">of</span>
    <span class="token string">"circle"</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Circle</span><span class="token punctuation">)</span>
    <span class="token string">"square"</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Square</span><span class="token punctuation">)</span>
    <span class="token hvariable">_</span> <span class="token operator">-></span> <span class="token constant">ShapeChanged</span> <span class="token constant">Nothing</span>
</code></pre>
<p>See how awesome error messages from Elm are and how they really help you figure out what the issues are and fix errors.</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>