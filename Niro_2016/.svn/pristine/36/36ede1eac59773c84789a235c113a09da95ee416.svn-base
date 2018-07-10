(function($) {
	$.extend($.easing,{ easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;}});
	var $window = $(window),
		$html = $('html'),
		$body = $('body'),
		wheelEv = 'mousewheel DOMMouseScroll',
		pageIndex = 0,
		pageTop = 0,
		scrollLast = 0,
		scrollState = true,
		sectionData = [],
		$scrollElement = (/webkit/i).test(navigator.appVersion) ? $body : $html,
		$sections = $('#header, .section:visible, #footer');

	var pageSet = function() {
		$sections.filter('.section').css({
			height:Math.max(document.documentElement.clientHeight, 1000)
		});

		sectionData = $sections.map(function(i, e) {
			return {
				offset: $(this).offset().top,
				height: $(this).height()
			};
		}).get();
		scrollHeight();
	};

	var pageReady = function() {
		pageSet();
		scrollHeight();

		$window.on('scroll', pageScroll)
			.on('resize', pageResize)
			.on('scrollstop', scrollStop)
			.on(wheelEv, pageWheel)
			.on('keydown', pageKeydown);

		if(!+'\v1') {
			$(document).on(wheelEv, pageWheel)
				.on('keydown', pageKeydown);
		}
	};

	var pageScroll = function() {
		//scrollHeight();
	};

	var pageWheel = function(e) {
		var delta = e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0 ? 1 : -1;
		e.preventDefault();

		if(scrollState === false) { return false; }
		scrollState = false;

		if(delta < 0) {
			pageIndex++;
			if(pageIndex > $sections.length - 1) { pageIndex = $sections.length - 1; }
		} else if(delta > 0) {
			pageIndex--;
			if(pageIndex < 0) { pageIndex = 0; }
		}
		$html.attr('data-page', pageIndex);

		$scrollElement.animate({
			'scrollTop': sectionData[pageIndex].offset
		}, function() {
			scrollState = true;
		});
	};

	var pageKeydown = function(e) {
		var _keyCode = e.keyCode;

		if(_keyCode == 33 || _keyCode == 34 || _keyCode == 38 || _keyCode == 40) {
			e.preventDefault();

			if(scrollState === false) { return false; }
			scrollState = false;

			if(_keyCode == 33 || _keyCode == 38) {
				pageIndex--;
				if(pageIndex < 0) { pageIndex = 0; }
			} else if(_keyCode == 34 ||_keyCode == 40) {
				pageIndex++;
				if(pageIndex > $sections.length - 1) { pageIndex = $sections.length - 1; }
			}

			$html.attr('data-page', pageIndex);

			$scrollElement.animate({
				'scrollTop': sectionData[pageIndex].offset
			}, function() {
				scrollState = true;
			});
		}
	};

	var pageResize = function() {
		pageSet();

		setTimeout(function() {
			$scrollElement.animate({
				'scrollTop': sectionData[pageIndex].offset
			}, function() {
				scrollState = true;
			});
		}, 1000);
	};

	var scrollHeight = function() {
		if ((+new Date()) - scrollLast > 50) {
			scrollLast = +new Date();
			pageTop = $window.scrollTop();

			for(var i=0, l = $sections.length; i<l; i++) {
				if(sectionData[i].offset >= pageTop) {
					pageIndex = i;
					$sections
						.eq(pageIndex).addClass('page-active')
						//.siblings().removeClass('page-active');
					$html.attr('data-page', pageIndex);
					break;
				}
			}
		}
	};

	var scrollStop = function() {
		scrollHeight();
		$(window).trigger('pageActive', [pageIndex]);
	};

	$(pageReady);
})(jQuery);
