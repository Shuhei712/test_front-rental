<template>
  <section class="category">
    <top-bar title="カテゴリから探す"></top-bar>
    <div class="sec__inner category__inner py-16">
      <div class="category__search mb-16">
        <v-form class="d-flex align-center">
          <v-text-field
            v-model="keyword"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"></v-text-field>
          <v-btn color="primary" class="ml-2 ml-md-5" :href="'/products?type=3&keyword=' + keyword">
            <v-icon class="mr-1">mdi-text-search</v-icon>詳細検索
          </v-btn>
        </v-form>
      </div>
      <div class="category__list mb-16">
        <div
          class="category__heading d-flex justify-center align-center text-body-1 text-md-h6 letter-space-015em pa-1 pa-md-0">
          <v-icon class="mr-2" color="accent">mdi-shape-outline</v-icon>CATEGORY
        </div>
        <div class="py-4">
          <p class="text-center text-caption text-md-body-2 mb-7">クリックでページ内項目にジャンプします</p>
          <ul
            class="d-flex flex-wrap justify-start justify-lg-center pl-4 pl-sm-5 pl-lg-7 text-body-2 text-lg-subtitle-1">
            <li v-for="root in categoryLists" :key="root.CategoryName" class="mr-4 mr-sm-5 mr-lg-7 mb-5">
              <a v-scroll-to="{ el: '#category-id_' + root.CategoryID, offset: -130 }" class="d-flex align-center">
                <v-icon class="mr-2">{{ root.IconImageURL }}</v-icon>
                {{ root.CategoryName }}<v-icon color="#878787">mdi-chevron-down</v-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-for="root in categoryLists"
        :id="'category-id_' + root.CategoryID"
        :key="root.CategoryName"
        class="cat-group mb-16">
        <!-- 大カテゴリー -->
        <h3
          class="cat-group__ttl d-flex flex-column text-center text-body-1 text-sm-h6 text-md-h5 bold letter-space-015em mb-4 mb-md-9">
          <v-icon class="cat-group__ttl-icon mb-2 mb-md-4">{{ root.IconImageURL }}</v-icon>
          {{ root.CategoryName }}
        </h3>
        <div v-for="child in root.SubCategoryList" :key="child.CategoryName" class="cat-group__child mb-8">
          <!-- 中カテゴリー -->
          <h4 class="cat-group__child-ttl text-body-1 text-md-h6 font-heading bold pa-5">
            {{ child.CategoryName }}
            <v-icon class="cat-group__child-icon">{{ root.IconImageURL }}</v-icon>
          </h4>
          <!-- 小カテゴリー -->
          <v-container class="cat-group__container px-0">
            <v-row no-gutters class="cat-group__row">
              <v-col
                v-for="(grandChild, index) in child.SubCategoryList"
                :key="index"
                cols="6"
                lg="4"
                class="cat-group__col">
                <a
                  class="cat-group__btn text-caption text-sm-body-2 text-md-body-1 font-heading bold px-2 px-sm-3 py-2"
                  :href="
                    '/products?type=2&categoryID=' + grandChild.CategoryID + '&categoryName=' + grandChild.CategoryName
                  ">
                  <span class="cat-group__btn-name">{{ grandChild.CategoryName }}</span>
                </a>
              </v-col>
            </v-row>
          </v-container>
          <!-- <p v-if="categoryChild.note" class="cat-group__child-note text-body-2 text-md-body-1 bold pl-5">
            {{ categoryChild.note }}
          </p> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    keyword: '',
    // categoryList: [
    //   {
    //     // online
    //     name: 'Online',
    //     nameJp: 'オンライン',
    //     anchor: 'online',
    //     icon: 'icon-online',
    //     path: '/img/category/online.png',
    //     childCategoryLists: [
    //       {
    //         name: 'オンラインイベント機器',
    //         grandchildCategoryLists: [
    //           { name: 'スイッチャー', anchor: '#', path: '/img/category/online/1-01.png' },
    //           { name: 'メディアサーバー', anchor: '#', path: '/img/category/online/1-02.png' },
    //           { name: 'カメラ周辺機器', anchor: '#', path: '/img/category/online/1-03.png' },
    //           { name: 'VRゴーグル', anchor: '#', path: '/img/category/online/1-04.png' },
    //           { name: 'モーションキャプチャー・センサー', anchor: '#', path: '/img/category/online/1-05.png' },
    //           { name: 'クロマキー合成', anchor: '#', path: '/img/category/online/1-06.png' },
    //           { name: '照明機器', anchor: '#', path: '/img/category/online/07.png' },
    //           { name: 'エンコーダ・デコーダ', anchor: '#', path: '/img/category/online/1-08.png' },
    //           { name: '音響機器', anchor: '#', path: '/img/category/online/1-09.png' },
    //           { name: '周辺機器', anchor: '#', path: '/img/category/online/1-10.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // LED display
    //     name: 'LED display',
    //     nameJp: 'LEDディスプレイ',
    //     anchor: 'led',
    //     icon: 'icon-led',
    //     path: '/img/category/led-display.png',
    //     childCategoryLists: [
    //       {
    //         name: 'LEDディスプレイ',
    //         grandchildCategoryLists: [
    //           { name: '屋内・屋外兼用', anchor: '#', path: '/img/category/led/1-01.png' },
    //           { name: '屋内専用', anchor: '#', path: '/img/category/led/1-02.png' },
    //           { name: 'ビジョン用', anchor: '#', path: '/img/category/led/1-03.png' },
    //           { name: '特殊形状', anchor: '#', path: '/img/category/led/1-04.png' },
    //           { name: 'シースルー', anchor: '#', path: '/img/category/led/1-05.png' },
    //           { name: '床用', anchor: '#', path: '/img/category/led/1-06.png' },
    //           { name: 'センダーボックス', anchor: '#', path: '/img/category/led/1-07.png' },
    //           { name: '電源BOX', anchor: '#', path: '/img/category/led/1-08.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // Projector
    //     name: 'Projector',
    //     nameJp: 'プロジェクター',
    //     anchor: 'projector',
    //     icon: 'icon-projector',
    //     path: '/img/category/projector.png',
    //     childCategoryLists: [
    //       {
    //         name: 'プロジェクター本体 / レンズ',
    //         grandchildCategoryLists: [
    //           { name: '10000lm以上', anchor: '#', path: '/img/category/projector/1-01.png' },
    //           { name: '7000lm～10000lm', anchor: '#', path: '/img/category/projector/1-02.png' },
    //           { name: '5000lm～7000lm', anchor: '#', path: '/img/category/projector/1-03.png' },
    //           { name: '3000lm～5000lm', anchor: '#', path: '/img/category/projector/1-04.png' },
    //           { name: '3000lm以下', anchor: '#', path: '/img/category/projector/1-05.png' },
    //           { name: '超短焦点', anchor: '#', path: '/img/category/projector/1-06.png' },
    //           { name: 'プロジェクター用レンズ', anchor: '#', path: '/img/category/projector/1-07.png' },
    //         ],
    //       },
    //       {
    //         name: 'プロジェクター関連機器',
    //         grandchildCategoryLists: [
    //           { name: '吊り金具', anchor: '#', path: '/img/category/projector/2-01.png' },
    //           { name: 'シャッター', anchor: '#', path: '/img/category/projector/2-02.png' },
    //           { name: 'スタック設置用台', anchor: '#', path: '/img/category/projector/2-03.png' },
    //           { name: 'リモートコントローラー', anchor: '#', path: '/img/category/projector/2-04.png' },
    //           { name: '簡易反射ミラー', anchor: '#', path: '/img/category/projector/2-05.png' },
    //           { name: '映写台・PJステージ', anchor: '#', path: '/img/category/projector/2-06.png' },
    //         ],
    //       },
    //       {
    //         name: 'スクリーン',
    //         grandchildCategoryLists: [
    //           { name: '可搬組立型スクリーン（ 16 : 9 ）', anchor: '#', path: '/img/category/projector/3-01.png' },
    //           { name: '可搬組立型スクリーン（ 4 : 3 ）', anchor: '#', path: '/img/category/projector/3-02.png' },
    //           { name: 'フロアスタンドスクリーン', anchor: '#', path: '/img/category/projector/3-03.png' },
    //           { name: '三脚式スタンドスクリーン', anchor: '#', path: '/img/category/projector/3-04.png' },
    //           { name: 'スクリーン関連機器', anchor: '#', path: '/img/category/projector/3-05.png' },
    //           { name: '吊り下げ式スクリーン', anchor: '#', path: '/img/category/projector/3-06.png' },
    //           { name: 'ブラックスクリーン', anchor: '#', path: '/img/category/projector/3-07.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // Display/Monitor
    //     name: 'Display/Monitor',
    //     nameJp: 'ディスプレイ/モニター',
    //     anchor: 'display',
    //     icon: 'icon-display',
    //     path: '/img/category/display.png',
    //     childCategoryLists: [
    //       {
    //         name: 'フラットディスプレイ',
    //         grandchildCategoryLists: [
    //           { name: '液晶ディスプレイ（60インチ以上）', anchor: '#', path: '/img/category/display/1-01.png' },
    //           { name: '液晶ディスプレイ（30～60インチ）', anchor: '#', path: '/img/category/display/1-01.png' },
    //           { name: '液晶ディスプレイ（30インチ未満）', anchor: '#', path: '/img/category/display/1-03.png' },
    //           { name: '有機ELディスプレイ', anchor: '#', path: '/img/category/display/1-04.png' },
    //         ],
    //       },
    //       {
    //         name: 'その他ディスプレイ',
    //         grandchildCategoryLists: [
    //           { name: 'タッチパネルディスプレイ', anchor: '#', path: '/img/category/display/2-01.png' },
    //           { name: 'マルチディスプレイ', anchor: '#', path: '/img/category/display/2-02.png' },
    //           { name: 'ホログラムディスプレイ', anchor: '#', path: '/img/category/display/2-03.png' },
    //           { name: 'シースルー液晶ディスプレイ', anchor: '#', path: '/img/category/display/2-04.png' },
    //           { name: 'ハーフカットモニター', anchor: '#', path: '/img/category/display/2-05.png' },
    //           { name: 'パソコン用モニター', anchor: '#', path: '/img/category/display/2-06.png' },
    //           { name: 'ピクチャー・マスター・モニター', anchor: '#', path: '/img/category/display/2-07.png' },
    //         ],
    //       },
    //       {
    //         name: '自立スタンド / 壁掛・吊金具',
    //         grandchildCategoryLists: [
    //           { name: '自立スタンド', anchor: '#', path: '/img/category/display/3-01.png' },
    //           { name: '壁掛け金具', anchor: '#', path: '/img/category/display/3-02.png' },
    //           { name: '吊り金具', anchor: '#', path: '/img/category/display/3-03.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // Media/Player
    //     name: 'Media/Player',
    //     nameJp: 'メディア/プレイヤー',
    //     anchor: 'media-player',
    //     icon: 'icon-media-player',
    //     path: '/img/category/media-player.png',
    //     childCategoryLists: [
    //       {
    //         name: 'メディアサーバー',
    //         grandchildCategoryLists: [
    //           { name: 'メディアサーバー', anchor: '#', path: '/img/category/media-player/1-01.png' },
    //         ],
    //       },
    //       {
    //         name: 'プレーヤー / レコーダー',
    //         grandchildCategoryLists: [
    //           { name: 'DVD', anchor: '#', path: '/img/category/media-player/2-01.png' },
    //           { name: 'ブルーレイ', anchor: '#', path: '/img/category/media-player/2-02.png' },
    //         ],
    //       },
    //       {
    //         name: 'ハードディスク（メディア）レコーダー / プレーヤー',
    //         grandchildCategoryLists: [
    //           { name: 'ハードディスクレコーダー', anchor: '#', path: '/img/category/media-player/3-01.png' },
    //           { name: 'メディアプレーヤー', anchor: '#', path: '/img/category/media-player/3-02.png' },
    //           { name: '関連機器', anchor: '#', path: '/img/category/media-player/3-03.png' },
    //         ],
    //       },
    //       {
    //         name: 'ビデオカセットレコーダー(VCR)',
    //         grandchildCategoryLists: [
    //           { name: 'デジタルVCR', anchor: '#', path: '/img/category/media-player/4-01.png' },
    //         ],
    //         note: 'アナログVCR のレンタル取扱は終了しました。',
    //       },
    //     ],
    //   },
    //   {
    //     // Video Peripheral Devices/Cable
    //     name: 'Video Peripheral Devices/Cable',
    //     nameJp: '映像周辺機器・ケーブル',
    //     anchor: 'video-peripheral',
    //     icon: 'icon-video-device',
    //     path: '/img/category/video-peripheral.png',
    //     childCategoryLists: [
    //       {
    //         name: '映像周辺機器',
    //         grandchildCategoryLists: [
    //           { name: 'シームレススイッチャー', anchor: '#', path: '/img/category/video-peripheral/1-01.png' },
    //           { name: 'ライブビデオスイッチャー', anchor: '#', path: '/img/category/video-peripheral/1-02.png' },
    //           { name: 'マトリックススイッチャー', anchor: '#', path: '/img/category/video-peripheral/1-03.png' },
    //           { name: 'セレクター', anchor: '#', path: '/img/category/video-peripheral/1-04.png' },
    //           { name: '分配器 / インターフェイス', anchor: '#', path: '/img/category/video-peripheral/1-05.png' },
    //           {
    //             name: 'スキャンコンバーター/コンバーター',
    //             anchor: '#',
    //             path: '/img/category/video-peripheral/1-06.png',
    //           },
    //           { name: 'フレームシンクロナイザー/TBC', anchor: '#', path: '/img/category/video-peripheral/1-07.png' },
    //           { name: 'エンハンサー / ケーブル補償器', anchor: '#', path: '/img/category/video-peripheral/1-08.png' },
    //           { name: 'ハムノイズフィルター', anchor: '#', path: '/img/category/video-peripheral/1-09.png' },
    //           { name: 'ジェネレーター', anchor: '#', path: '/img/category/video-peripheral/1-10.png' },
    //           { name: '波形モニター', anchor: '#', path: '/img/category/video-peripheral/1-11.png' },
    //           { name: '伝送器', anchor: '#', path: '/img/category/video-peripheral/1-12.png' },
    //           { name: 'マルチビューワ', anchor: '#', path: '/img/category/video-peripheral/1-13.png' },
    //           { name: 'デジタル・アナログ放送システム', anchor: '#', path: '/img/category/video-peripheral/1-14.png' },
    //           {
    //             name: 'midiタイムコードインターフェース',
    //             anchor: '#',
    //             path: '/img/category/video-peripheral/1-15.png',
    //           },
    //         ],
    //       },
    //       {
    //         name: 'ケーブル',
    //         grandchildCategoryLists: [
    //           { name: 'HDMIケーブル/DVIケーブル', anchor: '#', path: '/img/category/video-peripheral/2-01.png' },
    //           { name: '光ファイバーケーブル', anchor: '#', path: '/img/category/video-peripheral/2-02.png' },
    //           { name: 'RGBマルチケーブル/Dsubケーブル', anchor: '#', path: '/img/category/video-peripheral/2-03.png' },
    //           { name: 'PC/ITネットワーク関連ケーブル', anchor: '#', path: '/img/category/video-peripheral/2-04.png' },
    //           { name: 'HD-SDIケーブル', anchor: '#', path: '/img/category/video-peripheral/2-05.png' },
    //           { name: '音響ケーブル', anchor: '#', path: '/img/category/video-peripheral/2-06.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // Camera
    //     name: 'Camera',
    //     nameJp: 'カメラ',
    //     anchor: 'camera',
    //     icon: 'icon-camera',
    //     path: '/img/category/camera.png',
    //     childCategoryLists: [
    //       {
    //         name: 'カメラ',
    //         grandchildCategoryLists: [
    //           { name: 'ビデオカメラ（HD / 4K）', anchor: '#', path: '/img/category/camera/1-01.png' },
    //           { name: 'サーマルカメラ', anchor: '#', path: '/img/category/camera/1-02.png' },
    //           { name: 'ビデオカメラ関連機器', anchor: '#', path: '/img/category/camera/1-03.png' },
    //           { name: '固定用ビデオカメラ・ウェアラブルカメラ', anchor: '#', path: '/img/category/camera/1-04.png' },
    //           { name: 'デジタル一眼レフカメラ', anchor: '#', path: '/img/category/camera/1-05.png' },
    //           { name: '書画カメラ（資料提示装置）', anchor: '#', path: '/img/category/camera/1-06.png' },
    //           { name: 'ビデオカメラ用三脚', anchor: '#', path: '/img/category/camera/1-07.png' },
    //         ],
    //         note: 'SDビデオカメラのレンタル取扱は終了しました。',
    //       },
    //     ],
    //   },
    //   {
    //     // Sensor/App
    //     name: 'Sensor/App',
    //     nameJp: 'センサー/App',
    //     anchor: 'sensor',
    //     icon: 'icon-sensor',
    //     path: '/img/category/sensor.png',
    //     childCategoryLists: [
    //       {
    //         name: 'メディアアプリケーション/ センサー/インタラクティブ関連',
    //         grandchildCategoryLists: [
    //           { name: 'センサー', anchor: '#', path: '/img/category/sensor/1-01.png' },
    //           { name: 'VR機器', anchor: '#', path: '/img/category/sensor/1-02.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // Sound
    //     name: 'Sound',
    //     nameJp: '音響機器',
    //     anchor: 'sound',
    //     icon: 'icon-sound',
    //     path: '/img/category/sound.png',
    //     childCategoryLists: [
    //       {
    //         name: '音響機器',
    //         grandchildCategoryLists: [
    //           { name: '有線マイク', anchor: '#', path: '/img/category/sound/1-01.png' },
    //           { name: 'ワイヤレス機器', anchor: '#', path: '/img/category/sound/1-02.png' },
    //           { name: 'マイクスタンド', path: '/img/category/sound/1-03.png' },
    //           {
    //             name: 'CD / MD / カセットテープデッキ / フィールドレコーダー',
    //             anchor: '#',
    //             path: '/img/category/sound/1-04.png',
    //           },
    //           { name: 'ミキサー', anchor: '#', path: '/img/category/sound/1-05.png' },
    //           { name: 'DJ機器', anchor: '#', path: '/img/category/sound/1-06.png' },
    //           { name: 'アンプ', anchor: '#', path: '/img/category/sound/1-07.png' },
    //           { name: 'スピーカー', anchor: '#', path: '/img/category/sound/1-08.png' },
    //           { name: 'ポータブルアンプ', anchor: '#', path: '/img/category/sound/1-09.png' },
    //           { name: '音響周辺機器', anchor: '#', path: '/img/category/sound/1-10.png' },
    //         ],
    //       },
    //       {
    //         name: 'インカム / トランシーバー',
    //         grandchildCategoryLists: [
    //           { name: 'インカム・トランシーバー', anchor: '#', path: '/img/category/sound/2-01.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // Network
    //     name: 'Network',
    //     nameJp: 'ネットワーク/会議',
    //     anchor: 'network',
    //     icon: 'icon-network',
    //     path: '/img/category/network.png',
    //     childCategoryLists: [
    //       {
    //         name: '会議用機器',
    //         grandchildCategoryLists: [
    //           { name: 'レーザーポインター', anchor: '#', path: '/img/category/network/1-01.png' },
    //           { name: '会場設備用機器', anchor: '#', path: '/img/category/network/1-02.png' },
    //           { name: 'シャウカステン', anchor: '#', path: '/img/category/network/1-03.png' },
    //         ],
    //       },
    //       {
    //         name: 'PC / ICTネットワーク機器',
    //         grandchildCategoryLists: [
    //           { name: 'PC周辺機器', anchor: '#', path: '/img/category/network/2-01.png' },
    //           { name: '会議用ヘッドセットマイク', anchor: '#', path: '/img/category/network/2-02.png' },
    //           { name: 'ネットワーク機器', anchor: '#', path: '/img/category/network/2-03.png' },
    //           { name: 'IPエンコーダ/デコーダ', anchor: '#', path: '/img/category/network/2-04.png' },
    //           { name: 'メディアコンバーター', anchor: '#', path: '/img/category/network/2-05.png' },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     // Other
    //     name: 'Other',
    //     nameJp: 'その他',
    //     anchor: 'other',
    //     icon: 'icon-other',
    //     path: '/img/category/other.png',
    //     childCategoryLists: [
    //       {
    //         name: '照明機器',
    //         grandchildCategoryLists: [{ name: '照明機器', anchor: '#', path: '/img/category/other/1-01.png' }],
    //       },
    //       {
    //         name: '多目的用品 ',
    //         grandchildCategoryLists: [
    //           { name: '多目的台・ステージ', anchor: '#', path: '/img/category/other/2-01.png' },
    //           { name: 'ケーブルプロテクター', anchor: '#', path: '/img/category/other/2-02.png' },
    //           { name: '電源用アップトランス', anchor: '#', path: '/img/category/other/2-03.png' },
    //           { name: '安定化電源', anchor: '#', path: '/img/category/other/2-04.png' },
    //           { name: 'オートポール', anchor: '#', path: '/img/category/other/2-05.png' },
    //         ],
    //       },
    //     ],
    //   },
    // ],
    categoryLists: [],
  }),
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    await this.getCategoryList()
    this.$store.commit('loading/changeStatus', false)
  },
  methods: {
    async getCategoryList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_category_list_page.php', param)
      this.categoryLists = res.CategoryRootList
      // console.log(res)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';
// カテゴリーカラー
$online: #7f7fcc;
$online-bg: #505072;
$led: #c986d1;
$led-bg: #5a2066;
$pj: #cc8071;
$pj-bg: #922617;
$display: #7b9456;
$display-bg: #3f600b;
$media: #bf9540;
$media-bg: #60410b;
$video: #bf9540;
$video-bg: #60410b;
$camera: #c56a84;
$camera-bg: #720e34;
$sensor: #62a3ca;
$sensor-bg: #115b7c;
$sound: #94847b;
$sound-bg: #564132;
$network: #867cc7;
$network-bg: #3e3875;
$other: #97745f;
$other-bg: #563a2e;

.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}

