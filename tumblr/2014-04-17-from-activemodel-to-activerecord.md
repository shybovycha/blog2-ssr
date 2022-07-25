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

    <main class="svelte-1gr3n62"><article><h1>From ActiveModel to ActiveRecord</h1>

    <time>17 Apr 2014 at 10:47</time>

    <div class="content"><p>This short article covers some steps you need to implement to get your own <code>ActiveRecord</code> implementation.</p>

<p>Sample <code>ActiveModel</code> looks like this:</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">Posting</span>
  <span class="token keyword">include</span> ActiveModel<span class="token double-colon punctuation">::</span>Validations

  attr_accessor <span class="token symbol">:id</span><span class="token punctuation">,</span> <span class="token symbol">:title</span><span class="token punctuation">,</span> <span class="token symbol">:body</span><span class="token punctuation">,</span> <span class="token symbol">:tags</span>

  validates <span class="token symbol">:title</span><span class="token punctuation">,</span> <span class="token symbol">:presence</span> <span class="token operator">=></span> <span class="token boolean">true</span>
  validates <span class="token symbol">:body</span><span class="token punctuation">,</span> <span class="token symbol">:presence</span> <span class="token operator">=></span> <span class="token boolean">true</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">save</span></span>
    set_default_values

    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">create</span></span><span class="token punctuation">(</span>attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">new</span><span class="token punctuation">(</span>attributes<span class="token punctuation">)</span><span class="token punctuation">.</span>save
  <span class="token keyword">end</span>

  <span class="token keyword">protected</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">set_default_values</span></span>
    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>First trouble is that <code>ActiveModel</code> does not provide any attribute access API. Or I did not google enough. So we need to create our own!</p>

<p>Let us have an instance variable <code>@attributes</code> where we will store our model&rsquo; data. We need to define getter and setter methods for all the attributes of our model. This may be done with the <code>attr_accessor</code> method. But when user sets the value for some attribute, we should store that in our <code>@attributes</code> variable. And here is the first step to our black magic: <strong>we will override the <code>attr_accessor</code> method</strong>.</p>

<pre><code class="language-ruby"><span class="token keyword">module</span> <span class="token class-name">ActiveAttributes</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">attr_accessor</span></span><span class="token punctuation">(</span><span class="token operator">*</span>args<span class="token punctuation">)</span>
    args<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>k<span class="token operator">|</span>
      <span class="token keyword">define_method</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">k</span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">.</span>to_sym<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token variable">@attributes</span><span class="token punctuation">[</span>k<span class="token punctuation">.</span>to_sym<span class="token punctuation">]</span> <span class="token punctuation">}</span>
      <span class="token keyword">define_method</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">k</span><span class="token delimiter punctuation">}</span></span><span class="token string">="</span></span><span class="token punctuation">.</span>to_sym<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>value<span class="token operator">|</span> <span class="token variable">@attributes</span><span class="token punctuation">[</span>k<span class="token punctuation">.</span>to_sym<span class="token punctuation">]</span> <span class="token operator">=</span> value <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>I just wrapped the code into a single module. Remember: when you include the module in a class, all the module&rsquo; methods become class methods.</p>

<p>Now we will include this module <strong>before <code>attr_accessor</code> calls</strong>. But beware: you need to declare an <code>@attributes</code> instance variable in the constructor!</p>

<p>And let&rsquo;s just agree with the following convention: <strong>all our attribute names should be symbols</strong>.</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">Posting</span>
  <span class="token keyword">include</span> ActiveModel<span class="token double-colon punctuation">::</span>Validations
  <span class="token keyword">include</span> ActiveAttributes

  attr_accessor <span class="token symbol">:id</span><span class="token punctuation">,</span> <span class="token symbol">:title</span><span class="token punctuation">,</span> <span class="token symbol">:body</span><span class="token punctuation">,</span> <span class="token symbol">:tags</span>

  validates <span class="token symbol">:title</span><span class="token punctuation">,</span> <span class="token symbol">:presence</span> <span class="token operator">=></span> <span class="token boolean">true</span>
  validates <span class="token symbol">:body</span><span class="token punctuation">,</span> <span class="token symbol">:presence</span> <span class="token operator">=></span> <span class="token boolean">true</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token variable">@attributes</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">save</span></span>
    set_default_values

    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">create</span></span><span class="token punctuation">(</span>attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">new</span><span class="token punctuation">(</span>attributes<span class="token punctuation">)</span><span class="token punctuation">.</span>save
  <span class="token keyword">end</span>

  <span class="token keyword">protected</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">set_default_values</span></span>
    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>Now, we can implement our constructor. We now have all the attributes&rsquo; getters and setter and thus we can simply call them in our constructor:</p>

