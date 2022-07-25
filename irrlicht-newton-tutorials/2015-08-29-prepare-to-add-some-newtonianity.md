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

    <main class="svelte-1gr3n62"><article><h1>Irrlicht Newton GD tutorial: prepare to add some Newtonianity</h1>

    <time>29 Aug 2015 at 17:06</time>

    <div class="content"><p>At this point we have an application with</p>
<ul>
<li><strong>1x Ninja</strong>, walking around</li>
<li><strong>1x sphere</strong>, hanging in the center of the screen</li>
<li><strong>1x cube</strong>, flying around the sphere</li>
</ul>
<p>That’s our “game”? Doubtely… So let’s make things move like in real world! Or just like that…</p>
<h2 id="requirements">Requirements</h2>
<p>First of all, <a href="https://github.com/MADEAPPS/newton-dynamics/archive/newton-3.13.zip"><strong>go and get</strong></a> the
Newton GD files. And unpack it… right to the <code>source</code> directory of our project! That’s right!
I’m not insane and I’m aware you are going to put <strong>a lot</strong> of files in your project. But have no
fear - you may always add them to <code>.gitignore</code> and skip them from being tracked in your Git repo:</p>
<pre><code>source/newton-dynamics-master/applications
source/newton-dynamics-master/packages/projects
source/newton-dynamics-master/packages/thirdParty
source/newton-dynamics-master/coreLibrary_300/projects
</code></pre>
<p>You are using Git, right?.. Now, you place the Newton GD sources in your project directory and change
your <code>CMakeLists.txt</code> file to look like this:</p>
<pre><code class="language-cmake"><span class="token keyword">cmake_minimum_required</span><span class="token punctuation">(</span><span class="token property">VERSION</span> <span class="token number">3.1</span><span class="token punctuation">)</span>
<span class="token keyword">project</span><span class="token punctuation">(</span>irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span><span class="token variable">CMAKE_CXX_FLAGS</span> <span class="token string">"<span class="token interpolation"><span class="token punctuation">${</span><span class="token variable">CMAKE_CXX_FLAGS</span><span class="token punctuation">}</span></span> -std=c++11"</span><span class="token punctuation">)</span>

<span class="token keyword">option</span><span class="token punctuation">(</span><span class="token string">"NEWTON_DEMOS_SANDBOX"</span> <span class="token string">"Build demos sandbox"</span> <span class="token boolean">OFF</span><span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTONGD_PATH source/newton-dynamics-master<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTONGD_INCLUDE_DIRS
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dCustomJoints
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dContainers
        <span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span>/packages/dMath
        <span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>NEWTON_LIBRARIES Newton dMath<span class="token punctuation">)</span>

<span class="token keyword">add_subdirectory</span><span class="token punctuation">(</span><span class="token punctuation">${</span>NEWTONGD_PATH<span class="token punctuation">}</span><span class="token punctuation">)</span>

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

