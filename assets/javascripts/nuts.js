$(document).ready(function() {
  var rotator = new ImageRotator();
  rotator.init();
  var rotationTimer = setInterval(rotator.cycleImages, 4000);

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
        scrollTop: $($(target).attr('href')).offset().top - 100
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


function ImageRotator() {
  var $container = $('.image-rotator');
  var currentUrl = 0;
  var imageUrls = [];

  this.init = function() {
    setInitialImage(window.location.pathname);
    setImageUrls(window.location.pathname);
  }

  this.cycleImages = function () {
    currentUrl++;
    if (currentUrl === imageUrls.length) {
      currentUrl = 0;
    }
    animate(imageUrls[currentUrl]);
  };

  function googleBucketUrlFrom(url) {
    return "url('https://storage.googleapis.com/john-hess/portfolio/"+url+".png')";
  }

  function animate(url) {
    $container.fadeOut(1500, function() {
      $container.css('background-image', googleBucketUrlFrom(url));
      $container.fadeIn(1500);
    });
  }

  function setImageUrls(location) {
    if (location === '/portfolio/west-coast-skateparks/') {
      imageUrls = ['wcs', 'wcs2', 'wcs3', 'wcs4'];
    } else if (location === '/portfolio/music-tree/') {
      imageUrls = ['mt', 'mt2', 'mt3', 'mt4'];
    } else if (location === '/portfolio/repo-ranker/') {
      imageUrls = ['rr', 'rr2', 'rr3'];
    }
  }

  function setInitialImage(location) {
    if (location === '/portfolio/west-coast-skateparks/') {
      $container.css('background-image', googleBucketUrlFrom('wcs'));
    } else if (location === '/portfolio/music-tree/') {
      $container.css('background-image', googleBucketUrlFrom('mt'));
    } else if (location === '/portfolio/repo-ranker/') {
      $container.css('background-image', googleBucketUrlFrom('rr'));
    }
  }
}