<pre><code class="language-ruby"><span class="token keyword">class</span> <span class="token class-name">Posting</span>
  <span class="token keyword">include</span> ActiveModel<span class="token double-colon punctuation">::</span>Validations
  <span class="token keyword">include</span> ActiveAttributes

  attr_accessor <span class="token symbol">:id</span><span class="token punctuation">,</span> <span class="token symbol">:title</span><span class="token punctuation">,</span> <span class="token symbol">:body</span><span class="token punctuation">,</span> <span class="token symbol">:tags</span>

  validates <span class="token symbol">:title</span><span class="token punctuation">,</span> <span class="token symbol">:presence</span> <span class="token operator">=></span> <span class="token boolean">true</span>
  validates <span class="token symbol">:body</span><span class="token punctuation">,</span> <span class="token symbol">:presence</span> <span class="token operator">=></span> <span class="token boolean">true</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token variable">@attributes</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    attributes<span class="token punctuation">.</span>symbolize_keys<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>k<span class="token punctuation">,</span> v<span class="token operator">|</span>
      v<span class="token punctuation">.</span>symbolize_keys<span class="token operator">!</span> <span class="token keyword">if</span> v<span class="token punctuation">.</span>is_a<span class="token operator">?</span> <span class="token builtin">Hash</span>

      send<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">k</span><span class="token delimiter punctuation">}</span></span><span class="token string">="</span></span><span class="token punctuation">,</span> v<span class="token punctuation">)</span> <span class="token keyword">if</span> respond_to<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">k</span><span class="token delimiter punctuation">}</span></span><span class="token string">="</span></span><span class="token punctuation">.</span>to_sym<span class="token punctuation">)</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">save</span></span>
    set_default_values

    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">create</span></span><span class="token punctuation">(</span>attributes <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">new</span><span class="token punctuation">(</span>attributes<span class="token punctuation">)</span><span class="token punctuation">.</span>save
  <span class="token keyword">end</span>

  <span class="token keyword">protected</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">set_default_values</span></span>
    <span class="token comment"># ...</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre>
<p>Now let&rsquo;s implement some basic model persisting. First, we should not forget about our <strong>validations</strong> and add <code>valid?</code> test to the <code>save</code> method.</p>

<p>Let&rsquo;s say our <code>save</code> method should return the model instance. Thus, we should put the model&rsquo; data into the database and get the <code>id</code> for that data (if we put the data with the <code>INSERT</code> statement).</p>

<p>So there is an important caveat: <strong>in order to get the correct model <code>id</code>, you need to get it from database in the same transaction as the update/insert statement</strong>. The <code>mysql2</code> gem does support multiple query statements in a single transaction. But to perform such a query, you will need to set the <code>MULTI_STATEMENTS</code> flag when creating a <code>Mysql2::Connection</code> instance.</p>

<pre><code class="language-ruby"><span class="token keyword">def</span> <span class="token method-definition"><span class="token function">save</span></span>
  set_default_values

  <span class="token keyword">return</span> <span class="token keyword">self</span> <span class="token keyword">unless</span> valid<span class="token operator">?</span>

  <span class="token variable">@connection</span> <span class="token operator">=</span> Mysql2<span class="token double-colon punctuation">::</span><span class="token class-name">Client</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token symbol">flags</span><span class="token operator">:</span> Mysql2<span class="token double-colon punctuation">::</span>Client<span class="token double-colon punctuation">::</span><span class="token constant">MULTI_STATEMENTS</span> <span class="token punctuation">}</span><span class="token punctuation">.</span>merge<span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token comment"># ...</span>

  <span class="token keyword">self</span>
