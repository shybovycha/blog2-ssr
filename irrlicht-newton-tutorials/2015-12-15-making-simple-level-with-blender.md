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

    <main class="svelte-1gr3n62"><article><h1>Irrlicht Newton GD tutorial: making simple level with Blender</h1>

    <time>15 Dec 2015 at 17:06</time>

    <div class="content"><p>In this section we will have short but powerful introduction to Blender. We will cover
just enough of model creation basics, you will need to create most of simple projects.</p>
<p>No, we will not cover animation, shaders or modificators here, but just enough minimum
to create this ramp floor for our tutorial:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/ramp_render.webp" alt="The desired result" class="img-responsive" />

<p>You will find lot of keyboard shortcuts here. And this is one of the most awesome
features of Blender - you can work without menus or panels! Everything you need
can be done with keyboard!</p>
<p>So let’s dive in Blender now!</p>
<!--more-->

<h2 id="welcome-to-belnder">Welcome to Belnder</h2>
<p>When you open Blender, you will see some pretty image, made with Belnder, version information,
some useful links and recent files</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/0.webp" alt="Blender" class="img-responsive" />

<p>To close this window, simply click outside it. You will then see your workspace with the
<code>Default</code> window layout <em>(we will learn about them later)</em>. Workspace contains a few kickstarting
items:</p>
<ul>
<li>camera</li>
<li>light</li>
<li>cube</li>
</ul>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/1.webp" alt="Workspace" class="img-responsive" />

<p>You may be confused of the last one, but you will see shortly that so many cool things could
be done starting with plain cube and modifying it. Oh, and about modifying: let’s switch to
the <strong>Edit mode</strong>, hitting the <kbd>Tab</kbd> key:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/2.webp" alt="Edit mode" class="img-responsive" />

<p>You can exit it hitting <kbd>Tab</kbd> again. In the <strong>edit mode</strong> you can manipulate mesh’
<strong>edges</strong>, <strong>vertices</strong> or <strong>faces</strong>. To switch between these, use three buttons on the screen’s
bottom:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/3.webp" alt="Switching between edges, faces and vertices in edit mode" class="img-responsive" />

<p>Let’s choose the <strong>faces</strong> editing mode. Unlike other 3D editors, in Blender selection is done
with the <strong>Right mouse button</strong>. Select one face of the cube:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/4.webp" alt="Selecting items in blender" class="img-responsive" />

<p>You may have noticed that the axis arrows have moved in the selected face’s place.
These are used to manipulate selected elements. Also, they show the orientation of the selected
element. You can move the selected element by simply dragging one of the arrows. Selected
element will be moved along the selected axis only:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/5.webp" alt="Moving selected elements" class="img-responsive" />

<p>The same operation, movement, could be performed hitting the <kbd>G</kbd> key. You can move other
elements, too - this will change the form of our cube:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/6.webp" alt="Moving edges" class="img-responsive" />

<p>Now let’s try something more complex. See the <strong>Tools</strong> panel on your left?</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/7.webp" alt="Tools panel" class="img-responsive" />

<p>Select a face in a face editing mode and click <strong>Extrude</strong> (or hit the <kbd>E</kbd> key). Your face
will be extruded and you will be able to move it freely. But usually, designers move elements along
some axis - this makes models more accurate. To fix the movement axis, just hit its letter while being
in the extruding mode - <kbd>X</kbd>, <kbd>Y</kbd> or <kbd>Z</kbd>:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/8.webp" alt="Extruding faces" class="img-responsive" />

<p>Interesting fact: you may extrude both vertices and edges too.</p>
<p>Now, let’s use even more advanced operation, which is oftenly described later in tutorials on
3D modelling. Choose the <strong>Loop cut and slice</strong> operation from the <strong>Tools</strong> panel - you will
see nothing. <em>Until</em> you move your cursor over your model. Depending on the edge, cursor is closer
to, you will see purple rectangle, looping through your model:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/9.webp" alt="Loop cut" class="img-responsive" />

<p>When you click the <strong>Left mouse button</strong>, you will move to the next part of this operation -
<em>slicing</em>. Just place the new edges where you want:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/10.webp" alt="Slicing the loop cut" class="img-responsive" />

<p>Now let’s create walls for our “ramp”. Create a few loop cuts alongside the ramp and we will start
extruding:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/12.webp" alt="Extruding one wall" class="img-responsive" />

<p>Or maybe just moving faces?..</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/13.webp" alt="Moving vs extruding" class="img-responsive" />

<p>No, that’s definitely not what we want! We want walls, not a new ramp! Hmmm… But if we will
extrude walls one-by-one, it will be inaccurate… Hold the <kbd>Shift</kbd> key and
<strong>right-click</strong> the two neighbour walls:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/14.webp" alt="Multiple selection" class="img-responsive" />

