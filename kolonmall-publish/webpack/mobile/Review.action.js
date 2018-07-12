$(document).on('mobile:Review:load', () => {
  const reviewList = $('#reviewList');
  let reviewItemTemplate = null;
  let productItemTemplate = null;
  const type = reviewList.data('type');
  const reviewCount = type == 'R' ? reviewList.data('registeredCount') : reviewList.data('unregisteredCount');
  const pageSize = reviewList.data('pageSize');
  let pageNumber = reviewList.data('pageNumber');
  const isMore = reviewCount > (pageNumber + 1) * pageSize;

  $('#reviewListLoading').hide();
  if (reviewCount > 0 && isMore) $('#moreBtn').show();

  function getReviewList() {
    const params = {
      type,
      pageNumber,
      pageSize,
    };
    let endOfData = false;
    $('#moreBtn').hide();
    $('#reviewListLoading').show();
    $.ajax({
      url: '/Review/Reviews',
      method: 'GET',
      data: params,
      dataType: 'JSON',
      success: (data) => {
        if (data.reviewData.results && data.reviewData.results.length > 0) {
          $.each(data.reviewData.results, (index, element) => {
            const reviews = element;
            reviews.reviewType = type;
            if (pageNumber == 0) {
              reviewList.html(productItemTemplate(reviews));
              reviewList.append(reviewItemTemplate(reviews));
            } else {
              reviewList.append(productItemTemplate(reviews));
              reviewList.append(reviewItemTemplate(reviews));
            }
          });
          const pNumber = (data.reviewData.page.currentPage + 1);
          if (reviewCount <= pNumber * pageSize) {
            endOfData = true;
          }
        } else {
          if (pageNumber == 0) {
            $('#reviewList').hide();
          }
          endOfData = true;
        }
      },
    }).always(() => {
      $('#reviewListLoading').hide();

      if (endOfData) {
        $('#moreBtn').hide();
      } else {
        $('#moreBtn').show();
      }
    });
  }

  function removeReview(productCode, commentSeq) {
    const confirmResult = confirm('삭제하시겠습니까?');
    if (confirmResult) {
      $.ajax({
        url: `/Review/${productCode}/remove?commentSeq=${commentSeq}`,
        type: 'DELETE',
        success: (data) => {
          if (data.status == 'ok') {
            location.href = '/Review/RegisteredList?type=' + type;
          } else {
            alert(data.message);
          }
        },
      });
    }
  }

  if (reviewList.length > 0) {
    productItemTemplate = Handlebars.templates['mobile/precompiles/review/product-item'];
    reviewItemTemplate = Handlebars.templates['mobile/precompiles/review/reviews-item'];

    reviewList.on('click', '.del', (e) => {
      e.preventDefault();
      const productCode = $(e.target).data('productCode');
      const commentSeq = $(e.target).data('commentSeq');
      removeReview(productCode, commentSeq);
    });

    reviewList.on('click', '.prdt > .productDetailMoveArea', (e) => {
      e.preventDefault();
      const productCode = $(e.currentTarget).data('productCode');
      location.href = `/Product/${productCode}`;
    });
  }

  $('#moreBtn').click((e) => {
    e.preventDefault();
    pageNumber++;
    getReviewList();
  });

  $('#baseMsgs').on('change', () => {
    const selVal = $('#baseMsgs option:selected').val();
    if (selVal) {
      $('#comment').val($('#baseMsgs option:selected').text());
    } else {
      $('#comment').val('');
    }
  });

  $('#ex-file').on('change', (e) => {
    const $this = $(e.currentTarget);
    const file = $this[0].files[0];
    const imageType = /image.*/;
    if (!file.type.match(imageType)) {
      return;
    } else if (/(\.?\.\/|\.?\.\\|%)/i.test(file.name)) {
      alert('파일명에 특수문자(/,\\,%)가 포함 될 수 없습니다.');
      return;
    }
    const maxFileSize = 2048000;
    if (file.size > maxFileSize) {
      alert('파일 용량을 초과하였습니다.');
      return;
    }
    const productImg = $('#productImg');
    const reader = new FileReader();
    reader.onload = (ee) => {
      const src = ee.target.result;
      productImg.attr('src', src);
    };
    reader.readAsDataURL(file);
    $('#gallery').show();
  });

  $('.click-rgt').on('click', (e) => {
    e.preventDefault();
    $('#rating').val($('.star-rating > .on').length);

    $('#reviewAddForm').submit();
  });

  $('#reviewAddForm').validate({
    rules: {
      headline: {
        required: true,
      },
      comment: {
        required: true,
      },
      rating: {
        required: true,
      },
    },
    messages: {
      headline: {
        required: '제목을 입력해 주세요.',
      },
      comment: {
        required: '상품평을 입력해 주세요.',
      },
      rating: {
        required: '상품만족도를 선택해 주세요.',
      },
    },
    submitHandler: () => {
      const reviewAddBtnLadda = Ladda.create($('.click-rgt')[0]);
      reviewAddBtnLadda.start();
      if ($.trim($('#headline').val()) == '') {
        alert('제목을 입력해 주세요.');
        reviewAddBtnLadda.stop();
        return false;
      }
      if ($.trim($('#comment').val()) == '') {
        alert('상품평을 입력해 주세요.');
        reviewAddBtnLadda.stop();
        return false;
      }
      if ($('#rating').val() < 1) {
        alert('상품만족도를 선택해 주세요.');
        reviewAddBtnLadda.stop();
        return false;
      }
      if (confirm('등록하시겠습니까?')) {
        return true;
      }
      reviewAddBtnLadda.stop();
      return false;
    },
  });

  $('.click-cl').on('click', (e) => {
    e.preventDefault();
    if (confirm('입력한 내용이 저장되지 않고 삭제됩니다. 취소하시겠습니까?')) {
      location.href = '/Review/RegisteredList';
    }
  });
});
