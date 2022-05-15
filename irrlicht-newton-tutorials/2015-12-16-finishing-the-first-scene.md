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

    <main class="svelte-1gr3n62"><article><h1>Irrlicht Newton GD tutorial: finishing the first scene</h1>

    <time>16 Dec 2015 at 08:00</time>

    <div class="content"><p>If you remember, we ended our coding excercises at place, where we almost created our first
Newtonian body, but we did not actually have enough models.</p>
<p>We discussed collision shapes a bit. So let’s create one for our brand new model!</p>
<p>We have a nice ramp to work with. But how we can reconstruct the same shape in the
terms of Newton? Newton offers a set of collision shapes for us:</p>
<ul>
<li><p>Sphere</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/sphere.webp" alt="Sphere" class="img-responsive" />
</li>
<li><p>Box</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/box.webp" alt="Box" class="img-responsive" />
</li>
<li><p>Cone</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/cone.webp" alt="Cone" class="img-responsive" />
</li>
<li><p>Capsule</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/capsule.webp" alt="Capsule" class="img-responsive" />
</li>
<li><p>Cylinder</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/cylinder.webp" alt="Cylinder" class="img-responsive" />
</li>
<li><p>Chamfer Cylinder</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/chamfer_cylinder.webp" alt="Chamfer Cylinder" class="img-responsive" />
</li>
<li><p>Convex Hull</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/convex_hull.webp" alt="Convex Hull" class="img-responsive" />
</li>
<li><p>Trimesh</p>
  <LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/trimesh.webp" alt="Trimesh" class="img-responsive" /></li>
</ul>
<p>Obviously, not sphere, cone, capsule, nor cylinder make sense for us.
We could use box shape, but then we simply ignore our inner faces (inside walls):</p>
<LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/ramp_box.webp" alt="Box collision shape for our ramp" class="img-responsive" />

<p>A bit better, but still the same situation with convex hull shape:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/ramp_convex.webp" alt="Convex hull collision shape for our ramp" class="img-responsive" />

<p>Generally, the way we create our Newtonian body is:</p>
<ol>
<li>create collision shape</li>
<li>create blank Newtonian body</li>
<li>set body properties like collision shape, mass, inertia parameters, etc.</li>
<li>store the pointer to the graphical entity for that body in the <code>userData</code> property</li>
</ol>
<p>And then Newton Game Dynamics will take your body into account when processing other objects
in the <code>NewtonWorld</code>.</p>
<!--more-->