<span class="token keyword">rescue</span>
  <span class="token keyword">self</span>
<span class="token keyword">ensure</span>
  <span class="token variable">@connection</span><span class="token punctuation">.</span>close
<span class="token keyword">end</span>
</code></pre>
<p>Here I used the instance variable <code>@connection</code> to make it available within the <code>rescue</code> and <code>ensure</code> statements.</p>

<p>Now we will use our instance variable, <code>@attributes</code> to create an SQL query:</p>

<pre><code class="language-ruby"><span class="token keyword">def</span> <span class="token method-definition"><span class="token function">save</span></span>
  set_default_values

  <span class="token keyword">return</span> <span class="token keyword">self</span> <span class="token keyword">unless</span> valid<span class="token operator">?</span>

  <span class="token variable">@connection</span> <span class="token operator">=</span> Mysql2<span class="token double-colon punctuation">::</span><span class="token class-name">Client</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token symbol">flags</span><span class="token operator">:</span> Mysql2<span class="token double-colon punctuation">::</span>Client<span class="token double-colon punctuation">::</span><span class="token constant">MULTI_STATEMENTS</span> <span class="token punctuation">}</span><span class="token punctuation">.</span>merge<span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token variable">@attributes</span><span class="token punctuation">[</span><span class="token symbol">:id</span><span class="token punctuation">]</span><span class="token punctuation">.</span>blank<span class="token operator">?</span>
    columns <span class="token operator">=</span> <span class="token variable">@attributes</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token operator">|</span>k<span class="token operator">|</span> <span class="token string-literal"><span class="token string">"`</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> k<span class="token punctuation">.</span>to_s </span><span class="token delimiter punctuation">}</span></span><span class="token string">`"</span></span> <span class="token punctuation">}</span><span class="token punctuation">.</span>join <span class="token string-literal"><span class="token string">','</span></span>
    values <span class="token operator">=</span> <span class="token variable">@attributes</span><span class="token punctuation">.</span>values<span class="token punctuation">.</span>map <span class="token keyword">do</span> <span class="token operator">|</span>v<span class="token operator">|</span>
      <span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
        <span class="token string-literal"><span class="token string">'NULL'</span></span>
      <span class="token keyword">else</span>
        <span class="token string-literal"><span class="token string">"'</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> ActionController<span class="token double-colon punctuation">::</span>Base<span class="token punctuation">.</span>helpers<span class="token punctuation">.</span>sanitize<span class="token punctuation">(</span>v<span class="token punctuation">.</span>to_s<span class="token punctuation">)</span> </span><span class="token delimiter punctuation">}</span></span><span class="token string">'"</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span><span class="token punctuation">.</span>join <span class="token string-literal"><span class="token string">','</span></span>

    query <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"INSERT INTO postings</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> volume </span><span class="token delimiter punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> columns </span><span class="token delimiter punctuation">}</span></span><span class="token string">) VALUES (</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> values </span><span class="token delimiter punctuation">}</span></span><span class="token string">)"</span></span>
  <span class="token keyword">else</span>
    mapping <span class="token operator">=</span> <span class="token variable">@attributes</span><span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token operator">|</span>k<span class="token punctuation">,</span> v<span class="token operator">|</span> <span class="token string-literal"><span class="token string">"`</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> k<span class="token punctuation">.</span>to_s </span><span class="token delimiter punctuation">}</span></span><span class="token string">` = #{ v.nil? ? 'NULL' : "'</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> ActionController<span class="token double-colon punctuation">::</span>Base<span class="token punctuation">.</span>helpers<span class="token punctuation">.</span>sanitize<span class="token punctuation">(</span>v<span class="token punctuation">)</span> </span><span class="token delimiter punctuation">}</span></span><span class="token string">'"</span></span> <span class="token punctuation">}</span>" <span class="token punctuation">}</span><span class="token punctuation">.</span>join <span class="token string-literal"><span class="token string">','</span></span>

    query <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"UPDATE postings</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> volume </span><span class="token delimiter punctuation">}</span></span><span class="token string"> SET </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> mapping </span><span class="token delimiter punctuation">}</span></span><span class="token string"> WHERE id = </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> <span class="token variable">@attributes</span><span class="token punctuation">[</span><span class="token symbol">:id</span><span class="token punctuation">]</span> </span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
  <span class="token keyword">end</span>

  <span class="token keyword">self</span>
