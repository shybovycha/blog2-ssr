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

    <main class="svelte-1gr3n62"><article><h1>Irrlicht Newton GD tutorial: first application</h1>

    <time>27 Aug 2015 at 17:05</time>

    <div class="content"><h2 id="install-irrlicht">Install Irrlicht</h2>
<p>First of all, you will definetely need the Irrlicht engine, so
<a href="http://irrlicht.sourceforge.net/downloads/"><strong>go get it</strong></a>.</p>
<p>Then you will need to compile it. Compilation process depends on the operating system you use,
but it’s really similar on every one.</p>
<h3 id="linux">Linux</h3>
<p>Install these dependencies with your system’ package manager:
<code>libenet-dev libxxf86vm-dev zlib-dev cmake</code>.</p>
<p>Unzip Irrlicht, go to the directory you unpacked with the terminal and run the following:</p>
<pre><code class="language-bash"><span class="token builtin class-name">cd</span> source/Irrlicht
<span class="token function">make</span>
</code></pre>
<p>Belive it or not, but that’s all!</p>
<h3 id="windows">Windows</h3>
<p>Unzip Irrlicht, go to the directory you unpacked and open the VisualStudio project <em>(depending on
VisualStudio version, you might want to open a bit different file)</em> in <code>source/Irrlicht</code>:</p>
<pre><code>Irrlicht10.0.sln
Irrlicht11.0.sln
Irrlicht8.0.sln
Irrlicht9.0.sln
</code></pre>
<p>Build it with VisualStudio - and you are done!</p>
<h3 id="macos-x">MacOS X</h3>
<p>The steps are a bit complicated. And they require you to install <strong>XCode</strong> and
<strong>Command-Line Tools</strong> - those could be found either in  AppStore or on the Apple
website.</p>
<ul>
<li><p>First of all, you need to install a bunch of dependencies <em>(I use <code>brew</code> for this purpose)</em>:</p>
<pre><code class="language-bash">brew <span class="token function">install</span> tinyxml enet lua cmake
</code></pre>
</li>
<li><p>Get a list of all compilers available for your OSX version:</p>
<pre><code class="language-bash">xcodebuild -showBuildSettings <span class="token operator">|</span> <span class="token function">grep</span> DEFAULT_COMPILER
</code></pre>
<p>I got something like this:</p>
<pre><code class="language-bash">$ xcodebuild -showBuildSettings <span class="token operator">|</span> <span class="token function">grep</span> DEFAULT_COMPILER
  DEFAULT_COMPILER <span class="token operator">=</span> com.apple.compilers.llvm.clang.1_0
</code></pre>
</li>
<li><p>Now the build process:</p>
<pre><code class="language-bash"><span class="token builtin class-name">cd</span> source/Irrlicht/MacOSX
xcodebuild -project MacOSX.xcodeproj <span class="token assign-left variable">GCC_VERSION</span><span class="token operator">=</span>com.apple.compilers.llvm.clang.1_0
</code></pre>
</li>
<li><p>And the final step - copy the library to the <code>lib/MacOSX</code> directory:</p>
<pre><code class="language-bash"><span class="token function">cp</span> build/Release/libIrrlicht.a <span class="token punctuation">..</span>/<span class="token punctuation">..</span>/<span class="token punctuation">..</span>/lib/MacOSX
</code></pre>
</li>
</ul>
<p>Phew! That’s a damn bunch of commands, don’t you think?</p>
<!--more-->

<h3 id="common">Common</h3>
<p>By performing those steps, described above, you will end up with the compiled Irrlicht library file
within the <code>lib/</code> directory, depending on your platform:</p>
<pre><code>Linux/libIrrlicht.a
MacOSX/libIrrlicht.a
Win32-visualstudio/Irrlicht.lib
Win64-visualStudio/Irrlicht.lib
</code></pre>
<p>Now, create a blank project in your favorite IDE and proceed…</p>
<h2 id="application-itself">Application itself</h2>
<p>Our first application will show you Irrlicht basic features we will use later. They are:</p>
<ul>
<li><strong>mesh handling</strong> - loading, rendering, animating, etc.</li>
<li><strong>user input handling</strong> - reacting to keyboard and mouse events</li>
<li><strong>user interface (UI)</strong> - displaying some information within the application window</li>
</ul>
<p>The good start for that is standard example from Irrlicht pack, the <strong>04 - Movement</strong> one.
Let’s take a look over its code:</p>
<pre><code class="language-cpp"><span class="token comment">/** Example 004 Movement

This Tutorial shows how to move and animate SceneNodes. The
basic concept of SceneNodeAnimators is shown as well as manual
movement of nodes using the keyboard.  We'll demonstrate framerate
independent movement, which means moving by an amount dependent
on the duration of the last run of the Irrlicht loop.

Example 19.MouseAndJoystick shows how to handle those kinds of input.

As always, I include the header files, use the irr namespace,
and tell the linker to link with the .lib file.
*/</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">_MSC_VER</span></span>
<span class="token comment">// We'll also define this to stop MSVC complaining about sprintf().</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">_CRT_SECURE_NO_WARNINGS</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">pragma</span> <span class="token expression"><span class="token function">comment</span><span class="token punctuation">(</span>lib<span class="token punctuation">,</span> </span><span class="token string">"Irrlicht.lib"</span><span class="token expression"><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;irrlicht.h></span></span>

