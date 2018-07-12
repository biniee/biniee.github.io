import express from 'express';
import YAML from 'yamljs';
import fs from 'fs';
import path from 'path';
import { getAssetPath, getViewPath } from './lib/path_helper';

const title = 'WebStater';

const toJson = (path, req, data = {}) => Object.assign({}, {
  mobile: req.mobile,
  mobileViewMode: req.mobileViewMode,
  title: path || '/',
  assetPath: getAssetPath(path, req.mobileViewMode),
  gnb: req._common.gnb,
  categoriesByCode: req._common.categoriesByCode,
}, data);

const defaultRouter = (defaultViewPath) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    if (req.mobileViewMode) {
      const sitemap = YAML.load('./conf/sitemap.mobile.yml');

      res.render(defaultViewPath.index, toJson('/', req, {
        title: 'Mobile Index',
        assetPath: null,
        sitemap,
      }));
    } else {
      const sitemap = YAML.load('./conf/sitemap.desktop.yml');

      res.render(defaultViewPath.index, toJson('/', req, {
        title: 'Desktop Index',
        assetPath: null,
        sitemap,
      }));
    }
  });

  router.get('/output', (req, res) => {
    const id = req.query.id;
    const type = req.query.type;
    const isMobile = req.query.isMobile;
    const mobilePath = isMobile == 'false' ? 'desktop' : 'mobile';
    let folder = `${type}/${mobilePath}/${id.replace('.', '/')}`;
    if (folder.indexOf('(') > -1) {
      folder = folder.substr(0, folder.indexOf('('));
    }
    const images = [];

    fs.readdir(path.join(__dirname, `output/${folder}`), (err, files) => {
      if (files) {
        files.forEach((file) => {
          const ext = path.extname(file).toLowerCase();
          if (ext == '.png' || ext == '.jpg' || ext == '.gif') {
            images.push(`/${folder}/${file}`);
          }
        });
      }
    });

    res.render('./_system/handlebars/views/output', {
      images,
    });
  });

  router.get(['/Cart/Count'], (req, res) => {
    res.json(
      { cartCount: '12' },
    );
  });

  router.get('/Main/Index', (req, res) => {
    const path = 'Main/Index';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      list: [
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
      ],
      brandBestList: [
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
      ],
      saleProductList: [
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'series',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '20,000',
          },
        },
        {
          description: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
          supplierName: 'HEAD',
          name: '헤드 핏 우먼 스포츠 운동화 30% OFF',
          price: {
            formattedValue: '100,000',
          },
        },
      ],
    }));
  });

  router.get(['/Contact', '/Contact/Index'], (req, res) => {
    const path = 'Contact/Index';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      qna: {
        qnaCount: 10,
        qnaEndCount: 8,
        qnaIngCount: 2,
        qnaList: [
          {
            ticketId: '1',
            ticketFlag: '0',
            questionTitle: '방금 결제했는데요. 포인트 적립이누락되었습니다. 빨리 확인해 주세요.',
            createdDate: '2017.05.10',
          },
          {
            ticketId: '2',
            ticketFlag: '1',
            questionTitle: '방금 결제했는데요. 또!!! 포인트 적립이누락되었습니다. 빨리 확인해 주세요.',
            createdDate: '2017.05.10',
          },
        ],
      },
    }));
  });

  router.get(['/Contact/getQnaDetailView/:ticketId'], (req, res) => {
    const ticketId = req.params.ticketId;
    if (ticketId == '1') {
      res.json(
        {
          ANSWEND: [],
          detailInfo: {
            ticketStatus: 'ASSIGNS',
            ticketFlag: '0',
            attachDownloadUrl: '/api/enomix_file/common/getAttach.json',
            ticketId: 'TCKT0000132544',
          },
          ANSWADD: [],
          ASSIGNS: [
            {
              createdDate: '2017.06.19',
              title: '아 궁금한게 너무 많은데~',
              contents: '이 상품에 대해 궁금합니다. 궁금한게 너무 많습니다.',
              attachCount: '0',
            },
          ],
          ANSWTMP: [],
        },
      );
    } else {
      res.json(
        {
          ANSWEND: [],
          detailInfo: {
            ticketStatus: 'ANSWADD',
            ticketFlag: '1',
            attachDownloadUrl: '/api/enomix_file/common/getAttach.json',
            ticketId: 'TCKT0000132544',
          },
          ANSWADD: [
            {
              createdDate: '2017.06.20',
              title: '죄송합니다. 고객님',
              contents: '심려를 끼쳐 죄송합니다, 고객님. 다음에 더 좋은 상품으로 만나요~ 뿅~',
              attachCount: '0',
            },
          ],
          ASSIGNS: [
            {
              createdDate: '2017.06.19',
              title: '아 궁금한게 너무 많은데~',
              contents: '이 상품에 대해 궁금합니다. 궁금한게 너무 많습니다.',
              attachCount: '0',
            },
          ],
          ANSWTMP: [],
        },
      );
    }
  });

  router.get(['/FAQ', '/FAQ/Index'], (req, res) => {
    const path = 'FAQ/Index';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      faqCategories: [
        {
          nodeName: '카드',
          nodeId: 'NODE0000000889',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '고객정보',
          nodeId: 'NODE0000000890',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '온라인몰',
          nodeId: 'NODE0000000891',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '제품',
          nodeId: 'NODE0000000892',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '매장',
          nodeId: 'NODE0000002497',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '이벤트',
          nodeId: 'NODE0000002500',
          parentId: 'NODE0000000887',
        },
      ],
      topFive: [
        {
          title: '교환신청/반품신청은 어떻게 하나요.',
          content: '교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.',
          kbId: '1',
          nodeId: 'point',
        },
        {
          title: '교환신청/반품신청은 어떻게 하나요2',
          content: '2교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.',
          kbId: '2',
          nodeId: 'point',
        },
        {
          title: '교환신청/반품신청은 어떻게 하나요3',
          content: '3교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.',
          kbId: '3',
          nodeId: 'point',
        },
        {
          title: '교환신청/반품신청은 어떻게 하나요4',
          content: '4교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.',
          kbId: '4',
          nodeId: 'point',
        },
        {
          title: '교환신청/반품신청은 어떻게 하나요5',
          content: '5교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다. 교환신청/반품신청은 어떻게 합니다.',
          kbId: '5',
          nodeId: 'point',
        },
      ],
    }));
  });

  router.get(['/FAQ/List', '/FAQ/:faqCategoryCode/List', '/FAQ/:faqCategoryCode/List/:faqSubCategoryCode'], (req, res) => {
    const path = 'FAQ/List';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      faqCategories: [
        {
          nodeName: '카드',
          nodeId: 'NODE0000000889',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '고객정보',
          nodeId: 'NODE0000000890',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '온라인몰',
          nodeId: 'NODE0000000891',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '제품',
          nodeId: 'NODE0000000892',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '매장',
          nodeId: 'NODE0000002497',
          parentId: 'NODE0000000887',
        },
        {
          nodeName: '이벤트',
          nodeId: 'NODE0000002500',
          parentId: 'NODE0000000887',
        },
      ],
      faqCount: '3',
      faqPageNo: '1',
      faqItems: [
        {
          kbId: 'KNOW0000000066',
          nodeName: '제품교환 및 환불',
          nodePath: '코오롱 > 조이코오롱 > 한글_FAQ_메일 > 제품 > 제품교환 및 환불',
          title: '소비자피해보상규정 내용에 대해 알수 있나요?',
          nodeId: 'NODE0000000916',
          domainId: 'NODE0000000001',
        },
        {
          kbId: 'KNOW0000000065',
          nodeName: '제품교환 및 환불',
          nodePath: '코오롱 > 조이코오롱 > 한글_FAQ_메일 > 제품 > 제품교환 및 환불',
          title: '보상기준과 보상순위는 어떻게 되나요?',
          nodeId: 'NODE0000000916',
          domainId: 'NODE0000000001',
        },
        {
          kbId: 'KNOW0000000064',
          nodeName: '제품교환 및 환불',
          nodePath: '코오롱 > 조이코오롱 > 한글_FAQ_메일 > 제품 > 제품교환 및 환불',
          title: '매장에서 구입한 제품의 교환 또는 환불은 어떻게 하나요?',
          nodeId: 'NODE0000000916',
          domainId: 'NODE0000000001',
        },
      ],
      currentFaqCategory: {
        nodeName: '제품',
        nodeId: 'NODE0000000892',
        parentId: 'NODE0000000887',
      },
      faqRowsPerPage: '100',
      currentFaqSubCategory: null,
      faqSubCategories: [
        {
          nodeName: '제품교환 및 환불',
          nodeId: 'NODE0000000916',
          parentId: 'NODE0000000892',
        },
        {
          nodeName: '제품가격',
          nodeId: 'NODE0000002503',
          parentId: 'NODE0000000892',
        },
        {
          nodeName: '제품수선',
          nodeId: 'NODE0000002504',
          parentId: 'NODE0000000892',
        },
        {
          nodeName: '제품품질',
          nodeId: 'NODE0000002505',
          parentId: 'NODE0000000892',
        },
        {
          nodeName: '제품정보',
          nodeId: 'NODE0000002506',
          parentId: 'NODE0000000892',
        },
        {
          nodeName: '기타',
          nodeId: 'NODE0000002502',
          parentId: 'NODE0000000892',
        },
      ],
      topFive: [
        {
          kbId: 'KNOW0000000019',
          nodeName: '포인트적립(구매) 이력',
          nodePath: '코오롱 > 조이코오롱 > 한글_FAQ_메일 > 카드 > 포인트적립(구매) 이력',
          title: '현금영수증 발행을 요청합니다 ',
          nodeId: 'NODE0000000900',
        },
        {
          kbId: 'KNOW0000000018',
          nodeName: '주문 및 배송',
          nodePath: '코오롱 > 조이코오롱 > 한글_FAQ_메일 > 온라인몰 > 주문 및 배송',
          title: '현재의 배송상태를 알고 싶습니다 ',
          nodeId: 'NODE0000000907',
        },
        {
          kbId: 'KNOW0000000038',
          nodeName: '고객정보 확인 변경',
          nodePath: '코오롱 > 조이코오롱 > 한글_FAQ_메일 > 고객정보 > 고객정보 확인 변경',
          title: '이메일 주소가 변경되었습니다. 어떻게 하나요?',
          nodeId: 'NODE0000000902',
        },
      ],
    }));
  });

  router.get(['/FAQ/:nodeId/getFaqDetailView/:kbId'], (req, res) => {
    res.json(
      {
        kbId: '1',
        nodeName: '고객정보 확인 변경',
        contents: "홈페이지에서 로그인 하신 후 마이 페이지에서나의정보  '회원정보 변경'을 선택하시면 정보수정 가능합니다.  감사합니다.",
        nodePath: '코오롱 > 조이코오롱 > 한글_FAQ_메일 > 고객정보 > 고객정보 확인 변경',
        title: '회원정보변경은 어떻게 하나요?',
        nodeId: 'point',
        domainId: 'NODE0000000001',
      },
      );
  },
  );

  router.get(['/Order/Delivery'], (req, res) => {
    const path = 'Order/Delivery';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      cart:
      {
        items: [
          {
            isAvailableStock: true,
            product: {
              supplierName: 'KOLON SPORT',
              representationImage: '/_ui/img/m/temp/d-prod01.jpg',
              name: '여성용 소형 백팩 BLOSSOM BAG 여성용 소형 백팩 BLOSSOM BAG 여성용 소형 백팩 BLOSSOM BAG',
              code: 'QEBBM17504NAY',
              baseProduct: 'QEBBM17504NAY',
              color: '다크크레이',
              size: 'XXX',
            },
            totalDiscounts: {
              price: 0,
            },
            totalWishPrice: {
              formattedPrice: '23,000',
              symbol: '원',
            },
            totalRealPrice: {
              formattedPrice: '23,000',
              symbol: '원',
            },
          },
        ],
      },
    }));
  });

  router.get(['/Order/DeliveryList'], (req, res) => {
    res.json({
      page: {
        totalCount: 52,
        currentPage: 1,
        perPage: -1,
      },
      results: [
        {
          deliveryVendorName: '가배송',
          deliveryVendorCode: '48',
        },
        {
          deliveryVendorName: '가반품',
          deliveryVendorCode: '49',
        },
        {
          deliveryVendorName: '업체직송',
          deliveryVendorCode: '10',
        },
        {
          deliveryVendorName: '건영택배',
          deliveryVendorCode: '28',
        },
        {
          deliveryVendorName: '경동택배',
          deliveryVendorCode: '40',
        },
        {
          deliveryVendorName: '광천로지스',
          deliveryVendorCode: '54',
        },
        {
          deliveryVendorName: '꼬모택배',
          deliveryVendorCode: '39',
        },
        {
          deliveryVendorName: '뉴한국',
          deliveryVendorCode: '11',
        },
        {
          deliveryVendorName: '대림통운',
          deliveryVendorCode: '59',
        },
        {
          deliveryVendorName: '대신화물',
          deliveryVendorCode: '36',
        },
        {
          deliveryVendorName: '대한통운',
          deliveryVendorCode: '12',
        },
        {
          deliveryVendorName: '로엑스',
          deliveryVendorCode: '37',
        },
        {
          deliveryVendorName: '로젠택배',
          deliveryVendorCode: '34',
        },
        {
          deliveryVendorName: '바이더웨이',
          deliveryVendorCode: '52',
        },
        {
          deliveryVendorName: '벨익스',
          deliveryVendorCode: '41',
        },
        {
          deliveryVendorName: '사가와',
          deliveryVendorCode: '44',
        },
        {
          deliveryVendorName: '삼성택배',
          deliveryVendorCode: '13',
        },
        {
          deliveryVendorName: '스마일',
          deliveryVendorCode: '35',
        },
        {
          deliveryVendorName: '아주택배',
          deliveryVendorCode: '14',
        },
        {
          deliveryVendorName: '용마로지스',
          deliveryVendorCode: '53',
        },
        {
          deliveryVendorName: '우리택배',
          deliveryVendorCode: '27',
        },
        {
          deliveryVendorName: '우체국',
          deliveryVendorCode: '16',
        },
        {
          deliveryVendorName: '우편등기',
          deliveryVendorCode: '17',
        },
        {
          deliveryVendorName: '이노지스',
          deliveryVendorCode: '46',
        },
        {
          deliveryVendorName: '이클라인',
          deliveryVendorCode: '18',
        },
        {
          deliveryVendorName: '일양택배',
          deliveryVendorCode: '32',
        },
        {
          deliveryVendorName: '제니엘',
          deliveryVendorCode: '29',
        },
        {
          deliveryVendorName: '주코택배',
          deliveryVendorCode: '19',
        },
        {
          deliveryVendorName: '천일택배',
          deliveryVendorCode: '38',
        },
        {
          deliveryVendorName: '코덱스',
          deliveryVendorCode: '30',
        },
        {
          deliveryVendorName: '트라넷',
          deliveryVendorCode: '20',
        },
        {
          deliveryVendorName: '하나로',
          deliveryVendorCode: '45',
        },
        {
          deliveryVendorName: '한방택배',
          deliveryVendorCode: '55',
        },
        {
          deliveryVendorName: '한진택배',
          deliveryVendorCode: '21',
        },
        {
          deliveryVendorName: '한텍스',
          deliveryVendorCode: '57',
        },
        {
          deliveryVendorName: '행랑발송',
          deliveryVendorCode: '42',
        },
        {
          deliveryVendorName: '롯데택배',
          deliveryVendorCode: '22',
        },
        {
          deliveryVendorName: '호남택배',
          deliveryVendorCode: '31',
        },
        {
          deliveryVendorName: '후다닥',
          deliveryVendorCode: '26',
        },
        {
          deliveryVendorName: '훼미리',
          deliveryVendorCode: '51',
        },
        {
          deliveryVendorName: '훼미리',
          deliveryVendorCode: '23',
        },
        {
          deliveryVendorName: 'BS부산',
          deliveryVendorCode: '58',
        },
        {
          deliveryVendorName: 'CJ대한통운',
          deliveryVendorCode: '24',
        },
        {
          deliveryVendorName: 'DHL',
          deliveryVendorCode: '60',
        },
        {
          deliveryVendorName: 'EMS',
          deliveryVendorCode: '61',
        },
        {
          deliveryVendorName: 'GS25',
          deliveryVendorCode: '50',
        },
        {
          deliveryVendorName: 'KGB',
          deliveryVendorCode: '25',
        },
        {
          deliveryVendorName: 'KGB특',
          deliveryVendorCode: '33',
        },
        {
          deliveryVendorName: 'KG로지스',
          deliveryVendorCode: '62',
        },
        {
          deliveryVendorName: 'SC로직',
          deliveryVendorCode: '56',
        },
        {
          deliveryVendorName: 'SEDEX',
          deliveryVendorCode: '43',
        },
        {
          deliveryVendorName: '위드유',
          deliveryVendorCode: '63',
        },
      ] },
      );
  },
  );

  router.get(['/GuestOrder', '/GuestOrder/Index'], (req, res) => {
    const path = 'GuestOrder/Index';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
    }));
  });

  router.get(['/Notice', '/Notice/Index'], (req, res) => {
    const path = 'Notice/Index';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      notices: { page: { totalCount: 30, currentPage: 1, perPage: 20 }, results: [{ no: '3002', title: '공지사항 샘플 데이터 제목2', contentMobile: '모바일', contentDesktop: '데스크탑', publicationAt: 1498721029000 }, { no: '3001', title: '공지사항 샘플 데이터 제목1', contentMobile: '공지사항 모바일', publicationAt: 1498721029000 }, { no: '1', title: '테스트', contentMobile: '1', contentDesktop: '2', publicationAt: 1498721029000 }] },
    }));
  });

  router.get(['/Notice/ListJson'], (req, res) => {
    res.json({ page: { totalCount: 30, currentPage: 2, perPage: 20 }, results: [{ no: '3002', title: '공지사항 샘플 데이터 제목2', contentMobile: '모바일', contentDesktop: '데스크탑', publicationAt: 1498721029000 }, { no: '3001', title: '공지사항 샘플 데이터 제목1', contentMobile: '공지사항 모바일', publicationAt: 1498721029000 }, { no: '1', title: '테스트', contentMobile: '1', contentDesktop: '2', publicationAt: 1498721029000 }] });
  });

  router.get(['/Notice/View', '/Notice/:noticeId'], (req, res) => {
    const path = 'Notice/View';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      notice: { no: '3001', title: '공지사항 샘플 데이터 제목1', contentDesktop: '공지사항 모바일', publicationAt: 1498721029000 },
      prevNotice: { no: '3000', title: '이전 공지사항 샘플 데이터 제목1', contentDesktop: '공지사항 모바일', publicationAt: 1498721029000 },
      nextNotice: { no: '3002', title: '다음 공지사항 샘플 데이터 제목1', contentDesktop: '공지사항 모바일', publicationAt: 1498721029000 },
    }));
  });

  router.get(['/MyPage', '/MyPage/Index', '/MyPage/WowMyKolon'], (req, res) => {
    let path = 'MyPage/Index';
    // 모바일에는 별개의 페이지가 있고, 데탑에는 레이어 팝업으로 존재함
    if (req.originalUrl == '/MyPage/WowMyKolon') {
      path = 'MyPage/WowMyKolon';
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      myPage: {
        user: {
          isEmployee: true,
          name: '김달님',
          grade: 'gold',
        },
        point: {
          availablePoint: '2,200',
          unavailablePoint: '100',
          couponCount: 2,
          depositAmount: '2,000,000',
          employeePoint: {
            welfareLimitAmount: '1,000',
            employeeDcLimitAmount: '200,000',
            totalEmployeePoint: '201,000',
          },
        },
      },
      couponList: [
        {
          brandName: 'WOW MY KOLON 30%',
          code: 'CMPNOL_WOW00001',
          discountUnit: '%',
          description: '다른 쿠폰과 중복사용 불가',
          isEnabledDuplicate: true,
          useEndDate: '2999.12.31',
          type: null,
          extraType: '10',
          useStartDate: '2014.07.03',
          name: 'WOW MY KOLON 30%',
          discountValue: '30',
          discountDescription: null,
          discountString: '할인',
          limitAmt: '196,457,000',
          priceName: '판매가',
        },
      ],
    }));
  });

  router.get(['/Cart', '/Cart/Index'], (req, res) => {
    const path = 'Cart/Index';
    // const data = require('/models/cart/index.json'); : TODO - json 파일 읽어와서 데이터 읽게...
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, 
    {
      "hasGiftItems": false,
      "cartCount": "2",
      "siteFreeGiftItems": [],
      "cart": {
          "code": "C17071159177",
          "totalPrice": {
              "totalBasePrice": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "393,800",
                  "currencyIso": "KRW",
                  "price": 393800,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "deliveryCost": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "0",
                  "currencyIso": "KRW",
                  "price": 0,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "totalDiscounts": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "0",
                  "currencyIso": "KRW",
                  "price": 0,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "totalPointDiscounts": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "0",
                  "currencyIso": "KRW",
                  "price": 0,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "totalPrice": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "393,800",
                  "currencyIso": "KRW",
                  "price": 393800,
                  "wishPrice": null,
                  "formattedWishPrice": null
              }
          },
          "items": [
              {
                  "entryNumber": "1,0",
                  "orderType": "택배",
                  "quantity": 1,
                  "product": {
                      "supplierName": "CAMBRIDGE",
                      "code": "MFFBW15281NAV_JSET",
                      "representationImageForMobile": null,
                      "color": null,
                      "supplierBrandCode": null,
                      "deliveryType": "OWN",
                      "supplierCode": null,
                      "colorImages": null,
                      "url": "/c/%EB%B2%A0%EC%9D%B4%EC%A7%81-WOOL-%EC%88%98%ED%8A%B8/p/MFFBW15281NAV_JSET",
                      "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFBW15281NAV_JSET_LS1.jpg",
                      "supplierBrandName": null,
                      "size": null,
                      "price": null,
                      "productSaleType": "SET",
                      "productReferences": [
                          {
                              "supplierName": "CAMBRIDGE",
                              "code": "MFFCW15281NAV-101",
                              "representationImageForMobile": null,
                              "color": "네이비",
                              "supplierBrandCode": null,
                              "deliveryType": "OWN",
                              "supplierCode": null,
                              "colorImages": null,
                              "url": "/c/BASE-MFFCW15281/p/MFFCW15281NAV-101",
                              "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFCW15281NAV_LS1.jpg",
                              "supplierBrandName": null,
                              "size": "82",
                              "price": null,
                              "productSaleType": "GENERAL",
                              "productReferences": [],
                              "baseProductCode": "MFFCW15281NAV",
                              "name": "베이직 WOOL 수트 팬츠",
                              "soldOutYn": null,
                              "legacySize": null
                          },
                          {
                              "supplierName": "CAMBRIDGE",
                              "code": "MFFBW15281NAV-104",
                              "representationImageForMobile": null,
                              "color": "네이비",
                              "supplierBrandCode": null,
                              "deliveryType": "OWN",
                              "supplierCode": null,
                              "colorImages": null,
                              "url": "/c/BASE-MFFBW15281/p/MFFBW15281NAV-104",
                              "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFBW15281NAV_LS1.jpg",
                              "supplierBrandName": null,
                              "size": "588",
                              "price": null,
                              "productSaleType": "GENERAL",
                              "productReferences": [],
                              "baseProductCode": "MFFBW15281NAV",
                              "name": "베이직 WOOL 수트 자켓",
                              "soldOutYn": null,
                              "legacySize": null
                          }
                      ],
                      "baseProductCode": "MFFBW15281NAV_JSET",
                      "name": "베이직 WOOL 수트",
                      "soldOutYn": null,
                      "legacySize": null
                  },
                  "isAvailableStock": true,
                  "isAvailableEmployeeDiscount": false,
                  "totalRealPrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "370,000",
                      "currencyIso": "KRW",
                      "price": 370000,
                      "wishPrice": 0,
                      "formattedWishPrice": "0"
                  },
                  "totalBasePrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "370,000",
                      "currencyIso": "KRW",
                      "price": 370000,
                      "wishPrice": 0,
                      "formattedWishPrice": "0"
                  },
                  "totalWishPrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "740,000",
                      "currencyIso": "KRW",
                      "price": 740000,
                      "wishPrice": 0,
                      "formattedWishPrice": "0"
                  },
                  "totalEmployeeDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": 0,
                      "formattedWishPrice": "0"
                  },
                  "employeePrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "370,000",
                      "currencyIso": "KRW",
                      "price": 370000,
                      "wishPrice": 0,
                      "formattedWishPrice": "0"
                  },
                  "couponDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": 0,
                      "formattedWishPrice": "0"
                  },
                  "deliveryCost": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": 0,
                      "formattedWishPrice": "0"
                  },
                  "pickupInformation": null,
                  "isSetCartItem": true,
                  "cartItemReferences": [
                      {
                          "entryNumber": "1",
                          "orderType": "택배",
                          "quantity": 1,
                          "product": {
                              "supplierName": "CAMBRIDGE",
                              "code": "MFFCW15281NAV-101",
                              "representationImageForMobile": null,
                              "color": "네이비",
                              "supplierBrandCode": null,
                              "deliveryType": "OWN",
                              "supplierCode": null,
                              "colorImages": null,
                              "url": "/c/BASE-MFFCW15281/p/MFFCW15281NAV-101",
                              "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFCW15281NAV_LS1.jpg",
                              "supplierBrandName": null,
                              "size": "82",
                              "price": null,
                              "productSaleType": "GENERAL",
                              "productReferences": [],
                              "baseProductCode": "MFFCW15281NAV",
                              "name": "베이직 WOOL 수트 팬츠",
                              "soldOutYn": null,
                              "legacySize": null
                          },
                          "isAvailableStock": true,
                          "isAvailableEmployeeDiscount": false,
                          "totalRealPrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "135,000",
                              "currencyIso": "KRW",
                              "price": 135000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalBasePrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "135,000",
                              "currencyIso": "KRW",
                              "price": 135000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalWishPrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "270,000",
                              "currencyIso": "KRW",
                              "price": 270000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalEmployeeDiscounts": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalDiscounts": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "employeePrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "135,000",
                              "currencyIso": "KRW",
                              "price": 135000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "couponDiscounts": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "deliveryCost": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "pickupInformation": null,
                          "isSetCartItem": false,
                          "cartItemReferences": null,
                          "isPickupItem": false
                      },
                      {
                          "entryNumber": "0",
                          "orderType": "택배",
                          "quantity": 1,
                          "product": {
                              "supplierName": "CAMBRIDGE",
                              "code": "MFFBW15281NAV-104",
                              "representationImageForMobile": null,
                              "color": "네이비",
                              "supplierBrandCode": null,
                              "deliveryType": "OWN",
                              "supplierCode": null,
                              "colorImages": null,
                              "url": "/c/BASE-MFFBW15281/p/MFFBW15281NAV-104",
                              "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFBW15281NAV_LS1.jpg",
                              "supplierBrandName": null,
                              "size": "588",
                              "price": null,
                              "productSaleType": "GENERAL",
                              "productReferences": [],
                              "baseProductCode": "MFFBW15281NAV",
                              "name": "베이직 WOOL 수트 자켓",
                              "soldOutYn": null,
                              "legacySize": null
                          },
                          "isAvailableStock": true,
                          "isAvailableEmployeeDiscount": false,
                          "totalRealPrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "235,000",
                              "currencyIso": "KRW",
                              "price": 235000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalBasePrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "235,000",
                              "currencyIso": "KRW",
                              "price": 235000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalWishPrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "470,000",
                              "currencyIso": "KRW",
                              "price": 470000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalEmployeeDiscounts": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "totalDiscounts": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "employeePrice": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "235,000",
                              "currencyIso": "KRW",
                              "price": 235000,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "couponDiscounts": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "deliveryCost": {
                              "discountRate": null,
                              "symbol": "원",
                              "formattedPrice": "0",
                              "currencyIso": "KRW",
                              "price": 0,
                              "wishPrice": null,
                              "formattedWishPrice": null
                          },
                          "pickupInformation": null,
                          "isSetCartItem": false,
                          "cartItemReferences": null,
                          "isPickupItem": false
                      }
                  ],
                  "isPickupItem": false
              },
              {
                  "entryNumber": "2",
                  "orderType": "택배",
                  "quantity": 1,
                  "product": {
                      "supplierName": "STONEFEATHER",
                      "code": "FNTCA15311WHX-101",
                      "representationImageForMobile": null,
                      "color": "화이트",
                      "supplierBrandCode": null,
                      "deliveryType": "OWN",
                      "supplierCode": null,
                      "colorImages": null,
                      "url": "/c/BASE-FNTCA15311/p/FNTCA15311WHX-101",
                      "representationImage": "http://kopimages.kolon.com/Prod_Img/SF/2015/LS1/FNTCA15311WHX_LS1.jpg",
                      "supplierBrandName": null,
                      "size": "M",
                      "price": null,
                      "productSaleType": "GENERAL",
                      "productReferences": [],
                      "baseProductCode": "FNTCA15311WHX",
                      "name": "Unisex Graphic Crewneck T-shirt",
                      "soldOutYn": null,
                      "legacySize": null
                  },
                  "isAvailableStock": true,
                  "isAvailableEmployeeDiscount": false,
                  "totalRealPrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "23,800",
                      "currencyIso": "KRW",
                      "price": 23800,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalBasePrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "23,800",
                      "currencyIso": "KRW",
                      "price": 23800,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalWishPrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "34,000",
                      "currencyIso": "KRW",
                      "price": 34000,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalEmployeeDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "employeePrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "23,800",
                      "currencyIso": "KRW",
                      "price": 23800,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "couponDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "deliveryCost": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "pickupInformation": null,
                  "isSetCartItem": false,
                  "cartItemReferences": null,
                  "isPickupItem": false
              }
          ]
      },
      "siteFirstFreeGiftItems": []
      }
    ));
  });

  router.get(['/Category/List', '/Category/List/:categoryCode'], (req, res) => {
    const path = 'Category/List';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req,
      {
        "subCategory": {
            "name": "비지니스 정장",
            "id": "4729",
            "lastModified": null,
            "url": "/Category/List/4729",
            "totalNumber": 6605,
            "image": {
                "index": null,
                "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
            },
            "numberOfPages": null,
            "level": "B",
            "bestCategoryYn": false,
            "pageSize": null,
            "description": "일반>MEN>비지니스 정장",
            "logo": {
                "index": null,
                "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
            },
            "currentPage": null,
            "subcategories": [
                {
                    "name": "전체보기",
                    "id": "4729",
                    "lastModified": null,
                    "url": "/Category/List/4729",
                    "totalNumber": null,
                    "image": null,
                    "numberOfPages": null,
                    "level": null,
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": null,
                    "logo": null,
                    "currentPage": null,
                    "subcategories": null,
                    "gubun": null
                },
                {
                    "name": "원버튼수트",
                    "id": "4730",
                    "lastModified": null,
                    "url": "/Category/List/4730",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>원버튼수트",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "수트",
                    "id": "4731",
                    "lastModified": null,
                    "url": "/Category/List/4731",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>수트",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "코트",
                    "id": "4734",
                    "lastModified": null,
                    "url": "/Category/List/4734",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>코트",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "자켓",
                    "id": "4732",
                    "lastModified": null,
                    "url": "/Category/List/4732",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>자켓",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "니트/가디건",
                    "id": "4735",
                    "lastModified": null,
                    "url": "/Category/List/4735",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>니트/가디건",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "드레스셔츠",
                    "id": "4736",
                    "lastModified": null,
                    "url": "/Category/List/4736",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>드레스셔츠",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "티셔츠",
                    "id": "4737",
                    "lastModified": null,
                    "url": "/Category/List/4737",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>티셔츠",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "팬츠",
                    "id": "4738",
                    "lastModified": null,
                    "url": "/Category/List/4738",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "C",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장>팬츠",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                }
            ],
            "gubun": "10"
        },
        "selectedSubCategory": {
            "name": "비지니스 정장",
            "id": "4729",
            "lastModified": null,
            "url": null,
            "totalNumber": null,
            "image": null,
            "numberOfPages": null,
            "level": null,
            "bestCategoryYn": null,
            "pageSize": null,
            "description": null,
            "logo": null,
            "currentPage": null,
            "subcategories": null,
            "gubun": null
        },
        "selectedCategory": {
            "name": "비지니스 정장",
            "id": "4729",
            "lastModified": null,
            "url": null,
            "totalNumber": null,
            "image": null,
            "numberOfPages": null,
            "level": null,
            "bestCategoryYn": null,
            "pageSize": null,
            "description": null,
            "logo": null,
            "currentPage": null,
            "subcategories": null,
            "gubun": null
        },
        "category": {
            "name": "MEN",
            "id": "4608",
            "lastModified": null,
            "url": "/Category/4608",
            "totalNumber": 42628,
            "image": {
                "index": null,
                "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
            },
            "numberOfPages": null,
            "level": "A",
            "bestCategoryYn": true,
            "pageSize": null,
            "description": "일반>MEN",
            "logo": {
                "index": null,
                "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
            },
            "currentPage": null,
            "subcategories": [
                {
                    "name": "전체보기",
                    "id": "4608",
                    "lastModified": null,
                    "url": "/Category/List/4608",
                    "totalNumber": null,
                    "image": null,
                    "numberOfPages": null,
                    "level": null,
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": null,
                    "logo": null,
                    "currentPage": null,
                    "subcategories": null,
                    "gubun": null
                },
                {
                    "name": "비지니스 정장",
                    "id": "4729",
                    "lastModified": null,
                    "url": "/Category/List/4729",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "B",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 정장",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "비지니스 캐쥬얼",
                    "id": "4739",
                    "lastModified": null,
                    "url": "/Category/List/4739",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "B",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>비지니스 캐쥬얼",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "캐릭터 캐쥬얼",
                    "id": "4749",
                    "lastModified": null,
                    "url": "/Category/List/4749",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "B",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>캐릭터 캐쥬얼",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "가방&액세서리",
                    "id": "4759",
                    "lastModified": null,
                    "url": "/Category/List/4759",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "B",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>가방&액세서리",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                },
                {
                    "name": "슈즈",
                    "id": "4766",
                    "lastModified": null,
                    "url": "/Category/List/4766",
                    "totalNumber": null,
                    "image": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/ctg-brand01.jpg"
                    },
                    "numberOfPages": null,
                    "level": "B",
                    "bestCategoryYn": null,
                    "pageSize": null,
                    "description": "일반>MEN>슈즈",
                    "logo": {
                        "index": null,
                        "url": "https://koppub.purple.io/_ui/img/m/temp/brand-kolon.png"
                    },
                    "currentPage": null,
                    "subcategories": [],
                    "gubun": "10"
                }
            ],
            "gubun": "10"
        },
        "parameters": {
            "currentPage": 0,
            "pageSize": 20,
            "category": "4729",
            "sizes": null,
            "colors": null,
            "suppliers": null,
            "priceRanges": null,
            "sort": null,
            "onSale": null,
            "excludeProductCodes": null,
            "best": null,
            "new": null
        },
        "sorts": [
            {
                "code": "approval-desc",
                "name": "신상품순"
            },
            {
                "code": "best-desc",
                "name": "판매인기순"
            },
            {
                "code": "comment-desc",
                "name": "상품평순"
            },
            {
                "code": "price-desc",
                "name": "높은가격순"
            },
            {
                "code": "price-asc",
                "name": "낮은가격순"
            }
        ],
        "priceValueRanges": [
          {
              "code": "0-99999",
              "name": "10만원 미만"
          },
          {
              "code": "100000-199999",
              "name": "10만원 ~ 20만원 미만"
          },
          {
              "code": "200000-299999",
              "name": "30만원 ~ 30만원 미만"
          },
          {
              "code": "300000-399999",
              "name": "30만원 ~ 40만원 미만"
          },
          {
              "code": "400000-499999",
              "name": "400000-499999"
          },
          {
              "code": "500000-30000000",
              "name": "500000-30000000"
          }
        ],
        "swatchColors": [
          {
              "code": "WHITE",
              "name": "WHITE",
              "rgbcode": "FFFFFF"
          },
          {
              "code": "PINK",
              "name": "PINK",
              "rgbcode": "FFC0CB"
          },
          {
              "code": "BLUE",
              "name": "BLUE",
              "rgbcode": "0000FF"
          },
          {
              "code": "GREEN",
              "name": "GREEN",
              "rgbcode": "008000"
          },
          {
              "code": "GREY",
              "name": "GREY",
              "rgbcode": "808080"
          },
          {
              "code": "BLACK",
              "name": "BLACK",
              "rgbcode": "000000"
          },
          {
              "code": "PURPLE",
              "name": "PURPLE",
              "rgbcode": "800080"
          },
          {
              "code": "NAVY",
              "name": "NAVY",
              "rgbcode": ""
          },
          {
              "code": "RED",
              "name": "RED",
              "rgbcode": "FF0000"
          }
      ]
    }));
  });

  router.get(['/Category/Index', '/Category/:categoryCode'], (req, res) => {
    const path = 'Category/Index';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      category: {
        id: '4607',
        name: 'SPORTS',
        selectedCategory: {
          id: '4607',
        },
        subcategories: [
          {
            id: '4607',
            url: '/Category/4607',
            name: '전체',
          },
          {
            id: '4612',
            url: '/Category/List/4612',
            name: '아웃도어&등산',
          },
          {
            id: '4651',
            url: '/Category/List/4651',
            name: '골프',
          },
          {
            id: '4675',
            url: '/Category/List/4675',
            name: '스포츠&레져',
          },
          {
            id: '5672',
            url: '/Category/List/5672',
            name: '사이클링웨어',
          },
          {
            id: '4706',
            url: '/Category/List/4706',
            name: '시즌스포츠',
          },
        ],
      },
    }));
  });

  router.get(['/Review/List', '/Review/RegisteredList', '/Review/UnregisteredList'], (req, res) => {
    let path = 'Review/List';
    if (req.mobileViewMode) {
      path = 'Review/List';
    } else {
      if (req.originalUrl == '/Review/RegisteredList') {
        path = 'Review/RegisteredList';
      } else if (req.originalUrl == '/Review/UnregisteredList') {
        path = 'Review/UnregisteredList';
      }
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
    "baseMsgs": [
        "가격대비 괜찮습니다.",
        "빠른 배송으로 잘 받았어요.",
        "디자인이 마음에 들어요.",
        "재구매할 생각입니다.",
        "사진하고 똑같고 좋습니다.",
        "품질이 훌륭하네요. 추천합니다."
    ],
    "reviews": {
        "reviewData": {
            "page": {
                "totalCount": 2,
                "currentPage": 0,
                "perPage": 10
            },
            "results": [
                {
                    "ratingView": "<a href='#' class='on'>★</a><a href='#' class='on'>★</a><a href='#' class='on'>★</a><a href='#' class='on'>★</a><a href='#' class='on'>★</a>",
                    "date": "2016.10.04",
                    "product": {
                        "supplierName": "KOLONSPORT",
                        "code": "JWJJX16021NAM",
                        "representationImageForMobile": null,
                        "color": "네오 앰버",
                        "deliveryType": null,
                        "productBrandName": null,
                        "supplierCode": "KS",
                        "colorImages": null,
                        "url": null,
                        "representationImage": "http://kopimages.kolon.com/Prod_Img/KS/2016/AT1/JWJJX16021NAM_AT1.jpg",
                        "size": null,
                        "price": {
                            "discountRate": 0,
                            "symbol": "원",
                            "formattedPrice": "140,000",
                            "currencyIso": "KRW",
                            "price": 140000,
                            "wishPrice": 140000,
                            "formattedWishPrice": "140,000"
                        },
                        "productSaleType": "GENERAL",
                        "productReferences": [],
                        "baseProductCode": "BASE_JWJJX16021BLU",
                        "name": "남성 익스페디션 HERO 배색 경량 자켓",
                        "soldOutYn": null,
                        "legacySize": null
                    },
                    "commentSeq": 304803,
                    "imageFiles": [],
                    "imageURL": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images",
                    "rating": 5,
                    "comment": "디자인이\r\n마음에 들어요",
                    "headline": "좋아요"
                },
                {
                    "ratingView": "<a href='#' class='on'>★</a><a href='#' class='on'>★</a><a href='#' class='on'>★</a><a href='#' class='on'>★</a><a href='#' class='on'>★</a>",
                    "date": "2016.09.13",
                    "product": {
                        "supplierName": "GGIO2",
                        "code": "AEAAX16996BRX",
                        "representationImageForMobile": null,
                        "color": "스니커즈",
                        "deliveryType": null,
                        "productBrandName": null,
                        "supplierCode": "GO",
                        "colorImages": null,
                        "url": null,
                        "representationImage": "http://kopimages.kolon.com/Prod_Img/GO/2016/AT1/AEAAX16996BRX_AT1.jpg",
                        "size": null,
                        "price": {
                            "discountRate": 50,
                            "symbol": "원",
                            "formattedPrice": "75,000",
                            "currencyIso": "KRW",
                            "price": 75000,
                            "wishPrice": 150000,
                            "formattedWishPrice": "150,000"
                        },
                        "productSaleType": "GENERAL",
                        "productReferences": [],
                        "baseProductCode": "BASE_AEAAX16994",
                        "name": "[IMAC] 컬러 배색 캐주얼 스니커즈",
                        "soldOutYn": null,
                        "legacySize": null
                    },
                    "commentSeq": 303118,
                    "imageFiles": [],
                    "imageURL": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images",
                    "rating": 5,
                    "comment": "디자인이 마음에 들어요.",
                    "headline": "좋아요"
                }
            ]
        },
        "unregisteredCount": 0,
        "type": "R",
        "registeredCount": 2
    }
    }));
  });

  router.get(['/Review/Add', '/Review/:productCode/Add'], (req, res) => {
    const path = 'Review/Add';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req));
  });

  router.get(['/Event', '/Event/Index'], (req, res) => {
    const path = 'Event/Index';
    const json = {};
    if (req.mobileViewMode) {
      json.eventList = {"page":{"totalCount":2,"currentPage":1,"perPage":20},"results":[{"no":"1001","title":"MEN \u0026 WOMEN OUTLET SALE","subtitle":"부제목","imageInfo":{"tag": "SPECIAL\nPRICE","bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/special-fb571546-ea38-4b96-97f8-bbe34806d150.jpg","brand1": "SUCOMMABONNIE","title": "뉴 핑크 FLOWER\nBOMB SLIP-ON","subtitle": "슈꼼마보니 핑크아이템 5%\n할인 쿠폰"},"eventAt":{"start":1499180404615,"end":1499914800000}},{"no":"1","title":"모바일 제목","subtitle":"부제목","imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499094035036,"end":1500692400000}}]};
      json.todayDate = new Date().getTime();
    } else {
      json.eventList = {"page":{"totalCount":2,"currentPage":1,"perPage":20},"results":[{"no":"1001","title":"MEN \u0026 WOMEN OUTLET SALE","subtitle":"15만원이상 구매시 20% 구매혜택","imageInfo":{"tag": "SPECIAL\nPRICE","bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/special-fb571546-ea38-4b96-97f8-bbe34806d150.jpg","brand1": "SUCOMMABONNIE","title": "뉴 핑크 FLOWER\nBOMB SLIP-ON","subtitle": "슈꼼마보니 핑크아이템 5%\n할인 쿠폰"},"eventAt":{"start":1499180404615,"end":1499914800000}},{"no":"1","title":"데스크탑 제목","subtitle":"데스크탑 부제목","imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499094035036,"end":1500692400000}}]};
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, json));
  });

  router.get('/Event/ListJson', (req, res) => {
    const json = {"page":{"totalCount":22,"currentPage":2,"perPage":20},"results":[{"no":"1001","title":"MEN \u0026 WOMEN OUTLET SALE","subtitle":"부제목", "imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499180404615,"end":1499914800000}},{"no":"1","title":"모바일 제목","subtitle":"부제목","imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499094035036,"end":1500692400000}}]};
    res.json(json);
  });

  router.get('/Event/:no', (req, res) => {
    const path = 'Event/Detail';
    const json = {};
    if (req.mobileViewMode) {
      json.eventList = {"page":{"totalCount":2,"currentPage":1,"perPage":20},"results":[{"no":"1001","title":"MEN \u0026 WOMEN OUTLET SALE","subtitle":"부제목", "imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499180404615,"end":1499914800000}},{"no":"1","title":"모바일 제목","subtitle":"부제목","imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499094035036,"end":1500692400000}}]};
      json.eventDetail = {"no":"1001","title":"MEN \u0026 WOMEN OUTLET SALE","content":"\u003cstyle\u003e\n.event-image {\n  width: 100%;\n}\n\u003c/style\u003e\n\u003cp\u003e\n\u003cimg class\u003d\"event-image\" src\u003d\"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/event_content_1-ad443738-10f0-489e-85bb-d2ea67617f9a.png\" data-filename\u003d\"event_content_1.png\"\u003e\n\u003c/p\u003e\n\u003cp\u003e모바일 이벤트\u003c/p\u003e","eventAt":{"start":1499094035036,"end":1500692400000}};
    } else {
      json.eventList = {"page":{"totalCount":2,"currentPage":1,"perPage":20},"results":[{"no":"1001","title":"MEN \u0026 WOMEN OUTLET SALE","subtitle":"15만원이상 구매시 20% 구매혜택","imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499180404615,"end":1499914800000}},{"no":"1","title":"데스크탑 제목","subtitle":"데스크탑 부제목","imageInfo":{"bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/3_2-4d2e4c6f-f5cd-45f7-9145-817e9d2d96a8.jpg"},"eventAt":{"start":1499094035036,"end":1500692400000}}]};
      json.eventDetail = {"no":"1001","title":"MEN \u0026 WOMEN OUTLET SALE","content":"\u003cstyle\u003e\n.event-image {\n width: 100%;\n}\n\u003c/style\u003e\n\u003cp\u003e\n\u003cimg class\u003d\"event-image\" src\u003d\"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/event_content_1-ad443738-10f0-489e-85bb-d2ea67617f9a.png\" data-filename\u003d\"event_content_1.png\"\u003e\n\u003c/p\u003e\n\u003cp\u003e데스크탑 이벤트\u003c/p\u003e","eventAt":{"start":1499094035036,"end":1500692400000}};
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, json));
  });

  router.get(['/Special', '/Special/Index'], (req, res) => {
    const path = 'Special/Index';
    const json = {};
    if (req.mobileViewMode) {
      json.specialList = {"page":{"totalCount":22,"currentPage":1,"perPage":20},"results":[{"no":"4001","brandList":[{"code":"SE","name":"SERIES"}],"link":"/Special/1","title":"시리즈 기획전","imageInfo":{"tag": "SPECIAL\nPRICE","bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/special-fb571546-ea38-4b96-97f8-bbe34806d150.jpg","brand1": "SUCOMMABONNIE","brand2": "KOLON","title": "뉴 핑크 FLOWER\nBOMB SLIP-ON", "subtitle": "슈꼼마보니 핑크아이템 5%\n할인 쿠폰"},"specialAt":{"start":1498878000000,"end":1501470000000}},{"no":"3001","brandList":[{"code":"SE","name":"SERIES"},{"code":"EP","name":"EPIGRAM"}],"title":"11","imageInfo":{"tag":"ONLINE\nONLY","bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/20170703_event-b94d20cd-32ed-425c-9c74-e8b4258a203c.jpg","topTitle":"22","middleTitle":"3","bottomTitle":"5"},"specialAt":{"start":1499223600000,"end":1499310000000}},{"no":"2001","brandList":[{"code":"KS","name":"KOLON SPORT"},{"code":"EP","name":"EPIGRAM"}],"title":"wefewf","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/-6ece0e7b-6115-458a-a367-6fe19d73d6c8.png","topTitle":"wefwef","middleTitle":"wef","bottomTitle":"wef"},"specialAt":{"start":1500001200000,"end":1503457200000}}]};
      json.todayDate = new Date().getTime();
    } else {
      json.specialList = {"page":{"totalCount":22,"currentPage":1,"perPage":20},"results":[{"no":"4001","brandList":[{"code":"SE","name":"SERIES"}],"link":"/Special/1","title":"시리즈 기획전","desktopSubTitle":"서브 타이틀","imageInfo":{"tag": "SPECIAL\nPRICE","bgImage": "https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/banner/2017/07/special-fb571546-ea38-4b96-97f8-bbe34806d150.jpg","brand1": "SUCOMMABONNIE","title": "뉴 핑크 FLOWER\nBOMB SLIP-ON","subtitle": "슈꼼마보니 핑크아이템 5%\n할인 쿠폰"},"specialAt":{"start":1498878000000,"end":1501470000000}},{"no":"3001","brandList":[{"code":"SE","name":"SERIES"},{"code":"EP","name":"EPIGRAM"}],"title":"데스크탑","desktopSubTitle":"서브타이틀","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/milla-0fac0d64-a665-433c-bafc-62520e7a11a4.jpg","topTitle":"2","middleTitle":"4","bottomTitle":"6"},"specialAt":{"start":1499223600000,"end":1499310000000}},{"no":"2001","brandList":[{"code":"KS","name":"KOLON SPORT"},{"code":"EP","name":"EPIGRAM"}],"title":"wef","desktopSubTitle":"wefwef","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/-2cc8a0b3-f12b-40dd-a583-33e22d42c443.png","topTitle":"wef","middleTitle":"wef","bottomTitle":"wef"},"specialAt":{"start":1500001200000,"end":1503457200000}}]};
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, json));
  });

  router.get('/Special/ListJson', (req, res) => {
      const json = {"page":{"totalCount":22,"currentPage":1,"perPage":20},"results":[{"no":"4001","brandList":[{"code":"SE","name":"SERIES"}],"title":"시리즈 기획전","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/special-main-1-1507079b-e2c2-49d9-9028-0cb747a76cbe.jpg","middleTitle":"","bottomTitle":""},"specialAt":{"start":1498878000000,"end":1501470000000}},{"no":"3001","brandList":[{"code":"SE","name":"SERIES"},{"code":"EP","name":"EPIGRAM"}],"title":"11","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/20170703_event-b94d20cd-32ed-425c-9c74-e8b4258a203c.jpg","topTitle":"22","middleTitle":"3","bottomTitle":"5"},"specialAt":{"start":1499223600000,"end":1499310000000}},{"no":"2001","brandList":[{"code":"KS","name":"KOLON SPORT"},{"code":"EP","name":"EPIGRAM"}],"title":"wefewf","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/-6ece0e7b-6115-458a-a367-6fe19d73d6c8.png","topTitle":"wefwef","middleTitle":"wef","bottomTitle":"wef"},"specialAt":{"start":1500001200000,"end":1503457200000}}]};
    res.json(json);
  });

  router.get('/Special/:no', (req, res) => {
    const path = 'Special/Detail';
    const json = {};
    if (req.mobileViewMode) {
      json.specialList = {"page":{"totalCount":22,"currentPage":2,"perPage":20},"results":[{"no":"4001","brandList":[{"code":"SE","name":"SERIES"}],"title":"시리즈 기획전","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/special-main-1-1507079b-e2c2-49d9-9028-0cb747a76cbe.jpg","middleTitle":"","bottomTitle":""},"specialAt":{"start":1498878000000,"end":1501470000000}},{"no":"3001","brandList":[{"code":"SE","name":"SERIES"},{"code":"EP","name":"EPIGRAM"}],"title":"11","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/20170703_event-b94d20cd-32ed-425c-9c74-e8b4258a203c.jpg","topTitle":"22","middleTitle":"3","bottomTitle":"5"},"specialAt":{"start":1499223600000,"end":1499310000000}},{"no":"2001","brandList":[{"code":"KS","name":"KOLON SPORT"},{"code":"EP","name":"EPIGRAM"}],"title":"wefewf","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/-6ece0e7b-6115-458a-a367-6fe19d73d6c8.png","topTitle":"wefwef","middleTitle":"wef","bottomTitle":"wef"},"specialAt":{"start":1500001200000,"end":1503457200000}}]};
      json.specialDetail = {"no":"4001","brandList":[{"code":"SE","name":"SERIES"}],"title":"시리즈 기획전","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/special-main-1-1507079b-e2c2-49d9-9028-0cb747a76cbe.jpg","middleTitle":"","bottomTitle":""},"specialAt":{"start":1498878000000,"end":1501470000000},"content":"\u003cp\u003e\u003cimg src\u003d\"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/special-detail-1-87ec95c6-6998-4941-affb-52ec10b9cb0d.jpg\" data-filename\u003d\"special-detail-1.jpg\" style\u003d\"width: 460px;\"\u003e\u003cbr\u003e\u003c/p\u003e","productList":[{"title":"PRODUCTS","products":["BASE_1007"]},{"title":"PRODUCTS2","products":["SOWAW16402BRX"]}]};
    } else {
      json.specialList = {"page":{"totalCount":3,"currentPage":1,"perPage":20},"results":[{"no":"4001","brandList":[{"code":"SE","name":"SERIES"}],"title":"시리즈 기획전","desktopSubTitle":"서브 타이틀","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/special-desktop-main-1-b4f8bebf-43dc-4798-aac5-820c77566f31.jpg","tag":"ONLINE\nONLY","title":"SERIES\n2017 NEW ARRIVALS","subtitle":"가볍게 코디하기 좋은 2017 신상셔츠"},"specialAt":{"start":1498878000000,"end":1501470000000}},{"no":"3001","brandList":[{"code":"SE","name":"SERIES"},{"code":"EP","name":"EPIGRAM"}],"title":"데스크탑","desktopSubTitle":"서브타이틀","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/milla-0fac0d64-a665-433c-bafc-62520e7a11a4.jpg","tag":"2","title":"4","subTitle":"6"},"specialAt":{"start":1499223600000,"end":1499310000000}},{"no":"2001","brandList":[{"code":"KS","name":"KOLON SPORT"},{"code":"EP","name":"EPIGRAM"}],"title":"wef","desktopSubTitle":"wefwef","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/-2cc8a0b3-f12b-40dd-a583-33e22d42c443.png","topTitle":"wef","middleTitle":"wef","bottomTitle":"wef"},"specialAt":{"start":1500001200000,"end":1503457200000}}]};
      json.specialDetail = {"no":"4001","brandList":[{"code":"SE","name":"SERIES"}],"title":"시리즈 기획전","imageInfo":{"bgImage":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/special/2017/07/special-desktop-main-1-b4f8bebf-43dc-4798-aac5-820c77566f31.jpg","topTitle":"ONLINE\nONLY","middleTitle":"SERIES\n2017 NEW ARRIVALS","bottomTitle":"가볍게 코디하기 좋은 2017 신상셔츠"},"specialAt":{"start":1498878000000,"end":1501470000000},"content":"\u003cp\u003e\u003cimg src\u003d\"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/special-desktop-detail-1-5f18f98a-b572-4dfa-92f0-749950cbfedb.jpg\" data-filename\u003d\"special-desktop-detail-1.jpg\" style\u003d\"width: 460px;\"\u003e\u003cbr\u003e\u003c/p\u003e","productList":[{"title":"PRODUCTS","products":["BASE_1007"]},{"title":"PRODUCTS2","products":["SOWAW16402BRX"]}]};
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, json));
  });
  
  router.get(['/Brand/List', '/Brand/List/:categoryCode'], (req, res) => {
    const path = 'Brand/List';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      category: {
        id: '4607',
        name: 'HEAD',
        selectedCategory: {
          id: '4940',
        },
        subcategories: [
          { id: '4940', url: '/Brand/4940', name: '전체' },
          { id: '4959', url: '/Brand/List/4959', name: '남성의류' },
          { id: '4960', url: '/Brand/List/4960', name: '여성의류' },
          { id: '4961', url: '/Brand/List/4961', name: '스포츠화' },
          { id: '4962', url: '/Brand/List/4962', name: '가방' },
          { id: '4963', url: '/Brand/List/4963', name: '액세서리' },
          { id: '4964', url: '/Brand/List/4964', name: '키즈' },
          { id: '4965', url: '/Brand/List/4965', name: '시즌스포츠' },
          { id: '5667', url: '/Brand/List/5667', name: 'BE_AT(바이크 라인)' },
          { id: '133020000045', url: '/Brand/List/133020000045', name: '온라인 단독' },
        ],
      },
    }));
  });

  router.get(['/Brand/Intro', '/Brand/:categoryCode/Intro'], (req, res) => {
    const path = 'Brand/Intro';
    const json = {};
    if (req.mobileViewMode) {
      json.brandIntro = {"content":"\u003cdiv class\u003d\"b-top\"\u003e\n\u003ch3\u003eURBAN VINTAGE\u003cbr\u003eMULTI-BRAND SHOP\u003c/h3\u003e\n\u003c/div\u003e\n\u003cdiv class\u003d\"b-img\"\u003e\n\u003cimg src\u003d\"/_ui/img/m/temp/brand-intro.jpg\" alt\u003d\"\"\u003e\n\u003c/div\u003e\n\u003cdiv class\u003d\"b-disc\"\u003e\n\u003cp\u003ebyseries;는 다양한 라이프 스타일과 합리적인 가치의 브랜드들을 편집 구성하여 제안하는 Urban vintage multi-brand shop입니다.\u003c/p\u003e\n\u003cp\u003e\n적극적으로 자신을 표현하며 자신만의 가치를 부여하는 도시남성패션 리더층에 어울리는 패션을 제시합니다.\u003cbr\u003ebyseries;에서는 국내 브랜드인 시리즈를 비롯하여 시그 니처 아이템, 이태리, 스페인, 미국, 프랑스 등 전세계의 다 양한 수입브랜드 및 국내 신진 디자이너 브랜드 등을 만날 수 있습니다.\n\u003c/p\u003e\n\u003cp\u003e개성있는 캐릭터와 자유롭고 편안한 감성의 캐주얼을 추구하며, Mix \u0026amp; Match를 통해 새로운 감각의 스타일링을 제안합니다.\u003c/p\u003e\n\u003c/div\u003e\n","collection":[{"imagePath":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/collection-6931eecb-fc30-4e1f-9a6a-687270a2fab2.jpg","title":"www.byseries.com","link":"http://www.byseries.com/featured/magazine_view.html?magazine_dtl_id\u003d11515"}]};
    } else {
      json.brandIntro = {"content":"\u003c!-- visual --\u003e\n\u003cdiv class\u003d\"visual\"\u003e\n\u003cimg src\u003d\"/_ui/img/pc/temp/@brand-intro.jpg\" alt\u003d\"\"\u003e\n\u003c/div\u003e\n\u003c!-- // visual --\u003e\n\n\u003c!-- info --\u003e\n\u003cdiv class\u003d\"info\"\u003e\n\u003ch3 class\u003d\"tit\"\u003eURBAN VINTAGE\u003cbr\u003eMULTI-BRAND SHOP\u003c/h3\u003e\n\u003cdiv class\u003d\"txt\"\u003e\n\u003cp\u003e\nByseries;는 다양한 라이프 스타일과 합리적인 가치의 브랜들을 편집 구성하여\u003cbr\u003e\n제안하는 Urban vintage multi-brand shop입니다.\n\u003c/p\u003e\n\u003cp\u003e\n적극적으로 자신을 표현하며 자신만의 가치를 부여하는 도시남성패션 리더층에\u003cbr\u003e\n어울리는 패션을 제시합니다. byseries;에서는 국내 브랜드인 시리즈를 비롯하여\u003cbr\u003e\n시그 니처 아이템, 이태리, 스페인, 미국, 프랑스 등 전세계의 다양한 수입브랜드 및\u003cbr\u003e\n국내 신진 디자이너 브랜드 등을 만날 수 있습니다.\n\u003c/p\u003e\n\u003cp\u003e\n개성있는 캐릭터와 자유롭고 편안한 감성의 캐주얼을 추구하며, Mix \u0026amp; Match를\u003cbr\u003e\n통해 새로운 감각의 스타일링을 제안합니다.\n\u003c/p\u003e\n\u003c/div\u003e\n\u003c/div\u003e\n\u003c!-- // info --\u003e\n","collection":[{"imagePath":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/collection-6931eecb-fc30-4e1f-9a6a-687270a2fab2.jpg","title":"www.byseries.com","link":"http://www.byseries.com/featured/magazine_view.html?magazine_dtl_id\u003d11515"}]};
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, json));
  });

  router.get('/Brand/SpecFilter', (req, res) => {
    const path = 'Brand/SpecFilter';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req));
  });

  router.get('/Brand/brandFilter', (req, res) => {
    const path = 'Brand/brandFilter';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req));
  });

  router.get('/Brand/IndexNew', (req, res) => {
      const path = 'Brand/IndexNew';
      res.render(getViewPath(path, req.mobileViewMode), toJson(path, req));
  });

  router.get('/Brand/IndexNew2', (req, res) => {
      const path = 'Brand/IndexNew2';
      res.render(getViewPath(path, req.mobileViewMode), toJson(path, req));
  });

  router.get(['/Brand/:categoryCode', '/Brand/Index', '/Brand/:categoryCode/Index'], (req, res) => {
    const path = 'Brand/Index';
    const json = {
      category: {
        id: '4607',
        name: 'HEAD',
        selectedCategory: {
          id: '4940',
        },
        subcategories: [
          { id: '4940', url: '/Brand/4940', name: '전체' },
          { id: '4959', url: '/Brand/List/4959', name: '남성의류' },
          { id: '4960', url: '/Brand/List/4960', name: '여성의류' },
          { id: '4961', url: '/Brand/List/4961', name: '스포츠화' },
          { id: '4962', url: '/Brand/List/4962', name: '가방' },
          { id: '4963', url: '/Brand/List/4963', name: '액세서리' },
          { id: '4964', url: '/Brand/List/4964', name: '키즈' },
          { id: '4965', url: '/Brand/List/4965', name: '시즌스포츠' },
          { id: '5667', url: '/Brand/List/5667', name: 'BE_AT(바이크 라인)' },
          { id: '133020000045', url: '/Brand/List/133020000045', name: '온라인 단독' },
        ],
      },
    };
    if (req.mobileViewMode) {
      json.brandMain = [{"imagePath":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/brand/2017/07/brand_mobile-0b69b66b-4298-4fa6-b322-442522173303.jpg","title":"URBAN VINTAGE\nMULTI-BRAND\nSHOP"}];
    } else {
      json.brandMain = [{"imagePath":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/brand_desktop-7f44951b-3234-4608-871c-8066e0670498.jpg"}, {"imagePath":"https://s3-ap-northeast-2.amazonaws.com/kop.dev.images/cms/common/2017/07/brand_desktop-7f44951b-3234-4608-871c-8066e0670498.jpg"}];
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, json));
  });

  router.get(['/Point/List', '/Point'], (req, res) => {
    const path = 'Point/List';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      point: {
        availablePoint: '20,000',
        unavailablePoint: '1,000',
        expiringPoint: '300',
      },
    }));
  });

  router.get(['/Point/History'], (req, res) => {
    if (req.query.pageNumber == 1) {
      res.json(
        {
          page: {
            totalCount: 12,
            currentPage: 1,
            perPage: 10,
          },
          results: [
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '0',
              createdDate: '2017.06.07',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '46080',
              createdDate: '2017.06.07',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '0',
              createdDate: '2017.06.07',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '-39760',
              createdDate: '2017.06.02',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '-39760',
              createdDate: '2017.06.02',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '0',
              createdDate: '2017.06.02',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '119300',
              createdDate: '2017.06.02',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '0',
              createdDate: '2017.06.02',
              productCode: null,
              accumulatedPoint: '0',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '-56050',
              createdDate: '2017.05.19',
              productCode: null,
              accumulatedPoint: '-2800',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '-56050',
              createdDate: '2017.05.18',
              productCode: null,
              accumulatedPoint: '-3000',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
          ],
        },
      );
    } else if (req.query.pageNumber == 2) {
      res.json(
        {
          page: {
            totalCount: 12,
            currentPage: 2,
            perPage: 10,
          },
          results: [
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '-56050',
              createdDate: '2017.05.17',
              productCode: null,
              accumulatedPoint: '-100',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
            {
              usedPoint: '0',
              supplierName: null,
              reason: null,
              amount: '-56050',
              createdDate: '2017.05.16',
              productCode: null,
              accumulatedPoint: '-9000',
              shopName: '본사쇼핑몰',
              pointType: null,
              activatedDate: null,
              shopSeq: '1011',
              productName: null,
            },
          ],
        },
      );
    } else {
      res.json(
        {
          page: {
            totalCount: -1,
            currentPage: req.query.pageNumber,
            perPage: 10,
          },
          results: [],
        },
      );
    }
  });

  router.get(['/Deposit/Index', '/Deposit'], (req, res) => {
    const path = 'Deposit/Index';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      point: {
        depositAmount: '20,000',
      },
    }));
  });

  router.get(['/Deposit/History'], (req, res) => {
    if (req.query.pageNumber == 1) {
      res.json(
        {
          page: {
            totalCount: 12,
            currentPage: 1,
            perPage: 10,
          },
          results: [
            {
              extraDescription: '예치금 강제삭감',
              amount: '1,000,000',
              createdDate: '2011.04.07',
              displayedType: '삭감',
              description: '기타',
              currency: '원',
              type: 'used',
            },
            {
              extraDescription: '',
              amount: '168,000',
              createdDate: '2010.11.09',
              displayedType: '예치',
              description: '주문취소',
              currency: '원',
              type: 'accumulated',
            },
            {
              extraDescription: '',
              amount: '168,000',
              createdDate: '2010.11.09',
              displayedType: '사용',
              description: '주문',
              currency: '원',
              type: 'used',
            },
            {
              extraDescription: '',
              amount: '59,250',
              createdDate: '2010.09.02',
              displayedType: '예치',
              description: '주문취소',
              currency: '원',
              type: 'accumulated',
            },
            {
              extraDescription: '',
              amount: '59,250',
              createdDate: '2010.09.02',
              displayedType: '사용',
              description: '주문',
              currency: '원',
              type: 'used',
            },
            {
              extraDescription: '',
              amount: '26,500',
              createdDate: '2010.09.02',
              displayedType: '예치',
              description: '주문취소',
              currency: '원',
              type: 'accumulated',
            },
            {
              extraDescription: '',
              amount: '26,500',
              createdDate: '2010.09.02',
              displayedType: '사용',
              description: '주문',
              currency: '원',
              type: 'used',
            },
            {
              extraDescription: '',
              amount: '136,650',
              createdDate: '2010.07.25',
              displayedType: '예치',
              description: '주문취소',
              currency: '원',
              type: 'accumulated',
            },
            {
              extraDescription: '',
              amount: '136,650',
              createdDate: '2010.07.25',
              displayedType: '사용',
              description: '주문',
              currency: '원',
              type: 'used',
            },
            {
              extraDescription: '',
              amount: '63,000',
              createdDate: '2010.04.01',
              displayedType: '예치',
              description: '주문취소',
              currency: '원',
              type: 'accumulated',
            },
          ],
        },
      );
    } else if (req.query.pageNumber == 1) {
      res.json(
        {
          page: {
            totalCount: 12,
            currentPage: 2,
            perPage: 10,
          },
          results: [
            {
              extraDescription: '예치금 강제삭감',
              amount: '1,000,000',
              createdDate: '2011.03.31',
              displayedType: '삭감',
              description: '기타',
              currency: '원',
              type: 'used',
            },
            {
              extraDescription: '',
              amount: '168,000',
              createdDate: '2010.03.01',
              displayedType: '예치',
              description: '주문취소',
              currency: '원',
              type: 'accumulated',
            },
          ],
        },
      );
    } else {
      res.json(
        {
          page: {
            totalCount: -1,
            currentPage: req.query.pageNumber,
            perPage: 10,
          },
          results: [
          ],
        },
      );
    }
  });

  router.get(['/Coupon/OnlineList', '/Coupon/List', '/Coupon/Index', '/Coupon', '/Coupon/OfflineList'], (req, res) => {
    let path = 'Coupon/List';

    if (!req.mobileViewMode) {
      if (req.originalUrl == '/Coupon/OnlineList') {
        path = 'Coupon/OnlineList';
      } else if (req.originalUrl == '/Coupon/OfflineList') {
        path = 'Coupon/OfflineList';
      }
    }
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      offlineCoupons: {
        page: {
          totalCount: 0,
          currentPage: 1,
          perPage: -1,
        },
        results: [],
      },
      onlineCoupons: {
        page: {
          totalCount: 28,
          currentPage: 1,
          perPage: -1,
        },
        results: [
          {
            brandName: 'All',
            code: 'C0189551612477',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.07.31',
            name: '전브랜드',
            discountValue: '20',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000005',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '40,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000008',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '10,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249510000006',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '추가지급쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '10,000',
            discountDescription: null,
            discountString: '추가지급',
          },
          {
            brandName: 'All',
            code: 'C0249900000001',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '25',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000004',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '30,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249900000008',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '30',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000001',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '5,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000003',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '20,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249510000003',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '40,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249900000003',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '5',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249900000006',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '20',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0123102900514',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2013.01.02',
            name: '전브랜드',
            discountValue: '15',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000002',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '10,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000007',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '5,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249510000005',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '추가지급쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '5',
            discountDescription: null,
            discountString: '추가지급',
          },
          {
            brandName: 'All',
            code: 'C0249510000007',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '추가지급쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '5',
            discountDescription: null,
            discountString: '추가지급',
          },
          {
            brandName: 'All',
            code: 'C0249900000007',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '25',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0123102900513',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2013.01.02',
            name: '전브랜드',
            discountValue: '10',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249510000002',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '30,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249510000001',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '20,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249900000004',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '10',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249900000005',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '15',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0123102900515',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2013.01.02',
            name: '전브랜드',
            discountValue: '5',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249500000006',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '50,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249510000008',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '추가지급쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '10,000',
            discountDescription: null,
            discountString: '추가지급',
          },
          {
            brandName: 'All',
            code: 'C0249510000004',
            discountUnit: '원',
            description: null,
            isEnabledDuplicate: true,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '50,000',
            discountDescription: null,
            discountString: '할인',
          },
          {
            brandName: 'All',
            code: 'C0249900000002',
            discountUnit: '%',
            description: null,
            isEnabledDuplicate: false,
            useEndDate: '2999.12.31',
            type: '온라인 매장 겸용 쿠폰',
            extraType: '할인쿠폰',
            useStartDate: '2014.04.22',
            name: '전브랜드',
            discountValue: '30',
            discountDescription: null,
            discountString: '할인',
          },
        ],
      },
    }));
  });

  router.get(['/MyPage/CurrentOrders'], (req, res) => {
    const orderType = req.query.orderType;
    if (orderType == 'DELIVERY') {
      res.json(
        [
          {
            count: 0,
            orderStatus: 'RECEIPT',
            orders: [],
          },
          {
            count: 0,
            orderStatus: 'COMPLETEPAYMENT',
            orders: [],
          },
          {
            count: 0,
            orderStatus: 'DELIVERYREADY',
            orders: [],
          },
          {
            count: 0,
            orderStatus: 'DELIVERY',
            orders: [],
          },
          {
            count: 1,
            orderStatus: 'DELIVERYCOMPLETED',
            orders: [
              {
                orderNumber: '11011822949',
                createdDate: '2011.01.18',
                totalPrice: '9,000',
                deliveryType: 'DELIVERYSERVICE',
                items: [
                  {
                    product: {
                      supplierName: 'customellow',
                      code: 'CWXX06881WI-101',
                      color: '와인',
                      supplierCode: 'CW',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                      size: 'XXX',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'CWXX06881WI',
                      name: '아가일 체크 양말',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    paymentNo: '451171',
                    isReturnable: false,
                    formattedPrice: '9,000',
                    displayedStatus: '배송완료',
                    statusUpdatedDate: '2011.01.18',
                    deliveryInformation: {
                      deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
                      deliveryVendorFinishDate: '2011.01.30',
                      deliveryNo: '201023982552',
                      deliveryVendorName: null,
                    },
                    price: 9000,
                    isTrackable: false,
                    isExchangeable: false,
                    isCancelable: false,
                    status: 'DELIVERYCOMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
              },
            ],
          },
        ],
      );
    } else if (orderType == 'PICKUP') {
      res.json([
        {
          count: 0,
          orderStatus: 'COMPLETEPAYMENT',
          orders: [],
        },
        {
          count: 0,
          orderStatus: 'PICKUPREADY',
          orders: [],
        },
        {
          count: 0,
          orderStatus: 'PICKUPCOMPLETE',
          orders: [],
        },
      ]);
      // RMA
    } else {
      res.json(
        [
          {
            count: 7,
            orderStatus: 'CANCEL',
            orders: [
              {
                orderNumber: '15090430152',
                createdDate: '2015.09.04',
                payments: null,
                creditCardAmount: null,
                deliveryType: 'DELIVERYSERVICE',
                discount: null,
                items: [
                  {
                    product: {
                      supplierName: 'MARC BY MARC JACOBS',
                      code: 'MMAM50611PI-100',
                      color: '핑크',
                      deliveryType: null,
                      supplierCode: 'MM',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                      size: 'XXX',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'MMAM50611PI',
                      name: 'Crosby Quilt Nylon Deelite Dot Backpack',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    formattedDeliveryCost: null,
                    paymentNo: '1876073',
                    isReturnable: false,
                    formattedPrice: '175,000',
                    displayedStatus: '취소완료',
                    statusUpdatedDate: '2015.09.04',
                    deliveryInformation: null,
                    deliveryAddress: null,
                    price: 175000,
                    isTrackable: false,
                    isExchangeable: false,
                    pickupInformation: null,
                    isCancelable: false,
                    deliveryCost: null,
                    status: 'CANCEL_COMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
                totalBasePrice: null,
                totalRealPrice: null,
                orderDetailPrice: null,
                deliveryCost: '0',
                payable: null,
              },
              {
                orderNumber: '15020614942',
                createdDate: '2015.02.06',
                payments: null,
                creditCardAmount: null,
                deliveryType: 'DELIVERYSERVICE',
                discount: null,
                items: [
                  {
                    product: {
                      supplierName: 'KOLONSPORT',
                      code: 'JWDW34001BL-103',
                      color: '블랙',
                      deliveryType: null,
                      supplierCode: 'KS',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                      size: '110',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'JWDW34001BL',
                      name: '남성 동절 트래블 잔퀼팅 다운 자켓',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    formattedDeliveryCost: null,
                    paymentNo: '1623961',
                    isReturnable: false,
                    formattedPrice: '88,000',
                    displayedStatus: '취소완료',
                    statusUpdatedDate: '2015.02.06',
                    deliveryInformation: null,
                    deliveryAddress: null,
                    price: 88000,
                    isTrackable: false,
                    isExchangeable: false,
                    pickupInformation: null,
                    isCancelable: false,
                    deliveryCost: null,
                    status: 'CANCEL_COMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
                totalBasePrice: null,
                totalRealPrice: null,
                orderDetailPrice: null,
                deliveryCost: '0',
                payable: null,
              },
              {
                orderNumber: '15020614942',
                createdDate: '2015.02.06',
                payments: null,
                creditCardAmount: null,
                deliveryType: 'DELIVERYSERVICE',
                discount: null,
                items: [
                  {
                    product: {
                      supplierName: 'KOLONSPORT',
                      code: 'JKJW38311TE-103',
                      color: '씰',
                      deliveryType: null,
                      supplierCode: 'KS',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                      size: '90',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'JKJW38311TE',
                      name: '여성 퀼팅 소매 후드 자켓',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    formattedDeliveryCost: null,
                    paymentNo: '1623961',
                    isReturnable: false,
                    formattedPrice: '62,100',
                    displayedStatus: '취소완료',
                    statusUpdatedDate: '2015.02.06',
                    deliveryInformation: null,
                    deliveryAddress: null,
                    price: 62100,
                    isTrackable: false,
                    isExchangeable: false,
                    pickupInformation: null,
                    isCancelable: false,
                    deliveryCost: null,
                    status: 'CANCEL_COMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
                totalBasePrice: null,
                totalRealPrice: null,
                orderDetailPrice: null,
                deliveryCost: '0',
                payable: null,
              },
              {
                orderNumber: '15020614800',
                createdDate: '2015.02.06',
                payments: null,
                creditCardAmount: null,
                deliveryType: 'DELIVERYSERVICE',
                discount: null,
                items: [
                  {
                    product: {
                      supplierName: 'KOLONSPORT',
                      code: 'JKDW35561GY-104',
                      color: '그레이',
                      deliveryType: null,
                      supplierCode: 'KS',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                      size: '95',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'JKDW35561GY',
                      name: '여성 동절 트래블 트렌치 다운 자켓',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    formattedDeliveryCost: null,
                    paymentNo: '1623835',
                    isReturnable: false,
                    formattedPrice: '124,200',
                    displayedStatus: '취소완료',
                    statusUpdatedDate: '2015.02.06',
                    deliveryInformation: null,
                    deliveryAddress: null,
                    price: 124200,
                    isTrackable: false,
                    isExchangeable: false,
                    pickupInformation: null,
                    isCancelable: false,
                    deliveryCost: null,
                    status: 'CANCEL_COMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
                totalBasePrice: null,
                totalRealPrice: null,
                orderDetailPrice: null,
                deliveryCost: '0',
                payable: null,
              },
              {
                orderNumber: '15020614800',
                createdDate: '2015.02.06',
                payments: null,
                creditCardAmount: null,
                deliveryType: 'DELIVERYSERVICE',
                discount: null,
                items: [
                  {
                    product: {
                      supplierName: 'KOLONSPORT',
                      code: 'JWJW37511BL-102',
                      color: '블랙',
                      deliveryType: null,
                      supplierCode: 'KS',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
                      size: '105',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'JWJW37511BL',
                      name: '남성 동절 내피다운 디테처블 숏 자켓',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    formattedDeliveryCost: null,
                    paymentNo: '1623835',
                    isReturnable: false,
                    formattedPrice: '140,400',
                    displayedStatus: '취소완료',
                    statusUpdatedDate: '2015.02.06',
                    deliveryInformation: null,
                    deliveryAddress: null,
                    price: 140400,
                    isTrackable: false,
                    isExchangeable: false,
                    pickupInformation: null,
                    isCancelable: false,
                    deliveryCost: null,
                    status: 'CANCEL_COMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
                totalBasePrice: null,
                totalRealPrice: null,
                orderDetailPrice: null,
                deliveryCost: '0',
                payable: null,
              },
              {
                orderNumber: '15020614703',
                createdDate: '2015.02.06',
                payments: null,
                creditCardAmount: null,
                deliveryType: 'DELIVERYSERVICE',
                discount: null,
                items: [
                  {
                    product: {
                      supplierName: 'KOLONSPORT',
                      code: 'JKJW38311TE-103',
                      color: '씰',
                      deliveryType: null,
                      supplierCode: 'KS',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                      size: '90',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'JKJW38311TE',
                      name: '여성 퀼팅 소매 후드 자켓',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    formattedDeliveryCost: null,
                    paymentNo: '1623763',
                    isReturnable: false,
                    formattedPrice: '62,100',
                    displayedStatus: '취소완료',
                    statusUpdatedDate: '2015.02.06',
                    deliveryInformation: null,
                    deliveryAddress: null,
                    price: 62100,
                    isTrackable: false,
                    isExchangeable: false,
                    pickupInformation: null,
                    isCancelable: false,
                    deliveryCost: null,
                    status: 'CANCEL_COMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
                totalBasePrice: null,
                totalRealPrice: null,
                orderDetailPrice: null,
                deliveryCost: '0',
                payable: null,
              },
              {
                orderNumber: '15020614703',
                createdDate: '2015.02.06',
                payments: null,
                creditCardAmount: null,
                deliveryType: 'DELIVERYSERVICE',
                discount: null,
                items: [
                  {
                    product: {
                      supplierName: 'KOLONSPORT',
                      code: 'JWDW34481GY-102',
                      color: '그레이',
                      deliveryType: null,
                      supplierCode: 'KS',
                      colorImages: null,
                      url: null,
                      representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
                      size: '105',
                      price: null,
                      productSaleType: 'GENERAL',
                      productReferences: [],
                      baseProductCode: 'JWDW34481GY',
                      name: '남성 동절 트래블 테일러드 다운 자켓',
                      soldOutYn: null,
                    },
                    displayedQuantity: '1',
                    quantity: 1,
                    formattedDeliveryCost: null,
                    paymentNo: '1623763',
                    isReturnable: false,
                    formattedPrice: '102,600',
                    displayedStatus: '취소완료',
                    statusUpdatedDate: '2015.02.06',
                    deliveryInformation: null,
                    deliveryAddress: null,
                    price: 102600,
                    isTrackable: false,
                    isExchangeable: false,
                    pickupInformation: null,
                    isCancelable: false,
                    deliveryCost: null,
                    status: 'CANCEL_COMPLETED',
                  },
                ],
                displayedDeliveryType: '일반배송',
                totalBasePrice: null,
                totalRealPrice: null,
                orderDetailPrice: null,
                deliveryCost: '0',
                payable: null,
              },
            ],
          },
          {
            count: 0,
            orderStatus: 'EXCHANGE',
            orders: [],
          },
          {
            count: 0,
            orderStatus: 'RETURN',
            orders: [],
          },
        ],
      );
    }
  });

  router.get(['Order/:orderNumber/Exchange/DeliveryCost'], (req, res) => {
    res.json(
      { deliveryCost: 2500 });
  });

  router.get(['/Order/ConsignmentEntries'], (req, res) => {
    res.json(
      {
        page:
        {
          totalCount: 5,
          currentPage: 1,
          perPage: 10,
        },
        results:
        [
          {
            orderNumber: '15090430152',
            createdDate: '2015.09.04',
            totalPrice: '175,000',
            deliveryType: 'DELIVERYSERVICE',
            items: [
              {
                product: {
                  supplierName: 'MARC BY MARC JACOBS',
                  discountRate: null,
                  code: 'MMAM50611PI-100',
                  color: '핑크',
                  supplierCode: 'MM',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                  formattedPrice: null,
                  size: 'XXX',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'MMAM50611PI',
                  name: 'Crosby Quilt Nylon Deelite Dot Backpack',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '1876073',
                isReturnable: false,
                formattedPrice: '175,000',
                displayedStatus: '취소완료',
                statusUpdatedDate: '2015.09.04',
                deliveryInformation: null,
                price: 175000.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'CANCEL_COMPLETED',
              },
            ],
            displayedDeliveryType: '일반배송',
          },
          {
            orderNumber: '15020614942',
            createdDate: '2015.02.06',
            totalPrice: '150,100',
            deliveryType: 'DELIVERYSERVICE',
            items: [
              {
                product: {
                  supplierName: 'KOLONSPORT',
                  discountRate: null,
                  code: 'JWDW34001BL-103',
                  color: '블랙',
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                  formattedPrice: null,
                  size: '110',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'JWDW34001BL',
                  name: '남성 동절 트래블 잔퀼팅 다운 자켓',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '1623961',
                isReturnable: false,
                formattedPrice: '88,000',
                displayedStatus: '취소완료',
                statusUpdatedDate: '2015.02.06',
                deliveryInformation: null,
                price: 88000.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'CANCEL_COMPLETED',
              },
              {
                product: {
                  supplierName: 'KOLONSPORT',
                  discountRate: null,
                  code: 'JKJW38311TE-103',
                  color: '씰',
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                  formattedPrice: null,
                  size: '90',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'JKJW38311TE',
                  name: '여성 퀼팅 소매 후드 자켓',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '1623961',
                isReturnable: false,
                formattedPrice: '62,100',
                displayedStatus: '취소완료',
                statusUpdatedDate: '2015.02.06',
                deliveryInformation: null,
                price: 62100.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'CANCEL_COMPLETED',
              },
            ],
            displayedDeliveryType: '일반배송',
          },
          {
            orderNumber: '15020614800',
            createdDate: '2015.02.06',
            totalPrice: '264,600',
            deliveryType: 'DELIVERYSERVICE',
            items: [
              {
                product: {
                  supplierName: 'KOLONSPORT',
                  discountRate: null,
                  code: 'JKDW35561GY-104',
                  color: '그레이',
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                  formattedPrice: null,
                  size: '95',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'JKDW35561GY',
                  name: '여성 동절 트래블 트렌치 다운 자켓',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '1623835',
                isReturnable: false,
                formattedPrice: '124,200',
                displayedStatus: '취소완료',
                statusUpdatedDate: '2015.02.06',
                deliveryInformation: null,
                price: 124200.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'CANCEL_COMPLETED',
              },
              {
                product: {
                  supplierName: 'KOLONSPORT',
                  discountRate: null,
                  code: 'JWJW37511BL-102',
                  color: '블랙',
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
                  formattedPrice: null,
                  size: '105',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'JWJW37511BL',
                  name: '남성 동절 내피다운 디테처블 숏 자켓',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '1623835',
                isReturnable: false,
                formattedPrice: '140,400',
                displayedStatus: '취소완료',
                statusUpdatedDate: '2015.02.06',
                deliveryInformation: null,
                price: 140400.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'CANCEL_COMPLETED',
              },
            ],
            displayedDeliveryType: '일반배송',
          },
          {
            orderNumber: '15020614703',
            createdDate: '2015.02.06',
            totalPrice: '164,700',
            deliveryType: 'DELIVERYSERVICE',
            items: [
              {
                product: {
                  supplierName: 'KOLONSPORT',
                  discountRate: null,
                  code: 'JKJW38311TE-103',
                  color: '씰',
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                  formattedPrice: null,
                  size: '90',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'JKJW38311TE',
                  name: '여성 퀼팅 소매 후드 자켓',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '1623763',
                isReturnable: false,
                formattedPrice: '62,100',
                displayedStatus: '취소완료',
                statusUpdatedDate: '2015.02.06',
                deliveryInformation: null,
                price: 62100.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'CANCEL_COMPLETED',
              },
              {
                product: {
                  supplierName: 'KOLONSPORT',
                  discountRate: null,
                  code: 'JWDW34481GY-102',
                  color: '그레이',
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
                  formattedPrice: null,
                  size: '105',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'JWDW34481GY',
                  name: '남성 동절 트래블 테일러드 다운 자켓',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '1623763',
                isReturnable: false,
                formattedPrice: '102,600',
                displayedStatus: '취소완료',
                statusUpdatedDate: '2015.02.06',
                deliveryInformation: null,
                price: 102600.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'CANCEL_COMPLETED',
              },
            ],
            displayedDeliveryType: '일반배송',
          },
          {
            orderNumber: '11011822949',
            createdDate: '2011.01.18',
            totalPrice: '9,000',
            deliveryType: 'DELIVERYSERVICE',
            items: [
              {
                product: {
                  supplierName: 'customellow',
                  discountRate: null,
                  code: 'CWXX06881WI-101',
                  color: '와인',
                  supplierCode: 'CW',
                  colorImages: null,
                  url: null,
                  wishPrice: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
                  formattedPrice: null,
                  size: 'XXX',
                  price: null,
                  productSaleType: 'GENERAL',
                  productReferences: [

                  ],
                  baseProductCode: 'CWXX06881WI',
                  name: '아가일 체크 양말',
                  soldOutYn: null,
                  formattedWishPrice: null,
                },
                displayedQuantity: '1',
                quantity: 1,
                paymentNo: '451171',
                isReturnable: false,
                formattedPrice: '9,000',
                displayedStatus: '배송완료',
                statusUpdatedDate: '2011.01.18',
                deliveryInformation: {
                  deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
                  deliveryVendorFinishDate: '2011.01.30',
                  deliveryNo: '201023982552',
                  deliveryVendorName: null,
                },
                price: 9000.0,
                isTrackable: false,
                isExchangeable: false,
                isCancelable: false,
                status: 'DELIVERYCOMPLETED',
              },
            ],
            displayedDeliveryType: '일반배송',
          },
        ],
      },
    );
  });

  router.get(['/Order/ExchangePickUp'], (req, res) => {
    const path = 'Order/Exchange';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'PICKUP',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/Order/ReturnPickUp'], (req, res) => {
    const path = 'Order/Return';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'PICKUP',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/Order/Cancel', '/Order/:orderNumber/Cancel'], (req, res) => {
    const path = 'Order/Cancel';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'DELIVERYSERVICE',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8855255941143',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '일반배송',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '11,500',
        deliveryCost: '2,500',
        payable: false,
      },
    }));
  });

  router.get(['/Order/CancelPickUp'], (req, res) => {
    const path = 'Order/Cancel';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'PICKUP',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });
  router.get(['/Order/CancelPickUp'], (req, res) => {
    const path = 'Order/Cancel';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'PICKUP',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/Order/Exchange', '/Order/:orderNumber/Exchange'], (req, res) => {
    const path = 'Order/Exchange';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'DELIVERYSERVICE',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8855255941143',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '일반배송',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '11,500',
        deliveryCost: '2,500',
        payable: false,
      },
    }));
  });

  router.get(['/Order/Return', '/Order/:orderNumber/Return'], (req, res) => {
    const path = 'Order/Return';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'DELIVERYSERVICE',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8855255941143',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '일반배송',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '11,500',
        deliveryCost: '2,500',
        payable: false,
      },
    }));
  });

  router.get(['/RMA/CancelDetailPickUp', '/RMA/ExchangeDetailPickUp', '/RMA/ReturnDetailPickUp'], (req, res) => {
    const path = 'Order/Detail';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'PICKUP',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/RMA/Cancel/:orderNumber', '/RMA/Exchange/:orderNumber', '/RMA/Return/:orderNumber', '/RMA/CancelDetail', '/RMA/ExchangeDetail', '/RMA/ReturnDetail'], (req, res) => {
    const path = 'Order/Detail';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order: {
        orderNumber: '15020614942',
        createdDate: '2015.02.06',
        payments: [
          {
            amount: 0,
            formattedAmount: '0',
            name: '신용카드 삼성',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'DELIVERYSERVICE',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'KOLONSPORT',
              code: 'JKJW38311TE-103',
              color: '씰',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
              size: '90',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'JKJW38311TE',
              name: '여성 퀼팅 소매 후드 자켓',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '62,100',
            displayedStatus: '취소완료',
            statusUpdatedDate: '2017.02.07',
            deliveryInformation: null,
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8864592494615',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 62100,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'CANCEL_COMPLETED',
          },
          {
            product: {
              supplierName: 'KOLONSPORT',
              code: 'JWDW34001BL-103',
              color: '블랙',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
              size: '110',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'JWDW34001BL',
              name: '남성 동절 트래블 잔퀼팅 다운 자켓',
              soldOutYn: null,
            },
            entryCode: '2',
            consignmentEntryCode: '2',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '88,000',
            displayedStatus: '취소완료',
            statusUpdatedDate: '2017.02.07',
            deliveryInformation: null,
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8864592461847',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 88000,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'CANCEL_COMPLETED',
          },
        ],
        displayedDeliveryType: '일반배송',
        totalBasePrice: '-150,100',
        totalRealPrice: '-150,100',
        orderDetailPrice: '0',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/RMA/CancelDetailPickUp'], (req, res) => {
    const path = 'Order/Detail';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'PICKUP',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/Order/DetailPickUp'], (req, res) => {
    const path = 'Order/Detail';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      selectedOrderEntryCode: '1',
      order:
      {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'PICKUP',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/Order/DetailStore'], (req, res) => {
    const path = 'Order/Detail';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      order:
      {
        isPayable: true,
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: '223,000',
        deliveryType: '?',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            pickupInformation: {
              name: '코오롱인더스트리㈜ FnC부문 쿠론 청담직영점',
              pickupDate: '2017.03.29',
              pickupTimeFrom: '10:30',
              pickupTimeTo: '12:30',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '픽업상품',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '9,000',
        deliveryCost: '0',
        payable: false,
      },
    }));
  });

  router.get(['/Order/Detail', '/Order/:orderNumber'], (req, res) => {
    let path = 'Order/Detail';
    let orderNumber = req.params.orderNumber;

    // if (req.mobileViewMode) {
    if (orderNumber !== undefined && isNaN(parseInt(orderNumber))) {
      path = `Order/${orderNumber}`;
    } else if (req.originalUrl == '/Order/Detail') {
      path = 'Order/Detail';
      orderNumber = '11011822949';
    }
    // }

    let order = {};
    // 일반배송, 배송완료
    if (orderNumber == '11011822949') {
      order = {
        orderNumber: '11011822949',
        createdDate: '2011.01.18',
        payments: [
          {
            amount: 11500,
            formattedAmount: '11,500',
            name: '신용카드 신한',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'DELIVERYSERVICE',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'customellow',
              code: 'CWXX06881WI-101',
              color: '와인',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'CWXX06881WI',
              name: '아가일 체크 양말',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '9,000',
            displayedStatus: '배송완료',
            statusUpdatedDate: null,
            deliveryInformation: {
              deliveryVendorUrl: 'https://track.lottegl.com/view/tracking/',
              deliveryVendorFinishDate: '2011.01.30',
              deliveryNo: '201023982552',
              deliveryVendorName: '롯데택배',
            },
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8855255941143',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 9000,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'DELIVERYCOMPLETED',
          },
        ],
        displayedDeliveryType: '일반배송',
        totalBasePrice: '9,000',
        totalRealPrice: '9,000',
        orderDetailPrice: '11,500',
        deliveryCost: '2,500',
        payable: false,
      };
    } else {
      // 일반배송, 주문취소
      // else if (orderNumber == '15090430152' || orderNumber == '15020614942' || orderNumber == '15020614800' || orderNumber == '15020614703' ) {
      order = {
        orderNumber: '15020614942',
        createdDate: '2015.02.06',
        payments: [
          {
            amount: 0,
            formattedAmount: '0',
            name: '신용카드 삼성',
            method: 'CREDITCARD',
            status: 'COMPLETE',
            extraData: null,
          },
        ],
        creditCardAmount: null,
        deliveryType: 'DELIVERYSERVICE',
        discount: [
          {
            name: '쿠폰',
            amount: '0',
          },
          {
            name: '프로모션',
            amount: '0',
          },
          {
            name: '임직원할인',
            amount: '0',
          },
          {
            name: '가격할인',
            amount: '0',
          },
        ],
        items: [
          {
            product: {
              supplierName: 'KOLONSPORT',
              code: 'JKJW38311TE-103',
              color: '씰',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
              size: '90',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'JKJW38311TE',
              name: '여성 퀼팅 소매 후드 자켓',
              soldOutYn: null,
            },
            entryCode: '1',
            consignmentEntryCode: '1',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '62,100',
            displayedStatus: '취소완료',
            statusUpdatedDate: '2017.02.07',
            deliveryInformation: null,
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8864592494615',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 62100,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'CANCEL_COMPLETED',
          },
          {
            product: {
              supplierName: 'KOLONSPORT',
              code: 'JWDW34001BL-103',
              color: '블랙',
              deliveryType: 'OWN',
              supplierCode: null,
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/SC/2017/LM1/W6DCX17106BLK_LM1.jpg',
              size: '110',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [
              ],
              baseProductCode: 'JWDW34001BL',
              name: '남성 동절 트래블 잔퀼팅 다운 자켓',
              soldOutYn: null,
            },
            entryCode: '2',
            consignmentEntryCode: '2',
            displayedQuantity: '1',
            quantity: 1,
            formattedDeliveryCost: '0',
            paymentNo: null,
            isReturnable: false,
            formattedPrice: '88,000',
            displayedStatus: '취소완료',
            statusUpdatedDate: '2017.02.07',
            deliveryInformation: null,
            deliveryAddress: {
              lastName: null,
              country: null,
              defaultYn: null,
              deliveryProductInfoList: null,
              city: null,
              companyName: null,
              postalCode: '111222',
              title: null,
              titleCode: null,
              formattedAddress: null,
              visibleInAddressBook: null,
              roadAddress: null,
              id: '8864592461847',
              line2: '111222',
              line1: '경기도 과천시 별양동 코오롱타워 11층',
              email: null,
              giftYn: null,
              town: null,
              multiAddress: null,
              deliveryMemo: null,
              firstName: '테스트임',
              phone: '01011112222',
              shippingAddress: null,
              middleName: null,
              region: null,
              cellPhone: '01011112222',
            },
            price: 88000,
            isTrackable: false,
            isExchangeable: false,
            pickupInformation: null,
            isCancelable: false,
            deliveryCost: 0,
            status: 'CANCEL_COMPLETED',
          },
        ],
        displayedDeliveryType: '일반배송',
        totalBasePrice: '-150,100',
        totalRealPrice: '-150,100',
        orderDetailPrice: '0',
        deliveryCost: '0',
        payable: false,
      };
    }

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      order,
    }));
  });

  router.get(['/Product/Card', '/Product/Point', '/Product/Delivery', '/Product/Exchange', '/Product/Repair'], (req, res) => {
    const path = req.originalUrl.substring(1);
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req));
  });

  router.get(['/Product/Search'], (req, res) => {
    res.json(
      {
        page: {
          totalCount: 16812,
          currentPage: 2,
          perPage: 6,
        },
        results: [
          {
            supplierName: 'HEAD',
            code: 'JHTDM16311GYD',
            representationImageForMobile: null,
            color: null,
            deliveryType: null,
            productBrandName: 'HEAD',
            supplierCode: 'HD',
            colorImages: [
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/JHTDM16311GRN_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/JHTDM16311GYD_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/JHTDM16311NYX_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/JHTDM16311WHX_CC.gif',
            ],
            url: null,
            representationImage: 'http://kopimages.kolon.com/Prod_Img/HD/2016/LS1/JHTDM16311GYD_LS1.jpg',
            size: null,
            price: {
              discountRate: 60,
              symbol: '원',
              formattedPrice: '17,200',
              currencyIso: 'KRW',
              price: 17200,
              wishPrice: 43000,
              formattedWishPrice: '43,000',
            },
            productSaleType: null,
            productReferences: null,
            baseProductCode: null,
            name: '남성 라운드 베이직 반팔 티셔츠',
            soldOutYn: 'N',
            legacySize: null,
          },
          {
            supplierName: 'KOLONSPORT',
            code: 'JWTAM16591NBE',
            representationImageForMobile: null,
            color: null,
            deliveryType: null,
            productBrandName: 'KOLONSPORT',
            supplierCode: 'KS',
            colorImages: [
              'http://kopimages.kolon.com/Prod_Img/KS/2016/CC/JWTAM16591NBE_CC.gif',
            ],
            url: null,
            representationImage: 'http://kopimages.kolon.com/Prod_Img/KS/2016/LS1/JWTAM16591NBE_LS1.jpg',
            size: null,
            price: {
              discountRate: 40,
              symbol: '원',
              formattedPrice: '23,400',
              currencyIso: 'KRW',
              price: 23400,
              wishPrice: 39000,
              formattedWishPrice: '39,000',
            },
            productSaleType: null,
            productReferences: null,
            baseProductCode: null,
            name: '남성 카모플라주 티셔츠',
            soldOutYn: 'N',
            legacySize: null,
          },
          {
            supplierName: 'KOLONSPORT',
            code: 'KYFX58851MI',
            representationImageForMobile: null,
            color: null,
            deliveryType: null,
            productBrandName: 'KOLONSPORT',
            supplierCode: 'KS',
            colorImages: [
              'http://kopimages.kolon.com/Prod_Img/KS/2015/CC/KEFX58801GO_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/KS/2015/CC/KYFX58811IK_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/KS/2015/CC/KYFX58851MI_CC.gif',
            ],
            url: null,
            representationImage: 'http://kopimages.kolon.com/Prod_Img/KS/2015/LS1/KYFX58851MI_LS1.jpg',
            size: null,
            price: {
              discountRate: 57,
              symbol: '원',
              formattedPrice: '69,000',
              currencyIso: 'KRW',
              price: 69000,
              wishPrice: 160000,
              formattedWishPrice: '160,000',
            },
            productSaleType: null,
            productReferences: null,
            baseProductCode: null,
            name: '아웃도어 스니커즈 CUSHIONISTA-B',
            soldOutYn: 'N',
            legacySize: null,
          },
          {
            supplierName: 'suecommabonnie',
            code: 'DG4DX16004BWX',
            representationImageForMobile: null,
            color: null,
            deliveryType: null,
            productBrandName: 'suecommabonnie',
            supplierCode: 'SB',
            colorImages: [
              'http://kopimages.kolon.com/Prod_Img/SB/2016/CC/DG4DX16004BWX_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/SB/2016/CC/DG4DX16005WHT_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/SB/2016/CC/DG4DX16006BLU_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/SB/2016/CC/DG4DX16007GRY_CC.gif',
            ],
            url: null,
            representationImage: 'http://kopimages.kolon.com/Prod_Img/SB/2016/LS1/DG4DX16004BWX_LS1.jpg',
            size: null,
            price: {
              discountRate: 0,
              symbol: '원',
              formattedPrice: '278,000',
              currencyIso: 'KRW',
              price: 278000,
              wishPrice: 278000,
              formattedWishPrice: '278,000',
            },
            productSaleType: null,
            productReferences: null,
            baseProductCode: null,
            name: 'Space NO.7 (black)',
            soldOutYn: 'N',
            legacySize: null,
          },
          {
            supplierName: 'HEAD',
            code: 'KF2AX16651NYX',
            representationImageForMobile: null,
            color: null,
            deliveryType: null,
            productBrandName: 'HEAD',
            supplierCode: 'HD',
            colorImages: [
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/KF2AX16651BKX_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/KF2AX16651NYX_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/KF2AX16651PIX_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2016/CC/KF2AX16651REX_CC.gif',
            ],
            url: null,
            representationImage: 'http://kopimages.kolon.com/Prod_Img/HD/2016/LS1/KF2AX16651NYX_LS1.jpg',
            size: null,
            price: {
              discountRate: 30,
              symbol: '원',
              formattedPrice: '19,000',
              currencyIso: 'KRW',
              price: 19000,
              wishPrice: 27000,
              formattedWishPrice: '27,000',
            },
            productSaleType: null,
            productReferences: null,
            baseProductCode: null,
            name: 'DERBY 16 UNISEX 슬리퍼',
            soldOutYn: 'N',
            legacySize: null,
          },
          {
            supplierName: 'HEAD',
            code: 'KFRX58021WH',
            representationImageForMobile: null,
            color: null,
            deliveryType: null,
            productBrandName: 'HEAD',
            supplierCode: 'HD',
            colorImages: [
              'http://kopimages.kolon.com/Prod_Img/HD/2015/CC/KFRX58011WH_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2015/CC/KFRX58021WH_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2015/CC/KFRX58031GY_CC.gif',
              'http://kopimages.kolon.com/Prod_Img/HD/2015/CC/KFRX58041WH_CC.gif',
            ],
            url: null,
            representationImage: 'http://kopimages.kolon.com/Prod_Img/HD/2015/LS1/KFRX58021WH_LS1.jpg',
            size: null,
            price: {
              discountRate: 65,
              symbol: '원',
              formattedPrice: '34,650',
              currencyIso: 'KRW',
              price: 34650,
              wishPrice: 99000,
              formattedWishPrice: '99,000',
            },
            productSaleType: null,
            productReferences: null,
            baseProductCode: null,
            name: '크러쉬 CRUSH 2 카라멜 UNISEX 운동화',
            soldOutYn: 'N',
            legacySize: null,
          },
        ],
      });
  });

  router.get(['/Product/:productCode', '/Product/Detail'], (req, res) => {
    const path = 'Product/Detail';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      product:
      {
        baseProductCode: 'NQPNM17901',
        productBrandName: 'ELORD',
        supplierCode: 'ED',
        name: 'GX 여성 심플 스트레치 팬츠',
        availableForPickup: 'true',
        soldOutYn: 'N',
        saleProductType: 'GENERAL',
        imageLLs: [
          { url: 'https://s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/LS1/NQPNM17901LGX_LS1.jpg' },
          { url: 'https://s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/LS2/NQPNM17901LGX_LS2.jpg' },
          { url: 'https://s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/LS3/NQPNM17901LGX_LS3.jpg' },
          { url: 'https://s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/LS4/NQPNM17901LGX_LS4.jpg' },
          { url: 'https://s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/LS5/NQPNM17901LGX_LS5.jpg' },
          { url: 'https://s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/LS6/NQPNM17901LGX_LS6.jpg' },
          { url: 'https://s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/LS1/NQPNM17901LGX_LS1.jpg' },
        ],
        price: {
          discountRate: 10.0,
          symbol: '원',
          formattedPrice: '250,200',
          currencyIso: 'KRW',
          price: '250200',
          wishPrice: '278000',
          formattedWishPrice: '278,000',
        },
        variantOptions: [
          {
            code: 'NQPNM17901LGX-64',
            variantOptionQualifiers: [
              {
                qualifier: 'size',
                name: '(v)사이즈',
                value: '64',
              },
            ],
            stock: {
              stockLevelStatus: 'inStock',
              stockLevel: '2',
            },
          },
          {
            code: 'NQPNM17901LGX-67',
            variantOptionQualifiers: [
              {
                qualifier: 'size',
                name: '(v)사이즈',
                value: '67',
              },
            ],
            stock: {
              stockLevelStatus: 'inStock',
              stockLevel: '2',
            },
          },
          {
            code: 'NQPNM17901LGX-70',
            variantOptionQualifiers: [
              {
                qualifier: 'size',
                name: '(v)사이즈',
                value: '70',
              },
            ],
            stock: {
              stockLevelStatus: 'outOfStock',
              stockLevel: '0',
            },
          },
        ],
        baseOption: {
          selected: {
            code: 'NQPNM17901LGX',
          },
          options: [
            {
              code: 'NQPNM17901BKX',
              variantOptionQualifiers: [
                {
                  image: {
                    url: '//s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/CC/NQPNM17901BKX_CC.gif',
                  },
                },
              ],
            },
            {
              code: 'NQPNM17901LGX',
              variantOptionQualifiers: [
                {
                  image: {
                    url: '//s3-ap-northeast-2.amazonaws.com/kop.images/Prod_Img/ED/2017/CC/NQPNM17901LGX_CC.gif',
                  },
                },
              ],
            },
          ],
        },
      },
    }));
  });

  router.get(['/Product/:productBaseCode/variantOptions'], (req, res) => {
    res.json(
      {
        results: [
          {
            code: 'CWXX06881WI-101',
            price: {
              discountRate: 0,
              symbol: '원',
              formattedPrice: '9,000',
              currencyIso: 'KRW',
              price: 9000,
              wishPrice: 9000,
              formattedWishPrice: '9,000',
            },
            variantOptionQualifiers: [
              {
                image: null,
                qualifier: 'size',
                name: '(v)사이즈',
                value: 'XXX',
              },
              {
                image: null,
                qualifier: 'style',
                name: '스타일',
                value: '와인',
              },
            ],
            stock: {
              stockLevelStatus: 'inStock',
              stockLevel: 2,
            },
            url: '/c/BASE-CWXX068/p/CWXX06881WI-101',
          },
          {
            code: 'CWXX06881WI-102',
            price: {
              discountRate: 0,
              symbol: '원',
              formattedPrice: '9,000',
              currencyIso: 'KRW',
              price: 9000,
              wishPrice: 9000,
              formattedWishPrice: '9,000',
            },
            variantOptionQualifiers: [
              {
                image: null,
                qualifier: 'size',
                name: '(v)사이즈',
                value: 'XXX2',
              },
              {
                image: null,
                qualifier: 'style',
                name: '스타일',
                value: '와인',
              },
            ],
            stock: {
              stockLevelStatus: 'outOfStock',
              stockLevel: -1,
            },
            url: '/c/BASE-CWXX068/p/CWXX06881WI-101',
          },
        ],
      },
    );
  });

  router.post(['/AfterSales/RepairProgress/List'], (req, res) => {
    res.json(
      [
        {
          custNm: '고은숙',
          custMBilno: '01026844080',
          cnslofcRcptDt: '2014.12.24',
          shopNM: '코오롱인더스트리㈜FnC부문 세이브프라자 동탄점',
          styleColorCd: 'KYFX82480XX',
          mendC: '봉제불량',
          cnslofcMemo: '\n',
          cmplTh1SchdDt: '20141227',
          cmplTh2SchdDt: null,
          mendSendDt: '2014.12.30',
          mendN1ChrdYn: 'Y',
          mendN1Amt: '40,000',
          mendN2Amt: null,
          coTrnsfrDt: '20141224',
          empNm: '장혜진',
          status: null,
          mendBrcdNo: '20141438441',
          shopSendDt: null,
        },
      ],
    );
  });

  router.post(['/AfterSales/RepairProgress/Detail'], (req, res) => {
    const path = 'AfterSales/RepairProgressDetail';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      repairItem:
      {
        custNm: '고은숙',
        custMBilno: '01026844080',
        cnslofcRcptDt: '2014.12.24',
        shopNM: '코오롱인더스트리㈜FnC부문 세이브프라자 동탄점',
        styleColorCd: 'KYFX82480XX',
        mendC: '봉제불량',
        cnslofcMemo: '\n',
        cmplTh1SchdDt: '2014.12.27',
        cmplTh2SchdDt: null,
        mendSendDt: '2014.12.30',
        mendN1ChrdYn: 'Y',
        mendN1Amt: '40,000',
        mendN2Amt: null,
        coTrnsfrDt: '2014.12.24',
        empNm: '장혜진',
        status: null,
        mendBrcdNo: '20141438441',
        shopSendDt: '2014.12.24',
      },
    }));
  });

  router.post(['/GuestOrder/List'], (req, res) => {
    const path = 'GuestOrder/List';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      orderList: {
        orderNumber: '15090430152',
        createdDate: '2015.09.04',
        totalPrice: '175,000',
        deliveryType: 'DELIVERYSERVICE',
        items: [
          {
            product: {
              supplierName: 'MARC BY MARC JACOBS',
              discountRate: null,
              code: 'MMAM50611PI-100',
              color: '핑크',
              supplierCode: 'MM',
              colorImages: null,
              url: null,
              wishPrice: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CM/2017/LM1/MFJBM17651NAV_LM1.jpg',
              formattedPrice: null,
              size: 'XXX',
              price: null,
              productSaleType: 'GENERAL',
              productReferences: [

              ],
              baseProductCode: 'MMAM50611PI',
              name: 'Crosby Quilt Nylon Deelite Dot Backpack',
              soldOutYn: null,
              formattedWishPrice: null,
            },
            displayedQuantity: '1',
            quantity: 1,
            paymentNo: '1876073',
            isReturnable: false,
            formattedPrice: '175,000',
            displayedStatus: '취소완료',
            statusUpdatedDate: '2015.09.04',
            deliveryInformation: null,
            price: 175000.0,
            isTrackable: false,
            isExchangeable: false,
            isCancelable: false,
            status: 'CANCEL_COMPLETED',
          },
        ],
        displayedDeliveryType: '일반배송',
      },
    }));
  });

  router.get(['/WishList'], (req, res) => {
    res.json(
      {
        page: {
          totalCount: 5,
          currentPage: 1,
          perPage: 10,
        },
        results: [
          {
            inflowPointOfService: null,
            product: {
              supplierName: 'SERIES',
              code: 'SLY3X17000WHX',
              color: '화이트',
              deliveryType: null,
              supplierCode: 'SE',
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/SE/2017/AT1/SLY3X17000WHX_AT1.jpg',
              size: 'XXX',
              price: {
                discountRate: 0,
                symbol: '원',
                formattedPrice: '6,500',
                currencyIso: 'KRW',
                price: 6500,
                wishPrice: 6500,
                formattedWishPrice: '6,500',
              },
              productSaleType: 'GENERAL',
              productReferences: [],
              baseProductCode: 'SLY3X17000',
              name: '[epigram X TWB] 페이스 타월',
              soldOutYn: null,
            },
            productCode: 'SLY3X17000WHX-XXX',
            availableStock: true,
            newProduct: false,
          },
          {
            inflowPointOfService: null,
            product: {
              supplierName: 'CLUBCAMBRIDGE',
              code: 'CZPAM17300NAX',
              color: '네이비',
              deliveryType: null,
              supplierCode: 'CC',
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/CC/2017/AT1/CZPAM17300NAX_AT1.jpg',
              size: '80',
              price: {
                discountRate: 20,
                symbol: '원',
                formattedPrice: '127,200',
                currencyIso: 'KRW',
                price: 127200,
                wishPrice: 159000,
                formattedWishPrice: '159,000',
              },
              productSaleType: 'GENERAL',
              productReferences: [],
              baseProductCode: 'CZPAM17300',
              name: '투톤 조직 울 블랜디드 팬츠',
              soldOutYn: null,
            },
            productCode: 'CZPAM17300NAX-80',
            availableStock: true,
            newProduct: true,
          },
          {
            inflowPointOfService: null,
            product: {
              supplierName: 'KOLONSPORT',
              code: 'KEXBX16400YEX_JOYSET',
              color: null,
              deliveryType: null,
              supplierCode: 'KS',
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/KS/2016/AT1/KEXBX16400YEX_JOYSET_AT1.jpg',
              size: null,
              price: {
                discountRate: 20,
                symbol: '원',
                formattedPrice: '235,200',
                currencyIso: 'KRW',
                price: 235200,
                wishPrice: 294000,
                formattedWishPrice: '294,000',
              },
              productSaleType: 'SET',
              productReferences: [
                {
                  supplierName: 'KOLONSPORT',
                  code: 'KEXAX16240REX',
                  color: '레드',
                  deliveryType: null,
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/KS/2016/AT1/KEXAX16240REX_AT1.jpg',
                  size: null,
                  price: {
                    discountRate: 20,
                    symbol: '원',
                    formattedPrice: '38,400',
                    currencyIso: 'KRW',
                    price: 38400,
                    wishPrice: 48000,
                    formattedWishPrice: '48,000',
                  },
                  productSaleType: 'GENERAL',
                  productReferences: [],
                  baseProductCode: 'BASE_A_KEXAX16240REX',
                  name: 'MINI CHAIR (미니 체어)',
                  soldOutYn: null,
                },
                {
                  supplierName: 'KOLONSPORT',
                  code: 'KEXBX16400YEX',
                  color: '옐로우',
                  deliveryType: null,
                  supplierCode: 'KS',
                  colorImages: null,
                  url: null,
                  representationImage: 'http://kopimages.kolon.com/Prod_Img/KS/2016/AT1/KEXBX16400YEX_AT1.jpg',
                  size: null,
                  price: {
                    discountRate: 20,
                    symbol: '원',
                    formattedPrice: '158,400',
                    currencyIso: 'KRW',
                    price: 158400,
                    wishPrice: 198000,
                    formattedWishPrice: '198,000',
                  },
                  productSaleType: 'GENERAL',
                  productReferences: [],
                  baseProductCode: 'BASE_A_KEXBX16400YEX',
                  name: '팝업텐트 K HAUS',
                  soldOutYn: null,
                },
              ],
              baseProductCode: 'BASE_A_KEXBX16400YEX_JOYSET',
              name: '[코오롱스포츠]피크닉 캠핑 패키지',
              soldOutYn: null,
            },
            productCode: 'KEXAX16240REX-100;KEXBX16400YEX-100;',
            availableStock: false,
            newProduct: false,
          },
          {
            inflowPointOfService: null,
            product: {
              supplierName: 'suecommabonnie',
              code: 'LPBX50521WH',
              color: '화이트',
              deliveryType: null,
              supplierCode: 'SB',
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/SB/2015/AT1/LPBX50521WH_AT1.jpg',
              size: '35',
              price: {
                discountRate: 20,
                symbol: '원',
                formattedPrice: '111,200',
                currencyIso: 'KRW',
                price: 111200,
                wishPrice: 139000,
                formattedWishPrice: '139,000',
              },
              productSaleType: 'GENERAL',
              productReferences: [],
              baseProductCode: 'BASE_LPBX50511',
              name: 'Signature print slip on',
              soldOutYn: null,
            },
            productCode: 'LPBX50521WH-101',
            availableStock: true,
            newProduct: false,
          },
          {
            inflowPointOfService: null,
            product: {
              supplierName: 'suecommabonnie',
              code: 'LPBX50511BK',
              color: '블랙',
              deliveryType: null,
              supplierCode: 'SB',
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/SB/2015/AT1/LPBX50511BK_AT1.jpg',
              size: '35',
              price: {
                discountRate: 20,
                symbol: '원',
                formattedPrice: '111,200',
                currencyIso: 'KRW',
                price: 111200,
                wishPrice: 139000,
                formattedWishPrice: '139,000',
              },
              productSaleType: 'GENERAL',
              productReferences: [],
              baseProductCode: 'BASE_LPBX50511',
              name: 'Signature print slip on',
              soldOutYn: null,
            },
            productCode: 'LPBX50511BK-101',
            availableStock: true,
            newProduct: false,
          },
        ],
      },
    );
  });

  router.get(['/WishList/OnlineList'], (req, res) => {
    const path = 'WishList/OnlineList';

    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, {
      wishList: {
        results: [
          {
            inflowPointOfService: null,
            product: {
              supplierName: 'AMANDAGHOST',
              code: 'GIRX46421GD',
              color: '골드',
              deliveryType: null,
              supplierCode: 'AG',
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/AG/2014/AT1/GIRX46421GD_AT1.jpg',
              size: '101',
              price: {
                discountRate: 0,
                symbol: '원',
                formattedPrice: '180,000',
                currencyIso: 'KRW',
                price: 180000,
                wishPrice: 180000,
                formattedWishPrice: '180,000',
              },
              productSaleType: 'GENERAL',
              productReferences: [],
              baseProductCode: 'BASE_GIRX464',
              name: 'Rose Quartz Ring / Slim Type',
              soldOutYn: null,
            },
            productCode: 'GIRX46421GD-101',
            newProduct: false,
            availableStock: true,
          },
          {
            inflowPointOfService: null,
            product: {
              supplierName: 'ELORD',
              code: 'NQPNM17901LGX',
              color: '그레이',
              deliveryType: null,
              supplierCode: 'ED',
              colorImages: null,
              url: null,
              representationImage: 'http://kopimages.kolon.com/Prod_Img/ED/2017/AT1/NQPNM17901LGX_AT1.jpg',
              size: '64',
              price: {
                discountRate: 0,
                symbol: '원',
                formattedPrice: '278,000',
                currencyIso: 'KRW',
                price: 278000,
                wishPrice: 278000,
                formattedWishPrice: '278,000',
              },
              productSaleType: 'GENERAL',
              productReferences: [],
              baseProductCode: 'NQPNM17901',
              name: 'GX 여성 심플 스트레치 팬츠',
              soldOutYn: null,
            },
            productCode: 'NQPNM17901LGX-64',
            newProduct: true,
            availableStock: true,
          },
        ],
        sorts: null,
      },
    }));
  });

  router.get(['/Order/Checkout'], (req, res) => {
    const path = 'Order/Checkout';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, 
    {
      "coupons": [],
      "siteFreeGiftItems": [],
      "checkout": {
          "orderNumber": null,
          "cart": {
              "code": "C17071159194",
              "totalPrice": {
                  "totalBasePrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "393,800",
                      "currencyIso": "KRW",
                      "price": 393800,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "deliveryCost": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalPointDiscounts": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "0",
                      "currencyIso": "KRW",
                      "price": 0,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  },
                  "totalPrice": {
                      "discountRate": null,
                      "symbol": "원",
                      "formattedPrice": "393,800",
                      "currencyIso": "KRW",
                      "price": 393800,
                      "wishPrice": null,
                      "formattedWishPrice": null
                  }
              },
              "items": [
                  {
                      "entryNumber": "2,1",
                      "orderType": "택배",
                      "quantity": 1,
                      "product": {
                          "supplierName": "CAMBRIDGE",
                          "code": "MFFBW15281NAV_JSET",
                          "representationImageForMobile": null,
                          "color": null,
                          "supplierBrandCode": null,
                          "deliveryType": "OWN",
                          "supplierCode": null,
                          "colorImages": null,
                          "url": "/c/%EB%B2%A0%EC%9D%B4%EC%A7%81-WOOL-%EC%88%98%ED%8A%B8/p/MFFBW15281NAV_JSET",
                          "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFBW15281NAV_JSET_LS1.jpg",
                          "supplierBrandName": null,
                          "size": null,
                          "price": null,
                          "productSaleType": "SET",
                          "productReferences": [
                              {
                                  "supplierName": "CAMBRIDGE",
                                  "code": "MFFCW15281NAV-101",
                                  "representationImageForMobile": null,
                                  "color": "네이비",
                                  "supplierBrandCode": null,
                                  "deliveryType": "OWN",
                                  "supplierCode": null,
                                  "colorImages": null,
                                  "url": "/c/BASE-MFFCW15281/p/MFFCW15281NAV-101",
                                  "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFCW15281NAV_LS1.jpg",
                                  "supplierBrandName": null,
                                  "size": "82",
                                  "price": null,
                                  "productSaleType": "GENERAL",
                                  "productReferences": [],
                                  "baseProductCode": "MFFCW15281NAV",
                                  "name": "베이직 WOOL 수트 팬츠",
                                  "soldOutYn": null,
                                  "legacySize": null
                              },
                              {
                                  "supplierName": "CAMBRIDGE",
                                  "code": "MFFBW15281NAV-104",
                                  "representationImageForMobile": null,
                                  "color": "네이비",
                                  "supplierBrandCode": null,
                                  "deliveryType": "OWN",
                                  "supplierCode": null,
                                  "colorImages": null,
                                  "url": "/c/BASE-MFFBW15281/p/MFFBW15281NAV-104",
                                  "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFBW15281NAV_LS1.jpg",
                                  "supplierBrandName": null,
                                  "size": "588",
                                  "price": null,
                                  "productSaleType": "GENERAL",
                                  "productReferences": [],
                                  "baseProductCode": "MFFBW15281NAV",
                                  "name": "베이직 WOOL 수트 자켓",
                                  "soldOutYn": null,
                                  "legacySize": null
                              }
                          ],
                          "baseProductCode": "MFFBW15281NAV_JSET",
                          "name": "베이직 WOOL 수트",
                          "soldOutYn": null,
                          "legacySize": null
                      },
                      "isAvailableStock": true,
                      "isAvailableEmployeeDiscount": false,
                      "totalRealPrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "370,000",
                          "currencyIso": "KRW",
                          "price": 370000,
                          "wishPrice": 0,
                          "formattedWishPrice": "0"
                      },
                      "totalBasePrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "370,000",
                          "currencyIso": "KRW",
                          "price": 370000,
                          "wishPrice": 0,
                          "formattedWishPrice": "0"
                      },
                      "totalWishPrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "740,000",
                          "currencyIso": "KRW",
                          "price": 740000,
                          "wishPrice": 0,
                          "formattedWishPrice": "0"
                      },
                      "totalEmployeeDiscounts": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "totalDiscounts": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": 0,
                          "formattedWishPrice": "0"
                      },
                      "employeePrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "370,000",
                          "currencyIso": "KRW",
                          "price": 370000,
                          "wishPrice": 0,
                          "formattedWishPrice": "0"
                      },
                      "couponDiscounts": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": 0,
                          "formattedWishPrice": "0"
                      },
                      "deliveryCost": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": 0,
                          "formattedWishPrice": "0"
                      },
                      "pickupInformation": null,
                      "isSetCartItem": true,
                      "cartItemReferences": [
                          {
                              "entryNumber": "2",
                              "orderType": "택배",
                              "quantity": 1,
                              "product": {
                                  "supplierName": "CAMBRIDGE",
                                  "code": "MFFCW15281NAV-101",
                                  "representationImageForMobile": null,
                                  "color": "네이비",
                                  "supplierBrandCode": null,
                                  "deliveryType": "OWN",
                                  "supplierCode": null,
                                  "colorImages": null,
                                  "url": "/c/BASE-MFFCW15281/p/MFFCW15281NAV-101",
                                  "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFCW15281NAV_LS1.jpg",
                                  "supplierBrandName": null,
                                  "size": "82",
                                  "price": null,
                                  "productSaleType": "GENERAL",
                                  "productReferences": [],
                                  "baseProductCode": "MFFCW15281NAV",
                                  "name": "베이직 WOOL 수트 팬츠",
                                  "soldOutYn": null,
                                  "legacySize": null
                              },
                              "isAvailableStock": true,
                              "isAvailableEmployeeDiscount": false,
                              "totalRealPrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "135,000",
                                  "currencyIso": "KRW",
                                  "price": 135000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalBasePrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "135,000",
                                  "currencyIso": "KRW",
                                  "price": 135000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalWishPrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "270,000",
                                  "currencyIso": "KRW",
                                  "price": 270000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalEmployeeDiscounts": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalDiscounts": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "employeePrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "135,000",
                                  "currencyIso": "KRW",
                                  "price": 135000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "couponDiscounts": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "deliveryCost": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "pickupInformation": null,
                              "isSetCartItem": false,
                              "cartItemReferences": null,
                              "isPickupItem": false
                          },
                          {
                              "entryNumber": "1",
                              "orderType": "택배",
                              "quantity": 1,
                              "product": {
                                  "supplierName": "CAMBRIDGE",
                                  "code": "MFFBW15281NAV-104",
                                  "representationImageForMobile": null,
                                  "color": "네이비",
                                  "supplierBrandCode": null,
                                  "deliveryType": "OWN",
                                  "supplierCode": null,
                                  "colorImages": null,
                                  "url": "/c/BASE-MFFBW15281/p/MFFBW15281NAV-104",
                                  "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFBW15281NAV_LS1.jpg",
                                  "supplierBrandName": null,
                                  "size": "588",
                                  "price": null,
                                  "productSaleType": "GENERAL",
                                  "productReferences": [],
                                  "baseProductCode": "MFFBW15281NAV",
                                  "name": "베이직 WOOL 수트 자켓",
                                  "soldOutYn": null,
                                  "legacySize": null
                              },
                              "isAvailableStock": true,
                              "isAvailableEmployeeDiscount": false,
                              "totalRealPrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "235,000",
                                  "currencyIso": "KRW",
                                  "price": 235000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalBasePrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "235,000",
                                  "currencyIso": "KRW",
                                  "price": 235000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalWishPrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "470,000",
                                  "currencyIso": "KRW",
                                  "price": 470000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalEmployeeDiscounts": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "totalDiscounts": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "employeePrice": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "235,000",
                                  "currencyIso": "KRW",
                                  "price": 235000,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "couponDiscounts": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "deliveryCost": {
                                  "discountRate": null,
                                  "symbol": "원",
                                  "formattedPrice": "0",
                                  "currencyIso": "KRW",
                                  "price": 0,
                                  "wishPrice": null,
                                  "formattedWishPrice": null
                              },
                              "pickupInformation": null,
                              "isSetCartItem": false,
                              "cartItemReferences": null,
                              "isPickupItem": false
                          }
                      ],
                      "isPickupItem": false
                  },
                  {
                      "entryNumber": "0",
                      "orderType": "택배",
                      "quantity": 1,
                      "product": {
                          "supplierName": "STONEFEATHER",
                          "code": "FNTCA15311WHX-101",
                          "representationImageForMobile": null,
                          "color": "화이트",
                          "supplierBrandCode": null,
                          "deliveryType": "OWN",
                          "supplierCode": null,
                          "colorImages": null,
                          "url": "/c/BASE-FNTCA15311/p/FNTCA15311WHX-101",
                          "representationImage": "http://kopimages.kolon.com/Prod_Img/SF/2015/LS1/FNTCA15311WHX_LS1.jpg",
                          "supplierBrandName": null,
                          "size": "M",
                          "price": null,
                          "productSaleType": "GENERAL",
                          "productReferences": [],
                          "baseProductCode": "FNTCA15311WHX",
                          "name": "Unisex Graphic Crewneck T-shirt",
                          "soldOutYn": null,
                          "legacySize": null
                      },
                      "isAvailableStock": true,
                      "isAvailableEmployeeDiscount": false,
                      "totalRealPrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "23,800",
                          "currencyIso": "KRW",
                          "price": 23800,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "totalBasePrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "23,800",
                          "currencyIso": "KRW",
                          "price": 23800,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "totalWishPrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "34,000",
                          "currencyIso": "KRW",
                          "price": 34000,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "totalEmployeeDiscounts": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "totalDiscounts": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "employeePrice": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "23,800",
                          "currencyIso": "KRW",
                          "price": 23800,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "couponDiscounts": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "deliveryCost": {
                          "discountRate": null,
                          "symbol": "원",
                          "formattedPrice": "0",
                          "currencyIso": "KRW",
                          "price": 0,
                          "wishPrice": null,
                          "formattedWishPrice": null
                      },
                      "pickupInformation": null,
                      "isSetCartItem": false,
                      "cartItemReferences": null,
                      "isPickupItem": false
                  }
              ]
          },
          "totalPrice": {
              "totalBasePrice": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "393,800",
                  "currencyIso": "KRW",
                  "price": 393800,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "deliveryCost": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "0",
                  "currencyIso": "KRW",
                  "price": 0,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "totalDiscounts": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "0",
                  "currencyIso": "KRW",
                  "price": 0,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "totalPointDiscounts": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "0",
                  "currencyIso": "KRW",
                  "price": 0,
                  "wishPrice": null,
                  "formattedWishPrice": null
              },
              "totalPrice": {
                  "discountRate": null,
                  "symbol": "원",
                  "formattedPrice": "393,800",
                  "currencyIso": "KRW",
                  "price": 393800,
                  "wishPrice": null,
                  "formattedWishPrice": null
              }
          },
          "usedPoint": 0,
          "usedDeposit": 0,
          "usedGiftCards": null,
          "selectedGiftProducts": null,
          "address": {
              "lastName": null,
              "country": null,
              "defaultYn": null,
              "deliveryProductInfoList": null,
              "city": null,
              "companyName": null,
              "postalCode": "111222",
              "title": null,
              "titleCode": null,
              "formattedAddress": null,
              "visibleInAddressBook": false,
              "roadAddress": null,
              "id": null,
              "line2": null,
              "line1": "경기도 과천시 별양동 코오롱타워 11층",
              "email": null,
              "giftYn": null,
              "town": null,
              "multiAddress": null,
              "deliveryMemo": null,
              "firstName": null,
              "phone": null,
              "shippingAddress": false,
              "middleName": null,
              "billingAddress": false,
              "region": null,
              "cellPhone": "00000000000",
              "defaultAddress": false
          },
          "appliedCoupon1": null,
          "appliedCoupon2": null,
          "appliedCoupon3": null,
          "paymentInfoDataList": [
              {
                  "pgGbEnum": null,
                  "approvalNo": null,
                  "bankCode": null,
                  "accountCode": null,
                  "amount": 0,
                  "code": null,
                  "payCompleteFlag": null,
                  "creditCardCompany": null,
                  "approvalTime": null,
                  "bankName": null,
                  "receiptPlanTime": null,
                  "tid": null,
                  "receiptName": null,
                  "paymentNo": null,
                  "prtcCode": null,
                  "pgSeq": null,
                  "creditCardCode": null,
                  "escrowDeliveryTime": null,
                  "partCancelPrice": null,
                  "paymentMethodEnum": "EKOLONPOINTS"
              },
              {
                  "pgGbEnum": null,
                  "approvalNo": null,
                  "bankCode": null,
                  "accountCode": null,
                  "amount": 0,
                  "code": null,
                  "payCompleteFlag": null,
                  "creditCardCompany": null,
                  "approvalTime": null,
                  "bankName": null,
                  "receiptPlanTime": null,
                  "tid": null,
                  "receiptName": null,
                  "paymentNo": null,
                  "prtcCode": null,
                  "pgSeq": null,
                  "creditCardCode": null,
                  "escrowDeliveryTime": null,
                  "partCancelPrice": null,
                  "paymentMethodEnum": "DEPOSIT"
              }
          ]
      },
      "point": {
          "unavailablePoint": "0",
          "depositAmount": "99,999,999",
          "expiringPoint": "360",
          "employeePoint": {
              "employeeDcLimitAmount": "4,611,000",
              "welfareLimitAmount": "0",
              "totalEmployeePoint": "4,611,000"
          },
          "availablePoint": "16,180",
          "couponCount": "0"
      },
      "cardDiscountPromotions": {},
      "siteFirstFreeGiftItems": []
    }
    ));
  });

  router.get(['/Order/Complete'], (req, res) => {
    const path = 'Order/Complete';
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req, 
    {
      "order": {
          "orderNumber": "17071287000",
          "createdDate": "2017.07.12",
          "payments": null,
          "creditCardAmount": null,
          "deliveryType": "DELIVERYSERVICE",
          "discount": null,
          "items": [
              {
                  "consignmentEntryCode": "8935062189952",
                  "originDeliveryCode": "17071213912",
                  "entryCode": "8935094911022",
                  "product": {
                      "supplierName": "CAMBRIDGE",
                      "code": "MFFBW15281NAV-104",
                      "representationImageForMobile": null,
                      "color": "네이비",
                      "supplierBrandCode": null,
                      "deliveryType": "OWN",
                      "supplierCode": null,
                      "colorImages": null,
                      "url": null,
                      "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFBW15281NAV_LS1.jpg",
                      "supplierBrandName": null,
                      "size": "588",
                      "price": null,
                      "productSaleType": "GENERAL",
                      "productReferences": [],
                      "baseProductCode": "MFFBW15281NAV",
                      "name": "베이직 WOOL 수트 자켓",
                      "soldOutYn": null,
                      "legacySize": null
                  },
                  "displayedQuantity": "1",
                  "quantity": 1,
                  "formattedDeliveryCost": "0",
                  "paymentNo": null,
                  "isReturnable": false,
                  "formattedPrice": "235,000",
                  "displayedStatus": "결제완료",
                  "statusUpdatedDate": null,
                  "deliveryInformation": null,
                  "deliveryAddress": {
                      "lastName": null,
                      "country": null,
                      "defaultYn": null,
                      "deliveryProductInfoList": null,
                      "city": null,
                      "companyName": null,
                      "postalCode": "111222",
                      "title": null,
                      "titleCode": null,
                      "formattedAddress": null,
                      "visibleInAddressBook": null,
                      "roadAddress": null,
                      "id": "9121413791767",
                      "line2": null,
                      "line1": "경기도 과천시 별양동 코오롱타워 11층",
                      "email": null,
                      "giftYn": null,
                      "town": null,
                      "multiAddress": null,
                      "deliveryMemo": null,
                      "firstName": "김달님",
                      "phone": null,
                      "shippingAddress": null,
                      "middleName": null,
                      "region": null,
                      "cellPhone": "00000000000"
                  },
                  "price": 235000,
                  "isTrackable": false,
                  "isExchangeable": false,
                  "pickupInformation": null,
                  "isPickupItem": false,
                  "isCancelable": true,
                  "deliveryCost": 0,
                  "status": "COMPLETEPAYMENT",
                  "orderDetailReason": null,
                  "requestContent": null
              },
              {
                  "consignmentEntryCode": "8935062157184",
                  "originDeliveryCode": "17071213912",
                  "entryCode": "8935094943790",
                  "product": {
                      "supplierName": "CAMBRIDGE",
                      "code": "MFFCW15281NAV-101",
                      "representationImageForMobile": null,
                      "color": "네이비",
                      "supplierBrandCode": null,
                      "deliveryType": "OWN",
                      "supplierCode": null,
                      "colorImages": null,
                      "url": null,
                      "representationImage": "http://kopimages.kolon.com/Prod_Img/CM/2015/LS1/MFFCW15281NAV_LS1.jpg",
                      "supplierBrandName": null,
                      "size": "82",
                      "price": null,
                      "productSaleType": "GENERAL",
                      "productReferences": [],
                      "baseProductCode": "MFFCW15281NAV",
                      "name": "베이직 WOOL 수트 팬츠",
                      "soldOutYn": null,
                      "legacySize": null
                  },
                  "displayedQuantity": "1",
                  "quantity": 1,
                  "formattedDeliveryCost": "0",
                  "paymentNo": null,
                  "isReturnable": false,
                  "formattedPrice": "135,000",
                  "displayedStatus": "결제완료",
                  "statusUpdatedDate": null,
                  "deliveryInformation": null,
                  "deliveryAddress": {
                      "lastName": null,
                      "country": null,
                      "defaultYn": null,
                      "deliveryProductInfoList": null,
                      "city": null,
                      "companyName": null,
                      "postalCode": "111222",
                      "title": null,
                      "titleCode": null,
                      "formattedAddress": null,
                      "visibleInAddressBook": null,
                      "roadAddress": null,
                      "id": "9121413791767",
                      "line2": null,
                      "line1": "경기도 과천시 별양동 코오롱타워 11층",
                      "email": null,
                      "giftYn": null,
                      "town": null,
                      "multiAddress": null,
                      "deliveryMemo": null,
                      "firstName": "김달님",
                      "phone": null,
                      "shippingAddress": null,
                      "middleName": null,
                      "region": null,
                      "cellPhone": "00000000000"
                  },
                  "price": 135000,
                  "isTrackable": false,
                  "isExchangeable": false,
                  "pickupInformation": null,
                  "isPickupItem": false,
                  "isCancelable": true,
                  "deliveryCost": 0,
                  "status": "COMPLETEPAYMENT",
                  "orderDetailReason": null,
                  "requestContent": null
              }
          ],
          "displayedDeliveryType": "일반배송",
          "totalBasePrice": "370,000",
          "totalRealPrice": "370,000",
          "orderDetailPrice": "370,000",
          "deliveryCost": "0",
          "payable": null
        }
      }
    ));
  });

  router.get('/*', (req, res) => {
    const path = req.params[0];
    res.render(getViewPath(path, req.mobileViewMode), toJson(path, req));
  });

  return router;
};

export default defaultRouter;
