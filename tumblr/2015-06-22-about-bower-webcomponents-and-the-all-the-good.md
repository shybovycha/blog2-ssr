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

    <main class="svelte-1gr3n62"><article><h1>About Bower, WebComponents and the all the good</h1>

    <time>22 Jun 2015 at 12:23</time>

    <div class="content"><LazyImg src="/images/Pg-02-shakespeare-getty.webp" />

<h2 id="bem">BEM</h2>
<p>These days, many web developers use different methodologies to make their web page source look structured and clean. But all those methodologies only work well until you use third-party libraries or involve a new person in your project.</p>
<!--more-->

<p>BEM <em>(Block Element Modifier)</em> is a convention for naming CSS classes in a such way so they do not overlap.
Doing so you may turn your page into a set of independent blocks, or <em>components</em>. According to BEM,
you name your CSS classes as follows: <code>BlockName__ElementName__ElementModifier</code>.</p>
<p><code>BlockName</code> is a name of a <em>component</em>, your element belongs to. This may be a menu, a gallery or a widget,
for example.</p>
<p><code>ElementName</code> is a name of element of the block. Good examples of elements are label, title, avatar, menu_item,
etc.</p>
<p><code>ElementModifier</code> is a more complex thing. This is a state of element, which defines how element may look
like in a certain conditions. This may be a checkbox’ <code>checked</code> status, <code>focus</code> property or <code>is_menu_opened</code>
flag. Modifier may have one of two types:</p>
<ul>
<li><code>boolean</code>, where modifier is just a flag, showing if element’s property is active or not</li>
<li><code>key-value</code>, where modifier points to one of many possible property values</li>
</ul>
<p>For example, boolean modifiers are: <code>checked</code>, <code>big</code> (is element big or not), <code>hovered</code>, <code>opened</code>, etc.
Key-value modifiers may be, for instance, <code>menu_type_bullet</code> or <code>menu_type_numbers</code>, <code>menu_top</code>, <code>menu_left</code>
or <code>menu_right</code> (representing menu’ position).</p>
<p>Combining those three you may determine the look of any element and its state:</p>
<pre><code class="language-css"><span class="token selector">.navigation__menu__position_left</span> <span class="token punctuation">{</span>...<span class="token punctuation">}</span>
<span class="token selector">.navigation__menu__position_right</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>

<span class="token selector">.top_menu__avatar__small</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>
<span class="token selector">.top_menu__avatar__medium</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>

<span class="token comment">/* more meaningful */</span>
<span class="token selector">.user_widget__avatar__menu_position_top</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>
<span class="token selector">.user_widget__avatar__menu_position_left</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>
<span class="token selector">.user_widget__avatar__menu_position_right</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>

