<template> 
  <v-row class="guide__transition d-flex justify-space-around">
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="1" class="d-flex justify-end align-center">
          <a v-if="prev" :href="prev.url">
            <v-icon color="primary"  x-large>mdi-chevron-left</v-icon>
          </a>
        </v-col>
        <v-col cols="11" class="pl-0">
          <v-btn v-if="prev" :href="prev.url" class="d-flex justify-center guide__transition__btn bg-white text-caption text-sm-body-2" color="primary" elevation="0" outlined x-large>
            <span class="lh-crop-12 font-weight-medium">{{ prev.No + 1 }}. {{ prev.title }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="6">
      <v-row>
        <v-col cols="11" class="pr-0">
          <v-btn v-if="next" :href="next.url" class="d-flex justify-center guide__transition__btn bg-white text-caption text-sm-body-2" color="primary" elevation="0" outlined x-large>
            <span class="lh-crop-12 font-weight-medium">{{ next.No + 1 }}. {{ next.title }}</span>
          </v-btn>
        </v-col>
        <v-col cols="1" class="d-flex justify-start align-center">
          <a v-if="next" :href="next.url">
            <v-icon color="primary"  x-large>mdi-chevron-right</v-icon>
          </a>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import items from '@/assets/json/guideline.json'
export default {
  data() {
    return {
      menuList: items,
      prev: '',
      next: '',
    }
  },
  mounted() {
    this.getTransition()
  },
  methods: {
    getTransition() {
      this.getUrl = this.$route.path.split('/').pop();
      const key = this.getUrl;
      const keys = Object.keys(this.menuList);
      const index = keys.indexOf(key);
      const prevIndex = index - 1;
      const nextIndex = index + 1;
      const prevKey = keys[prevIndex];
      const nextKey = keys[nextIndex];
      const prevElement = this.menuList[prevKey];
      const nextElement = this.menuList[nextKey];
      if(prevElement){
        this.prev = {
          No: prevIndex,
          title: prevElement.title,
          url: "/guide/" + prevKey,
        };
      }
      if(nextElement){
        this.next = {
          No: nextIndex,
          title: nextElement.title,
          url: "/guide/" + nextKey,
        };
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.guide{
  &__transition {
    max-width: 1200px;
    margin: 0 auto;
    width: 95%;
    &__btn{
      width: 100%;
    }
    &__icon::before{
      background-color: #fff;
    }
  }
}

</style>
