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

    <main class="svelte-1gr3n62"><article><h1>Strongly-typed front-end: introduction</h1>

    <time>18 Apr 2021 at 23:36</time>

    <div class="content"><p>In this little research project I describe my journey through a series of experiments trying out a number of technologies and clashing them against each other.</p>
<p>I have always questioned the <em>real value</em> all those languages that compile to JS, especially TypeScript or Flow, give you.</p>
<p>So I have asked Atlassian front-enders a question:</p>
<blockquote>
<p>I need your opinions for my research: what benefits does TypeScript (or Flow, depending on your camp) give you? why do you use it?</p>
</blockquote>
<p>The answers I have received varied but the common themes were:</p>
<ul>
<li>we like types! 😍</li>
<li>less errors</li>
<li>easier refactoring</li>
<li>tools &amp; IDEs integration (mainly for code navigation and autocomplete)</li>
<li>self-documented or more readable code</li>
</ul>
<p>The issues I see with TypeScript and Flow are bit closer to the real world:</p>
<ul>
<li>they catch way too few errors - unless your <strong>whole project</strong> (including 3rd party dependencies) is using the thing <strong>correctly</strong>, you will see the errors whenever you end up in the layer between native JS and typed code</li>
<li>more often than not, error messages are either pointless or hard to read (see the examples below)</li>
</ul>
<p>I do acknowledge the earlier you catch an error, the cheaper the fix would be. You have to put some effort into writing the typed code, but if it only catches a fraction of errors and only at compile time, then why all the hassle?</p>
<h2 id="benefits-of-typescript">“Benefits” of TypeScript</h2>
<h3 id="pointless-errors">Pointless errors</h3>
<p>The most issues I have seen so far happen in what is considered an stdlib:</p>
<pre><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a<span class="token operator">:</span> MyClass<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> id <span class="token operator">:</span> <span class="token string">'moo'</span><span class="token punctuation">,</span> val<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> val<span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> val<span class="token operator">:</span> <span class="token number">3.14</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> counts <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>acc<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> acc<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Here we are reducing a list of objects. TS is freaking out every time you are using <code>Map</code> (however, it is a natively supported type, IIRC) - calling <code>map.get()</code> will always produce <code>T | undefined</code> type, unless you explicitly tell TS the type is <code>T</code> by using the <code>as</code> operator:</p>
<pre><code class="language-ts">acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ERROR: Object is possibly 'undefined'.</span>
</code></pre>
<p>Adding an explicit check does not have any effect:</p>
<pre><code class="language-ts"><span class="token keyword">if</span> <span class="token punctuation">(</span>acc<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TS does not give a damn: Object is possibly 'undefined'.</span>
<span class="token punctuation">}</span>
</code></pre>
<p>whereas</p>
<pre><code class="language-ts">acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">number</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// OK</span>
</code></pre>
<p>But the issue is: if you do not add the check, the value in fact might be <code>undefined</code>.</p>
<p>Flow has flaws here too:</p>
<pre><code class="language-js"><span class="token comment">/* @flow */</span>

<span class="token keyword">interface</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> string<span class="token punctuation">;</span>
  <span class="token literal-property property">val</span><span class="token operator">:</span> number<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token literal-property property">a</span><span class="token operator">:</span> MyClass<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span> <span class="token operator">:</span> <span class="token string">'moo'</span><span class="token punctuation">,</span> <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> 
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token literal-property property">val</span><span class="token operator">:</span> <span class="token number">3.14</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> counts <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> e</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>acc<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// ERROR: Cannot perform arithmetic operation because undefined [1] is not a number. [unsafe-addition]</span>
    acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">return</span> acc<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token operator">&lt;</span>string<span class="token punctuation">,</span> number<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>But it provides a bit more context about the issue:</p>
<pre><code>    16:     acc.set(e.id, acc.get(e.id) + e.val);
                          ^ Cannot perform arithmetic operation because undefined [1] is not a number. [unsafe-addition]
        References:
        [LIB] ..//static/v0.135.0/flowlib/core.js:617:     get(key: K): V | void;
                                                                            ^ [1]
