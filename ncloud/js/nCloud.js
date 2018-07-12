$(function(){
  var $gnb = $('#nC-gnb'),
      $gnbSub = $('#nC-gnb .depth_2 .d3'),
      $gnbsub3,
      lastScroll = 0,
      $sct,
      didScroll;
  $(window).scroll(function(){
    $sct = $(this).scrollTop();
    if( $sct >= 214 ){
      $('.quick-menu').addClass('scroll');
    }else{
      $('.quick-menu').removeClass('scroll');
    }
    didScroll = true;
  });
  setInterval(function(){
    if (didScroll){
      if( $sct == 0 ){
        $gnb.removeClass('scr');
        $('.quick-menu ul>li').eq(3).fadeOut();
      }else{
        $gnb.addClass('scr');
        $('.quick-menu ul>li').eq(3).fadeIn();
      }
      lastScroll = $sct;
    }
    didScroll = false;
  },250);
  $gnbSub.hover(function(){
    $(this).children('.depth_3').slideDown(150);
  },function(){
    $(this).children('.depth_3').css('display','none');
  });

  var $prodCard = $('.main-prod>ul>li'),
      $prodSub = $('.sub-prod>li'),
      cdx;

  $prodCard.hover(function(){
    cdx = $(this).index();
    $(this).addClass('on').siblings('li').removeClass('on');
  },function(){
    $prodCard.removeClass('on');
    $('.mini').removeClass('on');
  });

  $prodSub.children('a').click(function(){
    $prodSub.children('.mini').removeClass('on');
    $(this).next().addClass('on');
    return false;
  });
  // $('.mini-close').click(function(){
  //   $(this).parent('div').removeClass('on');
  //   return false;
  // });

  $('.siteMap dd').hover(function(){
    $(this).children('div').find('ul').addClass('on');
  },function(){
    $(this).children('div').find('ul').removeClass('on');
  });

  var $mainBnr = $('.main-bigBnr .slider'),
      $bnrCtrl = $('.main-bigBnr .indicator>li'),
      $btnL = $('.main-bigBnr>.left'),
      $btnR = $('.main-bigBnr>.right'),
      bnrLen = $mainBnr.children('li').length,
      mainSlider = setInterval(mainBig,7000),
      time = 0,
      bnrX;

  function mainBig(){
    time += 1;
    bnrX = -(time*100);
    $mainBnr.stop().animate({'left':bnrX+'%'});
    $bnrCtrl.eq(time-1).addClass('on').siblings('li').removeClass('on');

    if( time == bnrLen-1 ){
      time=1;
      $mainBnr.stop().animate({'left':bnrX+'%'}).queue(function(){
        $mainBnr.css({'left':'-100%'});
      });
      $bnrCtrl.eq(time-1).addClass('on').siblings('li').removeClass('on');
    }
  }
  function mainBig2(){
    if( time == 0 ){
      time=bnrLen-2;
      bnrX = -(time*100);
      $mainBnr.stop().animate({'left':0}).queue(function(){
        $mainBnr.css({'left':bnrX+'%'});
      });
      $bnrCtrl.eq(time-1).addClass('on').siblings('li').removeClass('on');
    }else{
      time -= 1;
      bnrX = -(time*100);
      $mainBnr.stop().animate({'left':bnrX+'%'});
      $bnrCtrl.eq(time-1).addClass('on').siblings('li').removeClass('on');
    }
  }

  $bnrCtrl.click(function(){
    clearInterval(mainBig);
    time = $(this).index();
    $(this).addClass('on').siblings('li').removeClass('on');
    mainBig();

    return false;
  });

  $btnL.click(function(){
    clearInterval(mainBig);
    $bnrCtrl.eq(time).addClass('on').siblings('li').removeClass('on');
    mainBig2();
    return false;
  });

  $btnR.click(function(){
    clearInterval(mainBig);
    $bnrCtrl.eq(time+1).addClass('on').siblings('li').removeClass('on');
    mainBig();
    return false;
  });

  var $fInfo = $('.Info-Security .slider'),
      $fInfoLeft = $('.Info-Security .left'),
      $fInfoRight = $('.Info-Security .right'),
      infoL = 0,
      scr = 0;

  $fInfoRight.click(function(){
    if( scr == 0 ){
      scr += 1;
      $fInfoLeft.css('display','block');
      $fInfo.css('left',-1152 );
    }else if( scr == 1 ){
      scr += 1;
      $fInfoRight.css('display','none');
      $fInfo.css('left',-2304 );
    }
    return false;
  });

  $fInfoLeft.click(function(){
    if( scr == 2 ){
      scr -= 1;
      $fInfoRight.css('display','block');
      $fInfo.css('left',-1152);
    }else if( scr == 1 ){
      scr -= 1;
      $fInfoLeft.css('display','none');
      $fInfo.css('left',0);
    }
    return false;
  });

  var $guide = $('.guide-list'),
      $gSelect = $('.guide-list .select');

  $gSelect.click(function(){
    if( !$(this).hasClass('on') ){
      $(this).addClass('on');
      $(this).parent('div').next().addClass('on');
    }else{
      $(this).removeClass('on');
      $(this).parent('div').next().removeClass('on');
    }
    return false;
  });

  var subTit = $('.sub-tit .sw');
  if ( !$('#wrap').hasClass('main') ){
    if ( $gnb.find('.menu').children('li').hasClass('on') ){
      subTit.css({'top':114,'margin-top': ( (266 - subTit.height() )/2 ) + 3 });
    }else{
      subTit.css({'top':60,'margin-top': ( (320- subTit.height() ) /2 ) + 3});
    }
  }

  $('footer .btn-sm').click(function(){
    if( !$(this).hasClass('open') ){
      $(this).addClass('open');
      $('.siteMap').addClass('open');
    }else{
      $(this).removeClass('open');
      $('.siteMap').removeClass('open');
    }
    return false;
  });

  if ( $('header').find('ul').hasClass('depth_2') ){
    $('header').addClass('d2');
  }else{
    $('header').removeClass('d2');
  }

  $('.tbl-type01').find('tr').children('td').prev('th').css('border-right','0');

});
function deviceCheck() {
  var UserAgent = navigator.userAgent;

  if (UserAgent.indexOf("Windows Phone") > -1) {
    return "windowPhone";
  }
  else if (UserAgent.indexOf("BlackBerry") > -1) {
    return "blackBerry";
  }
  else if (UserAgent.indexOf("Bada") > -1) {
    return "Bada";
  }
  else if (UserAgent.indexOf("iPhone") > -1) {
    return "iPhone";
  }
  else if (UserAgent.indexOf("iPad") > -1) {
    return "iPad";
  }
  else if (UserAgent.indexOf("Android") > -1) {
    return "android";
  }
  else {
    return "pc";
  }
}

var device = deviceCheck();

if (device != "pc") {
    $('#nC-gnb').css('position','absolute');
}
