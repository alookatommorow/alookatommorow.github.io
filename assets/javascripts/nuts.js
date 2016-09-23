$(document).ready(function() {


  if (window.location.pathname !== '/') {
    $(".blog-hide").hide();
    $('.navbar.navbar-fixed-top').css("background-color", "#76323F")
  }

  if (window.location.pathname.includes("portfolio")) {
    new ImageRotator().init();
  }

  // nav bar styling for home page
  if (window.location.pathname === '/') {

    //change navbar color on scroll on non-mobile sizes
    $(window).scroll(function() {
      if (window.innerWidth > 767) {
        if ($(window).scrollTop() > 946) {
          $('.navbar.navbar-fixed-top, .nav-item > a.anchor-tag').css("background-color", "#76323F");
        } else {
          $('.navbar.navbar-fixed-top, .nav-item > a.anchor-tag').css("background-color", "transparent");
        }
      }
      else {
        $('.navbar.navbar-fixed-top').css("background-color", "#76323F");
      }
    });

    $(window).resize(function() {
      if (window.innerWidth > 767 && $(window).scrollTop() < 946) {
        $('.navbar.navbar-fixed-top, .nav-item > a.anchor-tag').css("background-color", "transparent");
      } else {
        $('.navbar.navbar-fixed-top, .nav-item > a.anchor-tag').css("background-color", "#76323F");
      }
    })

    // debug bootsrap nav
    $('.anchor-tag').mouseleave(function() {
      if (window.innerWidth > 767) {
        if ($(window).scrollTop() > 946) {
          $($(this)).css("background-color", "#76323F");
        } else {
          $($(this)).css("background-color", "transparent");
        }
      }
    });
  }

  // close mobile dropdown after link click
  $('.anchor-tag').on('click', function(){
    $('.navbar-toggle').click();
  });

  //smooth scroll
  function smoothScroll(target) {
    $('html, body').animate({
        scrollTop: $($(target).attr('href')).offset().top - 100
    }, 500);
  }

  $('.anchor-tag').click(function() {
    smoothScroll(this);
    return false;
  });

  // contact info
  $(".contact-info-btn").click(function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    displayContactInfo($(this).data().text);
  });

  $(".contact-info-btn").mouseover(function() {
    displayContactInfo($(this).data().text);
  });

  $(".contact-info-btn").mouseleave(function() {
    displayContactInfo($(".contact-info-btn.active").data().text);
  });

  function displayContactInfo(info) {
    $(".info-display").replaceWith("<p class='info-display'>"+info+"</p>");
  }
});


