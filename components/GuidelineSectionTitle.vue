<template>
  <div class="pb-md-3 mb-5">
    <h4 class="d-flex align-center text-gray letter-space-01em text-h6 text-md-h4 font-weight-medium">
      <div class="square font-italic bold text-white mr-5">
        <p class="title-no">{{ menuIndex + 1 }}</p>
      </div>
      {{ getTitle[menuIndex].title }}
    </h4>
  </div>
</template>

<script>
import items from '@/assets/json/guideline.json'
export default {
  props: {
    sectionType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      menuList: items,
    }
  },
  computed: {
    menuIndex() {
      return Object.keys(this.menuList).indexOf(this.sectionType)
    },
    getTitle() {
      return Object.values(this.menuList)
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.square{
  position: relative;
  width: 60px;
  padding-top: 60px;
  background: $accent;
  @include mq(md) {
    width: 50px;
    padding-top: 50px;
  }
}
.title-no{
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  text-align: center;
}

</style>
