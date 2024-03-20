<template>
  <div class="popup text-center">
    <v-dialog v-model="tariffDialog" width="600" scrollable>
      <v-card class="tariff">
        <v-card-title class="tariff__title text-h5">2日目以降の料金</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="tariff__content">
          <v-data-table
            :headers="tariffHeaders"
            :items="items"
            :page.sync="page"
            :items-per-page="5"></v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog()">閉じる</v-btn>
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
      page: 1,
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
      this.page = 1
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/common.scss';

.tariff {
  &__title {
    color: $primary !important;
  }

  &__content {
    @include scrollbar();
  }
}
</style>
