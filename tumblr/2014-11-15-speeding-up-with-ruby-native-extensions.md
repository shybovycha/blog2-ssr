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

    <main class="svelte-1gr3n62"><article><h1>Speeding up with Ruby native extensions</h1>

    <time>14 Nov 2014 at 23:21</time>

    <div class="content"><LazyImg alt="" src="/tumblr_files/tumblr_inline_nf1y0xXwtM1qh5oee.jpg"/>

<h2 id="foreword">Foreword</h2>
<p>At my job, our current project has many bottle-necks, where Ruby really sucks on its performance. We were thinking on how to optimize them, and finally come to usage of Ruby Native API.</p>
<p>Our project uses Redis and MySQL hardly, so much of statistic data is stored in Redis. For speeding up. But one fine day made us use a <strong>reduce</strong> on a set of statistic data from Redis. And that’s where we got stuck on Ruby’ performance. Our server timed out in a minute of waiting for that reduce to complete.</p>
<!--more-->

<p>The trouble was in a loop like this:</p>
<pre><code class="language-ruby">json_data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>pase<span class="token punctuation">(</span>json_file<span class="token punctuation">)</span>
keys <span class="token operator">=</span> <span class="token variable">$redis</span><span class="token punctuation">.</span>keys <span class="token string-literal"><span class="token string">"*:hash_pattern:date:*"</span></span>
count<span class="token punctuation">,</span> total_count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span>

keys<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>hash_key<span class="token operator">|</span>
    elements <span class="token operator">=</span> <span class="token variable">$redis</span><span class="token punctuation">.</span>hgetall hash_key

    elements<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>key<span class="token punctuation">,</span> value<span class="token operator">|</span>
        i_value <span class="token operator">=</span> value<span class="token punctuation">.</span>to_i

        count <span class="token operator">+=</span> i_value <span class="token keyword">if</span> key <span class="token operator">=~</span> <span class="token operator">/</span>some<span class="token symbol">:regex</span><span class="token operator">/</span> <span class="token keyword">and</span> json_data<span class="token punctuation">.</span>has_key<span class="token operator">?</span> key
        total_count <span class="token operator">+=</span> i_value
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>My first attempt was implemented on a D language. But when I tried to use the compiled code library with Ruby, I failed. That’s why I thought <em>I feel more comfortable with C/C++ than with D</em>. And wrote the same code on C/C++. I took three third-party libraries:</p>
<ul>
<li><code>RE2</code> for regular expressions</li>
<li><code>hiredis</code> for Redis operations</li>
<li><code>rapidjson</code> for JSON parsing</li>
</ul>
<p>But when I compiled and ran what I’ve done, I could not believe my eyes - the process worked for <strong>59 seconds</strong>!
That was more than <strong>ten times</strong> slower than Ruby version!</p>
<p>So, I started optimizing for speed.</p>
<LazyImg alt="" src="/tumblr_files/tumblr_inline_nf1xzoyiAa1qh5oee.webp"/>

<!--more-->

<p>First of all, I dropped regular expressions as they were simply replaced by substring check and substring extraction (as the first part of a string in a regular expression had a fixed length). That did the trick, lowering the execution time to <strong>25 seconds</strong>. Yet, it was too much.</p>
<p>The last step I took, I removed hiredis and replaced it with a set of five custom functions, performing only those operations, which we needed via sockets. First, that failed with a really, REALLY long segfault. Yet, when I replaced the host string from <em>&ldquo;localhost&rdquo;</em> to <em>&ldquo;127.0.0.1&rdquo;</em>, my tiny extension arose and did its job in <strong>4.8 seconds</strong>.</p>
<p>That was great! Yet, it is not the best time I can get, let’s take a look on what was done and in which manner.</p>
<h2 id="creating-native-extensions-for-ruby">Creating native extensions for Ruby</h2>
<p>Creating a native extension will need you to have compiled <strong>shared object</strong> file. Shared object is a library for POSIX OSes.
There are two kinds of library formats for Linux and others:</p>
<ul>
<li><strong>shared libraries</strong> (<code>*.so</code> files) - could be placed anywhere and used in a runtime by a few applications</li>
<li><strong>static libraries</strong> (<code>*.a</code> files) - are bundled to a compile target (library, executable…) and are used in that environment</li>
</ul>
<p>For that purpose you’d better use <strong>C/C++ Ruby API</strong>.
Yes, you <em>could</em> use other-language-compiled shared libraries, but through an interface called <strong>FFI</strong>,
which I did not manage to work for me. Thus, this article covers only the C/C++ way.</p>
<p>To make your extension available in Ruby, you will need to define some of these:</p>
<ul>
<li>method for existing classes and modules</li>
<li>new class or module</li>
</ul>
<p>All of them are not hard to implement. We will make our own module and define its method.</p>
<p>First, create a directory names as your extension will be named. Let’s say, <code>my_ext</code>. Create two files there - <code>my_ext.cpp</code> and <code>extconf.rb</code>.
First file will define an extension shared library, whilst the second one will create <code>Makefile</code> for us.</p>
<p>Our extension will have a very simple source file with just one non-standard include and two functions defined:</p>
<pre><code class="language-c"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"ruby.h"</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>

