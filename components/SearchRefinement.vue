<template>
  <div class="search-refinement text-center">
    <v-dialog v-model="dialogFlg" width="700">
      <v-card class="dialog-card">
        <v-btn class="dialog-close" fab color="#ffffff" elevation="0" @click="closeDialog()">
          <v-icon color="primary"> mdi-close </v-icon>
        </v-btn>
        <v-btn
          class="dialog-back"
          :class="{ active: backBtnFlg }"
          fab
          color="#ffffff"
          elevation="0"
          @click="toggleFlg()">
          <v-icon color="primary"> mdi-chevron-left </v-icon>
        </v-btn>
        <v-card-title class="refinement__title zen-kaku-gothic d-flex justify-center text-subtitle-1 text-lg-h6">
          検索条件を変更して検索する
        </v-card-title>
        <v-card-text class="refinement__terms mt-5">
          <search-category :category-flg="categoryFlg"></search-category>
          <search-maker :maker-flg="makerFlg"></search-maker>
          <search-price :price-flg="priceFlg"></search-price>
          <search-tag :tag-flg="tagFlg"></search-tag>
          <v-row>
            <v-col cols="12">
              <div class="terms__title">キーワード</div>
              <v-text-field
                class="mt-2 text-body-2"
                label="キーワードを入力できます"
                dense
                outlined
                hide-details="auto"></v-text-field>
            </v-col>
            <v-col cols="12">
              <div class="terms__title d-flex">
                カテゴリー
                <v-spacer></v-spacer>
                <v-btn elevation="0" color="cushion" small>
                  <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
                </v-btn>
              </div>
              <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openCategory()">
                <v-col cols="11">スイッチャー</v-col>
                <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div class="terms__title d-flex">
                メーカー
                <v-spacer></v-spacer>
                <v-btn elevation="0" color="cushion" small>
                  <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
                </v-btn>
              </div>
              <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openMaker()">
                <v-col cols="11">Blackmagic Design / Roland </v-col>
                <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div class="terms__title d-flex">
                価格
                <v-spacer></v-spacer>
                <v-btn elevation="0" color="cushion" small>
                  <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
                </v-btn>
              </div>
              <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openPrice()">
                <v-col cols="11">0 - 10,000 円</v-col>
                <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <div class="terms__title d-flex">
                特徴
                <v-spacer></v-spacer>
                <v-btn elevation="0" color="cushion" small>
                  <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
                </v-btn>
              </div>
              <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openTag()">
                <v-col cols="11">未設定</v-col>
                <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row justify="center">
            <v-col cols="10" lg="5">
              <v-btn color="primary" elevation="0" block>
                <v-icon class="mr-2">mdi-text-search</v-icon>この条件で検索
              </v-btn>
            </v-col>
            <v-col cols="10" lg="5">
              <v-btn v-if="!backBtnFlg" color="cushion" elevation="0" block>
                <v-icon class="mr-2">mdi-selection-ellipse</v-icon>すべての条件をリセット
              </v-btn>
              <v-btn v-else color="primary" elevation="0" block @click="toggleFlg()">
                <v-icon class="mr-2">mdi-chevron-left</v-icon>選択状態で戻る
              </v-btn>
            </v-col>
            <v-col cols="10" lg="5">
              <v-btn color="outline" block outlined @click="closeDialog()">
                <v-icon class="mr-2" color="primary">mdi-close</v-icon>変更せずに閉じる
              </v-btn>
            </v-col>
          </v-row>
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
  },
  data() {
    return {
      active: false,
      categoryFlg: false,
      makerFlg: false,
      priceFlg: false,
      tagFlg: false,
      backBtnFlg: false,
    }
  },
  computed: {
    dialogFlg: {
      get() {
        return this.$props.dialog
      },
      set(value) {
        this.$emit('change-dialog', value)
      },
    },
  },
  methods: {
    closeDialog() {
      this.dialogFlg = false
    },
    toggleFlg() {
      this.backBtnFlg = !this.backBtnFlg
      this.categoryFlg = false
      this.makerFlg = false
      this.priceFlg = false
      this.tagFlg = false
    },
    openCategory() {
      this.categoryFlg = true
      this.backBtnFlg = true
    },
    openMaker() {
      this.makerFlg = true
      this.backBtnFlg = true
    },
    openPrice() {
      this.priceFlg = true
      this.backBtnFlg = true
    },
    openTag() {
      this.tagFlg = true
      this.backBtnFlg = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.dialog-card {
  position: relative;
  overflow: hidden;

  .dialog-close {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .dialog-back {
    position: absolute;
    top: 5px;
    left: 5px;
    transform: translate(-120%, 0);
    transition: all 0.25s ease-in-out;
  }

  .dialog-back.active {
    transform: translate(0, 0);
  }
}

.refinement__terms {
  position: relative;
}

.terms__box {
  border: 1px solid $outline;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
}
</style>
