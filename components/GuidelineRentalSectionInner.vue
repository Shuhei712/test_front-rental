<template>
  <section :id="guidelineRentalId" class="guide__section">
    <div class="mt-5">
      <div v-if="memberType == 'member'" class="guide__background member px-2 px-md-10 pb-10">
        <diV class="d-flex justify-center">
          <span class="d-inline-block guide__member__title text-center font-weight-bold">お客様側</span>
        </diV>
        <h4 class="guideTitle__background d-flex justify-center text-md-h6 font-weight-bold py-4">{{ guidelineRentalTitle }}</h4>
        <slot></slot>
      </div>
      <div v-if="memberType == 'nonmember'" class="guide__background nonmember px-2 px-md-10 pb-10">
        <diV class="d-flex justify-center">
          <span class="d-inline-block guide__nonmember__title text-center font-weight-bold">お客様側</span>
        </diV>
        <h4 class="guideTitle__background d-flex justify-center text-md-h6 font-weight-bold py-4">{{ guidelineRentalTitle }}</h4>
        <slot></slot>
      </div>
      <div v-if="memberType == 'staff-member--section'" class="guide__background staff__member px-2 px-md-10 pb-10">
        <diV class="d-flex justify-center">
          <span class="d-inline-block guide__staff-member__title text-center font-weight-bold">弊社側</span>
        </diV>
        <h4 class="guideTitle__background d-flex justify-center text-md-h6 font-weight-bold py-4">{{ guidelineRentalTitle }}</h4>
        <slot></slot>
      </div>
      <div v-if="memberType == 'staff-nonmember--section'" class="guide__background staff__nonmember px-2 px-md-10 pb-10">
        <diV class="d-flex justify-center">
          <span class="d-inline-block guide__staff-nonmember__title text-center font-weight-bold">弊社側</span>
        </diV>
        <h4 class="guideTitle__background d-flex justify-center text-md-h6 font-weight-bold py-4">{{ guidelineRentalTitle }}</h4>
        <slot></slot>
      </div>
      <div v-if="memberType == 'staff-member'" class="guide__background member-staff px-2 px-md-10 pb-10">
        <diV class="d-flex justify-center">
          <span class="d-inline-block guide__member-staff__title text-center font-weight-bold">弊社側/お客様側</span>
        </diV>
        <h4 class="guideTitle__background d-flex justify-center text-md-h6 font-weight-bold py-4">{{ guidelineRentalTitle }}</h4>
        <slot></slot>
      </div>
      <div v-if="memberType == 'member-staff'" class="guide__background member-staff px-2 px-md-10 pb-10">
        <diV class="d-flex justify-center">
          <span class="d-inline-block guide__member-staff__title text-center font-weight-bold">お客様側/弊社側</span>
        </diV>
        <h4 class="guideTitle__background d-flex justify-center text-md-h6 font-weight-bold py-4">{{ guidelineRentalTitle }}</h4>
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    guidelineRentalId: {
      type: String,
      default: '',
    },

    memberType: {
      type: String,
      default: '',
    },
    guidelineRentalTitle: {
      type: String,
      default: '',
    },

  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.guide{
  &__section {
    padding-top: 100px;
    margin-top: -100px;
  }
  &__background {
    border-radius: 5px;
    .member{
      background-color: #F7DDD7;
      color: $headingText;
    }
    .nonmember{
      background-color: #C8E8E2;
      color: $headingText;
    }
    .staff {
      &__member {
        background-color: #4B5654;
        color: #F7DDD7;
      }
      &__nonmember {
        background-color: #4B5654;
        color: #C8E8E2;
      }
    }
    .member-staff {
      background-color: #DDDDDD;
      color: $headingText;
    }
  }
  &__member__title {
    background-color: #4B5654;
    color: #F7DDD7;
    min-width: 150px;
  }
  &__nonmember__title {
    background-color: #4B5654;
    color: #C8E8E2;
    min-width: 150px;
  }
  &__staff-member__title {
    background-color: #F7DDD7;
    color: #4B5654;
    min-width: 150px;
  }
  &__staff-nonmember__title {
    background-color: #C8E8E2;
    color: #4B5654;
    min-width: 150px;
  }
  &__member-staff__title {
    background-color: #4B5654;
    color: #DDDDDD;
    min-width: 150px;
  }

  &Title__background {
    @include mq(md){
      font-size: 1.3rem;
    }
    @include mq(sm){
      font-size: 1rem;
    }
  }
}

</style>