<span class="token keyword">include_directories</span><span class="token punctuation">(</span><span class="token punctuation">${</span>IRRLICHT_PATH<span class="token punctuation">}</span>/include <span class="token punctuation">${</span>NEWTONGD_INCLUDE_DIRS<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">set</span><span class="token punctuation">(</span>SOURCE_FILES source/main.cpp<span class="token punctuation">)</span>
<span class="token keyword">set</span><span class="token punctuation">(</span>EXECUTABLE_NAME irrlicht_newton_game1<span class="token punctuation">)</span>

<span class="token keyword">add_executable</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span> <span class="token punctuation">${</span>SOURCE_FILES<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">target_link_libraries</span><span class="token punctuation">(</span><span class="token punctuation">${</span>EXECUTABLE_NAME<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>NEWTON_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>IRRLICHT_LIBRARY_PATH<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>X11_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>OPENGL_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>ZLIB_LIBRARIES<span class="token punctuation">}</span>
        <span class="token punctuation">${</span>X11_Xxf86vm_LIB<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>Try to compile your project - it should be just fine. And observe the power of CMake!</p>
<!--more-->

<h2 id="gravity">Gravity</h2>
<p>Let’s start modifying our Irrlicht sample application. First of all, we will add some Newton headers:</p>
<pre><code class="language-cpp"><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"newton-dynamics-master/coreLibrary_300/source/newton/Newton.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"newton-dynamics-master/packages/dMath/dVector.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"newton-dynamics-master/packages/dMath/dMatrix.h"</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">"newton-dynamics-master/packages/dMath/dQuaternion.h"</span></span>
</code></pre>
<p>The basic thing in the whole Newton GD library is <code>NewtonWorld</code>. That is what it means - the world, where
all the physics happen. It is something different from where we place our 3D models. And that should be
obvious - graphics are managed by Irrlicht and physics - by Newton. Those are totally different libraries.
So we need to tie those two so that graphics correspond to what happens in <em>physical</em> world.</p>
<p>First of all, we need to have a variable for our <code>NewtonWorld</code>. And since physics are handled by scripts too,
we need to have that variable close to our other objects - in the <code>ScriptManager</code> class.</p>
<p>There are two functions we need to bind to our <code>NewtonBody</code>:</p>
<pre><code class="language-cpp"><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">transformCallback</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewtonBody<span class="token operator">*</span> body<span class="token punctuation">,</span> <span class="token keyword">const</span> dFloat<span class="token operator">*</span> matrix<span class="token punctuation">,</span> <span class="token keyword">int</span> threadIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// update ISceneNode so that it is in the same position and rotation as the NewtonBody</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">applyForceAndTorqueCallback</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewtonBody<span class="token operator">*</span> body<span class="token punctuation">,</span> dFloat timestep<span class="token punctuation">,</span> <span class="token keyword">int</span> threadIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// just add gravity to our body</span>
    dFloat Ixx<span class="token punctuation">,</span> Iyy<span class="token punctuation">,</span> Izz<span class="token punctuation">;</span>
    dFloat mass<span class="token punctuation">;</span>

    <span class="token function">NewtonBodyGetMassMatrix</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> <span class="token operator">&amp;</span>mass<span class="token punctuation">,</span> <span class="token operator">&amp;</span>Ixx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>Iyy<span class="token punctuation">,</span> <span class="token operator">&amp;</span>Izz<span class="token punctuation">)</span><span class="token punctuation">;</span>

    dVector <span class="token function">gravityForce</span><span class="token punctuation">(</span><span class="token number">0.0f</span><span class="token punctuation">,</span> mass <span class="token operator">*</span> <span class="token operator">-</span><span class="token number">9.8f</span><span class="token punctuation">,</span> <span class="token number">0.0f</span><span class="token punctuation">,</span> <span class="token number">1.0f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonBodySetForce</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> <span class="token operator">&amp;</span>gravityForce<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>The first one, <code>transformCallback</code>, is called whenever body changes its transform -
e. g. either position or rotation. This is a good place to synchronize our Irrlicht meshes’
positions with their Newton bodies.</p>
<p>The <code>applyForceAndTorqueCallback</code> function is called on each <code>NewtonUpdate</code> to set the final
forces and torques for bodies. We will modify this one later, but for now its implementation
is just good.</p>
<p>But what’s with that <code>NewtonUpdate</code>? This is a function, which does as it says: it
updates <code>NewtonWorld</code> and all its bodies, taking into account the time since the
last update. This function call has one great candidate to be placed into: <code>handleFrame</code>.
But we need to modify that method to receive the time since the last frame been rendered
and we will use this time to update <code>NewtonWorld</code> too.</p>
<pre><code class="language-cpp"><span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">updatePhysics</span><span class="token punctuation">(</span><span class="token keyword">float</span> dt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token function">NewtonUpdate</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">,</span> dt<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">handleFrame</span><span class="token punctuation">(</span><span class="token keyword">float</span> dt<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">auto</span> handler <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-function"><span class="token function">Get</span><span class="token generic class-name"><span class="token operator">&lt;</span>LuaFunction<span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">>></span></span></span><span class="token punctuation">(</span><span class="token string">"handleFrame"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">updatePhysics</span><span class="token punctuation">(</span>dt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setKeyStates</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        handler<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre>
<p>Remember about architecture: everything, what needs to be exposed to our scripts should be
declared as <code>public</code> in our <code>ScriptManager</code>. Everything else - as <code>protected</code> or <code>private</code>.
This is the basic principle of <em>encapsulation</em>, so let’s keep it in our application.</p>
<p>And update the main application loop:</p>
<pre><code class="language-cpp"><span class="token keyword">while</span> <span class="token punctuation">(</span>device<span class="token operator">-></span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Work out a frame delta time.</span>
    <span class="token keyword">const</span> u32 now <span class="token operator">=</span> device<span class="token operator">-></span><span class="token function">getTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-></span><span class="token function">getTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> f32 frameDeltaTime <span class="token operator">=</span> <span class="token punctuation">(</span>f32<span class="token punctuation">)</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> then<span class="token punctuation">)</span><span class="token punctuation">;</span>
    then <span class="token operator">=</span> now<span class="token punctuation">;</span>

    <span class="token comment">// ...</span>

    scriptMgr<span class="token operator">-></span><span class="token function">handleFrame</span><span class="token punctuation">(</span>frameDeltaTime<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre>
<p><strong>Hint:</strong> to make simulation slower and so watch ball falling in detail, make the
<code>NewtonUpdate</code> argument even smaller. Thousand times, say.</p>
<p>Since we have initialization for our Newton stuff, we need to clean it up at the exit
to prevent memory leaks. Let’s declare a method for that:</p>
<pre><code class="language-cpp"><span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">stopPhysics</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">NewtonDestroyAllBodies</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">NewtonDestroy</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre>
<p>And call it right before the program’s end:</p>
<pre><code class="language-cpp">device<span class="token operator">-></span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

scriptMgr<span class="token operator">-></span><span class="token function">handleExit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">delete</span> scriptMgr<span class="token punctuation">;</span>
</code></pre>
<p>And now is the right moment to add key codes’ definitions and exit function to our
<code>ScriptManager</code> so that we could write more clear code and close our application
correctly, using, say, <kbd>Esc</kbd> key.</p>
<p>To stop our application, we need to break our <code>while (device-&gt;run())</code> loop. This could be
achieved by simply closing the <code>IrrlichtDevice</code> with <code>device-&gt;closeDevice()</code>. But we
do not have an access to the device from the <code>ScriptManager</code>. So let’s add it as a
constructor argument:</p>
<pre><code class="language-cpp"><span class="token keyword">private</span><span class="token operator">:</span>
    irr<span class="token double-colon punctuation">::</span>IrrlichtDevice <span class="token operator">*</span>device<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">ScriptManager</span><span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>IrrlichtDevice <span class="token operator">*</span>_device<span class="token punctuation">,</span> scene<span class="token double-colon punctuation">::</span>ISceneManager <span class="token operator">*</span>_smgr<span class="token punctuation">,</span> video<span class="token double-colon punctuation">::</span>IVideoDriver <span class="token operator">*</span>_driver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        driver <span class="token operator">=</span> _driver<span class="token punctuation">;</span>
        smgr <span class="token operator">=</span> _smgr<span class="token punctuation">;</span>
        device <span class="token operator">=</span> _device<span class="token punctuation">;</span>

        <span class="token function">initPhysics</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre>
<p>So now we can create a function, exposed to our scripts, which will stop our application:</p>
<pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    device<span class="token operator">-></span><span class="token function">closeDevice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>And bind it to the Lua function:</p>
<pre><code class="language-cpp"><span class="token keyword">auto</span> exitFn <span class="token operator">=</span> luaState<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">CreateFunction</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">></span></span></span><span class="token punctuation">(</span>
                <span class="token punctuation">[</span><span class="token operator">&amp;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-></span> <span class="token keyword">void</span> <span class="token punctuation">{</span> <span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

global<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"exit"</span><span class="token punctuation">,</span> exitFn<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now we can use our <code>exit</code> function in the Lua scripts. But we will need to use hexadecimal
key codes and that’s… ugly. So we need to define some symbolic names for those codes:</p>
<pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">setGlobalVariables</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setKeyStates</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setKeyCodeConstants</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">setKeyCodeConstants</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>map<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>string<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">></span> keyMapping <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_LBUTTON"</span><span class="token punctuation">,</span> <span class="token number">0x01</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Left mouse button</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_RBUTTON"</span><span class="token punctuation">,</span> <span class="token number">0x02</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Right mouse button</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_CANCEL"</span><span class="token punctuation">,</span> <span class="token number">0x03</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Control-break processing</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_MBUTTON"</span><span class="token punctuation">,</span> <span class="token number">0x04</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Middle mouse button (three-button mouse)</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_XBUTTON1"</span><span class="token punctuation">,</span> <span class="token number">0x05</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Windows 2000/XP: X1 mouse button</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_XBUTTON2"</span><span class="token punctuation">,</span> <span class="token number">0x06</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Windows 2000/XP: X2 mouse button</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_BACK"</span><span class="token punctuation">,</span> <span class="token number">0x08</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// BACKSPACE key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_TAB"</span><span class="token punctuation">,</span> <span class="token number">0x09</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// TAB key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_CLEAR"</span><span class="token punctuation">,</span> <span class="token number">0x0C</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// CLEAR key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_RETURN"</span><span class="token punctuation">,</span> <span class="token number">0x0D</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// ENTER key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SHIFT"</span><span class="token punctuation">,</span> <span class="token number">0x10</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// SHIFT key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_CONTROL"</span><span class="token punctuation">,</span> <span class="token number">0x11</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// CTRL key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_MENU"</span><span class="token punctuation">,</span> <span class="token number">0x12</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// ALT key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_PAUSE"</span><span class="token punctuation">,</span> <span class="token number">0x13</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// PAUSE key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_CAPITAL"</span><span class="token punctuation">,</span> <span class="token number">0x14</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// CAPS LOCK key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KANA"</span><span class="token punctuation">,</span> <span class="token number">0x15</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME Kana mode</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_HANGUEL"</span><span class="token punctuation">,</span> <span class="token number">0x15</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME Hanguel mode (maintained for compatibility use KEY_HANGUL)</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_HANGUL"</span><span class="token punctuation">,</span> <span class="token number">0x15</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME Hangul mode</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_JUNJA"</span><span class="token punctuation">,</span> <span class="token number">0x17</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME Junja mode</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_FINAL"</span><span class="token punctuation">,</span> <span class="token number">0x18</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME final mode</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_HANJA"</span><span class="token punctuation">,</span> <span class="token number">0x19</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME Hanja mode</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KANJI"</span><span class="token punctuation">,</span> <span class="token number">0x19</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME Kanji mode</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_ESCAPE"</span><span class="token punctuation">,</span> <span class="token number">0x1B</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// ESC key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_CONVERT"</span><span class="token punctuation">,</span> <span class="token number">0x1C</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME convert</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NONCONVERT"</span><span class="token punctuation">,</span> <span class="token number">0x1D</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME nonconvert</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_ACCEPT"</span><span class="token punctuation">,</span> <span class="token number">0x1E</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME accept</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_MODECHANGE"</span><span class="token punctuation">,</span> <span class="token number">0x1F</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// IME mode change request</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SPACE"</span><span class="token punctuation">,</span> <span class="token number">0x20</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// SPACEBAR</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_PRIOR"</span><span class="token punctuation">,</span> <span class="token number">0x21</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// PAGE UP key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NEXT"</span><span class="token punctuation">,</span> <span class="token number">0x22</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// PAGE DOWN key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_END"</span><span class="token punctuation">,</span> <span class="token number">0x23</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// END key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_HOME"</span><span class="token punctuation">,</span> <span class="token number">0x24</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// HOME key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_LEFT"</span><span class="token punctuation">,</span> <span class="token number">0x25</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// LEFT ARROW key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_UP"</span><span class="token punctuation">,</span> <span class="token number">0x26</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// UP ARROW key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_RIGHT"</span><span class="token punctuation">,</span> <span class="token number">0x27</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// RIGHT ARROW key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_DOWN"</span><span class="token punctuation">,</span> <span class="token number">0x28</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// DOWN ARROW key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SELECT"</span><span class="token punctuation">,</span> <span class="token number">0x29</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// SELECT key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_PRINT"</span><span class="token punctuation">,</span> <span class="token number">0x2A</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// PRINT key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_EXECUT"</span><span class="token punctuation">,</span> <span class="token number">0x2B</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// EXECUTE key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SNAPSHOT"</span><span class="token punctuation">,</span> <span class="token number">0x2C</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// PRINT SCREEN key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_INSERT"</span><span class="token punctuation">,</span> <span class="token number">0x2D</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// INS key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_DELETE"</span><span class="token punctuation">,</span> <span class="token number">0x2E</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// DEL key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_HELP"</span><span class="token punctuation">,</span> <span class="token number">0x2F</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// HELP key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_0"</span><span class="token punctuation">,</span> <span class="token number">0x30</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 0 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_1"</span><span class="token punctuation">,</span> <span class="token number">0x31</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 1 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_2"</span><span class="token punctuation">,</span> <span class="token number">0x32</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 2 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_3"</span><span class="token punctuation">,</span> <span class="token number">0x33</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 3 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_4"</span><span class="token punctuation">,</span> <span class="token number">0x34</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 4 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_5"</span><span class="token punctuation">,</span> <span class="token number">0x35</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 5 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_6"</span><span class="token punctuation">,</span> <span class="token number">0x36</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 6 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_7"</span><span class="token punctuation">,</span> <span class="token number">0x37</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 7 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_8"</span><span class="token punctuation">,</span> <span class="token number">0x38</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 8 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_9"</span><span class="token punctuation">,</span> <span class="token number">0x39</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 9 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_A"</span><span class="token punctuation">,</span> <span class="token number">0x41</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// A key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_B"</span><span class="token punctuation">,</span> <span class="token number">0x42</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// B key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_C"</span><span class="token punctuation">,</span> <span class="token number">0x43</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// C key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_D"</span><span class="token punctuation">,</span> <span class="token number">0x44</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// D key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_E"</span><span class="token punctuation">,</span> <span class="token number">0x45</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// E key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_F"</span><span class="token punctuation">,</span> <span class="token number">0x46</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_G"</span><span class="token punctuation">,</span> <span class="token number">0x47</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// G key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_H"</span><span class="token punctuation">,</span> <span class="token number">0x48</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// H key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_I"</span><span class="token punctuation">,</span> <span class="token number">0x49</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// I key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_J"</span><span class="token punctuation">,</span> <span class="token number">0x4A</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// J key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_K"</span><span class="token punctuation">,</span> <span class="token number">0x4B</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// K key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_L"</span><span class="token punctuation">,</span> <span class="token number">0x4C</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// L key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_M"</span><span class="token punctuation">,</span> <span class="token number">0x4D</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// M key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_N"</span><span class="token punctuation">,</span> <span class="token number">0x4E</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// N key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_O"</span><span class="token punctuation">,</span> <span class="token number">0x4F</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// O key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_P"</span><span class="token punctuation">,</span> <span class="token number">0x50</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// P key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_Q"</span><span class="token punctuation">,</span> <span class="token number">0x51</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Q key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_R"</span><span class="token punctuation">,</span> <span class="token number">0x52</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// R key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_S"</span><span class="token punctuation">,</span> <span class="token number">0x53</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// S key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_T"</span><span class="token punctuation">,</span> <span class="token number">0x54</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// T key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_U"</span><span class="token punctuation">,</span> <span class="token number">0x55</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// U key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_V"</span><span class="token punctuation">,</span> <span class="token number">0x56</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// V key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_W"</span><span class="token punctuation">,</span> <span class="token number">0x57</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// W key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_X"</span><span class="token punctuation">,</span> <span class="token number">0x58</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// X key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_Y"</span><span class="token punctuation">,</span> <span class="token number">0x59</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Y key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_KEY_Z"</span><span class="token punctuation">,</span> <span class="token number">0x5A</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Z key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_LWIN"</span><span class="token punctuation">,</span> <span class="token number">0x5B</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Left Windows key (Microsoft� Natural� keyboard)</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_RWIN"</span><span class="token punctuation">,</span> <span class="token number">0x5C</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Right Windows key (Natural keyboard)</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_APPS"</span><span class="token punctuation">,</span> <span class="token number">0x5D</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Applications key (Natural keyboard)</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SLEEP"</span><span class="token punctuation">,</span> <span class="token number">0x5F</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Computer Sleep key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD0"</span><span class="token punctuation">,</span> <span class="token number">0x60</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 0 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD1"</span><span class="token punctuation">,</span> <span class="token number">0x61</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 1 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD2"</span><span class="token punctuation">,</span> <span class="token number">0x62</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 2 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD3"</span><span class="token punctuation">,</span> <span class="token number">0x63</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 3 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD4"</span><span class="token punctuation">,</span> <span class="token number">0x64</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 4 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD5"</span><span class="token punctuation">,</span> <span class="token number">0x65</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 5 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD6"</span><span class="token punctuation">,</span> <span class="token number">0x66</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 6 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD7"</span><span class="token punctuation">,</span> <span class="token number">0x67</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 7 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD8"</span><span class="token punctuation">,</span> <span class="token number">0x68</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 8 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMPAD9"</span><span class="token punctuation">,</span> <span class="token number">0x69</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Numeric keypad 9 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_MULTIPLY"</span><span class="token punctuation">,</span> <span class="token number">0x6A</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Multiply key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_ADD"</span><span class="token punctuation">,</span> <span class="token number">0x6B</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Add key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SEPARATOR"</span><span class="token punctuation">,</span> <span class="token number">0x6C</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Separator key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SUBTRACT"</span><span class="token punctuation">,</span> <span class="token number">0x6D</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Subtract key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_DECIMAL"</span><span class="token punctuation">,</span> <span class="token number">0x6E</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Decimal key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_DIVIDE"</span><span class="token punctuation">,</span> <span class="token number">0x6F</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Divide key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F1"</span><span class="token punctuation">,</span> <span class="token number">0x70</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F1 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F2"</span><span class="token punctuation">,</span> <span class="token number">0x71</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F2 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F3"</span><span class="token punctuation">,</span> <span class="token number">0x72</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F3 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F4"</span><span class="token punctuation">,</span> <span class="token number">0x73</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F4 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F5"</span><span class="token punctuation">,</span> <span class="token number">0x74</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F5 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F6"</span><span class="token punctuation">,</span> <span class="token number">0x75</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F6 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F7"</span><span class="token punctuation">,</span> <span class="token number">0x76</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F7 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F8"</span><span class="token punctuation">,</span> <span class="token number">0x77</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F8 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F9"</span><span class="token punctuation">,</span> <span class="token number">0x78</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F9 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F10"</span><span class="token punctuation">,</span> <span class="token number">0x79</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F10 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F11"</span><span class="token punctuation">,</span> <span class="token number">0x7A</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F11 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F12"</span><span class="token punctuation">,</span> <span class="token number">0x7B</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F12 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F13"</span><span class="token punctuation">,</span> <span class="token number">0x7C</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F13 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F14"</span><span class="token punctuation">,</span> <span class="token number">0x7D</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F14 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F15"</span><span class="token punctuation">,</span> <span class="token number">0x7E</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F15 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F16"</span><span class="token punctuation">,</span> <span class="token number">0x7F</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F16 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F17"</span><span class="token punctuation">,</span> <span class="token number">0x80</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F17 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F18"</span><span class="token punctuation">,</span> <span class="token number">0x81</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F18 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F19"</span><span class="token punctuation">,</span> <span class="token number">0x82</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F19 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F20"</span><span class="token punctuation">,</span> <span class="token number">0x83</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F20 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F21"</span><span class="token punctuation">,</span> <span class="token number">0x84</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F21 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F22"</span><span class="token punctuation">,</span> <span class="token number">0x85</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F22 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F23"</span><span class="token punctuation">,</span> <span class="token number">0x86</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F23 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_F24"</span><span class="token punctuation">,</span> <span class="token number">0x87</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// F24 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_NUMLOCK"</span><span class="token punctuation">,</span> <span class="token number">0x90</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// NUM LOCK key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_SCROLL"</span><span class="token punctuation">,</span> <span class="token number">0x91</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// SCROLL LOCK key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_LSHIFT"</span><span class="token punctuation">,</span> <span class="token number">0xA0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Left SHIFT key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_RSHIFT"</span><span class="token punctuation">,</span> <span class="token number">0xA1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Right SHIFT key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_LCONTROL"</span><span class="token punctuation">,</span> <span class="token number">0xA2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Left CONTROL key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_RCONTROL"</span><span class="token punctuation">,</span> <span class="token number">0xA3</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Right CONTROL key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_LMENU"</span><span class="token punctuation">,</span> <span class="token number">0xA4</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Left MENU key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_RMENU"</span><span class="token punctuation">,</span> <span class="token number">0xA5</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Right MENU key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_1"</span><span class="token punctuation">,</span> <span class="token number">0xBA</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for US    ";:"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_PLUS"</span><span class="token punctuation">,</span> <span class="token number">0xBB</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Plus Key   "+"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_COMMA"</span><span class="token punctuation">,</span> <span class="token number">0xBC</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Comma Key  ","</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_MINUS"</span><span class="token punctuation">,</span> <span class="token number">0xBD</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Minus Key  "-"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_PERIOD"</span><span class="token punctuation">,</span> <span class="token number">0xBE</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Period Key "."</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_2"</span><span class="token punctuation">,</span> <span class="token number">0xBF</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for US    "/?"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_3"</span><span class="token punctuation">,</span> <span class="token number">0xC0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for US    "`~"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_4"</span><span class="token punctuation">,</span> <span class="token number">0xDB</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for US    "[{"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_5"</span><span class="token punctuation">,</span> <span class="token number">0xDC</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for US    "\|"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_6"</span><span class="token punctuation">,</span> <span class="token number">0xDD</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for US    "]}"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_7"</span><span class="token punctuation">,</span> <span class="token number">0xDE</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for US    "'""</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_8"</span><span class="token punctuation">,</span> <span class="token number">0xDF</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// None</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_AX"</span><span class="token punctuation">,</span> <span class="token number">0xE1</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// for Japan "AX"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_102"</span><span class="token punctuation">,</span> <span class="token number">0xE2</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// "&lt;>" or "\|"</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_ATTN"</span><span class="token punctuation">,</span> <span class="token number">0xF6</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Attn key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_CRSEL"</span><span class="token punctuation">,</span> <span class="token number">0xF7</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// CrSel key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_EXSEL"</span><span class="token punctuation">,</span> <span class="token number">0xF8</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// ExSel key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_EREOF"</span><span class="token punctuation">,</span> <span class="token number">0xF9</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Erase EOF key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_PLAY"</span><span class="token punctuation">,</span> <span class="token number">0xFA</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Play key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_ZOOM"</span><span class="token punctuation">,</span> <span class="token number">0xFB</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Zoom key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_PA1"</span><span class="token punctuation">,</span> <span class="token number">0xFD</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// PA1 key</span>
        <span class="token punctuation">{</span> <span class="token string">"KEY_OEM_CLEAR"</span><span class="token punctuation">,</span> <span class="token number">0xFE</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// Clear key</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">auto</span> it <span class="token operator">=</span> keyMapping<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> it <span class="token operator">!=</span> keyMapping<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span>it<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        luaState<span class="token punctuation">.</span><span class="token function">GetGlobalEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>it<span class="token operator">-></span>first<span class="token punctuation">,</span> it<span class="token operator">-></span>second<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Now we can create a <kbd>Esc</kbd> key handler in our script:</p>
<pre><code class="language-lua"><span class="token keyword">function</span> <span class="token function">handleFrame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">-- Esc</span>
    <span class="token keyword">if</span> KEY_STATE<span class="token punctuation">[</span>KEY_ESCAPE<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">true</span> <span class="token keyword">then</span>
        <span class="token function">exit</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>Now we are ready to create our first Newton bodies. Bodies are some invisible objects,
which define how our Irrlicht meshes will behave (e. g. where they will be placed,
how they will interact when moving, etc.). Basically, there are two types of bodies:</p>
<ol>
<li><strong>dynamic</strong>, whose movement is determined by the forces, applied to them</li>
<li><strong>kinematic</strong>, which are controlled by setting their velocities</li>
</ol>
<p>Those two kinds of bodies are totally different, so the interactions between them
are not pre-defined. So when your dynamic body will fall onto a kinematic one, it will
fall through.</p>
<p>And each body has its shape, which determines behaviour of the body, when it collides others
and the collision detection itself, of course. Shapes could be <strong>convex</strong> or <strong>concave</strong>.
Convex shapes are easier to work with <em>(on the level of physics simulation)</em>, but not all the
bodies in practice are convex. For example, levels are oftenly concave. So they need their special
shapes, which are called <code>Triangle Mesh</code>.</p>
<p><strong>Note:</strong> to keep the performance of your application high, try to minimalize the use of
triangle meshes and use as simple shapes, as possible. Sometimes it is more effective to
combine a set of primitive shapes, like spheres, cylinders and boxes into one <strong>compound</strong>
shape, then to use a trimesh.</p>
<p>Let’s create our first simple scene, empowered with physics! We will need only two things:</p>
<ol>
<li>a sphere</li>
<li>the floor</li>
</ol>
<p>Since we do not have the good mesh in standard Irrlicht distribution for the floor
<em>(there is a Quake-like level, but that is too much for our case)</em>, we will learn how
to make that simple thing in Blender. The next part is a short break between coding
sessions.</p>
<p><a href="2015-12-15-making-simple-level-with-blender">Next chapter</a></p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>