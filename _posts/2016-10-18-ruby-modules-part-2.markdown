---
layout: post
title:  "Ruby Modules Part 2"
date:   2016-10-18 10:47:29 -0700
comments: true
categories: ruby modules fundamentals
---
## Modules and Object Hierarchy

Let's take a more in depth look at the inner workings of Modules in Ruby.  As we learned in the [previous post on Modules]({% post_url 2016-08-28-ruby-module-basics %}), including a module in a class exposes the module's methods as instance methods of the class. This is because the Module gets inserted into the Class's ancestry chain.

Ruby's ancestry chain, or object hierarchy, is worth exploring. Though a particular class can only inherit from one superclass, it is likely that the superclass itself inherits from another class, creating an ancestry chain where methods from the superclasses cascade down to the children. The `ancestors` and `superclass` methods help illustrate this:

{% highlight ruby %}
class Media
end

module Streamable
end

class Movie < Media
  include Streamable
end

Movie.ancestors # => [Movie, Streamable, Media, Object, Kernel, BasicObject]
Movie.superclass # => Media
Movie.superclass.superclass # => Object
Movie.superclass.superclass.superclass # => BasicObject
{% endhighlight %}

Calling `.ancestors` on a class or module will show its ancestry chain, including all modules included by the class and its ancestors.  In this case `Movie` includes the `Streamable` module. `Movie` inherits from the `Media` class, which inherits from `Object`.  `Object` includes the `Kernel` module and inherits from `BasicObject`.

We do not get `Kernel` returned from calls to `superclass` because `Kernel` is a module. We can use the `included_modules` method to see only the modules in the ancestry chain:

{% highlight ruby %}
Movie.included_modules # => [Streamable, Kernel]
{% endhighlight %}

## Class Methods via Modules

Cool!  Ok, so what if we want to use a module to expose class methods rather than instance methods to the classes that include it? We can do this using `extend` when we include the module:

{% highlight ruby %}
module Searchable
  def starts_with_letter(letter)
    self.library.to_a.select { | item | item.name[0].downcase == letter.downcase }
  end
end

class Movie
  extend Searchable    # using 'extend' instead of 'include'
  attr_accessor :name, :year
  @@library = []

  def initialize(name, year)
    @name = name
    @year = year
    @@library << self
  end

  def self.library
    @@library
  end
end

star_wars = Movie.new("Star Wars: Episode IV - A New Hope", 1977)
shawshank_redemption = Movie.new("Shawshank Redemption, The", 1994)
terminator_2 = Movie.new("Terminator 2: Judgement Day", 1991)

Movie.starts_with_letter("s") # => [#<Movie:0x007fb0e8019348 @name="Star Wars: Episode IV - A New Hope", @year=1977>, #<Movie:0x007fb0e80192f8 @name="Shawshank Redemption, The", @year=1994>]
{% endhighlight %}

In the code above we defined a module, `Searchable`, to be used in any class that has a library of items that we want to search. It contains the method `starts_with_letter`, intended to be a class method, that takes a letter and returns all the items in the collection whose name begin with that letter.  We use `extend` when including the module to tell Ruby that we want to use the methods in `Searchable` as class methods. When we attempt to call `starts_with_letter` on an instance of `Movie` we will get a `NoMethodError`.

## Class Methods AND Inheritance Methods

Let's not limit ourselves! We don't have to choose between instance and class methods when writing a module. We can use both. Here is how we do it:

{% highlight ruby %}
module Searchable
  def next
    by_alphabet = self.class.by_alphabet
    next_item = by_alphabet[by_alphabet.index(self) + 1]
    if next_item
      next_item
    else
      by_alphabet[0]
    end
  end

  module ClassMethods
    def by_alphabet
      self.library.sort_by(&:name)
    end

    def starts_with_letter(letter)
      self.library.to_a.select { | item | item.name[0].downcase == letter.downcase }
    end
  end
end

class Movie
  include Searchable
  extend Searchable::ClassMethods
  ...
end

total_recall = Movie.new("Total Recall", 1990)
harry_and_hendersons = Movie.new("Harry and the Hendersons", 1987)
alien = Movie.new("Alien", 1979)

alien.next # => #<Movie:0x007f9b9b818308 @name="Harry and the Hendersons", @year=1987>
{% endhighlight %}

In the above snippet, we wrapped `Searchable`'s class methods in a module called `ClassMethods`. We then both included the module using `include Searchable` and extended the class methods using `extend Searchable::ClassMethods`. This does the trick but there is a cleaner way to achieve the same result. We can use one of Ruby's built-in method hooks. Method hooks are methods that are automatically called when a particular event occurs. Whenever a module is included in a class, Ruby calls the `included` method hook. We can use this hook to automatically extend the class methods within a module. Check it:

{% highlight ruby %}
module Searchable
  def self.included(base) # base refers to the class in which the module is included
    base.extend(ClassMethods)
  end

  ...

  module ClassMethods
    ...
  end
end

class Movie
  include Searchable
  ...
end
{% endhighlight %}

Now whenever the module is included in a class, `Searchable.included` is called (with `base` being a reference to the class including the module) and the class methods are automatically extended. It is worth noting that the name `ClassMethods` for the module in which the class methods are enclosed is just a convention. You can call this module whatever you want and then tell `included` to extend it:

{% highlight ruby %}
module Searchable
  def self.included(base)
    base.extend(BestClassMethodsEver)
  end

  ...

  module BestClassMethodsEver
    ...
  end
end
{% endhighlight %}