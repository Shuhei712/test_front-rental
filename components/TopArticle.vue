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
    <div class="article__search px-10 d-flex justify-space-around align-center">
      <span class="mr-3 text-body-2">絞り込み</span>
      <v-divider></v-divider>
      <v-list flat class="search__category">
        <v-list-item-group
          v-model="tag"
          color="line"
          mandatory
          class="d-flex text-body-2 no-wrap"
        >
          <v-list-item v-for="list in categoryLists" :key="list.value">
            <v-list-item-content
              ><v-list-item-title
                class="rounded-pill px-3 py-1"
                :class="list.style"
                >{{ list.name }}</v-list-item-title
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
      tag: 0,
      articleLists: [
        {
          color: 'feature',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: '機材特集',
          title: 'センダーボックス特集',
        },
        {
          color: 'suggest',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: '活用提案',
          title: 'ライブ配信ソリューション',
        },
        {
          color: 'feature',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: '機材特集',
          title: '体表面温度測定 サーモグラフィカメラ',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
      ],
      categoryLists: [
        {
          name: 'ALL',
          value: 0,
          style: 'tag--all',
        },
        {
          name: '機材特集',
          value: 1,
          style: 'tag--feature',
        },
        {
          name: '活用提案',
          value: 2,
          style: 'tag--suggest',
        },
        {
          name: 'チラシ/カタログ',
          value: 3,
          style: 'tag--catalog',
        },
        {
          name: 'sns',
          value: 4,
          style: 'tag--sns',
        },
        {
          name: '販売',
          value: 5,
          style: 'tag--sales',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.article {
  &__content {
    width: 100%;
  }

  .tag--all {
    border: 1px solid $outline;
    color: $outline;
  }

  .tag--feature {
    border: 1px solid $feature;
    color: $feature;
  }

  .tag--suggest {
    border: 1px solid $suggest;
    color: $suggest;
  }

  .tag--catalog {
    border: 1px solid $catalog;
    color: $catalog;
  }

  .tag--sns {
    border: 1px solid $sns;
    color: $sns;
  }

  .tag--sales {
    border: 1px solid $sales;
    color: $sales;
  }

  .v-list-item--active .tag--all,
  .v-list-item--active .tag--feature,
  .v-list-item--active .tag--suggest,
  .v-list-item--active .tag--catalog,
  .v-list-item--active .tag--sns,
  .v-list-item--active .tag--sales {
    color: #ffffff !important;
  }

  .v-list-item--active .tag--all {
    background-color: $outline;
  }

  .v-list-item--active .tag--feature {
    background-color: $feature;
  }

  .v-list-item--active .tag--suggest {
    background-color: $suggest;
  }

  .v-list-item--active .tag--catalog {
    background-color: $catalog;
  }

  .v-list-item--active .tag--sns {
    background-color: $sns;
  }

  .v-list-item--active .tag--sales {
    background-color: $sales;
  }
}
</style>
