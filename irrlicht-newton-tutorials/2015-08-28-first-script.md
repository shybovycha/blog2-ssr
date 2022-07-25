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

    <main class="svelte-1gr3n62"><article><h1>Irrlicht Newton GD tutorial: first script</h1>

    <time>28 Aug 2015 at 17:10</time>

    <div class="content"><p>As we discussed, we will describe the whole game in scripts, and the core functionality
we will define in the core. In this chapter we will be adding <strong>Lua</strong> to our application.
You do not need to download Lua itself - you’d better install it with your system’s
package manager <em>(<code>yum</code> or <code>apt</code> or whatever your Linux uses, <code>brew</code> for OSX…)</em>.</p>
<h2 id="dependencies">Dependencies</h2>
<p>The only thing you need to download from Internet this time is Lua wrapper called
<strong>luacppinterface</strong>.
So <a href="https://github.com/davidsiaw/luacppinterface/archive/master.zip"><strong>go and get it</strong></a> from
Github.</p>
<p>And unpack it… right to the <code>source</code> directory of our project! That’s right! That’s
really small library so it will not pollute your project with tons of files.</p>
<p>Now, I mentioned dependency managers earlier. This is how <em>we</em> will handle them in our <em>C++</em>
application - we will simply put the sources of all the libraries we depend on, with the
versions we depend on, right in our project. Given that, you may put Irrlicht there as well -
you are free to do anything with our project!</p>
<!--more-->

<h2 id="build-instructions">Build instructions</h2>
<p>To build our project we will need to change our <code>CMakeLists.txt</code> file to fetch
our new dependency:</p>
<pre><code class="language-cmake"><span class="token keyword">cmake_minimum_required</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">3.1</span><span class="token punctuation">)</span>
<span class="token keyword">project</span><span class="token punctuation">(</span>irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">CMAKE_CXX_FLAGS</span><span class="token punctuation">}</span></span> -std=c++11"</span><span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>SOURCE_FILES source/main.cpp<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>EXECUTABLE_NAME irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>LUACPPINTERFACE_PATH source/luacppinterface-master<span class="token punctuation">)</span>

<span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>LUACPPINTERFACE_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">find_package</span><span class="token punctuation">(</span>X11<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>OpenGL<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>ZLIB<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>Lua<span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">NOT</span> IRRLICHT_LIBRARY_PATH<span class="token punctuation">)</span>
    <span class="token keyword">find_library</span><span class="token punctuation">(</span>IRRLICHT_LIBRARY_PATH
            NAMES Irrlicht
            PATHS <span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/lib/
            PATH_SUFFIXES Linux MacOSX Win32-gcc Win32-visualstudio Win64-visualstudio<span class="token punctuation">)</span>

    <span class="token keyword">message</span><span class="token punctuation">(</span>STATUS <span class="token string">"Found Irrlicht: <span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">IRRLICHT_LIBRARY_PATH</span><span class="token punctuation">}</span></span>"</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/include <span class="token punctuation">${</span>LUA_INCLUDE_DIR<span class="token punctuation">}</span> <span class="token punctuation">${</span>LUACPPINTERFACE_PATH<span class="token punctuation">}</span>/include<span class="token punctuation">)</span>

