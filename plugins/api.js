export default function ({ $axios, $config }, inject) {
  const api = new API($axios, $config)
  // api.setBaseURL($config.API_BASE_URL)
  inject('api', api)
}

class API {
  constructor(axios, config) {
    this.axios = axios
    this.param = new URLSearchParams()
    this.param.append('ProjectKey', config.PROJECT_KEY)
    this.param.append('LangType', config.LANG_JAPANESE)
  }

  async getMenuList() {
    return await this.axios.$post('get_menu_list.php', this.param)
  }

  async getNewsList() {
    return await this.axios.$post('get_news_list_top.php', this.param)
  }

  async getPickupList() {
    return await this.axios.$post('get_pickup_list_top.php', this.param)
  }

  async getNewProductList(listMaxCnt) {
    this.param.append('ListMaxCnt', listMaxCnt)
    return await this.axios.$post('get_new_product_list_top.php', this.param)
  }

  async getSpecialPageList() {
    return await this.axios.$post('get_special_page_list_top.php', this.param)
  }

  async getPickUpTagList(listMaxCnt) {
    this.param.append('ListMaxCnt', listMaxCnt)
    return await this.axios.$post('get_pickup_tag_list_top.php', this.param)
  }
}
