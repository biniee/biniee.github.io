import numeral from 'numeral';

$(document).on('mobile:Cart:load', () => {
  $('.cartSubmitBtn').click((e) => {
    e.preventDefault();

    // const clickedCartSubmitBtn = $(e.target);
    if ($('.cartItemCheckbox:checked').length > 0) {
      const cartItemIds = [];
      $('.cartItemCheckbox:checked').each((index, element) => {
        const $this = $(element);
        const $thisParentLi = $this.parents('li');
        cartItemIds.push($thisParentLi.data('entryNumber'));
      });
      $('#entryNo').val(cartItemIds.join(','));

      // const cartAddFormSubmitBtnLadda = Ladda.create(clickedCartSubmitBtn[0]);
      // cartAddFormSubmitBtnLadda.start();

      $.ajax({
        url: '/Cart/PrepareOrder',
        method: 'POST',
        data: $('#cartForm').serialize(),
        dataType: 'JSON',
        success: (data) => {
          if (data.status == 'ok') {
            location.href = '/Order/Checkout';
          } else {
            alert(data.message);
          }
        },
        complete: () => {
          // cartAddFormSubmitBtnLadda.stop();
        },
      });
    } else {
      alert('상품을 선택해 주세요.');
    }
  });

  $('#selectAllCheckbox').click((e) => {
    $('#cartForm #cartItemList li').each((index, element) => {
      if ($(element).data('isPickupItem') == true) {
        alert('택배상품과 매장픽업 상품은 함께 주문할 수 없습니다.');
        return false;
      }
      return true;
    });
    $('.cartItemCheckbox').prop('checked', $(e.target).is(':checked'));
  });

  // 배송비와 금액 재계산 - 스크립트 딴에서 카트 아이템 프라이스 정보로 계산
  function calculateTotal() {
    //TODO : applyfamilydiscount 적용되었는지 안되었는지를 알아야함
    let formattedBasePrice = '0';
    let formattedDeliveryCost = '0';
    let formattedAllDiscounts = '0';
    let formattedRealPrice = '0';
    let discountSign = '';
    if ($('.cartItemCheckbox:checked').length > 0) {
      let totalBasePrice = 0;
      let totalDeliveryCost = 0;
      let totalDiscounts = 0;
      let totalRealPrice = 0;

      $('.cartItemCheckbox:checked').each((index, element) => {
        const $this = $(element);
        const targetEle = $this.parents('li');

        const basePrice = targetEle.data('totalBasePrice') * 1;
        const deliveryCost = targetEle.data('deliveryCost') * 1;
        // const employeeDiscounts = targetEle.data('totalEmployeeDiscounts'); // TODO : 임직원 할인가가 totalDiscounts에 포함되어 있는지 모르겠음..
        const allDiscounts = targetEle.data('totalDiscounts') * 1;
        const realPrice = targetEle.data('totalRealPrice') * 1;

        totalBasePrice += basePrice;
        totalDeliveryCost += deliveryCost;
        totalDiscounts += allDiscounts;
        totalRealPrice += realPrice;
      });

      if (totalDiscounts != 0) {
        discountSign = '-';
      }

      formattedBasePrice = numeral(totalBasePrice).format('0,0');
      formattedDeliveryCost = numeral(totalDeliveryCost).format('0,0');
      formattedAllDiscounts = numeral(totalDiscounts).format('0,0');
      formattedRealPrice = numeral(totalRealPrice).format('0,0');
    }
    $('#totalBasePrice').text(`${formattedBasePrice}원`);
    $('#totalDeliveryCost').text(`${formattedDeliveryCost}원`);
    $('#totalDiscounts').text(`${discountSign}${formattedAllDiscounts}원`);
    $('#totalRealPrice').text(formattedRealPrice);
  }

  function replaceCartItemView(cartItemData, isChecked) {
    const changedCartItemTemplate = Handlebars.templates['mobile/precompiles/cart/cart-item'];
    $('#cartForm #cartItemList li').each((index, liEle) => {
      const $this = $(liEle);
      if ($this.data('entryNumber') == cartItemData.entryNumber) {
        $this.replaceWith(changedCartItemTemplate(cartItemData, isChecked));
        return false;
      }
      return true;
    });
  }

  function reloadGiftListView(hasGiftItems, siteFreeGiftItems, siteFirstFreeGiftItems) {
    if (hasGiftItems) {
      const changedCartItemTemplate = Handlebars.templates['mobile/precompiles/cart/gift-list'];
      const giftData = { siteFreeGiftItems, siteFirstFreeGiftItems };
      $('#cartGiftArea').html(changedCartItemTemplate(giftData));
    }
  }

  function reloadCartView(cartData, targetEntryNumber, isChecked) {
    if (cartData.cart && cartData.cart.items && cartData.cart.items.length > 0) {
      $.each(cartData.cart.items, (index, item) => {
        if (item.entryNumber == targetEntryNumber) {
          const cartItem = item;
          cartItem.isChecked = isChecked;
          replaceCartItemView(cartItem);
          return false;
        }
        return true;
      });
      calculateTotal();
      reloadGiftListView(cartData.hasGiftItems, cartData.siteFreeGiftItems, cartData.siteFirstFreeGiftItems);
    }
  }

  const sizeOptionDataMap = new Map();

  function showSizeList(selectedProductCode, productBaseCode, targetEle) {
    let optionHtml = '';
    $.each(sizeOptionDataMap.get(productBaseCode), (index, size) => {
      const selectedAttr = selectedProductCode == size.code ? 'selected="selected"' : '';
      const disabledAttr = !size.isInStock ? 'disabled="disabled"' : '';
      optionHtml += `<option value='${size.code}' ${selectedAttr} ${disabledAttr}>${size.sizeValue} ${!size.isInStock ? '(품절)' : ''}</option>`;
    });
    targetEle.html(optionHtml);
  }

  function getSizeList(selectedProductCode, productBaseCode, targetEle) {
    $.getJSON(`/Product/${productBaseCode}/variantOptions`, (data) => {
      if (data && data.results && data.results.length > 0) {
        const sizeList = [];
        $.each(data.results, (index, product) => {
          let value = '';
          $.each(product.variantOptionQualifiers, (index2, option) => {
            if (option.qualifier == 'size') {
              value = option.value;
            }
          });
          const sizeData = {
            code: product.code,
            sizeValue: value,
            isInStock: product.stock.stockLevelStatus != 'outOfStock' && product.stock.stockLevel > 0,
          };
          sizeList.push(sizeData);
        });

        sizeOptionDataMap.set(productBaseCode, sizeList);
      }
    }).then(() => {
      showSizeList(selectedProductCode, productBaseCode, targetEle);
    });
  }

  function deleteCartItems(entryNumbers, isOnlyOneItem) {
    const confirmResult = confirm('장바구니에서 해당 상품을 삭제하시겠습니까?');
    if (confirmResult) {
      $.ajax({
        url: `/Cart/Item?entryNo=${entryNumbers}`,
        type: 'DELETE',
        success: (data) => {
          if (data) {
            if (isOnlyOneItem) {
              $('#cartItemList li .cartItemCheckbox').each((index, checkbox) => {
                const parentEle = $(checkbox).parents('li');
                if (parentEle.data('entryNumber') == entryNumbers) {
                  parentEle.remove();
                }
              });
            } else {
              $('#cartItemList li .cartItemCheckbox:checked').each((index, checkbox) => {
                $(checkbox).parents('li').remove();
              });
            }

            // 모든 관심 리스트 항목 삭제의 경우
            if ($('#cartItemList li').length == 0) {
              location.reload();
            } else {
              calculateTotal();
              reloadGiftListView(data.hasGiftItems, data.siteFreeGiftItems, data.siteFirstFreeGiftItems);
            }
            if (data.cartCount > 0) {
              $('.top-navi .cart').html(`<i>${data.cartCount}</i>`);
            } else {
              $('.top-navi .cart').html('');
            }
          }
        },
        error: (request) => {
          const responseObj = JSON.parse(request.responseText);
          if (responseObj.code == 'ERROR') {
            alert(responseObj.message);
          }
        },
        complete: () => {
        },
      });
    }
  }

  $('#cartForm')
    .on('change', ' #cartItemList li .cartItemCheckbox, #selectAllCheckbox', () => {
      // 아이템 체크/체크 해제시, 전체 토글 체크/체크 해제시
      calculateTotal();
    })
    .on('click', '.quantityMinus', (e) => {
      e.preventDefault();
      const $this = $(e.target);
      if ($this.attr('disabled') === undefined || $this.attr('disabled') != 'disabled') {
        const targetEle = $this.parents('li').find('.cartItemQuantity');
        const currentQty = targetEle.val();
        if (currentQty !== undefined) {
          let intCurrentQty = parseInt(currentQty, 10);
          if (intCurrentQty > 1) {
            intCurrentQty--;
            targetEle.val(intCurrentQty);
            targetEle.eq(0).trigger('change');
          }
        }
      }
    })
    .on('click', '.quantityPlus', (e) => {
      e.preventDefault();
      const $this = $(e.target);
      if ($this.attr('disabled') === undefined || $this.attr('disabled') != 'disabled') {
        const targetEle = $this.parents('li').find('.cartItemQuantity');
        const currentQty = targetEle.val();
        if (currentQty !== undefined) {
          let intCurrentQty = parseInt(currentQty, 10);
          intCurrentQty++;
          targetEle.val(intCurrentQty);
          targetEle.eq(0).trigger('change');
        }
      }
    })
    .on('click', '.sizeSelect', (e) => {
      const $this = $(e.target);
      const dataEle = $this.parents('li');
      let productBaseCode = dataEle.data('productBaseCode');
      const selectedProductCode = dataEle.find('.sizeSelect option:selected').val();
      const isSetCartItem = dataEle.data('isSetCartItem');
      if (isSetCartItem) {
        productBaseCode = $this.parents('.setItem').data('productBaseCode');
      }
      if (!sizeOptionDataMap.has(productBaseCode)) {
        getSizeList(selectedProductCode, productBaseCode, $this);
      } else {
        showSizeList(selectedProductCode, productBaseCode, $this);
      }
    })
    .on('change', '.sizeSelect', (e) => {
      const $this = $(e.target);
      const targetEle = $this.parents('li');
      const entryNo = targetEle.data('entryNumber');
      const productCode = targetEle.find('.sizeSelect option:selected').val();
      const isChecked = targetEle.find('.cartItemCheckbox').is(':checked');
      $.ajax({
        url: `/Cart/Item/Size?entryNo=${entryNo}&productCode=${productCode}`,
        type: 'PUT',
        success: (data) => {
          if (data) {
            reloadCartView(data, entryNo, isChecked);
          }
        },
        error: (request) => {
          const responseObj = JSON.parse(request.responseText);
          if (responseObj.code == 'ERROR') {
            alert(responseObj.message);
          }
        },
        complete: () => {
        },
      });
    })
    .on('click', '.addToWishListBtn', (e) => {
      e.preventDefault();

      const $this = $(e.target);
      const dataEle = $this.parents('li');
      const isSetCartItem = dataEle.data('isSetCartItem');
      let productCode = dataEle.data('baseProductCode');
      if (isSetCartItem) {
        productCode = dataEle.data('productCode');
      }
      $.ajax({
        url: `/WishList/Add?productCode=${productCode}`,
        type: 'PUT',
        success: () => {
          alert('관심상품으로 등록되었습니다.');
        },
        error: (request) => {
          const responseObj = JSON.parse(request.responseText);
          if (responseObj.code == 'ERROR') {
            alert(responseObj.message);
          }
        },
        complete: () => {
        },
      });
    })
    .on('click', '.deleteCartItemBtn', (e) => {
      e.preventDefault();

      const $this = $(e.target);
      const entryNo = $this.parents('li').data('entryNumber');
      deleteCartItems(entryNo, true);
    })
    .on('change', '.cartItemQuantity', (e) => {
      e.preventDefault();

      const $this = $(e.target);
      const dataEle = $this.parents('li');
      const isChecked = dataEle.find('.cartItemCheckbox').is(':checked');
      const entryNo = dataEle.data('entryNumber') + '';
      const quantity = $this.val();
      const originalQuantity = $this.data('originalQuantity');

      dataEle.find('.cartItemQuantity').val($this.val()); // 세트상품이라면 갯수가 함께 바뀌어야 하므로

      // ex) 세트상품 파라미터 - entryNo:2,1 quantity:2
      $.ajax({
        url: `/Cart/Item/Quantity?entryNo=${entryNo}&quantity=${quantity}`,
        type: 'PUT',
        success: (data) => {
          if (data) {
            reloadCartView(data, entryNo, isChecked);
          }
        },
        error: (request) => {
          const responseObj = JSON.parse(request.responseText);
          if (responseObj.code == 'ERROR') {
            alert(responseObj.message);
            dataEle.find('.cartItemQuantity').val(originalQuantity);
          }
        },
        complete: () => {
        },
      });
    })
    .on('click', '.buyNowBtn', (e) => {
      e.preventDefault();

      const $this = $(e.target);
      const targetEle = $this.parents('li');
      $('#cartForm #cartItemList li .cartItemCheckbox').prop('checked', false);
      targetEle.find('.cartItemCheckbox').prop('checked', true);
      $('.cartSubmitBtn').eq(0).trigger('click');
    })
    .on('click', '.familyDiscountBtn', (e) => {
      e.preventDefault();
      const $this = $(e.target);
      const parentsEle = $this.parents('.info');
      parentsEle.find('.familyDiscountBtn').toggle();
      if ($this.hasClass('family-btn-o')) {
        parentsEle.find('.familyDiscountPrice').show();
        calculateTotal();
      } else {
        parentsEle.find('.familyDiscountPrice').hide();
        calculateTotal();
      }
    });

  function initSettingCartForm() {
    const targetCheckboxEle = $('#cartForm #cartItemList li .cartItemCheckbox');
    $('#cartForm #cartItemList li').each((index, element) => {
      if ($(element).data('isPickupItem') == true) {
        targetCheckboxEle.prop('checked', false).trigger('change');
        return false;
      }
      return true;
    });
    targetCheckboxEle.prop('checked', true).trigger('change');
  }

  if ($('#cartForm').length > 0) {
    initSettingCartForm();
  }

  $('#deleteSelectedItemsBtn').click((e) => {
    e.preventDefault();

    if ($('#cartForm #cartItemList li .cartItemCheckbox:checked').length > 0) {
      const entryNumberList = [];

      $('#cartForm #cartItemList li .cartItemCheckbox:checked').each((index, element) => {
        entryNumberList.push($(element).parents('li').data('entryNumber'));
      });
      deleteCartItems(entryNumberList.join(','), false);
    } else {
      alert('상품을 선택해 주세요.');
    }
  });
});
