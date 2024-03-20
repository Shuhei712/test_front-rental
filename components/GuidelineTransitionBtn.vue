<template> 
  <div class="guide__transition">
    <v-row class="d-flex justify-space-around">
      <v-col cols="12" md="6">
        <v-row class="guide__transition__left">
          <v-col cols="1" class="d-flex justify-end justify-md-start align-center pa-0">
            <a v-if="prev" :href="prev.url">
              <v-icon color="primary" x-large>mdi-chevron-left</v-icon>
            </a>
          </v-col>
          <v-col cols="9" md="11" class="px-0 pr-md-2 px-lg-2">
            <v-btn v-if="prev" :href="prev.url" class="d-flex justify-center guide__transition__btn bg-white text-caption text-sm-body-2" color="primary" elevation="0" outlined x-large>
              <span class="lh-crop-12 font-weight-medium">{{ prev.No + 1 }}. {{ prev.title }}</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row class="guide__transition__light">
          <v-col cols="9" md="11" class="px-0 pl-md-2 px-lg-2">
            <v-btn v-if="next" :href="next.url" class="d-flex justify-center guide__transition__btn bg-white text-caption text-sm-body-2" color="primary" elevation="0" outlined x-large>
              <span class="lh-crop-12 font-weight-medium">{{ next.No + 1 }}. {{ next.title }}</span>
            </v-btn>
          </v-col>
          <v-col cols="1" class="d-flex justify-start justify-md-end  align-center pa-0">
            <a v-if="next" :href="next.url">
              <v-icon color="primary" x-large>mdi-chevron-right</v-icon>
            </a>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
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
    &__left {
      justify-content: start;
      @include mq(xsm){
        justify-content: center;
      }
    }
    &__light {
      justify-content: end;
      @include mq(xsm){
        justify-content: center;
      }
    }
  }
}

</style>
