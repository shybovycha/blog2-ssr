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

    <main class="svelte-1gr3n62"><article><h1>What i always forget about when having an interview</h1>

    <time>12 Apr 2014 at 16:52</time>

    <div class="content"><h2>The Ruby interview</h2>

<p>I am always being asked at least two questions. Just to verify that I know Ruby basics.</p>

<ul><li><strong>What is the main difference between Module and Class?</strong></li>
</ul><p>That is so simple and obvious! Yet it&rsquo;s too easy to forget&hellip; The answer is: <strong>you can not instantiate a Module</strong>. See, Modules in Ruby do not have constructors. Yeah, they may contain variables, but they do not have an <code>initialize</code> method.</p>

<p>You could define one this way:</p>

<pre><code class="language-ruby"><span class="token keyword">module</span> <span class="token class-name">Moo</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token variable">@x</span> <span class="token operator">=</span> x
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>But when you try to call <code>Moo.new</code> you will get a <code>method missing</code> error.  When you try to run <code>Moo.initialize</code> you will get a <code>private method called</code> error.</p>

<p>So yes, there is no way to instantiate Modules.</p>

<ul><li><strong>What&rsquo;s the difference between Proc, lambda and block?</strong></li>
</ul><p>This is simple enough to remember as the answer contains only a few points:</p>

<ol><li><code>Proc</code> is an object; <code>block</code> is not</li>
<li><code>Proc</code> does not check the number of arguments; <code>lambda</code> does</li>
<li><code>lambda</code> returns from itself; <code>Proc</code> returns from the outer (containing the <code>Proc</code> call) method</li>
</ol><ul><li><strong>What is REST (application)?</strong></li>
</ul><p>The answer on that question hardly depends on what the asking person means.</p>

<p>So, I got two possible <em>correct answers</em>:</p>

<p>a. That is the principle of web application development, when the application responds to a request, depending on which HTTP method was provided <em>(PUT, GET, POST, DELETE, OPTIONS)</em>.</p>

<p>b. This is a way of encapsulation Resource and its Handlers. That is a bit hard to explain. Something like <em>&ldquo;you have to split your application to Resources&rdquo;</em>.</p>

<ul><li><strong>Does Module is the ancestor of Class or does the Class is the child of Module?</strong></li>
</ul><p>This question, actually, may be asked on <strong>Class</strong>, <strong>Module</strong> or <strong>Object</strong> classes. This question is interesting when you do not know the answer.</p>

<p>The reality is plain however:</p>

<pre><code class="language-ruby">irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token operator">:</span><span class="token number">005</span><span class="token operator">:</span><span class="token number">0</span><span class="token operator">></span> <span class="token builtin">Object</span><span class="token punctuation">.</span>superclass
<span class="token operator">=></span> BasicObject
irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token operator">:</span><span class="token number">006</span><span class="token operator">:</span><span class="token number">0</span><span class="token operator">></span> <span class="token builtin">Class</span><span class="token punctuation">.</span>superclass
<span class="token operator">=></span> <span class="token builtin">Module</span>
irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token operator">:</span><span class="token number">007</span><span class="token operator">:</span><span class="token number">0</span><span class="token operator">></span> <span class="token builtin">Module</span><span class="token punctuation">.</span>superclass
<span class="token operator">=></span> <span class="token builtin">Object</span>
irb<span class="token punctuation">(</span>main<span class="token punctuation">)</span><span class="token operator">:</span><span class="token number">008</span><span class="token operator">:</span><span class="token number">0</span><span class="token operator">></span> BasicObject<span class="token punctuation">.</span>superclass
<span class="token operator">=></span> <span class="token keyword">nil</span>
</code></pre>
<p>So, you can even draw a chain:</p>

<pre><code class="language-haskell"><span class="token constant">BasicObject</span> <span class="token operator">=></span> <span class="token constant">Object</span> <span class="token operator">=></span> <span class="token constant">Module</span> <span class="token operator">=></span> <span class="token constant">Class</span>
</code></pre>
<h2>Some hints</h2>

<ul><li><p>Think oral. Show an interviewing person how your thought flow. That is the good practice. It shows that you <strong>can think</strong> not just <strong>remember</strong>. And you could get to some friendly talk when you say some magic <em>keyword</em> or tell something the interviewer is interested in.</p></li>
<li><p>When I am asked of <strong>Rails best practices</strong>, or just creating my web application, I should never forget one core principle: web application controllers <em>(looking at Rails&rsquo; MVC)</em> should be <strong>thin</strong>. So, the most logic at <strong>Controller</strong>&rsquo;s action should get or set some data on <strong>Model</strong> and provide a response. Nothing more.</p></li>
</ul>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>