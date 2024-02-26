<template>
  <div>
    <template v-for="(content, contentIndex) in contentList">
      <div
        :key="contentIndex"
        :class="contentList.length - 1 !== contentIndex ? 'mb-8 mb-sm-16' : ''">

        <!-- コンテンツ内見出し -->
        <div
          v-if="content.title"
          :class="[
            content.titleTagType ? 'd-flex align-center' : '',
            'mb-2 mb-sm-4'
          ]"
        >
          <h5
            :class="[
              content.title === 'member' ? 'accent--text' :
              content.title === 'nonmember' ? 'primary--text' : '',
              'text-h6 text-sm-h5 font-weight-black letter-space-01em']"
          >{{
            content.title === 'member' ? 'WEB会員の場合' :
            content.title === 'nonmember' ? 'WEB非会員の場合' : content.title }}
          </h5>
          <v-chip
            v-if="content.titleTagType"
            :color="content.titleTagType === 1 ? 'accent' : 'primary'"
            class="ml-3"
            small>{{ content.titleTagType === 1 ? '必須' : '任意' }}</v-chip>
        </div>

        <template v-for="(item, itemIndex) in content.items">
          <div
            :key="itemIndex"
            :class="[
              content.items.length - 1 !== itemIndex ? 'mb-4 mb-sm-8' : '',
              item.layoutType === 1 || item.layoutType === 2 ? 'guide__sub pa-8' : '',
              item.layoutType === 1 ? 'guide__sub--note mt-8 mt-sm-14' : '',
              'text-body-2 text-sm-body-1']"
          >
            <template v-if="item.childTitle">
              <!-- eslint-disable vue/no-v-html -->
              <h6
                class="text-h6 text-sm-h5 font-weight-black letter-space-01em mb-2 mb-sm-4"
                v-html="item.childTitle"></h6>
            </template>

            <!-- 本文テキスト -->
            <template v-for="(text, textIndex) in item.texts">
              <p
                :key="`guide-text_${textIndex}`"
                :class="item.texts.length - 1 !== textIndex ? 'mb-4 mb-sm-8' : ''"
                v-html="text"></p>
            </template>

            <!-- 画像 -->
            <template v-for="(img, imgIndex) in item.imgs">
              <div :key="`guide-img_${imgIndex}`" class="guide__img mt-6 mx-auto">
                <v-img
                  :src="img.src"
                  :alt="img.alt"></v-img>
              </div>
            </template>

            <!-- ボタン -->
            <v-row v-if="item.btnList" class="mt-3">
              <v-col
                v-for="(btn, btnIndex) in item.btnList"
                :key="`guide-btn_${btnIndex}`"
                cols="12"
                md="6">
                <guideline-btn
                  v-if="(typeof btn === 'number')"
                  :link-text="getBtnText(btn)"
                  :link-url="getBtnUrl(btn)"
                ></guideline-btn>
                <guideline-btn
                  v-else
                  :link-text="btn.text"
                  :link-url="btn.url"></guideline-btn>
              </v-col>
            </v-row>

            <!-- theadありのテーブル -->
            <v-simple-table
              v-if="item.table"
              :class="[
                item.table.className ? item.table.className : '',
                'guide-table guide-table--default transparent']">
              <template #default>
                <thead v-if="item.table.headItems">
                  <tr class="">
                    <th
                      v-for="(headItem, headIndex) in item.table.headItems"
                      :key="headIndex"
                      class="headingText--text text-center text-body-2 font-weight-bold">{{ headItem }}</th>
                  </tr>
                </thead>
                <tbody class="headingText--text text-center">
                  <tr v-for="(trItem, trIndex) in item.table.trItems" :key="trIndex">
                    <td
                      v-for="(tdItem, tdIndex) in trItem"
                      :key="tdIndex"
                      class="guide-table__td text-body-1"
                      v-html="tdItem"></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <!-- 下線のみのシンプルなテーブル -->
            <v-simple-table
              v-if="item.lineTable"
              :class="[
                item.lineTable.className ? item.lineTable.className : '',
                'guide-table guide-table--underline transparent headingText--text']"
            >
              <template #default>
                <tbody>
                  <tr v-for="tableItem in item.lineTable.items" :key="tableItem.title">
                    <td class="guide-table__td text-body-1 font-weight-bold pl-0 py-4" v-html="tableItem.title"></td>
                    <td class="guide-table__td text-body-1 pr-0 py-4" v-html="tableItem.text"></td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <!-- 注釈などのリスト -->
            <guideline-footnote
              v-if="item.noteList"
              :class="Object.keys(item).length === 1 ? '' : 'mt-6'"
              :note-list="item.noteList"></guideline-footnote>

            <!-- 各ページで追加するコンテンツ -->
            <template v-if="item.slotName">
              <slot :name="item.slotName"></slot>
            </template>

            <!-- <template v-if="item.type === 'sub-content'">
              <slot :name="item.name"></slot>
            </template> -->
          </div>
        </template>

      </div>
    </template>
  </div>
</template>

<script>
import links from '@/assets/json/guidelineLink.json'
export default {
  props: {
    guideList: {
      type: Array,
      default: () => [],
    },
    contentList: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    getBtnText(num) {
      return links[num] ? links[num].text : ''
    },
    getBtnUrl(num) {
      return links[num] ? links[num].url : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.guide {
  &__img {
    border: 1px solid $accent;
    border-radius: 10px;
    overflow: hidden;
    width: 57%;
  }

  &__sub {
    --circleSize: 50px;
    background-color: #ddd;
    border-radius: 10px;
    margin-top: 25px;
    position: relative;

    @include mq(sm) {
      --circleSize: 35px;
    }

    &--note {
      &::before {
        content: '※';
        background-color: $accent;
        border-radius: 50%;
        color: #fff;
        font-size: calc(var(--circleSize) * 0.5);
        line-height: var(--circleSize);
        top: calc(var(--circleSize) / -2);
        right: 0;
        left: 0;
        margin: auto;
        width: var(--circleSize);
        height: var(--circleSize);
        text-align: center;
        position: absolute;
      }
    }
  }
}
</style>
