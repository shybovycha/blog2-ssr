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

    <main class="svelte-1gr3n62"><article><h1>Memory allocation in ASM</h1>

    <time>06 May 2015 at 10:20</time>

    <div class="content"><p>Currently I am working on a long arithmetic problem at the university. This problem is much more complicated than I described or than a task I shall be describing now, but here&rsquo;s the thing: I needed some part of memory to be allocated from within my function. And I needed this to be done in assembly.</p>
<!--more-->
<p>Thus, I created this piece of snippet code:</p>
<pre><code class="language-nasm"><span class="token comment">; void addition(int* x, int x_len, int* y, int y_len, int* &amp;z, int* z_len);</span>
<span class="token keyword">global _Z8additionPiiS_iRS_S_</span>
<span class="token label function">_Z8additionPiiS_iRS_S_:</span>

    enter <span class="token number">0</span>, <span class="token number">0</span>

    <span class="token operator">%</span>define p_x <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">8</span><span class="token operator">]</span>
    <span class="token operator">%</span>define x_len <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">12</span><span class="token operator">]</span>
    <span class="token operator">%</span>define p_y <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">16</span><span class="token operator">]</span>
    <span class="token operator">%</span>define y_len <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">20</span><span class="token operator">]</span>
    <span class="token operator">%</span>define p_z <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">24</span><span class="token operator">]</span>
    <span class="token operator">%</span>define p_z_len <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">28</span><span class="token operator">]</span>

<span class="token label function">addition_allocate_mem:</span>

    <span class="token comment">; push x_len * 4 ; bytes to allocate</span>
    push <span class="token number">3</span> <span class="token operator">*</span> <span class="token number">4</span> <span class="token comment">; bytes to allocate</span>
    call malloc <span class="token comment">; call malloc()</span>
    add <span class="token register variable">esp</span>, <span class="token number">4</span> <span class="token comment">; undo push</span>
    mov <span class="token register variable">edx</span>, <span class="token register variable">eax</span> <span class="token comment">; save returned address from malloc</span>
    mov <span class="token register variable">eax</span>, p_z
    mov <span class="token operator">[</span><span class="token register variable">eax</span><span class="token operator">]</span>, <span class="token register variable">edx</span> <span class="token comment">; z = malloc(...)</span>
    mov <span class="token register variable">eax</span>, p_z_len
    mov <span class="token operator">[</span><span class="token register variable">eax</span><span class="token operator">]</span>, dword <span class="token number">3</span> <span class="token comment">; *z_len = elements</span>

<span class="token label function">addition_fill_mem:</span>

    <span class="token comment">; fill with sample values</span>
    mov <span class="token register variable">eax</span>, p_z
    mov <span class="token register variable">eax</span>, <span class="token operator">[</span><span class="token register variable">eax</span><span class="token operator">]</span>
    add <span class="token register variable">eax</span>, <span class="token number">0</span> <span class="token operator">*</span> <span class="token number">4</span>
    mov <span class="token operator">[</span><span class="token register variable">eax</span><span class="token operator">]</span>, dword <span class="token number">4</span>

    <span class="token comment">; mov eax, p_z</span>
    add <span class="token register variable">eax</span>, <span class="token number">1</span> <span class="token operator">*</span> <span class="token number">4</span>
    mov <span class="token operator">[</span><span class="token register variable">eax</span><span class="token operator">]</span>, dword <span class="token number">3</span>

    <span class="token comment">; mov eax, p_z</span>
    <span class="token comment">; add eax, 2 * 4</span>
    add <span class="token register variable">eax</span>, <span class="token number">1</span> <span class="token operator">*</span> <span class="token number">4</span>
    mov <span class="token operator">[</span><span class="token register variable">eax</span><span class="token operator">]</span>, dword <span class="token number">2</span>

    leave
    ret
</code></pre>
<p>There are, however, a few really interesting things in this code:</p>
<ul>
<li>naming of C++ functions, generated from assembly <em>(name mangling)</em></li>
<li>memory allocation itself</li>
<li>returning data from function via pointers&hellip; <strong>in assembly!</strong></li>
</ul>
<p>To demonstrate how this stuff works, we need some C++ code which uses our assembly function:</p>
<pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>

<span class="token comment">// our addition function for BIG integers</span>
<span class="token comment">// arguments are as follows: number and its length; two first pairs are the operands</span>
<span class="token comment">// and the last two arguments describe the returned big integer</span>
<span class="token comment">// thus, the result is z = x + y</span>
<span class="token keyword">extern</span> <span class="token string">"C"</span> <span class="token keyword">void</span> <span class="token function">addition</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> x_len<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> y_len<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> <span class="token operator">&amp;</span>z<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> z_len<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// helper function to convert BIG integers to strings</span>
<span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">bigint2str</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> len<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>res <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token punctuation">(</span>len <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        res<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> x<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token char">'0'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    res<span class="token punctuation">[</span>len<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token char">'\0'</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span><span class="token operator">*</span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> a_len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// here we add nothing with nothing</span>
    <span class="token comment">// and storing the result in a big integer `a`</span>
    <span class="token function">addition</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token operator">&amp;</span>a_len<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"a = %s\n"</span><span class="token punctuation">,</span> <span class="token function">bigint2str</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> a_len<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Comments in the code describe those moments which are important.</p>
<p>To compile these codes and link them into one executable, use these:</p>
<pre><code class="language-bash">$ nasm -g -felf32 test.asm -o test_asm.o
$ g++ -g test.cpp -c -m32 -o test_c.o
$ g++ -g -m32 -o <span class="token builtin class-name">test</span> test_asm.o test_c.o
</code></pre>
<p>Now, let&rsquo;s talk about name mangling. It is really important. I shall not cover all the depths of this, only the parts, related to this article.</p>
<p>We see that our function,</p>
<pre><code class="language-c"><span class="token keyword">void</span> <span class="token function">addition</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> x_len<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> y_len<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> <span class="token operator">&amp;</span>z<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">*</span> z_len<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>is known as <code>_Z8additionPiiS_iRS_S_</code> in the assembly code.</p>
<p><em>What&rsquo;s the..? What are all these strange prefixes?</em>  - you might ask.</p>
<p>Here&rsquo;s the convention:</p>
<ol>
<li>functions are named with the underscore and an uppercase letter</li>
<li>function name&rsquo; length and the name itself follows that prefix</li>
<li>arguments are stored as their types only</li>
</ol>
<p>Argument type is encoded as well. For our example, we see these:</p>
<ol>
<li><code>Pi</code> - that means, literally, <code>pointer to integer</code></li>
<li><code>i</code> - that stands for <code>integer</code></li>
<li><code>S_</code> - that is the same as <code>Pi</code>, equal to <code>signed integer</code>, <strong>but</strong> for some reason <em>(yes, I do not know why this happens)</em> if you try to replace it with <code>Pi</code>, your function will not be found by a linker</li>
<li><code>RS_</code> - this is <code>a reference to a pointer to integer</code></li>
</ol>
<p>To get know those conventions better, you might refer to <a href="http://www.ofb.net/gnu/gcc/gxxint_15.html">g++ internals reference</a>.</p>
<p>You can decode demangled <em>(encoded)</em> function names as well. Just use <code>c++filt</code> utility:</p>
<pre><code class="language-bash">$ c++filt -n _Z8divisionPiiS_iRS_S_
division<span class="token punctuation">(</span>int*, int, int*, int, int*<span class="token operator">&amp;</span>, int*<span class="token punctuation">)</span>
</code></pre>
<p>&lsquo;til next time!</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>