<template>
  <v-card class="item-card px-2 py-3" elevation="0" link to="/products/name"><!--color="#dbebc4"  -->
    <div class="item__img">
      <img class="" :src="isNullCheckImageURL" />
    </div>
    <v-card-title class="item__maker text-body-2 mb-2 px-0">{{ maker }}</v-card-title>
    <v-card-subtitle class="text-caption text-sm-body-2 pa-0" color="text">
      <span class="item__name">{{ name }}</span>&ensp;<span class="item__maker word-keep">{{ model }}</span>
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    path: {
      // type: String,
      required: true,
    },
    maker: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  computed: {
    isNullCheckImageURL() {
      return this.path === null ? '/img/new/no-image.png' : this.path
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.v-card {
  &__subtitle {
    color: $text !important;
    font-weight: 300;
    height: calc(14px * 1.5 * 2); // 文字サイズ×行の高さ×行数
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      background: linear-gradient(to right, rgba(255, 255, 225, 0) 0%, #fff 50%, #fff 100%);
      bottom: 0;
      right: 0;
      width: 25px;
      height: calc(14px * 1.5); // 文字サイズ×行の高さ
      position: absolute;
    }

    @include mq(sm) {
      height: calc(12px * 1.7 * 2); // 文字サイズ×行の高さ×行数

      &::after {
        height: calc(12px * 1.7); // 文字サイズ×行の高さ
      }
    }
  }
}
.item-card {
  width: 100%;
  .item__img {
    width: 100%;
    padding-top: 66.6666%; // 比率3:2
    position: relative;

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
  }
  .item__maker {
    @include mq(sm) {
      font-size: 11px !important;
    }
  }
}
</style>
