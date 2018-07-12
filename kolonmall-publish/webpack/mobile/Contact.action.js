/**
 * Created by byulnimkim on 2017-05-11.
 */

import moment from 'moment';
import plupload from 'plupload';

$(document).on('mobile:Contact:load', () => {
  const initImageUploader = () => {
    const imageUploader = new plupload.Uploader({
      runtimes: 'html5,flash,silverlight,html4',
      browse_button: 'container',
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
  }

  function getDetail(ticketId, targetEle) {
    const questionDetailEle = targetEle.find('.questionDetail');
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
        const answerTargetEle = targetEle.find('.ANSWEND');
        if (data.ANSWEND[0].attachList && data.ANSWEND[0].attachList.length > 0) {
          const attachData = data.ANSWEND[0].attachList[0];
          $(questionDetailEle).append(`<a href="/Contact/getQnaImg?fileInfo=${attachData.fileInfo}&ticketId=${data.detailInfo.ticketId}">${attachData.attachName}</a><br />`);
        }
        answerTargetEle.find('.answerContents').append(data.ANSWEND[0].contents);
        answerTargetEle.find('.answerCreatedDate').html(data.ANSWEND[0].created_date);
        answerTargetEle.show();
      }
      if (data.ANSWADD.length > 0) {
        const answerTargetEle = targetEle.find('.ANSWADD');
        if (data.ANSWADD[0].attachList && data.ANSWADD[0].attachList.length > 0) {
          const attachData = data.ANSWADD[0].attachList[0];
          $(questionDetailEle).append(`<a href="/Contact/getQnaImg?fileInfo=${attachData.fileInfo}&ticketId=${data.detailInfo.ticketId}">${attachData.attachName}</a><br />`);
        }
        answerTargetEle.find('.answerContents').append(data.ANSWADD[0].contents);
        answerTargetEle.find('.answerCreatedDate').html(data.ANSWADD[0].created_date);
        answerTargetEle.show();
      }
      if (data.ANSWTMP.length > 0) {
        const answerTargetEle = targetEle.find('.ANSWTMP');
        if (data.ANSWTMP[0].attachList && data.ANSWTMP[0].attachList.length > 0) {
          const attachData = data.ANSWTMP[0].attachList[0];
          $(questionDetailEle).append(`<a href="/Contact/getQnaImg?fileInfo=${attachData.fileInfo}&ticketId=${data.detailInfo.ticketId}">${attachData.attachName}</a><br />`);
        }
        answerTargetEle.find('.answerContents').append(data.ANSWTMP[0].contents);
        answerTargetEle.find('.answerCreatedDate').html(data.ANSWTMP[0].created_date);
        answerTargetEle.show();
      }
    });
  }

  $('.ques a').click((e) => {
    const dataEle = $(e.target).parents('li');
    const ticketId = dataEle.data('ticketId');
    const targetEle = dataEle.find('.detailArea');
    if ($.trim(targetEle.find('.questionDetail').text()) == '') {
      getDetail(ticketId, targetEle);
    }
  });

  $('#periodTab li a').click((e) => {
    e.preventDefault();

    // const period = $(this).data('period');
    // 기간 선택에 따라 페이지 리로드 또는 ajax 호출
  });

  $('.tab').on('click', '.selectProductBtn', (e) => {
    e.preventDefault();
    const dataEle = $(e.target).parents('li');

    const productCode = dataEle.data('productCode');
    const productImg = dataEle.data('productImg');
    const productName = dataEle.data('productName');
    const productDiscount = dataEle.data('productDiscount');
    const productPrice = dataEle.data('productPrice');
    const orderNumber = dataEle.data('orderNumber');

    if (window.opener != null && !window.opener.closed) {
      window.opener.document.getElementById('orderNumber').value = orderNumber;
      window.opener.document.getElementById('productCode').value = productCode;
      window.opener.document.getElementById('productName').value = productName;
      window.opener.document.getElementById('productImg').setAttribute('src', productImg);
      window.opener.document.getElementById('productNameText').textContent = productName;
      if (productDiscount > 0) {
        window.opener.document.getElementById('productDiscount').style.display = 'block';
        window.opener.document.getElementById('productDiscount').textContent = productDiscount;
      }
      window.opener.document.getElementById('productPrice').textContent = productPrice;
      window.opener.document.getElementById('selectedProduct').style.display = 'block';
      window.opener.document.getElementById('emptyProduct').style.display = 'none';
    }
    window.close();
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
            $('#resultWishListWrapper .prod-more').hide();
          }
          $.each(data.results, (index, element) => {
            if (index == 0) {
              $('#resultWishListWrapper .prod-list').html(searchProductItemTemplate(element));
            } else {
              $('#resultWishListWrapper .prod-list').append(searchProductItemTemplate(element));
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
          $('#resultCartListWrapper').show().find('.prod-more').hide();

          $.each(data.items, (index, element) => {
            if (index == 0) {
              $('#resultCartListWrapper .prod-list').html(searchProductItemTemplate(element));
            } else {
              $('#resultCartListWrapper .prod-list').append(searchProductItemTemplate(element));
            }
          });
        } else {
          $('#emptyResultCartList').show();
        }
      },
    });
  }

  let orderListCurrentPage = 1;

  function getOrderList() {
    const endDate = moment().format('YYYYMMDD');
    const startDate = moment(endDate).add(-1, 'M').format('YYYYMMDD');

    const params = {
      startDate,
      endDate,
      requestType: 30,
      pageSize: 4,
      currentPage: orderListCurrentPage,
    };

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
                $('#resultOrderListWrapper .prod-list').html(searchProductItemTemplate(orderItem));
              } else {
                $('#resultOrderListWrapper .prod-list').append(searchProductItemTemplate(orderItem));
              }
            });
          });
        } else {
          if (orderListCurrentPage > 1) {
            alert('더이상 조회내용이 없습니다.');
            $('#resultOrderListWrapper .prod-more').hide();
          } else {
            $('#emptyResultOrderList').show();
          }
        }
      },
    });
  }

  $('#resultOrderListWrapper .prod-more').click((e) => {
    e.preventDefault();

    orderListCurrentPage++;
    getOrderList();
    selectedProductTabs.push('order');
  });

  if ($('#productTypeTabs').length > 0) {
    getOrderList();
    searchProductItemTemplate = Handlebars.templates['mobile/precompiles/contact/search-product-item'];
  }

  $('#productTypeTabs > li').click((e) => {
    e.preventDefault();

    const $this = $(e.target);

    $('#productTypeTabs > li').removeClass('on');
    const productType = $this.data('productType');
    $this.parent().addClass('on');

    if (productType == 'cart' && !selectedProductTabs.includes('cart')) {
      selectedProductTabs.push('cart');
      getCartList();
    } else if (productType == 'wishList' && !selectedProductTabs.includes('wishList')) {
      selectedProductTabs.push('wishList');
      getWishList();
    }
  });

  const mainCategoryDataMap = new Map();

  function showSubCategory(mainCategory) {
    let optionHtml = '<option value="">상세 유형을 선택해 주세요.</option>';
    if (mainCategory != '') {
      $.each(mainCategoryDataMap.get(mainCategory), (index, subCategory) => {
        optionHtml += `<option value='${subCategory.code}'>${subCategory.categoryValue}</option>`;
      });
    }
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
    if (!mainCategoryDataMap.has(selectedMainCategory)) {
      if (selectedMainCategory != '') {
        getSubCategories(selectedMainCategory);
      } else {
        showSubCategory(selectedMainCategory);
      }
    } else {
      showSubCategory(selectedMainCategory);
    }
  });

  $('#select_category2').change(() => {
    const selectedSubCategory = $('#select_category2 option:selected').val();
    getSurveyList(selectedSubCategory);
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
      if ($('#choice_type option:selected').val() == '') {
        alert('유형을 선택해 주세요.');
        contactAddFormSubmitBtnLadda.stop();
        return false;
      }
      const nodeId = $('#select_category2 option:selected').val();
      if (nodeId == '') {
        alert('상세 유형을 선택해 주세요.');
        contactAddFormSubmitBtnLadda.stop();
        return false;
      }
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
