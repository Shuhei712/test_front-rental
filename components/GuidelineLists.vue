<template>
  <section class="guidelineList px-3">
    <div class="d-flex align-center justify-center guidelineList__heading text-h6 font-weight-regular px-12 text-center letter-space-015em">
      <v-icon class="mr-2" color="accent">mdi-menu</v-icon>目次
    </div>
    <div class="guidelineList__lists mt-5">

      <v-list nav dense>
        <v-list-group
          v-for="root in guidelineLists"
          :key="root.GuidelineName"
          v-model="root.open"
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title class="text-subtitle-1">{{ root.GuidelineID }}. {{ root.GuidelineName }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <template #appendIcon>
            <v-icon color="primary">
              {{ root.open ? 'mdi-minus' : 'mdi-plus' }}
            </v-icon>
          </template>

          <v-list-item
            v-for="child in root.SubGuidelineList"
            :key="child.SubGuidelineName"
            :to="child.SubGuidelineURL"
          >
            <v-list-item-content>
              <v-list-item-title class="d-flex align-center pl-3">
                <div class="txt-limit">
                  {{ child.SubGuidelineName }}
                </div>
                <v-icon class="ml-1" color="primary">mdi-chevron-right</v-icon>
              </v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    guidelineLists: [
      {
        // カテゴリー
        "GuidelineID": 1,
        "GuidelineName": "レンタル注文",
        "SubGuidelineList": [
          {
            "SubGuidelineNo": 1,
            "SubGuidelineName": "レンタルのご利用について",
            "SubGuidelineURL": "/guideline/rental#about-rental",
          },
          {
            "SubGuidelineNo": 2,
            "SubGuidelineName": "見積もり後の注文依頼について",
            "SubGuidelineURL": "",
          },
          {
            "SubGuidelineNo": 3,
            "SubGuidelineName": "レンタル利用の手順",
            "SubGuidelineURL": "",
          },
          {
            "SubGuidelineNo": 4,
            "SubGuidelineName": "レンタル費用について",
            "SubGuidelineURL": "",
          },
          {
            "SubGuidelineNo": 5,
            "SubGuidelineName": "レンタル商品の引き渡し・返却について",
            "SubGuidelineURL": "",
          },
          {
            "SubGuidelineNo": 6,
            "SubGuidelineName": "モニター金具 / スタンドの利用について",
            "SubGuidelineURL": "",
          },
          {
            "SubGuidelineNo": 7,
            "SubGuidelineName": "設営 / 撤去 / オペレートのご依頼について",
            "SubGuidelineURL": "/guideline/rental#test",
          },
          {
            "SubGuidelineNo": 8,
            "SubGuidelineName": "本サイトでの障害・トラブルについて",
            "SubGuidelineURL": "",
          },
        ],
      },
      {
        // カテゴリー
        "GuidelineID": 2,
        "GuidelineName": "会員機能について",
        "SubGuidelineList": [
          {
            "SubGuidelineNo": 1,
            "SubGuidelineName": "会員タイプについて",
            "SubGuidelineURL": "",
          },
          {
            "SubGuidelineNo": 2,
            "SubGuidelineName": "ユーザー情報の変更について",
            "SubGuidelineURL": "",
          },
        ],
      },
      {
        // カテゴリー
        "GuidelineID": 3,
        "GuidelineName": "本人確認について",
        "SubGuidelineList": [
          {
            "SubGuidelineNo": 1,
            "SubGuidelineName": "一般会員の本人確認書類",
            "SubGuidelineURL": "",
          },
          {
            "SubGuidelineNo": 2,
            "SubGuidelineName": "法人会員の本人確認書類",
            "SubGuidelineURL": "",
          },
        ],
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';

.v-list {
  padding: 0;
}

.txt-limit {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.guidelineList {
  min-width: 270px;
  &__heading {
    background-color: $cushion;
  }

  &__icon {
    display: inline-block;
    font-size: 2.5rem;
  }

  @include mq(lg) {
    display: none;
  }
}
</style>