VALUE <span class="token function">moo_method</span><span class="token punctuation">(</span>VALUE _name<span class="token punctuation">,</span> VALUE _age<span class="token punctuation">,</span> VALUE _self<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token operator">*</span> name <span class="token operator">=</span> <span class="token function">StringValueCStr</span><span class="token punctuation">(</span>_name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token function">num2uint</span><span class="token punctuation">(</span>_age<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">char</span><span class="token operator">*</span> result <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">malloc</span><span class="token punctuation">(</span><span class="token number">255</span> <span class="token operator">*</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token keyword">char</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sprintf</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token string">"Hello, my name is %s and I am %d years old!\n"</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token function">rb_str_new2</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">extern</span> <span class="token string">"C"</span>

<span class="token keyword">void</span> <span class="token function">Init_my_ext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  VALUE MyModule <span class="token operator">=</span> <span class="token function">rb_define_module</span><span class="token punctuation">(</span><span class="token string">"MyModule"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">rb_define_module_function</span><span class="token punctuation">(</span>MyModule<span class="token punctuation">,</span> <span class="token string">"moo"</span><span class="token punctuation">,</span> <span class="token function">reinterpret_cast</span><span class="token punctuation">(</span>moo<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Now let’s look at this source. There is only one exported function, <code>Init_my_ext</code>. That’s correct, because all our extension needs to do is to define something. And that is done in that method. The function <code>Init_my_ext</code> should have such name format: <code>Init_$extension_name$</code>. That’s how Ruby finds out what to call first.</p>
<p>Now, there are many of those <code>VALUE</code> type instances. That is internal type of Ruby Native API. That is the variant type, holding Ruby’ value. And whilst Ruby is not strongly typed language, that type could contain anything - from <code>nil</code> to <code>string</code> and even <code>object</code>. There are a few really useful functions defined in <code>ruby.h</code> to help you checking variables for types and converting them to C++ types.</p>
<p>Then we define a module named <code>MyModule</code> and stored its reference in the <code>MyModule</code> variable. Then we can do what we want with that module - define classes, variables and methods. Let’s see how we defined a method. Function <code>rb_define_module_function</code> contains four arguments:</p>
<ul>
<li><strong>reference to a module</strong></li>
<li><strong>method name</strong></li>
<li><strong>pointer to a C function, representing method internals</strong> - note the <code>reinterpret_cast</code></li>
<li><strong>argument count</strong> - when this number is less than zero, than method will receive three arguments - <code>int argc</code>, <code>VALUE* argv</code> and <code>VALUE self</code>, representing variable amount of arguments; if this number is greater than zero - it defines the amount of required method arguments</li>
</ul>
<p>Now, lets create a <code>extconf.rb</code> file, which will create <code>Makefile</code> for final library compilation:</p>
<pre><code class="language-ruby"><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'mkmf'</span></span>

extension_name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'my_ext'</span></span>

<span class="token keyword">def</span> <span class="token method-definition"><span class="token function">get_dir</span></span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token builtin">File</span><span class="token punctuation">.</span>expand_path<span class="token punctuation">(</span><span class="token builtin">File</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token builtin">File</span><span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>__FILE__<span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>

<span class="token constant">LIBDIR</span>     <span class="token operator">=</span> RbConfig<span class="token double-colon punctuation">::</span><span class="token constant">CONFIG</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'libdir'</span></span><span class="token punctuation">]</span>
<span class="token constant">INCLUDEDIR</span> <span class="token operator">=</span> RbConfig<span class="token double-colon punctuation">::</span><span class="token constant">CONFIG</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'includedir'</span></span><span class="token punctuation">]</span>

<span class="token constant">HEADER_DIRS</span> <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token constant">INCLUDEDIR</span> <span class="token punctuation">]</span>

<span class="token comment"># setup constant that is equal to that of the file path that holds that static libraries that will need to be compiled against</span>
<span class="token constant">LIB_DIRS</span> <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token constant">LIBDIR</span> <span class="token punctuation">]</span>

libs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment"># The destination</span>
dir_config<span class="token punctuation">(</span>extension_name<span class="token punctuation">,</span> <span class="token constant">HEADER_DIRS</span><span class="token punctuation">,</span> <span class="token constant">LIB_DIRS</span><span class="token punctuation">)</span>

libs<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>lib<span class="token operator">|</span>
    <span class="token variable">$LOCAL_LIBS</span> <span class="token operator">&lt;&lt;</span> <span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">lib</span><span class="token delimiter punctuation">}</span></span><span class="token string"> "</span></span>
<span class="token keyword">end</span>

<span class="token comment"># Additional compiler / linker flags</span>
<span class="token comment"># $CFLAGS &lt;&lt; " -fPIC "</span>
<span class="token comment"># $LDFLAGS &lt;&lt; " -lpthread "</span>

<span class="token comment"># Do the work</span>
create_makefile<span class="token punctuation">(</span>extension_name<span class="token punctuation">)</span>
</code></pre>
<p>That’s it, it defines parameters for our future <code>Makefile</code>. Note the <code>get_dir(name)</code> method - I’ve defined it for you to simplify adding library sub-directories to the <code>LIBDIR</code> and <code>INCLUDEDIR</code> arrays, just like this:</p>
<pre><code class="language-ruby"><span class="token constant">LIB_DIRS</span> <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token constant">LIBDIR</span><span class="token punctuation">,</span> get_dir<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'hiredis'</span></span><span class="token punctuation">)</span> <span class="token punctuation">]</span>
</code></pre>
<p>Also, note the <code>-fPIC</code> option - it is needed for most libraries to compile under different architectures. So, you may need to add them to your third-party libraries’ Makefiles to resolve corresponding compiler errors when building the extension.</p>
<p>When you are done, let’s generate Makefile:</p>
<pre><code class="language-ruby">ruby extconf<span class="token punctuation">.</span>rb
</code></pre>
<p>Then, you should be able to build your shared object with</p>
<pre><code class="language-bash">$ <span class="token function">make</span>
</code></pre>
<p>Using our extension is simple when playing around locally - you just add it to your <code>irb</code> or <code>ruby</code> command-line arguments like this:</p>
<pre><code class="language-bash">$ irb -r ./my_ext.so
</code></pre>
<p>And then just using the modules you’ve defined. But in most situations, that is impossible, as, for example, you are running a Rails application on a production server. So, you will probably want a RubyGem for that purpose.</p>
<h2 id="wrapping-extension-in-a-gem">Wrapping extension in a Gem</h2>
<p>Building a Ruby Gem containing native extension is a little different than building usual gems. You here have two options:</p>
<ul>
<li>bundle a pre-built library with a gem</li>
<li>provide a sources to perform build on a target machine</li>
</ul>
<p>First way is for dummies. That’s it, you will probably want your code ran on different platforms than your own machine. So, you will not want your gem to fail with a segfault like <em>this architecture differs from what the library was built on</em>. Thus, we will concentrate on a second way.</p>
<LazyImg alt="" src="/tumblr_files/tumblr_inline_nf1y1oTQRp1qh5oee.webp"/>

<p>First, we will need a correct directory structure:</p>
<pre><code>.
├── ext
│   └── my_gemname
│       ├── extconf.rb
│       └── my_ext.cpp
├── lib
│   └── my_gemname.rb
└── my_gemname.gemspec
</code></pre>
<p>File <code>lib/my_gemname.rb</code> will contain only the extension initialization call:</p>
<pre><code class="language-ruby"><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'my_gemname/my_ext'</span></span>
</code></pre>
<p>Whilst the main difference hides in gemspec file:</p>
<pre><code class="language-ruby">Gem<span class="token double-colon punctuation">::</span><span class="token class-name">Specification</span><span class="token punctuation">.</span><span class="token keyword">new</span> <span class="token keyword">do</span> <span class="token operator">|</span>spec<span class="token operator">|</span>
  spec<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'my_gemname'</span></span>
  spec<span class="token punctuation">.</span>version <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'0.1'</span></span>
  spec<span class="token punctuation">.</span>description <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'Some cool description here'</span></span>
  spec<span class="token punctuation">.</span>summary <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'Short description'</span></span>
  spec<span class="token punctuation">.</span>email <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'author@email.com'</span></span>
  spec<span class="token punctuation">.</span>homepage <span class="token operator">=</span> <span class="token string-literal"><span class="token string">''</span></span>
  spec<span class="token punctuation">.</span>author <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'Author Name'</span></span>
  spec<span class="token punctuation">.</span>files <span class="token operator">=</span> <span class="token builtin">Dir</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'lib/**/*.rb'</span></span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token builtin">Dir</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'ext/**/*'</span></span><span class="token punctuation">]</span>
  spec<span class="token punctuation">.</span>platform <span class="token operator">=</span> Gem<span class="token double-colon punctuation">::</span>Platform<span class="token double-colon punctuation">::</span><span class="token constant">RUBY</span>
  spec<span class="token punctuation">.</span>require_paths <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token string-literal"><span class="token string">'lib'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'ext'</span></span> <span class="token punctuation">]</span>
  spec<span class="token punctuation">.</span>extensions <span class="token operator">=</span> <span class="token builtin">Dir</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'ext/my_gemname/extconf.rb'</span></span><span class="token punctuation">]</span>
<span class="token keyword">end</span>
</code></pre>
<p>Here four lines make the magick:</p>
<pre><code class="language-ruby">  spec<span class="token punctuation">.</span>files <span class="token operator">=</span> <span class="token builtin">Dir</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'lib/**/*.rb'</span></span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token builtin">Dir</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'ext/**/*'</span></span><span class="token punctuation">]</span>
  spec<span class="token punctuation">.</span>platform <span class="token operator">=</span> Gem<span class="token double-colon punctuation">::</span>Platform<span class="token double-colon punctuation">::</span><span class="token constant">RUBY</span>
  spec<span class="token punctuation">.</span>require_paths <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token string-literal"><span class="token string">'lib'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'ext'</span></span> <span class="token punctuation">]</span>
  spec<span class="token punctuation">.</span>extensions <span class="token operator">=</span> <span class="token builtin">Dir</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'ext/my_gemname/extconf.rb'</span></span><span class="token punctuation">]</span>