<span class="token keyword">rescue</span>
  <span class="token keyword">self</span>
<span class="token keyword">ensure</span>
  <span class="token variable">@connection</span><span class="token punctuation">.</span>close
<span class="token keyword">end</span>
</code></pre>
<p>I used the <code>ActionController::Base.helpers.sanitize</code> helper method to escape the query parameters.</p>

<p>Now we should simply wrap our query into a transaction and get an <code>id</code> from the database.</p>

<pre><code class="language-ruby"><span class="token keyword">def</span> <span class="token method-definition"><span class="token function">save</span></span>
  set_default_values

  <span class="token keyword">return</span> <span class="token keyword">self</span> <span class="token keyword">unless</span> valid<span class="token operator">?</span>

  <span class="token variable">@connection</span> <span class="token operator">=</span> Mysql2<span class="token double-colon punctuation">::</span><span class="token class-name">Client</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token symbol">flags</span><span class="token operator">:</span> Mysql2<span class="token double-colon punctuation">::</span>Client<span class="token double-colon punctuation">::</span><span class="token constant">MULTI_STATEMENTS</span> <span class="token punctuation">}</span><span class="token punctuation">.</span>merge<span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token variable">@attributes</span><span class="token punctuation">[</span><span class="token symbol">:id</span><span class="token punctuation">]</span><span class="token punctuation">.</span>blank<span class="token operator">?</span>
    columns <span class="token operator">=</span> <span class="token variable">@attributes</span><span class="token punctuation">.</span>keys<span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token operator">|</span>k<span class="token operator">|</span> <span class="token string-literal"><span class="token string">"`</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> k<span class="token punctuation">.</span>to_s </span><span class="token delimiter punctuation">}</span></span><span class="token string">`"</span></span> <span class="token punctuation">}</span><span class="token punctuation">.</span>join <span class="token string-literal"><span class="token string">','</span></span>
    values <span class="token operator">=</span> <span class="token variable">@attributes</span><span class="token punctuation">.</span>values<span class="token punctuation">.</span>map <span class="token keyword">do</span> <span class="token operator">|</span>v<span class="token operator">|</span>
      <span class="token keyword">if</span> v<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
        <span class="token string-literal"><span class="token string">'NULL'</span></span>
      <span class="token keyword">else</span>
        <span class="token string-literal"><span class="token string">"'</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> ActionController<span class="token double-colon punctuation">::</span>Base<span class="token punctuation">.</span>helpers<span class="token punctuation">.</span>sanitize<span class="token punctuation">(</span>v<span class="token punctuation">.</span>to_s<span class="token punctuation">)</span> </span><span class="token delimiter punctuation">}</span></span><span class="token string">'"</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span><span class="token punctuation">.</span>join <span class="token string-literal"><span class="token string">','</span></span>

    query <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"INSERT INTO postings</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> volume </span><span class="token delimiter punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> columns </span><span class="token delimiter punctuation">}</span></span><span class="token string">) VALUES (</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> values </span><span class="token delimiter punctuation">}</span></span><span class="token string">)"</span></span>
  <span class="token keyword">else</span>
    mapping <span class="token operator">=</span> <span class="token variable">@attributes</span><span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token operator">|</span>k<span class="token punctuation">,</span> v<span class="token operator">|</span> <span class="token string-literal"><span class="token string">"`</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> k<span class="token punctuation">.</span>to_s </span><span class="token delimiter punctuation">}</span></span><span class="token string">` = #{ v.nil? ? 'NULL' : "'</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> ActionController<span class="token double-colon punctuation">::</span>Base<span class="token punctuation">.</span>helpers<span class="token punctuation">.</span>sanitize<span class="token punctuation">(</span>v<span class="token punctuation">)</span> </span><span class="token delimiter punctuation">}</span></span><span class="token string">'"</span></span> <span class="token punctuation">}</span>" <span class="token punctuation">}</span><span class="token punctuation">.</span>join <span class="token string-literal"><span class="token string">','</span></span>

    query <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"UPDATE postings</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> volume </span><span class="token delimiter punctuation">}</span></span><span class="token string"> SET </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> mapping </span><span class="token delimiter punctuation">}</span></span><span class="token string"> WHERE id = </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> <span class="token variable">@attributes</span><span class="token punctuation">[</span><span class="token symbol">:id</span><span class="token punctuation">]</span> </span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
  <span class="token keyword">end</span>

  query <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"START TRANSACTION; </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"> query </span><span class="token delimiter punctuation">}</span></span><span class="token string">; SELECT LAST_INSERT_ID() AS id; COMMIT;"</span></span>

  <span class="token variable">@connection</span><span class="token punctuation">.</span>query<span class="token punctuation">(</span>query<span class="token punctuation">)</span>

  <span class="token keyword">while</span> <span class="token variable">@connection</span><span class="token punctuation">.</span>next_result
    result <span class="token operator">=</span> <span class="token variable">@connection</span><span class="token punctuation">.</span>store_result<span class="token punctuation">.</span>to_a <span class="token keyword">rescue</span> <span class="token keyword">nil</span>

    <span class="token variable">@attributes</span><span class="token punctuation">[</span><span class="token symbol">:id</span><span class="token punctuation">]</span> <span class="token operator">=</span> result<span class="token punctuation">.</span>first<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'id'</span></span><span class="token punctuation">]</span> <span class="token keyword">if</span> result<span class="token punctuation">.</span>present<span class="token operator">?</span> <span class="token keyword">and</span> result<span class="token punctuation">.</span>first<span class="token punctuation">.</span>present<span class="token operator">?</span> <span class="token keyword">and</span> result<span class="token punctuation">.</span>first<span class="token punctuation">.</span>has_key<span class="token operator">?</span> <span class="token string-literal"><span class="token string">'id'</span></span>
  <span class="token keyword">end</span>

  <span class="token keyword">self</span>
