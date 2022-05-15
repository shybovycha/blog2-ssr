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

    <main class="svelte-1gr3n62"><article><h1>Irrlicht Newton GD tutorial: introduction</h1>

    <time>25 Aug 2015 at 17:01</time>

    <div class="content"><h2 id="what-will-you-learn">What will you learn?</h2>
<p>This tutorial covers the development of a game from a very beginning. This includes:</p>
<ul>
<li>planning the <strong>architecture</strong> for a game</li>
<li>developing the <strong>game engine</strong></li>
<li>defining game logic with <strong>scripts</strong></li>
<li>creating <strong>3d models</strong></li>
<li>and <strong>distributing the application</strong></li>
</ul>
<p>And of course, the whole tutorial is built around <strong>Irrlicht</strong> and <strong>Newton Game Dynamics</strong> libraries.</p>
<p>As for <em>{{ new Date() }}</em>, the tutorial covers:</p>
<ul>
<li>an introduction to NewtonGD</li>
<li>creating Irrlicht-powered application</li>
<li>controlling the application logic with Lua scripts</li>
<li>building application with CMake</li>
</ul>
<h2 id="why-writing-everything-from-scratch-why-not-use-unity--unreal-engine--you-name-it">Why writing everything from scratch? Why not use Unity / Unreal Engine / <em>you-name-it</em>?</h2>
<p>There are some well-known and used game engines like <strong>Unreal Engine 4</strong>, <strong>Unity 3D</strong> and others. They all come with enormous amount of learning materials. So why this tutorial might be interesting for you? You might want to know how things work and thus get most flexibility out of your tools. Or even start working on building your own tools.</p>
<h2 id="what-should-i-know-to-proceed">What should I know to proceed?</h2>
<p>I expect you to have at least some experience with these three things:</p>
<ul>
<li>C++</li>
<li>computer graphics</li>
<li>game development</li>
</ul>
<p>The latter - to make sure, you will not call 3d models “textures” or miss the “script” word’ meaning.</p>
<h2 id="why-these-libraries">Why these libraries?</h2>
<p>Irrlicht is easy to use and contains all the features you will need to build a game - resource management, support for majority of asset formats out-of-the-box, user input (keyboard, mouse and joystick events handling), GUI (Graphical User Interface - buttons, text inputs, etc.).</p>
<p>Irrlicht is easy to use and contains all the features you will need to build a game - resource management, support for majority of
asset formats out-of-the-box, user input <em>(keyboard, mouse and joystick events handling)</em>, GUI
<em>(Graphical User Interface - buttons, text inputs, etc.)</em>.</p>
<p>Newton Game Dynamics is also very easy to use; it is constantly developed; and it is darn powerful!</p>
<p>If you are still interested - please proceed to <a href="2015-08-26-application-architecture">the first chapter</a>.</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>