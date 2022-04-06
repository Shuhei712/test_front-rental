<template>
  <section class="pickup mx-0 mx-sm-5 mb-5">
    <h3 class="pickup__heading text-center">
      <span class="orange_line zen-kaku-gothic text-lg-h6 text-subtitle-1 letter-space-015em"
        >おすすめレンタル機材ピックアップ</span
      >
    </h3>
    <div class="pickup__content mt-5 py-10">
      <img class="monitan" src="/img/pickup/monitan.png" alt="モニタン" />
      <img class="protan" src="/img/pickup/protan.png" alt="プロタン" />
      <div v-for="(list, index) in pickupLists" :key="index" class="item">
        <div class="item__heading px-10 d-flex align-center flex-column flex-lg-row mt-8 mt-lg-0">
          <div class="d-flex align-center">
            <img class="icon mr-3" :src="list.IconImageURL" :alt="list.IconImageURL" />
            <h4 class="zen-kaku-gothic text-h6 text-lg-h5 letter-space-02em">
              {{ list.PageCategoryName }}
            </h4>
          </div>
          <v-divider class="hidden-md-and-down" color="line" inset></v-divider>
          <v-btn
            :to="'/category/' + list.PageCategoryID + '?categoryName=' + list.PageCategoryName"
            class="ml-5 mt-8 mt-lg-0"
            outlined>
            一覧へ
            <v-icon color="primary">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <v-container class="item__content pa-0 pa-lg-3">
          <v-row class="ma-3">
            <v-col v-for="(item, num) in list.PickupProductList" :key="num" class="pa-1 pa-lg-0" cols="6" md="3">
              <item-card :path="item.ImageURL" :maker="item.MakerName" :name="item.ProductName"></item-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <div class="pickup__btn text-center">
      <v-btn to="/category" class="bg-white" outlined>
        <v-icon class="mr-2" color="primary">mdi-shape-outline</v-icon>すべてのカテゴリから探す
        <v-icon color="primary">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    pickupLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // pickupLists: [
      //   {
      //     title: 'LEDディスプレイ',
      //     icon: '/img/category/led-display.png',
      //     link: '/catgory',
      //     itemLists: [
      //       {
      //         path: '/img/pickup/pickup_01.png',
      //         maker: 'ArkVentures',
      //         name: '屋内・屋外兼用 シースル ーLED BlackModel A…',
      //       },
      //       {
      //         path: '/img/pickup/pickup_01.png',
      //         maker: 'ArkVentures',
      //         name: '屋内・屋外兼用 シースル ーLED BlackModel A…',
      //       },
      //       {
      //         path: '/img/pickup/pickup_01.png',
      //         maker: 'ArkVentures',
      //         name: '屋内・屋外兼用 シースル ーLED BlackModel A…',
      //       },
      //       {
      //         path: '/img/pickup/pickup_01.png',
      //         maker: 'ArkVentures',
      //         name: '屋内・屋外兼用 シースル ーLED BlackModel A…',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'プロジェクター',
      //     icon: '/img/category/projector.png',
      //     link: '/catgory',
      //     itemLists: [
      //       {
      //         path: '/img/pickup/pickup_02.png',
      //         maker: 'Panasonic',
      //         name: 'レーザープロジェクター 50000lm PT-RQ50KJ…',
      //       },
      //       {
      //         path: '/img/pickup/pickup_02.png',
      //         maker: 'Panasonic',
      //         name: 'レーザープロジェクター 50000lm PT-RQ50KJ…',
      //       },
      //       {
      //         path: '/img/pickup/pickup_02.png',
      //         maker: 'Panasonic',
      //         name: 'レーザープロジェクター 50000lm PT-RQ50KJ…',
      //       },
      //       {
      //         path: '/img/pickup/pickup_02.png',
      //         maker: 'Panasonic',
      //         name: 'レーザープロジェクター 50000lm PT-RQ50KJ…',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'ディスプレイ・モニター',
      //     icon: '/img/category/display.png',
      //     link: '/catgory',
      //     itemLists: [
      //       {
      //         path: '/img/pickup/pickup_03.png',
      //         maker: 'Panasonic',
      //         name: '4K対応 86in液晶ディスプレイ TH-86SQ1HJ',
      //       },
      //       {
      //         path: '/img/pickup/pickup_03.png',
      //         maker: 'Panasonic',
      //         name: '4K対応 86in液晶ディスプレイ TH-86SQ1HJ',
      //       },
      //       {
      //         path: '/img/pickup/pickup_03.png',
      //         maker: 'Panasonic',
      //         name: '4K対応 86in液晶ディスプレイ TH-86SQ1HJ',
      //       },
      //       {
      //         path: '/img/pickup/pickup_03.png',
      //         maker: 'Panasonic',
      //         name: '4K対応 86in液晶ディスプレイ TH-86SQ1HJ',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'PC/ICTネットワーク機器',
      //     icon: '/img/category/network.png',
      //     link: '/catgory',
      //     itemLists: [
      //       {
      //         path: '/img/pickup/pickup_04.png',
      //         maker: 'Logicool',
      //         name: '4K小型カメラ BRIO C1000eR',
      //       },
      //       {
      //         path: '/img/pickup/pickup_04.png',
      //         maker: 'Logicool',
      //         name: '4K小型カメラ BRIO C1000eR',
      //       },
      //       {
      //         path: '/img/pickup/pickup_04.png',
      //         maker: 'Logicool',
      //         name: '4K小型カメラ BRIO C1000eR',
      //       },
      //       {
      //         path: '/img/pickup/pickup_04.png',
      //         maker: 'Logicool',
      //         name: '4K小型カメラ BRIO C1000eR',
      //       },
      //     ],
      //   },
      // ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.pickup {
  margin-top: 100px;
  position: relative;

  @include mq(sm) {
    margin-top: 100px;
    background-color: $cushion;
  }

  &__heading {
    position: relative;

    @include mq(sm) {
      margin-bottom: 150px;
    }
  }

  &__heading::before,
  &__heading::after {
    position: relative;
    display: inline-block;
    content: '';
    background: $accent;
    width: 2px;
    height: 2em;
    margin: 0 1em;
    margin-top: -0.2em;
    vertical-align: middle;
  }

  &__heading:before {
    transform: rotate(-35deg);
  }

  &__heading:after {
    transform: rotate(35deg);
  }

  &__content {
    position: relative;
    border: 1px solid $accent;
    border-radius: 10px;

    @include mq(sm) {
      border: none;
    }

    .monitan {
      height: 135px;
      object-fit: contain;
      position: absolute;
      top: calc(-135px / 1.25);
      left: 0;

      @include mq(sm) {
        height: 100px;
        left: 100px;
      }
    }
    .protan {
      height: 90px;
      object-fit: contain;
      position: absolute;
      top: calc(-90px / 1.25);
      right: 0;

      @include mq(sm) {
        height: 70px;
        right: 100px;
      }
    }
  }

  &__btn {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .item__heading {
    .v-btn {
      @include mq(sm) {
        background-color: #ffffff !important;
      }
    }
  }
}
</style>
