<template>
  <section class="new px-3 px-lg-0">
    <div class="new__heading d-flex align-center">
      <v-icon class="mr-3 mr-md-5" color="accent">mdi-creation</v-icon>
      <h3 class="font-heading text-h6 text-md-h5 letter-space-02em mr-4 mr-md-9">新着機材</h3>
      <v-divider color="line" class="heading__line"></v-divider>
      <v-btn class="ml-4 ml-md-5" outlined color="headingText" elevation="2" small>
        <span class="lh-crop-12">一覧へ</span><v-icon color="primary" class="mr-n2">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-container class="new__content pt-6 pb-16 px-0">
      <v-row>
        <v-col v-for="(list, index) in newProductLists" :key="index" cols="6" md="3" class="item__col d-flex">
          <item-card
            :path="list.ImageURL"
            :maker="list.MakerName"
            :name="list.ProductName"
            :link="'/products/' + list.ProductID + '?name=' + list.ProductName"
            :model="list.ProductTypeNumber"></item-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    newProductLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newItemLists: [
        {
          path: '/img/new/item_01.png',
          maker: 'SAMSUNG',
          name: '4K対応 75in液晶ディスプレイ QH75R',
        },
        {
          path: '/img/new/item_02.png',
          maker: 'Roland',
          name: 'ストリーミングビデオミキサー V-02HD MKⅡ',
        },
        {
          path: '/img/new/item_03.png',
          maker: 'SAMSUNG',
          name: '32in液晶ディスプレイ QM32R',
        },
        {
          path: '/img/new/item_04.png',
          maker: 'ZOOM',
          name: 'ポッドキャストレコーダー PodTrak P8',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.new {
  &__heading {
    width: 95%;
    margin: 0 auto;

    @include mq(sm) {
      width: 100%;
    }

    .heading__line {
      border: none;
      border-top: 1px solid $line;
    }
  }

  &__content {
    @include mq(sm) {
      width: 100% !important;
    }

    .row {
      margin: -5px -6px !important;
    }
    .item__col {
      padding: 5px 6px !important;
    }
  }
}
</style>
