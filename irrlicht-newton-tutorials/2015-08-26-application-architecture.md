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

    <main class="svelte-1gr3n62"><article><h1>Irrlicht Newton GD tutorial: application architecture</h1>

    <time>26 Aug 2015 at 20:50</time>

    <div class="content"><h2 id="basic-terms">Basic terms</h2>
<p>Let’s talk a bit about our application before we create it. In order to make the development process sequential
and least painful, we need to design the application well. The design of an application or the <strong>application architecture</strong>
is the hardest thing to change on later stages of development. Thus it must be well-thought at the very beginning to
prevent suffering in the future.</p>
<p>Well, there are number of application architecture’ levels:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/japan_feudal_system.webp" />

<p>The highest level defines which modules will the whole application consist of and what functionality will each of those modules have.</p>
<p>The next level is how the modules communicate to each other, how they work together.</p>
<p>The lower level is the structure of each module - what classes, entities, data structures and similar things will the module consist of.</p>
<p>One of the lowest, yet still very important architecture levels is how files are organized.</p>
<p>From the highest architecture layer point of view, I can advice a very simple architecture:</p>
<ul>
<li>a stable, rarely changed <strong>core</strong></li>
<li>a set of <strong>assets</strong> (models, textures, sounds - any content, made by artists and used to be presented to the player)</li>
<li>a bunch of <strong>scripts</strong>, defining all the logic of a game (how character looks like, how the menus are shown and how they react to player’s actions)</li>
</ul>
<p>The main benefits of such an approach are:</p>
<ol>
<li>scripts and assets may be changed at any time</li>
<li>scripts and assets define what we show to the user and how the application behaves, so we can changes them without the need to re-compile the core</li>
<li>we can modify the core (for example - optimize some features) without changing the application behaviour</li>
</ol>
<p>We can make the core so flexible that we may re-use it in the future projects.</p>
<h2 id="the-tools">The tools</h2>
<p>We will use <strong>Irrlicht</strong> engine because of its simplicity. And it satisfies all our needs - it
does not need much content preparation; it provides GUI; extending it with <strong>IrrKlang</strong> will give
us very simple interface to sound and music playback.</p>
<p><strong>Newton Game Dynamics</strong> engine we will use to simulate physics. It is easy to use and is really powerful -
you would be impressed!</p>
<p>The last, not the least, we will use <strong>Lua</strong> scripting language to write scripts. Lua is a lightweight
programming language and perfectly suits that goal.</p>
<p>One of the most beautiful parts of this tutorial, will be the part on making of <strong>assets</strong>. We will use
<strong>Blender 3D</strong> to create a couple of 3D models.</p>
<p>I also found <strong>CMake</strong> kind of user-friendly. It is not that handy as any of dependency managers for all
those languages, supporting them <em>(<code>npm</code> for JavaScript, <code>go get</code> for Go, <code>RubyGems</code> for Ruby, <code>leiningen</code>
for Clojure and many others)</em>. Yet it makes your project a little more portable, helps to handle your
dependencies, totally eliminates the need of all those <em>How to configure VisualStudio for OGRE</em> tutorials.
Just try it!</p>
<h2 id="conclusion">Conclusion</h2>
<p>Remember all the three rules for our architecture. And keeping them in mind, let’s get to some coding already!</p>
<p><a href="2015-08-27-first-application">Next chapter</a></p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>