</code></pre>
<p>They set, respectively:</p>
<ul>
<li>directories of the extension with all the files and sub-directories, needed to compile it</li>
<li>universal target platform</li>
<li>extension required path</li>
<li>path to the extension’ extconf file</li>
</ul>
<p>Now you can build your gem with</p>
<pre><code class="language-bash">$ gem build my_gemname.gemspec
</code></pre>
<p>Using the gemfile may require you never to push it to RubyGems repository. For example, when your gem is a very specific for the project you are working on, or it may conflict with your job contract. But you can’t simply specify the <code>path</code> attribute for your gem in the <code>Gemfile</code> - it just does not work!</p>
<p>Way to solve this lays beyound using custom repository. My solution was to create a directory under <code>lib/</code> sub-directory of our project:</p>
<pre><code>repository
└── gems
    └── my_gemname-0.1.gem
</code></pre>
<p>Then, go to the <code>repository</code> directory (that’s important NOT to go to the <code>gems</code> subdir) and run this magic command:</p>
<pre><code class="language-bash">$ gem generate_index
</code></pre>
<p>This will make your repository directory look like this:</p>
<pre><code>repository
├── gems
│   └── my_gemname-0.1.gem
├── latest_specs.4.8
├── latest_specs.4.8.gz
├── prerelease_specs.4.8
├── prerelease_specs.4.8.gz
├── quick
│   └── Marshal.4.8
│       └── my_gemname-0.1.gemspec.rz
├── specs.4.8
└── specs.4.8.gz
</code></pre>
<p>This directory now could be used as a RubyGems repository. Just like the <strong>rubygems.org</strong>! Just point your <strong>Gemfile</strong> to this directory:</p>
<pre><code class="language-ruby">source <span class="token builtin">File</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'file://'</span></span><span class="token punctuation">,</span> <span class="token builtin">File</span><span class="token punctuation">.</span>dirname<span class="token punctuation">(</span>__FILE__<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'lib'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'repository'</span></span><span class="token punctuation">)</span>
</code></pre>
<p>And an <strong>important note</strong>: keep your <code>Gemfile</code> and <code>Gemfile.lock</code> up-to date - use only <code>= latest.version</code> in the <code>Gemfile</code> when running with your native extension gem!</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>