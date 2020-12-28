
$(function() {
	var navbar = $(".navbar");
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
	
		if (scroll >= 250) {
			navbar.removeClass('navbar').addClass("navbar-alt");
		} else {
			navbar.removeClass("navbar-alt").addClass('navbar');
		}
	});
});