<span class="token keyword">rescue</span>
  <span class="token keyword">self</span>
<span class="token keyword">ensure</span>
  <span class="token variable">@connection</span><span class="token punctuation">.</span>close
<span class="token keyword">end</span>
</code></pre>
<p>Quite big method, sure. Yet, it performs all the <em>UPDATEs</em> and <em>INSERTs</em> for us.</p>

<p>Let&rsquo;s add some attribute with the default value, <code>created_at</code> and check how the whole class works:</p>

<pre><code class="language-ruby"><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'date'</span></span>

<span class="token comment"># ...</span>

attr_accessor <span class="token symbol">:created_at</span>

<span class="token comment"># ...</span>

<span class="token keyword">protected</span>

<span class="token keyword">def</span> <span class="token method-definition"><span class="token function">set_default_values</span></span>
  <span class="token variable">@attributes</span><span class="token punctuation">[</span><span class="token symbol">:created_at</span><span class="token punctuation">]</span> <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>now
<span class="token keyword">end</span>
</code></pre>
<p>And the test:</p>

<pre><code class="language-ruby">p <span class="token operator">=</span> <span class="token class-name">Posting</span><span class="token punctuation">.</span><span class="token keyword">new</span> title<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"Hello, ActiveModel!"</span></span><span class="token punctuation">,</span> <span class="token symbol">body</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"Hello, Database!"</span></span>

p<span class="token punctuation">.</span>save

puts p<span class="token punctuation">.</span>created_at
</code></pre>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>