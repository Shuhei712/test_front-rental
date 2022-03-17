<template>
  <section class="detail">
    <top-bar title="機材詳細"></top-bar>
    <div class="detail__inner py-5 py-lg-16">
      <div class="content px-2 px-lg-0">
        <div class="info__categories--sp d-flex px-3 py-1 mb-3">
          <div v-for="(list, index) in productList.categoryLists" :key="index" class="search-tag text-body-2 mr-2">
            <v-icon class="mr-2">mdi-check</v-icon>{{ list.name }}
          </div>
        </div>
        <div class="maker--sp text-body-2">{{ productList.maker }}</div>
        <div class="name--sp text-subtitle-1 letter-space-015em mt-2 font-weight-bold">
          {{ productList.name }}
        </div>
        <div class="detail__top d-flex flex-column flex-sm-row">
          <div class="top__image mr-0 mr-sm-5 d-flex d-sm-block">
            <div class="image__main mr-3 mr-md-0 mt-3 mt-md-0">
              <img :src="productList.image" :alt="productList.name" />
            </div>
            <div class="image__sub mt-3 mt-md-0 flex-grow-1">
              <button id="sub--01"></button>
              <button id="sub--02"></button>
              <button id="sub--03"></button>
              <button id="sub--04"></button>
              <button id="sub--05"></button>
              <button id="sub--06"></button>
            </div>
          </div>
          <div class="top__info flex-grow-1">
            <div class="info__categories d-flex flex-wrap px-3 py-1">
              <div v-for="(list, index) in productList.categoryLists" :key="index" class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>{{ list.name }}
              </div>
            </div>
            <div class="info__main mt-5">
              <div class="maker text-body-2">{{ productList.maker }}</div>
              <div class="name text-h6 letter-space-015em mt-5">
                {{ productList.name }}
              </div>
              <div class="price d-flex align-center mt-8 text-body-2">
                <span class="price__head text-body-2 px-3 py-1">レンタル価格</span>
                <span class="price__day text-body-2 letter-space-015em px-3 py-1">1日/税別</span>
                <span class="price__product text-h5 letter-space-015em px-3 py-1">{{ productList.price }}</span
                >円
                <v-btn class="price__more text-body-2 ml-5" color="primary"
                  ><span class="price__class text-body-1 mr-2 font-weight-bold text-center">{{
                    productList.class
                  }}</span
                  >2日目以降の料金</v-btn
                >
              </div>
              <div class="price--md d-flex align-center flex-wrap mt-5 text-body-2">
                <div class="mr-4">
                  <div class="price__head text-caption px-3 py-2 text-no-wrap text-center">レンタル価格</div>
                  <div class="price__day text-caption letter-space-015em px-3 py-2 text-center text-no-wrap">
                    1日/税別
                  </div>
                </div>
                <span class="price__product text-h5 letter-space-015em font-weight-medium">{{
                  productList.price
                }}</span>
                円
                <button class="price__more pa-2 ml-4">
                  <span class="price__class text-caption mb-1">{{ productList.class }}</span>
                  2日目以降<br />の料金
                </button>
              </div>
              <div class="price--sp d-flex justify-space-between align-center flex-wrap mt-5 text-body-2">
                <div>
                  <div class="price__head text-caption px-3 py-2 text-no-wrap text-center">レンタル価格</div>
                  <div class="price__day text-caption letter-space-015em px-3 py-2 text-center text-no-wrap">
                    1日/税別
                  </div>
                </div>
                <span class="price__product text-h5 letter-space-015em font-weight-medium">{{
                  productList.price
                }}</span>
                円
                <button class="price__more pa-2 ml-4">
                  <span class="price__class text-caption mb-1">{{ productList.class }}</span>
                  2日目以降<br />の料金
                </button>
              </div>
              <div class="tags mt-8">
                <v-btn
                  v-for="(list, index) in productList.tagLists"
                  :key="index"
                  class="product-tag px-3 py-1 mr-2 mb-2"
                  elevation="0"
                  tile
                  small
                  >{{ list.name }}</v-btn
                >
              </div>
              <div class="descripsion line-height-25em mt-5 text-body-2">
                {{ productList.description }}
              </div>
              <div class="case-size mt-5">
                <v-btn color="primary"><v-icon class="mr-2">mdi-archive-outline</v-icon>ケースサイズ</v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="detail__information mt-15">
          <div class="information__menu d-flex justify-center">
            <v-btn v-scroll-to="{ el: '#product-info', offset: -200 }" class="mx-3" text
              ><v-icon class="mr-2" color="primary">mdi-information-outline</v-icon>製品情報<v-icon color="outline"
                >mdi-chevron-down</v-icon
              ></v-btn
            >
            <v-btn v-scroll-to="{ el: '#product-specification', offset: -200 }" class="mx-3" text
              ><v-icon class="mr-2" color="primary">mdi-database-outline</v-icon>仕様<v-icon color="outline"
                >mdi-chevron-down</v-icon
              ></v-btn
            >
            <v-btn v-scroll-to="{ el: '#product-document', offset: -200 }" class="mx-3" text
              ><v-icon class="mr-2" color="primary">mdi-text-box-outline</v-icon>この機材の資料<v-icon color="outline"
                >mdi-chevron-down</v-icon
              ></v-btn
            >
            <v-btn v-scroll-to="{ el: '#product-related', offset: -200 }" class="mx-3" text
              ><v-icon class="mr-2" color="primary">mdi-link</v-icon>関連機材<v-icon color="outline"
                >mdi-chevron-down</v-icon
              ></v-btn
            >
          </div>
          <div class="information__menu--sp pa-3">
            <p class="text-body-2 text-center">クリックでページ内項目にジャンプします</p>
            <v-row align="center">
              <v-col cols="6">
                <v-btn v-scroll-to="{ el: '#product-info', offset: -200 }" class="mx-3" text
                  ><v-icon class="mr-2" color="primary">mdi-information-outline</v-icon>製品情報<v-icon color="outline"
                    >mdi-chevron-down</v-icon
                  ></v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn v-scroll-to="{ el: '#product-specification', offset: -200 }" class="mx-3" text
                  ><v-icon class="mr-2" color="primary">mdi-database-outline</v-icon>仕様<v-icon color="outline"
                    >mdi-chevron-down</v-icon
                  ></v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn v-scroll-to="{ el: '#product-document', offset: -200 }" class="mx-3" text
                  ><v-icon class="mr-2" color="primary">mdi-text-box-outline</v-icon>この機材の資料<v-icon
                    color="outline"
                    >mdi-chevron-down</v-icon
                  ></v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn v-scroll-to="{ el: '#product-related', offset: -200 }" class="mx-3" text
                  ><v-icon class="mr-2" color="primary">mdi-link</v-icon>関連機材<v-icon color="outline"
                    >mdi-chevron-down</v-icon
                  ></v-btn
                >
              </v-col>
            </v-row>
          </div>
          <div class="information__content">
            <section id="product-info" class="product-info mt-15">
              <div class="product-info__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-information-outline</v-icon>製品情報
              </div>
              <div class="product-info__content mt-10">
                <table>
                  <tbody>
                    <tr>
                      <th class="text-center">この商品の特徴</th>
                      <td>
                        <ul>
                          <li>
                            ATEM Mini Extremeの全機能に加え、9系統のH.264ビデオストリームをリアルタイムで収
                            録でき、8系統のクリーンな入力とプログラムビデオを得ることが可能
                          </li>
                          <li>
                            DaVinci Resolveプロジェクトファイルも保存されるので、後からプロジェクトの作り替えや編
                            集に使用可能
                          </li>
                          <li>コントロールソフトウェアのダウンロード先はこちら</li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th class="text-center">インターフェース</th>
                      <td>
                        <ul>
                          <li><img src="/img/detail/info.png" alt="" /></li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section id="product-specification" class="product-specification mt-15">
              <div class="product-specification__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-database-outline</v-icon>仕様
              </div>
              <div class="product-specification__content mt-10">
                <table style="width: 100%; border-collapse: collapse">
                  <thead>
                    <tr>
                      <th colspan="2" class="pa-2 bg-primary text-white text-subtitle-1 font-weight-bold">接続</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="w-400 bg-cushion text-center">ビデオ入力合計</td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">出力合計</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">Aux出力合計</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">オーディオ入力合計</td>
                      <td>3.5mmステレオミニジャック x2</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">オーディオ出力合計</td>
                      <td>3.5mmステレオミニジャック x1</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">タイムコード接続</td>
                      <td>未対応</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">HDMIビデオ入力</td>
                      <td>HDMIタイプA x8（10-bit HD切替可能）、 2chのエンベデッドオーディオ</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">ビデオ入力再同期</td>
                      <td>全8入力のHDMI入力で対応</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">フレームレート / フォーマットコンバーター</td>
                      <td>全8入力のHDMI入力で対応</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">HDMIプログラム出力</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">イーサネット</td>
                      <td>
                        イーサネットは10/100/1000 BaseTをサポート（ライブ配信、ソフトウェアコントロール、
                        ソフトウェアアップデート、直接/ネットワーク経由でのパネル接続用）
                      </td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">コンピューターインターフェース</td>
                      <td>
                        USBタイプC 3.1 Gen1 x2（外付けドライブ収録、ウェブカム出力、ソフトウェアコントロ
                        ール、ソフトウェアアップデート、パネル接続用）
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table style="width: 100%; border-collapse: collapse">
                  <thead>
                    <tr>
                      <th colspan="2" class="pa-2 bg-primary text-white text-subtitle-1 font-weight-bold">
                        フォーマット
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="w-400 bg-cushion text-center">コンピューターインターフェース</td>
                      <td>
                        720p50、720p59.94、720p60 1080p23.98、1080p24、1080p25、1080p29.97、1080p30、1080p50、
                        1080p59.94、1080p601080i50、1080i59.94、1080i60
                      </td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">HDビデオ出力フォーマット</td>
                      <td>1080p23.98、1080p24、1080p25、1080p29.97、1080p30、1080p50、 1080p59.94、1080p60</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">ビデオ配信フォーマット</td>
                      <td>1080p23.98、1080p24、1080p25、1080p29.97、1080p30、1080p50、 1080p59.94、1080p60</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">Ultra HDビデオフォーマット</td>
                      <td>未対応</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">ビデオサンプリング</td>
                      <td>4:2:2 YUV</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">色精度</td>
                      <td>10-bit</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">カラースペース</td>
                      <td>Rec. 709</td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">コンピューターからのHDMI入力解像度</td>
                      <td>
                        1280 x 720p 50Hz、59.94Hz および60Hz 1920 x 1080p 23.98、24、25、29.97、30、50, 59.94および60Hz
                        1920 x 1080i 50、59.94Hz および60Hz
                      </td>
                    </tr>
                    <tr>
                      <td class="w-400 bg-cushion text-center">カラースペース変換</td>
                      <td>ハードウェアベースのリアルタイム</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section id="product-document" class="product-document mt-15">
              <div class="product-document__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-text-box-outline</v-icon>この機材の資料
              </div>
              <div class="product-document__content d-flex justify-center align-start flex-wrap mt-10">
                <v-card
                  v-for="(list, index) in productList.documentLists"
                  :key="index"
                  width="300"
                  elevation="0"
                  class="document d-flex flex-column align-center pa-5 ma-5"
                  link>
                  <div class="document__img">
                    <img :src="list.image" :alt="list.title" />
                  </div>
                  <div class="document__title text-center mt-3">
                    {{ list.title }}
                  </div>
                </v-card>
              </div>
            </section>
            <section id="product-related" class="product-related mt-15">
              <div class="product-related__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-link</v-icon>関連機材
              </div>
              <div class="product-related__content mt-10">
                <div v-for="(list, index) in productList.relatedLists" :key="index" class="related__product mt-5">
                  <div class="product__categories d-flex px-3 py-1">
                    <div
                      v-for="category in list.categoryLists"
                      :key="category.name"
                      class="search-tag text-body-2 mr-2">
                      <v-icon class="mr-2">mdi-check</v-icon>{{ category.name }}
                    </div>
                  </div>
                  <div class="product__related mt-5">
                    <v-row>
                      <v-col v-for="product in list.productLists" :key="product.name" cols="6" sm="3" md="2">
                        <item-card :path="product.path" :maker="product.maker" :name="product.name"></item-card>
                      </v-col>
                    </v-row>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="back-btn text-center mt-15">
        <v-btn text
          ><v-icon class="mr-2" color="primary">mdi-chevron-left</v-icon>オンラインイベント機器一覧に戻る</v-btn
        >
        <v-btn text><v-icon class="mr-2" color="primary">mdi-chevron-left</v-icon>スイッチャー一覧に戻る</v-btn>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      productList: {
        name: 'ライブプロダクションスイッチャー ATEM Mini Extreme ISO',
        image: '/img/detail/main.png',
        maker: 'Blackmagic Design',
        price: '140,000',
        class: 'A',
        description:
          '分かりやすい概要説明文※これはblackmagicdesignHPの文章コピペなので適当なものに変 えてください※4行で綺麗に収まりますが、これより多くても少なくてもOK プロフェッショナルな放送現場に必要な最先端の機能とテクノロジーを搭載した、プロ仕様のライ ブプロダクションスイッチャー。',
        categoryLists: [{ name: 'オンラインイベント機器' }, { name: 'スイッチャー' }],
        tagLists: [
          { name: 'ハイビジョン' },
          { name: 'スケーラー内蔵' },
          { name: '音声対応' },
          { name: 'エンベデッド' },
          { name: 'PinP' },
          { name: 'プレビュー' },
          { name: 'キー抜き' },
          { name: 'キャプチャ' },
        ],
        documentLists: [
          {
            title: '取扱説明書(メーカーHPリンク)',
            link: '',
            image: '/img/detail/link.png',
          },
          {
            title: 'オリジナルフレーム図面',
            link: '',
            image: '/img/detail/pdf.png',
          },
          {
            title: 'オリジナルフレーム取扱説明書',
            link: '',
            image: '/img/detail/pdf.png',
          },
        ],
        relatedLists: [
          {
            categoryLists: [{ name: 'オンラインイベント機器' }, { name: 'スイッチャー' }],
            productLists: [
              {
                path: '/img/detail/related_01.png',
                maker: 'Panasonic',
                name: 'ET-D75LE6ズームレンズ 1.0～1.2:1',
              },
              {
                path: '/img/detail/related_02.png',
                maker: 'Panasonic',
                name: 'ET-D75LE10ズームレンズ 1.3～1.8:1',
              },
              {
                path: '/img/detail/related_03.png',
                maker: 'Panasonic',
                name: 'ET-D75LE20ズームレンズ 1.8～2.6:1',
              },
              {
                path: '/img/detail/related_04.png',
                maker: 'Panasonic',
                name: 'ET-D75LE30ズームレンズ 2.6〜5.0:1',
              },
              {
                path: '/img/detail/related_05.png',
                maker: 'Panasonic',
                name: 'ET-D75LE30ズームレンズ 4.9〜7.9:1',
              },
              {
                path: '/img/detail/related_06.png',
                maker: 'Panasonic',
                name: 'ET-D75LE6ズームレンズ 1.0～1.3:1',
              },
              {
                path: '/img/detail/related_07.png',
                maker: 'Panasonic',
                name: 'ET-D75LE10ズームレンズ 1.3～1.7:1',
              },
              {
                path: '/img/detail/related_08.png',
                maker: 'Panasonic',
                name: 'ET-D75LE20ズームレンズ 1.8～2.5:1',
              },
            ],
          },
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.detail {
  position: relative;
  height: auto;
  overflow-x: hidden;

  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .content {
    width: 100%;

    .info__categories--sp {
      background-color: $cushion;
      display: none !important;

      @include mq(md) {
        display: flex !important;
      }
    }

    .maker--sp,
    .name--sp {
      display: none !important;

      @include mq(sm) {
        display: block !important;
      }
    }
  }

  .detail__top {
    .top__image {
      .image__main {
        img {
          width: 400px;
          height: 400px;
          object-fit: cover;

          @include mq(md) {
            width: 250px;
            height: 250px;
            object-fit: cover;
          }

          @include mq(sm) {
            width: 220px;
            height: 220px;
            object-fit: cover;
          }
        }
      }
      .image__sub {
        button {
          width: 55px;
          height: 55px;
          border: 1px solid $line;
          border-radius: 50%;
        }

        #sub--01 {
          border: 0;
          background-image: url('/img/detail/sub_01.png');
        }

        #sub--02 {
          border: 0;
          background-image: url('/img/detail/sub_02.png');
        }

        #sub--03 {
          border: 0;
          background-image: url('/img/detail/sub_03.png');
        }
      }
    }

    .top__info {
      .info__categories {
        background-color: $cushion;

        @include mq(md) {
          display: none !important;
        }
      }

      .info__main {
        .maker,
        .name {
          @include mq(sm) {
            display: none !important;
          }
        }
      }

      .price {
        @include mq(md) {
          display: none !important;
        }
        .price__head {
          background-color: $accent;
          color: #ffffff;
        }
        .price__day {
          background-color: $cushion;
        }

        .price__class {
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 25px;
          border-radius: 50%;
          background-color: #ffffff;
          color: $primary;
        }
      }

      .price--md,
      .price--sp {
        display: none !important;
        .price__head {
          background-color: $accent;
          color: #ffffff;
        }
        .price__day {
          background-color: $cushion;
        }

        .price__more {
          min-width: 75px;
          display: inline-block;
          font-size: 11px;
          line-height: 15px;
          border-radius: 10px;
          height: 100%;
          background-color: $primary;
          color: #ffffff;

          span {
            display: block;
            margin: 0 auto;
            font-size: 11px;
            line-height: 11px;
            font-weight: bold;
            width: 25px;
            height: 25px;
            line-height: 25px;
            border-radius: 50%;
            background-color: #ffffff;
            color: $primary;
          }
        }

        .price__class {
          display: inline-block;
          width: 25px;
          height: 25px;
          line-height: 25px;
          border-radius: 50%;
          background-color: #ffffff;
          color: $primary;
        }
      }

      .price--md {
        @include mq(md) {
          display: flex !important;
        }

        @include mq(sm) {
          display: none !important;
        }
      }

      .price--sp {
        @include mq(sm) {
          display: flex !important;
        }
      }

      .product-tag {
        background-color: $cushion;
        color: $primary;
      }
    }
  }

  .detail__information {
    position: relative;
    .information__menu {
      top: 200px;
      width: 100%;
      background-color: $cushion;

      @include mq(sm) {
        display: none !important;
      }
    }

    .information__menu--sp {
      border: 1px solid $line;
      display: none;

      @include mq(sm) {
        display: block !important;
      }
    }

    .information__content {
      // 以下のCSSは読み込むHTMLに従属させる
      .w-400 {
        width: 400px;
      }

      .bg-primary {
        background-color: $primary;
      }

      .bg-cushion {
        background-color: $cushion;
      }

      // 以下のCSSは読み込むHTMLに従属させる
      .product-info__content {
        width: 100%;
        table,
        tbody,
        tr {
          @include mq(md) {
            width: 100%;
            display: block;
          }
        }
        th {
          width: 400px;

          @include mq(md) {
            width: 100%;
            display: block;
            background-color: $cushion;
            padding: 10px 20px;
          }
        }

        td {
          @include mq(md) {
            width: 100%;
            display: block;
          }
        }

        ul {
          padding-left: 0;
        }

        li {
          list-style: none;
          padding: 10px 20px;
          border-left: 2px solid $line;
          margin-bottom: 20px;

          img {
            width: 100%;
            object-fit: cover;

            @include mq(md) {
              margin-top: 20px;
            }
          }

          @include mq(md) {
            margin-top: 20px;
            border-left: 0;
            padding: 5px 10px;
          }
        }
      }

      // 以下のCSSは読み込むHTMLに従属させる
      .product-specification__content {
        width: 100%;

        th,
        td {
          padding: 10px 20px;
          border: solid 1px $line;
        }

        th {
          @include mq(md) {
            border: 0;
          }
        }

        td {
          @include mq(md) {
            display: block;
            width: 100% !important;
            border: 0;
          }
        }

        td:first-child {
          @include mq(md) {
            color: $primary;
          }
        }
      }

      .product-document__content {
        .document__img {
          img {
            width: 150px;
            object-fit: cover;

            @include mq(md) {
              width: 100px;
            }
          }
        }
      }

      .product-related__content {
        .product__categories {
          background-color: $cushion;
        }
      }
    }
  }
}
</style>
