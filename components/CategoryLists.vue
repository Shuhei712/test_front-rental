<template>
  <section class="category">
    <div class="category__heading text-h6 px-12 text-center letter-space-015em">
      <v-icon class="mr-2" color="accent">mdi-shape-outline</v-icon>CATEGORY
    </div>
    <div class="category__lists mt-5">
      <v-list v-for="root in categoryLists" :key="root.CategoryName">
        <v-subheader class="category__name text-h6 bold">
          <img class="mr-2" :src="root.IconImageURL" /> {{ root.CategoryName }}
        </v-subheader>
        <v-list-group v-for="child in root.SubCategoryList" :key="child.name" :value="false">
          <template #activator>
            <v-list-item-title class="text-body-2">{{ child.CategoryName }}</v-list-item-title>
          </template>
          <v-list-item v-for="grandChild in child.SubCategoryList" :key="grandChild.CategoryName" link>
            <v-list-item-title class="text-body-2">{{ grandChild.CategoryName }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    categoryLists: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.category {
  width: 270px;
  &__heading {
    background-color: $cushion;
  }
  &__name {
    color: $headingText;
  }

  &__lists {
    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
  }

  @include mq(lg) {
    display: none;
  }
}
</style>