<span class="token comment">/* more simple */</span>
<span class="token selector">.button__big</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>
<span class="token selector">.button__red</span> <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>
</code></pre>
<p>The aim of BEM is great - to make the web page use independent blocks with some structured <strong>CSS class names</strong> and have them all described in a nice way in the CSS files. Whilst it may sound like a Holy Grail for the Web, let’s take a look at a real-world example of how BEM is used.</p>
<p>There are, in fact, two approaches of BEM.</p>
<p><strong>The old approach</strong></p>
<p>Below is an example of vanilla BEM:</p>
<pre><code class="language-css"><span class="token selector">.bwelcome__message.hidden</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.bwelcome__message</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
    <span class="token property">border-radius</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.bwelcome__label</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 12pt<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.bwelcome__input</span> <span class="token punctuation">{</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
<p>And the HTML:</p>
<pre><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bwelcome<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bwelcome__message hiddent<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Hello, username!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bwelcome__label<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Enter your name:<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bwelcome__input<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre>
<p>So, here we can see that any styles should not overlap with the defined ones unless they are written in a BEM-way for the same element. Nice idea,implementation not so nice… All these <code>b#{block}__#{element}</code> classes are way too long, don’t you think? Writing them everywhere - HTML, CSS and JavaScript - is really painful.</p>
<p><strong>The new approach</strong></p>
<p>But what about the newer version of BEM? Its authors developed a toolbox with their own framework,
containing many tools to help you use BEM methodology. It contains two interesting tools - <strong>BEMJSON</strong>
and <strong>BEMHTML</strong>. Those two allow you to define your views with JavaScript and JSON.</p>
<p>To use them, just install <code>bem</code> with <code>npm</code>: <code>npm install bem</code>. Then you will be able to create your pages
with either BEM, BEMTREE, BEMHTML and BEMJSON. This has two advantages to writing pages by your own:</p>
<ol>
<li>they come with plugins, so you may have some parts of CSS ready to use out-of-the-box</li>
<li>it replaces writing all the selectors manually with writing them via commands of the <code>bem</code> utility</li>
</ol>
<p>For instance, here’s how your page may look like when being made with BEMHTML:</p>
<pre><code class="language-js"><span class="token punctuation">(</span><span class="token punctuation">{</span>
     <span class="token literal-property property">block</span><span class="token operator">:</span> <span class="token string">'page'</span><span class="token punctuation">,</span>
     <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span>
     <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span>
         <span class="token punctuation">{</span> <span class="token literal-property property">elem</span><span class="token operator">:</span> <span class="token string">'css'</span><span class="token punctuation">,</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'_hello.css'</span> <span class="token punctuation">}</span>
     <span class="token punctuation">]</span><span class="token punctuation">,</span>
     <span class="token literal-property property">scripts</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token literal-property property">elem</span><span class="token operator">:</span> <span class="token string">'js'</span><span class="token punctuation">,</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'_hello.js'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
     <span class="token literal-property property">mods</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token string">'islands'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token punctuation">[</span>
         <span class="token punctuation">{</span>
             <span class="token literal-property property">block</span><span class="token operator">:</span> <span class="token string">'hello'</span><span class="token punctuation">,</span>
             <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                 <span class="token punctuation">{</span>
                     <span class="token literal-property property">elem</span><span class="token operator">:</span> <span class="token string">'greeting'</span><span class="token punctuation">,</span>
                     <span class="token literal-property property">content</span><span class="token operator">:</span> <span class="token string">'Hello, %username%!'</span>
                  <span class="token punctuation">}</span>
             <span class="token punctuation">]</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">]</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>
<p>And here’s how it may look like when made with BEMJSON:</p>
<pre><code class="language-js">exports<span class="token punctuation">.</span>deps <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">"block"</span><span class="token operator">:</span> <span class="token string">"page"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"elem"</span><span class="token operator">:</span> <span class="token string">"css"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"attrs"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"src"</span><span class="token operator">:</span> <span class="token string">"_hello.css"</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">"block"</span><span class="token operator">:</span> <span class="token string">"page"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"elem"</span><span class="token operator">:</span> <span class="token string">"js"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"attrs"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"src"</span><span class="token operator">:</span> <span class="token string">"_hello.js"</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">"block"</span><span class="token operator">:</span> <span class="token string">"page"</span><span class="token punctuation">,</span>
        <span class="token string-property property">"elem"</span><span class="token operator">:</span> <span class="token string">"meta"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">"block"</span><span class="token operator">:</span> <span class="token string">"header"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">"block"</span><span class="token operator">:</span> <span class="token string">"content"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
        <span class="token string-property property">"block"</span><span class="token operator">:</span> <span class="token string">"footer"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre>
<p>Those two may work both together, when you define general page structure with BEMJSON and each block you
define with BEMHTML, or separatedly, when you define all your page in either BEMJSON or BEMHTML.</p>
<p>But anyway, in BEMJSON or BEMHTML or whatever, the whole page is described in one JS file, which will then be compiled into an HTML page. Using this approach allows you not only to pack the blocks and elements into one structure, but also to spice it up with some JavaScript, which handles those components.</p>
<p>Sounds great and may be somewhat helpful for new projects. But I believe there’s a better solution.</p>
<h2 id="introducing-webcomponents">Introducing WebComponents</h2>
<p>Although the implementation of BEM is clumsy, the idea is really great! This is just like encapsulation in OOP - one of the mightiest principles in programming. But what better options are there than BEM?</p>
<p>Recently we have all seen great changes to the Web. We now have ES6, CSS3, HTML5 and all of them give us ultimate power! Support for old browsers is now provided with hacks called <em>polyfills</em>. But why should we stop ourselves using the best of what we have in the name of <a href="http://gs.statcounter.com/#browser_version-ww-monthly-201405-201505">3% of Internet users</a>? Well, if you really do have to continue supporting all of those, you could just stop reading now. Or you could concentrate all your will and try out all these brand-new features in your pet project.</p>
<p>So, the new approach in web design encapsulation uses WebComponents. This is a technology, which does not
works everywhere. This is contraversary to a BEM methodology, where you only define a CSS classes, which
are supported since very early CSS versions.</p>
<p>So, welcome the WebComponents’ example:</p>
<pre><code class="language-handlebars">
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>welcome-component<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.message</span> <span class="token punctuation">{</span>
          <span class="token property">background-color</span><span class="token punctuation">:</span> #fea<span class="token punctuation">;</span>
          <span class="token property">padding</span><span class="token punctuation">:</span> 10px 20px<span class="token punctuation">;</span>
          <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
          <span class="token property">border-radius</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
          <span class="token property">font-family</span><span class="token punctuation">:</span> Arial<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>message<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Hello, <span class="token handlebars language-handlebars"><span class="token delimiter punctuation">{{</span><span class="token variable">name</span><span class="token delimiter punctuation">}}</span></span>!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>shadow-host<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>message<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Non-component message<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text/javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">var</span> host <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.shadow-host'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        template <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#welcome-component'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        shadow <span class="token operator">=</span> host<span class="token punctuation">.</span><span class="token function">createShadowRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    shadow<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span>content<span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre>
<p>This code may not look so good, as it might, but it works like a charm!</p>
<p><a href="http://codepen.io/shybovycha/pen/gpGJOV">Run this code</a></p>
<LazyImg src="/tumblr_files/tumblr_inline_nqciwfuAqT1qh5oee_540.png" alt="image" />

<p>This example is a bit ugly - it has both CSS, HTML and JavaScript mixed in a single file, but we’ll deal with it for a short time. Just think of the power you’ve got! You can define your own… well, it’s certainly kinda components! It is a bit uncomfortable to paste onto a page… and they are hardly ready to be used with something like Angular.</p>
<p>Well, yeah, this is as ugly as BEM.</p>
<p>But now you defined a component of your web-page, which you can then reuse with copying just one portion
of XHTML in place. And placing it inside a totally different web page will not break it down - both
HTML and CSS are separated and isolated and will not overlap with any other style or martkup. But
let’s try out our web component!</p>
<h2 id="bower">Bower</h2>
<p>Earlier I did not need to use any package managers except <code>gem</code> and <code>apt-get</code>. Yet, I was not so stupid as to install all the javascript libraries my project needs with RubyGems. On my projects I had to download the necessary library versions and store them in the <code>assets/javascripts</code> directory. Forever. Or at the very least an upgrade was needed.</p>
<p>But then I tried Bower. It was so easy to manage my assets! So I highly recommend this way to you, dear Reader!</p>
<p>To use Bower from scratch on a brand new project, you need to</p>
<ol>
<li>install Bower with <code>npm</code></li>
<li>ininitialize your project with <code>bower init</code></li>
<li>define dependencies in the <code>dependencies</code> object in your new <code>bower.json</code> file</li>
<li>install them with <code>bower install</code></li>
</ol>
<p>Then you should end up with all your libraries in the <code>bower_components</code> directory. And that’s it! Every package has its own dir. So you can keep track of all the versions etc.</p>
<h2 id="polymer">Polymer</h2>
<p>Let’s start cooking our demo with <a href="https://www.polymer-project.org/">Polymer</a>. First, initialize the Bower project and add this section to your fresh <code>bower.json</code> file:</p>
<pre><code class="language-js"><span class="token string-property property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"polymer"</span><span class="token operator">:</span> <span class="token string">"Polymer/polymer#^1.0.0"</span>
<span class="token punctuation">}</span>
</code></pre>
<p>Then run <code>bower install</code>. This will provide you with all the stuff you need.</p>
<p>Now we will move our pretty <code>welcome-component</code> to a new place. Create two files:<code>welcome-component.html</code> and <code>index.html</code>. Fill the last one with <a href="http://docs.emmet.io/">Emmet</a>:</p>
<pre><code class="language-pug"><span class="token tag">html<span class="token punctuation">:</span></span><span class="token tag">5</span>
</code></pre>
<p><em>(you need to hit the “Expand” key, formerly Tab, at the end of this single line while editing the<code>index.html</code></em> <em>file in an Emmet-powered editor)</em>. And add just a single line within the HTML’ <code>&lt;body&gt;</code> tag:</p>
<pre><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>welcome-component</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>welcome-component</span><span class="token punctuation">></span></span>
</code></pre>
<p>Now let’s define our new component in <code>welcome-component.html</code>:</p>
<pre><code class="language-handlebars">
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dom-module</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>welcome-component<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">.message</span> <span class="token punctuation">{</span>
          <span class="token property">background-color</span><span class="token punctuation">:</span> #fea<span class="token punctuation">;</span>
          <span class="token property">padding</span><span class="token punctuation">:</span> 10px 20px<span class="token punctuation">;</span>
          <span class="token property">text-align</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
          <span class="token property">border-radius</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
          <span class="token property">font-family</span><span class="token punctuation">:</span> Arial<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>message<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Hello, <span class="token handlebars language-handlebars"><span class="token delimiter punctuation">{{</span> <span class="token variable">name</span> <span class="token delimiter punctuation">}}</span></span>!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token function">Polymer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">is</span><span class="token operator">:</span> <span class="token string">"welcome-component"</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dom-module</span><span class="token punctuation">></span></span>
</code></pre>
<p>Now, add our new component importing to the <code>&lt;head&gt;</code> tag of the <code>index.html</code> file:</p>
<pre><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>import<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bower_components/polymer/polymer.html<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> <span class="token comment">&lt;!-- imports Polymer --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>import<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>welcome-component.html<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span> <span class="token comment">&lt;!-- imports our component --></span>
</code></pre>
<p>To run this quickly, you might want to use <code>http-server</code> from <code>npm</code>:</p>
<pre><code class="language-bash">http-server -o --cors
</code></pre>
<p>And voila! We’ve just made a nice web component, which could be used really simply. And the code is totally clean!</p>
<p>If you look at the HTML source, you’d see a beautiful DOM structure: we’ve got our <code>&lt;div class=&quot;message&quot;&gt;</code> within the <code>&lt;welcome-component&gt;</code> tag. And its style will never affect any other elements, even when you create another <code>&lt;div&gt;</code> outside the <code>&lt;welcome-component&gt;</code>. Seriously, you can try it!</p>
<p>Yeah, I know we’ve used Polymer and that’s cheating. But think of it as of a temporary hack you will remove when your browser starts supporting custom tags.</p>
<h2 id="custom-attributes-for-custom-tags">Custom attributes for custom tags</h2>
<p>Now, the last thing I’d like to show is the attributes for our custom components. We’d like to pass some data to our brand new components easily, right? So, let’s define a <code>name</code> attribute, which we’ll show instead of it!</p>
<p>To do this, we shall use two Polymer features. First of all, let’s define our attribute, adding this section to our <code>Polymer()</code> call:</p>
<pre><code class="language-js"><span class="token function">Polymer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token literal-property property">properties</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> String
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>Now that we’ve defined our attribute THAT simply, we should use it somehow. Polymer allows us to define a method, which will be called once the component gets inserted into a webpage:</p>
<pre><code class="language-js"><span class="token function">Polymer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token function-variable function">ready</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.message'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">}</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
<p>As long as you’re riding <s>IOJS</s> NodeJS 5.0+, you can use the ES6 string interpolation feature, as in the example above =) Here, the <code>this</code> variable is bound to the <code>&lt;welcome-component&gt;</code> tag. So in order to change the <code>.message</code> tag’s HTML, we need to find it first. For this purpose I’ve used the HTML5 <code>querySelector</code> method.</p>
<p>Cool enough, right?</p>
<h2 id="conclusion-goes-here">Conclusion goes here</h2>
<p>To end-up this short tutorial on WebComponents, I would like to suggest you to read some other tutorials, especially the <a href="http://webcomponents.org/articles">WebComponents website</a>. And never stop trying something new!</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>