---
layout: post
title:  "Displaying Images"
date:   2016-11-27 10:47:29 -0700
comments: true
categories: css front-end fundamentals
---

Without a clear understanding of exactly what's going on when we apply CSS `width`, `height`, and `position` properties, it can be difficult to make elements appear the way we want them to. Images are no exception. Let's take a comprehensive look at HTML `<img>` elements and how we can control their behavior.

HTML image elements are `replaced elements`. That means their size and appearance are determined indepently of CSS. These elements have intrinsic properties that determine how they are displayed. If you insert an `<img>` tag into a web page without giving it a set height and width, the space it occupies is dictated by its inherent attributes.

As developers, this is rarely what we need. We usually need to make sure this image stays inside of a container or changes size when viewed on different devices. Specifying the image's height or width is a good starting point for controlling how much space it takes up. If we place an `<img>` tag on the page and use CSS give it a height of 200px, the image will appear 200px tall, holding proportions constant. Take the following example:

{% highlight html %}
<img class="sneetches" src="/sneetches.jpg" alt="sneetches">
{% endhighlight %}

{% highlight css %}
.sneetches {
  height: 200px;
}
{% endhighlight %}

The above code generates the following:

<img class="sneetches-height" src="https://s3-us-west-1.amazonaws.com/jh-blog/sneetches.jpg" alt="sneetches">

The image of the Sneetches (from "The Sneetches and Other Stories" by Dr. Suess) has intrinsic dimensions of 422x471 pixels. Since we gave it a height of 200px but did not set width, CSS sets height to 200px but keeps the width set to its inital value of `auto` so the original proportions of the image are maintained. If we instead gave it a width property and no height, CSS would keep height at `auto` and scale the image proportionally to meet the width we set.

If we set both height and width, proportions will not be maintained and the image will stretch to meet our dimensions:

{% highlight css %}
.sneetches {
  height: 200px;
  width: 300px;
}
{% endhighlight %}

<img class="sneetches-both" src="https://s3-us-west-1.amazonaws.com/jh-blog/sneetches.jpg" alt="sneetches">

That is funny looking! Usually we want to maintain the proportions of our images so we would set height or width and not both.

One drawback of setting these properties using pixels is that, when viewed on devices of different sizes, the image does not scale to fit the device. An image with a width of 800px will get cut off on a device with a screen width of 375px. Though we can write media queries to adjust the size for different devices, we can also express the width and height of an image as a percentage.

## Image Height and Width as a Percentage

When we use percentages to set the dimensions of an image, it is important to realize what that percentage refers to. A percentage width or height does not refer to the intrinsic dimensions of the image. It refers to the `containing block` of the `<img>` element on the DOM. An element's `containing block` is an important concept in CSS, so if it doesn't sound familiar be sure to read up on it. [This link](http://reference.sitepoint.com/css/containingblock) provides a clear explanation. In short, if an element's position is `static` (the default) or `relative`, its `containing block` is the nearest block-level parent element. If the element's position is not `static` or `relative`, its `containing block` is the nearest parent whose position is `absolute`, `fixed`, or `relative`.

If we just throw an image onto our HTML document at the root level, its `containing block` is the viewport. If we give it a percentage width, the percentage will be in reference to the width of the viewport. If we give the image a width of 50%, it will always take up half of the entire screen, holding proportions constant. If we put the image inside a container div, set its width to 220px, and give the image a width of 50%, it will take up half of the containing div's width (110px):
{% highlight html %}
<div class="sneetch-container">
  <img class="sneetches" src="/sneetches.jpg" alt="sneetches">
</div>
{% endhighlight %}

{% highlight css %}
.sneetch-container {
  margin: 0 auto; /* center the div */
  background-color: red;
  width: 240px; /* set div width to 240px */
}
.sneetches {
  width: 50%; /* set image width to 50% */
}
{% endhighlight %}

<div class="sneetch-div-container">
  <img class="sneetches" src="https://s3-us-west-1.amazonaws.com/jh-blog/sneetches.jpg" alt="sneetches">
</div>

As you can see, the image takes up half of the containing div. Since the container's width is fixed at 240px, this is effectively fixing the image's width at 110px. Usually, we use percentage widths so that elements will adapt to different screen sizes. We can achieve that in this example by setting the containing div's width to 50%:
{% highlight html %}
<div class="sneetch-container">
  <img class="sneetches" src="/sneetches.jpg" alt="sneetches">
</div>
{% endhighlight %}

{% highlight css %}
.sneetch-container {
  ...
  width: 50%; /* set div width to 50% */
}
.sneetches {
  width: 50%; /* set image width to 50% */
}
{% endhighlight %}

<div class="sneetch-half-container">
  <img class="sneetches" src="https://s3-us-west-1.amazonaws.com/jh-blog/sneetches.jpg" alt="sneetches">
</div>

Now, when we resize the browser, the container div and the image within are responsive, always taking up 50% of their respective containing blocks.

## Percentage Height

Setting a percentage height on an image is a bit more tricky, making a percentage width the preferred choice. A percentage height will only do what we want it to if the element's containing block has an explicitly defined height. If the containing block's height is dependent on its content (not explicitly defined) and its position is not absolute, height will be set to auto. For this reason, manipulating an image with percent width gives us greater control.

## Keeping it in




