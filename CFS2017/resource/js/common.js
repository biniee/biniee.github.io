$(document).ready(function(){
  // popup
  var popup = $('.popup');
  var closePop = $('.popup .box_vote .close');
  $('.btn_vote').click(function(){
    popup.css('display','block');
  });
  closePop.click(function(){
    popup.css('display','none');
  });

  // team introduction
  $('.select_flag ul li').click(function(){
    var num = $(this).attr('num');
    var lang = $(this).parents().attr('language');
    if(num!=''){
      $(this).siblings().removeClass('on');
      $(this).addClass('on');
			$(".detail_team .detail img").attr('src','resource/images/teams/team_'+lang+'_'+num+'.png');
		}
    return false;
  });

  // select language
  $('.language').click(function(){
    $(this).toggleClass('on');
  });
});
