<template>
  <div class="popup text-center">
    <v-dialog v-model="caseSizeDialog" width="600" scrollable>
      <v-card class="case-size">
        <v-card-title class="case-size__title text-h5">ケースサイズ</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="case-size__content">
          <div class="table my-3">
            <div class="table-head d-flex align-center px-3 py-2 mb-2">
              <v-icon class="mr-2">mdi-table</v-icon>ケースサイズ表
            </div>
            <v-data-table
              :headers="caseSizeHeaders"
              :items="caseSizeTableItem"
              disable-sort
              dense
              hide-default-footer></v-data-table>
          </div>
          <div v-if="caseSizeInfo.Description !== null" class="description my-3">
            <div class="description-head d-flex align-center px-3 py-2 mb-2">
              <v-icon class="mr-2">mdi-alert-circle-check-outline</v-icon>詳細・注意事項
            </div>
            <p class="description-content">{{ caseSizeInfo.Description }}</p>
          </div>
          <div v-if="caseSizeInfo.CaseImageURL01 !== null" class="image my-3">
            <div class="image-head d-flex align-center px-3 py-2 mb-2">
              <v-icon class="mr-2">mdi-file-image-outline </v-icon>参考イメージ
            </div>
            <div v-if="caseSizeInfo.CaseImageURL01 !== null" class="image-content text-center">
              <img :src="caseSizeInfo.CaseImageURL01" alt="ケースイメージ1" />
            </div>
            <div v-if="caseSizeInfo.CaseImageURL02 !== null" class="image-content text-center">
              <img :src="caseSizeInfo.CaseImageURL02" alt="ケースイメージ2" />
            </div>
            <div v-if="caseSizeInfo.CaseImageURL03 !== null" class="image-content text-center">
              <img :src="caseSizeInfo.CaseImageURL03" alt="ケースイメージ3" />
            </div>
            <div v-if="caseSizeInfo.CaseImageURL04 !== null" class="image-content text-center">
              <img :src="caseSizeInfo.CaseImageURL04" alt="ケースイメージ4" />
            </div>
            <div v-if="caseSizeInfo.CaseImageURL05 !== null" class="image-content text-center">
              <img :src="caseSizeInfo.CaseImageURL05" alt="ケースイメージ5" />
            </div>
          </div>
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
    caseSizeInfo: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      caseSizeHeaders: [
        { text: '幅(W)[mm]', value: 'CaseSize_W', align: 'center' },
        { text: '高さ(H)[mm]', value: 'CaseSize_H', align: 'center' },
        { text: '奥行(D)[mm]', value: 'CaseSize_D', align: 'center' },
        { text: 'キャスター', value: 'CasterFlg', align: 'center' },
      ],
    }
  },
  computed: {
    caseSizeDialog: {
      get() {
        return this.$props.dialog
      },
      set(value) {
        this.$emit('change-case-size-dialog', value)
      },
    },
    caseSizeTableItem() {
      const caseSize = {}
      const caseSizeItem = []
      caseSize.CaseSize_D = this.caseSizeInfo.CaseSize_D
      caseSize.CaseSize_H = this.caseSizeInfo.CaseSize_H
      caseSize.CaseSize_W = this.caseSizeInfo.CaseSize_W
      caseSize.CasterFlg = this.caseSizeInfo.CasterFlg ? 'あり' : 'なし'
      caseSizeItem.push(caseSize)
      return caseSizeItem
    },
  },
  methods: {
    closeDialog() {
      this.caseSizeDialog = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/common.scss';
.case-size {
  &__content {
    @include scrollbar();
  }

  &__title {
    color: $primary !important;
  }

  .table-head,
  .description-head,
  .image-head {
    background-color: $cushion;
  }

  .description-content {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .image-content {
    img {
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
