$(document).on('desktop:WishList:load', () => {
  const AJAX_RETURN_SUCCESS_CODE = 'ok';

  function deleteWishlistItems(itemIds, isOnlyOneItem) {
    const confirmResult = confirm('삭제하시겠습니까?');
    if (confirmResult) {
      $.ajax({
        url: `/WishList/Delete?productCode=${itemIds}`,
        type: 'DELETE',
        success: (data) => {
          if (isOnlyOneItem) {
            $('.wishlist-item-checkbox').each((index, checkbox) => {
              if ($(checkbox).val() == itemIds) {
                $(checkbox).parents('li').remove();
              }
            });
          } else {
            $('.wishlist-item-checkbox:checked').each((index, checkbox) => {
              $(checkbox).parents('li').remove();
            });
          }
        },
        complete: () => {
          // 모든 관심 리스트 항목 삭제의 경우
          if ($('.c-list li').length == 0) {
            location.reload();
          }
        },
        error: (data) => {
          alert(error.message);
        }
      });
    }
  }

  function addToCart(itemIds, quantityList) {
    const wishlistData = $('#wishlistForm').serializeArray(); // convert form to array
    wishlistData.push({ name: 'productCode', value: itemIds });
    wishlistData.push({ name: 'quantity', value: quantityList });

    $.ajax({
      url: '/Cart/Add',
      method: 'POST',
      data: $.param(wishlistData),
      dataType: 'JSON',
      success: (data) => {
        $('.top-navi .cart').html(`<i>${data.cartCount}</i>`);
        if (confirm('장바구니에 추가되었습니다.\n장바구니 페이지로 이동하시겠습니까?')) {
          location.href = '/Cart';
        }
      },
      complete: () => {
      },
    });
  }

  $('.delete-item-btn').click((e) => {
    e.preventDefault();

    deleteWishlistItems($(e.target).parents('li').find('.wishlist-item-checkbox').val(), true);
  });

  $('.add-to-cart-btn').click((e) => {
    e.preventDefault();

    addToCart($(e.target).parents('li').find('.wishlist-item-checkbox').val(), 1); // TODO : 관심상품에서 카트이동시 수량은?
  });

  $('#deleteSelectedItemsBtn').click((e) => {
    e.preventDefault();

    if ($('.wishlist-item-checkbox:checked').length > 0) {
      let productCodes = '';
      $('.wishlist-item-checkbox:checked').each((index, element) => {
        productCodes += $(element).val() + ';';
      });
      deleteWishlistItems(productCodes, false);
    } else {
      alert('상품을 선택해 주세요.');
    }
  });

  $('#addToCartSelectedItemsBtn').click((e) => {
    e.preventDefault();

    if ($('.wishlist-item-checkbox:checked').length > 0) {
      const productCodes = [];
      const quantityList = [];
      $('.wishlist-item-checkbox:checked').each((index, element) => {
        productCodes.push($(element).val());
        quantityList.push(1); // TODO : 관심상품에서 카트이동시 수량은?
      });

      addToCart(productCodes.join(','), quantityList.join(','));
    } else {
      alert('상품을 선택해 주세요.');
    }
  });

  $('#selectAllCheckbox').click((e) => {
    $('.wishlist-item-checkbox').prop('checked', $(e.target).is(':checked'));
  });
});
