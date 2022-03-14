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
        <v-card-title class="refinement__title text-subtitle-1 text-lg-h6 zen-kaku-gothic d-flex justify-center">
          検索条件を変更して検索する
        </v-card-title>
        <v-card-text class="refinement__terms mt-5">
          <div class="terms__category pa-4 pa-lg-8 text-body-1 d-flex flex-column" :class="{ active: categoryFlg }">
            <div class="category__title">
              カテゴリーを選択<v-btn class="ml-5" elevation="0" color="cushion" small
                ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
              >
            </div>
            <div class="category__lists mt-8 flex-grow-1 overflow-auto">
              <v-row justify="center">
                <v-col v-for="(list, index) in categoryLists" :key="index" cols="11" class="category-list py-4">
                  <label
                    ><input class="terms__checkbox" type="checkbox" :value="list.name" /><span
                      class="checkbox__parts text-body-2"
                      >{{ list.name }}</span
                    ></label
                  >
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="terms__maker pa-4 pa-lg-8 text-body-1 d-flex flex-column" :class="{ active: makerFlg }">
            <div class="maker__title">
              メーカーを選択<v-btn class="ml-5" elevation="0" color="cushion" small
                ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
              >
            </div>
            <div class="maker__lists mt-8 flex-grow-1 overflow-auto">
              <v-row>
                <v-col v-for="(list, index) in makerLists" :key="index" cols="11" md="6" class="maker-list py-4">
                  <label
                    ><input class="terms__checkbox" type="checkbox" :value="list.name" /><span
                      class="checkbox__parts text-body-2"
                      >{{ list.name }}</span
                    ></label
                  >
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="terms__price pa-4 pa-lg-8 text-body-1 d-flex flex-column" :class="{ active: priceFlg }">
            <div class="price__title">
              価格を選択<v-btn class="ml-5" elevation="0" color="cushion" small
                ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
              >
            </div>
            <div class="price__lists mt-8 pa-5 flex-grow-1 overflow-auto">
              <v-row>
                <v-col cols="12"
                  ><v-range-slider
                    v-model="range"
                    :max="max"
                    :min="min"
                    hide-details
                    prepend-icon="mdi-cash-check"></v-range-slider
                ></v-col>
                <v-col cols="6">
                  <v-text-field
                    :value="range[0]"
                    class="ml-0"
                    hide-details
                    type="number"
                    label="Min"
                    suffix="円"
                    @change="$set(range, 0, $event)"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <div class="text-right"></div>
                  <v-text-field
                    :value="range[1]"
                    class="mr-0"
                    hide-details
                    type="number"
                    label="Max"
                    suffix="円"
                    @change="$set(range, 1, $event)"></v-text-field>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="terms__tag pa-4 pa-lg-8 text-body-1 d-flex flex-column" :class="{ active: tagFlg }">
            <div class="tag__title">
              特徴を選択<v-btn class="ml-5" elevation="0" color="cushion" small
                ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
              >
            </div>
            <div class="tag__lists mt-8 flex-grow-1 overflow-auto">
              <v-row>
                <v-col v-for="(list, index) in tagLists" :key="index" cols="11" md="6" class="maker-list py-4">
                  <label
                    ><input class="terms__checkbox" type="checkbox" :value="list.name" /><span
                      class="checkbox__parts text-body-2"
                      >{{ list.name }}</span
                    ></label
                  >
                </v-col>
              </v-row>
            </div>
          </div>
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
                <v-btn elevation="0" color="cushion" small
                  ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
                >
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
                <v-btn elevation="0" color="cushion" small
                  ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
                >
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
                <v-btn elevation="0" color="cushion" small
                  ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
                >
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
                <v-btn elevation="0" color="cushion" small
                  ><v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除</v-btn
                >
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
            <v-col cols="10" lg="5"
              ><v-btn color="primary" elevation="0" block
                ><v-icon class="mr-2">mdi-text-search</v-icon>この条件で検索</v-btn
              ></v-col
            >
            <v-col cols="10" lg="5"
              ><v-btn v-if="!backBtnFlg" color="cushion" elevation="0" block
                ><v-icon class="mr-2">mdi-selection-ellipse</v-icon>すべての条件をリセット</v-btn
              ><v-btn v-else color="primary" elevation="0" block @click="toggleFlg()"
                ><v-icon class="mr-2">mdi-chevron-left</v-icon>選択状態で戻る</v-btn
              >
            </v-col>
            <v-col cols="10" lg="5"
              ><v-btn color="outline" block outlined @click="closeDialog()"
                ><v-icon class="mr-2" color="primary">mdi-close</v-icon>変更せずに閉じる</v-btn
              ></v-col
            >
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
      min: 100,
      max: 1500000,
      range: [100, 1500000],
      tagFlg: false,
      backBtnFlg: false,
      checkedNames: '',
      categoryLists: [
        { name: 'オンラインイベント機器' },
        { name: 'スイッチャー' },
        { name: 'メディアサーバー' },
        { name: 'カメラ周辺機器' },
        { name: 'VRゴーグル' },
        { name: 'モーションキャプチャ・センサ' },
        { name: 'クロマキー合成' },
        { name: '照明機器' },
        { name: 'エンコーダ・デコーダ' },
        { name: '音響機器' },
        { name: '周辺機器' },
      ],
      makerLists: [
        { name: 'アイリスオーヤマ' },
        { name: 'AOKA' },
        { name: 'Insta360' },
        { name: 'エルビーエル' },
        { name: 'Oaxis-Japan' },
        { name: 'オプキックス' },
        { name: 'オリンパス' },
        { name: 'キャノン' },
        { name: 'K&F' },
        { name: 'ケンコー・トキナー' },
        { name: 'コダック' },
        { name: 'GoPro' },
        { name: 'Samsung' },
      ],
      tagLists: [
        { name: 'HDCP対応' },
        { name: '4K対応' },
        { name: 'スケーラー内蔵' },
        { name: 'シームレス' },
        { name: '音声対応' },
        { name: 'エンベデッド' },
        { name: 'デエンベデッド' },
        { name: 'PinP' },
        { name: 'プレビュー' },
        { name: 'キー抜き' },
        { name: 'キャプチャ' },
      ],
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

.terms__category,
.terms__maker,
.terms__price,
.terms__tag {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;

  .category__title,
  .maker__title,
  .price__title,
  .tag__title {
    color: $primary;
  }

  .category-list {
    // border-bottom: 1px solid $line;
  }
}

.terms__category.active,
.terms__maker.active,
.terms__price.active,
.terms__tag.active {
  transform: translate(0, 0);
}

.terms__checkbox {
  display: none;
}

.checkbox__parts {
  padding-left: 40px;
  position: relative;
  margin-right: 40px;
  cursor: pointer;
}

.checkbox__parts::before {
  content: '';
  display: block;
  position: absolute;
  top: -5px;
  left: 0;
  width: 30px;
  height: 30px;
  border: 1px solid $outline;
  border-radius: 5px;
  background-color: $cushion;
}

.terms__checkbox:checked + .checkbox__parts::before {
  background-color: #ffffff;
}

.checkbox__parts::after {
  content: '';
  display: block;
  position: absolute;
  top: -2px;
  left: 10px;
  width: 10px;
  height: 18px;
  transform: rotate(40deg);
  border-bottom: 3px solid $line;
  border-right: 3px solid $line;
}

.terms__checkbox:checked + .checkbox__parts::after {
  border-bottom: 3px solid $primary;
  border-right: 3px solid $primary;
}

.terms__title {
  color: $primary !important;
}

.terms__box {
  border: 1px solid $outline;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
}
</style>