<p>Now we will work with three elements in the same way. Hit the <kbd>E</kbd> key and then - <kbd>Z</kbd>
and extrude all three walls at the same time up:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/15.webp" alt="Simultaneous extrusion" class="img-responsive" />

<p>Now we need two more walls to prevent our hero <em>(the ball, if you recall from the previous part)</em>
from falling aside. Select two edges at the corner of our ramp and hit the <kbd>W</kbd> key. You
will see the context menu like this:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/16.webp" alt="Editing context menu" class="img-responsive" />

<p>Click the <strong>Subdivide</strong> item, and the selected edges will be connected right in the middle:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/17.webp" alt="Subdivision for two edges" class="img-responsive" />

<p>You can perform that operation on faces - that is oftenly handy. Now, if you undo your changes with
usual <kbd>Ctrl</kbd>+<kbd>Z</kbd> (or <kbd>Command</kbd>+<kbd>Z</kbd> on Mac) and try to perform
the same operation on four opposite edges, you will see there is a redundant <em>(in our case)</em>
edge:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/18.webp" alt="4-th subdivision" class="img-responsive" />

<p>You can remove it by selecting that edge, hitting <kbd>X</kbd> and selecting <strong>Dissolve edges</strong>.
If you choose the <strong>Delete edge</strong> - you will loose the neighbour faces, which were made of that
edge.</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/19.webp" alt="Delete or dissolve?" class="img-responsive" />

<p>So in the end we need to have two edges on the same line:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/20.webp" alt="The needed edges" class="img-responsive" />

<p>Now, switch to the <strong>Ortho View</strong>, choosing one from the <strong>View</strong> menu at the bottom of the
screen, or hitting the <kbd>Num 5</kbd> key:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/21.webp" alt="View menu" class="img-responsive" />

<p>Your workspace now should look different:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/22.webp" alt="Ortho view" class="img-responsive" />

<p>Using the <strong>View</strong> menu, you may switch between different views, perpendicular to your model.</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/23.webp" alt="Top view" class="img-responsive" />

<LazyImg src="/images/irrlicht-newton-tutorials/blender/24.webp" alt="Right view" class="img-responsive" />

<p>Switching between different views will not clear the selection. And this is awesome!
So if you try to move the selected edges in the <strong>Right Ortho View</strong>, you will move
both of them:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/25.webp" alt="Selection persistence" class="img-responsive" />

<p>Yeeks… They move just along the Y axis, but not along the edge. But Blender easily handles
that - you need to switch between coordinate system using the corresponding menu
at the bottom of your screen:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/26.webp" alt="Coordinate system" class="img-responsive" />

<p>Use the <strong>Normal</strong> one and you will see the arrows at the selected edges changed:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/27.webp" alt="Normal coordinate system" class="img-responsive" />

<p>Now movement is done along the edge, just as we need:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/28.webp" alt="Moving with Normal coordinate system" class="img-responsive" />

<p>Try <strong>moving</strong> <em>(yes, moving, not extruding)</em> our edges up - they will move along the normal:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/30.webp" alt="Moving edges in Right Ortho view" class="img-responsive" />

<p>But if you <strong>click the mouse wheel</strong> and <strong>rotate camera</strong>, or even if you switch to the
<strong>Top Ortho</strong> view, you will notice that our walls have different width:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/31.webp" alt="Whoops..." class="img-responsive" />

<p>So we need to make one wall thinner. But we should not forget about other edges - ones,
which will make another wall for us. Undoing now is not an option… We need to move the edges.
But if you move only those visible at the <strong>Top Ortho</strong> view, you will forget about the ones
at the bottom and screw the model. And selecting all those edges one-by-one is not an option
too…</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/32.webp" alt="Selecting many edges manually is a pain..." class="img-responsive" />

<p>Moreover, we do not see those edges at the bottom! This is easy to fix, though: see the small
button with rectangles near the <strong>vertex/edge/face</strong> switcher?</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/33.webp" alt="'Limit selection to visible' switcher" class="img-responsive" />

<p>Click it and you will be able to select bottom edges without the need to rotate the camera.
And now we will try the circle-selection tool, which will come to help you when you need to
select many elements at a time. Hit the <kbd>C</kbd> key and you will see the circle in a
workspace. Try dragging it (<strong>left-click the mouse and drag</strong>) over the edges we need:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/35.webp" alt="Circle selection" class="img-responsive" />

<p>Hmmm… It’s way too much… Now, hold the <kbd>Shift</kbd> key and drag the circle over
the neighbour, redundant ones:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/36.webp" alt="Unselecting elements" class="img-responsive" />

