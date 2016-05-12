$(document).ready(function() {

  if (window.location.pathname !== '/') {
    $(".blog-hide").hide();
  }

  $(window).scroll(function() {

    if ($(window).scrollTop() > 900) {
      console.log($(window).scrollTop());
      $('.navbar.navbar-fixed-top').css("background-color", "#76323F");
    } else {
      $('.navbar.navbar-fixed-top').css("background-color", "transparent");
    }
  });

  //debug bootsrap nav
  $('a.anchor-tag').mouseleave(function() {
    $(this).css("background-color", "transparent");
  })

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
});
