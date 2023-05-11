<template>
  <v-card
    max-width="320"
    color="cushion"
    elevation="0"
    class="ml-auto mt-3">
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
          参考金額 合計&emsp;
          <span class="text-h5">￥{{itemInfo.Total.toLocaleString()}}</span> (税込)
        </p>
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
