$(document).ready(function() {
    /* navigation */
    $('.navigation a, .head-btn-apply, .btn-top').click(function(){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });

    /* gallery */
    $('.gallery-tab li a').click(function(){
        var onTab = $(this).parent('li');
        var onTabClass = onTab.attr('class');
        onTab.addClass('active').siblings().removeClass('active');
        $('.box-gallery .'+ onTabClass).addClass('active').siblings().removeClass('active');
    });
    $('.box-gallery .tab .arrows a').click(function(){
        var tabNo = Number($(this).parents('.tab').attr('no'));
        if( $(this).hasClass('next') ) {
            tabNo += 1;
            if(tabNo == 6){tabNo = 1;}
        }
        else if( $(this).hasClass('prev') ) {
            tabNo -= 1;
            if(tabNo == 0){tabNo = 5;}
        }
        $(".gallery .tab0"+tabNo).addClass('active').siblings().removeClass('active');
    });

    var tabNo = 0;
    var mySwiper;
    var videos = ["knqkGaw7Vbg", "gfnv9oaBnUA", "4NqwXlRR5o8", "sj3B0rzHWzE" ,"-jVCJ71X7GE"];
    $('.box-gallery .images a').click(function(){
        tabNo = Number($(this).parents('.tab').attr('no'));
        var slideNo = Number($(this).attr('slideNo')) +1;

        $("[class*=tab0"+tabNo+"]").find('.play').attr('src','https://www.youtube.com/embed/'+videos[tabNo-1]+'?autoplay=0&rel=0&controls=1');
        $('.popup-gallery.tab0' + tabNo).show();

        /* gallery slide */
        var swiper = new Swiper('.swiper-container.tab0'+tabNo, {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 1,
            initialSlide: slideNo-1,
            observer: true,
            observeParents: true,
            loop: true
        });

        mySwiper = $('.swiper-container')[tabNo-1].swiper;
        mySwiper.on('slideChangeStart', function () {
            var index = mySwiper.realIndex;
            var videoUrl = $("[class*=tab0"+tabNo+"]").find('.play');

            if ( index == 0 ) {
                videoUrl.attr('src','https://www.youtube.com/embed/'+videos[tabNo-1]+'?autoplay=0&rel=0&controls=1');
            } else {
                videoUrl.attr('src','');
                videoUrl.attr('src','https://www.youtube.com/embed/'+videos[tabNo-1]+'?autoplay=0&rel=0&controls=1');
            }
        });
        mySwiper.update();
    });

    $('.close-gallery').click(function(){
        mySwiper.destroy();
        tabNo = 0;
        closeVideo();
    });

    /* layer popup */
    $('.close-popup').click(function(){
        $('.layer-popup').hide();
    });
    $(document).mouseup(function (e) {
        var container = $(".swiper-container, .swiper-button, .box-video");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            container.parents('.popup-gallery, .popup-main-video').css("display","none");
            closeVideo();
        }
    });
    $('.popup-gallery').click(function(e){
        var container = $(".swiper-container, .swiper-button, .close-gallery");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            mySwiper.destroy();
            tabNo = 0;
        }
    });
    $(['gallery-list01.png','gallery-list02.png','gallery-list03.png','gallery-list04.png','gallery-list05.png',
        'bg_popup.png','bg_popup02.png','popup-noti.png','popup-personal.png']).preload();
});
function openLayer(popupId) {
    $('.popup-'+popupId).show();
}
function closeVideo(){
    $('.play').attr('src','');

};
$.fn.preload = function() {
    this.each(function(){
        $('<img/>')[0].src = 'resources/images/mo/'+this;
    });
}
function mainVideoPlay(){
    $('.popup-main-video').find('.play').attr('src','https://www.youtube.com/embed/eQlF3Yz_Gyc?autoplay=0&rel=0');
};
$(window).scroll(function() {
    var top = $(document).scrollTop();
    if ( top >= Number($('.application').offset().top)-100 && top < Number($('.gallery').offset().top)-100 ) {
        $('.nav01').addClass('on').siblings().removeClass('on');
    }
    else if( top < Number($('.event').offset().top)-100 && top >= Number($('.gallery').offset().top)-100 ){
        $('.nav02').addClass('on').siblings().removeClass('on');
    }
    else if( top < Number($('.community').offset().top)-100 && top >= Number($('.event').offset().top)-100 ){
        $('.nav03').addClass('on').siblings().removeClass('on');
    }
    else if( top >= Number($('.community').offset().top)-100 ){
        $('.nav04').addClass('on').siblings().removeClass('on');
    } else {
        $('.navigation li').removeClass('on');
    }
});