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

    <main class="svelte-1gr3n62"><article><h1>Assembly in C++ programs</h1>

    <time>23 Apr 2015 at 11:18</time>

    <div class="content"><h2 id="foreword">Foreword</h2>
<p>Writing code in assembly language in 2015 seems stupid and meaningless. Yet, it has a few huge benefits:</p>
<ol>
<li>understanding how computers / compilers / programs work</li>
<li>hardcore optimizations for performance-critical applications</li>
<li>just for fun!</li>
</ol>
<p>Well, in real life, I’ve never met conditions of such performance requirements when I should be writing some parts of application in ASM. Except, maybe, a handful of ACM ICPC problems.</p>
<p>Those are two merely big benefits to write in assembly. Thus, if you are not getting fun out of coding, you may not be interested in this blog.</p>
<p>This blog is mostly for academical purposes. People who study something like <em>low-level programming</em> at the university may be interested.</p>
<!--more-->

<h2 id="simplest-function-in-nasm">Simplest function in NASM</h2>
<p>And to start off, we will write a very simple program in assembly language. I shall be covering NASM language and compiler under Linux. MASM for Windows is much like that, but you should find your own way of compiling, linking and debugging all this code.</p>
<p>Our first program will do nothing. It will just contain globally available function, named <code>myfunc</code>.</p>
<pre><code class="language-nasm">    <span class="token keyword">BITS 32</span>

    <span class="token keyword">section .text</span>

        <span class="token keyword">global myfunc</span>

    <span class="token label function">myfunc:</span>

        enter <span class="token number">0</span>, <span class="token number">0</span>

        leave
        ret
</code></pre>
<p>This is barely a something useful, but that’s how it looks like. A simple function, which does nothing, has no arguments and returns nothing.</p>
<p>Note these instructions: <code>enter 0, 0</code> and <code>leave</code>. These are dedicated to create a <strong>stack frame</strong>. Stack frame is a part of stack, where we can store variables. This part of stack is isolated, so we barely may hurt system when using stack operations (<code>push</code> and <code>pop</code>).</p>
<p>Actually, you may create the stack frame yourself, pushing <code>ESP</code> and <code>EBP</code> to a stack manually, then shifting <code>ESP</code> and rolling all this back at function’s end. But these instructions are simpler.</p>
<p><strong>NOTE:</strong> never forget the <code>leave</code> operation when using <code>enter</code> one! This may cause a <code>SEGFAULT</code> exceptions and you may spend hours searching for an error <em>(just as I did this night…)</em>.</p>
<p>To use our function in a C++ program, we need to perform three steps:</p>
<ol>
<li>add en external declaration for our function in C++</li>
<li>compile our C++ and NASM programs to object files <em>(</em>.o or <em>.obj)</em></li>
<li>link our object files into a single binary one</li>
</ol>
<p>So, we need to interference with assembly from within our C++ code. And declare an external function. Here’s how our dummy program may look like:</p>
<pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>

