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

    <main class="svelte-1gr3n62"><article><h1>Experiment #1: mismatching type handling &amp; error helpfulness</h1>

    <time>18 Apr 2021 at 23:56</time>

    <div class="content"><p>For a sake 🍶of <del>science</del> experiment, I have <a href="https://github.com/shybovycha/darken_color.js/tree/experiment/strong-typing">converted</a> <strong>one function</strong> of a <a href="https://github.com/shybovycha/darken_color.js">library</a> I created long time ago to multiple languages that compile to JS and called it with various values.</p>
<p>The function is simple - it takes a color represented as a HEX string and converts it to <code>{ r, g, b }</code> object.</p>
<p>The test is relatively big - it passes various numbers (integer and floating point, negative and positive), booleans, objects, arrays, obvious candidates - <code>null</code> and <code>undefined</code> and incorrect string.</p>
<p>The implementations are made with:</p>
<ul>
<li>Scala.js</li>
<li>ReasonML &amp; BuckleScript → ReScript</li>
<li>F#</li>
<li>PureScript</li>
<li>TypeScript</li>
<li>Elm</li>
</ul>
<h2 id="implementations">Implementations</h2>
<h3 id="scalajs">Scala.JS</h3>
<pre><code class="language-scala"><span class="token keyword">package</span> <span class="token namespace">darken_color</span>

<span class="token keyword">import</span> <span class="token namespace">scala<span class="token punctuation">.</span>scalajs<span class="token punctuation">.</span>js</span>
<span class="token keyword">import</span> <span class="token namespace">scala<span class="token punctuation">.</span>scalajs<span class="token punctuation">.</span>js<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>_

<span class="token keyword">class</span> RGB<span class="token punctuation">(</span><span class="token keyword">val</span> r<span class="token operator">:</span> <span class="token builtin">Int</span><span class="token punctuation">,</span> <span class="token keyword">val</span> g<span class="token operator">:</span> <span class="token builtin">Int</span><span class="token punctuation">,</span> <span class="token keyword">val</span> b<span class="token operator">:</span> <span class="token builtin">Int</span><span class="token punctuation">)</span> <span class="token keyword">extends</span> js<span class="token punctuation">.</span>Object

