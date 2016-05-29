$(document).ready(function() {
  var rotator = new ImageRotator();
  rotator.init();
  var rotationTimer = setInterval(rotator.cycleImages, 4000);

  if (window.location.pathname !== '/') {
    $(".blog-hide").hide();
    $('.navbar.navbar-fixed-top').css("background-color", "#76323F")
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
      if (window.innerWidth > 767) {
        $('.navbar.navbar-fixed-top').css("background-color", "transparent");
      } else {
        $('.navbar.navbar-fixed-top').css("background-color", "#76323F");
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


function ImageRotator() {
  var $image = $('.image-rotator');
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
    return "https://storage.googleapis.com/john-hess/portfolio/"+url+".png";
  }

  function animate(url) {
    $image.fadeOut(1500, function() {
      $image.attr("src", googleBucketUrlFrom(url));
      $image.fadeIn(1500);
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
      $image.attr("src", googleBucketUrlFrom('wcs'));
    } else if (location === '/portfolio/music-tree/') {
      $image.attr("src", googleBucketUrlFrom('mt'));
    } else if (location === '/portfolio/repo-ranker/') {
      $image.attr("src", googleBucketUrlFrom('rr'));
    }
  }
}
