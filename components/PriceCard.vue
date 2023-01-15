<template>
  <v-card
    max-width="320"
    color="cushion"
    elevation="0"
    class="ml-auto mt-3">
    <v-card-text>
      <template v-if="itemInfo.Total">
        <p class="d-flex justify-space-between">
          <span>小計</span><span>￥{{itemInfo.SubTotal}}</span>
        </p>
        <p class="d-flex justify-space-between mb-2">
          <span>消費税</span><span>￥{{itemInfo.Tax}}</span>
        </p>
        <v-divider></v-divider>
        <p class="font-weight-bold text-right mt-2 red--text">
          合計&emsp;
          <span class="text-h5">￥{{itemInfo.Total}}</span> (税込)
        </p>
      </template>
      <template v-else>
        <p class="font-weight-bold text-right mt-2 red--text">
          合計&emsp;
          <span class="text-h5">ASK</span>
        </p>
      </template>
    </v-card-text>
    <v-card-actions v-if="calc" tag="div" class="justify-end">
      <v-btn
        class="mt-1"
        dark
        outlined
        elevation="0"
        color="primary"
        @click="getItemInfo">再計算
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    itemInfo: {
      type: Object,
      required: true
    },
    calc: {
      type: Boolean,
      required: true
    },
  },
  methods:{
    getItemInfo(){
      this.$emit('get-item-info')
    }
  }
}
</script>