<span class="token keyword">add_executable</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span> <span class="token punctuation">${</span>SOURCE_FILES<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span>
        luacppinterface
        <span class="token punctuation">${</span>IRRLICHT_LIBRARY_PATH<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>X11_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>OPENGL_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>ZLIB_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>X11_Xxf86vm_LIB<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>LUA_LIBRARIES<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>And here’s the thing: if you try to compile our project on another machine, you will
not need to install any other libraries than Lua on that machine! That supposed to sound
like <em>“sweet, huh?”</em>, except that one little <em>“but…”</em>… Bittersweet…</p>
<p>Back to our busines… <code>luacppinterface</code> needs to be tweaked a bit to fit our project -
we will hack its <code>CMakeLists.txt</code> file to make it depend on system Lua libraries.
Just make it look like this:</p>
<pre><code class="language-cmake"><span class="token keyword">cmake_minimum_required</span> <span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">2.6</span><span class="token punctuation">)</span>

<span class="token keyword">project</span><span class="token punctuation">(</span>luacppinterface<span class="token punctuation">)</span>

<span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token string">"lua/src"</span><span class="token punctuation">)</span>

<span class="token keyword">find_package</span><span class="token punctuation">(</span>Lua<span class="token punctuation">)</span>

<span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token punctuation">${</span>LUA_INCLUDE_DIR<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">add_library</span><span class="token punctuation">(</span>luacppinterface <span class="token namespace">STATIC</span>
    include/luacoroutine.cpp
    include/luareference.cpp
    include/luacppinterface.cpp
    include/luatable.cpp
    include/luafunction.cpp
<span class="token punctuation">)</span>

<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span>luacppinterface <span class="token punctuation">${</span>LUA_LIBRARIES<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>It barely differs from the original file, but it makes a compilation pleasant - you
do not need to specify paths to Lua libs anymore!</p>
<h2 id="injecting-some-lua">Injecting some Lua</h2>
<p>Our application now uses C++ code to place some 3D objects in a scene. Let’s move,
say, sphere creation, to the script.</p>
<p>First of all, add <code>luacppinterface</code> headers to our <code>main.cpp</code> file:</p>
<pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"luacppinterface-master/include/luacppinterface.h"</span></span>
</code></pre>
<p>Now let’s look at some of Irrlicht’ conventions:</p>
<ul>
<li>it uses <code>irr::video::IVideoDriver</code> for rendering operations</li>
<li>it uses <code>irr::scene::ISceneManager</code> for scene management</li>
</ul>
<p>So why not to define a <code>ScriptManager</code> to handle scripts? Our requirements
for this class (for now) are:</p>
<ul>
<li>it should load and evaluate scripts</li>
<li>it should provide simple API to our scripts</li>
</ul>
<p>Let’s get coding!</p>
<pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">ScriptManager</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    Lua luaState<span class="token punctuation">;</span>
    std<span class="token double-colon punctuation">::</span>map<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>string<span class="token punctuation">,</span> scene<span class="token double-colon punctuation">::</span>ISceneNode<span class="token operator">*</span><span class="token operator">></span> nodes<span class="token punctuation">;</span>
    video<span class="token double-colon punctuation">::</span>IVideoDriver <span class="token operator">*</span>driver<span class="token punctuation">;</span>
    scene<span class="token double-colon punctuation">::</span>ISceneManager <span class="token operator">*</span>smgr<span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">bindFunctions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">ScriptManager</span><span class="token punctuation">(</span>scene<span class="token double-colon punctuation">::</span>ISceneManager <span class="token operator">*</span>_smgr<span class="token punctuation">,</span> video<span class="token double-colon punctuation">::</span>IVideoDriver <span class="token operator">*</span>_driver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        driver <span class="token operator">=</span> _driver<span class="token punctuation">;</span>
        smgr <span class="token operator">=</span> _smgr<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">createSphereNode</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string textureFile<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">setNodePosition</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> LuaTable pos<span class="token punctuation">)</span><span class="token punctuation">;</span>

    LuaTable <span class="token function">getNodePosition</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string filename<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>ifstream <span class="token function">inf</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        std<span class="token double-colon punctuation">::</span>string <span class="token function">code</span><span class="token punctuation">(</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">istreambuf_iterator</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>inf<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">istreambuf_iterator</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">bindFunctions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        luaState<span class="token punctuation">.</span><span class="token function">RunScript</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>This is just a skeleton - we will fill it out in a minute. Just catching up:</p>
<ol>
<li>this class depends on <code>IVideoDriver</code> and <code>ISceneManager</code> to handle 3D objects and the scene</li>
<li>it contains <code>Lua luaState</code> field to store the current state of our script running</li>
<li>it stores all the nodes as a <code>&lt;string, ISceneNode*&gt;</code> map to allow access to our nodes from scripts</li>
<li>it exposes three methods as an API to Lua scripts: <code>createSphereNode</code>, <code>setNodePosition</code> and
  <code>getNodePosition</code> so we will be able to make some manipulations in our scripts</li>
<li>it provides really short and simple interface to our C++ core: <code>ScriptManager(...)</code> and <code>loadScript</code></li>
</ol>
<p>The main principle, each and every programmer breaks every day is <strong>KISS</strong> <em>(Keep It Stupidly Simple)</em>.
And that principle should guide us through this whole tutorial to not overthink and override
ourselves as well as the project we are making. That is why our APIs are that simple.</p>
<p>But let’s get back to our <code>ScriptManager</code>. It shows how things will look like, but never
defines how they will actually <strong>work</strong>. So here are the key points to Lua API:</p>
<ol>
<li><p><code>LuaTable</code> is an array-like structure in Lua, representing both indexed as well as key-value
 arrays in Lua. This type is a way to pass variables between Lua script and C++ program. You
 may use both <code>table.Get&lt;value_type&gt;(index)</code> and <code>table.Get&lt;value_type&gt;(&quot;key&quot;)</code> methods
 to access its values.</p>
</li>
<li><p>To bind our <code>ScriptManager</code> methods to Lua functions, we need to use pointers to those
 functions. And as it is not that simple in usual C++, we will use C++11x lambdas:</p>
<pre><code class="language-cpp"><span class="token keyword">auto</span> createSphere <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">CreateFunction</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>string<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>string<span class="token punctuation">)</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">&amp;</span><span class="token punctuation">]</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span>string tex<span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">void</span> <span class="token punctuation">{</span> <span class="token function">createSphereNode</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> tex<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li><p>All the functions and variables you want to pass to Lua scripts should be global. And since
 we have our pretty <code>luaState</code> member, we may set global members through its methods:</p>
<pre><code class="language-cpp">LuaTable global <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

global<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"createSphere"</span><span class="token punctuation">,</span> createSphere<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li><p>We will be using just a map of a Irrlicht’ nodes and its name to bypass those nodes between
 scripts and core:</p>
<pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">createSphereNode</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string textureFile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node <span class="token operator">=</span> smgr<span class="token operator">-></span><span class="token function">addSphereSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token operator">-></span><span class="token function">setPosition</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      node<span class="token operator">-></span><span class="token function">setMaterialTexture</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> driver<span class="token operator">-></span><span class="token function">getTexture</span><span class="token punctuation">(</span>textureFile<span class="token punctuation">.</span><span class="token function">c_str</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      node<span class="token operator">-></span><span class="token function">setMaterialFlag</span><span class="token punctuation">(</span>video<span class="token double-colon punctuation">::</span>EMF_LIGHTING<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  nodes<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">setNodePosition</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> LuaTable pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">float</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">;</span>

      x <span class="token operator">=</span> pos<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">"x"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      y <span class="token operator">=</span> pos<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">"y"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      z <span class="token operator">=</span> pos<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">"z"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      nodes<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token operator">-></span><span class="token function">setPosition</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  LuaTable <span class="token function">getNodePosition</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      LuaTable pos <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">CreateTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      core<span class="token double-colon punctuation">::</span>vector3df v <span class="token operator">=</span> nodes<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      pos<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"x"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>X<span class="token punctuation">)</span><span class="token punctuation">;</span>
      pos<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"y"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
      pos<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"z"</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span>Z<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">return</span> pos<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre>
</li>
</ol>
<p>Given those, we have our API and are able to create and run our first Lua script.
Add one in the <code>media/scripts/</code> directory:</p>
<pre><code class="language-lua"><span class="token function">createSphere</span><span class="token punctuation">(</span><span class="token string">"sphere1"</span><span class="token punctuation">,</span> <span class="token string">"media/textures/wall.webp"</span><span class="token punctuation">)</span>
</code></pre>
<p><strong>Note:</strong> paths in the script will be used by C++ core, relatively to the binary file, which
is… generated by our C++ code! So all the paths in the scripts are just the same as they
are in C++ core.</p>
<p>And add the <code>ScriptManager</code> initialization code:</p>
<pre><code class="language-cpp">ScriptManager <span class="token operator">*</span>scriptMgr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">ScriptManager</span><span class="token punctuation">(</span>smgr<span class="token punctuation">,</span> driver<span class="token punctuation">)</span><span class="token punctuation">;</span>

scriptMgr<span class="token operator">-></span><span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token string">"media/scripts/test1.lua"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now you may remove the code, creating sphere in the <code>main()</code> function. And run the code.
You should see exactly the same picture as before:</p>
<LazyImg src="/images/04_movement_untouched.webp" />

<h2 id="homework">Homework</h2>
<p>Your task is: try to move all the other “factory” functions <em>(creating cube, ninja,
circle animator for cube and fly animator for Ninja)</em> to Lua script, adding API for them
to <code>ScriptManager</code>.</p>
<h2 id="more-separation">More separation</h2>
<p>We will now advance our script and add some convention to it. These will be our tasks
for the rest of this chapter:</p>
<ol>
<li>move keyboard events handling to script</li>
<li>create two function in script so we may call them <em>by convention, not by configuration</em></li>
</ol>
<p>The last phrase I took from <strong>Ember.js introduction</strong>. It says <em>“prefer convention over
configuration”</em>, meaning we’d better call the functions of same name on different scripts,
instead of setting somehow which function to call.</p>
<p>That is, we will define <code>handleFrame()</code> function in our script, which will be called
on each <code>onFrame</code> event in our C++ core and the <code>main()</code> function, which will be called right
after script has been loaded.</p>
<pre><code class="language-cpp"><span class="token keyword">auto</span> handler <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span>LuaFunction<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span><span class="token string">"handleFrame"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

handler<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Moreover, we will define a global keyboard state table for each of scripts we load and will
be updating it as user presses keys on his keyboard. And this variable will be shared with
script, but as read-only one. So changes in that table will have no effect on the application
itself.</p>
<pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">ScriptManager</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    std<span class="token double-colon punctuation">::</span>map<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">bool</span><span class="token operator">></span> keyStates<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">setGlobalVariables</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setKeyStates</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">setKeyStates</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        LuaTable keysTable <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">CreateTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">auto</span> <span class="token operator">&amp;</span>kv <span class="token operator">:</span> keyStates<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            keysTable<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>kv<span class="token punctuation">.</span>first<span class="token punctuation">,</span> kv<span class="token punctuation">.</span>second<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"KEY_STATE"</span><span class="token punctuation">,</span> keysTable<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">setKeyState</span><span class="token punctuation">(</span><span class="token keyword">int</span> key<span class="token punctuation">,</span> <span class="token keyword">bool</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        keyStates<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> state<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">handleFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">auto</span> handler <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span>LuaFunction<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span><span class="token string">"handleFrame"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">setKeyStates</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        handler<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">loadScript</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string filename<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        std<span class="token double-colon punctuation">::</span>ifstream <span class="token function">inf</span><span class="token punctuation">(</span>filename<span class="token punctuation">)</span><span class="token punctuation">;</span>
        std<span class="token double-colon punctuation">::</span>string <span class="token function">code</span><span class="token punctuation">(</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">istreambuf_iterator</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>inf<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">istreambuf_iterator</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">bindFunctions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setGlobalVariables</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        luaState<span class="token punctuation">.</span><span class="token function">RunScript</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">auto</span> scriptMainFn <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span>LuaFunction<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span><span class="token string">"main"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        scriptMainFn<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MyEventReceiver</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IEventReceiver</span></span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">MyEventReceiver</span><span class="token punctuation">(</span>ScriptManager <span class="token operator">*</span>scriptManager<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        scriptMgr <span class="token operator">=</span> scriptManager<span class="token punctuation">;</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span>u32 i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> KEY_KEY_CODES_COUNT<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
            scriptMgr<span class="token operator">-></span><span class="token function">setKeyState</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// This is the one method that we have to implement</span>
    <span class="token keyword">virtual</span> <span class="token keyword">bool</span> <span class="token function">OnEvent</span><span class="token punctuation">(</span><span class="token keyword">const</span> SEvent <span class="token operator">&amp;</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Remember whether each key is down or up</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>EventType <span class="token operator">==</span> irr<span class="token double-colon punctuation">::</span>EET_KEY_INPUT_EVENT<span class="token punctuation">)</span>
            scriptMgr<span class="token operator">-></span><span class="token function">setKeyState</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>KeyInput<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> event<span class="token punctuation">.</span>KeyInput<span class="token punctuation">.</span>PressedDown<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    ScriptManager <span class="token operator">*</span>scriptMgr<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>Variables are added to a <code>GlobalEnvironment</code> just as function do:</p>
<pre><code class="language-cpp">luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"KEY_STATE"</span><span class="token punctuation">,</span> keysTable<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Lua-defined functions are found by their names and called with <code>Invoke(args)</code> method:</p>
<pre><code class="language-cpp"><span class="token keyword">auto</span> handler <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span>LuaFunction<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span><span class="token string">"handleFrame"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

handler<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Let’s add some simple interaction to our script now. I’ll help you a bit:</p>
<pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">moveNode</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> LuaTable pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token function">findNode</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    core<span class="token double-colon punctuation">::</span>vector3df vec <span class="token operator">=</span> <span class="token function">tableToVector3df</span><span class="token punctuation">(</span>pos<span class="token punctuation">)</span><span class="token punctuation">;</span>

    core<span class="token double-colon punctuation">::</span>matrix4 m<span class="token punctuation">;</span>

    core<span class="token double-colon punctuation">::</span>vector3df rot <span class="token operator">=</span> node<span class="token operator">-></span><span class="token function">getRotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    m<span class="token punctuation">.</span><span class="token function">setRotationDegrees</span><span class="token punctuation">(</span>rot<span class="token punctuation">)</span><span class="token punctuation">;</span>

    m<span class="token punctuation">.</span><span class="token function">transformVect</span><span class="token punctuation">(</span>vec<span class="token punctuation">)</span><span class="token punctuation">;</span>
    node<span class="token operator">-></span><span class="token function">setPosition</span><span class="token punctuation">(</span>node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> vec<span class="token punctuation">)</span><span class="token punctuation">;</span>
    node<span class="token operator">-></span><span class="token function">updateAbsolutePosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>This is how nodes could be moved relatively to their current position in Irrlicht.</p>
<p>And here’s how our Lua script may look like now:</p>
<pre><code class="language-lua"><span class="token keyword">function</span> <span class="token function">handleFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">-- w</span>
    <span class="token keyword">if</span> KEY_STATE<span class="token punctuation">[</span><span class="token number">0x57</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">true</span> <span class="token keyword">then</span>
        <span class="token function">move</span><span class="token punctuation">(</span><span class="token string">"sphere1"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token comment">-- s</span>
    <span class="token keyword">if</span> KEY_STATE<span class="token punctuation">[</span><span class="token number">0x53</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">true</span> <span class="token keyword">then</span>
        <span class="token function">move</span><span class="token punctuation">(</span><span class="token string">"sphere1"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>

<span class="token keyword">function</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">createSphere</span><span class="token punctuation">(</span><span class="token string">"sphere1"</span><span class="token punctuation">,</span> <span class="token string">"media/textures/wall.webp"</span><span class="token punctuation">)</span>
    <span class="token function">setPosition</span><span class="token punctuation">(</span><span class="token string">"sphere1"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">30</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token function">createCube</span><span class="token punctuation">(</span><span class="token string">"cube1"</span><span class="token punctuation">,</span> <span class="token string">"media/textures/t351sml.webp"</span><span class="token punctuation">)</span>
    <span class="token function">addCircleAnimator</span><span class="token punctuation">(</span><span class="token string">"cube1"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">30</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">20.0</span><span class="token punctuation">)</span>

    <span class="token function">createAnimatedMesh</span><span class="token punctuation">(</span><span class="token string">"ninja"</span><span class="token punctuation">,</span> <span class="token string">"media/models/ninja.b3d"</span><span class="token punctuation">,</span> <span class="token string">"media/textures/nskinbl.webp"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">)</span>
    <span class="token function">setRotation</span><span class="token punctuation">(</span><span class="token string">"ninja"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">90</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">setScale</span><span class="token punctuation">(</span><span class="token string">"ninja"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token function">addForwardAnimator</span><span class="token punctuation">(</span><span class="token string">"ninja"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">60</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> x <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">100</span><span class="token punctuation">,</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> z <span class="token operator">=</span> <span class="token number">60</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3500</span><span class="token punctuation">,</span> <span class="token keyword">true</span><span class="token punctuation">)</span>
<span class="token keyword">end</span>
</code></pre>
<p>If you run our application <em>now</em>, you should be able to control sphere with <kbd>w</kbd> and
<kbd>s</kbd> keys:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/lua_script_with_kbd_handling.webp" />

<p><a href="2015-08-29-prepare-to-add-some-newtonianity">Next chapter</a></p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>