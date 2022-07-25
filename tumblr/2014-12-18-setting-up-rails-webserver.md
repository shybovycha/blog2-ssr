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

    <main class="svelte-1gr3n62"><article><h1>Setting up Rails webserver</h1>

    <time>18 Dec 2014 at 09:55</time>

    <div class="content"><h2 id="foreword">Foreword</h2>
<p>This tutorial I wrote when was quitting my previous job, almost one year ago. But it’s still handy!</p>
<h3 id="abstract-rails-application-setup">Abstract Rails application setup</h3>
<pre><code class="language-bash">$ <span class="token function">git</span> clone <span class="token punctuation">..</span>./project_name.git
$ <span class="token builtin class-name">cd</span> project_name
$ <span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> bundle <span class="token function">install</span>
$ <span class="token function">cat</span> config/database.yml
$ <span class="token comment"># create database and/or change config/database.yml settings</span>
$ rake db:migrate <span class="token assign-left variable">RAILS_ENV</span><span class="token operator">=</span>production
$ rake db:seed <span class="token assign-left variable">RAILS_ENV</span><span class="token operator">=</span>production <span class="token comment"># don't worry if one fails</span>
$ <span class="token comment"># start the server of your choice</span>
</code></pre>
<h3 id="puma-webserver">Puma webserver</h3>
<h4 id="application-wide-settings">Application-wide settings</h4>
<p>First you need to set up <strong>Puma</strong> for your specific project. For this purpose, add this
line to the <code>Gemfile</code>:</p>
<pre><code class="language-ruby">gem <span class="token string-literal"><span class="token string">'puma'</span></span>
</code></pre>
<p>Then, run <code>[sudo] bundle install</code>.</p>
<p>When you are done, you should be able to create a Puma config file at <code>$PROJECT_DIR/config/puma.rb</code>:</p>
<pre><code class="language-ruby"><span class="token keyword">def</span> <span class="token method-definition"><span class="token function">home_dir</span></span>
    <span class="token string-literal"><span class="token string">'/home/user/$PROJECT_DIR/'</span></span>
<span class="token keyword">end</span>

<span class="token keyword">def</span> <span class="token method-definition"><span class="token function">path</span></span><span class="token punctuation">(</span>p<span class="token punctuation">)</span>
    <span class="token builtin">File</span><span class="token punctuation">.</span>join<span class="token punctuation">(</span>home_dir<span class="token punctuation">,</span> p<span class="token punctuation">)</span>
<span class="token keyword">end</span>

directory home_dir
environment <span class="token string-literal"><span class="token string">'development'</span></span>
daemonize
pidfile path<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'tmp/pids/puma.pid'</span></span><span class="token punctuation">)</span>
state_path path<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'tmp/pids/puma.state'</span></span><span class="token punctuation">)</span>
stdout_redirect path<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'log/puma.log'</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> path<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'log/error.puma.log'</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span>
threads <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span>
bind <span class="token string-literal"><span class="token string">'tcp://0.0.0.0:5100'</span></span>
activate_control_app
</code></pre>
<p>More details here: <a href="https://github.com/puma/puma/blob/master/examples/config.rb">https://github.com/puma/puma/blob/master/examples/config.rb</a></p>
<p>Now, add project root path to the <code>/etc/puma.conf</code> file, e. g.:</p>
<pre><code>/home/user/project_name
</code></pre>
<h4 id="start-puma-at-boot">Start Puma at boot</h4>
<p>There is a specific utility, called <strong>Jungle</strong>. It manages your applications’ instances at startup.</p>
<h5 id="ububtu-based-systems">Ububtu-based systems</h5>
<p>First of all, create <code>/etc/init/puma.conf</code> file and fill it with this:</p>
<pre><code class="language-bash"><span class="token comment"># /etc/init/puma.conf - Puma config</span>

<span class="token comment"># This example config should work with Ubuntu 12.04+.  It</span>
<span class="token comment"># allows you to manage multiple Puma instances with</span>
<span class="token comment"># Upstart, Ubuntu's native service management tool.</span>
<span class="token comment">#</span>
<span class="token comment"># See workers.conf for how to manage all Puma instances at once.</span>
<span class="token comment">#</span>
<span class="token comment"># Save this config as /etc/init/puma.conf then manage puma with:</span>
<span class="token comment">#   sudo start puma app=PATH_TO_APP</span>
<span class="token comment">#   sudo stop puma app=PATH_TO_APP</span>
<span class="token comment">#   sudo status puma app=PATH_TO_APP</span>
<span class="token comment">#</span>
<span class="token comment"># or use the service command:</span>
<span class="token comment">#   sudo service puma {start,stop,restart,status}</span>
<span class="token comment">#</span>

description <span class="token string">"Puma Background Worker"</span>

