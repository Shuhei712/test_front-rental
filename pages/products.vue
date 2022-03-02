<template>
  <section class="products">
    <top-bar title="スイッチャー 一覧"></top-bar>
    <div class="products__inner d-flex py-16">
      <category-lists></category-lists>
      <div class="content ml-15">
        <div class="product__search d-flex align-center">
          <div class="search__number text-center px-3 text-body-2">
            <span class="text-h5 mr-2">50</span>件<br />見つかりました
          </div>
          <div class="serach__condition flex-grow-1 pa-3">
            <div class="condition__head text-body-2 d-flex align-center">
              現在の検索条件<v-icon>mdi-chevron-right</v-icon
              ><v-btn text
                ><v-icon color="primary">mdi-text-search</v-icon
                >変更して絞り込む</v-btn
              >
            </div>
            <div class="condition__tags mt-1 d-flex align-center">
              <div class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>スイッチャー
              </div>
              <div class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>Blackmagic Design
              </div>
              <div class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>0-10,000円
              </div>
            </div>
          </div>
        </div>
        <div class="product__sort mt-3 d-flex align-center">
          <div class="sort__release d-flex align-center mr-8">
            <div class="release__head mr-2 px-5 py-1 text-body-2 text-white">
              発売日
            </div>
            <v-btn-toggle mandatory dense tile group>
              <v-btn text>新着順</v-btn>
              <v-btn text>古い順</v-btn>
            </v-btn-toggle>
          </div>
          <div class="sort__price d-flex align-center">
            <div class="price__head mr-2 px-5 py-1 text-body-2 text-white">
              価格
            </div>
            <v-btn-toggle mandatory dense tile group>
              <v-btn text>低い順</v-btn>
              <v-btn text>高い順</v-btn>
            </v-btn-toggle>
          </div>
          <v-spacer></v-spacer>
          <v-btn class="condition__reset" color="line" outlined
            >カテゴリ以外の条件をリセット</v-btn
          >
        </div>
        <div class="product__main">
          <v-card
            v-for="(list, index) in productLists"
            :key="index"
            class="product mt-8"
            elevation="0"
            link
          >
            <div class="product__info d-flex">
              <div class="info__img mr-3">
                <img :src="list.image" :alt="list.name" />
              </div>
              <div class="info__details flex-grow-1 d-flex flex-column">
                <div class="categories d-flex px-3 py-1">
                  <div
                    v-for="category in list.categoryLists"
                    :key="category.name"
                    class="search-tag text-body-2 mr-2"
                  >
                    <v-icon class="mr-2">mdi-check</v-icon>{{ category.name }}
                  </div>
                </div>
                <div class="name mt-2">
                  <div class="name__maker text-body-2">{{ list.maker }}</div>
                  <div
                    class="name__product text-h6 font-weight-bold letter-space-015em mt-2"
                  >
                    {{ list.name }}
                  </div>
                </div>
                <v-spacer></v-spacer>
                <div class="price d-flex align-center mb-2 text-body-2">
                  <span class="price__head text-body-2 px-3 py-1"
                    >レンタル価格</span
                  >
                  <span
                    class="price__day text-body-2 letter-space-015em px-3 py-1"
                    >1日/税別</span
                  >
                  <span
                    class="price__product text-h5 letter-space-015em px-3 py-1"
                    >{{ list.price }}</span
                  >円
                  <v-btn class="price__more text-body-2 ml-5" color="primary"
                    ><span
                      class="price__class text-body-1 mr-2 font-weight-bold text-center"
                      >{{ list.class }}</span
                    >2日目以降の料金</v-btn
                  >
                </div>
              </div>
            </div>
            <div class="product__tags mt-2">
              <v-btn
                v-for="tag in list.tagLists"
                :key="tag.name"
                class="product-tag px-3 py-1 mr-2"
                elevation="0"
                tile
                small
                >{{ tag.name }}</v-btn
              >
            </div>
            <div class="product__descriptions mt-2">
              {{ list.description }}
            </div>
          </v-card>
        </div>
        <div class="product__pagination text-center mt-15">
          <v-pagination v-model="page" :length="2"></v-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      productLists: [
        {
          name: 'ストリーミングビデオスイッチャー V-160HD',
          image: '/img/products/product_img_01.png',
          maker: 'SAMSUNG',
          price: '38,000',
          class: 'A',
          description:
            'ハイブリッド・イベントをサポートする豊富な入出力と多彩な演出を実現するための機能を備えた可搬性の高いストリーミング・ビデオ・スイッチャー',
          categoryLists: [
            { name: 'オンラインイベント機器' },
            { name: 'スイッチャー' },
          ],
          tagLists: [],
        },
        {
          name: '3.9-7.8mm(W1000×H500) 屋内・屋外兼用 シースルー BlackModel ATL3.9-7.8-L',
          image: '/img/products/product_img_02.png',
          maker: 'ArkVentures',
          price: '25,000',
          class: 'A',
          description:
            '屋内でも使用可能。輝度1500-2000nitで、明るい環境でも使用可能な透過型LED簡単に取り付け・取り外しができ、15枚までスタックできるため、大画面を実現できます。',
          categoryLists: [
            { name: 'LEDディスプレイ' },
            { name: '屋外・屋外兼用' },
          ],
          tagLists: [],
        },
        {
          name: 'レーザープロジェクター 50000lm PT-RQ50KJ',
          image: '/img/products/product_img_03.png',
          maker: 'Panasonic',
          price: '1,400,000',
          class: 'A',
          description:
            '50,000lmの明るさとネイティブ4K解像度が創り出す圧倒的な臨場感',
          categoryLists: [
            { name: 'プロジェクター本体/レンズ' },
            { name: '10000ml以上' },
          ],
          tagLists: [{ name: '4k対応機器' }],
        },
        {
          name: '4K対応 80in 液晶ディスプレイ PN-H801',
          image: '/img/products/product_img_04.png',
          maker: 'SHARP',
          price: '140,000',
          class: 'A',
          description:
            '縦置き設置可能な高精細4Kモニター。アップコンバートエンジン搭載で、フルHDなどの従来解像度の映像コンテンツでも、4K解像度で美しく再生可能。',
          categoryLists: [
            { name: 'ディスプレイ/モニター' },
            { name: '液晶ディスプレイ(60インチ以上)' },
          ],
          tagLists: [
            { name: '4k対応機器' },
            { name: '16:9' },
            { name: 'スピーカー内蔵' },
            { name: 'D-sub端子' },
          ],
        },
        {
          name: 'disguise Render Stream Server rx Ⅱ',
          image: '/img/products/product_img_05.png',
          maker: 'disguise',
          price: '200,000',
          class: 'A',
          description:
            'rxよりも40%多くのグラフィックス処理能力を備えたrx II最新のNvidia A6000GPUを搭載rxレンジは、クラスターレンダリングのためのシンプルなターンキーソリューションであり、ワークフローを高速化します。',
          categoryLists: [{ name: 'メディアサーバー ' }],
          tagLists: [],
        },
        {
          name: 'ブルーレイ&ハードディスクレコーダー DMR-MC500',
          image: '/img/products/product_img_06.png',
          maker: 'Panasonic',
          price: '22,000',
          class: 'A',
          description:
            'HD-SDI/HDMI入出力搭載、フルHD記録のレコーダー。BDダイレクト記録・HDD/BD同時記録機能あり、USB-HDD/USBメモリー転送対応RS232Cによる外部制御対応など、業務仕様',
          categoryLists: [
            { name: 'オンラインイベント機器' },
            { name: 'スイッチャー' },
          ],
          tagLists: [
            { name: 'HDMI' },
            { name: 'SD-SDI' },
            { name: 'HD-SDI' },
            { name: 'コンポジット' },
          ],
        },
        {
          name: '4Kスクリーン管理システム S3-4K',
          image: '/img/products/product_img_07.png',
          maker: 'BARCO',
          price: '300,000',
          class: 'A',
          description:
            'S3-4K シャーシのインターリンクにより、入力、出力またはレイヤーの拡張が可能。クロスプラットフォーム Event Master ツールセットで簡単にセットアップでき、ステップを踏みながらシステム設定をすることができます。',
          categoryLists: [
            { name: '映像周辺機器' },
            { name: 'シームレススイッチャー' },
          ],
          tagLists: [
            { name: '4k対応機器' },
            { name: 'HDCP対応' },
            { name: 'スケーラー内蔵' },
            { name: 'シームレス' },
            { name: 'PinP' },
            { name: 'プレビュー' },
            { name: 'キー抜き' },
          ],
        },
        {
          name: '4K対応 HDMIファイバーケーブル 100m / 70m / 50m / 30m /10m APF100.70.50.30.10-HDM',
          image: '/img/products/product_img_08.png',
          maker: 'CANARE',
          price: '1,000~7,000',
          class: 'A',
          description:
            'プラスチックファイバで曲げやすく扱いやすいケーブルです。グラスファイバ仕様を超える強度。定電圧ICにより外部給電は不要です。※すべての機器での動作を保証するものではありません。',
          categoryLists: [
            { name: 'ケーブル' },
            { name: 'HDMIケーブル / DVIケーブル' },
          ],
          tagLists: [{ name: '4k対応機器' }],
        },
        {
          name: '4Kデジタルビデオカメラ ハンディタイプ HC-VX992M-W',
          image: '/img/products/product_img_09.png',
          maker: 'Panasonic',
          price: '6,000',
          class: 'A',
          description:
            '持ち歩きに適した、軽量・コンパクトな4Kビデオカメラです。',
          categoryLists: [
            { name: 'カメラ' },
            { name: 'ビデオカメラ（HD / 4K）' },
          ],
          tagLists: [{ name: '4k対応機器' }],
        },
        {
          name: 'GearVR S6/S6 edge/S7 edge対応SM-R322NZWAXJP',
          image: '/img/products/product_img_10.png',
          maker: 'SAMSUNG',
          price: '26,000',
          class: 'A',
          description:
            'ヘッドマウントディスプレイを装着するだけで、その場にいるかのようなVR体験が可能。360°に拡がるVRの世界で、手に汗握る迫力あるゲームやお気に入りのアーティストが目の前にいるかのようなライブ映像など、膨大なコンテンツを楽しむことができます。',
          categoryLists: [
            {
              name: 'メディアアプリケーション /センサー / インタラクティブ関連',
            },
            { name: 'VR機器' },
          ],
          tagLists: [],
        },
        {
          name: 'ホワイトスペース帯 1.2GHz帯 ワイヤレスマイク',
          image: '/img/products/product_img_11.png',
          maker: 'SHURE',
          price: 'ask',
          class: 'A',
          description:
            '多チャンネルプランに対応したワイヤレスマイク。同一スペース内でのワイヤレスマイクの同時使用可能本数が格段に増え、またデジタルワイヤレスシステムを導入することで、さらに使用できる本数を増やしました。',
          categoryLists: [{ name: '音響機器' }, { name: 'ワイヤレス機器' }],
          tagLists: [],
        },
        {
          name: 'ワイヤレスインカム 充電器 AC50',
          image: '/img/products/product_img_12.png',
          maker: 'HME',
          price: 'included',
          class: 'A',
          description:
            'DX410シリーズ用充電器・BP410用バッテリーチャージャー（BAT50専用）4つのバッテリーを同時に充電することができ、4つのバッテリーストックベイ（充電不可）を装備',
          categoryLists: [{ name: 'インカム / トランシーバー' }],
          tagLists: [],
        },
        {
          name: 'ワイヤレスクリッカー DragonClicker KWDC-315',
          image: '/img/products/product_img_13.png',
          maker: 'KOWA',
          price: '5,000',
          class: 'A',
          description:
            'パワーポイントのスライドショー操作を無線制御で行えるワイヤレスPCコントローラーUSB出力を4ポート装備しているので4台のPCプレゼンテーションを同時に制御できます。技適証明取得、制御距離80m、簡単操作で誰でも使用可能',
          categoryLists: [{ name: '会議用機器' }, { name: '会場設備用機器' }],
          tagLists: [],
        },
        {
          name: '4K小型カメラ BRIO C1000eR',
          image: '/img/products/product_img_14.png',
          maker: 'Logicool',
          price: '2,000',
          class: 'A',
          description:
            '4K Ultra HD・1080pフルHD・720p HDでのテレビ電話が可能な小型カメラ。',
          categoryLists: [
            { name: 'PC / ICTネットワーク機器' },
            { name: 'PC周辺機器' },
          ],
          tagLists: [],
        },
        {
          name: 'SpacePlayer DLPプロジェクター 1000lm 黒 / 白NTN91000B / NTN91000W',
          image: '/img/products/product_img_15.png',
          maker: 'Panasonic',
          price: '10,000',
          class: 'A',
          description:
            'スポットライト型DLPプロジェクター。フレキシブルな可動構造で水平より下向きの全方向を照射可能。 SDカードの使用で、本体のみで静止画・動画再生も可能です。',
          categoryLists: [{ name: '照明機器' }],
          tagLists: [
            { name: 'DLP' },
            { name: 'レーザー光源' },
            { name: 'WXGA' },
            { name: 'HDMI端子' },
            { name: 'HDCP対応' },
          ],
        },
        {
          name: 'ラージステージ LS1250',
          image: '/img/products/product_img_16.png',
          maker: 'TAKENAKA',
          price: '140,000',
          class: 'A',
          description: '大型プロジェクターを設置するのに最適な多目的台です。',
          categoryLists: [
            { name: '多目的用品' },
            { name: '多目的台・ステージ' },
          ],
          tagLists: [],
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.products {
  position: relative;
  height: auto;

  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .content {
    width: 70%;
    flex-grow: 1;
    max-width: 860px;
  }

  .product__search {
    width: 100%;
    border: 1px solid $outline;
    background-color: $cushion;
    border-radius: 5px;

    .search__number {
      max-width: 185px;
      border-radius: 5px;
    }

    .serach__condition {
      background-color: #ffffff;
      border-radius: 5px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .product__sort {
    .sort__release,
    .sort__price {
      .release__head,
      .price__head {
        background-color: $primary;
      }

      .v-btn--active {
        font-weight: 600 !important;
      }

      .v-btn--active::before {
        background-color: #ffffff !important;
        border-bottom: 2px solid $primary !important;
        opacity: 1 !important;
      }
    }
  }

  .product__main {
    .info__img img {
      width: 185px;
      height: 185px;
      object-fit: cover;
    }

    .info__details {
      .categories {
        background-color: $cushion;
      }
    }

    .price {
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

    .product-tag {
      background-color: $cushion;
      color: $primary;
    }
  }
}
</style>
