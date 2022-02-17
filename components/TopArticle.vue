<template>
  <section class="article">
    <div class="article__heading px-10 d-flex align-center">
      <v-icon class="mr-5" color="accent">mdi-creation</v-icon>
      <h3 class="zen-kaku-gothic text-h5 letter-space-02em">
        特設ページ<span class="zen-kaku-gothic text-h6 letter-space-02em"
          >ほか</span
        >
      </h3>
      <v-divider color="line" inset></v-divider>
      <v-btn class="ml-5 px-5" outlined
        >一覧へ<v-icon color="primary">mdi-chevron-right</v-icon></v-btn
      >
    </div>
    <v-container class="article__content">
      <v-row class="mx-3 mt-3">
        <v-col v-for="(list, index) in articleLists" :key="index" cols="3">
          <article-card
            :color="list.color"
            :path="list.path"
            :category="list.category"
            :title="list.title"
          ></article-card>
        </v-col>
      </v-row>
    </v-container>
    <div
      class="article__search px-10 d-flex justify-lg-space-around align-center"
    >
      <span class="mr-3 text-body-2">絞り込み</span>
      <v-divider></v-divider>
      <v-list flat class="tag-groups">
        <v-list-item-group
          color="line"
          mandatory
          class="d-flex text-body-2 no-wrap"
          v-model="tag"
        >
          <v-list-item key="0">
            <v-list-item-content
              ><v-list-item-titles class="rounded-pill px-3 py-1 tag--all"
                >ALL</v-list-item-titles
              ></v-list-item-content
            >
          </v-list-item>
          <v-list-item key="1">
            <v-list-item-content
              ><v-list-item-titles class="rounded-pill px-3 py-1 tag--feature"
                >機材特集</v-list-item-titles
              ></v-list-item-content
            >
          </v-list-item>
          <v-list-item key="2">
            <v-list-item-content
              ><v-list-item-titles class="rounded-pill px-3 py-1 tag--suggest"
                >活用提案</v-list-item-titles
              ></v-list-item-content
            >
          </v-list-item>
          <v-list-item key="3">
            <v-list-item-content
              ><v-list-item-titles class="rounded-pill px-3 py-1 tag--catalog"
                >チラシ/カタログ</v-list-item-titles
              ></v-list-item-content
            >
          </v-list-item>
          <v-list-item key="4">
            <v-list-item-content
              ><v-list-item-titles class="rounded-pill px-3 py-1 tag--sns"
                >SNS/情報</v-list-item-titles
              ></v-list-item-content
            >
          </v-list-item>
          <v-list-item key="5">
            <v-list-item-content
              ><v-list-item-titles class="rounded-pill px-3 py-1 tag--sales"
                >販売</v-list-item-titles
              ></v-list-item-content
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      tag: '0',
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.article {
  &__content {
    width: 100%;

    .tag {
      display: inline-block;
      border: 1px solid #ffffff;
    }
  }

  .tag--all {
    border: 1px solid $outline;
    color: $outline;
  }

  .v-list-item--active .tag--all {
    color: #ffffff;
    background-color: $outline;
  }

  .tag--feature {
    border: 1px solid #c97061;
    color: #c97061;
  }

  .v-list-item--active .tag--feature {
    color: #ffffff;
    background-color: #c97061;
  }

  .tag--suggest {
    border: 1px solid #579b8f;
    color: #579b8f;
  }

  .v-list-item--active .tag--suggest {
    color: #ffffff;
    background-color: #579b8f;
  }

  .tag--catalog {
    border: 1px solid #c19c49;
    color: #c19c49;
  }

  .v-list-item--active .tag--catalog {
    color: #ffffff;
    background-color: #c19c49;
  }

  .tag--sns {
    border: 1px solid #638bba;
    color: #638bba;
  }

  .v-list-item--active .tag--sns {
    color: #ffffff;
    background-color: #638bba;
  }

  .tag--sales {
    border: 1px solid #af69aa;
    color: #af69aa;
  }

  .v-list-item--active .tag--sales {
    color: #ffffff;
    background-color: #af69aa;
  }
}
</style>
