jQuery(document).ready(function($){
	"use strict";


/*=== background parallux ====*/
	$(window).stellar();

/*=== smooth in-page link scroll  ====*/
	$('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 1000);
	    return false;
	});
/*=== enable css3 animation on scroll using waypoints ====*/
	setTimeout(css_animation, 1500);
		
	function css_animation(){
		$('.animate-this').waypoint(function() {
		     var animation_type = $(this).attr("data-animation");
		     $(this).addClass(animation_type);
		     $(this).addClass('animated');
		     $(this).removeClass('animate-this');
		}, { offset: '80%' }); 
	}

/*=== testimonial slider ====*/
	$('#testimonial-slider').owlCarousel({
		 navigation: true, // Show next and prev buttons
        slideSpeed: 800,
        paginationSpeed: 400,
        autoPlay: 5000,
        singleItem: true,
        navigationText : ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        pagination : false,
	});

/*=== screenshot gallery ====*/
	$('#screenshot-galerry').owlCarousel({
		navigation: false, // Show next and prev buttons
        slideSpeed: 800,
        paginationSpeed: 400,
        autoPlay: false,
        items : 4,
	    itemsCustom : false,
	    itemsDesktop : [1199,4],
	    itemsDesktopSmall : [980,3],
	    itemsTablet: [768,2],
	    itemsTabletSmall: false,
	    itemsMobile : [479,1],
	});


/*===email validaton check function ===*/
	function isValidEmailAddress(emailAddress){
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
	};

/*=== email subscribe ===*/
	$('#subscribe-form').submit(function(e){
		e.preventDefault();
		$('#subscribe-submit').attr('disabled', 'disabled' );
		var subscribe_email = $('#subscribe-email').val();
		var subscribe_post_data = $(this).serialize();
		if(isValidEmailAddress(subscribe_email)){
			$.ajax({
				type: "POST",
	            url: "php/subscribe.php", //**** change this fime name to save-to-text.php to save the email in subscriber.txt file ********/
	            data: subscribe_post_data,
	            success: function () {
	            	$('#subscribe-submit').removeAttr('disabled');
	                $('#subscribe-success').fadeIn(500).delay( 10000 ).fadeOut(500);
	                $('#subscribe-error').fadeOut(500);
	            }
			});
		}
		else {
			$('#subscribe-submit').removeAttr('disabled');
	        $('#subscribe-error').fadeIn(500).delay( 10000 ).fadeOut(500);
	        $('#subscribe-success').fadeOut(500);
		}
	});

/*=== contact form ====*/
	$('#contact-form').submit(function(e){
		e.preventDefault();
		$('#contact-submit').attr('disabled', 'disabled' );
		var name = $('#name').val();
		var email = $('#email').val();
		var message = $('#message').val();
		var postData = $(this).serialize();
		if ((name.length > 1) && isValidEmailAddress(email) && (message.length > 1)){
	        $.ajax({
	            type: "POST",
	            url: "php/contact.php",
	            data: postData,
	            success: function () {
	            	$('#contact-submit').removeAttr('disabled');
	                $('#contact-success').fadeIn(500).delay( 10000 ).fadeOut(500);
	                $('#contact-error').fadeOut(500);
	            }
	        });
	    }
	    else {
	    	$('#contact-submit').removeAttr('disabled');
	        $('#contact-error').fadeIn(500).delay( 10000 ).fadeOut(500);
	        $('#contact-success').fadeOut(500);
	    }
	});
});
/*=== end docunent ready ===*/

/*=== start document load ===*/
$(window).load(function(){
	//NProgress.done();
	$('.preload').delay(1500).fadeOut(1000);
});