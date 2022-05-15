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

    <main class="svelte-1gr3n62"><article><h1>Strongly-typed front-end: experiment 2, simple application, in F#</h1>

    <time>19 Apr 2021 at 00:23</time>

    <div class="content"><p>In F# world, there is a framework called <a href="https://fable.io/">Fable</a>. It allows one to compile their F# code to JavaScript. There is a built-in package for React, but Fable developers themselves <a href="https://fable.io/docs/your-fable-project/use-a-fable-library.html">suggest</a> using <a href="https://elmish.github.io/">Elmish</a>, which is a framework similar to Elm, just suited for F#.</p>
<p>A sample Elmish application in the <a href="https://fable.io/repl/">online editor</a> looks like this:</p>
<pre><code class="language-fsharp"><span class="token keyword">module</span> Elmish<span class="token punctuation">.</span>SimpleInput

<span class="token comment">(**
Minimal application showing how to use Elmish
You can find more info about Emish architecture and samples at https://elmish.github.io/
*)</span>

<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>Core<span class="token punctuation">.</span>JsInterop
<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>React
<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>React<span class="token punctuation">.</span>Props
<span class="token keyword">open</span> Elmish
<span class="token keyword">open</span> Elmish<span class="token punctuation">.</span>React

<span class="token comment">// MODEL</span>

