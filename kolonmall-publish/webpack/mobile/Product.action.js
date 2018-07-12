$(document).on('mobile:Product:load', () => {
  function addWishlistItem(productCode) {
    $.ajax({
      url: `/WishList/Add?productCode=${productCode}`,
      type: 'PUT',
      success: () => {
        // data.status == 'ok'
      },
      complete: () => {
      },
    });
  }

  $('#addToWishlistBtn').click((e) => {
    e.preventDefault();

    let productCode = '';
    $.each($('.size a'), (index, sizeEle) => {
      if ($(sizeEle).hasClass('on')) {
        productCode = $(sizeEle).data('sizeCode');
        return false;
      }
      return true;
    });
    // TODO : 테스트를 위한 코드. 선택된 사이즈가 없으면 첫번째 상품 코드 가지고 가게 (삭제할것)
    if ($.trim(productCode) == '') {
      productCode = $('.size a').eq(0).data('sizeCode');
    }
    const $this = $(e.target);
    if ($this.hasClass('on')) {
      // removeWishlistItem();
    } else {
      addWishlistItem(productCode);
    }
  });

  // 카트 담기 샘플 코드입니다.
  // TODO: 상품코드와 수량만 받게 되어 있음. 나중에 모든 상황 가능하게 수정해야 함.
  function addCartItem(productCode, quantity) {
    $.ajax({
      url: `/Cart/Add?productCode=${productCode}&quantity=${quantity}`,
      type: 'PUT',
      success: (data) => {
        // data.status == 'ok'
        // TODO: 임시로 메시지 출력.
        alert(`장바구니에 담김(${productCode}). - cart count: ${data.cartCount}`);
      },
      complete: () => {
      },
    });
  }

  $('#addToCartBtn').click((e) => {
    e.preventDefault();

    let productCode = '';
    $.each($('.size a'), (index, sizeEle) => {
      if ($(sizeEle).hasClass('on')) {
        productCode = $(sizeEle).data('sizeCode');
        return false;
      }
      return true;
    });
    // TODO : 테스트를 위한 코드. 선택된 사이즈가 없으면 첫번째 상품 코드 가지고 가게 (삭제할것)
    if ($.trim(productCode) == '') {
      productCode = $('.size a').eq(0).data('sizeCode');
    }
    const $this = $(e.target);
    if ($this.hasClass('on')) {
        // removeWishlistItem();
    } else {
      const quantity = $('#quantity').text();
      addCartItem(productCode, quantity);
    }
  });
});
