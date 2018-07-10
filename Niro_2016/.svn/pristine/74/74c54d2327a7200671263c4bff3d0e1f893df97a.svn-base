$(function() {
	$('header button').on('click', function(e) {
		$('html').toggleClass('show-menu');
	});
	$('header nav').on('click', function(e) {
		if(e.target == $('header nav').get(0))
			$('html').toggleClass('show-menu');
	});

	$('.nav.page ul').scrollLeft(function() {
		return $(this).find('li.active').offset().left;
	});
});
/*
 * cookie
 */
var Cookie = {
	set: function(c_name, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	},
	get: function(c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
	}
};
