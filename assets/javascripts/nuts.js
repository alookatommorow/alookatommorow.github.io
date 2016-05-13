$(document).ready(function() {

  if (window.location.pathname !== '/') {
    $(".blog-hide").hide();
    $('.navbar.navbar-fixed-top').css("background-color", "#76323F")
  }

  // change navbar color based on scroll
  $(window).scroll(function() {
    if ($(window).scrollTop() > 946) {
      $('.navbar.navbar-fixed-top, .nav-item > a.anchor-tag').css("background-color", "#76323F");
    } else {
      $('.navbar.navbar-fixed-top, .nav-item > a.anchor-tag').css("background-color", "transparent");
    }
  });

  //debug bootsrap nav
  $('.anchor-tag').mouseleave(function() {
    if ($(window).scrollTop() > 946) {
      $($(this)).css("background-color", "#76323F");
    } else {
      $($(this)).css("background-color", "transparent");
    }
  });

  // close mobile dropdown after link click
  $('.anchor-tag').on('click', function(){
    $('.navbar-toggle').click();
  });

  //smooth scroll
  function smoothScroll(target) {
    $('html, body').animate({
        scrollTop: $($(target).attr('href')).offset().top
    }, 500);
  }

  $('.anchor-tag').click(function() {
    smoothScroll(this);
    return false;
  });

  // $('#about').mouseover(function() {
  //   $(this).addClass('animated bounceOutLeft');
  // })
});
