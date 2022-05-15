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

    <main class="svelte-1gr3n62"><article><h1>Strongly-typed front-end: experiment 2, simple application, in PureScript</h1>

    <time>19 Apr 2021 at 00:47</time>

    <div class="content"><p>In PureScript world there are quite a few libraries for React. And all of them have terrible (or rather non-existent) documentation, so I had to use as much intuition as outdated and barely working code samples.</p>
<p>Initial application structure:</p>
<pre><code class="language-haskell"><span class="token keyword">module</span> <span class="token constant">Main</span> <span class="token keyword">where</span>

<span class="token import-statement"><span class="token keyword">import</span> Prelude</span>

<span class="token import-statement"><span class="token keyword">import</span> Control<span class="token punctuation">.</span>Monad<span class="token punctuation">.</span>Eff</span>

<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Maybe</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Maybe<span class="token punctuation">.</span>Unsafe</span> <span class="token punctuation">(</span><span class="token hvariable">fromJust</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Nullable</span> <span class="token punctuation">(</span><span class="token hvariable">toMaybe</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Effect</span> <span class="token punctuation">(</span><span class="token constant">Effect</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Effect<span class="token punctuation">.</span>Console</span> <span class="token punctuation">(</span><span class="token builtin">log</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> DOM</span> <span class="token punctuation">(</span><span class="token constant">DOM</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> DOM<span class="token punctuation">.</span>HTML</span> <span class="token punctuation">(</span><span class="token hvariable">window</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> DOM<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>Document</span> <span class="token punctuation">(</span><span class="token hvariable">body</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> DOM<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>Types</span> <span class="token punctuation">(</span><span class="token hvariable">htmlElementToElement</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> DOM<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>Window</span> <span class="token punctuation">(</span><span class="token hvariable">document</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> DOM<span class="token punctuation">.</span>Node<span class="token punctuation">.</span>Types</span> <span class="token punctuation">(</span><span class="token constant">Element</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> React</span>

<span class="token import-statement"><span class="token keyword">import</span> React<span class="token punctuation">.</span>DOM <span class="token keyword">as</span> DOM</span>
<span class="token import-statement"><span class="token keyword">import</span> React<span class="token punctuation">.</span>DOM<span class="token punctuation">.</span>Props <span class="token keyword">as</span> Props</span>

<span class="token keyword">type</span> <span class="token constant">Shape</span> <span class="token operator">=</span> <span class="token constant">Circle</span> <span class="token operator">|</span> <span class="token constant">Square</span>

<span class="token hvariable">calculateArea</span> <span class="token operator">::</span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span> <span class="token operator">-></span> <span class="token constant">Float</span> <span class="token operator">-></span> <span class="token constant">Float</span>
<span class="token hvariable">calculateArea</span> <span class="token constant">Nothing</span> <span class="token hvariable">_</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token hvariable">calculateArea</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Circle</span><span class="token punctuation">)</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token builtin">pi</span> <span class="token operator">*</span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>
<span class="token hvariable">calculateArea</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Square</span><span class="token punctuation">)</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>

<span class="token hvariable">getShape</span> <span class="token operator">::</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span>
<span class="token hvariable">getShape</span> <span class="token string">"circle"</span> <span class="token operator">=</span> <span class="token constant">Just</span> <span class="token constant">Circle</span>
<span class="token hvariable">getShape</span> <span class="token string">"square"</span> <span class="token operator">=</span> <span class="token constant">Just</span> <span class="token constant">Square</span>
<span class="token hvariable">getShape</span> <span class="token hvariable">_</span> <span class="token operator">=</span> <span class="token constant">Nothing</span>

<span class="token hvariable">onShapeChanged</span> <span class="token hvariable">ctx</span> <span class="token hvariable">evt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token hvariable">writeState</span> <span class="token hvariable">ctx</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token hvariable">getShape</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token hvariable">unsafeCoerce</span> <span class="token hvariable">evt</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token hvariable">target</span><span class="token punctuation">.</span><span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token hvariable">onCalculateAreaClicked</span> <span class="token hvariable">ctx</span> <span class="token hvariable">evt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span> <span class="token operator">&lt;-</span> <span class="token hvariable">readState</span> <span class="token hvariable">ctx</span>
  <span class="token hvariable">writeState</span> <span class="token hvariable">ctx</span> <span class="token punctuation">{</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token hvariable">calculateArea</span> <span class="token hvariable">shape</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span>

<span class="token hvariable">areaCalculator</span> <span class="token operator">=</span> <span class="token hvariable">createClass</span> <span class="token operator">$</span> <span class="token hvariable">spec</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token constant">Nothing</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span> <span class="token operator">\</span><span class="token hvariable">ctx</span> <span class="token operator">-></span> <span class="token keyword">do</span>
  <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token punctuation">,</span> <span class="token hvariable">area</span> <span class="token punctuation">}</span> <span class="token operator">&lt;-</span> <span class="token hvariable">readState</span> <span class="token hvariable">ctx</span>
  <span class="token builtin">return</span> <span class="token operator">$</span> <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
    <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
      <span class="token hvariable">DOM<span class="token punctuation">.</span>select</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>onChange</span> <span class="token punctuation">(</span><span class="token hvariable">onShapeChanged</span> <span class="token hvariable">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span>
          <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Select shape"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">"circle"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Circle"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">"square"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Square"</span> <span class="token punctuation">]</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token hvariable">DOM<span class="token punctuation">.</span>input</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token punctuation">(</span><span class="token builtin">show</span> <span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token hvariable">DOM<span class="token punctuation">.</span>button</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>onClick</span> <span class="token punctuation">(</span><span class="token hvariable">onCalculateAreaClicked</span> <span class="token hvariable">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Calculate area"</span> <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
      <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token punctuation">(</span><span class="token string">"Area: "</span> <span class="token operator">++</span> <span class="token punctuation">(</span><span class="token builtin">show</span> <span class="token hvariable">area</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
    <span class="token punctuation">]</span>

<span class="token hvariable">main</span> <span class="token operator">=</span> <span class="token hvariable">container</span> <span class="token operator">>>=</span> <span class="token hvariable">render</span> <span class="token hvariable">ui</span>
  <span class="token keyword">where</span>
  <span class="token hvariable">ui</span> <span class="token operator">::</span> <span class="token constant">ReactElement</span>
  <span class="token hvariable">ui</span> <span class="token operator">=</span> <span class="token hvariable">createFactory</span> <span class="token hvariable">areaCalculator</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token hvariable">container</span> <span class="token operator">::</span> <span class="token hvariable">forall</span> <span class="token hvariable">eff</span><span class="token punctuation">.</span> <span class="token constant">Eff</span> <span class="token punctuation">(</span><span class="token hvariable">dom</span> <span class="token operator">::</span> <span class="token constant">DOM</span> <span class="token operator">|</span> <span class="token hvariable">eff</span><span class="token punctuation">)</span> <span class="token constant">Element</span>
  <span class="token hvariable">container</span> <span class="token operator">=</span> <span class="token keyword">do</span>
    <span class="token hvariable">win</span> <span class="token operator">&lt;-</span> <span class="token hvariable">window</span>
    <span class="token hvariable">doc</span> <span class="token operator">&lt;-</span> <span class="token hvariable">document</span> <span class="token hvariable">win</span>
    <span class="token hvariable">elt</span> <span class="token operator">&lt;-</span> <span class="token hvariable">fromJust</span> <span class="token operator">&lt;$></span> <span class="token hvariable">toMaybe</span> <span class="token operator">&lt;$></span> <span class="token hvariable">body</span> <span class="token hvariable">doc</span>
    <span class="token builtin">return</span> <span class="token operator">$</span> <span class="token hvariable">htmlElementToElement</span> <span class="token hvariable">elt</span>
</code></pre>
<!--more-->

<p>Immediately the flaws of the infrastructure come out:</p>
<pre><code>$ spago build                                                                                                                                                                                                                                           1 ↵
Error 1 of 8:

  in module Main
  at src/Main.purs:5:1 - 5:25 (line 5, column 1 - line 5, column 25)

    Module Control.Monad.Eff was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.

Error 2 of 8:

  in module Main
  at src/Main.purs:8:1 - 8:36 (line 8, column 1 - line 8, column 36)

    Module Data.Maybe.Unsafe was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.

Error 3 of 8:

  in module Main
  at src/Main.purs:14:1 - 14:19 (line 14, column 1 - line 14, column 19)

    Module DOM was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.

Error 4 of 8:

  in module Main
  at src/Main.purs:15:1 - 15:25 (line 15, column 1 - line 15, column 25)

    Module DOM.HTML was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.

Error 5 of 8:

  in module Main
  at src/Main.purs:16:1 - 16:32 (line 16, column 1 - line 16, column 32)

    Module DOM.HTML.Document was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.

Error 6 of 8:

  in module Main
  at src/Main.purs:17:1 - 17:45 (line 17, column 1 - line 17, column 45)

    Module DOM.HTML.Types was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.

Error 7 of 8:

  in module Main
  at src/Main.purs:18:1 - 18:34 (line 18, column 1 - line 18, column 34)

    Module DOM.HTML.Window was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.

Error 8 of 8:

  in module Main
  at src/Main.purs:20:1 - 20:34 (line 20, column 1 - line 20, column 34)

    Module DOM.Node.Types was not found.
    Make sure the source file exists, and that it has been provided as an input to the compiler.


  See https://github.com/purescript/documentation/blob/master/errors/ModuleNotFound.md for more information,
  or to contribute content related to this error.


[error] Failed to build.
</code></pre>
<p>Well, the error messages kind of point you to the source of error - the modules have not been provided to the compiler. </p>
<p>Had to use documentation for each of the packages to match the types and fix the imports (since the <a href="https://github.com/ethul/purescript-react#example">example</a> I have relied upon is way out of date):</p>
<pre><code class="language-bash">$ spago <span class="token function">install</span> purescript-web-dom purescript-web-html react-dom
</code></pre>
<p>And adjust the code itself:</p>
<pre><code class="language-haskell"><span class="token keyword">module</span> <span class="token constant">Main</span> <span class="token keyword">where</span>

<span class="token import-statement"><span class="token keyword">import</span> Prelude</span>

<span class="token import-statement"><span class="token keyword">import</span> Effect</span> <span class="token punctuation">(</span><span class="token constant">Effect</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Maybe</span>

<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML</span> <span class="token punctuation">(</span><span class="token hvariable">window</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>HTMLDocument</span> <span class="token punctuation">(</span><span class="token hvariable">body</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>HTMLElement</span> <span class="token punctuation">(</span><span class="token hvariable">toElement</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>Window</span> <span class="token punctuation">(</span><span class="token hvariable">document</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>DOM<span class="token punctuation">.</span>Element</span> <span class="token punctuation">(</span><span class="token constant">Element</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> React <span class="token keyword">as</span> React</span>
<span class="token import-statement"><span class="token keyword">import</span> ReactDOM <span class="token keyword">as</span> ReactDOM</span>

<span class="token import-statement"><span class="token keyword">import</span> React<span class="token punctuation">.</span>DOM <span class="token keyword">as</span> DOM</span>
<span class="token import-statement"><span class="token keyword">import</span> React<span class="token punctuation">.</span>DOM<span class="token punctuation">.</span>Props <span class="token keyword">as</span> Props</span>

<span class="token keyword">type</span> <span class="token constant">Shape</span> <span class="token operator">=</span> <span class="token constant">Circle</span> <span class="token operator">|</span> <span class="token constant">Square</span>

<span class="token hvariable">calculateArea</span> <span class="token operator">::</span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span> <span class="token operator">-></span> <span class="token constant">Float</span> <span class="token operator">-></span> <span class="token constant">Float</span>
<span class="token hvariable">calculateArea</span> <span class="token constant">Nothing</span> <span class="token hvariable">_</span> <span class="token operator">=</span> <span class="token number">0</span>
<span class="token hvariable">calculateArea</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Circle</span><span class="token punctuation">)</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token builtin">pi</span> <span class="token operator">*</span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>
<span class="token hvariable">calculateArea</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Square</span><span class="token punctuation">)</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>

<span class="token hvariable">getShape</span> <span class="token operator">::</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span>
<span class="token hvariable">getShape</span> <span class="token string">"circle"</span> <span class="token operator">=</span> <span class="token constant">Just</span> <span class="token constant">Circle</span>
<span class="token hvariable">getShape</span> <span class="token string">"square"</span> <span class="token operator">=</span> <span class="token constant">Just</span> <span class="token constant">Square</span>
<span class="token hvariable">getShape</span> <span class="token hvariable">_</span> <span class="token operator">=</span> <span class="token constant">Nothing</span>

<span class="token hvariable">onShapeChanged</span> <span class="token hvariable">ctx</span> <span class="token hvariable">evt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token hvariable">writeState</span> <span class="token hvariable">ctx</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token hvariable">getShape</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token hvariable">unsafeCoerce</span> <span class="token hvariable">evt</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token hvariable">target</span><span class="token punctuation">.</span><span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token hvariable">onCalculateAreaClicked</span> <span class="token hvariable">ctx</span> <span class="token hvariable">evt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span> <span class="token operator">&lt;-</span> <span class="token hvariable">React<span class="token punctuation">.</span>readState</span> <span class="token hvariable">ctx</span>
  <span class="token hvariable">writeState</span> <span class="token hvariable">ctx</span> <span class="token punctuation">{</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token hvariable">calculateArea</span> <span class="token hvariable">shape</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span>

<span class="token hvariable">areaCalculator</span> <span class="token operator">::</span> <span class="token constant">React<span class="token punctuation">.</span>ReactClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token hvariable">areaCalculator</span> <span class="token operator">=</span> <span class="token hvariable">React<span class="token punctuation">.</span>component</span> <span class="token string">"AreaCalculator"</span> <span class="token hvariable">component</span>
  <span class="token keyword">where</span>
  <span class="token hvariable">component</span> <span class="token hvariable">ctx</span> <span class="token operator">=</span> <span class="token hvariable">pure</span> <span class="token punctuation">{</span> <span class="token hvariable">state</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token constant">Nothing</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token hvariable">render</span><span class="token operator">:</span> <span class="token hvariable">renderFn</span> <span class="token hvariable">ctx</span> <span class="token punctuation">}</span>
  <span class="token keyword">where</span>
    <span class="token hvariable">renderFn</span> <span class="token hvariable">ctx</span> <span class="token operator">=</span>
      <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token punctuation">,</span> <span class="token hvariable">area</span> <span class="token punctuation">}</span> <span class="token operator">&lt;-</span> <span class="token hvariable">React<span class="token punctuation">.</span>readState</span> <span class="token hvariable">ctx</span>
      <span class="token builtin">return</span> <span class="token operator">$</span> <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
        <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
          <span class="token hvariable">DOM<span class="token punctuation">.</span>select</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>onChange</span> <span class="token punctuation">(</span><span class="token hvariable">onShapeChanged</span> <span class="token hvariable">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span>
              <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Select shape"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">"circle"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Circle"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">"square"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Square"</span> <span class="token punctuation">]</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token hvariable">DOM<span class="token punctuation">.</span>input</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token punctuation">(</span><span class="token builtin">show</span> <span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token hvariable">DOM<span class="token punctuation">.</span>button</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>onClick</span> <span class="token punctuation">(</span><span class="token hvariable">onCalculateAreaClicked</span> <span class="token hvariable">ctx</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Calculate area"</span> <span class="token punctuation">]</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
          <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token punctuation">(</span><span class="token string">"Area: "</span> <span class="token operator">++</span> <span class="token punctuation">(</span><span class="token builtin">show</span> <span class="token hvariable">area</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>

<span class="token hvariable">main</span> <span class="token operator">=</span> <span class="token hvariable">container</span> <span class="token operator">>>=</span> <span class="token hvariable">ReactDOM<span class="token punctuation">.</span>render</span> <span class="token hvariable">componentInstance</span>
  <span class="token keyword">where</span>
  <span class="token hvariable">componentInstance</span> <span class="token operator">=</span> <span class="token hvariable">React<span class="token punctuation">.</span>createLeafElement</span> <span class="token hvariable">areaCalculator</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token hvariable">container</span> <span class="token operator">::</span> <span class="token hvariable">forall</span> <span class="token hvariable">eff</span><span class="token punctuation">.</span> <span class="token constant">Effect</span> <span class="token punctuation">(</span><span class="token hvariable">dom</span> <span class="token operator">::</span> <span class="token constant">DOM</span> <span class="token operator">|</span> <span class="token hvariable">eff</span><span class="token punctuation">)</span> <span class="token constant">Element</span>
  <span class="token hvariable">container</span> <span class="token operator">=</span> <span class="token keyword">do</span>
    <span class="token hvariable">win</span> <span class="token operator">&lt;-</span> <span class="token hvariable">window</span>
    <span class="token hvariable">doc</span> <span class="token operator">&lt;-</span> <span class="token hvariable">document</span> <span class="token hvariable">win</span>
    <span class="token hvariable">elt</span> <span class="token operator">&lt;-</span> <span class="token hvariable">body</span> <span class="token hvariable">doc</span>
    <span class="token builtin">return</span> <span class="token operator">$</span> <span class="token hvariable">toElement</span> <span class="token hvariable">elt</span>
</code></pre>
<p>To get yet another error:</p>
<pre><code>Error found:
at src/Main.purs:22:21 - 22:22 (line 22, column 21 - line 22, column 22)

  Unable to parse module:
  Unexpected token &#39;|&#39;
</code></pre>
<p>That’s my bad, it is more Haskell than Elm or F#:</p>
<pre><code class="language-diff"><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> type Shape = Circle | Square
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> data Shape = Circle | Square</span></span>
</code></pre>
<p>And yet another one:</p>
<pre><code>Error found:
at src/Main.purs:45:3 - 45:8 (line 45, column 3 - line 45, column 8)

  Unable to parse module:
  Unexpected token &#39;where&#39;
</code></pre>
<p>Because I did not indent my code enough.</p>
<p>And yet another one:</p>
<pre><code>Error found:
at src/Main.purs:47:32 - 47:34 (line 47, column 32 - line 47, column 34)

  Unable to parse module:
  Unexpected &quot;&lt;-&quot; in expression, perhaps due to a missing &#39;do&#39; or &#39;ado&#39; keyword
</code></pre>
<p>Because <code>React.readState</code> does not return effect, but rather the value itself, so no need to unpack it:</p>
<pre><code class="language-diff"><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> { shape, value, area } &lt;- React.readState ctx
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> let { shape, value, area } = React.readState ctx</span></span>
</code></pre>
<p>And yet another one:</p>
<pre><code>Error found:
at src/Main.purs:48:9 - 48:15 (line 48, column 9 - line 48, column 15)

  Unable to parse module:
  Unexpected token &#39;return&#39;
</code></pre>
<p>Because I have forgot the <code>do</code> keyword:</p>
<pre><code class="language-diff"><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> renderFn ctx =
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> renderFn ctx = do</span></span>
</code></pre>
<p>Few small errors resolved:</p>
<pre><code>Compiling Main
Error 1 of 2:

  in module Main
  at src/Main.purs:26:33 - 26:38 (line 26, column 33 - line 26, column 38)

    Unknown type Float

# replace Float with Number, as Float is not really a type in PureScript

Error 2 of 2:

  in module Main
  at src/Main.purs:61:32 - 61:34 (line 61, column 32 - line 61, column 34)

    Unknown operator (++)
    
# replace ++ with + as ++ is not really an operator in PureScript
</code></pre>
<p>To end up with type errors hell:</p>
<pre><code>Error found:
in module Main
at src/Main.purs:60:13 - 60:54 (line 60, column 13 - line 60, column 54)

  Could not match type

    ReactElement

  with type

    Array t0 -&gt; t1


while applying a function input [ value ((...) value)
                                ]
  of type ReactElement
  to argument []
while checking that expression (input [ value (...)
                                      ]
                               )
                               []
  has type ReactElement
in value declaration areaCalculator

where t0 is an unknown type
      t1 is an unknown type
</code></pre>
<p>What this tells you is that input function <a href="https://pursuit.purescript.org/packages/purescript-react/8.0.0/docs/React.DOM#v:input">does not take</a> a second argument (which would normally be similar to <code>React.DOM.div [ attributes ] [ children ]</code>).</p>
<pre><code class="language-diff"><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> DOM.input [ Props.value (show value) ] []
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> DOM.input [ Props.value (show value) ]</span></span>
</code></pre>
<p>Earlier I have mentioned type hell. Well, that was just the small example. Here’s the next error in the code:</p>
<pre><code>Error found:
in module Main
at src/Main.purs:46:18 - 46:50 (line 46, column 18 - line 46, column 50)

  Could not match type

    Int

  with type

    Number


while trying to match type
                             ( area :: Int
                             , shape :: Maybe t3
                             , value :: Int
                             ...
                             )

  with type
              ( area :: Number
              , shape :: Maybe Shape
              , value :: Number
              ...
              | t1
              )

while solving type class constraint

  Prim.Row.Nub t0
               ( componentDidCatch :: Error
                                      -&gt; { componentStack :: String
                                         }
                                         -&gt; Effect Unit
               , componentDidMount :: Effect Unit
               , componentDidUpdate :: Record ()
                                       -&gt; { area :: Number
                                          , shape :: ...
                                          , value :: Number
                                          | t1
                                          }
                                          -&gt; t2 -&gt; ...
               , componentWillUnmount :: Effect Unit
               , getSnapshotBeforeUpdate :: Record ()
                                            -&gt; { area :: Number
                                               , shape :: ...
                                               , value :: Number
                                               | t1
                                               }
                                               -&gt; Effect t2
               , render :: Effect ReactElement
               , shouldComponentUpdate :: Record ()
                                          -&gt; { area :: Number
                                             , shape :: ...
                                             , value :: Number
                                             | t1
                                             }
                                             -&gt; Effect Boolean
               , state :: { area :: Number
                          , shape :: Maybe Shape
                          , value :: Number
                          | t1
                          }
               , unsafeComponentWillMount :: Effect Unit
               , unsafeComponentWillReceiveProps :: Record () -&gt; Effect Unit
               , unsafeComponentWillUpdate :: Record ()
                                              -&gt; { area :: Number
                                                 , shape :: ...
                                                 , value :: Number
                                                 | t1
                                                 }
                                                 -&gt; Effect Unit
               )

while inferring the type of component &quot;AreaCalculator&quot;
in value declaration areaCalculator

where t1 is an unknown type
      t3 is an unknown type
      t0 is an unknown type
      t2 is an unknown type

See https://github.com/purescript/documentation/blob/master/errors/TypesDoNotUnify.md for more information,
or to contribute content related to this error.
</code></pre>
<p>Basically compiler is trying to say the initial state provided has a type <code>( area :: Int, value :: Int, shape :: Maybe t3 )</code> but what is expected (down in the code) is <code>( area :: Number, value :: Number, shape :: Maybe Shape )</code>. Quite an explanation.</p>
<pre><code class="language-diff"><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> initialState :: AreaCalculatorState
</span><span class="token prefix inserted">+</span><span class="token line"> initialState = { shape: Nothing, value: 0.0, area: 0.0 }
</span></span>
<span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> componentImpl ctx = pure { state: { shape: Nothing, value: 0.0, area: 0.0 }, render: renderFn ctx }
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> componentImpl ctx = pure { state: initialState, render: renderFn ctx }</span></span>
</code></pre>
<p>And back to a new error:</p>
<pre><code>Error found:
in module Main
at src/Main.purs:70:23 - 70:45 (line 70, column 23 - line 70, column 45)

  No type class instance was found for

    Data.Semiring.Semiring String


while applying a function add
  of type Semiring t0 =&gt; t0 -&gt; t0 -&gt; t0
  to argument &quot;Area: &quot;
while inferring the type of add &quot;Area: &quot;
in value declaration areaCalculator

where t0 is an unknown type

See https://github.com/purescript/documentation/blob/master/errors/NoInstanceFound.md for more information,
or to contribute content related to this error.
</code></pre>
<p>Which means the <code>+</code> operator (function) does not apply to strings. The <code>&lt;&gt;</code> is the string concatenation operator in this case. Although very hectic, it is described in <a href="https://pursuit.purescript.org/packages/purescript-prelude/4.1.1/docs/Data.Semigroup#v:(%3C%3E)">the docs</a>.</p>
<p>And yet another error:</p>
<pre><code>Error found:
in module Main
at src/Main.purs:78:21 - 78:29 (line 78, column 21 - line 78, column 29)

  Could not match type

    Effect

  with type

    Maybe


while trying to match type Effect (Maybe HTMLElement)
  with type Maybe t0
while checking that expression body doc
  has type Maybe t0
in value declaration main

where t0 is an unknown type

See https://github.com/purescript/documentation/blob/master/errors/TypesDoNotUnify.md for more information,
or to contribute content related to this error.
</code></pre>
<p>Which is all about matching the return types and handling them properly:</p>
<pre><code class="language-diff"><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> elt &lt;- toElement elt
</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> let elt = fromJust eltMaybe
</span><span class="token prefix inserted">+</span><span class="token line"> let container = toElement elt</span></span>
</code></pre>
<p>And finally, the version that <em>compiles</em>:</p>
<pre><code class="language-haskell"><span class="token keyword">module</span> <span class="token constant">Main</span> <span class="token keyword">where</span>

<span class="token import-statement"><span class="token keyword">import</span> Prelude</span>

<span class="token import-statement"><span class="token keyword">import</span> Effect</span> <span class="token punctuation">(</span><span class="token constant">Effect</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Maybe</span>

<span class="token import-statement"><span class="token keyword">import</span> Math</span> <span class="token punctuation">(</span><span class="token builtin">pi</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML</span> <span class="token punctuation">(</span><span class="token hvariable">window</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>HTMLDocument</span> <span class="token punctuation">(</span><span class="token hvariable">body</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>HTMLElement</span> <span class="token punctuation">(</span><span class="token hvariable">toElement</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>HTML<span class="token punctuation">.</span>Window</span> <span class="token punctuation">(</span><span class="token hvariable">document</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Web<span class="token punctuation">.</span>DOM<span class="token punctuation">.</span>Element</span> <span class="token punctuation">(</span><span class="token constant">Element</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Unsafe<span class="token punctuation">.</span>Coerce</span> <span class="token punctuation">(</span><span class="token hvariable">unsafeCoerce</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> React <span class="token keyword">as</span> React</span>
<span class="token import-statement"><span class="token keyword">import</span> ReactDOM <span class="token keyword">as</span> ReactDOM</span>

<span class="token import-statement"><span class="token keyword">import</span> React<span class="token punctuation">.</span>DOM <span class="token keyword">as</span> DOM</span>
<span class="token import-statement"><span class="token keyword">import</span> React<span class="token punctuation">.</span>DOM<span class="token punctuation">.</span>Props <span class="token keyword">as</span> Props</span>

<span class="token keyword">data</span> <span class="token constant">Shape</span> <span class="token operator">=</span> <span class="token constant">Circle</span> <span class="token operator">|</span> <span class="token constant">Square</span>

<span class="token hvariable">calculateArea</span> <span class="token operator">::</span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span> <span class="token operator">-></span> <span class="token constant">Number</span> <span class="token operator">-></span> <span class="token constant">Number</span>
<span class="token hvariable">calculateArea</span> <span class="token constant">Nothing</span> <span class="token hvariable">_</span> <span class="token operator">=</span> <span class="token number">0.0</span>
<span class="token hvariable">calculateArea</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Circle</span><span class="token punctuation">)</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token builtin">pi</span> <span class="token operator">*</span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>
<span class="token hvariable">calculateArea</span> <span class="token punctuation">(</span><span class="token constant">Just</span> <span class="token constant">Square</span><span class="token punctuation">)</span> <span class="token hvariable">value</span> <span class="token operator">=</span> <span class="token hvariable">value</span> <span class="token operator">*</span> <span class="token hvariable">value</span>

<span class="token hvariable">getShape</span> <span class="token operator">::</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span>
<span class="token hvariable">getShape</span> <span class="token string">"circle"</span> <span class="token operator">=</span> <span class="token constant">Just</span> <span class="token constant">Circle</span>
<span class="token hvariable">getShape</span> <span class="token string">"square"</span> <span class="token operator">=</span> <span class="token constant">Just</span> <span class="token constant">Square</span>
<span class="token hvariable">getShape</span> <span class="token hvariable">_</span> <span class="token operator">=</span> <span class="token constant">Nothing</span>

<span class="token hvariable">onShapeChanged</span> <span class="token hvariable">ctx</span> <span class="token hvariable">evt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token hvariable">React<span class="token punctuation">.</span>setState</span> <span class="token hvariable">ctx</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token hvariable">getShape</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token hvariable">unsafeCoerce</span> <span class="token hvariable">evt</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token hvariable">target</span><span class="token punctuation">.</span><span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token hvariable">onCalculateAreaClicked</span> <span class="token hvariable">ctx</span> <span class="token hvariable">evt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span> <span class="token operator">&lt;-</span> <span class="token hvariable">React<span class="token punctuation">.</span>getState</span> <span class="token hvariable">ctx</span>
  <span class="token hvariable">React<span class="token punctuation">.</span>setState</span> <span class="token hvariable">ctx</span> <span class="token punctuation">{</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token hvariable">calculateArea</span> <span class="token hvariable">shape</span> <span class="token hvariable">value</span> <span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token constant">AreaCalculatorState</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span> <span class="token operator">::</span> <span class="token constant">Maybe</span> <span class="token constant">Shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span> <span class="token operator">::</span> <span class="token constant">Number</span><span class="token punctuation">,</span> <span class="token hvariable">area</span> <span class="token operator">::</span> <span class="token constant">Number</span> <span class="token punctuation">}</span>

<span class="token hvariable">initialState</span> <span class="token operator">::</span> <span class="token constant">AreaCalculatorState</span>
<span class="token hvariable">initialState</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token operator">:</span> <span class="token constant">Nothing</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token operator">:</span> <span class="token number">0.0</span><span class="token punctuation">,</span> <span class="token hvariable">area</span><span class="token operator">:</span> <span class="token number">0.0</span> <span class="token punctuation">}</span>

<span class="token hvariable">areaCalculator</span> <span class="token operator">::</span> <span class="token constant">React<span class="token punctuation">.</span>ReactClass</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
<span class="token hvariable">areaCalculator</span> <span class="token operator">=</span> <span class="token hvariable">React<span class="token punctuation">.</span>component</span> <span class="token string">"AreaCalculator"</span> <span class="token hvariable">componentImpl</span>
  <span class="token keyword">where</span>
  <span class="token hvariable">componentImpl</span> <span class="token hvariable">ctx</span> <span class="token operator">=</span> <span class="token hvariable">pure</span> <span class="token punctuation">{</span> <span class="token hvariable">state</span><span class="token operator">:</span> <span class="token hvariable">initialState</span><span class="token punctuation">,</span> <span class="token hvariable">render</span><span class="token operator">:</span> <span class="token hvariable">renderFn</span> <span class="token hvariable">ctx</span> <span class="token punctuation">}</span>
    <span class="token keyword">where</span>
      <span class="token hvariable">renderFn</span> <span class="token hvariable">ctx'</span> <span class="token operator">=</span> <span class="token keyword">do</span>
        <span class="token punctuation">{</span> <span class="token hvariable">shape</span><span class="token punctuation">,</span> <span class="token hvariable">value</span><span class="token punctuation">,</span> <span class="token hvariable">area</span> <span class="token punctuation">}</span> <span class="token operator">&lt;-</span> <span class="token hvariable">React<span class="token punctuation">.</span>getState</span> <span class="token hvariable">ctx'</span>
        <span class="token hvariable">pure</span> <span class="token operator">$</span> <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
          <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
            <span class="token hvariable">DOM<span class="token punctuation">.</span>select</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>onChange</span> <span class="token punctuation">(</span><span class="token hvariable">onShapeChanged</span> <span class="token hvariable">ctx'</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span>
                <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">""</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Select shape"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">"circle"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Circle"</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
                <span class="token hvariable">DOM<span class="token punctuation">.</span>option</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token string">"square"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Square"</span> <span class="token punctuation">]</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>

            <span class="token hvariable">DOM<span class="token punctuation">.</span>input</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>value</span> <span class="token punctuation">(</span><span class="token builtin">show</span> <span class="token hvariable">value</span><span class="token punctuation">)</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>

            <span class="token hvariable">DOM<span class="token punctuation">.</span>button</span> <span class="token punctuation">[</span> <span class="token hvariable">Props<span class="token punctuation">.</span>onClick</span> <span class="token punctuation">(</span><span class="token hvariable">onCalculateAreaClicked</span> <span class="token hvariable">ctx'</span><span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token string">"Calculate area"</span> <span class="token punctuation">]</span>
          <span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token constant">DOM</span><span class="token punctuation">.</span><span class="token builtin">div</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>
            <span class="token hvariable">DOM<span class="token punctuation">.</span>text</span> <span class="token punctuation">(</span><span class="token string">"Area: "</span> <span class="token operator">&lt;></span> <span class="token punctuation">(</span><span class="token builtin">show</span> <span class="token hvariable">area</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>

<span class="token hvariable">main</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token keyword">let</span> <span class="token hvariable">componentInstance</span> <span class="token operator">=</span> <span class="token hvariable">React<span class="token punctuation">.</span>createLeafElement</span> <span class="token hvariable">areaCalculator</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token hvariable">win</span> <span class="token operator">&lt;-</span> <span class="token hvariable">window</span>
  <span class="token hvariable">doc</span> <span class="token operator">&lt;-</span> <span class="token hvariable">document</span> <span class="token hvariable">win</span>
  <span class="token hvariable">eltMaybe</span> <span class="token operator">&lt;-</span> <span class="token hvariable">body</span> <span class="token hvariable">doc</span>
  <span class="token keyword">let</span> <span class="token hvariable">elt</span> <span class="token operator">=</span> <span class="token hvariable">fromJust</span> <span class="token hvariable">eltMaybe</span>
  <span class="token keyword">let</span> <span class="token hvariable">container</span> <span class="token operator">=</span> <span class="token hvariable">toElement</span> <span class="token hvariable">elt</span>
  <span class="token hvariable">ReactDOM<span class="token punctuation">.</span>render</span> <span class="token hvariable">componentInstance</span> <span class="token hvariable">container</span>
</code></pre>
<p>Of course, there are few warnings and few sloppy solutions worth fixing:</p>
<pre><code>Warning 1 of 7:

  in module Main
  at src/Main.purs:7:1 - 7:18 (line 7, column 1 - line 7, column 18)

    Module Data.Maybe has unspecified imports, consider using the explicit form:

      import Data.Maybe (Maybe(..), fromJust)



  See https://github.com/purescript/documentation/blob/master/errors/ImplicitImport.md for more information,
  or to contribute content related to this warning.

Warning 2 of 7:

  in module Main
  at src/Main.purs:5:1 - 5:23 (line 5, column 1 - line 5, column 23)

    The import of Effect is redundant


  See https://github.com/purescript/documentation/blob/master/errors/UnusedImport.md for more information,
  or to contribute content related to this warning.

Warning 3 of 7:

  in module Main
  at src/Main.purs:3:1 - 3:15 (line 3, column 1 - line 3, column 15)

    Module Prelude has unspecified imports, consider using the explicit form:

      import Prelude (bind, pure, show, ($), (*), (&lt;&gt;))



  See https://github.com/purescript/documentation/blob/master/errors/ImplicitImport.md for more information,
  or to contribute content related to this warning.

Warning 4 of 7:

  in module Main
  at src/Main.purs:16:1 - 16:35 (line 16, column 1 - line 16, column 35)

    The import of Web.DOM.Element is redundant


  See https://github.com/purescript/documentation/blob/master/errors/UnusedImport.md for more information,
  or to contribute content related to this warning.

Warning 5 of 7:

  in module Main
  at src/Main.purs:38:1 - 39:75 (line 38, column 1 - line 39, column 75)

    No type declaration was provided for the top-level declaration of onShapeChanged.
    It is good practice to provide type declarations as a form of documentation.
    The inferred type of onShapeChanged was:

      forall t10 t14 t8.
        ReactThis t10
          { shape :: ...
          | t8
          }
        -&gt; t14 -&gt; Effect Unit


  in value declaration onShapeChanged

  See https://github.com/purescript/documentation/blob/master/errors/MissingTypeDeclaration.md for more information,
  or to contribute content related to this warning.

Warning 6 of 7:

  in module Main
  at src/Main.purs:41:1 - 43:57 (line 41, column 1 - line 43, column 57)

    No type declaration was provided for the top-level declaration of onCalculateAreaClicked.
    It is good practice to provide type declarations as a form of documentation.
    The inferred type of onCalculateAreaClicked was:

      forall t24 t37 t39.
        ReactThis t37
          { area :: Number
          , shape :: ...
          , value :: Number
          | t39
          }
        -&gt; t24 -&gt; Effect Unit


  in value declaration onCalculateAreaClicked

  See https://github.com/purescript/documentation/blob/master/errors/MissingTypeDeclaration.md for more information,
  or to contribute content related to this warning.

Warning 7 of 7:

  in module Main
  at src/Main.purs:74:1 - 81:46 (line 74, column 1 - line 81, column 46)

    No type declaration was provided for the top-level declaration of main.
    It is good practice to provide type declarations as a form of documentation.
    The inferred type of main was:

      Partial =&gt; Effect (Maybe ReactComponent)


  in value declaration main

  See https://github.com/purescript/documentation/blob/master/errors/MissingTypeDeclaration.md for more information,
  or to contribute content related to this warning.
</code></pre>
<p>Essentially,</p>
<pre><code>Module Data.Maybe has unspecified imports, consider using the explicit form:

      import Data.Maybe (Maybe(..), fromJust)
</code></pre>
<p>is fixed with the suggested code:</p>
<pre><code>import Data.Maybe (Maybe(..), fromJust)
</code></pre>
<p>Same with the unnecessary imports.</p>
<p>This one looks neat:</p>
<pre><code>Warning 5 of 7:

  in module Main
  at src/Main.purs:38:1 - 39:75 (line 38, column 1 - line 39, column 75)

    No type declaration was provided for the top-level declaration of onShapeChanged.
    It is good practice to provide type declarations as a form of documentation.
    The inferred type of onShapeChanged was:

      forall t10 t14 t8.
        ReactThis t10
          { shape :: ...
          | t8
          }
        -&gt; t14 -&gt; Effect Unit


  in value declaration onShapeChanged

  See https://github.com/purescript/documentation/blob/master/errors/MissingTypeDeclaration.md for more information,
  or to contribute content related to this warning.
</code></pre>
<p>Compiler asks you to explicitly type the function declaration. But I don’t care about that for now.</p>
<p>In order to run the app, few actions are still needed:</p>
<pre><code class="language-bash">$ <span class="token function">yarn</span> <span class="token function">add</span> -D spago purescript parcel
</code></pre>
<p>Then, one will need an entry point:</p>
<pre><code class="language-html"><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre>
<p>with a script:</p>
<pre><code class="language-js"><span class="token keyword">const</span> Main <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./output/Main'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

Main<span class="token punctuation">.</span><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>To build that whole thing now:</p>
<pre><code class="language-bash">$ <span class="token function">yarn</span> spago build <span class="token operator">&amp;&amp;</span> <span class="token function">yarn</span> parcel index.html
</code></pre>
<p>And finally, if you run this, nothing will work.</p>
<p>All because the return type of the <code>main</code> function is not really <code>Effect Unit</code>, but rather a function. To fix this:</p>
<pre><code class="language-haskell"><span class="token hvariable">mountMain</span> <span class="token operator">::</span> <span class="token constant">HTMLElement</span> <span class="token operator">-></span> <span class="token constant">Effect</span> <span class="token constant">Unit</span>
<span class="token hvariable">mountMain</span> <span class="token hvariable">elt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token keyword">let</span> <span class="token hvariable">container</span> <span class="token operator">=</span> <span class="token hvariable">toElement</span> <span class="token hvariable">elt</span>
  <span class="token keyword">let</span> <span class="token hvariable">componentInstance</span> <span class="token operator">=</span> <span class="token hvariable">React<span class="token punctuation">.</span>createLeafElement</span> <span class="token hvariable">areaCalculator</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">let</span> <span class="token hvariable">componentMaybe</span> <span class="token operator">=</span> <span class="token hvariable">ReactDOM<span class="token punctuation">.</span>render</span> <span class="token hvariable">componentInstance</span> <span class="token hvariable">container</span>
  <span class="token hvariable">void</span> <span class="token hvariable">componentMaybe</span>

<span class="token hvariable">main</span> <span class="token operator">::</span> <span class="token constant">Effect</span> <span class="token constant">Unit</span>
<span class="token hvariable">main</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token hvariable">win</span> <span class="token operator">&lt;-</span> <span class="token hvariable">window</span>
  <span class="token hvariable">doc</span> <span class="token operator">&lt;-</span> <span class="token hvariable">document</span> <span class="token hvariable">win</span>
  <span class="token hvariable">eltMaybe</span> <span class="token operator">&lt;-</span> <span class="token hvariable">body</span> <span class="token hvariable">doc</span>
  <span class="token builtin">maybe</span> <span class="token punctuation">(</span><span class="token hvariable">pure</span> <span class="token hvariable">unit</span><span class="token punctuation">)</span> <span class="token hvariable">mount</span> <span class="token hvariable">eltMaybe</span>
</code></pre>
<p>And the thing still won’t completely work, since we do not modify the state on input value change:</p>
<pre><code class="language-haskell"><span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Float<span class="token punctuation">.</span>Parse</span> <span class="token punctuation">(</span><span class="token hvariable">parseFloat</span><span class="token punctuation">)</span>

<span class="token hvariable">onValueChanged</span> <span class="token hvariable">ctx</span> <span class="token hvariable">evt</span> <span class="token operator">=</span> <span class="token keyword">do</span>
  <span class="token keyword">let</span> <span class="token hvariable">newValue</span> <span class="token operator">=</span> <span class="token hvariable">fromMaybe</span> <span class="token number">0.0</span> <span class="token punctuation">(</span><span class="token hvariable">parseFloat</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token hvariable">unsafeCoerce</span> <span class="token hvariable">evt</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token hvariable">target</span><span class="token punctuation">.</span><span class="token hvariable">value</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token hvariable">React<span class="token punctuation">.</span>setState</span> <span class="token hvariable">ctx</span> <span class="token punctuation">{</span> <span class="token hvariable">value</span><span class="token operator">:</span> <span class="token hvariable">newValue</span> <span class="token punctuation">}</span>
</code></pre>
<p>Final solution is available on <a href="https://codesandbox.io/s/purescript-test1-02wf4">sandbox</a>.</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>