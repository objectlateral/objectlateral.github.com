$(function() {
  $("#seal").mouseenter(function() {
    $(this).addClass("over");
    $(".comet").addClass("over");
    $("#cometTrail").addClass("over");
  }).mouseleave(function() {
    $(this).removeClass("over");
    $(".comet").removeClass("over");
    $("#cometTrail").removeClass("over");
  });

  $("input, textarea").focus(function() {
    $(this).prev("label").hide();
  });

  $("input, textarea").blur(function() {
    if ( $(this).val() === "" ) {
      $(this).prev("label").show();
    }
  });

  // Main Slider
  function hs_largestChild(theParent) {
    var max = 0;
    $(theParent).children().each(function(){
      var h = $(this).height();
      if(h > max) {
        max = h;
      }
    });
    $(theParent).css("height",max);
  }

  $("#slides").cycle({
    speed:    300,
    timeout:  5000,
    slideResize: true,
    containerResize: false,
    fx: "fade",
    width: "100%",
    fit: 1,
    next: ".rightArrow",
    prev: ".leftArrow"
  });

  // Testimonial Slider
  var currentTestimonial;

  function hs_clientTestimonialCheck() {
    currentTestimonial = $(".testimonials ul li:visible").attr("class");
    $(".clients ul li").removeClass("current");
    $(".clients ul li."+currentTestimonial).addClass("current");
  }

  $(".testimonials ul").cycle({
    speed:    500,
    timeout:  15000,
    slideResize: true,
    containerResize: false,
    fx: "fade",
    width: "100%",
    fit: 1,
    after: hs_clientTestimonialCheck,
    next: ".nextTesti",
    prev: ".prevTesti"
  });

  // Make sure sliders are the right height
  hs_largestChild(".testimonials ul");
  hs_largestChild("#slides");

  $(window).resize(function(){
    hs_largestChild(".testimonials ul");
    hs_largestChild("#slides");
  });


  // Retina Image Replacement
  if (window.devicePixelRatio == 2) {
    var images = $("img.retina");

    // loop through the images and make them hi-res
    for(var i = 0; i < images.length; i++) {

      // create new image name
      var imageType = images[i].src.substr(-4);
      var imageName = images[i].src.substr(0, images[i].src.length - 4);
      imageName += "@2x" + imageType;

      //rename image
      images[i].src = imageName;
    }
  }

  // Animate Space in contact section if visible
  setInterval(function() {
    $("section#contact:onScreen").addClass("movement");
  }, 1000);

  $.ajaxSetup({
    headers: {"X-Requested-With":"XMLHttpRequest"}
  });

  // Contact Form
  $("form#contact").submit(function(ev) {
    ev.preventDefault();
    var $form = $(this);
    var url = $form.attr("action");
    var name = $form.find("input[name=name]").val();
    var email = $form.find("input[name=email]").val();
    var message = $form.find("textarea[name=message]").val();
    var $notice = $form.find("label.notice");

    if (!name || !email || !message) {
      $notice.text("All fields required!");
    } else {
      $notice.text("En route...");
      $.post(url, {name: name, email: email, message: message}, function(r) {
        $notice.text("Got it. We'll be in touch!");
      });
    }
  });
});
