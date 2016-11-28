---
layout: post
title:  "Ruby Module Basics"
date:   2016-08-28 10:47:29 -0700
comments: true
categories: ruby modules fundamentals
---
Modules are an important concept in Ruby.  A thorough understanding of modules helps programmers write well-organized code that can be shared and extended by classes across an application.

In many ways, modules are very similar to classes.  Like classes, modules consist of methods and constants that encapsulate behavior.  In fact, the `Class` class is descended from the `Module` class:

{% highlight ruby %}
class ExampleClass
end

ExampleClass.is_a?(Module) # => true
{% endhighlight %}

The main difference between classes and modules lies in the fact that modules are not concerned with state. We do not create instances of modules with customized attributes the way we do with classes. Modules define a set of behaviors that can be included in any number of classes, endowing instances of that class with those behaviors.

It is important to note that Ruby enforces single inheritance, allowing each class to inherit from only one superclass. As a result, the behaviors that a class can receive via inheritance are limited to those defined in the superclass from which it inherits. Fortunately, there is no limit to the number of modules that can be included in a given class.  This makes modules a flexible alternative to inheritance, allowing the programmer to define behavior in clusters that fit the needs of the application and distribute those behaviors to the classes that need them. Here is how we define a Module:

{% highlight ruby %}
module ExampleModule
  def print_source
    puts "this behavior is defined in ExampleModule"
  end
end
{% endhighlight %}

We then include the module in a class using the following syntax:

{% highlight ruby %}
class ExampleClass
  include ExampleModule
end

ExampleClass.new.print_source # => prints "this behavior is defined in ExampleModule"
{% endhighlight %}

Including a module in a class is often referred to as "mixing in" the module.  Similarly, modules themselves are often referred to as "mixins".

Let's look at a slightly more complicated example of a module that further illustrates their use:

{% highlight ruby %}
module WeatherSimulator
  TYPES = ["raining", "snowing", "sunny", "cloudy", "partly cloudy"]

  def random_weather
    rand_num = rand(0..TYPES.length-1)
    TYPES[rand_num]
  end

  def weather_report
    puts "The current weather report is: #{random_weather}"
  end
end

class City
  include WeatherSimulator

  attr_accessor :name, :state

  def initialize(name, state)
    @name = name
    @state = state
  end
end

san_francisco = City.new("San Francisco", "California")
san_francisco.weather_report # => prints "The current weather report is: sunny"
{% endhighlight %}

In the code above we define the `Weather` module and include it in the `City` class.  We can then call the `weather_report` method on any instance of `City`, printing a randomly generated weather report. We can include the `Weather` module in any class we see fit.

Let's quickly examine another important use of modules: namespacing. Namespacing helps us to to distinguish between two classes that have the same name. This comes in particularly handy when an application grows in size and has a need for different classes with the same. We achieve this separation by nesting the class within the module:

{% highlight ruby %}
module Furniture
  class Table
  end
end
{% endhighlight %}

We can then instantiate a new instance of this class like so:

{% highlight ruby %}
coffee_table = Furniture::Table.new
{% endhighlight %}

Note the use of the double colon (`::`) to denote the nested namespace.  In this case, it tells Ruby to look for a `Table` class or module nested inside of a `Furniture` class or module.  This specificty allows us to define another namespaced `Table` class without overwriting the `Furniture::Table` class we already have.  Additionally, the syntax promotes readable code by giving the programmer a clear visual indication of the namespacing.