.category__search {
  .v-btn {
    color: #ffffff !important;
  }
}

.category {
  &__heading {
    background-color: $cushion;
  }
  &__list {
    border: 1px solid $cushion;
    p,
    a {
      color: $footer;
    }
    ul {
      list-style: none;
    }

    @include mq(lg) {
      ul {
        margin: 0 auto;
      }
      li {
        min-width: calc((100% - 80px) / 4); // margin-right 20px*4
      }
    }

    @include mq(md) {
      ul {
        max-width: 780px;
      }
      li {
        min-width: calc((100% - 60px) / 3); // margin-right 20px*3
      }
    }

    @include mq(sm) {
      ul {
        max-width: 470px;
      }
      li {
        min-width: calc((100% - 36px) / 2); // margin-right 16px*2
      }
    }
  }
}
.cat-group {
  overflow-x: hidden;
  &__ttl {
    color: $footer;

    &-icon {
      display: inline-block;
      font-size: 3rem;
      width: 100% !important;

      @include mq(sm) {
        font-size: 2rem;
      }
    }
  }
  &__child {
    &-ttl {
      border-style: solid;
      border-width: 1px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    &-icon {
      opacity: 0.5;
      top: 50%;
      right: 7%;
      transform: translateY(-50%) rotate(20deg);
      position: absolute;
      z-index: -1;
      #category-id_1 & {
        font-size: 163px;

        @include mq(md) {
          font-size: 125px;
        }
      }
      #category-id_2 & {
        font-size: 156px;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_3 & {
        font-size: 159px;
        top: 60%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_4 & {
        font-size: 160px;
        top: 62%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_5 & {
        font-size: 169px;
        top: 40%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_6 & {
        font-size: 163px;
        top: 75%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_7 & {
        font-size: 165px;
        transform: translateY(-36%) rotate(14deg);

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_8 & {
        font-size: 174px;
        transform: translateY(-43%) rotate(0deg);

        @include mq(md) {
          font-size: 120px;
        }
      }
      #category-id_9 & {
        font-size: 162px;
        top: 63%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_10 & {
        font-size: 163px;
        transform: translateY(-48%) rotate(-16deg);

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_11 & {
        font-size: 128px;

        @include mq(md) {
          font-size: 90px;
        }
      }
    }
    &-note {
      color: #878787;
      position: relative;
      &::before {
        content: '※';
        display: inline-block;
        left: 0;
        position: absolute;
      }
    }
  }
  &__container {
    width: 100% !important;
  }
  &__row {
    margin: -7px -8px;

    @include mq(sm) {
      margin: -5px -6px;
    }
  }
  &__col {
    height: 82px; // 82px-padding:14px =中身68px
    padding: 7px 8px !important;

    @include mq(sm) {
      padding: 5px 6px !important;
    }
  }
  &__btn {
    background: {
      repeat: no-repeat;
      position: right -5% center;
    }
    border: {
      width: 1px;
      style: solid;
      radius: 0.5em;
    }
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    &-name {
      color: #fff;
      position: relative;
      z-index: 1;
    }
    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
    }
    &::before {
      background-position: center center;
      background-size: 100% auto;
      width: 60%;
      height: 100%;
      top: 0;
      right: -7%;
    }
    &::after {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      #category-id_1 & {
        background-color: rgba($online-bg, 0.6);
      }
      #category-id_2 & {
        background-color: rgba($led-bg, 0.5);
      }
      #category-id_3 & {
        background-color: rgba($pj-bg, 0.5);
      }
      #category-id_4 & {
        background-color: rgba($display-bg, 0.5);
      }
      #category-id_5 & {
        background-color: rgba($media-bg, 0.5);
      }
      #category-id_6 & {
        background-color: rgba($video-bg, 0.5);
      }
      #category-id_7 & {
        background-color: rgba($camera-bg, 0.5);
      }
      #category-id_8 & {
        background-color: rgba($sensor-bg, 0.5);
      }
      #category-id_9 & {
        background-color: rgba($sound-bg, 0.5);
      }
      #category-id_10 & {
        background-color: rgba($network-bg, 0.5);
      }
      #category-id_11 & {
        background-color: rgba($other-bg, 0.5);
      }
    }
  }
  &__child-ttl,
  &__btn {
    #category-id_1 & {
      border-color: $online;
    }
    #category-id_2 & {
      border-color: $led;
    }
    #category-id_3 & {
      border-color: $pj;
    }
    #category-id_4 & {
      border-color: $display;
    }
    #category-id_5 & {
      border-color: $media;
    }
    #category-id_6 & {
      border-color: $video;
    }
    #category-id_7 & {
      border-color: $camera;
    }
    #category-id_8 & {
      border-color: $sensor;
    }
    #category-id_9 & {
      border-color: $sound;
    }
    #category-id_10 & {
      border-color: $network;
    }
    #category-id_11 & {
      border-color: $other;
    }
  }
}
#category-id_1 {
  .cat-group__child {
    &:nth-of-type(1) {
      // オンラインイベント機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/online/1-01.png');
          background-position-y: 15%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/online/1-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/online/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/online/1-04.png');
          background-position-y: 60%;
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/online/1-05.png');
          background-position-y: 70%;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/online/1-06.png');
          background-position-y: bottom;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/online/1-07.png');
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/online/1-08.png');
          background-position-y: bottom;
        }
        &:nth-child(9) .cat-group__btn::before {
          background-image: url('/img/category/online/1-09.png');
          background-position-y: 80%;
        }
        &:nth-child(10) .cat-group__btn::before {
          background-image: url('/img/category/online/1-10.png');
        }
      }
    }
  }
}
#category-id_2 {
  .cat-group__child {
    &:nth-of-type(1) {
      // LEDディスプレイ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/led/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/led/1-02.png');
          background-position-y: top;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/led/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/led/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/led/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/led/1-06.png');
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/led/1-07.png');
          background-position-y: 80%;
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/led/1-08.png');
        }
      }
    }
  }
}
#category-id_3 {
  .cat-group__child {
    &:nth-of-type(1) {
      // プロジェクター本体 / レンズ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-06.png');
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-07.png');
        }
      }
    }
    &:nth-of-type(2) {
      // プロジェクター関連機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-01.png');
          background-position-y: 15%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-03.png');
          background-position-y: 10%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-06.png');
        }
      }
    }
    &:nth-of-type(3) {
      // スクリーン
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-03.png');
          background-position-y: bottom;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-04.png');
          background-position-y: 75%;
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-05.png');
          background-position-y: bottom;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-06.png');
          background-position-y: 40%;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-07.png');
          background-position-y: 80%;
        }
      }
    }
  }
}
#category-id_4 {
  .cat-group__child {
    &:nth-of-type(1) {
      // フラットディスプレイ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/display/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/display/1-01.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/display/1-03.png');
          background-position-y: 80%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/display/1-04.png');
          background-position-y: bottom;
        }
      }
    }
    &:nth-of-type(2) {
      // その他ディスプレイ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/display/2-01.png');
          background-position-y: 27%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/display/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/display/2-03.png');
          background-position-y: 27%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/display/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/display/2-05.png');
          background-position-y: 80%;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/display/2-06.png');
          background-position-y: bottom;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/display/2-07.png');
          background-position-y: bottom;
        }
      }
    }
    &:nth-of-type(3) {
      // 自立スタンド / 壁掛・吊金具
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/display/3-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/display/3-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/display/3-03.png');
          background-position-y: 5%;
        }
      }
    }
  }
}
#category-id_5 {
  .cat-group__child {
    &:nth-of-type(1) {
      // メディアサーバー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/1-01.png');
        }
      }
    }
    &:nth-of-type(2) {
      // プレーヤー / レコーダー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/2-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/media-player/2-02.png');
        }
      }
    }
    &:nth-of-type(3) {
      // ハードディスク（メディア）レコーダー / プレーヤー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/3-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/media-player/3-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/media-player/3-03.png');
        }
      }
    }
    &:nth-of-type(4) {
      // ビデオカセットレコーダー(VCR)
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/4-01.png');
        }
      }
    }
  }
}
#category-id_6 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 映像周辺機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-02.png');
          background-position-y: 15%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-06.png');
          background-position-y: 70%;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-07.png');
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-08.png');
        }
        &:nth-child(9) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-09.png');
          background-position-y: 93%;
        }
        &:nth-child(10) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-10.png');
        }
        &:nth-child(11) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-11.png');
        }
        &:nth-child(12) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-12.png');
        }
        &:nth-child(13) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-13.png');
        }
        &:nth-child(14) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-14.png');
        }
        &:nth-child(15) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-15.png');
        }
      }
    }
    &:nth-of-type(2) {
      // ケーブル
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-01.png');
          background-position-y: top;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-05.png');
          background-position-y: top;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-06.png');
          background-position-y: top;
        }
      }
    }
  }
}
#category-id_7 {
  .cat-group__child {
    &:nth-of-type(1) {
      // カメラ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-02.png');
          background-position-y: 35%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-03.png');
          background-position-y: 10%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-04.png');
          background-position-y: 10%;
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-06.png');
          background-position-y: top;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-07.png');
          background-position-y: 30%;
        }
      }
    }
  }
}
#sensor {
  .cat-group__child {
    &:nth-of-type(1) {
      // メディアアプリケーション/ センサー/インタラクティブ関連
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/sensor/1-01.png');
          background-position-y: 70%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/sensor/1-02.png');
          background-position-y: 60%;
        }
      }
    }
  }
}
#category-id_9 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 音響機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-01.png');
          background-position-y: top;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-02.png');
          background-position-y: 80%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-03.png');
          background-position-y: 90%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-06.png');
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-07.png');
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-08.png');
        }
        &:nth-child(9) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-09.png');
          background-position-y: 20%;
        }
        &:nth-child(10) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-10.png');
        }
      }
    }
    &:nth-of-type(2) {
      // インカム / トランシーバー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/sound/2-01.png');
        }
      }
    }
  }
}
#category-id_10 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 会議用機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/network/1-01.png');
          background-position-y: 70%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/network/1-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/network/1-03.png');
          background-position-y: 16%;
        }
      }
    }
    &:nth-of-type(2) {
      // PC / ICTネットワーク機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/network/2-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/network/2-02.png');
          background-position-y: 80%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/network/2-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/network/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/network/2-05.png');
          background-position-y: 80%;
        }
      }
    }
  }
}
#category-id_11 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 照明機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/other/1-01.png');
          background-position-y: top;
        }
      }
    }
    &:nth-of-type(2) {
      // 多目的用品
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/other/2-01.png');
          background-position-y: top;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/other/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/other/2-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/other/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/other/2-05.png');
        }
      }
    }
  }
}
</style>
