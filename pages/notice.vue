<template>
  <div id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="お知らせ一覧" :bread-crumbs="breadCrumbs"></top-bar>
    <section class="news">
      <div class="news__inner px-3 py-16">
        <div class="content">
          <ul class="news-list">
            <li
              v-for="(list, index) in newsLists"
              :key="index"
              class="news-item news--tgl d-flex flex-column flex-md-row py-5 px-md-4"
              :class="addCategoryClass(list.NewsCategory)"
              @click="handleToggle(index)">
              <div class="news__head mr-8 mb-4 mb-md-0">
                <div class="news__head-group d-flex align-center justify-space-between">
                  <span class="news__date text-body-2 text-sm-body-1 font-weight-bold">
                    {{ convertDate(list.ReleaseDate) }}
                  </span>
                  <span class="news__tag font-weight-bold text-white text-center">
                    {{ list.NewsCategory }}
                  </span>
                </div>
              </div>
              <div class="news__foot flex-grow-1">
                <div class="news__title text-body-2 text-sm-body-1 font-weight-bold pr-6" :class="{ 'is-open': isOpen[index] }">
                  <p class="hover-opacity">{{ list.NewsTitle }}</p>
                </div>
                <slide-up-down :active="isOpen[index]" :duration="200">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div class="news__content text-caption text-sm-body-1 py-3 pr-6" v-html="list.NewsHTMLText"></div>
                </slide-up-down>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import SlideUpDown from 'vue-slide-up-down'

export default {
  components: {
    SlideUpDown,
  },
  data() {
    return {
      newsLists: [],
      breadCrumbs: [],
      isOpen: [],
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.getNewsList()
    this.isOpen = Array(this.newsLists.length).fill(false)
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "お知らせ",
      meta: [
        { hid: 'description', name: 'description', content: 'お知らせ | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    async getNewsList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_news_list.php', param)
      // console.log(res)
      this.newsLists = res.NewsReleaseList
    },
    handleToggle(index) {
      this.isOpen.splice(index, 1, !this.isOpen[index])
    },
    convertDate(date) {
      const dateString = date.toString()
      const year = dateString.slice(0, 4)
      const month = dateString.slice(4, 6)
      const day = dateString.slice(6, 8)
      return year + '.' + month + '.' + day
    },
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'お知らせ一覧', path: '/notice' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    addCategoryClass(category) {
      if(category === '重要なお知らせ') {
        return 'important'
      } else {
        ;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

ul {
  list-style: none;
}

.news {
  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;

    iframe {
      width: 100%;
      height: 75vh;
      max-height: 1100px;
    }
  }
}

/* --- リスト --- */
.itemize li {
  padding-left: 20px;
  position: relative;
}
.itemize > li::before {
  left: 0;
  position: absolute;
}
.itemize--circle > li::before {
  content: '〇';
}
.itemize--bullet > li::before {
  content: '・';
}

.news-item {
  &:not(:last-child) {
    border-bottom: 1px solid $line;
  }
}

.news__head {
  width: 20%;
  min-width: 255px;

  @include mq(sm) {
    width: 100%;
    max-width: 230px;
    min-width: auto;
  }

  .news__date {
    letter-spacing: 0.12em !important;
  }

  .news__tag {
    background-color: $outline;
    border-radius: 10px;
    display: inline-block;
    font-size: 10px;
    width: 50%;
    min-width: 120px;
    height: 22px;
    line-height: 22px;
  }
}

// ニュースタイトル
.news__title {
  color: $text;
  position: relative;
  user-select: none;
  -webkit-user-select: none; // Safari
  -ms-user-select: none; // IE10～

  &::before {
    content: '';
    display: inline-block;
    position: absolute;
  }
}

// 重要なお知らせ
.important {
  .news__tag {
    background-color: $category;
  }
  .news__title {
    color: $category;
  }
}

// ニュース開閉タイプ + -
.news--tgl {
  .news__title {
    cursor: pointer;

    // 閉じた状態 アイコン：＋
    &::before,
    &::after {
      background-color: #3bb2a3;
      width: 12px;
      height: 2px;
      top: 12px;
      right: 0;

      @include mq(md) {
        top: 10px;
      }
    }

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      transform: rotate(90deg);
      transition: opacity 0.2s;
    }

    // 開いた状態 アイコン：－
    &.is-open::after {
      opacity: 0;
      transition: opacity 0.2s;
    }
  }
}

// ニュース外部リンクタイプ >
.news--link {
  .news__title {
    &::before {
      border-top: 2px solid #3bb2a3;
      border-right: 2px solid #3bb2a3;
      width: 10px;
      height: 10px;
      top: 9px;
      right: 3px;
      transform: rotate(45deg);

      @include mq(md) {
        top: 5px;
      }
    }
  }
}

// ニュース本文
.news__content {
  line-height: $leading-relaxed;
}
.news__content::v-deep a {
  color: $primary !important;
  transition: opacity 0.4s ease;
}
.news__content::v-deep a:hover {
  opacity: 0.75 !important;
}

</style>