<h2 id="tree-mesh-collision-shape">Tree mesh collision shape</h2>
<p>So we gonna use the triangle mesh shape. What we gonna do is loop through all the triangles
of our mesh and build its copy, but in the world of <em>“physic”</em> bodies.</p>
<p>To loop through all the triangles, we need to take each 3 edges of our mesh and the corresponding
vertices <em>(because each edge is represented by two its vertices - their indexes in the list
of vertices)</em> and create Newtonian triangle. Irrlicht stores vertices in one of three formats:</p>
<ol>
<li>plain vertex, represented by its three coordinates; the <code>irr::video::S3DVertex</code> class in Irrlicht</li>
<li>vertex with texture coordinates; <code>irr::video::S3DVertex2TCoords</code> class</li>
<li>vertex with its tangent information; <code>irr::video::S3DVertexTangents</code> class</li>
</ol>
<p>All those are represented by <code>irr::video::S3DVertex</code> class or its children. Moreover, we do not
need nothing but the information on vertex’ coordinates in our case, so we may use only the
base class’ properties.</p>
<p>The code, creating trimesh collision shape is quite simple and straightforward:</p>
<pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">createTrimeshShape</span><span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>scene<span class="token double-colon punctuation">::</span>IMeshBuffer <span class="token operator">*</span>meshBuffer<span class="token punctuation">,</span> NewtonCollision <span class="token operator">*</span>treeCollision<span class="token punctuation">,</span>
                                     irr<span class="token double-colon punctuation">::</span>core<span class="token double-colon punctuation">::</span>vector3df scale <span class="token operator">=</span> irr<span class="token double-colon punctuation">::</span>core<span class="token double-colon punctuation">::</span><span class="token function">vector3df</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    irr<span class="token double-colon punctuation">::</span>core<span class="token double-colon punctuation">::</span>vector3df vArray<span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    irr<span class="token double-colon punctuation">::</span>video<span class="token double-colon punctuation">::</span>S3DVertex <span class="token operator">*</span>mb_vertices <span class="token operator">=</span> <span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>video<span class="token double-colon punctuation">::</span>S3DVertex <span class="token operator">*</span><span class="token punctuation">)</span> meshBuffer<span class="token operator">-></span><span class="token function">getVertices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    u16 <span class="token operator">*</span>mb_indices <span class="token operator">=</span> meshBuffer<span class="token operator">-></span><span class="token function">getIndices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> meshBuffer<span class="token operator">-></span><span class="token function">getIndexCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> j <span class="token operator">+=</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> v1i <span class="token operator">=</span> mb_indices<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> v2i <span class="token operator">=</span> mb_indices<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> v3i <span class="token operator">=</span> mb_indices<span class="token punctuation">[</span>j <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        vArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> mb_vertices<span class="token punctuation">[</span>v1i<span class="token punctuation">]</span><span class="token punctuation">.</span>Pos <span class="token operator">*</span> scale<span class="token punctuation">.</span>X<span class="token punctuation">;</span>
        vArray<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> mb_vertices<span class="token punctuation">[</span>v2i<span class="token punctuation">]</span><span class="token punctuation">.</span>Pos <span class="token operator">*</span> scale<span class="token punctuation">.</span>Y<span class="token punctuation">;</span>
        vArray<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">=</span> mb_vertices<span class="token punctuation">[</span>v3i<span class="token punctuation">]</span><span class="token punctuation">.</span>Pos <span class="token operator">*</span> scale<span class="token punctuation">.</span>Z<span class="token punctuation">;</span>

        <span class="token function">NewtonTreeCollisionAddFace</span><span class="token punctuation">(</span>treeCollision<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>vArray<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>X<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>core<span class="token double-colon punctuation">::</span>vector3df<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
<p>We take the edges <em>(indices)</em>, find their vertices, create a triangle - and we’re done!
You may have noticed, we do not actually create the collision shape here - we take it as
an argument for our function. You will see why this is done that way in a moment.</p>
<p>Now it’s body’s turn! But we need to extend our <code>Entity</code> class with the <code>NewtonBody</code>
field so that we can seamlesly integrate it to our engine:</p>
<pre><code class="language-cpp"><span class="token keyword">class</span> <span class="token class-name">Entity</span> <span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>mNode<span class="token punctuation">;</span>
    NewtonBody <span class="token operator">*</span>mBody<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Entity</span><span class="token punctuation">(</span>scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">mNode</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">mBody</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    <span class="token function">Entity</span><span class="token punctuation">(</span>scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node<span class="token punctuation">,</span> NewtonBody <span class="token operator">*</span>body<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">mNode</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">mBody</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>

    scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span><span class="token function">getSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mNode<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    NewtonBody <span class="token operator">*</span><span class="token function">getBody</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">const</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> mBody<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">setBody</span><span class="token punctuation">(</span>NewtonBody <span class="token operator">*</span>body<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mBody <span class="token operator">=</span> body<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
<p>And now we are ready to set our <code>NewtonBody</code>:</p>
<pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">createMeshBody</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Entity <span class="token operator">*</span>entity <span class="token operator">=</span> entities<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">;</span>
    irr<span class="token double-colon punctuation">::</span>scene<span class="token double-colon punctuation">::</span>IMeshSceneNode <span class="token operator">*</span>node <span class="token operator">=</span> <span class="token punctuation">(</span>irr<span class="token double-colon punctuation">::</span>scene<span class="token double-colon punctuation">::</span>IMeshSceneNode <span class="token operator">*</span><span class="token punctuation">)</span> entity<span class="token operator">-></span><span class="token function">getSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    NewtonCollision <span class="token operator">*</span>shape <span class="token operator">=</span> <span class="token function">NewtonCreateTreeCollision</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonTreeCollisionBeginBuild</span><span class="token punctuation">(</span>shape<span class="token punctuation">)</span><span class="token punctuation">;</span>

    irr<span class="token double-colon punctuation">::</span>scene<span class="token double-colon punctuation">::</span>IMesh <span class="token operator">*</span>mesh <span class="token operator">=</span> node<span class="token operator">-></span><span class="token function">getMesh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mesh<span class="token operator">-></span><span class="token function">getMeshBufferCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        irr<span class="token double-colon punctuation">::</span>scene<span class="token double-colon punctuation">::</span>IMeshBuffer <span class="token operator">*</span>mb <span class="token operator">=</span> mesh<span class="token operator">-></span><span class="token function">getMeshBuffer</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">createTrimeshShape</span><span class="token punctuation">(</span>mb<span class="token punctuation">,</span> shape<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getScale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">NewtonTreeCollisionEndBuild</span><span class="token punctuation">(</span>shape<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">float</span> mass <span class="token operator">=</span> <span class="token number">0.0f</span><span class="token punctuation">;</span>

    dMatrix origin<span class="token punctuation">;</span>
    <span class="token function">NewtonCollisionGetMatrix</span><span class="token punctuation">(</span>shape<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    NewtonBody <span class="token operator">*</span>body <span class="token operator">=</span> <span class="token function">NewtonCreateDynamicBody</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">,</span> shape<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dVector inertia<span class="token punctuation">;</span>
    <span class="token function">NewtonConvexCollisionCalculateInertialMatrix</span><span class="token punctuation">(</span>shape<span class="token punctuation">,</span> <span class="token operator">&amp;</span>inertia<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonBodySetMassMatrix</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> mass<span class="token punctuation">,</span> mass <span class="token operator">*</span> inertia<span class="token punctuation">.</span>m_x<span class="token punctuation">,</span> mass <span class="token operator">*</span> inertia<span class="token punctuation">.</span>m_y<span class="token punctuation">,</span> mass <span class="token operator">*</span> inertia<span class="token punctuation">.</span>m_z<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonBodySetCentreOfMass</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">NewtonDestroyCollision</span><span class="token punctuation">(</span>shape<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">NewtonBodySetTransformCallback</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> transformCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonBodySetForceAndTorqueCallback</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> applyForceAndTorqueCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">NewtonBodySetUserData</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> entity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonInvalidateCache</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">)</span><span class="token punctuation">;</span>

    entity<span class="token operator">-></span><span class="token function">setBody</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>There is an interesting piece here, though: we used recursion to create collision shape…
But if you remember, we did not create collision shape with our <code>createTrimeshShape</code> method -
all we do in that method is that we add new triangles to the existing shape. That’s because meshes
in Irrlicht are stored as a tree structure - they may have sub-meshes, which are still
parts of the whole mesh. And they can have their sub-meshes too. So we created a blank
collision shape and fill it with new parts of the mesh.</p>
<p>Doing it that way prevents us from overcomplicating the task and building a composite mesh,
made of a set of trimeshes. That would be really hard to calculate in real-time! And our
really simple scene would work with the speed of 5x5 battle in Unreal Tournament 3…</p>
<p>Looking back to our list, we should now fill out all the fields for our <code>NewtonBody</code>. And since
we are making the static model, we will set its mass to zero. This is enough for Newton to
treat our body as the static one. I placed the other code to show the other fields, we need
to fill in case we have a “usual” body.</p>
<p>So the other fields of <code>NewtonBody</code> are:</p>
<ol>
<li><code>massMatrix</code>, which determines how the mass is spread along the body</li>
<li><code>transformCallback</code> and <code>forceAndTorqueCallback</code> are two mandatory fields, required by Newton</li>
<li><code>userData</code>, which will hold the pointer to the whole entity</li>
</ol>
<p><code>massMatrix</code> could be calculated automatically from the collision shape, like in our case.
Without digging much into details, we will simply set it so the mass of our body is distributed
uniformely.</p>
<p><code>transformCallback</code> is the function, which will be called for our body each time it changes its
position due to the interaction with other bodies inside <code>NewtonWorld</code>.</p>
<p><code>forceAndTorqueCallback</code> is the function, which applies forces and torques to our body. This is
a bit tricky, but you need to keep track of each force and torque by yourself and then apply
them in a way that they summ up and create the final force, influencing the body. We will
talk about it later, when we will deal with impulses.</p>
<p>So, the <code>transformCallback</code>:</p>
<pre><code class="language-cpp"><span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">transformCallback</span><span class="token punctuation">(</span><span class="token keyword">const</span> NewtonBody <span class="token operator">*</span>body<span class="token punctuation">,</span> <span class="token keyword">const</span> dFloat <span class="token operator">*</span>matrix<span class="token punctuation">,</span> <span class="token keyword">int</span> threadIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Entity <span class="token operator">*</span>entity <span class="token operator">=</span> <span class="token punctuation">(</span>Entity <span class="token operator">*</span><span class="token punctuation">)</span> <span class="token function">NewtonBodyGetUserData</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
    scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node <span class="token operator">=</span> entity<span class="token operator">-></span><span class="token function">getSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>node<span class="token punctuation">)</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>

    core<span class="token double-colon punctuation">::</span>matrix4 transform<span class="token punctuation">;</span>
    transform<span class="token punctuation">.</span><span class="token function">setM</span><span class="token punctuation">(</span>matrix<span class="token punctuation">)</span><span class="token punctuation">;</span>

    node<span class="token operator">-></span><span class="token function">setPosition</span><span class="token punctuation">(</span>transform<span class="token punctuation">.</span><span class="token function">getTranslation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    node<span class="token operator">-></span><span class="token function">setRotation</span><span class="token punctuation">(</span>transform<span class="token punctuation">.</span><span class="token function">getRotationDegrees</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Nothing tricky here.</p>
<p>To put everything in place, let’s add a sphere to our scene. The process is totally same,
except of the collision shape creation - in case of primitives like box, sphere or cylinder,
it is much more easy than with trimeshes - you do not need to loop through any indices or
vertices - just set shape params like dimensions or radius. And body creation process is
totally same.</p>
<pre><code class="language-cpp"><span class="token keyword">void</span> <span class="token function">createSphereNode</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> <span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string textureFile<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node <span class="token operator">=</span> smgr<span class="token operator">-></span><span class="token function">addSphereSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        node<span class="token operator">-></span><span class="token function">setMaterialTexture</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> driver<span class="token operator">-></span><span class="token function">getTexture</span><span class="token punctuation">(</span>textureFile<span class="token punctuation">.</span><span class="token function">c_str</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        node<span class="token operator">-></span><span class="token function">setMaterialFlag</span><span class="token punctuation">(</span>video<span class="token double-colon punctuation">::</span>EMF_LIGHTING<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    entities<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Entity</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

NewtonCollision <span class="token operator">*</span><span class="token function">createSphereCollisionShape</span><span class="token punctuation">(</span>scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node<span class="token punctuation">,</span> <span class="token keyword">float</span> radius<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dQuaternion <span class="token function">q</span><span class="token punctuation">(</span>node<span class="token operator">-></span><span class="token function">getRotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>X<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getRotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Y<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getRotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Z<span class="token punctuation">,</span> <span class="token number">1.f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dVector <span class="token function">v</span><span class="token punctuation">(</span>node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>X<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Y<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Z<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dMatrix <span class="token function">origin</span><span class="token punctuation">(</span>q<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> shapeId <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token function">NewtonCreateSphere</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">,</span> radius<span class="token punctuation">,</span> shapeId<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">createSphereBody</span><span class="token punctuation">(</span><span class="token keyword">const</span> std<span class="token double-colon punctuation">::</span>string name<span class="token punctuation">,</span> <span class="token keyword">float</span> radius<span class="token punctuation">,</span> <span class="token keyword">float</span> mass<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    Entity <span class="token operator">*</span>entity <span class="token operator">=</span> entities<span class="token punctuation">[</span>name<span class="token punctuation">]</span><span class="token punctuation">;</span>
    scene<span class="token double-colon punctuation">::</span>ISceneNode <span class="token operator">*</span>node <span class="token operator">=</span> entity<span class="token operator">-></span><span class="token function">getSceneNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dQuaternion <span class="token function">q</span><span class="token punctuation">(</span>node<span class="token operator">-></span><span class="token function">getRotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>X<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getRotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Y<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getRotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Z<span class="token punctuation">,</span> <span class="token number">1.f</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dVector <span class="token function">v</span><span class="token punctuation">(</span>node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>X<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Y<span class="token punctuation">,</span> node<span class="token operator">-></span><span class="token function">getPosition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Z<span class="token punctuation">)</span><span class="token punctuation">;</span>
    dMatrix <span class="token function">origin</span><span class="token punctuation">(</span>q<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> shapeId <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    NewtonCollision <span class="token operator">*</span>shape <span class="token operator">=</span> <span class="token function">NewtonCreateSphere</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">,</span> radius<span class="token punctuation">,</span> shapeId<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dMatrix origin<span class="token punctuation">;</span>
    <span class="token function">NewtonCollisionGetMatrix</span><span class="token punctuation">(</span>shape<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    NewtonBody <span class="token operator">*</span>body <span class="token operator">=</span> <span class="token function">NewtonCreateDynamicBody</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">,</span> shape<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    dVector inertia<span class="token punctuation">;</span>
    <span class="token function">NewtonConvexCollisionCalculateInertialMatrix</span><span class="token punctuation">(</span>shape<span class="token punctuation">,</span> <span class="token operator">&amp;</span>inertia<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonBodySetMassMatrix</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> mass<span class="token punctuation">,</span> mass <span class="token operator">*</span> inertia<span class="token punctuation">.</span>m_x<span class="token punctuation">,</span> mass <span class="token operator">*</span> inertia<span class="token punctuation">.</span>m_y<span class="token punctuation">,</span> mass <span class="token operator">*</span> inertia<span class="token punctuation">.</span>m_z<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonBodySetCentreOfMass</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> <span class="token operator">&amp;</span>origin<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">NewtonDestroyCollision</span><span class="token punctuation">(</span>shape<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">NewtonBodySetTransformCallback</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> transformCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonBodySetForceAndTorqueCallback</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> applyForceAndTorqueCallback<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">NewtonBodySetUserData</span><span class="token punctuation">(</span>body<span class="token punctuation">,</span> entity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">NewtonInvalidateCache</span><span class="token punctuation">(</span>newtonWorld<span class="token punctuation">)</span><span class="token punctuation">;</span>

    entity<span class="token operator">-></span><span class="token function">setBody</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Have no fear about code duplication - we will remove it later. When you are done, you should
get picture like this one:</p>
<LazyImg src="/images/irrlicht-newton-tutorials/collision_shapes/ramp_with_ball.webp" alt="First completed dynamic scene" class="img-responsive" />

<p>Congrats! That’s our first completed dynamic scene!</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>