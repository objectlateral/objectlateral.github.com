$(function() {

	$("#seal").mouseenter(function() {
		$(this).addClass('over');
		$('.comet').addClass('over');
		$('#cometTrail').addClass('over');
	}).mouseleave(function() {
		$(this).removeClass('over');
		$('.comet').removeClass('over');
		$('#cometTrail').removeClass('over');
	});


	$('input, textarea').focus(function() {
		$(this).prev('label').hide();
	});

	$('input, textarea').blur(function() {
		if ( $(this).val() === '' ) {
			$(this).prev('label').show();
		}
	});


	// Main Slider


	function hs_largestChild(theParent) {
        var max = 0;
		$(theParent).children().each(function(){
		   var h = $(this).height();
		   if(h > max)
		        max = h;
		});
        $(theParent).css('height',max);		
	}	

	$('#slides').cycle({ 
	    speed:    300, 
	    timeout:  5000, 
    	slideResize: true,
    	containerResize: false,
    	fx: 'fade',
    	width: '100%',
   		fit: 1, 
   		next: '.rightArrow',
   		prev: '.leftArrow'

   	});

   	// Testimonial Slider

   	var currentTestimonial;

    function hs_clientTestimonialCheck() {
    	currentTestimonial = $('.testimonials ul li:visible').attr('class');
    	$('.clients ul li').removeClass('current');
    	$('.clients ul li.'+currentTestimonial).addClass('current');
    }

	$('.testimonials ul').cycle({ 
	    speed:    500, 
	    timeout:  5000, 
    	slideResize: true,
    	containerResize: false,
    	fx: 'fade',
    	width: '100%',
   		fit: 1, 
   		after: hs_clientTestimonialCheck,
   		next: '.nextTesti',
   		prev: '.prevTesti'

   	});
	

	// Make sure sliders are the right height
	hs_largestChild('.testimonials ul');
	hs_largestChild('#slides');

    $(window).resize(function(){
		hs_largestChild('.testimonials ul');
		hs_largestChild('#slides');
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


});