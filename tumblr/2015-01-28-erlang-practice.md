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

    <main class="svelte-1gr3n62"><article><h1>Erlang practice</h1>

    <time>28 Jan 2015 at 14:29</time>

    <div class="content"><h2 id="foreword">Foreword</h2>
<p>First time I faced functional programming, I was impressed. Just a bit. That was back in 2012. The second time, I was studying real functional programming at the university. Today was the final test.</p>
<p>We were taught many interesting things about functional programming and lot of things about Haskell. But there were only two lectures and two practices on Erlang. And nothing was told about its distributed programming abilities.</p>
<p>I was a bit disappointed by this fact. So, I turned on my girlfriend’s laptop, installed Erlang and created this short intro to distributed programming in Erlang.</p>
<!--more-->

<h2 id="requirements">Requirements</h2>
<p>This short intro does not include Erlang tutorial and requires you to have at least two machines - either Virtual or hardware, if you wish. Even that does not really matter!</p>
<h2 id="how-to-get-out-of-a-train">How to get out of a train?</h2>
<LazyImg src="/tumblr_files/tumblr_inline_niw5irzdiz1qh5oee.jpg" alt="Gordon Freeman trying to get out of a train" />

<p>The first thing I gonna tell you, is really handy tip.</p>
<p><strong>There are three ways to exit Erlang’ shell:</strong></p>
<ul>
<li><strong>“classic”:</strong> hit <kbd>Ctrl + C</kbd>, then press <kbd>a</kbd> <em>(Abort)</em> and <kbd>Return</kbd></li>
<li><strong>“UNIX-way”:</strong> two times hit <kbd>Ctrl + C</kbd></li>
<li><strong>“Erlang-way”:</strong> simply type <code>q().</code> and hit <kbd>Return</kbd></li>
</ul>
<p>You’ll be happy to know ‘bout last two - they are just easier!</p>
<h2 id="rocknroll">Rock’n’Roll!</h2>
<p>So, let’s just dive into distributed programming! First thing you’ll gonna need - is to know your machines’ IP addresses. Then you’ll gonna need to point each of them to the other one - just set each other’s hostname in the <code>/etc/hosts</code> file _(for Windows it’s <code>C:\Windows\system32\drivers\etc\hosts</code>)_s.</p>
<p>I have had two laptops I named <code>moonode</code> <em>(my laptop)</em> and <code>foo</code> <em>(my girlfriend’s laptop)</em>. So, on my Ubuntu, I added this line to <code>/etc/hosts</code>:</p>
<pre><code>192.168.2.33    foonode
</code></pre>
<p>And in <code>C:\Windows\system32\drivers\etc\hosts</code> on my girlfriend’s laptop I added this:</p>
<pre><code>192.168.2.237   moonode
</code></pre>
<LazyImg src="/tumblr_files/tumblr_inline_niw5kauPUD1qh5oee.png" alt="hosts in Windows" />

<p><strong>Note:</strong> I was sitting at home, so laptops were connected just to my home WiFi router. And that’s great news for enyone, who wants to try that at home!</p>
<p>Each Erlang instance was run with the corresponding shortname of machine: <code>erl -sname moo@moonode</code> and <code>erl -sname foo@foonode</code>.</p>
<p>Both machines should have the same cookie to communicate. That’s basic Erlang security, for your great good. Cookie is just a upper-cased word, stored in a <code>.erlang.cookie</code> file. For Windows, that file is in the <code>C:\Windows\</code> or <code>C:\Users\username\</code> directory. In Linux that’s in <code>/home/username/</code> directory.</p>
<h2 id="wrapping-up">Wrapping-up</h2>
<p>So, short summary on what you should have to run distributely in Erlang:</p>
<ul>
<li>hostname(-s) of other node(-s) in your <code>hosts</code> file</li>
<li>same cookie for all your nodes in <code>.erlang.cookie</code> file</li>
<li>running instances with corresponding shortnames and hosts</li>
</ul>
<h2 id="running-stuff">Running stuff</h2>
<p>To show some code, I wrote this short module:</p>
<pre><code class="language-erlang"><span class="token operator">-</span><span class="token function">module</span><span class="token punctuation">(</span><span class="token atom">test</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
<span class="token operator">-</span><span class="token function">export</span><span class="token punctuation">(</span><span class="token punctuation">[</span> <span class="token atom">start</span><span class="token operator">/</span><span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>

<span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">></span>
    <span class="token keyword">receive</span>
        <span class="token punctuation">{</span> <span class="token atom">msg</span><span class="token punctuation">,</span> <span class="token variable">M</span> <span class="token punctuation">}</span> <span class="token operator">-</span><span class="token operator">></span>
            <span class="token atom">io</span><span class="token punctuation">:</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">">> ~s~n"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span> <span class="token variable">M</span> <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token atom">finish</span> <span class="token operator">-</span><span class="token operator">></span>
            <span class="token atom">io</span><span class="token punctuation">:</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"&lt; finish received >~n"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token atom">ok</span>
    <span class="token keyword">end</span><span class="token punctuation">.</span>
</code></pre>
<p>Now, let’s start that!</p>
<p>First, I registered that process with some name on the <code>foo</code> node:</p>
<pre><code class="language-erlang"><span class="token function">c</span><span class="token punctuation">(</span><span class="token atom">test1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
<span class="token function">register</span><span class="token punctuation">(</span><span class="token atom">foo_pid</span><span class="token punctuation">,</span> <span class="token function">spawn</span><span class="token punctuation">(</span><span class="token atom">test1</span><span class="token punctuation">,</span> <span class="token atom">start</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
</code></pre>
<p>And then, the only thing I needed to do - is just send messages from node <code>moo</code>!</p>
<pre><code class="language-erlang"><span class="token punctuation">{</span> <span class="token atom">foo_pid</span><span class="token punctuation">,</span> <span class="token atom">foo@foonode</span> <span class="token punctuation">}</span> <span class="token operator">!</span> <span class="token punctuation">{</span> <span class="token atom">msg</span><span class="token punctuation">,</span> <span class="token string">"Obey!"</span> <span class="token punctuation">}</span><span class="token punctuation">.</span>
<span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
</code></pre>
<LazyImg src="/tumblr_files/tumblr_inline_niw5l8tH3Y1qh5oee.webp" alt="moonode" />

<LazyImg src="/tumblr_files/tumblr_inline_niw5lnNbgc1qh5oee.webp" alt="foonode" />

<p>Much cooler than writing ping-pong programs, huh? =)</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>