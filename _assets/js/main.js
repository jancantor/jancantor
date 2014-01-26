$(document).ready(function() {
	
	/* Fadein on Load
	+++++++++++++++++++++++++++++++++++ */
	$(function() {
  		$('#header').hide().delay(500).slideDown(650);
  		$("#work").hide().delay(500).fadeIn(850);
    	$('#footer').hide().delay(500).fadeIn('fast');
  	});
	
	/* magic line 
	+++++++++++++++++++++++++++++++++++ */
	/*
	$(function() {
	    var $el, leftPos, newWidth,
	        $mainNav = $("#menu");
	
	    $mainNav.append("<li id='magic-line'></li>");
	    var $magicLine = $("#magic-line");
	
	    $magicLine
	        .width($(".current").width())
	        .css("left", $(".current a").position().left)
	        .data("origLeft", $magicLine.position().left)
	        .data("origWidth", $magicLine.width());
	
	    $("#menu li a").hover(function() {
	        $el = $(this);
	        leftPos = $el.position().left;
	        newWidth = $el.parent().width();
	        $magicLine.stop().animate({
	            left: leftPos,
	            width: newWidth
	        });
	    }, function() {
	        $magicLine.stop().animate({
	            left: $magicLine.data("origLeft"),
	            width: $magicLine.data("origWidth")
	        });
	    });
	    
	 });
	 */
    
    
	/* smooth scrolling
	+++++++++++++++++++++++++++++++++++ */
	function filterPath(string) {
	return string
		.replace(/^\//,'')
		.replace(/(index|default).[a-zA-Z]{3,4}$/,'')
		.replace(/\/$/,'');
	}
	var locationPath = filterPath(location.pathname);
	var scrollElem = scrollableElement('html', 'body');
	
	$('a[href*=#]').each(function() {
		var thisPath = filterPath(this.pathname) || locationPath;
		if (  locationPath == thisPath
		&& (location.hostname == this.hostname || !this.hostname)
		&& this.hash.replace(/#/,'') ) {
	  		var $target = $(this.hash), target = this.hash;
	  		if (target) {
	    		var targetOffset = $target.offset().top;
	    		$(this).click(function(event) {
	      			event.preventDefault();
	      			$(scrollElem).animate({scrollTop: targetOffset}, 600, function() {
	        			location.hash = target;
	      			});
	    		});
	  		}
		}
	});
	// use the first element that is "scrollable"
	function scrollableElement(els) {
		for (var i = 0, argLength = arguments.length; i <argLength; i++) {
	  		var el = arguments[i],
	      		$scrollElement = $(el);
	  		if ($scrollElement.scrollTop()> 0) {
	    		return el;
	  		} else {
	    		$scrollElement.scrollTop(1);
	    		var isScrollable = $scrollElement.scrollTop()> 0;
	    		$scrollElement.scrollTop(0);
	    		if (isScrollable) {
	      			return el;
	    		}
	  		}
		}
	return [];
	}
	
	
	/* @media landscape fix
	+++++++++++++++++++++++++++++++++++ */
	(function(doc) {

		var addEvent = 'addEventListener',
		    type = 'gesturestart',
		    qsa = 'querySelectorAll',
		    scales = [1, 1],
		    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
	
		function fix() {
			meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			doc.removeEventListener(type, fix, true);
		}
	
		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			fix();
			scales = [.25, 1.6];
			doc[addEvent](type, fix, true);
		}

	}(document));
	
	/* Fancybox
	+++++++++++++++++++++++++++++++++++ */
	$(".fancybox").fancybox({
		openEffect	: 'elastic',
		closeEffect	: 'elastic'
	});


});
