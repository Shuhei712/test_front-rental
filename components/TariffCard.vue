<template>
  <div class="tariff-wrap text-center">
    <v-dialog v-model="tariffDialog" width="600">
      <v-card class="tariff">
        <v-card-title class="text-h5 primary text-white"> 2日目以降の料金 </v-card-title>
        <v-card-text>
          <v-data-table :headers="tariffHeaders" :items="items" :items-per-page="5"></v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog()">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tariffHeaders: [
        { text: '日数', value: 'RateDay', align: 'start' },
        { text: '掛け率', value: 'RateValue', align: 'start' },
        { text: '料金(円)', value: 'Price', align: 'start', sortable: false },
      ],
    }
  },
  computed: {
    tariffDialog: {
      get() {
        return this.$props.dialog
      },
      set(value) {
        this.$emit('change-tariff-dialog', value)
      },
    },
  },
  methods: {
    closeDialog() {
      this.tariffDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
.tariff-wrap {
  z-index: 600;
}
</style>