</code></pre>
<p>Both Flow and TS work fine if you extract the <code>.get</code> call result to a variable and add a check for <code>undefined</code>:</p>
<pre><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> a<span class="token operator">:</span> MyClass<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> id <span class="token operator">:</span> <span class="token string">'moo'</span><span class="token punctuation">,</span> val<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> 
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span> val<span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> id<span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span> val<span class="token operator">:</span> <span class="token number">3.14</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> counts <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span>acc<span class="token punctuation">,</span> e<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> prevVal <span class="token operator">=</span> acc<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>prevVal <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> prevVal <span class="token operator">+</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        acc<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>id<span class="token punctuation">,</span> e<span class="token punctuation">.</span>val<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> acc<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Map<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">number</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h3 id="implementation-specific-errors">Implementation-specific errors</h3>
<p>In order to <em>understand</em> this error message, you have to know how enums are implemented in TypeScript:</p>
<pre><code class="language-ts"><span class="token keyword">enum</span> Figure <span class="token punctuation">{</span>
  <span class="token constant">RECTANGLE</span><span class="token punctuation">,</span>
  <span class="token constant">SQUARE</span><span class="token punctuation">,</span>
  <span class="token constant">CIRCLE</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> area<span class="token operator">:</span> Record<span class="token operator">&lt;</span>Figure<span class="token punctuation">,</span> <span class="token builtin">Function</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Figure<span class="token punctuation">.</span><span class="token constant">RECTANGLE</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">(</span>w<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> h<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> w <span class="token operator">*</span> h<span class="token punctuation">,</span>
  <span class="token punctuation">[</span>Figure<span class="token punctuation">.</span><span class="token constant">CIRCLE</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">(</span>r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> r <span class="token operator">*</span> r<span class="token punctuation">,</span>
  <span class="token comment">// ERROR: Property '1' is missing in type '{ 0: (w: number, h: number) => number; 2: (r: number) => number; }' but required in type 'Record&lt;Figure, Function>'.</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>area<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Enums in TS are backed by numbers, <em>by default</em>. In order for that error above to make sense, you have to provide some sort of a reasonable (<code>.toString()</code>-backed) value for enum values:</p>
<pre><code class="language-ts"><span class="token keyword">enum</span> Figure <span class="token punctuation">{</span>
  <span class="token constant">RECTANGLE</span> <span class="token operator">=</span> <span class="token string">'RECTANGLE'</span><span class="token punctuation">,</span>
  <span class="token constant">SQUARE</span> <span class="token operator">=</span> <span class="token string">'SQUARE'</span><span class="token punctuation">,</span>
  <span class="token constant">CIRCLE</span> <span class="token operator">=</span> <span class="token string">'CIRCLE'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> area<span class="token operator">:</span> Record<span class="token operator">&lt;</span>Figure<span class="token punctuation">,</span> <span class="token builtin">Function</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Figure<span class="token punctuation">.</span><span class="token constant">RECTANGLE</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">(</span>w<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> h<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> w <span class="token operator">*</span> h<span class="token punctuation">,</span>
  <span class="token punctuation">[</span>Figure<span class="token punctuation">.</span><span class="token constant">CIRCLE</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">(</span>r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> r <span class="token operator">*</span> r<span class="token punctuation">,</span>
  <span class="token comment">// ERROR: Property 'SQUARE' is missing in type '{ RECTANGLE: (w: number, h: number) => number; CIRCLE: (r: number) => number; }' but required in type 'Record&lt;Figure, Function>'.</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>area<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h3 id="runtime-is-imperfect">Runtime is imperfect</h3>
<p>You might have typed every single bit of your project and all the 3rd party dependencies. And you did it right. This still does not guarantee you won’t have <code>Can not read property XXX of undefined or XXX is not a function</code> at run time.</p>
<p>Type system won’t really save you, if you only have covered some of the use cases, but the user ended up in uncovered one:</p>
<pre><code class="language-ts"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useCallback <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span>

<span class="token keyword">enum</span> Shape <span class="token punctuation">{</span>
  <span class="token constant">SQUARE</span> <span class="token operator">=</span> <span class="token string">'SQUARE'</span><span class="token punctuation">,</span>
  <span class="token constant">CIRCLE</span> <span class="token operator">=</span> <span class="token string">'CIRCLE'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token constant">AREA</span><span class="token operator">:</span> Record<span class="token operator">&lt;</span>Shape<span class="token punctuation">,</span> <span class="token builtin">Function</span><span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span>Shape<span class="token punctuation">.</span><span class="token constant">SQUARE</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">(</span>side<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> side <span class="token operator">*</span> side<span class="token punctuation">,</span>
  <span class="token punctuation">[</span>Shape<span class="token punctuation">.</span><span class="token constant">CIRCLE</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token punctuation">(</span>r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">=></span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> r <span class="token operator">*</span> r<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>shape<span class="token punctuation">,</span> setShape<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">useState</span><span class="token generic class-name"><span class="token operator">&lt;</span>Shape<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>value<span class="token punctuation">,</span> setValue<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">useState</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>area<span class="token punctuation">,</span> setArea<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">useState</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> onShapeChanged <span class="token operator">=</span> <span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token operator">:</span> React<span class="token punctuation">.</span>ChangeEvent<span class="token operator">&lt;</span>HTMLSelectElement<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setShape</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> onValueChanged <span class="token operator">=</span> <span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token operator">:</span> React<span class="token punctuation">.</span>ChangeEvent<span class="token operator">&lt;</span>HTMLInputElement<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setValue</span><span class="token punctuation">(</span><span class="token function">parseFloat</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> onSubmit <span class="token operator">=</span> <span class="token function">useCallback</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">setArea</span><span class="token punctuation">(</span><span class="token constant">AREA</span><span class="token punctuation">[</span>shape<span class="token punctuation">]</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>shape<span class="token punctuation">,</span> value<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>select onChange<span class="token operator">=</span><span class="token punctuation">{</span>onShapeChanged<span class="token punctuation">}</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>option value<span class="token operator">=</span><span class="token string">""</span><span class="token operator">></span>Choose shape<span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">></span>

        <span class="token punctuation">{</span>Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token constant">AREA</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>shape <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token operator">&lt;</span>option value<span class="token operator">=</span><span class="token punctuation">{</span>shape<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span>shape<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>option<span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>select<span class="token operator">></span>

      <span class="token operator">&lt;</span>input value<span class="token operator">=</span><span class="token punctuation">{</span>value<span class="token punctuation">}</span> onChange<span class="token operator">=</span><span class="token punctuation">{</span>onValueChanged<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>

      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>onSubmit<span class="token punctuation">}</span><span class="token operator">></span>Calculate area<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>

      <span class="token operator">&lt;</span>div<span class="token operator">></span>
        Area<span class="token operator">:</span> <span class="token punctuation">{</span>area<span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>This is a quite simple application (<a href="https://codesandbox.io/s/happy-sutherland-1qtwb">sandbox</a>), built on top of the previous example with enums and records in TypeScript.</p>
<p>There are at least two uncovered scenarios in this application, resulting in errors:</p>
<ol>
<li>when user does not select a shape and clicks “calculate”, the <code>TypeError: AREA[shape] is not a function</code> will be thrown</li>
<li>when user types anything but number in the input, the value immediately becomes <code>NaN</code>; if user then clicks “calculate”, an error won’t be thrown (since the app does not use the calculation result in any way), but the area calculated will also be <code>NaN</code>; for this example this is fine, but imagine using the value further down the line in some financial calculations</li>
</ol>
<p>This is a trivial synthetic example and the errors might be easy to spot and fix, but the important question is: <em>did TypeScript help you find those errors?</em></p>
<p>If you set up TSLint, you might have <em>some</em> errors caught:</p>
<pre><code>Argument of type &#39;null&#39; is not assignable to parameter of type &#39;Shape | (() =&gt; Shape)&#39;.ts(2345)
Argument of type &#39;string&#39; is not assignable to parameter of type &#39;SetStateAction&lt;Shape&gt;&#39;.ts(2345)
Type &#39;null&#39; cannot be used as an index type.ts(2538)
</code></pre>
<p>Unless you do the right thing, you <em>might</em> end up fixing those scenarios. But instead, I often see solutions like these (<a href="https://codesandbox.io/s/winter-river-dvzwd">sandbox</a>):</p>
<pre><code class="language-ts"><span class="token keyword">const</span> <span class="token punctuation">[</span>shape<span class="token punctuation">,</span> setShape<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token generic-function"><span class="token function">useState</span><span class="token generic class-name"><span class="token operator">&lt;</span>Shape <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token function">setShape</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value <span class="token keyword">as</span> Shape<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token function">setArea</span><span class="token punctuation">(</span>shape <span class="token operator">?</span> <span class="token constant">AREA</span><span class="token punctuation">[</span>shape<span class="token punctuation">]</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Those solutions do solve a subset of errors, at a cost of readability and potential other errors.</p>
<h3 id="there-are-no-classes-in-javascript">There are no classes in JavaScript</h3>
<p>Found this one recently, apparently TypeScript classes are same as JavaScript (ES6) classes:</p>
<pre><code class="language-ts"><span class="token keyword">namespace</span> TypeScriptIsGarbage <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">A</span> <span class="token operator">=></span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">B</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// perfectly fine</span>

  <span class="token keyword">export</span> <span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">B</span> <span class="token operator">=></span> <span class="token keyword">new</span> <span class="token class-name"><span class="token constant">A</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// perfectly fine</span>
<span class="token punctuation">}</span>

<span class="token keyword">namespace</span> TypeScriptIsJavaScript <span class="token punctuation">{</span>
  <span class="token keyword">export</span> <span class="token keyword">enum</span> Types <span class="token punctuation">{</span>
    <span class="token constant">A</span><span class="token punctuation">,</span>
    <span class="token constant">B</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name"><span class="token constant">A</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> Types<span class="token punctuation">.</span><span class="token constant">A</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name"><span class="token constant">B</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span> type<span class="token operator">:</span> Types<span class="token punctuation">.</span><span class="token constant">B</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">export</span> <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">A</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> Types<span class="token punctuation">.</span><span class="token constant">B</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Type 'Types.B' is not assignable to type 'Types.A'.</span>

  <span class="token keyword">export</span> <span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">B</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> Types<span class="token punctuation">.</span><span class="token constant">A</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Type 'Types.A' is not assignable to type 'Types.B'.</span>
<span class="token punctuation">}</span>
</code></pre>
<p>This one is actually quite serious, if your application relies on type safety and objective-oriented-design.</p>
<p>Try doing it in C# (which TS tries to inherit from, iirc) and yo’ll get sane compile-time errors:</p>
<pre><code class="language-csharp"><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
  <span class="token return-type class-name">A</span> <span class="token function">createA</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Cannot implicitly convert type `B` to `A`</span>
  <span class="token punctuation">}</span>

  <span class="token return-type class-name">B</span> <span class="token function">createB</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Cannot implicitly convert type `A` to `B`</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<h3 id="ide-integration-is-awesome">IDE integration is awesome</h3>
<p>Recently I had to use both Cypress and Jest in a project of mine. Cypress was used for E2E tests and Jest was used for unit-tests. And they both provide some sort of assertion framework (think all those <code>expect()</code> calls).</p>
<p>And apparently their definitions are different and are clashing, since my VSCode looks like this:</p>
<LazyImg src="/images/strongly-typed-front-end/ts-vscode-integration-1.png" alt="TS definitions errors in VSCode" />

<LazyImg src="/images/strongly-typed-front-end/ts-vscode-integration-2.png" alt="TS definitions errors in VSCode" />

<p>Apparently, I needed two separate <code>tsconfig.json</code> files, for each specific set of tests to even compile the thing. Which is still not recognized by VSCode.</p>
<h3 id="errors-can-be-found-and-eliminated-early">Errors can be found and eliminated early</h3>
<p>The helpfulness of the error messages by TS compiler is far from perfect. And same holds for TSLint.</p>
<p>And in some cases (as with type checks), they are even completely missing, so good luck finding out why the application does not work.</p>
<p>It is possible to add a bunch of <code>debugger</code> statements, breakpoints and <code>console.log()</code>s to the code. But what is the benefit of that complex setup and extra overhead of typing every single line then?</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>