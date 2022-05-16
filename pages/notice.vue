<template>
  <div>
    <top-bar title="お知らせ一覧" :bread-crumbs="breadCrumbs"></top-bar>
    <section class="news">
      <div class="news__inner px-3 py-16">
        <div class="content">
          <ul class="news-list">
            <li
              v-for="(list, index) in newsLists"
              :key="index"
              class="news-item notice news--tgl"
              @click="handleToggle(index)">
              <div class="news__head">
                <div class="news__head-group">
                  <span class="news__date">{{ convertDate(list.ReleaseDate) }}</span>
                  <span class="news__tag tag--notice">{{ list.NewsCategory }}</span>
                </div>
              </div>
              <div class="news__foot">
                <div class="news__title" :class="{ 'is-open': isOpen[index] }">
                  <p>{{ list.NewsTitle }}</p>
                </div>
                <slide-up-down :active="isOpen[index]" :duration="200">
                  <!-- eslint-disable-next-line vue/no-v-html -->
                  <div class="news__content" v-html="list.NewsHTMLText"></div>
                </slide-up-down>
              </div>
            </li>
            <!-- <li class="news-item notice news--tgl">
              <div class="news__head">
                <div class="news__head-group">
                  <span class="news__date">2022.00.05</span>
                  <span class="news__tag tag--notice"></span>
                </div>
              </div>
              <div class="news__foot">
                <div class="news__title">
                  <p>
                    新型コロナウイルス対策のための土曜日休業、時差出退勤のお知らせ(長めのタイトル長めのタイトル長めのタイトル長めのタイトル)
                  </p>
                </div>
                <div class="news__content">
                  <div class="br-2">
                    新型コロナウイルスの感染拡大抑制のため、
                    また、従業員の感染リスクを低減するため、以下の対応を講じることといたしましたので、下記のとおりお知らせいたします。
                  </div>
                  <div class="br-2">
                    <ul class="itemize itemize--circle">
                      <li>期間：2020年6月22日 (月) ～ <span class="word-nowrap">2022年 2月28日 (月)</span></li>
                      <li>
                        対応内容：
                        <ul class="itemize itemize--bullet">
                          <li>全事業所で土曜日休業</li>
                          <li>営業時間の短縮<br />月～金曜日の営業時間 10:00 ~ 17:30<br />日曜・祝日：定休</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div class="br-4">
                    一部の社員をテレワークまたは休業とさせていただいております。<br />ご迷惑をお掛けすることと存じますが、何卒ご理解のうえ
                    ご了承くださいますようお願い申し上げます。
                  </div>
                  <div>
                    お客様の最寄りの営業所でご対応いたしますので、お近くの営業所をお選びください。<br />
                    お問い合わせフォームのご利用も可能です。<br />
                    ※ お急ぎの場合は、お電話にてお問い合わせください。
                  </div>
                </div>
              </div>
            </li> -->
            <!-- <li class="news-item notice news--tgl">
              <div class="news__head">
                <div class="news__head-group">
                  <span class="news__date">2022.00.04</span>
                  <span class="news__tag tag--notice"></span>
                </div>
              </div>
              <div class="news__foot">
                <div class="news__title">
                  <p>新型コロナウイルス対策のための土曜日休業、時差出退勤のお知らせ</p>
                </div>
                <div class="news__content">
                  <div class="br-2">
                    新型コロナウイルスの感染拡大抑制のため、
                    また、従業員の感染リスクを低減するため、以下の対応を講じることといたしましたので、下記のとおりお知らせいたします。
                  </div>
                  <div class="br-2">
                    <ul class="itemize itemize--circle">
                      <li>期間：2020年6月22日 (月) ～ <span class="word-nowrap">2022年 2月28日 (月)</span></li>
                      <li>
                        対応内容：
                        <ul class="itemize itemize--bullet">
                          <li>全事業所で土曜日休業</li>
                          <li>営業時間の短縮<br />月～金曜日の営業時間 10:00 ~ 17:30<br />日曜・祝日：定休</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div class="br-4">
                    一部の社員をテレワークまたは休業とさせていただいております。<br />ご迷惑をお掛けすることと存じますが、何卒ご理解のうえ
                    ご了承くださいますようお願い申し上げます。
                  </div>
                  <div>
                    お客様の最寄りの営業所でご対応いたしますので、お近くの営業所をお選びください。<br />
                    お問い合わせフォームのご利用も可能です。<br />
                    ※ お急ぎの場合は、お電話にてお問い合わせください。
                  </div>
                </div>
              </div>
            </li> -->
            <!-- <li class="news-item news--link">
              <div class="news__head">
                <div class="news__head-group">
                  <span class="news__date">2022.00.03</span>
                  <span class="news__tag tag--info"></span>
                </div>
              </div>
              <a class="news__foot" href="https://www.takenaka-co.co.jp/09special/sender_box/" target="_blank">
                <div class="news__title">
                  <p>センダーボックス特集ページを公開いたしました</p>
                </div>
              </a>
            </li> -->
            <!-- <li class="news-item news--link">
              <div class="news__head">
                <div class="news__head-group">
                  <span class="news__date">2022.00.02</span>
                  <span class="news__tag tag--info"></span>
                </div>
              </div>
              <a class="news__foot" href="https://www.takenaka-co.co.jp/09special/sender_box/" target="_blank">
                <div class="news__title">
                  <p>
                    センダーボックス特集ページを公開いたしました(長めのタイトル長めのタイトル長めのタイトル長めのタイトル長めのタイトル長めのタイトル)
                  </p>
                </div>
              </a>
            </li> -->
            <!-- <li class="news-item news--tgl">
              <div class="news__head">
                <div class="news__head-group">
                  <span class="news__date">2022.00.01</span>
                  <span class="news__tag tag--info"></span>
                </div>
              </div>
              <div class="news__foot">
                <div class="news__title">
                  <p>レンタルページをリニューアルしました！</p>
                </div>
                <div class="news__content">
                  <p>ニュースの内容</p>
                </div>
              </div>
            </li> -->
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
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

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