<span class="token comment"># no "start on", we don't want to automatically start</span>
stop on <span class="token punctuation">(</span>stopping puma-manager or runlevel <span class="token punctuation">[</span>06<span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># change apps to match your deployment user if you want to use this as a less privileged user (recommended!)</span>
setuid apps
setgid apps

respawn
respawn limit <span class="token number">3</span> <span class="token number">30</span>

instance <span class="token variable">${app}</span>

script
<span class="token comment"># this script runs in /bin/sh by default</span>
<span class="token comment"># respawn as bash so we can source in rbenv/rvm</span>
<span class="token comment"># quoted heredoc to tell /bin/sh not to interpret</span>
<span class="token comment"># variables</span>
<span class="token builtin class-name">exec</span> /bin/bash <span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token string">'EOT'</span>
  <span class="token comment"># set HOME to the setuid user's home, there doesn't seem to be a better, portable way</span>
  <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">HOME</span></span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">eval</span> <span class="token builtin class-name">echo</span> ~<span class="token punctuation">$(</span>id -un<span class="token punctuation">)</span><span class="token variable">)</span></span>"</span>

  <span class="token builtin class-name">cd</span> <span class="token variable">$app</span>

  <span class="token keyword">if</span> <span class="token punctuation">[</span> -d <span class="token string">"<span class="token environment constant">$HOME</span>/.rbenv/bin"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"<span class="token environment constant">$HOME</span>/.rbenv/bin:<span class="token environment constant">$PATH</span>"</span>
  <span class="token keyword">elif</span> <span class="token punctuation">[</span> -f  /etc/profile.d/rvm.sh <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">source</span> /etc/profile.d/rvm.sh
  <span class="token keyword">elif</span> <span class="token punctuation">[</span> -f /usr/local/rvm/scripts/rvm <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">source</span> /etc/profile.d/rvm.sh
  <span class="token keyword">elif</span> <span class="token punctuation">[</span> -f <span class="token string">"<span class="token environment constant">$HOME</span>/.rvm/scripts/rvm"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">source</span> <span class="token string">"<span class="token environment constant">$HOME</span>/.rvm/scripts/rvm"</span>
  <span class="token keyword">elif</span> <span class="token punctuation">[</span> -f /usr/local/share/chruby/chruby.sh <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">source</span> /usr/local/share/chruby/chruby.sh
    <span class="token keyword">if</span> <span class="token punctuation">[</span> -f /usr/local/share/chruby/auto.sh <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">source</span> /usr/local/share/chruby/auto.sh
    <span class="token keyword">fi</span>
    <span class="token comment"># if you aren't using auto, set your version here</span>
    <span class="token comment"># chruby 2.0.0</span>
  <span class="token keyword">fi</span>

  logger -t puma <span class="token string">"Starting server: <span class="token variable">$app</span>"</span>

  <span class="token builtin class-name">exec</span> bundle <span class="token builtin class-name">exec</span> puma -C config/puma.rb
EOT
end script
</code></pre>
<p>Now, create <code>/etc/init/puma-manager.conf</code> and fill it with this:</p>
<pre><code class="language-bash"><span class="token comment"># /etc/init/puma-manager.conf - manage a set of Pumas</span>

<span class="token comment"># This example config should work with Ubuntu 12.04+.  It</span>
<span class="token comment"># allows you to manage multiple Puma instances with</span>
<span class="token comment"># Upstart, Ubuntu's native service management tool.</span>
<span class="token comment">#</span>
<span class="token comment"># See puma.conf for how to manage a single Puma instance.</span>
<span class="token comment">#</span>
<span class="token comment"># Use "stop puma-manager" to stop all Puma instances.</span>
<span class="token comment"># Use "start puma-manager" to start all instances.</span>
<span class="token comment"># Use "restart puma-manager" to restart all instances.</span>
<span class="token comment"># Crazy, right?</span>
<span class="token comment">#</span>

description <span class="token string">"Manages the set of puma processes"</span>

<span class="token comment"># This starts upon bootup and stops on shutdown</span>
start on runlevel <span class="token punctuation">[</span><span class="token number">2345</span><span class="token punctuation">]</span>
stop on runlevel <span class="token punctuation">[</span>06<span class="token punctuation">]</span>

<span class="token comment"># Set this to the number of Puma processes you want</span>
<span class="token comment"># to run on this machine</span>
<span class="token function">env</span> <span class="token assign-left variable">PUMA_CONF</span><span class="token operator">=</span><span class="token string">"/etc/puma.conf"</span>

pre-start script
  <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">`</span><span class="token function">cat</span> $PUMA_CONF<span class="token variable">`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token assign-left variable">app</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">echo</span> $i <span class="token operator">|</span> <span class="token function">cut</span> -d , -f <span class="token number">1</span><span class="token variable">`</span></span>
    logger -t <span class="token string">"puma-manager"</span> <span class="token string">"Starting <span class="token variable">$app</span>"</span>
    start puma <span class="token assign-left variable">app</span><span class="token operator">=</span><span class="token variable">$app</span>
  <span class="token keyword">done</span>
end script
</code></pre>
<p>And create a blank <code>/etc/puma.conf</code> file. This will be filled for each application separately.</p>
<p><strong>Caveat:</strong></p>
<p>You need to customise <code>/etc/init/puma.conf</code> to:</p>
<ul>
<li>Set the right user your app should be running on unless you want root to execute it!<ul>
<li>Look for <code>setuid apps</code> and <code>setgid apps</code>, uncomment those lines and replace <code>apps</code> to whatever your deployment user is.</li>
<li>Replace <code>apps</code> on the paths (or set the right paths to your user’s home) everywhere else.</li>
</ul>
</li>
<li>Uncomment the source lines for <code>rbenv</code> or <code>rvm</code> support unless you use a system wide installation of Ruby.</li>
</ul>
<p>Now, start Jungle like this: <code>sudo start puma-manager</code>.
And all your applications should be available when you reboot the machine.</p>
<p>More details at <a href="https://github.com/puma/puma/tree/master/tools/jungle/">https://github.com/puma/puma/tree/master/tools/jungle/</a></p>
<h5 id="debian-based-systems">Debian-based systems</h5>
<p><strong>PENDING</strong></p>
<h3 id="starting-up-and-shutting-down">Starting up and shutting down</h3>
<p>To start up the application is easy enough. Just navigate yourself to project directory and run the following: <code>puma -C config/puma.rb</code>.</p>
<p>If you want to shut down one, run this command in the project directory: <code>[sudo] pumactl -S tmp/pids/puma.state halt</code>.</p>
</div>
</article></main>

    

    <script src="/lazyLoadImages.js"></script></body>
</html>