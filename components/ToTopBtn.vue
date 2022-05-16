<template>
  <div class="top__back top__back--fix">
    <v-btn v-scroll-to="'#top'" class="text-caption font-heading pl-3 pl-sm-7 pr-4 pr-sm-8" color="#eff1f4" elevation="0" small>
      <v-icon color="accent" class="ml-n1">mdi-chevron-up</v-icon><span class="btn-text lh-crop-12 font-weight-medium text-gray">トップにもどる</span>
    </v-btn>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__back {
  z-index: 100;
  transform: translate(110%, 0);
  transition: all 0.5s ease-in-out;
}

.top__back--active {
  transform: translate(0, 0);
}

.top__back--fix {
  position: fixed;
  bottom: 20px;
  right: -4px;
}

.top__back--absolute {
  position: absolute;
  bottom: 20px;
  right: -4px;
}
</style>
