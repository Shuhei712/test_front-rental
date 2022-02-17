<template>
  <section class="new">
    <div class="new__heading px-10 d-flex align-center">
      <v-icon class="mr-5" color="accent">mdi-creation</v-icon>
      <h3 class="zen-kaku-gothic text-h5 letter-space-02em">新着機材</h3>
      <v-divider color="line" inset></v-divider>
      <v-btn class="ml-5 px-5" outlined
        >一覧へ<v-icon color="primary">mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <v-container class="new__content">
      <v-row class="ma-3">
        <v-col v-for="(list, index) in newItemLists" :key="index" cols="3">
          <item-card
            :path="list.path"
            :maker="list.maker"
            :name="list.name"
          ></item-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
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
  &__content {
    width: 100%;
  }
}
</style>
