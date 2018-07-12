/**
 * Created by byulnimkim on 2017-05-11.
 */

import moment from 'moment';
import plupload from 'plupload';

$(document).on('desktop:Contact:load', () => {
  const initImageUploader = () => {
    const imageUploader = new plupload.Uploader({
      runtimes: 'html5,flash,silverlight,html4',
      browse_button: 'container',
      // container: document.getElementById('container'),
      url: '/Contact/qnaRegisterAttach',
      unique_names: true,
      rename: true,
      filters: {
        max_file_size: '2mb',
        mime_types: [
                    { title: 'Image files', extensions: $('#attachConfigFileList').val() },
        ],
      },
      multi_selection: false,

      flash_swf_url: '/js/lib/plupload/Moxie.swf',

      silverlight_xap_url: '/js/lib/plupload/Moxie.xap',
      multipart_params: {
        CSRFToken: $('[name=CSRFToken]').val(),
      },
      init: {
        FilesAdded: (up, files) => {
          for (let i = 0; i < files.length; i++) {
            const uploadFile = files[i];
            if (uploadFile.id != '') {
                            // 이미 업로드한 이미지가 있다면
              if ($('#existFileArea').length > 0) {
                $('#ticket_id, #existFileArea').remove();
              }
              imageUploader.start();
              // TODO : 이미지 업로드 로딩 이미지
              // const uploadedFileLayer = $(`<span id='attach_upload_file_${uploadFile.id}'></span>`);
              // $('#file').after(uploadedFileLayer);
            }
          }
        },
        Error: (up, err) => {
          up.disableBrowse(false);

          if (err.code == -200) {
            alert('서버와의 연결이 원활하지 않습니다.\n잠시 후에 다시 시도해 주십시오.');
          } else if (err.code == -600) {
            alert('2MB보다 큰 파일은 업로드 할 수 없습니다.\n사이즈를 조절하시고 다시 업로드 해주십시오.');
          } else if (err.code == -601) {
            alert('해당 파일 형식은 업로드를 지원하지 않습니다.');
          } else {
            alert('이미지를 업로드하는데 문제가 발생했습니다.\n잠시 후에 다시 시도해 주십시오.');
          }
        },
        FileUploaded: (up, file, info) => {
          if (info == null || info.response == null) {
            up.disableBrowse(false);
            alert('이미지를 업로드하는데 문제가 발생했습니다.\n잠시 후에 다시 시도해 주십시오.');
          } else {
            if (info.response != '') {
              const data = $.parseJSON(info.response);

              if (data.error_code == 0) {
                const targetForm = $('#contactAddForm');
                $('#container').append(`<span id='existFileArea'>${file.name}</span>`);
                targetForm.append($(`<input type='hidden' name='ticket_id' id='ticket_id' value='${data.ticket_id}' />`));
              }
            } else {
              alert('업로드에 실패했습니다. \n다시 시도해 주세요.');
            }
          }
        },
      },
    });
    imageUploader.init();
  };

  let searchProductItemTemplate = null;
  const selectedProductTabs = [];

  function getSurveyList(selectedSubCategory) {
    $.getJSON(`/Contact/getQnaSurveyList?nodeId=${selectedSubCategory}`, (data) => {
      let hasOption05 = false;
      $.each(data.surveyList, (index, surveyItem) => {
        if (surveyItem.targetField == 'option05') {
          $('#smsArea').show();
          $.each(surveyItem.codeList, (index2, codeItem) => {
            if (codeItem.codeValue == 'Y') {
              $('#sms_info').prop('checked', true);
            }
          });
          hasOption05 = true;
          return false;
        }
        return true;
      });
      if (!hasOption05) {
        $('#smsArea').hide();
        $('#option05').val('N');
      }
    });
  }

  if ($('#contactAddForm').length > 0) {
    getSurveyList('');
    initImageUploader();

    const customerEmail = $('#customer_email').val();
    if ($.trim(customerEmail) != '' && customerEmail.indexOf('@') > 0) {
      $('#emailId').val(customerEmail.split('@')[0]);
      $('#emailDomain').val(customerEmail.split('@')[1]);
    }
  }

  function getDetail(ticketId, targetEle) {
    const questionDetailEle = targetEle.find('.questionDetail');
    const answerTargetEle = targetEle.find('.answer');
    $.getJSON(`/Contact/getQnaDetailView/${ticketId}`, (data) => {
      if (data.ASSIGNS.length > 0) {
        if (data.ASSIGNS[0].attachList && data.ASSIGNS[0].attachList.length > 0) {
          const attachData = data.ASSIGNS[0].attachList[0];
          $(questionDetailEle).append(`<a href="/Contact/getQnaImg?fileInfo=${attachData.fileInfo}&ticketId=${data.detailInfo.ticketId}">${attachData.attachName}</a><br />`);
        }
        $(questionDetailEle).append(data.ASSIGNS[0].contents);
      }
            // TODO : state에 뿌릴 데이터의 정확한 명칭. 답변, 추가답변 같은..
            // TODO : 상품 정보를 어떻게 보여줄지?
      if (data.ANSWEND.length > 0) {
        // const answerTargetEle = targetEle.find('.ANSWEND');
        if (data.ANSWEND[0].attachList && data.ANSWEND[0].attachList.length > 0) {
          const attachData = data.ANSWEND[0].attachList[0];
          $(questionDetailEle).append(`<a href="/Contact/getQnaImg?fileInfo=${attachData.fileInfo}&ticketId=${data.detailInfo.ticketId}">${attachData.attachName}</a><br />`);
        }
        // answerTargetEle.find('.answerContents').append(data.ANSWEND[0].contents);
        // answerTargetEle.find('.answerCreatedDate').html(data.ANSWEND[0].created_date);
        answerTargetEle.append(data.ANSWEND[0].contents);
        answerTargetEle.show();
      }
      if (data.ANSWADD.length > 0) {
        // const answerTargetEle = targetEle.find('.ANSWADD');
        if (data.ANSWADD[0].attachList && data.ANSWADD[0].attachList.length > 0) {
          const attachData = data.ANSWADD[0].attachList[0];
          $(questionDetailEle).append(`<a href="/Contact/getQnaImg?fileInfo=${attachData.fileInfo}&ticketId=${data.detailInfo.ticketId}">${attachData.attachName}</a><br />`);
        }
        // answerTargetEle.find('.answerContents').append(data.ANSWADD[0].contents);
        // answerTargetEle.find('.answerCreatedDate').html(data.ANSWADD[0].created_date);
        answerTargetEle.append(data.ANSWADD[0].contents);
        answerTargetEle.show();
      }
      if (data.ANSWTMP.length > 0) {
        // const answerTargetEle = targetEle.find('.ANSWTMP');
        if (data.ANSWTMP[0].attachList && data.ANSWTMP[0].attachList.length > 0) {
          const attachData = data.ANSWTMP[0].attachList[0];
          $(questionDetailEle).append(`<a href="/Contact/getQnaImg?fileInfo=${attachData.fileInfo}&ticketId=${data.detailInfo.ticketId}">${attachData.attachName}</a><br />`);
        }
        // answerTargetEle.find('.answerContents').append(data.ANSWTMP[0].contents);
        // answerTargetEle.find('.answerCreatedDate').html(data.ANSWTMP[0].created_date);
        answerTargetEle.append(data.ANSWTMP[0].contents);
        answerTargetEle.show();
      }
    });
  }

  $('.ques').click((e) => {
    const dataEle = $(e.target).parents('dl');
    const ticketId = dataEle.data('ticketId');
    const targetEle = dataEle;
    if ($.trim(targetEle.find('.questionDetail').text()) == '') {
      getDetail(ticketId, targetEle);
    }
  });

  $('#periodTab li a').click((e) => {
    e.preventDefault();

        // const period = $(this).data('period');
        // 기간 선택에 따라 페이지 리로드 또는 ajax 호출
  });

  $('.change-product').click((e) => {
    e.preventDefault();

    $('html').addClass('show-layer');
  });

  $('#searchProductPopup').on('click', '.selectProductBtn', (e) => {
    e.preventDefault();
    const dataEle = $(e.target).parents('.list');

    const productCode = dataEle.data('productCode');
    const productImg = dataEle.data('productImg');
    const productName = dataEle.data('productName');
    const brandName = dataEle.data('brandName');
    const productDiscount = dataEle.data('productDiscount');
    const productPrice = dataEle.data('productPrice');
    const orderNumber = dataEle.data('orderNumber');

    $('#orderNumber').val(orderNumber);
    $('#productCode').val(productCode);
    $('#productName').val(productName);
    $('#productImg').attr('src', productImg).css('width', '96px');
    $('#productNameText').text(productName);
    $('#brandNameText').text(brandName);
    if (productDiscount > 0) {
      $('#productDiscount').show();
      $('#productDiscount').text(productDiscount);
    }
    $('#productPrice').text(productPrice);
    $('#selectedProduct').show();
    $('#emptyProduct').hide();

    $('html').removeClass('show-layer');
  });

  $('#removeSelectedProduct').click(() => {
    $('#orderNumber').val('');
    $('#productCode').val('');
    $('#productName').val('');

    $('#selectedProduct').hide();
  });

  function getWishList() {
    $.ajax({
      url: '/WishList?type=online&pageSize=5',
      method: 'GET',
      data: {},
      dataType: 'JSON',
      success: (data) => {
        if (data.results && data.results.length > 0) {
          $('#emptyResultWishList').hide();
          $('#resultWishListWrapper').show();

          if (data.page.currentPage == 1) {
            $('#resultWishListWrapper .list-more').hide();
          }
          $.each(data.results, (index, element) => {
            if (index == 0) {
              $('#resultWishListWrapper #resultWishList').html(searchProductItemTemplate(element)).show();
            } else {
              $('#resultWishListWrapper #resultWishList').append(searchProductItemTemplate(element));
            }
          });
        } else {
          $('#emptyResultWishList').show();
        }
      },
      error: (xhr, status, error) => {
        console.log(error);
        $('#emptyResultWishList').show();
      },
    });
  }

    // TODO : cart 데이터 프로덕트 모델링.
    // TODO : cart 데이터 페이징. 무조건 다 뿌리게 되어 있음. 다 받은다음 뷰에서 5개씩 페이징 처리 해줄까?
  function getCartList() {
    $.ajax({
      url: '/Cart',
      method: 'GET',
      data: {},
      dataType: 'JSON',
      success: (data) => {
        if (data && data.items.length > 0) {
          $('#emptyResultCartList').hide();
          $('#resultCartListWrapper').show().find('.list-more').hide();

          $.each(data.items, (index, element) => {
            if (index == 0) {
              $('#resultCartList').html(searchProductItemTemplate(element)).show();
            } else {
              $('#resultCartList').append(searchProductItemTemplate(element));
            }
          });
        } else {
          $('#emptyResultCartList').show();
          // if (orderListCurrentPage > 1) {
          //   $('#resultCartList .list-more').hide();
          // } else {
          //   $('#resultCartList').hide();
          //   $('#emptyResultCartList').show();
          // }
        }
      },
    });
  }

  let searchPeriodDays = 30;
  let orderListCurrentPage = 1;

  function getOrderList() {
    const endDate = moment().format('YYYYMMDD');
    let startDate = moment(endDate).add(-1, 'M').format('YYYYMMDD');
    let searchPeriodText = '1개월';
    if (searchPeriodDays == 30) {
      startDate = moment(endDate).add(-1, 'M').format('YYYYMMDD');
      searchPeriodText = '1개월';
    } else if (searchPeriodDays == 90) {
      startDate = moment(endDate).add(-3, 'M').format('YYYYMMDD');
      searchPeriodText = '3개월';
    } else if (searchPeriodDays == 180) {
      startDate = moment(endDate).add(-6, 'M').format('YYYYMMDD');
      searchPeriodText = '6개월';
    } else if (searchPeriodDays == 365) {
      startDate = moment(endDate).add(-1, 'Y').format('YYYYMMDD');
      searchPeriodText = '1년';
    }
    const params = {
      startDate,
      endDate,
      requestType: 30,
      pageSize: 4,
      currentPage: orderListCurrentPage,
    };
    $('#orderListLoading').show();
    $.ajax({
      url: '/Order/ConsignmentEntries?pageSize=4',
      method: 'GET',
      data: params,
      dataType: 'JSON',
      success: (data) => {
        if (data.results && data.results.length > 0) {
          $('#emptyResultOrderList').hide();
          $('#resultOrderListWrapper').show();

          $.each(data.results, (index, element) => {
            $.each(element.items, (index2, item) => {
              const orderItem = item;
              orderItem.orderNumber = element.orderNumber;
              orderItem.orderCreatedDate = element.createdDate;

              if (orderListCurrentPage == 1 && index == 0) {
                $('#resultOrderList').html(searchProductItemTemplate(orderItem)).show();
              } else {
                $('#resultOrderList').append(searchProductItemTemplate(orderItem));
              }
            });
          });
        } else {
          if (orderListCurrentPage > 1) {
            alert('더이상 조회내용이 없습니다.');
            $('#resultOrderListWrapper .list-more').hide();
          } else {
            $('#searchPeriodTextWrapper, #resultOrderList').hide();
            $('.searchPeriodText').text(searchPeriodText);
            $('#emptyResultOrderList').show();
          }
        }
      },
    }).always(() => $('#orderListLoading').hide());
  }

  $('#periodBtns > li').click((e) => {
    e.preventDefault();
    const $this = $(e.target);

    $('#periodBtns > li').removeClass('on');
    searchPeriodDays = $this.data('searchPeriod');
    $this.parent().addClass('on');

    getOrderList();
  });

  $('#searchOrderBtn').click((e) => {
    e.preventDefault();

    // TODO : 달력조회
    alert('날짜를 선택해 주세요.');
   // getOrderList();
  });

  $('#resultOrderListWrapper .list-more').click((e) => {
    e.preventDefault();

    orderListCurrentPage++;
    getOrderList();
    selectedProductTabs.push('order');
  });

  if ($('#select-product-tab').length > 0) {
    // getOrderList();
    searchProductItemTemplate = Handlebars.templates['desktop/precompiles/contact/search-product-item'];
  }

  $('#select-product-tab > li, #select-product a').click((e) => {
    e.preventDefault();

    const $this = $(e.target);

    $('#select-product-tab > li').removeClass('on');
    const productType = $this.data('productType');
    $this.parent().addClass('on');

    if (productType == 'cart' && !selectedProductTabs.includes('cart')) {
      selectedProductTabs.push('cart');
      getCartList();
    } else if (productType == 'wishList' && !selectedProductTabs.includes('wishList')) {
      selectedProductTabs.push('wishList');
      getWishList();
    } else if (productType == 'order' && !selectedProductTabs.includes('order')) {
      selectedProductTabs.push('order');
      getOrderList();
    }
  });

  const mainCategoryDataMap = new Map();

  function showSubCategory(mainCategory) {
    let optionHtml = '<option value="">상세 유형을 선택해 주세요.</option>';
    $.each(mainCategoryDataMap.get(mainCategory), (index, subCategory) => {
      optionHtml += `<option value='${subCategory.code}'>${subCategory.categoryValue}</option>`;
    });
    $('#select_category2').html(optionHtml);
  }

  function getSubCategories(selectedMainCategory) {
    $.getJSON(`/Contact/getQnaCategory?parentId=${selectedMainCategory}`, (data) => {
      const subCategories = [];
      $.each(data.qnaCategory, (index, subCategory) => {
        const subCategoryData = {
          code: subCategory.nodeId,
          categoryValue: subCategory.nodeName,
        };
        subCategories.push(subCategoryData);
      });
      mainCategoryDataMap.set(selectedMainCategory, subCategories);
    }).then(() => {
      showSubCategory(selectedMainCategory);
    });
  }

  $('#choice_type').change(() => {
    const selectedMainCategory = $('#choice_type option:selected').val();
    if (selectedMainCategory != '') {
      if (!mainCategoryDataMap.has(selectedMainCategory)) {
        getSubCategories(selectedMainCategory);
      } else {
        showSubCategory(selectedMainCategory);
      }
    }
  });

  $('#select_category2').change(() => {
    const selectedSubCategory = $('#select_category2 option:selected').val();
    getSurveyList(selectedSubCategory);
  });

  $('#emailDomainSelect').change(() => {
    const emailDomain = $('#emailDomainSelect option:selected').val();
    if (emailDomain != '') {
      $('#emailDomain').val(emailDomain);
    }
  });

  $('#contactAddFormResetBtn').click((e) => {
    e.preventDefault();

    const confirmResult = confirm('1:1 상담작성을 취소하시겠습니까?');
    if (confirmResult) {
      location.href = '/Contact';
    }
  });

  $('#contactAddFormSubmitBtn').click((e) => {
    e.preventDefault();

    $('#contactAddForm').submit();
  });

  $('#contactAddForm').validate({
    rules: {
      choice_type: {
        required: true,
      },
      select_category2: {
        required: true,
      },
      question_title: {
        required: true,
      },
      question_contents: {
        required: true,
      },
    },
    messages: {
      choice_type: {
        required: '질문 유형을 선택해 주세요.',
      },
      select_category2: {
        required: '상세 유형을 선택해 주세요.',
      },
      question_title: {
        required: '제목을 입력해 주세요.',
      },
      question_contents: {
        required: '내용을 입력해 주세요.',
      },
    },
    submitHandler: () => {
      const contactAddFormSubmitBtnLadda = Ladda.create($('#contactAddFormSubmitBtn')[0]);
      contactAddFormSubmitBtnLadda.start();
      const nodeId = $('#select_category2 option:selected').val();
      if ($('#smsArea').is(':visible') && $('#sms_info').is(':checked')) {
        if ($.trim($('#customer_tel').val()) == '') {
          alert('핸드폰 번호를 입력해 주세요.');
          contactAddFormSubmitBtnLadda.stop();
          return false;
        }
        $('#option05').val('Y');
      } else {
        $('#option05').val('N');
      }
      const emailId = $('#emailId').val();
      const emailDomain = $('#emailDomain').val();

      $('#customer_email').val(`${emailId}@${emailDomain}`);

      if ($.trim(emailId) == '' || $.trim(emailDomain) == '') {
        alert('이메일을 입력해 주세요.');
        contactAddFormSubmitBtnLadda.stop();
        return false;
      }

      if ($('#orderNumber').val() == '' && $('#productName').val() != '' && $('#productCode').val() != '') {
        $('#orderNumber').val('NONE');
      }
      $.ajax({
        url: `/Contact/${nodeId}/qnaRegister`,
        method: 'POST',
        data: $('#contactAddForm').serialize(),
        dataType: 'JSON',
        success: () => {
          alert('1:1 상담이 등록되었습니다.');
          location.href = '/Contact';
        },
        error: () => {
          alert('1:1 상담이 등록되었습니다.');
        },
        complete: () => {
          contactAddFormSubmitBtnLadda.stop();
        },
      });
      return false;
    },
  });
});
