<template>
  <v-card
    color="cushion"
    elevation="0"
    min-width="340"
    class="mt-3 d-inline-block">
    <v-card-text>
      <template v-if="itemInfo.Total">
        <div class="d-flex justify-space-between pb-1">
          <span>レンタル期間</span><span>{{ useDay }}日</span>
        </div>
        <p class="d-flex justify-space-between">
          <span>小計</span><span>￥{{itemInfo.SubTotal.toLocaleString()}}</span>
        </p>
        <p class="d-flex justify-space-between mb-2">
          <span>消費税</span><span>￥{{itemInfo.Tax.toLocaleString()}}</span>
        </p>
        <v-divider></v-divider>
        <p class="font-weight-bold text-right mt-2 red--text">
          <span class="text-h7">参考金額 合計</span>&emsp;
          <span class="text-h6 text-md-h5">￥{{itemInfo.Total.toLocaleString()}}</span> (税込)
        </p>
        <p class="font-weight-bold text-right red--text">※送料、作業費等は除く</p>
      </template>
      <template v-else>
        <p class="font-weight-bold text-right mt-2 red--text">
          合計&emsp;
          <span class="text-h5">ASK</span>
        </p>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      required: true
    },
    useDay: {
      type: Number,
      required: false,
      default: 1
    },
  },
}
</script>
<style lang="scss" scoped>
.text-h7{
  font-size: 1.1rem
}
</style>
