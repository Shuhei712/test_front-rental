<template>
  <v-card class="article rounded" :color="color" :href="link" link target="_blank">
    <div class="d-flex flex-sm-column">
      <div class="article__img order-1 order-sm-0"><img :src="path" :alt="title" /></div>
      <div class="article__title order-0 order-sm-1 flex-grow-1">
        <div class="text-body-2 pa-3 text-white">
          <span class="tag rounded-pill px-5 text-caption text-md-body-2 mb-2 mb-sm-3">
            {{ className }}
          </span>
          <p class="title text-body-2 text-md-body-1 bold">{{ title }}</p>
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
    className: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include mq(sm) {
    max-height: 70px;
  }

  .article__img {
    padding-top: 54%;
    position: relative;

    @include mq(sm) {
      width: 20%;
      min-width: 70px;
      padding-top: 0;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .article__title {
    @include mq(sm) {
      width: 70%;

      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
