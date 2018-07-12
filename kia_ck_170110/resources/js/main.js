$(window).load(function(){

  //tab & mobile filmeSlide
  var films = $('.filmeSlide>ul').bxSlider({
    infiniteLoop: false,
    hideControlOnEnd: true,
    controls: false
  });
  //main line click
  var filmsY = $('#films').offset().top-80;
  $('#main .ep01 a').click(function(){
    $scrollElement.animate({'scrollTop' : filmsY}, 700);
    films.goToSlide(0);
    return false;
  });
  $('#main .ep02 a').click(function(){
    $scrollElement.animate({'scrollTop' : filmsY}, 700);
    films.goToSlide(1);
    return false;
  });
  $('#main .ep03 a').click(function(){
    $scrollElement.animate({'scrollTop' : filmsY}, 700);
    films.goToSlide(2);
    return false;
  });
  $('#main .ep04 a').click(function(){
    $scrollElement.animate({'scrollTop' : filmsY}, 700);
    films.goToSlide(3);
    return false;
  });

  var $scrollElement = $('html, body'),
      $sct ,
      $offsetTop ,
      menuY = new Array ,
      menu = $('body>article');
  menuY = [];
  for ( i=1; i < menu.length; i++){
    var menuTop = menu.eq(i).offset().top;
    menuY.push(menuTop);
  }
  $('nav ul a').on('click', function(e){
    e.preventDefault();
    if( $(this).hasClass('gl') && $('.gal').hasClass('on') ){
      $('.gal_list').addClass('on');
      $('#gal-cnt').removeClass('on');
    }else{
      $offsetTop = $(this.hash).offset().top-80;
      $scrollElement.animate({'scrollTop' : $offsetTop}, 700);
    }
  });
  $(window).scroll(function(){
    $sct = $(window).scrollTop();
    if ( $sct >= $('nav.btm').offset().top + 80) {
      $('nav.top').css({'display':'block'});
    }else{
      $('nav.top').css({'display':'none'});
      $('nav ul>li a').removeClass('on');
    }
    for( j=0; j < menu.length -1; j++ ){
      if( $sct >= menuY[j]-81 ){
        $('nav ul>li a').removeClass('on');
        $('nav.btm ul>li').eq(j).children('a').addClass('on');
        $('nav.top ul>li').eq(j).children('a').addClass('on');
      }else if ($(window).scrollTop() == $(document).height() - $(window).height()){
        $('nav ul>li a').removeClass('on');
        $('nav.top ul>li').eq(1).children('a').addClass('on');
        $('nav.btm ul>li').eq(1).children('a').addClass('on');
      }
    }
  });
  //films video play
  $('.play').on('click', function(e) {
    var url = $(this).data('url') + '?autoplay=1&showinfo=0&fs=0&rel=0&wmode=transparent',
      $wrap = $('<div><button type="button" class="btn-close"><span>close</span></button></div>').addClass('popup').appendTo('body'),
      scrollTop = $(window).scrollTop();

    $('html').addClass('show-popup');

    $wrap.append('<iframe src="" frameborder="0" allowfullscreen></iframe>')
      .find('iframe').attr({src:url});

    $wrap.on('click', '.btn-close', function() {
      $(this).closest('.popup').remove();
      $('html').removeClass('show-popup');

      $(window).scrollTop(scrollTop);
    });
    e.preventDefault();
  });
  //live webcast video play
  $('.play').on('click', function(e) {
    var url = $(this).data('url') + '?autoplay=1&showinfo=0&fs=0&rel=0&wmode=transparent',
      $wrap = $('<div><button type="button" class="btn-close"><span>close</span></button></div>').addClass('popup').appendTo('body'),
      scrollTop = $(window).scrollTop();

    $('html').addClass('show-popup');

    $wrap.append('<iframe src="" frameborder="0" allowfullscreen></iframe>')
      .find('iframe').attr({src:url});

    $wrap.on('click', '.btn-close', function() {
      $(this).closest('.popup').remove();
      $('html').removeClass('show-popup');

      $(window).scrollTop(scrollTop);
    });
    e.preventDefault();
  });
  var videoIdx ;
  $('.video-list>li>span').click(function(){
    videoIdx = $(this).parent('li').index();
    $(this).parent('li').addClass('active').siblings('li').removeClass('active');
    $('.video ul>li').eq(videoIdx).addClass('active').siblings('li').removeClass('active');
  });
  // 20161220 추가
  // films-pc ep list hover effect
  $('.films-pc li.ep-open').hover(function(){
    $(this).css('width','30.48%');
    $(this).siblings('.ep-open').css('width','23.173%');
  },function(){
    $(this).parent().children('.ep-open').css('width','25%');
  });
  $('.photos_slide li a').click(function(){
    $('.wrap_popup').css('display','block');
  });
});
// gallery 페이지 이동 소스
var fileName ;
function gTab(file){
  fileName = file +'.html';
  $('.gal_list').removeClass('on');
  $('#gal-cnt').addClass('on').empty();
  $.get(fileName, function(data){
    $('#gal-cnt').append(data);
  });
}

var winW = $(window).width();
function clickPrev(tabNum){
  var video = $('.g-tab .slide'),
      vl = video.offset().left,
      videoW = video.width(),
      scr = videoW - winW,
      vscr = Math.ceil(scr / winW),
      lscr = scr / vscr;
  if (vl < 0){
    vl+=lscr;
    if (vl < 0){
      video.css('left',vl);
    }else{
        video.css('left',0);
    }
  }
}
function clickNext(tabNum){
  var video = $('.g-tab .slide'),
      vl = video.offset().left,
      videoW = video.width(),
      scr = videoW - winW,
      vscr = Math.ceil(scr / winW),
      lscr = scr / vscr;
  if ( (vl-lscr) >= -scr ){
    vl -= lscr;
    video.css('left',vl );
  }else{
    video.css('left',-scr );
  }
}
function gCtrl(fileName){
  $('#gal-cnt').empty();
  $.get(fileName, function(data){
    $('#gal-cnt').append(data);
  });
}
function gBack(){
  $('.gal_list').addClass('on');
  $('#gal-cnt').removeClass('on');
}
// end gallery photos slide
