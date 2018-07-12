$(window).load(function(){
  var step = $('.step>div'),
      test = $('.step>.test'),
      stepChoice = test.find('li').children('a'),
      question = $('.question'),
      qText = ['어떤 분야의 서비스를 계획하고 계신가요?','서버의 위치는 어디가 좋을까요?','서비스 규모를 선택해주세요'],
      eText = [
                ['모바일 및 웹 서비스','게임 서비스','미디어 서비스','금융 서비스'],
                ['한국','미국','싱가포르','홍콩']
              ],
      prodText = [
                ['Personal','Basic','Pro','Premium'],
                ['Game-Entry','Game-Basic','Game-Pro'],
                ['Media-Entry','Media-Basic','Media-Pro'],
                ['Fin-Internal','Fin-Leased Line']
              ],
      prodTextGlobal = [
                ['Global-Entry','Global-Basic','Global-Pro'],
                ['Global Game-Entry','Global Game-Basic','Global Game-Pro'],
                ['Global Media-Entry','Global Media-Basic','Global Media-Pro']
              ],
              // 20170327
      prodDetail = [
                [ ['개인 홈페이지','동시 접속 10 미만','동시 접속자 10명 미만'],['소규모 웹사이트','동시 접속 50 미만','동시 접속자 50명 미만'],['중대형 쇼핑몰','동시 접속 100 미만','동시 접속자 100명 미만'],['웹 에이전시','동시 접속 100 이상','동시 접속자 100명 이상'] ],
                [ ['소규모 모바일 게임','동시 접속 50 미만','동시 접속자 50명 미만'],['대형 모바일 게임','동시 접속 1000 미만','동시 접속자 1000명 미만'],['초대형 모바일 게임','동시 접속 1000 이상','동시 접속자 1000명 이상'] ],
                [ ['동영상, 사진, 음악 전송 서비스','동시 접속 50 미만','동시 접속자 50명 미만'],['대용량 미디어 전송 서비스','동시 접속 200 미만','동시 접속자 200명 미만'],['미디어 전문 서비스','동시 접속 200 이상','동시 접속자 200명 이상'] ],
                [ ['전용선이 필요없는','금융 서비스','전용선이 필요없는'],['전용선이 필요한','금융 서비스','전용선이 필요한'] ]
              ],
      prodDetailGlobal = [
                [ ['소규모 웹사이트','동시 접속 50 미만','동시 접속자 50명 미만'],['중대형 쇼핑몰','동시 접속 100 미만','동시 접속자 100명 미만'],['웹 에이전시','동시 접속 100 이상','동시 접속자 100명 이상'] ],
                [ ['소규모 모바일 게임','동시 접속 50 미만','동시 접속자 50명 미만'],['대형 모바일 게임','동시 접속 1000 미만','동시 접속자 1000명 미만'],['초대형 모바일 게임','동시 접속 1000 이상','동시 접속자 1000명 이상'] ],
                [ ['동영상, 사진, 음악 전송 서비스','동시 접속 50 미만','동시 접속자 50명 미만'],['대용량 미디어 전송 서비스','동시 접속 200 미만','동시 접속자 200명 미만'],['미디어 전문 서비스','동시 접속 200 이상','동시 접속자 200명 이상'] ]
              ],
              // end 20170327
      btns = $('.sub-body .btn-area>a'),
      nextStep = $('.nextStep'),
      prevStep = $('.prevStep'),
      qNum = 0,
      choice01 = 0,
      choice02 = 0,
      choice03 = 1,
      choice04 = 0,
      eIdx = 0,
      prod = $('.step03'),
      endImg = '../../img/ko/intro/recommend0';

  stepChoice.click(function(){
    if( qNum == 0 ){
      choice01 = $(this).parent('li').index();
    }else if( qNum == 1 ){
      choice02 = $(this).parent('li').index();
    }
    $(this).parent('li').addClass('on').siblings('li').removeClass('on');
    return false;
  });

  $('.stepEnd li>a').click(function(){
    eIdx = $(this).parent('li').index();
    choice04 = eIdx;
    //console.log(choice01,choice02,choice03,choice04);
    //setResultCntValue(choice01,choice02,choice03,choice04);

    $(this).parent('li').addClass('on').siblings('li').removeClass('on');
    $('.end.on>div').children('div').eq(eIdx).addClass('on').siblings('div').removeClass('on');

    $('.stepEnd img').each(function (index) {
      var tmpSrc = $(this).attr("src");
      $(this).attr("src", tmpSrc.replace("-on", ""));
    });

    var objImg = $(this).children('img');
    var currentImgSrc = objImg.attr("src");
    objImg.attr("src", currentImgSrc.split(".jpg")[0] + "-on.jpg")

    if(eIdx==0){
      $('.endTab>.icn').css('left','225px');
    }else if(eIdx ==1){
      $('.endTab>.icn').css('left','550px');
    }else{
      if( !$('.endImg').hasClass('ea2') ){
    	  $('.endTab>.icn').css('left','880px');
      }else{
    	  $('.endTab>.icn').css('left','550px');
      }
    }

    return false;
  });

  btns.click(function(){
    if( !$(this).hasClass('nextStep') ){//이전
      if( qNum == 1 ){
        qNum -= 1;
        prevStep.css('display','none');
        $('.bar>li').eq(1).removeClass('on');
        $('.bar>li').eq(0).removeClass('check');
      }else if( qNum == 3 ){
        qNum = 0;
        $('html, body').scrollTop(0);
        nextStep.text('다음');
        prevStep.text('이전').css('display','none');
        $('.bar').css('display','block');
        $('.bar>li').removeClass('check').removeClass('on');
        $('.bar>li').eq(0).addClass('on');
        $('.endWrap').find('.end').removeClass('on');
        $('.endImg').children('li').eq(0).addClass('on').siblings('li').removeClass('on');
        $('.endTab>.icn').css('left','225px');
        // choice01 = 0;
        // choice02 = 0;
         choice03 = 1;
        // choice04 = 0;
      }else {
        qNum -= 1;
        $('.bar>li').eq(qNum+1).removeClass('on');
        $('.bar>li').eq(qNum).removeClass('check');
      }
    }else{//다음
      if ( step.eq(qNum).find('li').hasClass('on')  ){
        if (qNum == 2){
          qNum += 1;
          nextStep.text('세부 구성 변경하기');
          prevStep.text('다시하기');
          $('.bar').css('display','none');
          $('.bar>li').removeClass('on').removeClass('check');

          endTest(choice01,choice02,choice03);
          if( choice02 == 0 ){
            $('.endImg').removeClass('ea2');
            $('.endImg>li').eq(1).css('display','block');
            for(z = 0; z < 3; z++){
              if( z==0 ){
                  $('.endImg>li').eq(z).find('img').attr('src',endImg + choice01 +'-0'+ choice02 +'-0'+ choice03 + '-0'+ z +'-on.jpg');
              }else{
                  $('.endImg>li').eq(z).find('img').attr('src',endImg + choice01 +'-0'+ choice02 +'-0'+ choice03 + '-0'+ z +'.jpg');
              }
            }
          }else{
            if( choice01 == 0 && choice03 == 1 ){
              $('.endImg').addClass('ea2');
              $('.endImg>li').eq(0).find('img').attr('src',endImg + '0-01-01-00-on.jpg');
              $('.endImg>li').eq(2).find('img').attr('src',endImg + '0-01-01-02.jpg');
              $('.endImg>li').eq(1).css('display','none');
            }else if( choice01 == 1 && choice03 == 1 ){
              $('.endImg').addClass('ea2');
              $('.endImg>li').eq(0).find('img').attr('src',endImg + '1-01-01-00-on.jpg');
              $('.endImg>li').eq(1).find('img').attr('src',endImg + '1-01-01-02.jpg');
              $('.endImg>li').eq(2).css('display','none');
            }else if( choice01 == 2 && choice03 == 0 ){
              $('.endImg').addClass('ea2');
              $('.endImg>li').eq(0).find('img').attr('src',endImg + '2-01-00-00-on.jpg');
              $('.endImg>li').eq(2).find('img').attr('src',endImg + '2-01-00-02.jpg');
              $('.endImg>li').eq(1).css('display','none');
            }else{
              $('.endImg').removeClass('ea2');
              $('.endImg>li').eq(1).css('display','block');
              for(y = 0; y < 3; y++){
                if( y==0 ){
                    $('.endImg>li').eq(y).find('img').attr('src',endImg + choice01 +'-01-0'+ choice03 + '-0'+ y +'-on.jpg');
                }else{
                  $('.endImg>li').eq(y).find('img').attr('src',endImg + choice01 +'-01-0'+ choice03 + '-0'+ y +'.jpg');
                }
              }
            }
          }

        }else if(qNum < 2){
          qNum += 1;
          prevStep.css('display','inline-block');
          $('.bar').css('display','block');
          $('.bar>li').eq(qNum-1).addClass('check');
          $('.bar>li').eq(qNum).addClass('on');
          if( qNum == 1 ){
            $('.bar>li').eq(qNum-1).find('.txt').text(eText[0][choice01]);
          }else{
            $('.bar>li').eq(qNum-1).find('.txt').text(eText[1][choice02]);
          }
        }
        else if ( qNum == 3 ) {
        	//popup open
          //openPriceCalculatorWithValue();
        }
      }
    }
    step.eq(qNum).addClass('on').siblings('div').removeClass('on');

    if( !$('.bar>li').eq(qNum-1).hasClass('check') && qNum ==0 ){
      $('.bar>li').eq(qNum).find('.txt').text('서비스 분야');
    }else if( !$('.bar>li').eq(qNum).hasClass('check') && qNum ==1  ){
      $('.bar>li').eq(qNum).find('.txt').text('서비스 위치');
    }else if( qNum == 3){
      $('.bar>li').eq(1).find('.txt').text('서비스 위치');
    }

    if( choice01==3 ){
      step.eq(1).find('li').css('display','none');
      step.eq(1).find('li').eq(0).css('display','block').addClass('ea1');
    }else{
      step.eq(1).find('li').css('display','block');
      step.eq(1).find('li').eq(0).removeClass('ea1');
    }
    if( qNum == 3 ){
      $('.recommend').addClass('on');
    }else{
      $('.recommend').removeClass('on');
    }
    // 20170323 수정
    if( choice02 ==0 ){
      if( qNum == 3 ){
        question.html('<p style="font-size:28px;line-height:40px">회원님은 <span class="blue">'+ eText[0][choice01] + '</span> 분야에서 <span class="blue">'+ eText[1][choice02] +'</span>에 서버를 두며,<br /><span class="blue">'+ prodDetail[choice01][choice03][2] +'</span> 클라우드 상품을 찾고 계십니다</p>');
        $('.endTxt').text('위 항목에 맞는 상품을 추천해드립니다');
      }else{
        question.text(qText[qNum]);
        $('.endTxt').text('');
      }

    }else{
      if( qNum == 3 ){
        question.html('<p style="font-size:28px;line-height:40px">회원님은 <span class="blue">'+ eText[0][choice01] + '</span> 분야에서 <span class="blue">'+ eText[1][choice02] +'</span>에 서버를 두며,<br /><span class="blue">'+ prodDetailGlobal[choice01][choice03][2] +'</span> 클라우드 상품을 찾고 계십니다</p>');
        $('.endTxt').text('위 항목에 맞는 상품을 추천해드립니다');
      }else{
        question.text(qText[qNum]);
        $('.endTxt').text('');
      }

    }
    // end 20170323 수정

    if( qNum == 1 && choice01 == 3){
      $('.step02>ul>li').eq(0).addClass('on').siblings('li').removeClass('on');
      choice02 = 0;
    }


    if( qNum == 2 ){
      //한국일때
      if( choice02 == 0 ){
        if( prodText[choice01].length == 3 ){
          prod.html('<ul class="list3"></ul>');
          for (i = 0; i < 3; i++){
            if( i == 1 ){
              prod.find('ul').append('<li class="choice03-0'+ i + ' on"><a href="#"><span class="tit" style="bottom:100px">'+ prodText[choice01][i] +'</span><span class="txt">'+ prodDetail[choice01][i][0] + '<br />'+ prodDetail[choice01][i][1] +'</span></a></li>');
            }else{
              prod.find('ul').append('<li class="choice03-0'+ i + '"><a href="#"><span class="tit" style="bottom:100px">'+ prodText[choice01][i] +'</span><span class="txt">'+ prodDetail[choice01][i][0] + '<br />'+ prodDetail[choice01][i][1] +'</span></a></li>');
            }
          }
        }else if(prodText[choice01].length == 2){
          prod.html('<ul class="list2"></ul>');
          for (l = 0; l < 2; l++){
            if( l == 1 ){
              prod.find('ul').append('<li class="choice03-0'+ l + ' on"><a href="#"><span class="tit" style="bottom:100px">'+ prodText[choice01][l] +'</span><span class="txt">'+ prodDetail[choice01][l][0] + '<br />'+ prodDetail[choice01][l][1] +'</span></a></li>');
            }else{
              prod.find('ul').append('<li class="choice03-0'+ l + '"><a href="#"><span class="tit" style="bottom:100px">'+ prodText[choice01][l] +'</span><span class="txt">'+ prodDetail[choice01][l][0] + '<br />'+ prodDetail[choice01][l][1] +'</span></a></li>');
            }
          }
        }else{
          prod.html('<ul class="list4"></ul>');
          for (j = 0; j < 4; j++){
            if( j == 1 ){
              prod.find('ul').append('<li class="choice03-0'+ j + ' on"><a href="#"><span class="tit" style="bottom:100px">'+ prodText[choice01][j] +'</span><span class="txt">'+ prodDetail[choice01][j][0] + '<br />'+ prodDetail[choice01][j][1] +'</span></a></li>');
            }else{
              prod.find('ul').append('<li class="choice03-0'+ j + '"><a href="#"><span class="tit" style="bottom:100px">'+ prodText[choice01][j] +'</span><span class="txt">'+ prodDetail[choice01][j][0] + '<br />'+ prodDetail[choice01][j][1] +'</span></a></li>');
            }
          }
        }
        $('.step03').find('a').click(function(){
          choice03 = $(this).parent('li').index();
          $(this).parent('li').addClass('on').siblings('li').removeClass('on');
          return false;
        });
        $(this).parent('li').addClass('on').siblings('li').removeClass('on');
      }else{
        prod.html('<ul class="list3"></ul>');
        for (k = 0; k < 3; k++){
          if( k == 1 ){
            prod.find('ul').append('<li class="choice03-0'+ k + ' on"><a href="#"><span class="tit" style="bottom:100px">'+ prodTextGlobal[choice01][k] +'</span><span class="txt">'+ prodDetailGlobal[choice01][k][0] + '<br />'+ prodDetailGlobal[choice01][k][1] +'</span></a></li>');
          }else{
            prod.find('ul').append('<li class="choice03-0'+ k + '"><a href="#"><span class="tit" style="bottom:100px">'+ prodTextGlobal[choice01][k] +'</span><span class="txt">'+ prodDetailGlobal[choice01][k][0] + '<br />'+ prodDetailGlobal[choice01][k][1] +'</span></a></li>');
          }
        }
        $('.step03').find('a').click(function(){
          choice03 = $(this).parent('li').index();
          $(this).parent('li').addClass('on').siblings('li').removeClass('on');
          return false;
        });
      }
    }

    console.log(choice01,choice02,choice03,choice04);
    //setResultCntValue(choice01,choice02,choice03,choice04);

    return false;
  });



  function endTest( n1,n2,n3 ){
    if( n2 == 0 ){ //한국
      $('.introEnd').addClass('on');
      $('.introEndGlobal').removeClass('on');

      if( n1 == 0 ){ //모바일 웹
        $('.introEnd').children('div').eq(n3).addClass('on').siblings('div').removeClass('on');
      }else if( n1 == 1 ){//게임
        $('.introEnd').children('div').eq(n3+4).addClass('on').siblings('div').removeClass('on');
      }else if( n1 == 2 ){//미디어
        $('.introEnd').children('div').eq(n3+7).addClass('on').siblings('div').removeClass('on');
      }else if( n1 == 3 ){//금융
        $('.introEnd').children('div').eq(n3+10).addClass('on').siblings('div').removeClass('on');
      }
    }else{//외국
      $('.introEndGlobal').addClass('on');
      $('.introEnd').removeClass('on');
      if( n1 == 0 ){ //모바일 웹
        $('.introEndGlobal').children('div').eq(n3).addClass('on').siblings('div').removeClass('on');
      }else if( n1 == 1 ){//게임
        $('.introEndGlobal').children('div').eq(n3+3).addClass('on').siblings('div').removeClass('on');
      }else if( n1 == 2 ){//미디어
        $('.introEndGlobal').children('div').eq(n3+6).addClass('on').siblings('div').removeClass('on');
      }
    }
  }
});
