# render helper

여러화면에서 공통으로 사용하는 상품목록과 배너를 그리는 helper에 대해 소개합니다.

## example

상품리스트와 배너영역에 HTML 코드 대신 helper 함수를 사용합니다.

* before

```
<article class="scr-prod">
    <div class="swiper-wrapper">
        {{#list}}
            {{>mobile/precompiles/product/list-type1 this}}
        {{/list}}
    </div>
</article>
```

* after

```
{{{render_product "slide" "page/main/new_arrival"}}}
```

## mobile type

### 상품(product)

**1. 상품 리스트 슬라이드형**

```
{{{render_product "slide" "page/main/new_arrival"}}}
```

- views/mobile/components/product/slide.hbs
- views/mobile/precompiles/product/slide.hbs

**2. 상품 리스트형**

```
{{{render_product "list" "page/main/brand_best"}}}
```

- views/mobile/components/product/list.hbs
- views/mobile/precompiles/product/list.hbs

**3. 상품 그리드형**

```
{{{render_product "grid" "page/main/sale"}}}
```

- views/mobile/components/product/grid.hbs
- views/mobile/precompiles/product/grid.hbs

### 배너(banner)

**1. 컨텐츠형**

**1.1. 컨텐츠 리스트형**

```
{{{render_banner "contents/default" "page/main/top_banner"}}}
```

- views/mobile/components/banner/contents/default.hbs
- views/mobile/precompiles/banner/contents/default.hbs

**1.2. 컨텐츠 플리킹형**

```
{{{render_banner "contents/flicking" "page/main/special_price"}}}
```

- views/mobile/components/banner/contents/flicking.hbs
- views/mobile/precompiles/banner/contents/flicking.hbs

**2. 띠배너형**

**2.1. 띠배너 기본형**

```
{{{render_banner "line/default" "page/main/bottom_banner"}}}
```

- views/mobile/components/banner/line/default.hbs
- views/mobile/precompiles/banner/line/default.hbs

**2.2. 띠배너 with X버튼**

```
{{{render_banner "line/on-off" "page/main/header_banner"}}}
```

- views/mobile/components/banner/line/on-off.hbs
- views/mobile/precompiles/banner/line/on-off.hbs