<span class="token keyword">using</span> <span class="token keyword">namespace</span> irr<span class="token punctuation">;</span>

<span class="token comment">/*
To receive events like mouse and keyboard input, or GUI events like "the OK
button has been clicked", we need an object which is derived from the
irr::IEventReceiver object. There is only one method to override:
irr::IEventReceiver::OnEvent(). This method will be called by the engine once
when an event happens. What we really want to know is whether a key is being
held down, and so we will remember the current state of each key.
*/</span>
<span class="token keyword">class</span> <span class="token class-name">MyEventReceiver</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IEventReceiver</span></span>
<span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// This is the one method that we have to implement</span>
    <span class="token keyword">virtual</span> <span class="token keyword">bool</span> <span class="token function">OnEvent</span><span class="token punctuation">(</span><span class="token keyword">const</span> SEvent<span class="token operator">&amp;</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Remember whether each key is down or up</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>EventType <span class="token operator">==</span> irr<span class="token double-colon punctuation">::</span>EET_KEY_INPUT_EVENT<span class="token punctuation">)</span>
            KeyIsDown<span class="token punctuation">[</span>event<span class="token punctuation">.</span>KeyInput<span class="token punctuation">.</span>Key<span class="token punctuation">]</span> <span class="token operator">=</span> event<span class="token punctuation">.</span>KeyInput<span class="token punctuation">.</span>PressedDown<span class="token punctuation">;</span>

        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// This is used to check whether a key is being held down</span>
    <span class="token keyword">virtual</span> <span class="token keyword">bool</span> <span class="token function">IsKeyDown</span><span class="token punctuation">(</span>EKEY_CODE keyCode<span class="token punctuation">)</span> <span class="token keyword">const</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> KeyIsDown<span class="token punctuation">[</span>keyCode<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">MyEventReceiver</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>u32 i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span>KEY_KEY_CODES_COUNT<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span>
            KeyIsDown<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token comment">// We use this array to store the current state of each key</span>
    <span class="token keyword">bool</span> KeyIsDown<span class="token punctuation">[</span>KEY_KEY_CODES_COUNT<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/*
The event receiver for keeping the pressed keys is ready, the actual responses
will be made inside the render loop, right before drawing the scene. So lets
just create an irr::IrrlichtDevice and the scene node we want to move. We also
create some other additional scene nodes, to show that there are also some
different possibilities to move and animate scene nodes.
*/</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// create device</span>
    MyEventReceiver receiver<span class="token punctuation">;</span>

    IrrlichtDevice<span class="token operator">*</span> device <span class="token operator">=</span> <span class="token function">createDevice</span><span class="token punctuation">(</span>video<span class="token double-colon punctuation">::</span>EDT_OPENGL<span class="token punctuation">,</span>
            core<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">dimension2d</span><span class="token generic class-name"><span class="token operator">&lt;</span>u32<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">640</span><span class="token punctuation">,</span> <span class="token number">480</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>device <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// could not create selected driver.</span>

    video<span class="token double-colon punctuation">::</span>IVideoDriver<span class="token operator">*</span> driver <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getVideoDriver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    scene<span class="token double-colon punctuation">::</span>ISceneManager<span class="token operator">*</span> smgr <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getSceneManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
    Create the node which will be moved with the WSAD keys. We create a
    sphere node, which is a built-in geometry primitive. We place the node
    at (0,0,30) and assign a texture to it to let it look a little bit more
    interesting. Because we have no dynamic lights in this scene we disable
    lighting for each model (otherwise the models would be black).
    */</span>
    scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span> node <span class="token operator">=</span> smgr<span class="token operator">-></span><span class="token function">addSphereSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        node<span class="token operator">-></span><span class="token function">setPosition</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token operator">-></span><span class="token function">setMaterialTexture</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> driver<span class="token operator">-></span><span class="token function">getTexture</span><span class="token punctuation">(</span><span class="token string">"../../media/wall.webp"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token operator">-></span><span class="token function">setMaterialFlag</span><span class="token punctuation">(</span>video<span class="token double-colon punctuation">::</span>EMF_LIGHTING<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
    Now we create another node, movable using a scene node animator. Scene
    node animators modify scene nodes and can be attached to any scene node
    like mesh scene nodes, billboards, lights and even camera scene nodes.
    Scene node animators are not only able to modify the position of a
    scene node, they can also animate the textures of an object for
    example. We create a cube scene node and attach a 'fly circle' scene
    node animator to it, letting this node fly around our sphere scene node.
    */</span>
    scene<span class="token double-colon punctuation">::</span>ISceneNode<span class="token operator">*</span> n <span class="token operator">=</span> smgr<span class="token operator">-></span><span class="token function">addCubeSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>n<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        n<span class="token operator">-></span><span class="token function">setMaterialTexture</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> driver<span class="token operator">-></span><span class="token function">getTexture</span><span class="token punctuation">(</span><span class="token string">"../../media/t351sml.webp"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        n<span class="token operator">-></span><span class="token function">setMaterialFlag</span><span class="token punctuation">(</span>video<span class="token double-colon punctuation">::</span>EMF_LIGHTING<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        scene<span class="token double-colon punctuation">::</span>ISceneNodeAnimator<span class="token operator">*</span> anim <span class="token operator">=</span>
            smgr<span class="token operator">-></span><span class="token function">createFlyCircleAnimator</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">20.0f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>anim<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            n<span class="token operator">-></span><span class="token function">addAnimator</span><span class="token punctuation">(</span>anim<span class="token punctuation">)</span><span class="token punctuation">;</span>
            anim<span class="token operator">-></span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
    The last scene node we add to show possibilities of scene node animators is
    a b3d model, which uses a 'fly straight' animator to run between to points.
    */</span>
    scene<span class="token double-colon punctuation">::</span>IAnimatedMeshSceneNode<span class="token operator">*</span> anms <span class="token operator">=</span>
        smgr<span class="token operator">-></span><span class="token function">addAnimatedMeshSceneNode</span><span class="token punctuation">(</span>smgr<span class="token operator">-></span><span class="token function">getMesh</span><span class="token punctuation">(</span><span class="token string">"../../media/ninja.b3d"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>anms<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        scene<span class="token double-colon punctuation">::</span>ISceneNodeAnimator<span class="token operator">*</span> anim <span class="token operator">=</span>
            smgr<span class="token operator">-></span><span class="token function">createFlyStraightAnimator</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">3500</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>anim<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            anms<span class="token operator">-></span><span class="token function">addAnimator</span><span class="token punctuation">(</span>anim<span class="token punctuation">)</span><span class="token punctuation">;</span>
            anim<span class="token operator">-></span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">/*
        To make the model look right we disable lighting, set the
        frames between which the animation should loop, rotate the
        model around 180 degrees, and adjust the animation speed and
        the texture. To set the right animation (frames and speed), we
        would also be able to just call
        "anms->setMD2Animation(scene::EMAT_RUN)" for the 'run'
        animation instead of "setFrameLoop" and "setAnimationSpeed",
        but this only works with MD2 animations, and so you know how to
        start other animations. But a good advice is to not use
        hardcoded frame-numbers...
        */</span>
        anms<span class="token operator">-></span><span class="token function">setMaterialFlag</span><span class="token punctuation">(</span>video<span class="token double-colon punctuation">::</span>EMF_LIGHTING<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        anms<span class="token operator">-></span><span class="token function">setFrameLoop</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        anms<span class="token operator">-></span><span class="token function">setAnimationSpeed</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//      anms->setMD2Animation(scene::EMAT_RUN);</span>

        anms<span class="token operator">-></span><span class="token function">setScale</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token number">2.f</span><span class="token punctuation">,</span><span class="token number">2.f</span><span class="token punctuation">,</span><span class="token number">2.f</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        anms<span class="token operator">-></span><span class="token function">setRotation</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token operator">-</span><span class="token number">90</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//      anms->setMaterialTexture(0, driver->getTexture("../../media/sydney.webp"));</span>

    <span class="token punctuation">}</span>

    <span class="token comment">/*
    To be able to look at and move around in this scene, we create a first
    person shooter style camera and make the mouse cursor invisible.
    */</span>
    smgr<span class="token operator">-></span><span class="token function">addCameraSceneNodeFPS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    device<span class="token operator">-></span><span class="token function">getCursorControl</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">setVisible</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
    Add a colorful irrlicht logo
    */</span>
    device<span class="token operator">-></span><span class="token function">getGUIEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">addImage</span><span class="token punctuation">(</span>
        driver<span class="token operator">-></span><span class="token function">getTexture</span><span class="token punctuation">(</span><span class="token string">"../../media/irrlichtlogoalpha2.tga"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        core<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">position2d</span><span class="token generic class-name"><span class="token operator">&lt;</span>s32<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    gui<span class="token double-colon punctuation">::</span>IGUIStaticText<span class="token operator">*</span> diagnostics <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getGUIEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">addStaticText</span><span class="token punctuation">(</span>
        L<span class="token string">""</span><span class="token punctuation">,</span> core<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">rect</span><span class="token generic class-name"><span class="token operator">&lt;</span>s32<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    diagnostics<span class="token operator">-></span><span class="token function">setOverrideColor</span><span class="token punctuation">(</span>video<span class="token double-colon punctuation">::</span><span class="token function">SColor</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/*
    We have done everything, so lets draw it. We also write the current
    frames per second and the name of the driver to the caption of the
    window.
    */</span>
    <span class="token keyword">int</span> lastFPS <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">// In order to do framerate independent movement, we have to know</span>
    <span class="token comment">// how long it was since the last frame</span>
    u32 then <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// This is the movemen speed in units per second.</span>
    <span class="token keyword">const</span> f32 MOVEMENT_SPEED <span class="token operator">=</span> <span class="token number">5.f</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>device<span class="token operator">-></span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// Work out a frame delta time.</span>
        <span class="token keyword">const</span> u32 now <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> f32 frameDeltaTime <span class="token operator">=</span> <span class="token punctuation">(</span>f32<span class="token punctuation">)</span><span class="token punctuation">(</span>now <span class="token operator">-</span> then<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000.f</span><span class="token punctuation">;</span> <span class="token comment">// Time in seconds</span>
        then <span class="token operator">=</span> now<span class="token punctuation">;</span>

        <span class="token comment">/* Check if keys W, S, A or D are being held down, and move the
        sphere node around respectively. */</span>
        core<span class="token double-colon punctuation">::</span>vector3df nodePosition <span class="token operator">=</span> node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>receiver<span class="token punctuation">.</span><span class="token function">IsKeyDown</span><span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>KEY_KEY_W<span class="token punctuation">)</span><span class="token punctuation">)</span>
            nodePosition<span class="token punctuation">.</span>Y <span class="token operator">+=</span> MOVEMENT_SPEED <span class="token operator">*</span> frameDeltaTime<span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>receiver<span class="token punctuation">.</span><span class="token function">IsKeyDown</span><span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>KEY_KEY_S<span class="token punctuation">)</span><span class="token punctuation">)</span>
            nodePosition<span class="token punctuation">.</span>Y <span class="token operator">-=</span> MOVEMENT_SPEED <span class="token operator">*</span> frameDeltaTime<span class="token punctuation">;</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>receiver<span class="token punctuation">.</span><span class="token function">IsKeyDown</span><span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>KEY_KEY_A<span class="token punctuation">)</span><span class="token punctuation">)</span>
            nodePosition<span class="token punctuation">.</span>X <span class="token operator">-=</span> MOVEMENT_SPEED <span class="token operator">*</span> frameDeltaTime<span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>receiver<span class="token punctuation">.</span><span class="token function">IsKeyDown</span><span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>KEY_KEY_D<span class="token punctuation">)</span><span class="token punctuation">)</span>
            nodePosition<span class="token punctuation">.</span>X <span class="token operator">+=</span> MOVEMENT_SPEED <span class="token operator">*</span> frameDeltaTime<span class="token punctuation">;</span>

        node<span class="token operator">-></span><span class="token function">setPosition</span><span class="token punctuation">(</span>nodePosition<span class="token punctuation">)</span><span class="token punctuation">;</span>

        driver<span class="token operator">-></span><span class="token function">beginScene</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> video<span class="token double-colon punctuation">::</span><span class="token function">SColor</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span><span class="token number">113</span><span class="token punctuation">,</span><span class="token number">113</span><span class="token punctuation">,</span><span class="token number">133</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        smgr<span class="token operator">-></span><span class="token function">drawAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// draw the 3d scene</span>
        device<span class="token operator">-></span><span class="token function">getGUIEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">drawAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// draw the gui environment (the logo)</span>

        driver<span class="token operator">-></span><span class="token function">endScene</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> fps <span class="token operator">=</span> driver<span class="token operator">-></span><span class="token function">getFPS</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>lastFPS <span class="token operator">!=</span> fps<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            core<span class="token double-colon punctuation">::</span>stringw <span class="token function">tmp</span><span class="token punctuation">(</span>L<span class="token string">"Movement Example - Irrlicht Engine ["</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            tmp <span class="token operator">+=</span> driver<span class="token operator">-></span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            tmp <span class="token operator">+=</span> L<span class="token string">"] fps: "</span><span class="token punctuation">;</span>
            tmp <span class="token operator">+=</span> fps<span class="token punctuation">;</span>

            device<span class="token operator">-></span><span class="token function">setWindowCaption</span><span class="token punctuation">(</span>tmp<span class="token punctuation">.</span><span class="token function">c_str</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            lastFPS <span class="token operator">=</span> fps<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">/*
    In the end, delete the Irrlicht device.
    */</span>
    device<span class="token operator">-></span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/*
That's it. Compile and play around with the program.
**/</span>
</code></pre>
<h2 id="building-the-project">Building the project</h2>
<p>Paste the code from above to your blank project in your IDE, in the <code>source/main.cpp</code> file.
This may differ, but is not critical. Now, add the <code>CMakeLists.txt</code> file to your project
and fill it with these commands:</p>
<pre><code class="language-cmake"><span class="token keyword">cmake_minimum_required</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">3.1</span><span class="token punctuation">)</span>
<span class="token keyword">project</span><span class="token punctuation">(</span>irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">CMAKE_CXX_FLAGS</span><span class="token punctuation">}</span></span> -std=c++11"</span><span class="token punctuation">)</span>

<span class="token keyword">find_package</span><span class="token punctuation">(</span>X11<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>OpenGL<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>ZLIB<span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">NOT</span> IRRLICHT_LIBRARY_PATH<span class="token punctuation">)</span>
    <span class="token keyword">find_library</span><span class="token punctuation">(</span>IRRLICHT_LIBRARY_PATH
            NAMES Irrlicht
            PATHS <span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/lib/
            PATH_SUFFIXES Linux MacOSX Win32-gcc Win32-visualstudio Win64-visualstudio<span class="token punctuation">)</span>

    <span class="token keyword">message</span><span class="token punctuation">(</span>STATUS <span class="token string">"Found Irrlicht: <span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">IRRLICHT_LIBRARY_PATH</span><span class="token punctuation">}</span></span>"</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/include<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>SOURCE_FILES source/main.cpp<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>EXECUTABLE_NAME irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">add_executable</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span> <span class="token punctuation">${</span>SOURCE_FILES<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>IRRLICHT_LIBRARY_PATH<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>X11_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>OPENGL_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>ZLIB_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>X11_Xxf86vm_LIB<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p><strong>Note:</strong> for those of you, guys, running MacOS X I prepared a bit more complicated
<code>CMakeLists.txt</code> file - just to make our application run everywhere:</p>
<pre><code class="language-cmake"><span class="token keyword">cmake_minimum_required</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">3.1</span><span class="token punctuation">)</span>
<span class="token keyword">project</span><span class="token punctuation">(</span>irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">CMAKE_CXX_FLAGS</span><span class="token punctuation">}</span></span> -std=c++11"</span><span class="token punctuation">)</span>

<span class="token keyword">option</span><span class="token punctuation">(</span><span class="token string">"NEWTON_DEMOS_SANDBOX"</span> <span class="token string">"Build demos sandbox"</span> <span class="token boolean">OFF</span><span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>LUACPPINTERFACE_PATH source/luacppinterface-master<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>CPPFORMAT_PATH source/cppformat-master<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTONGD_PATH source/newton-dynamics-master<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTONGD_INCLUDE_DIRS
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dCustomJoints
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dContainers
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dMath<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTON_LIBRARIES Newton dMath<span class="token punctuation">)</span>

<span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>LUACPPINTERFACE_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>CPPFORMAT_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">find_package</span><span class="token punctuation">(</span>X11<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>OpenGL<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>ZLIB<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>Lua<span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">NOT</span> IRRLICHT_LIBRARY_PATH<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">UNIX</span><span class="token punctuation">)</span>
        <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX Linux<span class="token punctuation">)</span>
    <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">APPLE</span><span class="token punctuation">)</span>
        <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX MacOSX<span class="token punctuation">)</span>
    <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">WIN32</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">MSVC</span><span class="token punctuation">)</span>
            <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX Win32-visualstudio Win64-visualstudio<span class="token punctuation">)</span>
        <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">MINGW</span><span class="token punctuation">)</span>
            <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX Win32-gcc<span class="token punctuation">)</span>
        <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">find_library</span><span class="token punctuation">(</span>IRRLICHT_LIBRARY_PATH
            NAMES Irrlicht
            PATHS <span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/lib/
            PATH_SUFFIXES <span class="token punctuation">${</span>IRRLICHT_PATH_SUFFIX<span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">message</span><span class="token punctuation">(</span>STATUS <span class="token string">"Found Irrlicht: <span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">IRRLICHT_LIBRARY_PATH</span><span class="token punctuation">}</span></span>"</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>LIBRARIES luacppinterface
        cppformat
        <span class="token punctuation">${</span>NEWTON_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>IRRLICHT_LIBRARY_PATH<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>X11_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>OPENGL_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>ZLIB_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>LUA_LIBRARIES<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">NOT</span> <span class="token variable">APPLE</span><span class="token punctuation">)</span>
    <span class="token keyword">set</span><span class="token punctuation">(</span>LIBRARIES <span class="token punctuation">${</span>LIBRARIES<span class="token punctuation">}</span> <span class="token punctuation">${</span>X11_Xxf86vm_LIB<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/include
        <span class="token punctuation">${</span>LUA_INCLUDE_DIR<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>LUACPPINTERFACE_PATH<span class="token punctuation">}</span>/include
        <span class="token punctuation">${</span>CPPFORMAT_PATH<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>NEWTONGD_INCLUDE_DIRS<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>SOURCE_FILES source/main.cpp<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>EXECUTABLE_NAME irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">add_executable</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span> <span class="token punctuation">${</span>SOURCE_FILES<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">APPLE</span><span class="token punctuation">)</span>
    <span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">CMAKE_CXX_FLAGS</span><span class="token punctuation">}</span></span> -framework Foundation -framework OpenGL -framework Cocoa -framework Carbon -framework AppKit -framework IOKit"</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>LIBRARIES<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<h2 id="cmake-file">CMake file</h2>
<p>But what happens in all that code? First two lines of our <code>CMakeLists.txt</code> file define the project:</p>
<pre><code class="language-cmake"><span class="token keyword">cmake_minimum_required</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">3.1</span><span class="token punctuation">)</span>
<span class="token keyword">project</span><span class="token punctuation">(</span>irrlicht_newton_game1<span class="token punctuation">)</span>
</code></pre>
<p>Then we modify the variable <code>CMAKE_CXX_FLAGS</code>, which will be used to set compiler flags.
This is how we add items to lists or modify string variables with CMake: we set it the new
value, consisting of the old one and the new elements / parts:</p>
<pre><code class="language-cmake"><span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">CMAKE_CXX_FLAGS</span><span class="token punctuation">}</span></span> -std=c++11"</span><span class="token punctuation">)</span>
</code></pre>
<p>Then we tell CMake not to build <em>Newton demo sandbox</em> subproject and set a few path variables -
we will use them to point compiler to the header and library files of our third-party libraries
(like Newton itself, Irrlicht and others).</p>
<p><strong>Remember:</strong> these are only plain variables, they have no effect on compiler themselves.</p>
<pre><code class="language-cmake"><span class="token keyword">set</span><span class="token punctuation">(</span>LUACPPINTERFACE_PATH source/luacppinterface-master<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>CPPFORMAT_PATH source/cppformat-master<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTONGD_PATH source/newton-dynamics-master<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTONGD_INCLUDE_DIRS
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dCustomJoints
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dContainers
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dMath<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTON_LIBRARIES Newton dMath<span class="token punctuation">)</span>
</code></pre>
<p>Next, we point CMake to our sub-projects, which are by the fact our third-party libraries:</p>
<pre><code class="language-cmake"><span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>LUACPPINTERFACE_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>CPPFORMAT_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>These tell CMake to build sub-projects before building our application. Because our sub-projects
are nothing but libraries, we can then look for the built libraries, required by our project
in the sub-projects’ output directories like this:</p>
<pre><code class="language-cmake"><span class="token keyword">find_package</span><span class="token punctuation">(</span>Lua<span class="token punctuation">)</span>
</code></pre>
<p>Same way we look for system libraries:</p>
<pre><code class="language-cmake"><span class="token keyword">find_package</span><span class="token punctuation">(</span>X11<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>OpenGL<span class="token punctuation">)</span>
<span class="token keyword">find_package</span><span class="token punctuation">(</span>ZLIB<span class="token punctuation">)</span>
</code></pre>
<p>These commands set compile-ready variables like <code>X11_LIBRARIES</code>.</p>
<p>Some sub-projects may set CMake variables too, providing us with paths to include files or
library files. If Irrlicht did not do this, we try to find its paths with CMake:</p>
<pre><code class="language-cmake"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">NOT</span> IRRLICHT_LIBRARY_PATH<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">UNIX</span><span class="token punctuation">)</span>
        <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX Linux<span class="token punctuation">)</span>
    <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">APPLE</span><span class="token punctuation">)</span>
        <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX MacOSX<span class="token punctuation">)</span>
    <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">WIN32</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">MSVC</span><span class="token punctuation">)</span>
            <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX Win32-visualstudio Win64-visualstudio<span class="token punctuation">)</span>
        <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">MINGW</span><span class="token punctuation">)</span>
            <span class="token keyword">set</span><span class="token punctuation">(</span>IRRLICHT_PATH_SUFFIX Win32-gcc<span class="token punctuation">)</span>
        <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">find_library</span><span class="token punctuation">(</span>IRRLICHT_LIBRARY_PATH
            NAMES Irrlicht
            PATHS <span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/lib/
            PATH_SUFFIXES <span class="token punctuation">${</span>IRRLICHT_PATH_SUFFIX<span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token keyword">message</span><span class="token punctuation">(</span>STATUS <span class="token string">"Found Irrlicht: <span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">IRRLICHT_LIBRARY_PATH</span><span class="token punctuation">}</span></span>"</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
<p>Note the environment variables CMake provides us with: <code>UNIX</code>, <code>APPLE</code>, <code>WIN32</code>, <code>MSVC</code>
and many others. They describe which operating system CMake was ran under and which
compiler it was told to use.</p>
<p>And the most important part of our <code>CMakeLists.txt</code> file:</p>
<pre><code class="language-cmake"><span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/include
        <span class="token punctuation">${</span>LUA_INCLUDE_DIR<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>LUACPPINTERFACE_PATH<span class="token punctuation">}</span>/include
        <span class="token punctuation">${</span>CPPFORMAT_PATH<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>NEWTONGD_INCLUDE_DIRS<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>SOURCE_FILES source/main.cpp<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>EXECUTABLE_NAME irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">add_executable</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span> <span class="token punctuation">${</span>SOURCE_FILES<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>This actually runs the <strong>compiler</strong> with the include directories, source files and
output file specified.</p>
<p>After that, we may run <strong>linker</strong> to link the intermediate object files, provided by
compiler, and end up with the application executable:</p>
<pre><code class="language-cmake"><span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>LIBRARIES<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>For OSX users there is a small hack, needed to build the application:</p>
<pre><code class="language-cmake"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">APPLE</span><span class="token punctuation">)</span>
    <span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">CMAKE_CXX_FLAGS</span><span class="token punctuation">}</span></span> -framework Foundation -framework OpenGL -framework Cocoa -framework Carbon -framework AppKit -framework IOKit"</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
<p><strong>Note the order the commands are specified in:</strong> having include path variables definitions
placed before sub-projects commands may be no harmful, but more <em>“effective”</em> commands,
like compiling sub-projects (<code>add_subdirectory</code>) depend on other CMake commands, so
be sure to keep the order sane and clean.</p>
<h2 id="running-the-build">Running the build</h2>
<p>Now that you are ready, run the following commands from your project directory
<strong>(you will need <code>cmake</code> to be installed in your system)</strong>:</p>
<pre><code class="language-bash"><span class="token function">mkdir</span> build
<span class="token builtin class-name">cd</span> build
cmake -DIRRLICHT_PATH<span class="token operator">=</span>path_to_directory_where_you_unpacked_irrlicht <span class="token punctuation">..</span>
<span class="token function">make</span>
</code></pre>
<p><strong>Warning:</strong> do not forget to replace <code>path_to_directory_where_you_unpacked_irrlicht</code> with
the actual path to the directory, where your Irrlicht files lay!</p>
<p>This will build our first Irrlicht application. Not obvious how handy it is right now,
but you will see the power of CMake in our later sessions.</p>
<p>Before you run the application, copy the whole <code>media</code> directory from the Irrlicht
dir to the parent dir of your project. You should end up with directory structure like this:</p>
<pre><code>.
└── irrlicht_newton_tutorials
    ├── irrlicht_newton_game1
    │   ├── build
    │   ├── CMakeLists.txt
    │   └── source
    │       └── main.cpp
    └── media
</code></pre>
<p><strong>Note:</strong> If you now just run the <code>irrlicht_newton_game1</code> binary on OSX, you will see
your application does not react to keyboard events. This is tricky, but you need
to pack your application as OSX application. This is easy, though: just create
a directory tree <code>mkdir -p irrlicht_newton_game1.app/Contents/MacOS/</code> and move
your binary file there:</p>
<pre><code>├── irrlicht_newton_game1.app
│   └── Contents
│       └── MacOS
│           └── irrlicht_newton_game1
</code></pre>
<p>Open <strong>Finder</strong> and run the application from there. On other operating systems run
the executable file in your <code>build</code> directory.</p>
<p>Buuuuut, since we have CMake, we may simplify this task because this is a part of
application build process. So we need to create a usual binary file, when we are
running Linux or Windows or create a directory structure with binary on its deepest
level, when running OSX. CMake allows to do it in a really easy way:</p>
<pre><code class="language-cmake"><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token variable">APPLE</span><span class="token punctuation">)</span>
    <span class="token keyword">add_executable</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span> <span class="token property">MACOSX_BUNDLE</span> <span class="token punctuation">${</span>SOURCE_FILES<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">else</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">add_executable</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span> <span class="token punctuation">${</span>SOURCE_FILES<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>
<p>You should see something like this:</p>
<LazyImg src="/images/04_movement_untouched.webp" />

<p>To end the process you may consider switching to a terminal and running</p>
<pre><code class="language-bash"><span class="token function">pkill</span> irrlicht_newton_game1
</code></pre>
<h2 id="understanding-the-code">Understanding the code</h2>
<p>Here are few simple things we could extract from application’ code and understand right from scratch:</p>
<ul>
<li><p>Each 3D model is a <em>scene node</em></p>
</li>
<li><p>Primitive scene nodes (such as <em>cube</em> or <em>sphere</em>) could be easily created with built-in functions:</p>
<pre><code class="language-cpp">scene<span class="token double-colon punctuation">::</span>ISceneNode<span class="token operator">*</span> node <span class="token operator">=</span> smgr<span class="token operator">-></span><span class="token function">addSphereSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
scene<span class="token double-colon punctuation">::</span>ISceneNode<span class="token operator">*</span> node <span class="token operator">=</span> smgr<span class="token operator">-></span><span class="token function">addCubeSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li><p>Animated 3D models (such as <em>character models</em>) could be loaded from file:</p>
<pre><code class="language-cpp">scene<span class="token double-colon punctuation">::</span>IAnimatedMeshSceneNode<span class="token operator">*</span> node <span class="token operator">=</span> smgr<span class="token operator">-></span><span class="token function">addAnimatedMeshSceneNode</span><span class="token punctuation">(</span>smgr<span class="token operator">-></span><span class="token function">getMesh</span><span class="token punctuation">(</span><span class="token string">"../../media/ninja.b3d"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>Hint:</strong> if mesh is animated, animation could be started with:</p>
<pre><code class="language-cpp">  node<span class="token operator">-></span><span class="token function">setFrameLoop</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">13</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  node<span class="token operator">-></span><span class="token function">setAnimationSpeed</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>Hint:</strong> animation could be stopped with setting its speed to zero:</p>
<pre><code class="language-cpp">node<span class="token operator">-></span><span class="token function">setAnimationSpeed</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li><p>Node could be described not only by its vertices and indices <em>(forming a set of triangles which are drawn
in 3D forming a model, called <strong>mesh</strong>)</em> but by its <strong>position</strong>, <strong>rotation</strong> and <strong>scale</strong></p>
<p>Those could be set with:</p>
<pre><code class="language-cpp">node<span class="token operator">-></span><span class="token function">setPosition</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> z<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
node<span class="token operator">-></span><span class="token function">setRotation</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span>x_angle<span class="token punctuation">,</span> y_angle<span class="token punctuation">,</span> z_angle<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
node<span class="token operator">-></span><span class="token function">setScale</span><span class="token punctuation">(</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span>width_factor<span class="token punctuation">,</span> height_factor<span class="token punctuation">,</span> depth_factor<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>Hint:</strong> rotation is a set of angles relatively to the corresponding axes, the node will be rotated
  around. E. g., <code>vector3df(45, 90, 0)</code> sets the rotation by <code>45 deg</code> around <code>X axis</code>, <code>90 deg</code> around <code>Y axis</code>
  and no rotation aroung <code>Z axis</code>. All those axes are relative to the node itself.</p>
<LazyImg src="/images/irrlicht-newton-tutorials/euler_angles.webp" />
</li>
<li><p>Graphics User Interface’ <em>(GUI)</em> widgets for information output are labels; they are created with
<strong>GUI Manager</strong>:</p>
<pre><code class="language-cpp">gui<span class="token double-colon punctuation">::</span>IGUIStaticText<span class="token operator">*</span> label <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getGUIEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">addStaticText</span><span class="token punctuation">(</span>L<span class="token string">""</span><span class="token punctuation">,</span> core<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">rect</span><span class="token generic class-name"><span class="token operator">&lt;</span>s32<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p><strong>Hint:</strong> its text could be set with:</p>
<pre><code class="language-cpp">label<span class="token operator">-></span><span class="token function">setText</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">wchar_t</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token string">"some text"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</li>
<li><p>User input is handled by an external <code>IEventReceiver</code> class object.</p>
<p>Its method,</p>
<pre><code class="language-cpp"><span class="token keyword">virtual</span> <span class="token keyword">bool</span> <span class="token function">OnEvent</span><span class="token punctuation">(</span><span class="token keyword">const</span> SEvent<span class="token operator">&amp;</span> event<span class="token punctuation">)</span>
</code></pre>
<p>defines the logic of handling events like <em>mouse events</em>, <em>keyboard events</em>, <em>joystick events</em>,
  <em>GUI events</em>, etc.</p>
<p>The type of event is passed with the <code>event.EventType</code> field. The corresponding field is filled
  with the event parameters.</p>
<p>For example:</p>
<pre><code class="language-cpp"><span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>type <span class="token operator">==</span> EET_MOUSE_INPUT_EVENT<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>MouseInput<span class="token punctuation">.</span><span class="token function">isLeftPressed</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"%d, %d is cursor position\n"</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>MouseInput<span class="token punctuation">.</span>X<span class="token punctuation">,</span> event<span class="token punctuation">.</span>mouseInput<span class="token punctuation">.</span>Y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p><strong>Hint:</strong> <code>EventReceiver</code> object has nothing in common with our main game loop. So we should create
  some interface, some architecture trick to link those two. Because they are strongly related!</p>
</li>
<li><p>Main game loop should contain <strong>rendering call</strong>, <strong>GUI rendering call</strong> and other game logic processing
calls.</p>
<p>The simplest main loop could look like this:</p>
<pre><code class="language-cpp"><span class="token keyword">while</span> <span class="token punctuation">(</span>device<span class="token operator">-></span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    driver<span class="token operator">-></span><span class="token function">beginScene</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> video<span class="token double-colon punctuation">::</span><span class="token function">SColor</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">,</span> <span class="token number">113</span><span class="token punctuation">,</span> <span class="token number">113</span><span class="token punctuation">,</span> <span class="token number">133</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    smgr<span class="token operator">-></span><span class="token function">drawAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// draw the 3d scene</span>
    device<span class="token operator">-></span><span class="token function">getGUIEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">drawAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// draw the gui</span>

    driver<span class="token operator">-></span><span class="token function">endScene</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</li>
<li><p>There is no simple <em>(or at least, built-in)</em> way to get the delta time between two rendered frames.
<strong>This is an important variable!</strong> We’ll need that later, when we inject physics engine. And Newton GD
is not the only engine requiring this variable!</p>
<p>But that could be easily done with this workaround:</p>
<pre><code class="language-cpp"><span class="token comment">// before main loop</span>
u32 then <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...</span>

<span class="token comment">// within the main game loop</span>
<span class="token keyword">const</span> u32 now <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> f32 frameDeltaTime <span class="token operator">=</span> <span class="token punctuation">(</span>f32<span class="token punctuation">)</span><span class="token punctuation">(</span>now <span class="token operator">-</span> then<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">1000.f</span><span class="token punctuation">;</span> <span class="token comment">// delta time in seconds</span>
then <span class="token operator">=</span> now<span class="token punctuation">;</span>
</code></pre>
</li>
</ul>
<p>That was some short introduction to the Irrlicht engine. And that’s basically everything we will use
for the next few sections.</p>
<p><a href="2015-08-28-first-script">Next chapter</a></p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>