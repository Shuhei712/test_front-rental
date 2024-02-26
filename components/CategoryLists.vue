<template>
  <section class="category">
    <div class="category__heading text-h6 font-weight-regular px-12 text-center letter-space-015em">
      <v-icon class="mr-2" color="accent">mdi-shape-outline</v-icon>CATEGORY
    </div>
    <div class="category__lists v-list__color mt-5">
      <v-list v-for="root in categoryLists" :key="root.CategoryName">
        <v-subheader class="category__name text-h6 text-gray bold">
          <v-icon class="category__icon mr-6">{{ root.IconImageURL }}</v-icon> {{ root.CategoryName }}
        </v-subheader>
        <v-list-group v-for="child in root.SubCategoryList" :key="child.name" :value="false">
          <template #activator>
            <v-list-item-title class="text-body-2">{{ child.CategoryName }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="grandChild in child.SubCategoryList"
            :key="grandChild.CategoryName"
            :href="'/products?type=2&categoryID=' + grandChild.CategoryID + '&categoryName=' + grandChild.CategoryName">
            <v-list-item-title class="text-body-2">{{ grandChild.CategoryName }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    categoryLists() {
      return this.$store.getters['category/getLists']
    },
  },
  mounted() {
    this.$store.dispatch('category/getLists')
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';

.category {
  width: 270px;
  &__heading {
    background-color: $cushion;
  }

  &__icon {
    display: inline-block;
    font-size: 2.5rem;
  }

  @include mq(lg) {
    display: none;
  }
}
</style>