/* --- 共通 --- */
.word-nowrap {
  display: inline-block;
}
.br-2 {
  margin-bottom: 2rem;
}
.br-4 {
  margin-bottom: 4rem;
}
/* --- リスト --- */
.itemize li {
  padding-left: 2rem;
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
/* --- NEWS --- */
.news {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}
.news-item {
  display: flex;
  padding: 20px 15px;
}
.news-item:not(:last-child) {
  border-bottom: 1px solid #afafaf;
}
.news__head {
  width: 20%;
  min-width: 250px;
  margin-right: 3rem;
}
.news__head-group {
  display: flex;
  align-items: center;
}
.news__foot {
  flex-grow: 1;
}
.news__date,
.news__tag,
.news__title {
  font-weight: 600;
}
.news__date {
  font-size: 1rem;
  margin-right: 2.5rem;
  flex-grow: 1;
}
.news__tag {
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 0.6rem;
  width: 55%;
  height: 22px;
  line-height: 22px;
  min-width: 120px;
  text-align: center;
}
.news__tag::before {
  color: #fff;
}
/* タグカテゴリー：NOTICE */
.tag--notice {
  background-color: #cc2929;
}
// .tag--notice::before {
//   content: 'NOTICE';
// }
/* タグカテゴリー：INFO */
.tag--info {
  background-color: #4b5654;
}
// .tag--info::before {
//   content: 'INFO';
// }
/* --- ニュースタイトル --- */
.news__title {
  color: $text;
  padding-right: 3rem;
  position: relative;
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE10～ */
}
.news__title::before {
  content: '';
  display: inline-block;
  position: absolute;
}

.news__title p {
  margin-bottom: 0;
}
/* NOTICE：ニュースタイトル */
.notice .news__title p {
  // color: #cc2929;
  color: $text;
}
/* ニュース開閉 */
.news--tgl .news__title {
  cursor: pointer;
}
/* 閉じた状態(アイコン：＋) */
.news--tgl .news__title::before,
.news--tgl .news__title::after {
  background-color: #3bb2a3;
  width: 12px;
  height: 2px;
  top: 12px;
  right: 0;
}
.news--tgl .news__title::after {
  content: '';
  display: inline-block;
  position: absolute;
  transform: rotate(90deg);
  transition: opacity 0.2s;
}
.news--tgl .news__title + .news__content {
  display: none;
}
/* 開いた状態(アイコン：－) */
.news--tgl .news__title.is-open::after {
  opacity: 0;
  transition: opacity 0.2s;
}
/* ニュース外部リンク */
.news--link .news__title::before {
  border-top: 2px solid #3bb2a3;
  border-right: 2px solid #3bb2a3;
  width: 10px;
  height: 10px;
  top: 9px;
  right: 3px;
  transform: rotate(45deg);
}
/* --- ニュース本文 --- */
.news__content {
  padding: 1.5rem 3rem 1.5rem 0;
}
@media screen and (max-width: 960px) {
  html {
    font-size: 51%;
  }
  .news-item {
    flex-direction: column;
    padding: 20px 0px;
  }
  .news__head {
    margin: 0 0 2rem 0;
    min-width: 215px;
  }
  .news__date {
    width: 36%;
  }
  /* ニュース開閉 */
  /* 閉じた状態(アイコン：＋) */
  .news--tgl .news__title::before,
  .news--tgl .news__title::after {
    top: 10px;
  }
  /* ニュース外部リンク */
  .news--link .news__title::before {
    top: 5px;
    transform: rotate(45deg);
  }
}
</style>
