---
layout: post
title: From ActiveModel to ActiveRecord
date: '2014-04-17 12:47:00 +02:00'
tags:
- ruby
- metaprogramming
tumblr_url: http://shybovycha.tumblr.com/post/82983429638/from-activemodel-to-activerecord
---
<p>This short article covers some steps you need to implement to get your own <code>ActiveRecord</code> implementation.</p>

<p>Sample <code>ActiveModel</code> looks like this:</p>

```ruby
class Posting
  include ActiveModel::Validations

  attr_accessor :id, :title, :body, :tags

  validates :title, :presence => true
  validates :body, :presence => true

  def initialize(attributes = {})
    # ...
  end

  def save
    set_default_values

    # ...
  end

  def self.create(attributes = {})
    new(attributes).save
  end

  protected

  def set_default_values
    # ...
  end
end
```

<p>First trouble is that <code>ActiveModel</code> does not provide any attribute access API. Or I did not google enough. So we need to create our own!</p>

<p>Let us have an instance variable <code>@attributes</code> where we will store our model&rsquo; data. We need to define getter and setter methods for all the attributes of our model. This may be done with the <code>attr_accessor</code> method. But when user sets the value for some attribute, we should store that in our <code>@attributes</code> variable. And here is the first step to our black magic: <strong>we will override the <code>attr_accessor</code> method</strong>.</p>

```ruby
module ActiveAttributes
  def attr_accessor(*args)
    args.each do |k|
      define_method("#{k}".to_sym) { @attributes[k.to_sym] }
      define_method("#{k}=".to_sym) { |value| @attributes[k.to_sym] = value }
    end
  end
end
```

<p>I just wrapped the code into a single module. Remember: when you include the module in a class, all the module&rsquo; methods become class methods.</p>

<p>Now we will include this module <strong>before <code>attr_accessor</code> calls</strong>. But beware: you need to declare an <code>@attributes</code> instance variable in the constructor!</p>

<p>And let&rsquo;s just agree with the following convention: <strong>all our attribute names should be symbols</strong>.</p>

```ruby
class Posting
  include ActiveModel::Validations
  include ActiveAttributes

  attr_accessor :id, :title, :body, :tags

  validates :title, :presence => true
  validates :body, :presence => true

  def initialize(attributes = {})
    @attributes = {}

    # ...
  end

  def save
    set_default_values

    # ...
  end

  def self.create(attributes = {})
    new(attributes).save
  end

  protected

  def set_default_values
    # ...
  end
end
```

<p>Now, we can implement our constructor. We now have all the attributes&rsquo; getters and setter and thus we can simply call them in our constructor:</p>

```ruby
class Posting
  include ActiveModel::Validations
  include ActiveAttributes

  attr_accessor :id, :title, :body, :tags

  validates :title, :presence => true
  validates :body, :presence => true

  def initialize(attributes = {})
    @attributes = {}

    attributes.symbolize_keys.each do |k, v|
      v.symbolize_keys! if v.is_a? Hash

      send("#{k}=", v) if respond_to?("#{k}=".to_sym)
    end
  end

  def save
    set_default_values

    # ...
  end

  def self.create(attributes = {})
    new(attributes).save
  end

  protected

  def set_default_values
    # ...
  end
end
```

<p>Now let&rsquo;s implement some basic model persisting. First, we should not forget about our <strong>validations</strong> and add <code>valid?</code> test to the <code>save</code> method.</p>

<p>Let&rsquo;s say our <code>save</code> method should return the model instance. Thus, we should put the model&rsquo; data into the database and get the <code>id</code> for that data (if we put the data with the <code>INSERT</code> statement).</p>

<p>So there is an important caveat: <strong>in order to get the correct model <code>id</code>, you need to get it from database in the same transaction as the update/insert statement</strong>. The <code>mysql2</code> gem does support multiple query statements in a single transaction. But to perform such a query, you will need to set the <code>MULTI_STATEMENTS</code> flag when creating a <code>Mysql2::Connection</code> instance.</p>

```ruby
def save
  set_default_values

  return self unless valid?

  @connection = Mysql2::Client.new({ flags: Mysql2::Client::MULTI_STATEMENTS }.merge(...))

  # ...

  self
rescue
  self
ensure
  @connection.close
end
```

<p>Here I used the instance variable <code>@connection</code> to make it available within the <code>rescue</code> and <code>ensure</code> statements.</p>

<p>Now we will use our instance variable, <code>@attributes</code> to create an SQL query:</p>

```ruby
def save
  set_default_values

  return self unless valid?

  @connection = Mysql2::Client.new({ flags: Mysql2::Client::MULTI_STATEMENTS }.merge(...))

    if @attributes[:id].blank?
    columns = @attributes.keys.map { |k| "`#{ k.to_s }`" }.join ','
    values = @attributes.values.map do |v|
      if v.nil?
        'NULL'
      else
        "'#{ ActionController::Base.helpers.sanitize(v.to_s) }'"
      end
    end.join ','

    query = "INSERT INTO postings#{ volume } (#{ columns }) VALUES (#{ values })"
  else
    mapping = @attributes.map { |k, v| "`#{ k.to_s }` = #{ v.nil? ? 'NULL' : "'#{ ActionController::Base.helpers.sanitize(v) }'" }" }.join ','

    query = "UPDATE postings#{ volume } SET #{ mapping } WHERE id = #{ @attributes[:id] }"
  end

  self
rescue
  self
ensure
  @connection.close
end
```

<p>I used the <code>ActionController::Base.helpers.sanitize</code> helper method to escape the query parameters.</p>

<p>Now we should simply wrap our query into a transaction and get an <code>id</code> from the database.</p>

```ruby
def save
  set_default_values

  return self unless valid?

  @connection = Mysql2::Client.new({ flags: Mysql2::Client::MULTI_STATEMENTS }.merge(...))

  if @attributes[:id].blank?
    columns = @attributes.keys.map { |k| "`#{ k.to_s }`" }.join ','
    values = @attributes.values.map do |v|
      if v.nil?
        'NULL'
      else
        "'#{ ActionController::Base.helpers.sanitize(v.to_s) }'"
      end
    end.join ','

    query = "INSERT INTO postings#{ volume } (#{ columns }) VALUES (#{ values })"
  else
    mapping = @attributes.map { |k, v| "`#{ k.to_s }` = #{ v.nil? ? 'NULL' : "'#{ ActionController::Base.helpers.sanitize(v) }'" }" }.join ','

    query = "UPDATE postings#{ volume } SET #{ mapping } WHERE id = #{ @attributes[:id] }"
  end

  query = "START TRANSACTION; #{ query }; SELECT LAST_INSERT_ID() AS id; COMMIT;"

  @connection.query(query)

  while @connection.next_result
    result = @connection.store_result.to_a rescue nil

    @attributes[:id] = result.first['id'] if result.present? and result.first.present? and result.first.has_key? 'id'
  end

  self
rescue
  self
ensure
  @connection.close
end
```

<p>Quite big method, sure. Yet, it performs all the <em>UPDATEs</em> and <em>INSERTs</em> for us.</p>

<p>Let&rsquo;s add some attribute with the default value, <code>created_at</code> and check how the whole class works:</p>

```ruby
require 'date'

# ...

attr_accessor :created_at

# ...

protected

def set_default_values
  @attributes[:created_at] = DateTime.now
end
```

<p>And the test:</p>

```ruby
p = Posting.new title: "Hello, ActiveModel!", body: "Hello, Database!"

p.save

puts p.created_at
```
