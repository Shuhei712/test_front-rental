<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top" class="detail">
    <to-top-btn></to-top-btn>
    <tariff-card
      :dialog="tariffDialog"
      :items="productTariffList.TariffList"
      @change-tariff-dialog="reseiveTariffDialogFlg">
    </tariff-card>
    <case-size-card
      :dialog="caseSizeDialog"
      :case-size-info="productCaseInfo"
      @change-case-size-dialog="reseiveCaseSizeDialogFlg">
    </case-size-card>
    <top-bar title="資料ダウンロード" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="detail__inner py-6 py-sm-10 py-lg-16">
      <div class="content px-2 px-lg-0">
        <div class="info__categories--sp d-flex flex-wrap px-3 py-1 mb-3">
          <div class="search-tag d-flex text-body-2 mr-4">
            <v-icon class="mr-2" small>mdi-check</v-icon>{{ productInfoList.CategoryTagID01 }}
          </div>
          <div v-if="isCategoryName2" class="search-tag d-flex text-body-2">
            <v-icon class="mr-2" small>mdi-check</v-icon>{{ productInfoList.CategoryTagID02 }}
          </div>
        </div>
        <div class="maker--sp text-body-2">{{ productInfoList.MakerName }}</div>
        <div class="name--sp mt-2">
          <div class="text-subtitle-2 letter-space-015em font-weight-medium">{{ productInfoList.ProductName }}</div>
          <div class="text-subtitle-1 letter-space-015em font-weight-bold">{{ productInfoList.ProductTypeNumber }}</div>
        </div>
        <div class="detail__top d-flex flex-column flex-sm-row">
          <div class="top__image mr-0 mr-sm-5 d-flex flex-wrap d-sm-block">
            <div class="image__main mt-3 mt-md-0 mr-5 mr-sm-0">
              <span v-if="isComingsoon(productInfoList.ReleaseDate)" class="product-comingsoon">Coming soon</span>
              <span v-else-if="isNew(productInfoList.ReleaseDate)" class="product-new">New</span>
              <div ref="zoomArea" class="zoom-area">
                <img ref="zoomImage" src="" alt="zoom-image" />
              </div>
              <hooper ref="carousel" :settings="hooperSettings" @slide="updateCarousel">
                <slide v-for="(list, index) in productInfoList.ProductImageList" :key="index">
                  <div
                    ref="lensContainer"
                    class="m-lens-container"
                    @mouseenter="mouseEnter(index)"
                    @mouseleave="mouseLeave"
                    @mousemove="mouseMove(index, $event)">
                    <img ref="lensImage" :src="list.ProductImageURL" :alt="list.ProductImageName" />
                    <div ref="lens" class="m-lens"></div>
                  </div>
                </slide>
              </hooper>
            </div>
            <div class="image__sub d-flex flex-wrap mt-3 mt-md-7 mr-n3">
              <div
                v-for="(list, index) in productInfoList.ProductImageList"
                :key="index"
                class="image__thumb mr-3 mb-1">
                <input :id="index" v-model="carouselData" type="radio" :value="index" checked />
                <label :for="index"><img :src="list.ProductImageURL" :alt="list.ProductImageName" /></label>
              </div>
            </div>
          </div>
          <div class="top__info flex-grow-1">
            <div class="info__categories d-flex flex-wrap px-3 py-1">
              <div class="search-tag d-flex text-body-2 mr-5">
                <v-icon class="mr-2" small>mdi-check</v-icon>{{ productInfoList.CategoryTagID01 }}
              </div>
              <div v-if="isCategoryName2" class="search-tag d-flex text-body-2">
                <v-icon class="mr-2" small>mdi-check</v-icon>{{ productInfoList.CategoryTagID02 }}
              </div>
            </div>
            <div class="info__main mt-sm-3 mt-md-5 mt-lg-8">
              <div class="maker text-body-2">{{ productInfoList.MakerName }}</div>
              <div class="name mt-3 mt-lg-5">
                <div class="text-subtitle-1 text-md-h6 letter-space-015em font-weight-medium">
                  {{ productInfoList.ProductName }}
                </div>
                <div class="text-h6 text-md-h5 letter-space-015em font-weight-bold">
                  {{ productInfoList.ProductTypeNumber }}
                </div>
              </div>
              <div class="price d-flex justify-space-between justify-sm-start flex-wrap mt-5 mt-md-6 mt-lg-10">
                <div class="d-md-flex align-center mr-2 mr-sm-4 mb-2 text-caption text-md-body-2">
                  <div class="price__head pa-2 px-md-3 py-md-1 text-no-wrap text-center">レンタル価格</div>
                  <div class="price__day letter-space-015em pa-2 px-md-3 py-md-1 text-center text-no-wrap">
                    1日/税別
                  </div>
                </div>
                <div class="price__product d-flex align-center mr-3 mr-sm-5 mb-2">
                  <div class="price__product-inner d-flex align-baseline">
                    <span class="price__val letter-space-015em font-weight-medium">{{ getPrice }}</span>
                    <span v-if="isPriceUnit" class="price__unit font-weight-light">
                      {{ productInfoList.PriceUnit }}
                    </span>
                  </div>
                </div>
                <button
                  class="price__more d-flex align-center mb-2 px-md-3"
                  :disabled="!isTariffBtn"
                  @click.stop="tariffDialog = true">
                  <span class="price__class mb-1 mb-md-0 mr-md-2">{{ productTariffList.TariffSectionName }}</span>
                  <span class="text-md-body-2 lh-crop-15">2日目以降<span class="word-keep">の料金</span></span>
                </button>
              </div>
              <div class="tags mt-4 mt-lg-8">
                <v-btn
                  v-for="(list, index) in productInfoList.FeatureTagList"
                  :key="index"
                  class="product-tag text-lg-body-1 px-3 py-1 mr-2 mb-2"
                  :href="'/products?type=1&tagID=' + list.TagID + '&tagName=' + list.TagName"
                  elevation="0"
                  tile
                  small>
                  {{ list.TagName }}
                </v-btn>
              </div>
              <!-- eslint-disable vue/no-v-html -->
              <div class="description line-height-25em mt-5 text-body-2" v-html="productInfoList.Description"></div>
              <!-- eslint-enable -->
              <div class="case-size mt-5">
                <v-btn elevation="1" color="primary" :disabled="!isCaseSize" @click.stop="caseSizeDialog = true">
                  <v-icon class="mr-2">mdi-archive-outline</v-icon>ケースサイズ
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="detail__information mt-15">
          <div class="information__menu">
            <p class="d-flex d-sm-none justify-center text-caption text-md-body-2 text-gray pa-2 pa-lg-0">
              クリックでページ内項目にジャンプします
            </p>
            <ul
              class="d-flex flex-wrap justify-center justify-sm-center pt-5 pt-sm-3 pl-4 pl-sm-5 pl-md-16 text-body-2 text-md-body-1">
              <li v-if="productDocLists !== null" class="mr-4 mr-sm-5 mr-md-16 mb-5 mb-sm-3">
                <a
                  v-scroll-to="{ el: '#product-document', offset: -200 }"
                  class="d-flex align-center text-gray hover-opacity">
                  <v-icon class="mr-2" color="primary">mdi-text-box-outline</v-icon>この機材の資料<v-icon
                    color="#878787">
                    mdi-chevron-down
                  </v-icon>
                </a>
              </li>
            </ul>
          </div>
          <div class="information__content">
            <section v-if="productDocLists !== null" id="product-document" class="product-document content__sec mt-15">
              <div
                class="content__head product-document__head d-flex flex-column flex-sm-row align-center justify-center text-h6 text-sm-h5 font-weight-medium letter-space-02em text-gray">
                <v-icon class="mb-1 mb-sm-0 mr-sm-5" color="primary">mdi-text-box-outline</v-icon>この機材の資料
              </div>
              <div class="product-document__content d-flex flex-wrap justify-center mt-10">
                <v-card
                  v-for="list in downloadDocLists"
                  :key="list.DocumentName"
                  elevation="0"
                  class="document document--pdf d-flex flex-column align-center px-2 py-3 ma-2 mb-3"
                  :href="list.DocumentURL"
                  target="_blank"
                  link>
                  <div class="document__img">
                    <img src="/img/detail/pdf.png" :alt="list.DocumentName" />
                  </div>
                  <div class="document__title text-center text-caption text-sm-body-1 lh-crop-15 mt-3">
                    {{ list.DocumentName }}
                  </div>
                </v-card>
                <v-card
                  v-for="list in linkDocLists"
                  :key="list.DocumentName"
                  elevation="0"
                  class="document document--link d-flex flex-column align-center px-2 py-3 ma-2 mb-3"
                  :href="list.DocumentURL"
                  target="_blank"
                  link>
                  <div class="document__img">
                    <img src="/img/detail/link.png" :alt="list.DocumentName" />
                  </div>
                  <div class="document__title text-center text-caption text-sm-body-1 lh-crop-15 mt-3">
                    {{ list.DocumentName }}
                  </div>
                </v-card>
              </div>
            </section>
          </div>
        </div>
        <div class="back-btn d-flex flex-column flex-sm-row flex-wrap align-start align-sm-center justify-center mt-15">
          <a
            :href="
              '/products?type=2&categoryID=' +
              productInfoList.CategoryNmae01 +
              '&categoryName=' +
              productInfoList.CategoryTagID01
            "
            color="footer"
            class="d-flex align-center mr-4 px-2 mb-1"
            text>
            <v-icon class="mr-2 ml-n1" color="primary">mdi-chevron-left</v-icon>
            <span>{{ productInfoList.CategoryTagID01 }}に戻る</span>
          </a>
          <a
            :href="
              '/products?type=2&categoryID=' +
              productInfoList.CategoryNmae02 +
              '&categoryName=' +
              productInfoList.CategoryTagID02
            "
            color="footer"
            class="px-2 mb-1"
            text>
            <v-icon class="mr-2 ml-n1" color="primary">mdi-chevron-left</v-icon>
            <span>{{ productInfoList.CategoryTagID02 }}に戻る</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
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
      carouselData: 0,
      hooperSettings: {
        itemsToShow: 1,
      },
      tariffDialog: false,
      caseSizeDialog: false,
      breadCrumbs: [],
      title: this.$route.query.name
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

    this.setBreadCrumbs()

    this.$store.commit('loading/changeStatus', false)
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.title + ' | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://rental-resource-sw.symunity.co.jp/catalog-page/detail/css/old-rental.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://rental-resource-sw.symunity.co.jp/catalog-page/detail/css/product-info.css',
        },
      ],
    }
  },
  computed: {
    downloadDocLists() {
      return this.productDocLists.filter((object) => object.DocumentType === 0)
    },
    linkDocLists() {
      return this.productDocLists.filter((object) => object.DocumentType === 1)
    },
    isCategoryName2() {
      return this.productInfoList.CategoryTagID02 !== null
    },
    isCaseSize() {
      return this.productInfoList.CaseSizeID !== null
    },
    getPrice() {
      switch (this.productInfoList.PriceType) {
        case 0:
          return this.productInfoList.PriceValue
        case 1:
          return this.productInfoList.PriceValue
        case 2:
          return '本体に含む'
        case 9:
          return 'ASK'
        default:
          return 'ASK'
      }
    },
    isPriceUnit() {
      switch (this.productInfoList.PriceType) {
        case 0:
          return true
        case 1:
          return true
        case 2:
          return false
        case 9:
          return false
        default:
          return true
      }
    },
    isTariffBtn() {
      switch (this.productInfoList.PriceType) {
        case 0:
          return true
        case 1:
          return true
        case 2:
          return false
        case 9:
          return false
        default:
          return true
      }
    },
  },
  watch: {
    carouselData() {
      this.$refs.carousel.slideTo(this.carouselData)
    },
  },
  updated() {
    this.$scrollBackButton()
    this.jsSmoothScroll()
  },
  methods: {
    updateCarousel(payload) {
      this.carouselData = payload.currentSlide
    },
    reseiveTariffDialogFlg(value) {
      this.tariffDialog = value
    },
    reseiveCaseSizeDialogFlg(value) {
      this.caseSizeDialog = value
    },
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', {
        name: this.productInfoList.CategoryTagID01,
        path:
          '/products?type=2&categoryID=' +
          this.productInfoList.CategoryNmae01 +
          '&categoryName=' +
          this.productInfoList.CategoryTagID01,
      })
      this.$store.commit('breadCrumbs/addList', {
        name: this.productInfoList.CategoryTagID02,
        path:
          '/products?type=2&categoryID=' +
          this.productInfoList.CategoryNmae02 +
          '&categoryName=' +
          this.productInfoList.CategoryTagID02,
      })
      this.$store.commit('breadCrumbs/addList', {
        name: this.productInfoList.ProductName + this.productInfoList.ProductTypeNumber,
        path: '',
      })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
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
      // console.log(res)
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
    mouseEnter(index) {
      const lens = this.$refs.lens[index]
      const presentImage = this.$refs.lensImage[index]
      const zoomArea = this.$refs.zoomArea
      const zoomImage = this.$refs.zoomImage
      const size = lens.offsetWidth
      const scale = 500 / size
      zoomArea.classList.add('active')
      zoomImage.setAttribute('src', presentImage.currentSrc)
      zoomImage.style.width = presentImage.offsetWidth * scale + 'px'
      zoomImage.style.height = presentImage.offsetHeight * scale + 'px'
    },
    mouseLeave() {
      const zoomArea = this.$refs.zoomArea
      zoomArea.classList.remove('active')
    },
    mouseMove(index, event) {
      const lens = this.$refs.lens[index]
      const zoomImage = this.$refs.zoomImage
      const size = lens.offsetWidth
      const scale = 500 / size
      const rect = event.currentTarget.getBoundingClientRect()
      const mouseX = event.clientX
      const mouseY = event.clientY
      const offsetX = mouseX - rect.left
      const offsetY = mouseY - rect.top
      const left = offsetX - size / 2
      const top = offsetY - size / 2
      lens.style.top = top + 'px'
      lens.style.left = left + 'px'
      zoomImage.style.marginLeft = -(left * scale) + 'px'
      zoomImage.style.marginTop = -(top * scale) + 'px'
    },
    isNew(date) {
      const now = new Date()
      const releaseYear = date.substr(0, 4)
      const releaseMonth = date.substr(4, 2)
      const releaseDay = date.substr(6, 2)
      const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay)
      const diffMilliSec = Math.abs(releaseDate - now)
      const diffDays = parseInt(diffMilliSec / 1000 / 60 / 60 / 24)
      return diffDays < this.$config.UNDER_NEW_PRODUCT_DAY
    },
    isComingsoon(date) {
      const now = new Date()
      const releaseYear = date.substr(0, 4)
      const releaseMonth = date.substr(4, 2)
      const releaseDay = date.substr(6, 2)
      const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay)
      const diffMilliSec = releaseDate - now
      const diffDays = parseInt(diffMilliSec / 1000 / 60 / 60 / 24)
      return diffDays > 0
    },
    jsSmoothScroll() {
      const scrollTrigger = document.querySelectorAll('a[href^="#"]')
      for (let i = 0; i < scrollTrigger.length; i++) {
        scrollTrigger[i].addEventListener('click', (e) => {
          e.preventDefault()
          const href = scrollTrigger[i].getAttribute('href')
          const target = document.getElementById(href.replace('#', ''))
          const rect = target.getBoundingClientRect().top
          const offset = window.pageYOffset
          const gap = 100
          const position = rect + offset - gap
          window.scrollTo({
            top: position,
            behavior: 'smooth',
          })
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
$bp_xs: 362px;

.detail {
  position: relative;
  height: auto;
  overflow-x: hidden;

  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 140px !important;
  }

  .content {
    width: 100%;

    .info__categories--sp {
      background-color: $cushion;
      display: none !important;

      @include mq(md) {
        display: flex !important;
      }

      .search-tag {
        @include mq(sm) {
          font-size: 10px !important;
        }
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
      align-items: flex-start;
      width: 40%;
      max-width: 400px;

      @include mq(md) {
        width: 45%;
        max-width: 250px;
      }

      @include mq(sm) {
        width: 100%;
        max-width: none;
      }

      .image__main {
        border: 1px solid $line;
        width: 100%;
        max-width: 400px;
        min-width: 220px;
        // overflow: hidden;
        position: relative;

        @include mq(sm) {
          width: 50%;
        }

        &::before {
          content: '';
          display: block;
          width: 100%;
          padding-top: 100%;
        }

        .product-new,
        .product-comingsoon {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background-color: $accent;
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 500;
          z-index: 10;
          animation: flash 3s linear infinite;
          @include mq(sm) {
            font-size: 0.6rem;
            width: 40px;
            height: 18px;
            line-height: 18px;
          }
        }

        .product-comingsoon {
          width: 120px;
        }
        @keyframes flash {
          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }
        }

        .zoom-area {
          display: none;
          position: absolute;
          top: -1px;
          left: 100%;
          border: 1px solid $line;
          background-color: #ffffff;
          height: 500px;
          width: 500px;
          overflow: hidden;
          z-index: 100;
        }

        .zoom-area.active {
          display: block;
        }

        .zoom-area img {
          object-fit: contain;
          max-width: none !important;
        }

        .hooper {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: absolute;
        }
        .hooper-slide {
          padding: 2%;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .m-lens-container {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;

        @include mq(md) {
          pointer-events: none;
        }
      }

      .m-lens {
        display: none;
        position: absolute;
        z-index: 2;
        background: $accent;
        opacity: 0.3;
        height: 172px;
        width: 172px;
      }

      .m-lens-container:hover .m-lens {
        display: block;
      }

      .image__sub {
        flex: 1;

        @include mq(sm) {
          max-width: 105px;
          min-width: 105px;
          flex-direction: column;
          max-height: 300px;
        }
        @media screen and (max-width: $bp_xs) {
          flex-direction: row;
          width: 100%;
          max-width: 100%;
          min-width: 100%;
        }

        .image__thumb {
          width: 55px;
          height: 55px;

          @include mq(md) {
            width: 45px;
            height: 45px;
          }
          @include mq(sm) {
            width: 40px;
            height: 40px;
          }
        }
        label {
          border: 1px solid $line;
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }

        input[type='radio'] {
          display: none;
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
        .price__head {
          background-color: $accent;
          color: #ffffff;
        }
        .price__day {
          background-color: $cushion;
        }
        .price__product {
          .price__product-inner {
            font-size: 30px;

            @include mq(md) {
              font-size: 23px;
            }
          }
          .price__unit {
            font-size: 55%;
          }
        }
        .price__more {
          background-color: $primary;
          border-radius: 5px;
          box-shadow: 2px 2px 3px rgba(#000, 10%);
          color: #ffffff;
          min-width: 75px;
          padding: 5px;

          @include mq(md) {
            box-shadow: none;
            font-size: 11px;
            flex-direction: column;
            justify-content: center;
            width: 75px;
          }
          @media screen and (max-width: $bp_xs) {
            flex-direction: row;
            width: 100%;
          }
        }

        .price__more:disabled {
          background-color: #e0e0e0;
          color: #a6a6a6;

          .price__class {
            background-color: #fffafa;
            color: #a6a6a6;
          }
        }

        .price__class {
          background-color: #ffffff;
          border-radius: 50%;
          color: $primary;
          display: inline-block;
          font-weight: 700;
          font-size: 15px;
          line-height: 20px;
          width: 20px;
          height: 20px;

          @include mq(md) {
            font-size: 11px;
          }
          @media screen and (max-width: $bp_xs) {
            margin-right: 8px;
            margin-bottom: 0 !important;
          }
        }
      }

      .product-tag {
        background-color: $cushion;
        color: $primary !important;
      }
    }
  }

  .detail__information {
    position: relative;
    .information__menu {
      background-color: $cushion;

      @include mq(sm) {
        background-color: #fff;
        border: 1px solid $line;
      }

      ul {
        list-style: none;

        @include mq(sm) {
          max-width: 375px;
          margin: 0 auto;
        }
      }
      li {
        @include mq(sm) {
          min-width: 130px;
        }
      }
    }

    .information__content {
      .content__sec {
        margin-bottom: 10%;
      }
      .content__head {
        .v-icon {
          font-size: 2.3rem;

          @include mq(sm) {
            font-size: 2rem;
          }
        }
      }

      .product-info__content {
        .section-head {
          width: 400px;
          font-size: 1.15rem;
          color: $headingText;
          padding: 10px 20px;

          @include mq(lg) {
            width: 300px;
          }

          @include mq(md) {
            width: 100%;
            background-color: $cushion;
            padding: 10px 5px;
            font-size: 1rem;
          }
        }
        .section-html {
          flex: 1;
        }
      }

      .product-specification__content {
        width: 100%;
      }

      .product-document__content {
        .document {
          width: calc((100% - 32px) / 3);
          max-width: 300px;
          min-width: 250px;

          @include mq(md) {
            max-width: 220px;
            min-width: 200px;
          }
          @include mq(sm) {
            width: calc((100% - 32px) / 2);
            max-width: 160px;
            min-width: 136px;
          }
        }
        .document__img {
          height: 150px;

          @include mq(md) {
            height: 100px;
          }
          @include mq(sm) {
            height: 66px;
          }

          img {
            width: auto;
            height: 100%;
            object-fit: contain;
          }
        }
        .document--pdf {
          .document__title {
            color: #bc4848;
          }
        }
        .document--link {
          .document__title {
            color: #406ea0;
          }
        }
      }

      .product-related__content {
        .product__categories {
          background-color: $cushion;

          .search-tag {
            @include mq(sm) {
              font-size: 10px !important;
            }
          }
        }
      }

      // 以下のCSSは読み込むHTMLに従属させる
      // .w-400 {
      //   width: 400px;
      // }

      // .bg-primary {
      //   background-color: $primary;
      // }

      // .bg-cushion {
      //   background-color: $cushion;
      // }

      // 以下のCSSは読み込むHTMLに従属させる
      //   th,
      //   td {
      //     padding: 10px 20px;
      //     border: solid 1px $line;
      //   }

      //   th {
      //     @include mq(md) {
      //       border: 0;
      //     }
      //   }

      //   td {
      //     @include mq(md) {
      //       display: block;
      //       width: 100% !important;
      //       border: 0;
      //     }
      //   }

      //   td:first-child {
      //     @include mq(md) {
      //       color: $primary;
      //     }
      //   }
      // }
    }
  }

  .back-btn {
    a {
      display: inline-block;
      font-size: 0.875rem;
      color: $footer !important;
      font-weight: 500;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.6, 1);
      border-radius: 5px;

      span {
        display: inline-block;
        // padding-left: 2em;
      }

      @include mq(sm) {
        font-size: 0.8rem;
      }
    }

    a:hover {
      opacity: 0.85;
    }
  }
}
</style>
