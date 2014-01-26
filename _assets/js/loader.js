$(document).ready(function() {
	
	// Settings
	var slideToSpeed = 600;
	var slideUpSpeed = 300;
	var $easingType= 'easeInOutSine';
	
	// Caching
	var $close_button = $('.close');	
	var $load_items = $('a.loadcontent');
	
	//var $work_button = $('.work');
	//var $no_load = $('a.no-load');
	// end Caching
 
	
	// Control if hash is set if yes, we load the wanted content
	var hash = window.location.hash.substr(1);
	$('a').each(function(){
		var $this = $(this);							 
		var rel = $this.attr('rel');
		var href = $this.attr('href');
		if(hash==rel){
			$(this).addClass('active');	
			$('html,body').animate({scrollTop: $("#Header").prop("scrollHeight")}, slideToSpeed, $easingType, function() {
				$(this).addClass('active');
				loadContent(href);																										
			});
		}											
	});
		
	
	$load_items.click(function() {
		//  remove & add active class
		$load_items.removeClass('active');
		$(this).addClass('active');					   
		//					   
			
		var $this = $(this);	
		var rel = $this.attr('rel');
		var href = $this.attr('href');
		
		if(window.location.hash.substr(1) == rel) { 
			$('html,body').animate({scrollTop: $("#Header").prop("scrollHeight")}, slideToSpeed, $easingType);
		} else {
			window.location.hash = rel;	// set the hash
			$('html,body').animate({scrollTop: $("#Header").prop("scrollHeight")}, slideToSpeed, $easingType, function() {
				$close_button.fadeOut(100);
				$('#PageContent').slideUp(slideUpSpeed, function() {
					loadContent(href);
				});													
			});
		}
		return(false);
	});
	
	
	$close_button.click(function() {
		$load_items.removeClass('active');
		$close_button.fadeOut(500);
		$('#PageContent').slideUp(slideUpSpeed, $easingType);
		window.location.hash = "#_"; // delete hash
		return(false);
	});
	
	
	function loadContent(href) {
		
		$('.loader').fadeIn('fast');
		
		var LoadContentWrapper = href+' #PageContent';
		
		$('#PageLoader').delay(500).queue(function() {
			$(this).load(LoadContentWrapper, function() {
				$('.loader').fadeOut(500);
				$('#PageContent').slideDown(slideUpSpeed, $easingType, function() {
					$close_button.fadeIn(500);
				});	
				initialise('#PageContent'); // after loading is complete we initialise all scripts
			});
			$(this).dequeue();
		});

	}

});
