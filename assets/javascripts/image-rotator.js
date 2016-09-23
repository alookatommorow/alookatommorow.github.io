function ImageRotator() {
  var totalImages;
  var imageIndex = {
    '/portfolio/west-coast-skateparks/': ['wcs', 'wcs2', 'wcs3', 'wcs4'],
    '/portfolio/music-tree/': ['mt', 'mt2', 'mt3', 'mt4'],
    '/portfolio/repo-ranker/': ['rr', 'rr2', 'rr3'],
  }

  this.init = function() {
    generateImages(window.location.pathname);
    setInterval(animate, 4000);
  }

  function googleBucketUrlFrom(url) {
    return "https://storage.googleapis.com/john-hess/portfolio/"+url+".png";
  }

  function animate() {
    var $currentImage = $(".portfolio-image.active");
    var $nextImage = $currentImage.next();
    if ($nextImage.length === 0) {
      $nextImage = $(".portfolio-image.first");
    }
    $currentImage.fadeOut(1500, function() {
      $currentImage.removeClass("active");
      $nextImage.addClass("active").fadeIn(1500);
    });
  }

  function generateImages(location) {
    var url, className;
    totalImages = imageIndex[location].length;

    for (var i = 0; i < totalImages; i++) {
      url = googleBucketUrlFrom(imageIndex[location][i]);
      if (i === 0) {
        className = 'portfolio-image active first'
      } else {
        className = 'portfolio-image'
      }
      $('.image-container').append("<img class='"+ className+"' src='"+url+"'>")
    }
    $(".portfolio-image.first").css("display", "block");
  }
}