<p>Now we can switch back to the <strong>Top Ortho View</strong> and successfully move our edges:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/37.webp" alt="Making walls thinner" class="img-responsive" />

<p>Now that we have our walls precisely set up, we can extrude the last two walls.
Select the <strong>Normal coordinate system</strong> and perform the extrusion along the Z axis:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/40.webp" alt="Extruding last two walls" class="img-responsive" />

<p>Now we will scale our model a few times. Staying in the <strong>Edit mode</strong>, select all the faces with
the <kbd>A</kbd> key:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/42.webp" alt="Selecting everything" class="img-responsive" />

<p>And hit the <kbd>S</kbd> key and start entering scale factor number. That’s right, just press,
say, <kbd>5</kbd>:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/41.webp" alt="Entering factor while scaling" class="img-responsive" />

<p>You can correct what you entered using the <kbd>Backspace</kbd> key. You can do the same
thing while moving or rotating elements. This is useful when you need to
make operation really precise. But you still can use your mouse, of course.</p>
<p><strong>Hint:</strong> if you scaled your model outside the <strong>Edit mode</strong>, you may find your scale, translation
or rotation different from identity values (<code>1, 1, 1</code> for scale or <code>0, 0, 0</code> for position/rotation).
This may cause different bugs while exporting models. To fix this, you need to select your
model in the <strong>Object mode</strong>, hit the <kbd>Ctrl</kbd>+<kbd>A</kbd> and select <strong>Apply Scale</strong>
<em>(or whatever you need to fix)</em> from the pop-up menu.</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/44.webp" alt="Applying scale" class="img-responsive" />

<h2 id="texturing-our-model">Texturing our model</h2>
<p>Now we need to paint our model to have something more beautiful in our application than just
pitch black… stuff…</p>
<p>Adding textures to a model in Blender is extremely easy - you just select your model, switch to
the <strong>Texture</strong> tab on the right panel and click <strong>New</strong> button:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/47.webp" alt="Creating a texture" class="img-responsive" />

<p>Then you pass in some params like texture size, the background color and image name - and you are done!</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/48.webp" alt="New texture params" class="img-responsive" />

<p>But that will only add a <strong>blank</strong> texture. And then you will need to paint it as you wish.
But painting a texture requires your model to have vertices, synchronized with your texture.
So each vertex will know where it lays both in 3D space and on the texture image. This
assignment process is called <strong>Texture unwrapping</strong> or <strong>UV mapping</strong> <em>(because texture
coordinates are usually called <code>u</code> and <code>v</code> instead of <code>x</code> and <code>y</code>, since those are already
involved to describe vertex’ position)</em>. And this process requires one thing from you: you
need to specify, where Blender should “cut” your model. This is quite simple task, but this
will result on how the texture will look like and how easy it will be to paint.</p>
<p>So, go to the <strong>Edit mode</strong> and select a few loops of edges:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/50.webp" alt="Selecting seam edges" class="img-responsive" />

<LazyImg src="/images/irrlicht-newton-tutorials/blender/51.webp" alt="Selecting seam edges" class="img-responsive" />

<p>Now, on the left panel, switch to the <strong>Shading/UVs</strong> tab and click the <strong>Mark Seam</strong> button:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/49.webp" alt="Shading/UVs tab" class="img-responsive" />

<p>This will mark the selected edges as seams to “cut” your model along. Have no fear, your model
will not be actually cut - it will be used for maths only.</p>
<p>Then, on the same panel click the <strong>Unwrap</strong> button and select the first unwrapping method on
the list:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/53.webp" alt="Unwrapping method" class="img-responsive" />

<p>Again, no effect you will see now. To see something, switch the window layout at the top menu to
<strong>UV Editing</strong>:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/54.webp" alt="Layout switcher" class="img-responsive" />

<LazyImg src="/images/irrlicht-newton-tutorials/blender/55.webp" alt="Layouts available" class="img-responsive" />

<p>You will see two windows - on your left there will be <strong>UV/image editor</strong> and on your right
there will be the <strong>3D view</strong>. And again, nothing interesting here… But I am not fooling
with you - it’s only how Blender works… To see something marvelous, select everything on
the <strong>3D view</strong>:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/58.webp" alt="UV-Mapped model" class="img-responsive" />

<p>You will see some lines on your left. That’s what you have selected, mapped onto image plane.
But there is no actual image in the <strong>UV/Image editor</strong> for now. To add one, just click the
<strong>New</strong> button on the bottom menu of the <strong>UV/Image editor</strong> or select an existing one:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/60.webp" alt="Selecting background image for UV mapping" class="img-responsive" />

<p>This will not change the image itself. The image will be the background for our image editor
window, nothing more. To start making miracles, go to the <strong>Texture Paint mode</strong> in the
<strong>3D view</strong>:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/61.webp" alt="Texture Paint mode" class="img-responsive" />

