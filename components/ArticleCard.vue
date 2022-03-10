<template>
  <v-card class="article rounded" :color="color" elevation="0" link>
    <div class="d-flex flex-md-column">
      <div class="article__img order-1 order-md-0"><img :src="path" /></div>
      <div class="article__title order-0 order-md-1 flex-grow-1">
        <div class="text-body-2 pa-3 mb-0 mb-md-2 text-white">
          <span class="tag rounded-pill px-5 text-body-2 mb-2 mb-md-3">
            {{ category }}
          </span>
          <p class="text-body-2">{{ title }}</p>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.tag {
  display: inline-block;
  border: 1px solid #ffffff;
}

.article {
  max-height: 220px;
  @include mq(md) {
    max-height: 70px;
  }

  .article__img {
    img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      @include mq(md) {
        border-top-left-radius: 0px;
        border-bottom-right-radius: 10px;
        width: 70px;
        height: 70px;
      }
    }
  }
}
</style>
