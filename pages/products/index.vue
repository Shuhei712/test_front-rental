<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="products" class="products">
    <tariff-card :dialog="tariffDialog" :items="tariffLists" @change-tariff-dialog="reseiveTariffDialogFlg">
    </tariff-card>
    <search-refinement
      :dialog="dialog"
      :search-category-lists="searchCategoryLists"
      :search-maker-lists="searchMakerLists"
      :search-tag-lists="searchTagLists"
      :search-price-lists="searchPriceLists"
      @change-dialog="reseiveDialogFlg"
      @received-search-conditions="receivedSearchConditions">
    </search-refinement>
    <top-bar title="スイッチャー 一覧"></top-bar>
    <div class="products__inner d-lg-flex py-16 px-2 px-lg-0">
      <category-lists :category-lists="categoryLists"></category-lists>
      <div class="content ml-lg-15">
        <div class="product__search d-flex align-center">
          <div class="search__number text-center px-3 text-body-2 no-wrap">
            <span class="text-h5 mr-2"> {{ searchProductListCount }} </span>件<br />見つかりました
          </div>
          <div class="serach__condition flex-grow-1 pa-3">
            <div class="condition__head text-body-2 d-flex align-center flex-wrap text-no-wrap">
              現在の検索条件
              <v-icon>mdi-chevron-right</v-icon>
              <v-btn class="px-0" text @click="getFilterCondition()">
                <v-icon color="primary">mdi-text-search</v-icon>変更して絞り込む
              </v-btn>
            </div>
            <div class="condition__tags mt-1 d-flex align-center flex-wrap">
              <div v-if="isCategoryName && !conditionalSearchFlg" class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>{{ $route.query.categoryName }}
              </div>
              <div v-if="isTagName && !conditionalSearchFlg" class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>{{ $route.query.tagName }}
              </div>
              <div v-if="isKeyword && !conditionalSearchFlg" class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>{{ $route.query.keyword }}
              </div>
              <div v-for="(condition, index) in presentConditions" :key="index" class="search-tag text-body-2 mr-2">
                <v-icon class="mr-2">mdi-check</v-icon>{{ condition }}
              </div>
            </div>
          </div>
        </div>
        <div class="product__sort mt-3 d-flex align-center flex-column flex-lg-row">
          <div class="d-flex align-center order-1 order-lg-0 mt-5 mt-lg-0">
            <div class="sort__release d-flex align-center flex-column flex-lg-row mr-8">
              <div class="release__head mr-2 px-5 py-1 text-body-2 text-white">発売日</div>
              <v-btn-toggle v-model="orderRelease" dense tile group @change="changeOrderRelease()">
                <v-btn text :value="$config.ORDER_NEW">新着順</v-btn>
                <v-btn text :value="$config.ORDER_OLD">古い順</v-btn>
              </v-btn-toggle>
            </div>
            <div class="sort__price d-flex align-center flex-column flex-lg-row">
              <div class="price__head mr-2 px-5 py-1 text-body-2 text-white">価格</div>
              <v-btn-toggle v-model="orderPrice" dense tile group @change="changeOrderPrice()">
                <v-btn text :value="$config.ORDER_ASC">低い順</v-btn>
                <v-btn text :value="$config.ORDER_DESC">高い順</v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <v-spacer class="hidden-md-and-down"></v-spacer>
          <v-btn
            class="condition__reset mt-3 mt-lg-0"
            color="line"
            outlined
            :disabled="!presentCategoryID"
            @click="resetConditions()">
            カテゴリ以外の条件をリセット
          </v-btn>
        </div>
        <div class="product__main">
          <div v-for="(list, index) in productLists" :key="index">
            <product-card
              :id="list.ProductID"
              :name="list.ProductName"
              :type-number="list.ProductTypeNumber"
              :image="list.ProductImageURL"
              :maker="list.MakerName"
              :category-name01="list.CategoryNmae01"
              :category-name02="list.CategoryNmae02"
              :price-value="list.PriceValue"
              :price-type="list.PriceType"
              :price-unit="list.PriceUnit"
              :tariff-id="list.TariffID"
              :tariff-name="list.TariffName"
              :tag-lists="list.FeatureTagList"
              :description="list.Description"
              @send-tariff-data="receiveTariffLists">
            </product-card>
          </div>
        </div>
        <div class="product__pagination text-center mt-15">
          <v-pagination
            v-model="pageNumber"
            v-scroll-to="{ el: '#products', offset: -200 }"
            :length="pageMaxLength"
            @input="changePage"></v-pagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      page: 1,
      pageMaxLength: '',
      productLists: [],
      productTariffList: [],
      categoryLists: [],
      searchCategoryLists: [],
      searchMakerLists: [],
      searchTagLists: [],
      searchPriceLists: [],
      searchProductListCount: '',
      categoryTagID: '',
      keyword: '',
      selectedCategoryLists: [],
      selectedMakerLists: [],
      selectedTagLists: [],
      selectedPriceLists: [],
      conditionJson: {
        CategoryID: null,
        MakerList: null,
        PriceRangeID: null,
        FeatureTagList: null,
      },
      orderRelease: this.$config.ORDER_NEW,
      orderPrice: '',
      tariffDialog: false,
      tariffLists: [],
      conditionalSearchFlg: false,
      searchConditionInfo: [],
      presentConditions: [],
      presentCategoryID: '',
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    await Promise.all([this.getCategoryList(), this.searchProducts()])
    this.$store.commit('loading/changeStatus', false)
  },
  computed: {
    isCategoryName() {
      return this.$route.query.categoryName ? 1 : 0
    },
    isTagName() {
      return this.$route.query.tagName ? 1 : 0
    },
    isKeyword() {
      return this.$route.query.keyword ? 1 : 0
    },
    pageNumber: {
      get() {
        return Number(this.page)
      },
      set(value) {
        this.page = value
      },
    },
  },
  methods: {
    async getCategoryList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_category_list.php', param)
      this.categoryLists = res.CategoryRootList
    },
    async getCategoryInfo(categoryID) {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('CategoryID', categoryID)
      const res = await this.$axios.$post('get_category_info.php', param)
      return res.CategoryInfo[0]
    },
    async getCategoryListforSearch() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_category_list_search.php', param)
      // console.log(res)
      this.searchCategoryLists = res.CategoryRootList
    },
    async getMakerListforSearch() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('CategoryID', this.presentCategoryID === undefined ? '' : this.presentCategoryID)
      const res = await this.$axios.$post('get_maker_list_search.php', param)
      // console.log(res)
      this.searchMakerLists = res.MakerIndexList
    },
    async getTagListforSearch() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('CategoryID', this.presentCategoryID === undefined ? '' : this.presentCategoryID)
      const res = await this.$axios.$post('get_tag_list_search.php', param)
      // console.log(res)
      this.searchTagLists = res.FeatureCategoryList
    },
    async getPriceListforSearch() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_price_range_list.php', param)
      // console.log(res)
      this.searchPriceLists = res.PriceRangeList
    },
    async getFilterCondition() {
      await Promise.all([
        this.getCategoryListforSearch(),
        this.getMakerListforSearch(),
        this.getTagListforSearch(),
        this.getPriceListforSearch(),
      ])
      this.dialog = true
    },
    async searchProducts() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('SearchType', this.$route.query.type)
      param.append('Keyword', this.$route.query.keyword)
      param.append('CategoryTagID', this.$route.query.categoryID)
      param.append('SearchTagID', this.$route.query.tagID)
      param.append('ConditionJSON', this.conditionJson)
      param.append('OrderRelase', this.orderRelease)
      param.append('OrderPrice', this.orderPrice)
      param.append('PageRowCnt', this.$config.PAGE_ROW_COUNT)
      param.append('PageNo', this.page)
      const res = await this.$axios.$post('search_product.php', param)
      // console.log(res)
      this.productLists = res.SearchProductList
      this.searchProductListCount = res.SearchAllCnt
      this.setPresentCategoryID()
      this.page = res.PageNo
      this.pageMaxLength = res.PageNoMax
    },
    async searchProductsUsingFilter() {
      const conditionJSON = JSON.stringify(this.conditionJson)
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('SearchType', '0')
      param.append('Keyword', this.keyword)
      // param.append('CategoryTagID', '')
      // param.append('SearchTagID', '')
      param.append('ConditionJSON', conditionJSON)
      param.append('OrderRelease', this.orderRelease)
      param.append('OrderPrice', this.orderPrice)
      param.append('PageRowCnt', this.$config.PAGE_ROW_COUNT)
      param.append('PageNo', this.page)
      const res = await this.$axios.$post('search_product.php', param)
      // console.log(res)
      this.conditionalSearchFlg = true
      this.productLists = res.SearchProductList
      this.searchProductListCount = res.SearchAllCnt
      this.searchConditionInfo = res.SerchConditionInfo
      this.page = res.PageNo
      this.pageMaxLength = res.PageNoMax
      this.extractPresentCondition(this.searchConditionInfo)
      this.setPresentCategoryID()
      await Promise.all([this.getMakerListforSearch(), this.getTagListforSearch()])
    },
    initializeCondisionJson() {
      this.conditionJson.CategoryID = ''
      this.conditionJson.MakerList = []
      this.conditionJson.FeatureTagList = []
      this.conditionJson.PriceRangeID = ''
    },
    initializePresentConditions() {
      this.presentConditions = []
    },
    setCondisionJson() {
      this.initializeCondisionJson()

      if (this.keyword === undefined) {
        this.keyword = ''
      }

      if (this.selectedCategoryLists.length) {
        this.selectedCategoryLists.forEach((element) => {
          this.conditionJson.CategoryID = element.id
        })
      } else {
        this.conditionJson.CategoryID = null
      }

      if (this.selectedMakerLists.length) {
        this.selectedMakerLists.forEach((element) => {
          this.conditionJson.MakerList.push({ MakerID: element.id })
        })
      } else {
        this.conditionJson.MakerList = null
      }

      if (this.selectedTagLists.length) {
        this.selectedTagLists.forEach((element) => {
          this.conditionJson.FeatureTagList.push({ TagID: element.id })
        })
      } else {
        this.conditionJson.FeatureTagList = null
      }

      if (this.selectedPriceLists.length) {
        this.selectedPriceLists.forEach((element) => {
          this.conditionJson.PriceRangeID = element.id
        })
      } else {
        this.conditionJson.PriceRangeID = null
      }
    },
    setPresentCategoryID() {
      if (this.conditionalSearchFlg) {
        this.presentCategoryID = this.searchConditionInfo.CategoryID
      } else {
        switch (this.$route.query.type) {
          case '1':
            this.presentCategoryID = undefined
            break
          case '2':
            this.presentCategoryID = this.$route.query.categoryID
            break
          case '3':
            this.presentCategoryID = undefined
            break
          default:
            this.presentCategoryID = undefined
            break
        }
      }
    },
    changeOrderPrice() {
      this.orderRelease = ''
      this.searchProducts()
    },
    changeOrderRelease() {
      this.orderPrice = ''
      this.searchProducts()
    },
    changePage(page) {
      this.page = Number(page)
      if (this.conditionalSearchFlg) {
        this.searchProductsUsingFilter()
      } else {
        this.searchProducts()
      }
    },
    extractPresentCondition(searchConditionInfo) {
      this.initializePresentConditions()

      if (searchConditionInfo.KeyWordFlg) {
        this.presentConditions.push(this.keyword)
      }

      if (searchConditionInfo.CategoryFlg) {
        this.presentConditions.push(searchConditionInfo.CategoryNmae01)
        this.presentConditions.push(searchConditionInfo.CategoryNmae02)
      }

      if (searchConditionInfo.MakerFlg) {
        searchConditionInfo.MakerList.forEach((element) => {
          this.presentConditions.push(element.MakerName)
        })
      }

      if (searchConditionInfo.FeatureFlg) {
        searchConditionInfo.FeatureList.forEach((element) => {
          this.presentConditions.push(element.TagName)
        })
      }

      if (searchConditionInfo.PriceFlg) {
        this.presentConditions.push(searchConditionInfo.PriceRangeName)
      }
    },
    async resetConditions() {
      const categoryInfo = await this.getCategoryInfo(this.presentCategoryID)
      window.location.href =
        '/products?type=2&categoryID=' + categoryInfo.CategoryID + '&categoryName=' + categoryInfo.CategoryName
    },
    reseiveDialogFlg(value) {
      this.dialog = value
    },
    receivedSearchConditions(categoryLists, makerLists, tagLists, priceLists, keyword) {
      this.selectedCategoryLists = categoryLists
      this.selectedMakerLists = makerLists
      this.selectedTagLists = tagLists
      this.selectedPriceLists = priceLists
      this.keyword = keyword
      this.setCondisionJson()
      this.searchProductsUsingFilter()
    },
    reseiveTariffDialogFlg(value) {
      this.tariffDialog = value
    },
    receiveTariffLists(value) {
      this.tariffLists = value
      this.tariffDialog = true
    },
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

    @include mq(lg) {
      width: 100%;
      margin: 0 auto;
    }
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
      @include mq(md) {
      }

      .release__head,
      .price__head {
        background-color: $primary;

        @include mq(lg) {
          width: 200px;
          text-align: center;
        }

        @include mq(sm) {
          width: 150px;
          text-align: center;
        }
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

  .condition__reset:disabled {
    opacity: 0.5;
  }
}
</style>
