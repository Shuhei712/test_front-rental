<template>
  <section class="category">
    <div
      class="category__heading text-h6 px-12 text-center montserrat letter-space-015em"
    >
      <v-icon class="mr-2" color="accent">mdi-shape-outline</v-icon>CATEGORY
    </div>
    <div class="category__lists">
      <v-list v-for="category in categoryLists" :key="category.name">
        <v-subheader class="montserrat bold"
          ><img class="mr-2" :src="category.path" />
          {{ category.name }}</v-subheader
        >
        <v-list-group
          v-for="childCategory in category.childCategoryLists"
          :key="childCategory.name"
          :value="false"
        >
          <template v-slot:activator>
            <v-list-item-title class="text-body-2">{{
              childCategory.name
            }}</v-list-item-title>
          </template>
          <v-list-item
            v-for="grandChildCategory in childCategory.grandchildCategoryLists"
            :key="grandChildCategory.name"
            link
          >
            <v-list-item-title class="text-body-2">{{
              grandChildCategory.name
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    categoryLists: [
      {
        name: 'online',
        path: '/img/category/online.png',
        childCategoryLists: [
          {
            name: 'オンラインイベント機器',
            grandchildCategoryLists: [
              { name: 'スイッチャー' },
              { name: 'メディアサーバー' },
              { name: 'カメラ周辺機器' },
              { name: 'VRゴーグル' },
              { name: 'モーションキャプチャー・センサー' },
              { name: 'クロマキー合成' },
              { name: '照明機器' },
              { name: 'エンコーダ・デコーダ' },
              { name: '音響機器' },
              { name: '周辺機器' },
            ],
          },
        ],
      },
      {
        name: 'LED Display',
        path: '/img/category/led-display.png',
        childCategoryLists: [
          {
            name: 'LEDディスプレイ',
            grandchildCategoryLists: [
              { name: 'スイッチャー' },
              { name: 'メディアサーバー' },
              { name: 'カメラ周辺機器' },
              { name: 'VRゴーグル' },
              { name: 'モーションキャプチャー・センサー' },
              { name: 'クロマキー合成' },
              { name: '照明機器' },
              { name: 'エンコーダ・デコーダ' },
              { name: '音響機器' },
              { name: '周辺機器' },
            ],
          },
        ],
      },
      {
        name: 'Projector',
        path: '/img/category/projector.png',
        childCategoryLists: [
          {
            name: 'プロジェクタ-',
            grandchildCategoryLists: [
              { name: '10000lm以上' },
              { name: '7000lm～10000lm' },
              { name: '5000lm～7000lm' },
              { name: '3000lm～5000lm' },
              { name: '3000lm以下' },
              { name: '超短焦点' },
              { name: 'EPSON EB-L/Gシリーズ対応レンズ' },
              { name: 'EPSON EB-Zシリーズ対応レンズ' },
              { name: 'Panasonic 3チップDLP PJ 対応レンズ' },
              {
                name: 'Panasonic PT-RZ970・DX100・DZ870・DX810・DX800 対応レンズ',
              },
              { name: 'Panasonic PT-DZ6710・ D6000・ D5700 対応レンズ' },
              {
                name: 'Panasonic PT-EZ770・EX610J/SANYO ZMシリーズ対応レンズ',
              },
              { name: 'SANYO LP-XP100 対応レンズ' },
              { name: 'SANYO LP-XF47・XF71 対応レンズ' },
              {
                name: 'SANYO LP-XP100 対応レンズSANYO LP-XF47・XF71 対応レンズ',
              },
              { name: 'BARCO FLMシリーズ 対応レンズ' },
            ],
          },
          {
            name: '関連機器',
            grandchildCategoryLists: [
              { name: '吊り金具' },
              { name: 'シャッター' },
              { name: 'スタック設置用台' },
              { name: 'リモートコントローラー' },
              { name: '簡易反射ミラー' },
              { name: 'その他プロジェクター関連機器' },
              { name: '映写台・PJステージ' },
            ],
          },
          {
            name: 'スクリーン',
            grandchildCategoryLists: [
              { name: '可搬組立型スクリーン(16:9)' },
              { name: '可搬組立型スクリーン(4:3)' },
              { name: 'フロアスタンドスクリーン' },
              { name: '三脚式スタンドスクリーン' },
              { name: 'スクリーン関連機器' },
              { name: '吊り下げ式スクリーン' },
              { name: 'ブラックスクリーン' },
            ],
          },
        ],
      },
      {
        name: 'Display/Monitor',
        path: '/img/category/display.png',
        childCategoryLists: [
          {
            name: 'ディスプレイ/モニター',
            grandchildCategoryLists: [
              { name: '液晶ディスプレイ(60インチ以上)' },
              { name: '液晶ディスプレイ(30～60インチ)' },
              { name: '液晶ディスプレイ(30インチ未満)' },
              { name: '有機ELディスプレイ' },
              { name: 'タッチパネルディスプレイ' },
              { name: 'マルチディスプレイ' },
              { name: 'ホログラムディスプレイ' },
              { name: 'シースルー液晶ディスプレイ' },
              { name: 'ハーフカットモニター' },
              { name: 'パソコン用モニター' },
              { name: 'ピクチャー・マスター・モニター' },
            ],
          },
          {
            name: '関連機器',
            grandchildCategoryLists: [
              { name: '自立スタンド' },
              { name: '壁掛け金具' },
              { name: '吊り金具' },
            ],
          },
        ],
      },
      {
        name: 'Media/Player',
        path: '/img/category/media-player.png',
        childCategoryLists: [
          {
            name: 'メディアサーバー',
            grandchildCategoryLists: [{ name: 'メディアサーバー' }],
          },
          {
            name: 'プレーヤー/レコーダー',
            grandchildCategoryLists: [
              { name: 'DVD' },
              { name: 'ブルーレイ' },
              { name: 'ハードディスク(メディア)レコーダー/プレーヤー' },
              { name: 'ビデオカセットレコーダー(VCR)' },
            ],
          },
          {
            name: '映像周辺機器',
            grandchildCategoryLists: [
              { name: 'シームレススイッチャー' },
              { name: 'ライブビデオスイッチャー' },
              { name: 'マトリックススイッチャー' },
              { name: 'セレクター' },
              { name: '分配器/インターフェイス' },
              { name: 'スキャンコンバーター/コンバーター' },
              { name: 'フレームシンクロナイザー/TBC' },
              { name: 'エンハンサー/ケーブル補償器' },
              { name: 'ハムノイズフィルター' },
              { name: 'ジェネレーター' },
              { name: '波形モニター' },
              { name: '伝送器' },
              { name: 'マルチビューワ' },
              { name: 'デジタル・アナログ放送システム' },
              { name: 'midiタイムコードインターフェース' },
            ],
          },
          {
            name: 'ケーブル',
            grandchildCategoryLists: [
              { name: 'HDMIケーブル/DVIケーブル' },
              { name: '光ファイバーケーブル' },
              { name: 'RGBマルチケーブル/Dsubケーブル' },
              { name: 'PC/ITネットワーク関連ケーブル' },
              { name: 'HD-SDIケーブル' },
              { name: '音響ケーブル' },
            ],
          },
        ],
      },
      {
        name: 'Camera',
        path: '/img/category/camera.png',
        childCategoryLists: [
          {
            name: 'カメラ',
            grandchildCategoryLists: [
              { name: 'ビデオカメラ（HD/4K）' },
              { name: 'サーマルカメラ' },
              { name: 'ビデオカメラ関連機器' },
              { name: '固定用ビデオカメラ・ウェアラブルカメラ' },
              { name: 'デジタル一眼レフカメラ' },
              { name: '書画カメラ（資料提示装置）' },
              { name: 'ビデオカメラ用三脚' },
            ],
          },
        ],
      },
      {
        name: 'Sensor/App',
        path: '/img/category/sensor.png',
        childCategoryLists: [
          {
            name: 'メディアアプリケーション/センサー/インタラクティブ関連',
            grandchildCategoryLists: [{ name: 'センサー' }, { name: 'VR機器' }],
          },
        ],
      },
      {
        name: 'Sound',
        path: '/img/category/sound.png',
        childCategoryLists: [
          {
            name: '音響機器',
            grandchildCategoryLists: [
              { name: '有線マイク' },
              { name: 'ワイヤレス機器' },
              { name: 'マイクスタンド' },
              { name: 'ミキサー' },
              { name: 'CD/MD/カセットテープデッキ/フィールドレコーダー' },
              { name: 'DJ機器' },
              { name: 'アンプ' },
              { name: 'スピーカー' },
              { name: 'ポータブルアンプ' },
            ],
          },
          {
            name: 'インカム/トランシーバー',
            grandchildCategoryLists: [{ name: 'インカム/トランシーバー' }],
          },
        ],
      },
      {
        name: 'Network',
        path: '/img/category/network.png',
        childCategoryLists: [
          {
            name: '会議用機器',
            grandchildCategoryLists: [
              { name: 'レーザーポインター' },
              { name: '会場設備用機器' },
              { name: 'シャウカステン' },
            ],
          },
          {
            name: 'PC/ICTネットワーク機器',
            grandchildCategoryLists: [
              { name: 'PC周辺機器' },
              { name: '会議用ヘッドセット' },
              { name: 'ネットワーク機器' },
              { name: 'IPエンコーダー/デコーダー' },
              { name: 'メディアコンバーター' },
            ],
          },
        ],
      },
      {
        name: 'Other',
        path: '/img/category/other.png',
        childCategoryLists: [
          {
            name: '照明機器',
            grandchildCategoryLists: [{ name: '照明機器' }],
          },
          {
            name: '多目的用品 ',
            grandchildCategoryLists: [
              { name: '多目的台・ステージ' },
              { name: 'ケーブルプロテクター' },
              { name: '電源用アップトランス' },
              { name: '安定化電源' },
              { name: 'オートポール' },
            ],
          },
        ],
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.category {
  width: 270px;
  &__heading {
    background-color: $cushion;
  }
}
</style>
