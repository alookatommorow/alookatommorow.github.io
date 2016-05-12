$(document).ready(function() {

  if (window.location.pathname !== '/') {
    $(".blog-hide").hide();
  }

  // $(window).scroll(function() {
  //   if ($(window).scrollTop() > 767) {
  //     $('.nav-item').css("color", "#EDE5C9");
  //   } else {
  //     $('.nav-item').css("color", "white");
  //   }
  // });

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