<p>And your model will change its look…</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/62.webp" alt="Pinky!" class="img-responsive" />

<p>What is this pink monster?! Well, on the left panel of our <strong>3D View</strong> there’s a message,
saying the texture slot is missing and proposing to create one… Let’s do this…</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/63.webp" alt="Texture slot creation" class="img-responsive" />

<p>Now we are able to paint our model! See, how awesome it is: you have a brush tool activated.
Brush has three params:</p>
<ol>
<li><strong>Color</strong> - this could be changed with the color circle below</li>
<li><strong>Radius</strong></li>
<li><strong>Pressure</strong>, or <strong>Alpha</strong></li>
</ol>
<p>Radius could be changed by pressing the <kbd>F</kbd> key and moving mouse cursor:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/64.webp" alt="Brush radius changing" class="img-responsive" />

<p>Pressure could be changed by pressing <kbd>Shift</kbd>+<kbd>F</kbd> and doing the same:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/65.webp" alt="Brush pressure changing" class="img-responsive" />

<p>And you can just pain like in… Microsoft Paint!</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/66.webp" alt="Just paint!!!" class="img-responsive" />

<p>But if you look into the <strong>UV/Image editor</strong>, you will see… nothing! Again! ‘the hell?!</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/67.webp" alt="WTF?!" class="img-responsive" />

<p>That is just misunderstanging - you were painting on the other image instead of the selected one:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/68.webp" alt="Choosing image for UV/Image editor" class="img-responsive" />

<p>We created a new one, when created a texture slot…</p>
<p>To start drawing in the <strong>UV/Image editor</strong> instead of <strong>3D View</strong>, you just need to switch
its mode to <strong>Paint</strong> at the bottom menu:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/71.webp" alt="Painting in the UV/Image editor" class="img-responsive" />

<p>Okay, so far so good. We are able to paint our model. But there’s one interesting thing: if
you try to draw a straight line - you may face situation, when line is straight in the image
but is curved on the model:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/72.webp" alt="UV mapping mistakes" class="img-responsive" />

<LazyImg src="/images/irrlicht-newton-tutorials/blender/74.webp" alt="UV mapping mistakes" class="img-responsive" />

<p>But that’s happening not everywhere - only on certain faces/edges:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/75.webp" alt="Mistakes are only on certain faces" class="img-responsive" />

<p>Well, that’s because of UV mapping is not precise enough. If you switch to the <strong>View mode</strong>
in the <strong>UV/Image editor</strong> and to the <strong>Edit mode</strong> in the <strong>3D View</strong>, and select all the model,
you will see the points in the image editor, you may drag:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/76.webp" alt="Control points in the image editor" class="img-responsive" />

<p>Try selecting them with <strong>Right mouse button</strong> and moving them with <kbd>G</kbd>:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/77.webp" alt="Selecting control points" class="img-responsive" />

<LazyImg src="/images/irrlicht-newton-tutorials/blender/78.webp" alt="Moving control points" class="img-responsive" />

<p>Yes, now texture looks creepy, but lines are almost straight:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/79.webp" alt="Fixing UV mapping errors manually" class="img-responsive" />

<LazyImg src="/images/irrlicht-newton-tutorials/blender/80.webp" alt="Fixing UV mapping errors manually" class="img-responsive" />

<h2 id="exporting-our-model">Exporting our model</h2>
<p>When you finish painting your texture, the last thing we need to do is to export our model
to the format, understandable by Irrlicht. For good, both Blender and Irrlicht support
many different formats:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/83.webp" alt="Blender exporting" class="img-responsive" />

<p>Blender’s file dialogs look differently, but have very intuitive interface:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/90.webp" alt="Blender file dialog" class="img-responsive" />

<p>If you do not see the needed format in Blender - you just need to turn on a corresponding plugin:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/95.webp" alt="Blender settings menu" class="img-responsive" />

<LazyImg src="/images/irrlicht-newton-tutorials/blender/96.webp" alt="Blender settings menu" class="img-responsive" />

<p>After exporting our model to, say, <strong>3DS</strong> format, take a look at the directory you have exported
your model to:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/88.webp" alt="No textures!" class="img-responsive" />

<p>Where are the textures? Relax, they are in the <strong>UV/Image editor</strong>, yet unsaved. You can
save the modified image with the <strong>Image -&gt; Save</strong> menu at the bottom of <strong>UV/Image Editor</strong>:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/blender/89.webp" alt="Saving image from UV/Image Editor" class="img-responsive" />

<p>Now we have everything we need for our Newtonian sample!</p>
<p><a href="/irrlicht-newton-tutorials/2015-12-16-finishing-the-first-scene" class="btn btn-success">Next chapter</a></p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>