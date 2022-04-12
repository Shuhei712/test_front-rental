<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" class="detail">
    <top-bar title="機材詳細"></top-bar>
    <div class="detail__inner py-5 py-lg-16">
      <div class="content px-2 px-lg-0">
        <div class="info__categories--sp d-flex flex-wrap px-3 py-1 mb-3">
          <div class="search-tag text-body-2 mr-2">
            <v-icon class="mr-2">mdi-check</v-icon>{{ productInfoList.CategoryTagID01 }}
          </div>
          <div class="search-tag text-body-2 mr-2">
            <v-icon class="mr-2">mdi-check</v-icon>{{ productInfoList.CategoryTagID02 }}
          </div>
        </div>
        <div class="maker--sp text-body-2">{{ productInfoList.MakerName }}</div>
        <div class="name--sp text-subtitle-1 letter-space-015em mt-2 font-weight-bold">
          {{ productInfoList.ProductName }} {{ productInfoList.ProductTypeNumber }}
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
              <div class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>{{ productInfoList.CategoryTagID01 }}
              </div>
              <div class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>{{ productInfoList.CategoryTagID02 }}
              </div>
            </div>
            <div class="info__main mt-5">
              <div class="maker text-body-2">{{ productInfoList.MakerName }}</div>
              <div class="name text-h6 letter-space-015em mt-5">
                {{ productInfoList.ProductName }} {{ productInfoList.ProductTypeNumber }}
              </div>
              <div class="price d-flex align-center mt-8 text-body-2">
                <span class="price__head text-body-2 px-3 py-1">レンタル価格</span>
                <span class="price__day text-body-2 letter-space-015em px-3 py-1">1日/税別</span>
                <span class="price__product text-h5 letter-space-015em px-3 py-1">{{
                  productInfoList.PriceValue
                }}</span>
                {{ productInfoList.PriceUnit }}
                <v-btn class="price__more text-body-2 ml-5" color="primary" @click="tariffDialog = true">
                  <span class="price__class text-body-1 mr-2 font-weight-bold text-center">
                    {{ productTariffList.TariffSectionName }}
                  </span>
                  2日目以降の料金
                </v-btn>
              </div>
              <div class="price--md d-flex align-center flex-wrap mt-5 text-body-2">
                <div class="mr-4">
                  <div class="price__head text-caption px-3 py-2 text-no-wrap text-center">レンタル価格</div>
                  <div class="price__day text-caption letter-space-015em px-3 py-2 text-center text-no-wrap">
                    1日/税別
                  </div>
                </div>
                <span class="price__product text-h5 letter-space-015em font-weight-medium">
                  {{ productInfoList.PriceValue }}
                </span>
                {{ productInfoList.PriceUnit }}
                <button class="price__more pa-2 ml-4" @click="tariffDialog = true">
                  <span class="price__class text-caption mb-1"> {{ productTariffList.TariffSectionName }}</span>
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
                  productInfoList.PriceValue
                }}</span>
                円
                <button class="price__more pa-2 ml-4" @click="tariffDialog = true">
                  <span class="price__class text-caption mb-1">A</span>
                  2日目以降<br />の料金
                </button>
              </div>
              <div class="tags mt-8">
                <v-btn
                  v-for="(list, index) in productInfoList.FeatureTagList"
                  :key="index"
                  class="product-tag px-3 py-1 mr-2 mb-2"
                  elevation="0"
                  tile
                  small
                  >{{ list.TagName }}</v-btn
                >
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <div class="descripsion line-height-25em mt-5 text-body-2" v-html="productInfoList.Description"></div>
              <!-- eslint-enable -->
              <div class="case-size mt-5">
                <v-btn color="primary" disabled><v-icon class="mr-2">mdi-archive-outline</v-icon>ケースサイズ</v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="detail__information mt-15">
          <div class="information__menu d-flex justify-center">
            <v-btn v-scroll-to="{ el: '#product-info', offset: -200 }" class="mx-3" text>
              <v-icon class="mr-2" color="primary">mdi-information-outline</v-icon>製品情報<v-icon color="outline">
                mdi-chevron-down
              </v-icon>
            </v-btn>
            <v-btn v-scroll-to="{ el: '#product-specification', offset: -200 }" class="mx-3" text>
              <v-icon class="mr-2" color="primary">mdi-database-outline</v-icon>仕様<v-icon color="outline">
                mdi-chevron-down
              </v-icon>
            </v-btn>
            <v-btn
              v-if="productDocLists !== null"
              v-scroll-to="{ el: '#product-document', offset: -200 }"
              class="mx-3"
              text>
              <v-icon class="mr-2" color="primary">mdi-text-box-outline</v-icon>この機材の資料<v-icon color="outline">
                mdi-chevron-down
              </v-icon>
            </v-btn>
            <v-btn
              v-if="productRefLists !== null"
              v-scroll-to="{ el: '#product-related', offset: -200 }"
              class="mx-3"
              text>
              <v-icon class="mr-2" color="primary">mdi-link</v-icon>関連機材<v-icon color="outline">
                mdi-chevron-down
              </v-icon>
            </v-btn>
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
                <v-btn v-scroll-to="{ el: '#product-specification', offset: -200 }" class="mx-3" text>
                  <v-icon class="mr-2" color="primary">mdi-database-outline</v-icon>仕様<v-icon color="outline">
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="productDocLists !== null" cols="6">
                <v-btn v-scroll-to="{ el: '#product-document', offset: -200 }" class="mx-3" text>
                  <v-icon class="mr-2" color="primary">mdi-text-box-outline</v-icon>この機材の資料<v-icon
                    color="outline">
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col v-if="productRefLists !== null" cols="6">
                <v-btn v-scroll-to="{ el: '#product-related', offset: -200 }" class="mx-3" text>
                  <v-icon class="mr-2" color="primary">mdi-link</v-icon>関連機材<v-icon color="outline">
                    mdi-chevron-down
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div class="information__content">
            <section id="product-info" class="product-info mt-15">
              <div class="product-info__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-information-outline</v-icon>製品情報
              </div>
              <div v-for="(object, index) in infoLists" :key="index" class="product-info__content mt-10">
                <div v-for="list in object.SectionList" :key="list.ProductSubjectID" v-html="list.HtmlCode"></div>
              </div>
            </section>
            <section id="product-specification" class="product-specification mt-15">
              <div class="product-specification__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-database-outline</v-icon>仕様
              </div>
              <div v-for="(object, index) in specLists" :key="index" class="product-specification__content mt-10">
                <div v-for="list in object.SectionList" :key="list.ProductSubjectID" v-html="list.HtmlCode"></div>
              </div>
            </section>
            <section v-if="productDocLists !== null" id="product-document" class="product-document mt-15">
              <div class="product-document__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-text-box-outline</v-icon>この機材の資料
              </div>
              <div class="product-document__content d-flex justify-center align-start flex-wrap mt-10">
                <v-card
                  v-for="(list, index) in downloadDocLists"
                  :key="index"
                  width="300"
                  elevation="0"
                  class="document d-flex flex-column align-center pa-5 ma-5"
                  :href="list.DocumentURL"
                  link>
                  <div class="document__img">
                    <img src="/img/detail/pdf.png" :alt="list.DocumentName" />
                  </div>
                  <div class="document__title text-center mt-3">
                    {{ list.DocumentName }}
                  </div>
                </v-card>
                <v-card
                  v-for="(list, index) in linkDocLists"
                  :key="index"
                  width="300"
                  elevation="0"
                  class="document d-flex flex-column align-center pa-5 ma-5"
                  :href="list.DocumentURL"
                  link>
                  <div class="document__img">
                    <img src="/img/detail/link.png" :alt="list.DocumentName" />
                  </div>
                  <div class="document__title text-center mt-3">
                    {{ list.DocumentName }}
                  </div>
                </v-card>
              </div>
            </section>
            <section v-if="productRefLists !== null" id="product-related" class="product-related mt-15">
              <div class="product-related__head text-h6 letter-space-02em text-center">
                <v-icon class="mr-5" color="primary">mdi-link</v-icon>関連機材
              </div>
              <div class="product-related__content mt-10">
                <div v-for="(list, index) in productRefLists" :key="index" class="related__product mt-5">
                  <div class="product__categories d-flex px-3 py-1">
                    <div class="search-tag text-body-2 mr-2">
                      <v-icon class="mr-2">mdi-check</v-icon>{{ list.CategoryTagID01 }}
                    </div>
                    <div class="search-tag text-body-2 mr-2">
                      <v-icon class="mr-2">mdi-check</v-icon>{{ list.CategoryTagID02 }}
                    </div>
                  </div>
                  <div class="product__related mt-5">
                    <v-row>
                      <v-col v-for="product in list.ProductList" :key="product.ProductID" cols="6" sm="3" md="2">
                        <item-card
                          :path="product.ProductImageURL"
                          :maker="product.MakerName"
                          :name="product.ProductName"
                          :link="'/products/' + product.ProductID + '?name=' + product.ProductName">
                        </item-card>
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
        <v-btn text>
          <v-icon class="mr-2" color="primary">mdi-chevron-left</v-icon>{{ productInfoList.CategoryTagID01 }}に戻る
        </v-btn>
        <v-btn text>
          <v-icon class="mr-2" color="primary">mdi-chevron-left</v-icon>{{ productInfoList.CategoryTagID02 }}に戻る
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import TariffCard from '~/components/TariffCard.vue'
export default {
  data() {
    return {
      productInfoList: [],
      productItemLists: [],
      productRefLists: [],
      productDocLists: [],
      productTariffList: [],
      productCaseInfo: [],
      infoLists: [],
      specLists: [],
      refferLists: [],
      docLists: [],
      },
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    const [productInfoList, productItemLists, productRefLists, productDocLists, productCaseInfo] = await Promise.all([
      this.getProductInfoList(),
      this.getProductItemInfo(),
      this.getProductRefList(),
      this.getProductDocList(),
      this.getProductCaseInfo(),
    ])

    const productTariffLists = await this.getProductTariff(this.productInfoList.TariffID)

    this.getProductInfo()
    this.getProductSpec()
    this.getProductReffer()
    this.getProductDocList()

    this.$store.commit('loading/changeStatus', false)
  },
  computed: {
    downloadDocLists() {
      return this.productDocLists.filter((object) => object.DocumentType === 0)
    },
    linkDocLists() {
      return this.productDocLists.filter((object) => object.DocumentType === 1)
    },
  },

  methods: {
    async getProductInfoList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('ProductID', this.$route.params.id)
      const res = await this.$axios.$post('get_product_info_master.php', param)
      // console.log(res)
      this.productInfoList = res.ProductInfo
    },
    async getProductItemInfo() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('ProductID', this.$route.params.id)
      const res = await this.$axios.$post('get_product_item_info.php', param)
      // console.log(res)
      this.productItemLists = res.SubjectList
    },
    async getProductRefList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('ProductID', this.$route.params.id)
      const res = await this.$axios.$post('get_ref_product_list.php', param)
      // console.log(res)
      this.productRefLists = res.CategoryGroupList
    },
    async getProductDocList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('ProductID', this.$route.params.id)
      const res = await this.$axios.$post('get_product_doc_list.php', param)
      // console.log(res)
      this.productDocLists = res.ProductDocumentList
    },
    async getProductTariff(tariffID) {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('ProductID', this.$route.params.id)
      param.append('TariffID', tariffID)
      param.append('TariffType', 0)
      const res = await this.$axios.$post('get_product_tariff.php', param)
      // console.log(res)
      this.productTariffList = res
    },
    async getProductCaseInfo() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('ProductID', this.$route.params.id)
      const res = await this.$axios.$post('get_product_case_info.php', param)
      console.log(res)
      this.productCaseInfo = res
    },
    getProductInfo() {
      this.infoLists = this.productItemLists.filter((object) => object.SubjectKey === this.$config.PRODUCT_INFO)
    },
    getProductSpec() {
      this.specLists = this.productItemLists.filter((object) => object.SubjectKey === this.$config.PRODUCT_SPEC)
    },
    getProductReffer() {
      this.refferLists = this.productItemLists.filter((object) => object.SubjectKey === this.$config.PRODUCT_REFFER)
    },
    getProductDoc() {
      this.docLists = this.productItemLists.filter((object) => object.SubjectKey === this.$config.PRODUCT_DOC)
    },
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
        width: 400px;
        height: 400px;
        border: 1px solid $line;
        overflow: hidden;

        @include mq(md) {
          width: 250px;
          height: 250px;
        }
        @include mq(sm) {
          width: 220px;
          height: 220px;
        }

        .hooper {
          width: 100%;
          height: 100%;

          .hooper-slide {
          }
        }

        img {
          width: calc(400px - 2px);
          height: calc(400px - 2px);
          object-fit: contain;

          @include mq(md) {
            width: calc(250px - 2px);
            height: calc(250px - 2px);
          }

          @include mq(sm) {
            width: calc(220px - 2px);
            height: calc(220px - 2px);
          }
        }
      }
      .image__sub {
        @include mq(sm) {
          max-width: 120px;
        }
        button {
          width: 55px;
          height: 55px;
          border: 1px solid $line;
          border-radius: 50%;

          img {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            object-fit: contain;
          }
        }
        input[type='radio'] {
          display: none;
        }

        label {
          img {
            border: 1px solid $line;
            width: 54px;
            height: 54px;
            border-radius: 50%;
            object-fit: contain;
          }
        }
        input[type='radio'] + label img {
          opacity: 0.6;
        }
        input[type='radio']:checked + label img {
          opacity: 1;
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