<span class="token keyword">type</span> <span class="token class-name">Model</span> <span class="token operator">=</span>
    <span class="token punctuation">{</span> Value <span class="token punctuation">:</span> <span class="token class-name">string</span> <span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Msg</span> <span class="token operator">=</span>
    <span class="token operator">|</span> ChangeValue <span class="token keyword">of</span> <span class="token class-name">string</span>

<span class="token keyword">let</span> init <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span> Value <span class="token operator">=</span> <span class="token string">""</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none

<span class="token comment">// UPDATE</span>

<span class="token keyword">let</span> update <span class="token punctuation">(</span>msg<span class="token punctuation">:</span><span class="token class-name">Msg</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>model<span class="token punctuation">:</span><span class="token class-name">Model</span><span class="token punctuation">)</span> <span class="token operator">=</span>
    <span class="token keyword">match</span> msg <span class="token keyword">with</span>
    <span class="token operator">|</span> ChangeValue newValue <span class="token operator">-></span>
        <span class="token punctuation">{</span> model <span class="token keyword">with</span> Value <span class="token operator">=</span> newValue <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none

<span class="token comment">// VIEW (rendered with React)</span>

<span class="token keyword">let</span> view model dispatch <span class="token operator">=</span>
    div <span class="token punctuation">[</span> Class <span class="token string">"main-container"</span> <span class="token punctuation">]</span>
        <span class="token punctuation">[</span> input <span class="token punctuation">[</span> Class <span class="token string">"input"</span>
                  Value model<span class="token punctuation">.</span>Value
                  OnChange <span class="token punctuation">(</span><span class="token keyword">fun</span> ev <span class="token operator">-></span> ev<span class="token punctuation">.</span>target<span class="token operator">?</span>value <span class="token operator">|></span> string <span class="token operator">|></span> ChangeValue <span class="token operator">|></span> dispatch<span class="token punctuation">)</span> <span class="token punctuation">]</span>
          span <span class="token punctuation">[</span> <span class="token punctuation">]</span>
            <span class="token punctuation">[</span> str <span class="token string">"Hello, "</span>
              str model<span class="token punctuation">.</span>Value
              str <span class="token string">"!"</span> <span class="token punctuation">]</span> <span class="token punctuation">]</span>

<span class="token comment">// App</span>
Program<span class="token punctuation">.</span>mkProgram init update view
<span class="token operator">|></span> Program<span class="token punctuation">.</span>withConsoleTrace
<span class="token operator">|></span> Program<span class="token punctuation">.</span>withReactSynchronous <span class="token string">"elmish-app"</span>
<span class="token operator">|></span> Program<span class="token punctuation">.</span>run
</code></pre>
<p>One can easily see the similarities to Elm (or so I think).</p>
<!--more-->

<p>Rewriting it to the application from above should not be a problem, right?</p>
<pre><code class="language-fsharp"><span class="token keyword">module</span> Elmish<span class="token punctuation">.</span>SimpleInput

<span class="token comment">(**
Minimal application showing how to use Elmish
You can find more info about Emish architecture and samples at https://elmish.github.io/
*)</span>

<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>Core<span class="token punctuation">.</span>JsInterop
<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>React
<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>React<span class="token punctuation">.</span>Props
<span class="token keyword">open</span> Elmish
<span class="token keyword">open</span> Elmish<span class="token punctuation">.</span>React
<span class="token keyword">open</span> System

<span class="token comment">// MODEL</span>

<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Rectangle <span class="token operator">|</span> Circle

<span class="token keyword">let</span> calculateArea <span class="token punctuation">(</span>shape<span class="token punctuation">:</span> <span class="token class-name">Shape</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token class-name">float</span><span class="token punctuation">)</span> <span class="token operator">=</span>
    <span class="token keyword">match</span> shape <span class="token keyword">with</span>
    <span class="token operator">|</span> Circle <span class="token operator">-></span> value <span class="token operator">*</span> value <span class="token operator">*</span> Math<span class="token punctuation">.</span>PI
    <span class="token operator">|</span> Rectangle <span class="token operator">-></span> value <span class="token operator">*</span> value

<span class="token keyword">type</span> <span class="token class-name">Model</span> <span class="token operator">=</span>
    <span class="token punctuation">{</span> shape <span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span>Shape<span class="token operator">></span><span class="token punctuation">;</span> value<span class="token punctuation">:</span> <span class="token class-name">float</span><span class="token punctuation">;</span> area<span class="token punctuation">:</span> <span class="token class-name">float</span> <span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Msg</span> <span class="token operator">=</span>
    <span class="token operator">|</span> ShapeChanged <span class="token keyword">of</span> <span class="token class-name">Shape</span>
    <span class="token operator">|</span> ValueChanged <span class="token keyword">of</span> <span class="token class-name">float</span>
    <span class="token operator">|</span> CalculateArea

<span class="token keyword">let</span> init <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span> value <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span> shape <span class="token operator">=</span> Option<span class="token punctuation">.</span>None<span class="token punctuation">;</span> area <span class="token operator">=</span> <span class="token number">0.0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none

<span class="token comment">// UPDATE</span>

<span class="token keyword">let</span> update <span class="token punctuation">(</span>msg<span class="token punctuation">:</span> <span class="token class-name">Msg</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>model<span class="token punctuation">:</span> <span class="token class-name">Model</span><span class="token punctuation">)</span> <span class="token operator">=</span>
    <span class="token keyword">match</span> msg <span class="token keyword">with</span>
    <span class="token operator">|</span> ValueChanged newValue <span class="token operator">-></span>
        <span class="token punctuation">{</span> model <span class="token keyword">with</span> value <span class="token operator">=</span> newValue <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none
    <span class="token operator">|</span> ShapeChanged newShape <span class="token operator">-></span>
        <span class="token punctuation">{</span> model <span class="token keyword">with</span> shape <span class="token operator">=</span> newShape <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none
    <span class="token operator">|</span> CalculateArea <span class="token operator">-></span>
        <span class="token punctuation">{</span> model <span class="token keyword">with</span> area <span class="token operator">=</span> calculateArea model<span class="token punctuation">.</span>shape model<span class="token punctuation">.</span>value <span class="token punctuation">}</span>

<span class="token comment">// VIEW (rendered with React)</span>

<span class="token keyword">let</span> view model dispatch <span class="token operator">=</span>
    div <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span> <span class="token keyword">select</span> <span class="token punctuation">[</span> OnChange <span class="token punctuation">(</span><span class="token keyword">fun</span> evt <span class="token operator">-></span> evt<span class="token punctuation">.</span>target<span class="token operator">?</span>value <span class="token operator">|></span> string <span class="token operator">|></span> ShapeChanged <span class="token operator">|></span> dispatch<span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span>
            option <span class="token punctuation">[</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> str <span class="token string">"Select shape"</span> <span class="token punctuation">]</span>
            option <span class="token punctuation">[</span> Value <span class="token string">"circle"</span> <span class="token punctuation">]</span>
            option <span class="token punctuation">[</span> Value <span class="token string">"rectangle"</span> <span class="token punctuation">]</span>
          <span class="token punctuation">]</span>
          input <span class="token punctuation">[</span> Value model<span class="token punctuation">.</span>Value
                  OnChange <span class="token punctuation">(</span><span class="token keyword">fun</span> evt <span class="token operator">-></span> evt<span class="token punctuation">.</span>target<span class="token operator">?</span>value <span class="token operator">|></span> float <span class="token operator">|></span> ValueChanged <span class="token operator">|></span> dispatch<span class="token punctuation">)</span> <span class="token punctuation">]</span>
          button <span class="token punctuation">[</span> OnClick <span class="token punctuation">(</span><span class="token keyword">fun</span> evt <span class="token operator">-></span> dispatch CalculateArea<span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> str <span class="token string">"Calculate area"</span> <span class="token punctuation">]</span>
          span <span class="token punctuation">[</span> <span class="token punctuation">]</span>
            <span class="token punctuation">[</span> str <span class="token string">"Area: "</span>
              str model<span class="token punctuation">.</span>Area
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>

<span class="token comment">// App</span>
Program<span class="token punctuation">.</span>mkProgram init update view
<span class="token operator">|></span> Program<span class="token punctuation">.</span>withConsoleTrace
<span class="token operator">|></span> Program<span class="token punctuation">.</span>withReactSynchronous <span class="token string">"elmish-app"</span>
<span class="token operator">|></span> Program<span class="token punctuation">.</span>run
</code></pre>
<p>I deliberately skipped few things to check what errors will I get from the compiler.</p>
<p>Now to the errors:</p>
<pre><code>    | Circle -&gt; value * value * Math.PI
The value, constructor, namespace or type &#39;PI&#39; is not defined.
| ShapeChanged newShape -&gt;
        { model with shape = newShape }, Cmd.none
This expression was expected to have type
    &#39;Shape&#39;    
but here has type
    &#39;Shape option&#39;
| CalculateArea -&gt;
        { model with area = calculateArea model.shape model.value }
All branches of a pattern match expression must return values of the same type as the first branch, which here is &#39;Model * Cmd&lt;&#39;a&gt;&#39;. This branch returns a value of type &#39;Model&#39;.
[ select [ OnChange (fun evt -&gt; evt.target.value |&gt; string |&gt; ShapeChanged |&gt; dispatch) ] [
            option [ Value &quot;circle&quot; ]
            option [ Value &quot;rectangle&quot; ]
          ]
          
The type &#39;EventTarget&#39; does not define the field, constructor or member &#39;value&#39;.

Type mismatch. Expecting a
    &#39;string -&gt; &#39;a&#39;    
but given a
    &#39;Shape -&gt; Msg&#39;    
The type &#39;string&#39; does not match the type &#39;Shape&#39;

The type &#39;&#39;a -&gt; ReactElement&#39; is not compatible with the type &#39;ReactElement&#39; (x2)
span [ ]
            [ str &quot;Area: &quot;
              str model.Area
            ]
            
Lookup on object of indeterminate type based on information prior to this program point. A type annotation may be needed prior to this program point to constrain the type of the object. This may allow the lookup to be resolved.
</code></pre>
<p>The errors might be a tiny bit mysterious at times, but using simple intuition one can easily fix them all.</p>
<pre><code class="language-fsharp"><span class="token keyword">module</span> Elmish<span class="token punctuation">.</span>SimpleInput

<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>Core<span class="token punctuation">.</span>JsInterop
<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>React
<span class="token keyword">open</span> Fable<span class="token punctuation">.</span>React<span class="token punctuation">.</span>Props
<span class="token keyword">open</span> Elmish
<span class="token keyword">open</span> Elmish<span class="token punctuation">.</span>React

<span class="token keyword">open</span> System

<span class="token comment">// MODEL</span>

<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Rectangle <span class="token operator">|</span> Circle

<span class="token keyword">let</span> calculateArea <span class="token punctuation">(</span>shape<span class="token punctuation">:</span> <span class="token class-name">Shape</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token class-name">float</span><span class="token punctuation">)</span> <span class="token operator">=</span>
    <span class="token keyword">match</span> shape <span class="token keyword">with</span>
    <span class="token operator">|</span> Circle <span class="token operator">-></span> value <span class="token operator">*</span> value <span class="token operator">*</span> Math<span class="token punctuation">.</span>PI
    <span class="token operator">|</span> Rectangle <span class="token operator">-></span> value <span class="token operator">*</span> value

<span class="token keyword">let</span> getShape <span class="token punctuation">(</span>value<span class="token punctuation">:</span> <span class="token class-name">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> Option<span class="token operator">&lt;</span>Shape<span class="token operator">></span> <span class="token operator">=</span>
    <span class="token keyword">match</span> value <span class="token keyword">with</span>
    <span class="token operator">|</span> <span class="token string">"circle"</span> <span class="token operator">-></span> Option<span class="token punctuation">.</span>Some Circle
    <span class="token operator">|</span> <span class="token string">"rectangle"</span> <span class="token operator">-></span> Option<span class="token punctuation">.</span>Some Rectangle
    <span class="token operator">|</span> _ <span class="token operator">-></span> Option<span class="token punctuation">.</span>None

<span class="token keyword">type</span> <span class="token class-name">Model</span> <span class="token operator">=</span>
    <span class="token punctuation">{</span> shape <span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span>Shape<span class="token operator">></span><span class="token punctuation">;</span> value<span class="token punctuation">:</span> <span class="token class-name">float</span><span class="token punctuation">;</span> area<span class="token punctuation">:</span> <span class="token class-name">float</span> <span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Msg</span> <span class="token operator">=</span>
    <span class="token operator">|</span> ShapeChanged <span class="token keyword">of</span> <span class="token class-name">string</span>
    <span class="token operator">|</span> ValueChanged <span class="token keyword">of</span> <span class="token class-name">string</span>
    <span class="token operator">|</span> CalculateArea

<span class="token keyword">let</span> init <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span> value <span class="token operator">=</span> <span class="token number">0.0</span><span class="token punctuation">;</span> shape <span class="token operator">=</span> Option<span class="token punctuation">.</span>None<span class="token punctuation">;</span> area <span class="token operator">=</span> <span class="token number">0.0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none

<span class="token comment">// UPDATE</span>

<span class="token keyword">let</span> update <span class="token punctuation">(</span>msg<span class="token punctuation">:</span> <span class="token class-name">Msg</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>model<span class="token punctuation">:</span> <span class="token class-name">Model</span><span class="token punctuation">)</span> <span class="token operator">=</span>
    <span class="token keyword">match</span> msg <span class="token keyword">with</span>
    <span class="token operator">|</span> ValueChanged newValue <span class="token operator">-></span>
        <span class="token punctuation">{</span> model <span class="token keyword">with</span> value <span class="token operator">=</span> float newValue <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none
    <span class="token operator">|</span> ShapeChanged newShape <span class="token operator">-></span>
        <span class="token punctuation">{</span> model <span class="token keyword">with</span> shape <span class="token operator">=</span> getShape newShape <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none
    <span class="token operator">|</span> CalculateArea <span class="token operator">-></span>
        <span class="token keyword">let</span> newArea <span class="token operator">=</span> 
            Option<span class="token punctuation">.</span>map <span class="token punctuation">(</span><span class="token keyword">fun</span> shape <span class="token operator">-></span> calculateArea shape model<span class="token punctuation">.</span>value<span class="token punctuation">)</span> model<span class="token punctuation">.</span>shape
            <span class="token operator">|></span> Option<span class="token punctuation">.</span>defaultValue <span class="token number">0.0</span>
        <span class="token punctuation">{</span> model <span class="token keyword">with</span> area <span class="token operator">=</span> newArea <span class="token punctuation">}</span><span class="token punctuation">,</span> Cmd<span class="token punctuation">.</span>none

<span class="token comment">// VIEW</span>

<span class="token keyword">let</span> view model dispatch <span class="token operator">=</span>
    div <span class="token punctuation">[</span><span class="token punctuation">]</span>
        <span class="token punctuation">[</span> <span class="token keyword">select</span> <span class="token punctuation">[</span> OnChange <span class="token punctuation">(</span><span class="token keyword">fun</span> evt <span class="token operator">-></span> evt<span class="token punctuation">.</span>target<span class="token operator">?</span>value <span class="token operator">|></span> ShapeChanged <span class="token operator">|></span> dispatch<span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span>
            option <span class="token punctuation">[</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> str <span class="token string">"Select shape"</span> <span class="token punctuation">]</span>
            option <span class="token punctuation">[</span> Value <span class="token string">"circle"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> str <span class="token string">"Circle"</span> <span class="token punctuation">]</span>
            option <span class="token punctuation">[</span> Value <span class="token string">"rectangle"</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> str <span class="token string">"Rectangle"</span> <span class="token punctuation">]</span>
          <span class="token punctuation">]</span>
          input <span class="token punctuation">[</span> Value model<span class="token punctuation">.</span>value
                  OnChange <span class="token punctuation">(</span><span class="token keyword">fun</span> evt <span class="token operator">-></span> evt<span class="token punctuation">.</span>target<span class="token operator">?</span>value <span class="token operator">|></span> ValueChanged <span class="token operator">|></span> dispatch<span class="token punctuation">)</span> <span class="token punctuation">]</span>
          button <span class="token punctuation">[</span> OnClick <span class="token punctuation">(</span><span class="token keyword">fun</span> evt <span class="token operator">-></span> dispatch CalculateArea<span class="token punctuation">)</span> <span class="token punctuation">]</span> <span class="token punctuation">[</span> str <span class="token string">"Calculate area"</span> <span class="token punctuation">]</span>
          span <span class="token punctuation">[</span> <span class="token punctuation">]</span>
            <span class="token punctuation">[</span> str <span class="token string">"Area: "</span>
              str <span class="token punctuation">(</span>string model<span class="token punctuation">.</span>area<span class="token punctuation">)</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">]</span>

<span class="token comment">// App</span>
Program<span class="token punctuation">.</span>mkProgram init update view
<span class="token operator">|></span> Program<span class="token punctuation">.</span>withConsoleTrace
<span class="token operator">|></span> Program<span class="token punctuation">.</span>withReactSynchronous <span class="token string">"elmish-app"</span>
<span class="token operator">|></span> Program<span class="token punctuation">.</span>run
</code></pre>
<p>TL;DR:</p>
<LazyImg src="/images/strongly-typed-front-end/not-bad.png" alt="Not bad" />
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>