<span class="token keyword">extern</span> <span class="token string">"C"</span> <span class="token keyword">void</span> <span class="token function">myfunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">myfunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Compiling this contains three steps, as I mentioned above:</p>
<pre><code class="language-bash">$ g++ -c -m32 -g test.cpp -o test_c.o
$ nasm -felf32 -g test.asm -o test_asm.o
$ g++ -m32 -g test_c.o test_asm.o -o <span class="token builtin class-name">test</span>
</code></pre>
<p>Let’s take a look over each of these closely.</p>
<pre><code class="language-bash">$ g++ -c -m32 -g test.cpp -o test_c.o
</code></pre>
<p>This tells compiler a few things:</p>
<ol>
<li><code>-c</code>: only compile the code, do not link it (do not search for referenced functions)</li>
<li><code>-m32</code>: compile code in a 32-bit mode</li>
<li><code>-g</code>: add a debugger information</li>
<li><code>-o test_c.o</code>: write output to a <code>test_c.o</code> file</li>
</ol>
<p><em>Why 32-bit mode? Why not 64-bit?</em> - you may ask. Because some conventions of 64-bit mode are harder to understand and should be compared to 32-bit ones.</p>
<p>Now, compiling assembly code command:</p>
<pre><code class="language-bash">$ nasm -felf32 -g test.asm -o test_asm.o
</code></pre>
<p>This provides compiler with these options:</p>
<ol>
<li><code>-felf32</code>: compile in a 32-bit mode</li>
<li><code>-g</code>: add a debugginng info</li>
<li><code>-o test_asm.o</code>: write output to an object file <code>test_asm.o</code></li>
</ol>
<p>Note the difference between <code>-m32</code> and <code>-felf32</code>. They mean the same, but are spelled differently.</p>
<h2 id="passing-arguments-and-returning-values">Passing arguments and returning values</h2>
<p>Now let’s make our function do something for a great good. For example, sum-up two numbers. We will end-up with this function declaration:</p>
<pre><code class="language-c"><span class="token keyword">extern</span> <span class="token string">"C"</span> <span class="token keyword">int</span> <span class="token function">sum_two_numbers</span><span class="token punctuation">(</span><span class="token keyword">int</span> a<span class="token punctuation">,</span> <span class="token keyword">int</span> b<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>The values <code>a</code> and <code>b</code> are integer. This means, each of them is <strong>4-byte wide</strong>. You can find sizes of different C types writing a very simple program:</p>
<pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(char) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(short) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">short</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(int) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(long) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(long long) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span> <span class="token keyword">long</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(float) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">float</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(double) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(long double) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span> <span class="token keyword">double</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(char*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(short*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">short</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(int*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(long*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(long long*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span> <span class="token keyword">long</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(float*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">float</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(double*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"size(long double*) = %d bytes\n"</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">long</span> <span class="token keyword">double</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>On my laptop this code printed this:</p>
<pre><code>size(char) = 1 bytes
size(short) = 2 bytes
size(int) = 4 bytes
size(long) = 8 bytes
size(long long) = 8 bytes
size(float) = 4 bytes
size(double) = 8 bytes
size(long double) = 16 bytes
size(char*) = 8 bytes
size(short*) = 8 bytes
size(int*) = 8 bytes
size(long*) = 8 bytes
size(long long*) = 8 bytes
size(float*) = 8 bytes
size(double*) = 8 bytes
size(long double*) = 8 bytes
</code></pre>
<p>But when run in <strong>32-bit</strong> mode, these numbers are different:</p>
<pre><code>size(char) = 1 bytes
size(short) = 2 bytes
size(int) = 4 bytes
size(long) = 4 bytes
size(long long) = 8 bytes
size(float) = 4 bytes
size(double) = 8 bytes
size(long double) = 12 bytes
size(char*) = 4 bytes
size(short*) = 4 bytes
size(int*) = 4 bytes
size(long*) = 4 bytes
size(long long*) = 4 bytes
size(float*) = 4 bytes
size(double*) = 4 bytes
size(long double*) = 4 bytes
</code></pre>
<p>The difference in atomic types seems really negligible, namely <code>long</code> and <code>long double</code> are <strong>4-byte longer</strong> in 64-bit mode. But when it comes to pointer types, we have twice longer variables.</p>
<p>That is the first, may be not so notable, but really important difference between <em>32-bit</em> and <em>64-bit</em> modes. This will be handy when it comes to <strong>arrays</strong>. But that will be covered later.</p>
<p>Now, the more notable difference hides in how arguments are passed to a function and how the function returns its result.</p>
<p>To show this difference, we will write a few short functions and look at their assembly code. Here they are:</p>
<pre><code class="language-c"><span class="token keyword">char</span> <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token char">'x'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">char</span> <span class="token function">func2</span><span class="token punctuation">(</span><span class="token keyword">char</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">short</span> <span class="token function">func3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">short</span> <span class="token function">func4</span><span class="token punctuation">(</span><span class="token keyword">short</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">func5</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">func6</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">long</span> <span class="token keyword">long</span> <span class="token function">func7</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">2147483647</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">long</span> <span class="token keyword">long</span> <span class="token function">func8</span><span class="token punctuation">(</span><span class="token keyword">long</span> <span class="token keyword">long</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">float</span> <span class="token function">func9</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">3.14f</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">float</span> <span class="token function">func10</span><span class="token punctuation">(</span><span class="token keyword">float</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">double</span> <span class="token function">func11</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">3.15</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">double</span> <span class="token function">func12</span><span class="token punctuation">(</span><span class="token keyword">double</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">long</span> <span class="token keyword">double</span> <span class="token function">func13</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token number">3.16</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">long</span> <span class="token keyword">double</span> <span class="token function">func14</span><span class="token punctuation">(</span><span class="token keyword">long</span> <span class="token keyword">double</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> x<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">func1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func2</span><span class="token punctuation">(</span><span class="token char">'x'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func4</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func5</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func6</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func7</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func8</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func9</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func10</span><span class="token punctuation">(</span><span class="token number">3.14f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func11</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func12</span><span class="token punctuation">(</span><span class="token number">3.14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func13</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">func14</span><span class="token punctuation">(</span><span class="token number">3.14</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Compile it with <code>g++</code> using this command:</p>
<pre><code class="language-bash">$ g++ -S -m32 -c -masm<span class="token operator">=</span>intel test1.cpp -o test1.asm
</code></pre>
<p>I’ll explain this line’s options:</p>
<ol>
<li><code>-S</code>: generate assembly output</li>
<li><code>-m32</code>: generate 32-bit code</li>
<li><code>-c</code>: stop after compiling</li>
<li><code>-masm=intel</code>: use Intel’ assembly syntax; it is NASM’ syntax and thus more readable then GASM’ one</li>
<li><code>-o test1.asm</code>: write output to a <code>test1.asm</code> file</li>
</ol>
<p>I shall not show the full output of this program, because it’s huge. It takes almost 400 lines of assembly code (370, actually)! Yet, in 64-bit mode it is just a bit more than 300 lines of code (precisely, 318). 60 LOC difference, but still…</p>
<p>These 60 lines of code is caused by a C type sizes. See, in 32-bit mode we have registers of a size <code>32 / 8 = 4</code> bytes. This is enough to store <code>int</code> or <code>float</code> value. Byt when it comes to <code>long double</code> or even just <code>double</code>, we have 4 bytes more. In 64-bit mode we have 8-byte wide registers. So, even a <code>long double</code> variable may be stored in a single register.</p>
<p>But let’s go back and take a look at, let’s say, <code>func1</code> function assembly:</p>
<pre><code class="language-nasm"><span class="token label function">_Z5func1v:</span>
<span class="token label function">.LFB0:</span>
    .cfi_startproc
    push    <span class="token register variable">ebp</span>
    .cfi_def_cfa_offset <span class="token number">8</span>
    .cfi_offset <span class="token number">5</span>, <span class="token operator">-</span><span class="token number">8</span>
    mov <span class="token register variable">ebp</span>, <span class="token register variable">esp</span>
    .cfi_def_cfa_register <span class="token number">5</span>
    mov <span class="token register variable">eax</span>, <span class="token number">120</span>
    pop <span class="token register variable">ebp</span>
    .cfi_restore <span class="token number">5</span>
    .cfi_def_cfa <span class="token number">4</span>, <span class="token number">4</span>
    ret
    .cfi_endproc
<span class="token label function">.LFE0:</span>
    .size   _Z5func1v, .<span class="token operator">-</span>_Z5func1v
    .globl  _Z5func2c
    .type   _Z5func2c, @function
</code></pre>
<p>Yeah, monstrous&hellip; Cleaning it up and using <code>enter</code> and <code>leave</code>, we have only this:</p>
<pre><code class="language-nasm"><span class="token label function">_Z5func1v:</span>
    enter <span class="token number">0</span>, <span class="token number">0</span>
    mov <span class="token register variable">eax</span>, <span class="token number">120</span>
    leave
    ret
</code></pre>
<p>See, the return value is stored in a <code>EAX</code> register. That’s how we should return values from our functions. When it comes to a larger data types, we may return values via <code>EDX:EAX</code> registers’ pair. Yeah, strange, but that is a <strong>convention</strong>.</p>
<p>Let’s take a look at the assembly code for a <code>func7</code> function and compare its variations for 32-bit mode vs 64-bit mode:</p>
<p><strong>32-bit func7:</strong></p>
<pre><code class="language-nasm"><span class="token label function">_Z5func7v:</span>
    enter <span class="token number">0</span>, <span class="token number">0</span>
    mov <span class="token register variable">eax</span>, <span class="token number">2147483647</span>
    mov <span class="token register variable">edx</span>, <span class="token number">0</span>
    leave
    ret
</code></pre>
<p><strong>64-bit func7:</strong></p>
<pre><code class="language-nasm"><span class="token label function">_Z5func8l:</span>
    enter <span class="token number">0</span>, <span class="token number">0</span>
    mov QWORD PTR <span class="token operator">[</span><span class="token register variable">rbp</span><span class="token operator">-</span><span class="token number">8</span><span class="token operator">]</span>, <span class="token register variable">rdi</span>
    mov <span class="token register variable">rax</span>, QWORD PTR <span class="token operator">[</span><span class="token register variable">rbp</span><span class="token operator">-</span><span class="token number">8</span><span class="token operator">]</span>
    leave
    ret
</code></pre>
<p>See, there are two registers used in a 32-bit mode, <code>EAX = 2147483647</code> and <code>EDX = 0</code>. The second register is used for a sign value. If we’d change the return value for our C++ function to return a negative value:</p>
<pre><code class="language-c"><span class="token keyword">long</span> <span class="token keyword">long</span> <span class="token function">func7</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">2147483647</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>We will end-up with this code in a 32-bit mode:</p>
<pre><code class="language-nasm">mov <span class="token register variable">eax</span>, <span class="token operator">-</span><span class="token number">2147483647</span>
mov <span class="token register variable">edx</span>, <span class="token operator">-</span><span class="token number">1</span>
</code></pre>
<p>And in 64-bit mode it will have only one operation:</p>
<pre><code class="language-nasm">    mov <span class="token register variable">rax</span>, <span class="token operator">-</span><span class="token number">2147483647</span>
</code></pre>
<p>Now let’s take a look over the <code>func8</code> function:</p>
<pre><code class="language-nasm"><span class="token label function">_Z5func8x:</span>
    enter <span class="token number">0</span>, <span class="token number">0</span>
    sub <span class="token register variable">esp</span>, <span class="token number">8</span>
    mov <span class="token register variable">eax</span>, DWORD PTR <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">8</span><span class="token operator">]</span>
    mov DWORD PTR <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">8</span><span class="token operator">]</span>, <span class="token register variable">eax</span>
    mov <span class="token register variable">eax</span>, DWORD PTR <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">12</span><span class="token operator">]</span>
    mov DWORD PTR <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">4</span><span class="token operator">]</span>, <span class="token register variable">eax</span>
    mov <span class="token register variable">eax</span>, DWORD PTR <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">8</span><span class="token operator">]</span>
    mov <span class="token register variable">edx</span>, DWORD PTR <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">4</span><span class="token operator">]</span>
    leave
    ret
</code></pre>
<p>We may clean it up removing all those <code>DWORD PTR</code> type hints:</p>
<pre><code class="language-nasm"><span class="token label function">_Z5func8x:</span>
    enter <span class="token number">0</span>, <span class="token number">0</span>
    sub <span class="token register variable">esp</span>, <span class="token number">8</span>
    mov <span class="token register variable">eax</span>, <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">8</span><span class="token operator">]</span>
    mov <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">8</span><span class="token operator">]</span>, <span class="token register variable">eax</span>
    mov <span class="token register variable">eax</span>, <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">12</span><span class="token operator">]</span>
    mov <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">4</span><span class="token operator">]</span>, <span class="token register variable">eax</span>
    mov <span class="token register variable">eax</span>, <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">8</span><span class="token operator">]</span>
    mov <span class="token register variable">edx</span>, <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">4</span><span class="token operator">]</span>
    leave
    ret
</code></pre>
<p>All the memory “by the negative side” of <code>EBP</code> is dedicated to local variables. All the memory “by the positive side” of <code>EBP</code> is the one with arguments, passed to our function.</p>
<p>Taking that into account, we may rewrite our assembly function as this:</p>
<pre><code class="language-nasm"><span class="token label function">_Z5func8x:</span>
    enter <span class="token number">0</span>, <span class="token number">0</span>

    <span class="token operator">%</span>define x1 dword<span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">8</span><span class="token operator">]</span>
    <span class="token operator">%</span>define x2 dword<span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">12</span><span class="token operator">]</span>
    <span class="token operator">%</span>define tmp1 dword<span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">8</span><span class="token operator">]</span>
    <span class="token operator">%</span>define tmp2 dword<span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">-</span><span class="token number">4</span><span class="token operator">]</span>

    sub <span class="token register variable">esp</span>, <span class="token number">8</span>
    mov <span class="token register variable">eax</span>, x1
    mov tmp1, <span class="token register variable">eax</span>
    mov <span class="token register variable">eax</span>, x2
    mov tmp2, <span class="token register variable">eax</span>
    mov <span class="token register variable">eax</span>, tmp1
    mov <span class="token register variable">edx</span>, tmp2

    leave
    ret
</code></pre>
<p>Now it became more readable.</p>
<p>Here we have a few really important things:</p>
<ol>
<li><code>sub esp, 8</code> - this allocates 8 bytes of stack memory for our local variables</li>
<li><code>[ebp+8]</code> and <code>[ebp+12]</code> are two parts, each 4-byte long, of our argument of type <code>long long</code></li>
<li><code>[ebp-8]</code> and <code>[ebp-4]</code> are two parts of our return value; each 4-byte long; of type <code>long long</code></li>
<li>return value is split into two registers, namely, <code>EAX</code> (high-order bytes) and <code>EDX</code> (low-order bytes)</li>
</ol>
<p>That is how C passes arguments to a function in 32-bit mode. Arguments here are passed via stack. In 64-bit mode it’s a bit complicated: arguments are passed via registers and if they are not enough - through the stack. Registers are the following (ordered): <code>RDI</code>, RSI<code>, RDX</code>, RCX<code>, R8</code>, <code>R9</code>.</p>
<p>And the return values are stored in registers. Always. In both 32-bit and 64-bit modes.</p>
<h2 id="working-wit-arrays">Working wit arrays</h2>
<p>I shall not cover working with arrays in NASM itself, but rather working with already allocated memory in C.</p>
<p>Arrays are transfered to a function as pointers in C and C++. Under the hood, pointer is just an address to a memory block. To its beginning, actually. Knowing the <strong>size of each array element</strong> and <strong>elements count</strong>, we may perform any kind of operations simply iterating through a set of memory addresses.</p>
<p>Let’s for example calculate a sum of an array elements:</p>
<pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>

<span class="token keyword">extern</span> <span class="token string">"C"</span> <span class="token keyword">int</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token operator">*</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> a<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">4</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 1 + 2 + 7 + 9 - 4 = 15</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"sum(a) = %d\n"</span><span class="token punctuation">,</span> <span class="token function">sum</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>And let’s create the function <code>sum</code> in NASM. To start off, we’ll use a function, receiving two arguments, <code>int</code> and <code>int*</code> and returning a zero.</p>
<pre><code class="language-nasm"><span class="token keyword">BITS 32</span>

<span class="token keyword">section .text</span>

<span class="token keyword">global sum</span>

<span class="token label function">sum:</span>

    enter <span class="token number">0</span>, <span class="token number">0</span>

    <span class="token operator">%</span>define n dword <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">8</span><span class="token operator">]</span>
    <span class="token operator">%</span>define a dword <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">12</span><span class="token operator">]</span>

    mov <span class="token register variable">eax</span>, <span class="token number">0</span>

    leave
    ret
</code></pre>
<p>Now what we would like to do is to add each element of array to our <code>result</code> variable <em>(oh, we do not have one yet!)</em>. To do this, we will use two registers: <code>ECX</code> to count how many elements we have added and <code>EAX</code> to store the sum. Each element’s address is <code>*a + 4 * i</code> or address of <code>a[0]</code> plus <code>4 bytes</code> times <code>i</code>, our element number.</p>
<p>The loop we would use is a reverse one: first we assign <code>ECX = n</code> and then decrement our <code>ECX</code> by one each loop iteration. We are decrementing <code>ECX</code> by one because it contains a number of elements at the beginning of our function. We may use even reverse approach (or a straight one in the meanings of C, when we count from the first element to the last): first, we assign <code>ECX = 0</code> and before going to the end of a loop we will compare <code>ECX</code> to <code>n</code> instead of zero.</p>
<p>In NASM we may calculate the address of each array element in the operand itself: <code>[ebx + 4 * ecx]</code>.</p>
<p>Now everything what we need is to add all those hints into a single program:</p>
<pre><code class="language-nasm"><span class="token keyword">BITS 32</span>

<span class="token keyword">section .text</span>

<span class="token keyword">global sum</span>

<span class="token label function">sum:</span>

    enter <span class="token number">0</span>, <span class="token number">0</span>

    <span class="token operator">%</span>define n dword <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">8</span><span class="token operator">]</span>
    <span class="token operator">%</span>define a dword <span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">12</span><span class="token operator">]</span>

    mov <span class="token register variable">eax</span>, <span class="token number">0</span> <span class="token comment">; EAX = sum = 0</span>
    mov <span class="token register variable">ebx</span>, a <span class="token comment">; EBX = *a</span>
    mov <span class="token register variable">ecx</span>, n <span class="token comment">; ECX = i = n</span>

<span class="token label function">add_loop:</span>

    add <span class="token register variable">eax</span>, <span class="token operator">[</span><span class="token register variable">ebx</span> <span class="token operator">+</span> <span class="token number">4</span> <span class="token operator">*</span> <span class="token register variable">ecx</span> <span class="token operator">-</span> <span class="token number">4</span><span class="token operator">]</span> <span class="token comment">; EAX += a[i]</span>

    dec <span class="token register variable">ecx</span> <span class="token comment">; ECX --</span>
    cmp <span class="token register variable">ecx</span>, <span class="token number">0</span>

    jg add_loop <span class="token comment">; if ECX &amp;gt; 0 then goto add_loop</span>

    <span class="token comment">; EAX contains the sum here</span>

    leave
    ret
</code></pre>
<p>Note that I subtract four bytes in an element address: <code>[ebx + 4 * ecx - 4]</code>. That’s because our i’th element starts at <code>*a + (i * 4)</code> byte, but we have <code>i = n</code> on the beginning. Thus, first iteration will try to add element, starting at <code>*a + (n * 4)</code> byte, which does not exist in our array <em>(the 5th element)</em>. So, we need to subtract one element’ size from our <code>[ebx + 4 * ecx]</code> address.</p>
<p>Now, if we would like to shorten our source a bit, we may use the <code>loop</code> operation. What it does, is compares <code>ECX</code> with zero and if it is greater than zero - it jumps to a label specified.</p>
<p>These two codes are completely identical for processor:</p>
<p><strong>manual loop</strong>:</p>
<pre><code class="language-nasm">mov <span class="token register variable">ecx</span>, n

<span class="token label function">add_loop:</span>

    <span class="token comment">; do something</span>

    dec <span class="token register variable">ecx</span>
    cmp <span class="token register variable">ecx</span>, <span class="token number">0</span>
    jg add_loop
</code></pre>
<p><strong>with <code>loop</code> instruction</strong>:</p>
<pre><code class="language-nasm">mov <span class="token register variable">ecx</span>, n

<span class="token label function">add_loop:</span>

    <span class="token comment">; do something</span>

    loop add_loop
</code></pre>
<p>We’ve just saved two lines of code!</p>
<h2 id="floating-point-operations">Floating-point operations</h2>
<p>When working with floating-point data, we have <strong>seven</strong> registers, which could be used to perform operations on a floating-point arguments. We may <strong>store</strong> float data in a <strong>memory</strong> <em>(but never in registers!)</em>, but we may not perform operations on a float data contained in a memory. Just as we may not operate on a usual data, stored in a memory - we need to store it in registers first. Same thing here - store data on a <strong>floating-point stack</strong> and perform operations there. Then move results to the memory.</p>
<p>When writing a C++ functions working with floats, arguments are stored on a float stack and results are stored on a top of that stack. Yet, the other six cells of a float stack <strong>should</strong> be cleared when returning a value. Otherwise it may cause hard-to-find errors.</p>
<p>So, the basic operations we may run on a floats are:</p>
<ol>
<li>pushing to stack (<code>FLD</code>, <code>FLDZ</code>, <code>FLD1</code>, etc.)</li>
<li>floating-point arithmetics (<code>FADD</code>, <code>FMUL</code>, <code>FDIV</code>, <code>FSUB</code>, etc.)</li>
<li>arithmetics with popping from a stack into the top stack cell (<code>ST0</code>)</li>
<li>popping from a stack to a memory (<code>FST</code> operations)</li>
</ol>
<p>Yeah, these are a hell-yeah mix of both arithmetic operations and stack operations!</p>
<p>Let’s write a very short example, showing how to work with floats. Let it be a two-vector dot product function.</p>
<p>We shall write a function of this declaration:</p>
<pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>

<span class="token keyword">extern</span> <span class="token string">"C"</span> <span class="token keyword">long</span> <span class="token keyword">double</span> <span class="token function">dot_product</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">,</span> <span class="token keyword">long</span> <span class="token keyword">double</span> <span class="token operator">*</span>v1<span class="token punctuation">,</span> <span class="token keyword">long</span> <span class="token keyword">double</span> <span class="token operator">*</span>v2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> <span class="token keyword">double</span> v1<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">5</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token keyword">double</span> v2<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> n <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token comment">// 3*4 + 5*2 = 12 + 10 = 22</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"dot_product(v1, v2) = %0.4f\n"</span><span class="token punctuation">,</span> <span class="token function">dot_product</span><span class="token punctuation">(</span>n<span class="token punctuation">,</span> v1<span class="token punctuation">,</span> v2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>This one will calculate a dot product of two <em>n-element</em> vectors.</p>
<pre><code class="language-nasm"><span class="token keyword">BITS 32</span>

<span class="token keyword">section .text</span>

    <span class="token keyword">global dot_product</span>

<span class="token label function">dot_product:</span>

    enter <span class="token number">0</span>, <span class="token number">0</span>

    <span class="token operator">%</span>define n dword<span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">8</span><span class="token operator">]</span>
    <span class="token operator">%</span>define v1 dword<span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">12</span><span class="token operator">]</span>
    <span class="token operator">%</span>define v2 dword<span class="token operator">[</span><span class="token register variable">ebp</span> <span class="token operator">+</span> <span class="token number">16</span><span class="token operator">]</span>

    mov <span class="token register variable">ecx</span>, n
    mov <span class="token register variable">edx</span>, v1
    mov <span class="token register variable">ebx</span>, v2

    fldz <span class="token comment">; stack: 0 ( = tail)</span>

<span class="token label function">add_loop:</span>

    fld tword <span class="token operator">[</span><span class="token register variable">edx</span><span class="token operator">]</span> <span class="token comment">; stack: v1, tail</span>
    fld tword <span class="token operator">[</span><span class="token register variable">ebx</span><span class="token operator">]</span> <span class="token comment">; stack: v2, v1, tail</span>

    fmulp <span class="token register variable">st1</span>, <span class="token register variable">st0</span> <span class="token comment">; stack: v2 * v1, tail</span>
    faddp <span class="token register variable">st1</span>, <span class="token register variable">st0</span> <span class="token comment">; stack: v2 * v1 + tail</span>

    add <span class="token register variable">edx</span>, <span class="token number">12</span>
    add <span class="token register variable">ebx</span>, <span class="token number">12</span>

    loop add_loop

<span class="token label function">just_exit:</span>

    leave
    ret
</code></pre>
<p>The algorithm of a code above may be written as follows:</p>
<ol>
<li>load zero to a floating stack <em>(ST: <code>[0 nan nan nan nan nan nan]</code>)</em></li>
<li><em>in a loop</em> load _i_th element of <code>v1</code> to a floating stack <em>(ST: <code>[3 0 nan nan nan nan nan]</code>)</em></li>
<li><em>in a loop</em> load _i_th element of <code>v2</code> to a floating stack <em>(ST: <code>[4 3 0 nan nan nan nan]</code>)</em></li>
<li><em>in a loop</em> multiply first two elements of a floating stack, write the result to <code>ST1</code> and pop stack head <em>(ST: <code>[12 0 nan nan nan nan nan]</code>)</em></li>
<li><em>in a loop</em> add first two elements of a stack, write the result to <code>ST1</code> and pop stack head <em>(ST: <code>[12 nan nan nan nan nan nan]</code>)</em></li>
<li><em>in a loop</em> add 12 bytes to our <code>i</code></li>
<li><em>in a loop</em> add 12 bytes to our <code>t</code></li>
</ol>
<p>At the end of our loop, precisely, at our <code>just_exit</code> label, we will have floating stack with the only element on its top, the dot product of our vectors <code>v1</code> and <code>v2</code>. This value will be returned to our C++ program.</p>
<h2 id="a-few-words-on-debugging">A few words on debugging</h2>
<p>As you remember <em>(if not - just look above)</em> we added a <em>debugger info</em> option when compiling our programs. Now let&rsquo;s use it.</p>
<p>Let&rsquo;s have some buggy program. For example, the one which calculates a rectangular parallelepiped&rsquo;s surface area and volume:</p>
<p><strong>C program</strong>:</p>
<pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>

<span class="token keyword">extern</span> <span class="token keyword">void</span> <span class="token function">surface_and_volume</span><span class="token punctuation">(</span><span class="token keyword">float</span> a<span class="token punctuation">,</span> <span class="token keyword">float</span> b<span class="token punctuation">,</span> <span class="token keyword">float</span> c<span class="token punctuation">,</span> <span class="token keyword">float</span> <span class="token operator">*</span>v<span class="token punctuation">,</span> <span class="token keyword">float</span> <span class="token operator">*</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">float</span> surface <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> volume <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

  <span class="token function">surface_and_volume</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>volume<span class="token punctuation">,</span> <span class="token operator">&amp;</span>surface<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"volume: %0.3f surface: %0.3f\n"</span><span class="token punctuation">,</span> volume<span class="token punctuation">,</span> surface<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p><strong>NASM program</strong>:</p>
<pre><code class="language-nasm"><span class="token keyword">BITS 32</span>

<span class="token keyword">section .text</span>

    <span class="token keyword">global surface_and_volume</span>

<span class="token label function">surface_and_volume:</span>

    enter <span class="token number">0</span>, <span class="token number">0</span>

    <span class="token operator">%</span>define a dword<span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">8</span><span class="token operator">]</span>
    <span class="token operator">%</span>define b dword<span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">12</span><span class="token operator">]</span>
    <span class="token operator">%</span>define c dword<span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">16</span><span class="token operator">]</span>
    <span class="token operator">%</span>define vol_ptr dword <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">20</span><span class="token operator">]</span> <span class="token comment">; a*b*c</span>
    <span class="token operator">%</span>define surf_ptr dword <span class="token operator">[</span><span class="token register variable">ebp</span><span class="token operator">+</span><span class="token number">24</span><span class="token operator">]</span> <span class="token comment">; a*a*2 + b*b*2 + c*c*2</span>

    mov <span class="token register variable">eax</span>, vol_ptr
    mov <span class="token register variable">ebx</span>, surf_ptr

    fldz <span class="token comment">; st6</span>
    fldz <span class="token comment">; st5</span>
    fldz <span class="token comment">; st4</span>
    fld c <span class="token comment">; st3</span>
    fld b <span class="token comment">; st2</span>
    fld a <span class="token comment">; st1</span>
    fldz <span class="token comment">; st0</span>

    <span class="token comment">; calculate volume</span>
    fsub <span class="token register variable">st0</span>, <span class="token register variable">st0</span> <span class="token comment">; st0 = 0</span>
    fadd <span class="token register variable">st1</span> <span class="token comment">; st0 = a</span>
    fmul <span class="token register variable">st2</span> <span class="token comment">; st0 *= b</span>
    fmul <span class="token register variable">st3</span> <span class="token comment">; st0 *= c</span>

    fst dword <span class="token operator">[</span><span class="token register variable">eax</span><span class="token operator">]</span>

    <span class="token comment">; calculate surface</span>

    fsub <span class="token register variable">st0</span>, <span class="token register variable">st0</span> <span class="token comment">; st0 = 0</span>
    fadd <span class="token register variable">st1</span> <span class="token comment">; st0 = a</span>
    fmul <span class="token register variable">st2</span> <span class="token comment">; st0 *= b</span>
    fadd <span class="token register variable">st4</span>, <span class="token register variable">st0</span> <span class="token comment">; st4 = a*b</span>

    fsub <span class="token register variable">st0</span>, <span class="token register variable">st0</span> <span class="token comment">; st0 = 0</span>
    fadd <span class="token register variable">st1</span> <span class="token comment">; st0 = a</span>
    fmul <span class="token register variable">st3</span> <span class="token comment">; st0 *= c</span>
    fadd <span class="token register variable">st5</span>, <span class="token register variable">st0</span> <span class="token comment">; st5 = a*c</span>

    fsub <span class="token register variable">st0</span>, <span class="token register variable">st0</span> <span class="token comment">; st0 = 0</span>
    fadd <span class="token register variable">st2</span> <span class="token comment">; st0 = b</span>
    fmul <span class="token register variable">st3</span>
    fadd <span class="token register variable">st6</span>, <span class="token register variable">st0</span> <span class="token comment">; st6 = b*c</span>

    fsub <span class="token register variable">st0</span>, <span class="token register variable">st0</span> <span class="token comment">; st0 = 0</span>
    fadd <span class="token register variable">st4</span>
    fadd <span class="token register variable">st5</span>
    fadd <span class="token register variable">st6</span> <span class="token comment">; st0 = a*b + a*c + b*c</span>
    fadd <span class="token register variable">st0</span> <span class="token comment">; st0 = 2*(a*b + a*c + b*c)</span>

<span class="token label function">just_exit:</span>

    fst dword <span class="token operator">[</span><span class="token register variable">ebx</span><span class="token operator">]</span>

    <span class="token comment">; free float stack</span>
    fstp a
    fstp a
    fstp a
    fstp a
    fstp a
    fstp a

    ret
</code></pre>
<p>Compile it as usual and run with GDB:</p>
<pre><code class="language-bash">$ g++ -c -m32 -g test3.c -o test3_c.o
$ nasm -felf32 -g test3.asm -o test3_asm.o
$ g++ -m32 -g test3_asm.o test3_c.o -o test3
$ gdb test3
</code></pre>
<p>Now, when you&rsquo;re in a debugger&rsquo; console, you may run debugging commands. Here are a few of them:</p>
<ul>
<li><code>r</code> or <code>run</code> will run your program, stopping at first breakpoint</li>
<li><code>b func_name</code> or <code>break func_name</code> will set a breakpoint at the first line of <code>func_name</code></li>
<li><code>p var</code> or <code>print var</code> will show the <code>var</code> variable contents in decimal format. For registers its <code>$eax</code> and so on</li>
<li><code>p /x var</code> or <code>print /x var</code> will show the <code>var</code> variable contents in hexadecimal format</li>
<li><code>x mem_addr</code> will show the contents of memory at <code>mem_addr</code></li>
<li><code>x/4 mem_addr</code> will show <strong>four</strong> 4-byte pieces of memory at <code>mem_addr</code></li>
<li><code>disassemble</code> will print out the assembly code for current function</li>
<li><em>(from breakpoint)</em> <code>c</code> or <code>continue</code> will run program until it hits end or breakpoint</li>
<li><em>(from breakpoint)</em> <code>ni</code> will step one instruction</li>
<li><em>(from breakpoint)</em> <code>n</code> or <code>next</code> will step over the next function <em>(in C)</em>; for ASM it&rsquo;s same as <code>ni</code></li>
<li><em>(from breakpoint)</em> <code>s</code> or <code>step</code> will step in the next function <em>(in C)</em>; for ASM it&rsquo;s same as <code>ni</code></li>
<li><code>info r</code> shows current registers&rsquo; state</li>
<li><code>info float</code> shows current co-processor state</li>
<li><kbd>Ctrl+D</kbd> stands for <code>quit</code></li>
</ul>
<p>Now, using GDB, try to find out what&rsquo;s wrong with the program I&rsquo;ve suggested!</p>
<h2 id="afterword">Afterword</h2>
<p>This is currently most of important things I’ve learnt at the university. This is pretty much for a beginner. And this information is really for those who have fun writing code or those who are made to write some excercises at university.</p>
<p>As for me, now ASM does not look so scary now =) But I like writing more high-level code <em>(in C at least!)</em> because it takes less time to do more.</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>