<span class="token annotation punctuation">@JSExportTopLevel</span><span class="token punctuation">(</span><span class="token string">"DarkenColor"</span><span class="token punctuation">)</span>
<span class="token keyword">object</span> DarkenColor <span class="token punctuation">{</span>
  <span class="token annotation punctuation">@JSExport</span>
  <span class="token keyword">def</span> hex2rgb<span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">String</span><span class="token punctuation">)</span><span class="token operator">:</span> RGB <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> re <span class="token operator">=</span> <span class="token triple-quoted-string string">"""^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$"""</span><span class="token punctuation">.</span>r

    <span class="token keyword">val</span> rgbStr <span class="token operator">=</span> s <span class="token keyword">match</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> re<span class="token punctuation">(</span>rStr<span class="token punctuation">,</span> gStr<span class="token punctuation">,</span> bStr<span class="token punctuation">)</span> <span class="token keyword">=></span> Some<span class="token punctuation">(</span><span class="token punctuation">(</span>rStr<span class="token punctuation">,</span> gStr<span class="token punctuation">,</span> bStr<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">case</span> _ <span class="token keyword">=></span> None
    <span class="token punctuation">}</span>

    rgbStr<span class="token punctuation">.</span>map <span class="token punctuation">(</span>x <span class="token keyword">=></span> <span class="token keyword">new</span> RGB<span class="token punctuation">(</span>Integer<span class="token punctuation">.</span>parseInt<span class="token punctuation">(</span>x<span class="token punctuation">.</span>_1<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Integer<span class="token punctuation">.</span>parseInt<span class="token punctuation">(</span>x<span class="token punctuation">.</span>_2<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Integer<span class="token punctuation">.</span>parseInt<span class="token punctuation">(</span>x<span class="token punctuation">.</span>_3<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>getOrElse<span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<h3 id="rescript">ReScript</h3>
<pre><code class="language-ocaml"><span class="token keyword">type</span> rgb <span class="token operator">=</span> <span class="token punctuation">{</span>
  r<span class="token punctuation">:</span> int<span class="token punctuation">,</span>
  g<span class="token punctuation">:</span> int<span class="token punctuation">,</span>
  b<span class="token punctuation">:</span> int<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> parse_hex <span class="token operator">=</span> s <span class="token operator">=></span> int_of_string<span class="token punctuation">(</span><span class="token string">"0x"</span> <span class="token operator">++</span> s<span class="token punctuation">)</span>

<span class="token keyword">let</span> hex2rgb <span class="token operator">=</span> hex <span class="token operator">=></span>
  Js<span class="token punctuation">.</span>Re<span class="token punctuation">.</span>fromString<span class="token punctuation">(</span><span class="token string">"^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$"</span><span class="token punctuation">)</span>
    <span class="token operator">-></span> Js<span class="token punctuation">.</span>Re<span class="token punctuation">.</span>exec_<span class="token punctuation">(</span>hex<span class="token punctuation">)</span>
    <span class="token operator">-></span> Belt<span class="token punctuation">.</span>Option<span class="token punctuation">.</span>map <span class="token punctuation">(</span>Js<span class="token punctuation">.</span>Re<span class="token punctuation">.</span>captures<span class="token punctuation">)</span>
    <span class="token operator">-></span> Belt<span class="token punctuation">.</span>Option<span class="token punctuation">.</span>map <span class="token punctuation">(</span>Js<span class="token punctuation">.</span>Array<span class="token punctuation">.</span>map <span class="token punctuation">(</span>Js<span class="token punctuation">.</span>Nullable<span class="token punctuation">.</span>toOption<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-></span> Belt<span class="token punctuation">.</span>Option<span class="token punctuation">.</span>map <span class="token punctuation">(</span>x <span class="token operator">=></span> Js<span class="token punctuation">.</span>Array<span class="token punctuation">.</span>sliceFrom<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-></span> Belt<span class="token punctuation">.</span>Option<span class="token punctuation">.</span>map <span class="token punctuation">(</span>Js<span class="token punctuation">.</span>Array<span class="token punctuation">.</span>map <span class="token punctuation">(</span>x <span class="token operator">=></span> Belt<span class="token punctuation">.</span>Option<span class="token punctuation">.</span>map<span class="token punctuation">(</span>x<span class="token punctuation">,</span> parse_hex<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token operator">-></span> <span class="token punctuation">(</span>matches <span class="token operator">=></span> switch matches <span class="token punctuation">{</span>
      <span class="token operator">|</span> Some<span class="token punctuation">(</span><span class="token punctuation">[</span> Some<span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">,</span> Some<span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">,</span> Some<span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">=></span> Some<span class="token punctuation">(</span><span class="token punctuation">{</span> r<span class="token punctuation">:</span> r<span class="token punctuation">,</span> g<span class="token punctuation">:</span> g<span class="token punctuation">,</span> b<span class="token punctuation">:</span> b <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token operator">|</span> <span class="token punctuation">_</span> <span class="token operator">=></span> None
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<h3 id="purescript">PureScript</h3>
<pre><code class="language-haskell"><span class="token keyword">module</span> <span class="token constant">DarkenColor</span> <span class="token keyword">where</span>

<span class="token import-statement"><span class="token keyword">import</span> Prelude</span> <span class="token punctuation">(</span><span class="token hvariable">join</span><span class="token punctuation">,</span> <span class="token builtin">map</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">$</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">&lt;#></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">>>=</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">>>></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Array</span> <span class="token punctuation">(</span><span class="token hvariable">catMaybes</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Array<span class="token punctuation">.</span>NonEmpty</span> <span class="token punctuation">(</span><span class="token builtin">drop</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Int</span> <span class="token punctuation">(</span><span class="token hvariable">fromStringAs</span><span class="token punctuation">,</span> <span class="token hvariable">hexadecimal</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Maybe</span> <span class="token punctuation">(</span><span class="token constant">Maybe</span><span class="token punctuation">(</span><span class="token operator">..</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Nullable</span> <span class="token punctuation">(</span><span class="token constant">Nullable</span><span class="token punctuation">,</span> <span class="token hvariable">toNullable</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>Either</span> <span class="token punctuation">(</span><span class="token hvariable">hush</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>String<span class="token punctuation">.</span>Regex</span> <span class="token punctuation">(</span><span class="token hvariable">regex</span><span class="token punctuation">,</span> <span class="token hvariable">match</span><span class="token punctuation">)</span>
<span class="token import-statement"><span class="token keyword">import</span> Data<span class="token punctuation">.</span>String<span class="token punctuation">.</span>Regex<span class="token punctuation">.</span>Flags</span> <span class="token punctuation">(</span><span class="token hvariable">ignoreCase</span><span class="token punctuation">)</span>

<span class="token keyword">type</span> <span class="token constant">RGB</span> <span class="token operator">=</span>
  <span class="token punctuation">{</span>
    <span class="token hvariable">r</span> <span class="token operator">::</span> <span class="token constant">Int</span><span class="token punctuation">,</span>
    <span class="token hvariable">g</span> <span class="token operator">::</span> <span class="token constant">Int</span><span class="token punctuation">,</span>
    <span class="token hvariable">b</span> <span class="token operator">::</span> <span class="token constant">Int</span>
  <span class="token punctuation">}</span>

<span class="token hvariable">constructRGB</span> <span class="token operator">::</span> <span class="token constant">Array</span> <span class="token constant">Int</span> <span class="token operator">-></span> <span class="token constant">Maybe</span> <span class="token constant">RGB</span>
<span class="token hvariable">constructRGB</span> <span class="token punctuation">[</span> <span class="token hvariable">r</span><span class="token punctuation">,</span> <span class="token hvariable">g</span><span class="token punctuation">,</span> <span class="token hvariable">b</span> <span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token constant">Just</span> <span class="token punctuation">{</span> <span class="token hvariable">r</span><span class="token operator">:</span> <span class="token hvariable">r</span><span class="token punctuation">,</span> <span class="token hvariable">g</span><span class="token operator">:</span> <span class="token hvariable">g</span><span class="token punctuation">,</span> <span class="token hvariable">b</span><span class="token operator">:</span> <span class="token hvariable">b</span> <span class="token punctuation">}</span>
<span class="token hvariable">constructRGB</span> <span class="token hvariable">_</span> <span class="token operator">=</span> <span class="token constant">Nothing</span>

<span class="token hvariable">hex2rgb</span> <span class="token operator">::</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Nullable</span> <span class="token constant">RGB</span>
<span class="token hvariable">hex2rgb</span> <span class="token hvariable">hexString</span> <span class="token operator">=</span>
  <span class="token hvariable">toNullable</span> <span class="token operator">$</span>
  <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token hvariable">hush</span> <span class="token operator">>>></span> <span class="token hvariable">join</span><span class="token punctuation">)</span> <span class="token operator">$</span> <span class="token punctuation">(</span><span class="token hvariable">regex</span> <span class="token string">"^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$"</span> <span class="token hvariable">ignoreCase</span><span class="token punctuation">)</span> <span class="token operator">&lt;#></span> <span class="token punctuation">(</span><span class="token operator">\</span><span class="token hvariable">re</span> <span class="token operator">-></span> <span class="token punctuation">(</span><span class="token hvariable">match</span> <span class="token hvariable">re</span> <span class="token hvariable">hexString</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token operator">&lt;#></span> <span class="token punctuation">(</span><span class="token builtin">drop</span> <span class="token number">1</span><span class="token punctuation">)</span>
  <span class="token operator">&lt;#></span> <span class="token hvariable">catMaybes</span>
  <span class="token operator">&lt;#></span> <span class="token punctuation">(</span><span class="token builtin">map</span> <span class="token punctuation">(</span><span class="token hvariable">fromStringAs</span> <span class="token hvariable">hexadecimal</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token operator">&lt;#></span> <span class="token hvariable">catMaybes</span>
  <span class="token operator">>>=</span> <span class="token hvariable">constructRGB</span>
</code></pre>
<h3 id="f">F#</h3>
<pre><code class="language-fsharp"><span class="token keyword">module</span> DarkenColor

<span class="token keyword">open</span> System<span class="token punctuation">.</span>Text<span class="token punctuation">.</span>RegularExpressions

<span class="token keyword">type</span> <span class="token class-name">RGBType</span> <span class="token operator">=</span> <span class="token punctuation">{</span> r<span class="token punctuation">:</span> <span class="token class-name">int16</span><span class="token punctuation">;</span> g<span class="token punctuation">:</span> <span class="token class-name">int16</span><span class="token punctuation">;</span> b<span class="token punctuation">:</span> <span class="token class-name">int16</span> <span class="token punctuation">}</span>

<span class="token keyword">let</span> hex2rgb <span class="token punctuation">(</span>hex<span class="token punctuation">:</span> <span class="token class-name">string</span><span class="token punctuation">)</span> <span class="token operator">=</span>
    <span class="token keyword">let</span> m <span class="token operator">=</span> Regex<span class="token punctuation">.</span><span class="token function">Match</span><span class="token punctuation">(</span>hex<span class="token punctuation">,</span> <span class="token string">"^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$"</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> m<span class="token punctuation">.</span>Success <span class="token keyword">then</span>
        m<span class="token punctuation">.</span>Groups
        <span class="token operator">|></span> Seq<span class="token punctuation">.</span>cast<span class="token operator">&lt;</span>Group<span class="token operator">></span>
        <span class="token operator">|></span> Seq<span class="token punctuation">.</span>skip <span class="token number">1</span> <span class="token comment">// zero capture group is always the full string, when it matches</span>
        <span class="token operator">|></span> Seq<span class="token punctuation">.</span>map <span class="token punctuation">(</span><span class="token keyword">fun</span> m <span class="token operator">-></span> m<span class="token punctuation">.</span>Value<span class="token punctuation">)</span>
        <span class="token operator">|></span> Seq<span class="token punctuation">.</span>map <span class="token punctuation">(</span><span class="token keyword">fun</span> x <span class="token operator">-></span> System<span class="token punctuation">.</span>Convert<span class="token punctuation">.</span><span class="token function">ToInt16</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">|></span> Seq<span class="token punctuation">.</span>toList
        <span class="token operator">|></span> <span class="token punctuation">(</span><span class="token keyword">function</span>
            <span class="token operator">|</span> r <span class="token operator">::</span> g <span class="token operator">::</span> b <span class="token operator">::</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">-></span> <span class="token computation-expression keyword">Some</span> <span class="token punctuation">{</span> r <span class="token operator">=</span> r<span class="token punctuation">;</span> g <span class="token operator">=</span> g<span class="token punctuation">;</span> b <span class="token operator">=</span> b <span class="token punctuation">}</span>
            <span class="token operator">|</span> _ <span class="token operator">-></span> None<span class="token punctuation">)</span>
    <span class="token keyword">else</span> None
</code></pre>
<h3 id="typescript">TypeScript</h3>
<pre><code class="language-ts"><span class="token keyword">interface</span> <span class="token class-name">RGBType</span> <span class="token punctuation">{</span>
  r<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  g<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  b<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/**
  * Converts a HEX color value to RGB by extracting R, G and B values from string using regex.
  * Returns r, g, and b values in range [0, 255]. Does not support RGBA colors just yet.
  *
  * @param hex The color value
  * @returns The RGB representation or {@code null} if the string value is invalid
  */</span>
<span class="token keyword">const</span> hex2rgb <span class="token operator">=</span> <span class="token punctuation">(</span>hex<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> RGBType <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")</span>
  <span class="token keyword">const</span> shorthandRegex <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^#?([a-f\d])([a-f\d])([a-f\d])$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">;</span>

  hex <span class="token operator">=</span> hex<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>shorthandRegex<span class="token punctuation">,</span> <span class="token punctuation">(</span>_match<span class="token punctuation">,</span> r<span class="token punctuation">,</span> g<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> r <span class="token operator">+</span> r <span class="token operator">+</span> g <span class="token operator">+</span> g <span class="token operator">+</span> b <span class="token operator">+</span> b<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>hex<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    r<span class="token operator">:</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    g<span class="token operator">:</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    b<span class="token operator">:</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>result<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> hex2rgb <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<h3 id="elm">Elm</h3>
<pre><code class="language-haskell"><span class="token keyword">module</span> <span class="token constant">DarkenColor</span> <span class="token hvariable">exposing</span> <span class="token punctuation">(</span><span class="token operator">..</span><span class="token punctuation">)</span>

<span class="token import-statement"><span class="token keyword">import</span> List</span>
<span class="token import-statement"><span class="token keyword">import</span> Maybe</span>
<span class="token import-statement"><span class="token keyword">import</span> Maybe<span class="token punctuation">.</span>Extra</span>
<span class="token import-statement"><span class="token keyword">import</span> Regex</span>

<span class="token keyword">type</span> <span class="token hvariable">alias</span> <span class="token constant">RGBType</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token hvariable">r</span><span class="token operator">:</span> <span class="token constant">Int</span><span class="token punctuation">,</span> <span class="token hvariable">g</span><span class="token operator">:</span> <span class="token constant">Int</span><span class="token punctuation">,</span> <span class="token hvariable">b</span><span class="token operator">:</span> <span class="token constant">Int</span> <span class="token punctuation">}</span>

<span class="token hvariable">hex2rgb</span> <span class="token operator">:</span> <span class="token constant">String</span> <span class="token operator">-></span> <span class="token constant">Maybe</span> <span class="token constant">RGBType</span>
<span class="token hvariable">hex2rgb</span> <span class="token hvariable">hex</span> <span class="token operator">=</span>
    <span class="token hvariable">Regex<span class="token punctuation">.</span>fromString</span> <span class="token string">"^#?([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$"</span>
        <span class="token operator">|></span> <span class="token constant">Maybe</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token punctuation">(</span><span class="token operator">\</span><span class="token hvariable">regex</span> <span class="token operator">-></span> <span class="token hvariable">Regex<span class="token punctuation">.</span>find</span> <span class="token hvariable">regex</span> <span class="token hvariable">hex</span><span class="token punctuation">)</span>
        <span class="token operator">|></span> <span class="token constant">Maybe</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token punctuation">(</span><span class="token constant">List</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token punctuation">.</span><span class="token hvariable">match</span><span class="token punctuation">)</span>
        <span class="token operator">|></span> <span class="token constant">Maybe</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token punctuation">(</span><span class="token constant">List</span><span class="token punctuation">.</span><span class="token builtin">map</span> <span class="token constant">String</span><span class="token punctuation">.</span><span class="token builtin">toInt</span><span class="token punctuation">)</span>
        <span class="token operator">|></span> <span class="token hvariable">Maybe<span class="token punctuation">.</span>andThen</span> <span class="token punctuation">(</span><span class="token hvariable">Maybe<span class="token punctuation">.</span>Extra<span class="token punctuation">.</span>combine</span><span class="token punctuation">)</span>
        <span class="token operator">|></span> <span class="token hvariable">Maybe<span class="token punctuation">.</span>andThen</span> <span class="token hvariable">constructRGB</span>

<span class="token hvariable">constructRGB</span> <span class="token hvariable">list</span> <span class="token operator">=</span>
    <span class="token keyword">case</span> <span class="token hvariable">list</span> <span class="token keyword">of</span>
        <span class="token punctuation">[</span> <span class="token hvariable">r</span><span class="token punctuation">,</span> <span class="token hvariable">g</span><span class="token punctuation">,</span> <span class="token hvariable">b</span> <span class="token punctuation">]</span> <span class="token operator">-></span> <span class="token constant">Maybe<span class="token punctuation">.</span>Just</span> <span class="token punctuation">{</span> <span class="token hvariable">r</span> <span class="token operator">=</span> <span class="token hvariable">r</span><span class="token punctuation">,</span> <span class="token hvariable">g</span> <span class="token operator">=</span> <span class="token hvariable">g</span><span class="token punctuation">,</span> <span class="token hvariable">b</span> <span class="token operator">=</span> <span class="token hvariable">b</span> <span class="token punctuation">}</span>
        <span class="token hvariable">_</span> <span class="token operator">-></span> <span class="token constant">Maybe<span class="token punctuation">.</span>Nothing</span>
</code></pre>
<p>For fair comparison, the implementation is kept same (no platform-specific code, except <code>Option</code> in functional languages) and every single bundle is processed with Webpack 4.</p>
<p>The test checks both the result and the assumes no exception is thrown, even when the input is incorrect.
For the interest sake, the exceptions thrown as well as bundle sizes will be listed below.</p>
<!--more-->

<h3 id="the-test">The test</h3>
<pre><code class="language-js"><span class="token keyword">const</span> FSharp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dist/bundle.fsharp.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Purescript <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dist/bundle.purescript.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Rescript <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dist/bundle.rescript.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> ScalaJS <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dist/bundle.scalajs.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Typescript <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./dist/bundle.typescript.js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'DarkenColor'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> interpretations <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string-property property">'F#'</span><span class="token operator">:</span> FSharp<span class="token punctuation">,</span>
    <span class="token string-property property">'PureScript'</span><span class="token operator">:</span> Purescript<span class="token punctuation">,</span>
    <span class="token string-property property">'ReScript'</span><span class="token operator">:</span> Rescript<span class="token punctuation">,</span>
    <span class="token string-property property">'ScalaJS'</span><span class="token operator">:</span> ScalaJS<span class="token punctuation">.</span>DarkenColor<span class="token punctuation">,</span>
    <span class="token string-property property">'TypeScript'</span><span class="token operator">:</span> Typescript
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>interpretations<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>language<span class="token punctuation">,</span> DarkenColor<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">describe</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">in </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>language<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'hex2rgb'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'for valid input'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'with hash prefix'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'long HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#bede12'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'returns correct result'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span>DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatchObject</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">190</span><span class="token punctuation">,</span> <span class="token literal-property property">g</span><span class="token operator">:</span> <span class="token number">222</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">xdescribe</span><span class="token punctuation">(</span><span class="token string">'short HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#bd7'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'returns correct result'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span>DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatchObject</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">187</span><span class="token punctuation">,</span> <span class="token literal-property property">g</span><span class="token operator">:</span> <span class="token number">221</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">119</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'no hash prefix'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'long HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'bede12'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'returns correct result'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span>DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatchObject</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">190</span><span class="token punctuation">,</span> <span class="token literal-property property">g</span><span class="token operator">:</span> <span class="token number">222</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">xdescribe</span><span class="token punctuation">(</span><span class="token string">'short HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'bd7'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'returns correct result'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span>DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toMatchObject</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">187</span><span class="token punctuation">,</span> <span class="token literal-property property">g</span><span class="token operator">:</span> <span class="token number">221</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">119</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'for invalid input'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'invalid HEX string'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'invalid number of digits'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'too few'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'for long HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                  <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#bede1'</span><span class="token punctuation">;</span>

                  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token function">xdescribe</span><span class="token punctuation">(</span><span class="token string">'for short HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                  <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#be'</span><span class="token punctuation">;</span>

                  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

              <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'too many'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'for long HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                  <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#bede128'</span><span class="token punctuation">;</span>

                  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token function">xdescribe</span><span class="token punctuation">(</span><span class="token string">'for short HEX'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                  <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#bede'</span><span class="token punctuation">;</span>

                  <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                    <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'invalid letters'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#bfghij'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'invalid characters'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#be!?12'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'spaces'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'#be de  12'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'invalid prefix'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token string">'?bede12'</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'for number'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'positive'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'floating point'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'integer'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token number">314</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'negative'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'floating point'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">3.14</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'integer'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">314</span><span class="token punctuation">;</span>

              <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'for object'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'null'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

            <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'undefined'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

            <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'NaN'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token number">NaN</span><span class="token punctuation">;</span>

            <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'JSON'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">r</span><span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token literal-property property">g</span><span class="token operator">:</span> <span class="token number">76</span><span class="token punctuation">,</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">120</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

            <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'array'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">76</span><span class="token punctuation">,</span> <span class="token number">120</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'Boolean'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

            <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token function">describe</span><span class="token punctuation">(</span><span class="token string">'Map'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> input <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Map</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token function">it</span><span class="token punctuation">(</span><span class="token string">'does not fail'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
              <span class="token function">expect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> DarkenColor<span class="token punctuation">.</span><span class="token function">hex2rgb</span><span class="token punctuation">(</span>input<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>not<span class="token punctuation">.</span><span class="token function">toThrow</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<h2 id="test-results">Test results</h2>
<p>Here is a comparison of the test results:</p>
<table>
  <thead>
    <tr>
      <th>Tool</th>
      <th>Test results</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>F#</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>PureScript</td>
      <td>❌</td>
    </tr>
    <tr>
      <td>ReScript</td>
      <td>✅</td>
    </tr>
    <tr>
      <td>ScalaJS</td>
      <td>❌</td>
    </tr>
    <tr>
      <td>TypeScript</td>
      <td>❌</td>
    </tr>
    <tr>
      <td>Elm</td>
      <td>n/a</td>
    </tr>
  </tbody>
</table>

<h2 id="error-helpfulness">Error helpfulness</h2>
<p>Some implementations still throw error when the data type is not what the function expects.</p>
<h3 id="purescript-1">PureScript</h3>
<pre><code>  ● DarkenColor › in PureScript › hex2rgb › for number › positive › integer › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;TypeError&quot;
    Error message: &quot;u.match is not a function&quot;
    
  ● DarkenColor › in PureScript › hex2rgb › for object › null › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;TypeError&quot;
    Error message: &quot;Cannot read property &#39;match&#39; of null&quot;
    
  ● DarkenColor › in PureScript › hex2rgb › for object › undefined › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;TypeError&quot;
    Error message: &quot;Cannot read property &#39;match&#39; of undefined&quot;
</code></pre>
<h3 id="scalajs-1">ScalaJS</h3>
<pre><code> ● DarkenColor › in ScalaJS › hex2rgb › for object › undefined › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;org.scalajs.linker.runtime.UndefinedBehaviorError&quot;
    Error message: &quot;java.lang.ClassCastException: undefined is not an instance of java.lang.String&quot;

  ● DarkenColor › in ScalaJS › hex2rgb › for number › positive › floating point › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;org.scalajs.linker.runtime.UndefinedBehaviorError&quot;
    Error message: &quot;java.lang.ClassCastException: 3.14 is not an instance of java.lang.String&quot;
</code></pre>
<h3 id="typescript-1">TypeScript</h3>
<pre><code> ● DarkenColor › in TypeScript › hex2rgb › for number › positive › floating point › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;TypeError&quot;
    Error message: &quot;e.replace is not a function&quot;

  ● DarkenColor › in TypeScript › hex2rgb › for object › null › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;TypeError&quot;
    Error message: &quot;Cannot read property &#39;replace&#39; of null&quot;

  ● DarkenColor › in TypeScript › hex2rgb › for object › undefined › does not fail

    expect(received).not.toThrow()

    Error name:    &quot;TypeError&quot;
    Error message: &quot;Cannot read property &#39;replace&#39; of undefined&quot;
</code></pre>
<h3 id="elm-1">Elm</h3>
<pre><code>Detected problems in 1 module.
-- TYPE MISMATCH ------------------------------------------- src/DarkenColor.elm

The 1st argument to `hex2rgb` is not what I expect:

24| main = hex2rgb -12
                   ^^^
This argument is a number of type:

    number

But `hex2rgb` needs the 1st argument to be:

    String

Hint: Try using String.fromInt to convert it to a string?
</code></pre>
<h2 id="bundle-size">Bundle size</h2>
<table>
  <thead>
    <tr>
      <th>Tool</th>
      <th>Bundle size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>F#</td>
      <td>40K</td>
    </tr>
    <tr>
      <td>PureScript</td>
      <td>174K</td>
    </tr>
    <tr>
      <td>ReScript</td>
      <td>22K</td>
    </tr>
    <tr>
      <td>ScalaJS</td>
      <td>197K</td>
    </tr>
    <tr>
      <td>TypeScript</td>
      <td>1.4K</td>
    </tr>
    <tr>
      <td>Elm</td>
      <td>n/a</td>
    </tr>
  </tbody>
</table>

<LazyImg src="/images/strongly-typed-front-end/chart1.png" alt="Bundle size comparison" />
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>