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
        <v-col cols="3">
          <v-card elevation="0" link>
            <v-img contain height="125" src="/img/new/item_01.png"></v-img>
            <v-card-title class="text-body-2 mb-2">SAMSUNG</v-card-title>
            <v-card-subtitle class="text-body-2" color="text"
              >4K対応 75in液晶ディスプレイ QH75R</v-card-subtitle
            >
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="0" link>
            <v-img contain height="125" src="/img/new/item_02.png"></v-img>
            <v-card-title class="text-body-2 mb-2">Roland</v-card-title>
            <v-card-subtitle class="text-body-2" color="text"
              >ストリーミングビデオミキサー V-02HD MKⅡ</v-card-subtitle
            >
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="0" link>
            <v-img contain height="125" src="/img/new/item_03.png"></v-img>
            <v-card-title class="text-body-2 mb-2">SAMSUNG</v-card-title>
            <v-card-subtitle class="text-body-2" color="text"
              >32in液晶ディスプレイ QM32R</v-card-subtitle
            >
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card elevation="0" link>
            <v-img contain height="125" src="/img/new/item_04.png"></v-img>
            <v-card-title class="text-body-2 mb-2">ZOOM</v-card-title>
            <v-card-subtitle class="text-body-2" color="text"
              >ポッドキャストレコーダー PodTrak P8</v-card-subtitle
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.new {
  &__content {
    width: 100%;
  }
}
</style>
