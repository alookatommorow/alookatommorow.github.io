---
layout: post
title:  "Data Attributes and Ajax in Rails"
date:   2016-09-06 10:47:29 -0700
categories: ruby rails ajax javascript development
---
Here we will explore a pattern that is useful for adding dynamic content to a Rails application.  To enable this, we will make use of HTML5 data attributes and jQuery ajax requests in conjuction with our Rails application.

Let's say we have a Rails app with a database of movies. Users can browse movies and those who have created an account can write reviews of a given movie.  In the view for the `show` action of the `Movies` controller, we list out the director, year, and country of the movie.  We also render a partial to display the movie's reviews:

{% highlight erb %}
#app/views/movies/show.html.erb

<h1> <%= @movie.title %></h1>
<div class="movie-info">
  <div><%= @movie.director %></div>
  <div><%= @movie.year %></div>
  <div><%= @movie.country %></div>
</div>

<div data-ajax-replace="reviews-container">
  <%= render partial: "reviews", locals: {  movie: @movie, reviews: @movie.reviews } %>
</div>
{% endhighlight %}

Notice that the container for the reviews has a data attribute identifying itself. Data attributes are HTML attributes that allow us to attach data to an individual element. This data can be accessed by JavaScript and CSS, giving us flexibilty and power when interacting with the DOM. As you will see shortly, this data attribute will come in handy.

The `reviews` partial displays the number of reviews, lists out the reviews, and provides a form that a logged in user can use to submit a review:

{% highlight erb %}
#app/views/application/_reviews.html.erb

<div>Reviews: <%= reviews.size %></div>
<% reviews.each do |review| %>
  <div><%= review.review %></div>
<% end  %>
<% if logged_in? %>
  <%= form_for :review, url: reviews_path, data: {ajax_submit: "reviews-container"} do |f| %>
    <%= f.text_area :review, placeholder: "Write review here..." %>
    <%= f.hidden_field :movie_id, value: movie.id %>
    <%= f.hidden_field :user_id, value: current_user.id %>
    <%= f.submit "Submit Review"  %>
  <% end %>
<% end %>
{% endhighlight %}

We would like to use ajax to submit this form, create a review, and dynamically update the content being displayed. Notice in the above snippet that we pass the form helper a `data` hash with a key of `ajax_submit` and a value corresponding to the parent container, `"reviews-container"`. The data attribute stores a reference to the element whose content we will update with the result of our ajax call.

I like to use data attributes to separate styling and business logic. Using class names to correspond with styling and data attributes to correspond to creation and display of data gives the developer a clear separation of concerns.

Now let's write the JavaScript to handle our ajax request. Rather than rely on Rails' `remote: true` functionality to handle the ajax call, we will write our own code. Though I usually advocate for sticking with Rails conventions, writing custom JavaScript gives us more control over the code that is executed, the way we handle the request in our controller, and the way we organize our files.

{% highlight javascript %}
// app/assets/javascripts/reviews.js

$(document).ready(function() {
  $("[data-ajax-replace]").on("submit", "[data-ajax-submit]", function(event) {
    event.preventDefault();
    var url = this.action;
    var data = $(this).serialize();
    var callback = renderResponse.bind(this);

    $.post(url, data, callback);
  });

  function renderResponse(response) {
    var container = $(this).data("ajax-submit");
    $("[data-ajax-replace="+container+"]").html(response);
  }
});
{% endhighlight %}

In the above snippet we use jQuery to attach a listener to the submission of the form. Since the partial containing the form will be changed dynamically, we use event delegation to attach the listener to the form's parent container, which remains unchanged throughout the process. We prevent the form from navigating to a different page with `event.preventDefault()`. We then extract the information we need to send to the controller and format it to pass to the ajax request. We make use of jQuery's `post` method to execute the request, passing it the appopriate arguments. The callback function reads the `ajax-submit` data attribute from the form and uses that to replace the html of the corresponding container element with the response. Before the callback is invoked, though, the request will hit our `Reviews` controller:

{% highlight ruby %}
class ReviewsController <ApplicationController

  def create
    Review.create(review_params)
    @movie = Movie.includes(:reviews).find(review_params[:movie_id])
    render_reviews
  end

  private

  def review_params
    params.require(:review).permit(:movie_id, :user_id, :review)
  end

  def render_reviews
    render partial: "reviews", locals: { reviews: @movie.reviews, movie: @movie }
  end
{% endhighlight %}

In the controller, we simply create a new review, retrieve all the reviews for the given movie, then render the partial as our response, passing in the appropriate locals. Let's take another look at the JavaScript in `reviews.js` that handles our request:


{% highlight javascript %}
// app/assets/javascripts/reviews.js

$(document).ready(function() {
  $("[data-ajax-replace]").on("submit", "[data-ajax-submit]", function(event) {
    event.preventDefault();
    var url = this.action;
    var data = $(this).serialize();
    var callback = renderResponse.bind(this);

    $.post(url, data, callback);
  });

  function renderResponse(response) {
    var container = $(this).data("ajax-submit");
    $("[data-ajax-replace="+container+"]").html(response);
  }
});
{% endhighlight %}

Notice that no values in the function are hard coded. All the information we need is stored in the data attributes of the HTML. The code does not reference specific class names that can change from element to element. This code is flexible and can be reused. If we have another situation where we want to send a post request and dynamically update a display, this code will handle it.  All we have to do is assign the appropriate data attributes to the form and the container we want to update!