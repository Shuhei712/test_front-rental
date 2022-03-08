<template>
  <section class="category">
    <top-bar title="カテゴリから探す"></top-bar>
    <div class="sec__inner category__inner py-16">
      <div class="category__search mb-16">
        <v-form class="d-flex align-center">
          <v-text-field
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"
          ></v-text-field>
          <v-btn color="primary" class="ml-5">
            <v-icon class="mr-1">mdi-text-search</v-icon>詳細検索
          </v-btn>
        </v-form>
      </div>
      <div class="category__list mb-16">
        <div class="category__heading text-h6 text-center letter-space-015em">
          <v-icon class="mr-2" color="accent">mdi-shape-outline</v-icon>CATEGORY
        </div>
        <div class="py-4">
          <p class="text-center text-body-2 mb-7">
            クリックでページ内項目にジャンプします
          </p>
          <ul class="d-flex flex-wrap justify-center pl-7">
            <li v-for="category in categoryLists" :key="category.name" class="mr-7 mb-5">
              <a v-scroll-to="{ el: '#'+ category.anchor, offset: 200 }" class="d-flex align-center">
                <v-icon class="mr-2">{{ category.icon }}</v-icon>{{ category.nameJp }}<v-icon color="#878787">mdi-chevron-down</v-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div v-for="category in categoryLists"
        :id="category.anchor"
        :key="category.name"
        class="cat-group mb-16">
        <!-- 大カテゴリー -->
        <h3 class="cat-group__ttl d-flex flex-column text-center text-h5 bold letter-space-015em mb-10">
          <v-icon class="cat-group__ttl-icon mb-4">{{ category.icon }}</v-icon>{{ category.name }}
        </h3>
        <div v-for="categoryChild in category.childCategoryLists" :key="categoryChild.name" class="cat-group__child mb-8">
          <!-- 中カテゴリー -->
          <h4 class="cat-group__child-ttl text-h6 mont-zenkaku bold pa-5">
            {{ categoryChild.name }}
            <v-icon class="cat-group__child-icon">{{ category.icon }}</v-icon>
          </h4>
          <!-- 小カテゴリー -->
          <v-container class="cat-group__container px-0">
            <v-row no-gutters class="cat-group__row">
              <v-col v-for="(catItem, index) in categoryChild.grandchildCategoryLists" :key="index" cols="4"
                class="cat-group__col">
                <a
                  class="cat-group__btn text-body-1 mont-zenkaku bold px-3 py-2"
                  :href="catItem.anchor">
                  <span class="cat-group__btn-name">{{ catItem.name }}</span>
                </a>
              </v-col>
            </v-row>
          </v-container>
          <p v-if="categoryChild.note" class="cat-group__child-note bold pl-5">{{ categoryChild.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    categoryLists: [
      {// online
        name: 'Online',
        nameJp: 'オンライン',
        anchor: 'online',
        icon: 'icon-online',
        path: '/img/category/online.png',
        childCategoryLists: [
          {
            name: 'オンラインイベント機器',
            grandchildCategoryLists: [
              { name: 'スイッチャー', anchor: '#', path: '/img/category/online/1-01.png' },
              { name: 'メディアサーバー', anchor: '#', path: '/img/category/online/1-02.png' },
              { name: 'カメラ周辺機器', anchor: '#', path: '/img/category/online/1-03.png' },
              { name: 'VRゴーグル', anchor: '#', path: '/img/category/online/1-04.png' },
              { name: 'モーションキャプチャー・センサー', anchor: '#', path: '/img/category/online/1-05.png' },
              { name: 'クロマキー合成', anchor: '#', path: '/img/category/online/1-06.png' },
              { name: '照明機器', anchor: '#', path: '/img/category/online/07.png' },
              { name: 'エンコーダ・デコーダ', anchor: '#', path: '/img/category/online/1-08.png' },
              { name: '音響機器', anchor: '#', path: '/img/category/online/1-09.png' },
              { name: '周辺機器', anchor: '#', path: '/img/category/online/1-10.png' },
            ],
          },
        ],
      },
      {// LED display
        name: 'LED display',
        nameJp: 'LEDディスプレイ',
        anchor: 'led',
        icon: 'icon-led',
        path: '/img/category/led-display.png',
        childCategoryLists: [
          {
            name: 'LEDディスプレイ',
            grandchildCategoryLists: [
              { name: '屋内・屋外兼用', anchor: '#', path: '/img/category/led/1-01.png' },
              { name: '屋内専用', anchor: '#', path: '/img/category/led/1-02.png'  },
              { name: 'ビジョン用', anchor: '#', path: '/img/category/led/1-03.png'  },
              { name: '特殊形状', anchor: '#', path: '/img/category/led/1-04.png'  },
              { name: 'シースルー', anchor: '#', path: '/img/category/led/1-05.png'  },
              { name: '床用', anchor: '#', path: '/img/category/led/1-06.png'  },
              { name: 'センダーボックス', anchor: '#', path: '/img/category/led/1-07.png'  },
              { name: '電源BOX', anchor: '#', path: '/img/category/led/1-08.png'  },
            ],
          },
        ],
      },
      {// Projector
        name: 'Projector',
        nameJp: 'プロジェクター',
        anchor: 'projector',
        icon: 'icon-projector',
        path: '/img/category/projector.png',
        childCategoryLists: [
          {
            name: 'プロジェクター本体 / レンズ',
            grandchildCategoryLists: [
              { name: '10000lm以上', anchor: '#', path: '/img/category/projector/1-01.png' },
              { name: '7000lm～10000lm', anchor: '#', path: '/img/category/projector/1-02.png' },
              { name: '5000lm～7000lm', anchor: '#', path: '/img/category/projector/1-03.png' },
              { name: '3000lm～5000lm', anchor: '#', path: '/img/category/projector/1-04.png' },
              { name: '3000lm以下', anchor: '#', path: '/img/category/projector/1-05.png' },
              { name: '超短焦点', anchor: '#', path: '/img/category/projector/1-06.png' },
              { name: 'プロジェクター用レンズ', anchor: '#', path: '/img/category/projector/1-07.png' },
            ],
          },
          {
            name: 'プロジェクター関連機器',
            grandchildCategoryLists: [
              { name: '吊り金具', anchor: '#', path: '/img/category/projector/2-01.png' },
              { name: 'シャッター', anchor: '#', path: '/img/category/projector/2-02.png' },
              { name: 'スタック設置用台', anchor: '#', path: '/img/category/projector/2-03.png' },
              { name: 'リモートコントローラー', anchor: '#', path: '/img/category/projector/2-04.png' },
              { name: '簡易反射ミラー', anchor: '#', path: '/img/category/projector/2-05.png' },
              { name: '映写台・PJステージ', anchor: '#', path: '/img/category/projector/2-06.png' },
            ],
          },
          {
            name: 'スクリーン',
            grandchildCategoryLists: [
              { name: '可搬組立型スクリーン（ 16 : 9 ）', anchor: '#', path: '/img/category/projector/3-01.png' },
              { name: '可搬組立型スクリーン（ 4 : 3 ）', anchor: '#', path: '/img/category/projector/3-02.png' },
              { name: 'フロアスタンドスクリーン', anchor: '#', path: '/img/category/projector/3-03.png' },
              { name: '三脚式スタンドスクリーン', anchor: '#', path: '/img/category/projector/3-04.png' },
              { name: 'スクリーン関連機器', anchor: '#', path: '/img/category/projector/3-05.png' },
              { name: '吊り下げ式スクリーン', anchor: '#', path: '/img/category/projector/3-06.png' },
              { name: 'ブラックスクリーン', anchor: '#', path: '/img/category/projector/3-07.png' },
            ],
          },
        ],
      },
      {// Display/Monitor
        name: 'Display/Monitor',
        nameJp: 'ディスプレイ/モニター',
        anchor: 'display',
        icon: 'icon-display',
        path: '/img/category/display.png',
        childCategoryLists: [
          {
            name: 'フラットディスプレイ',
            grandchildCategoryLists: [
              { name: '液晶ディスプレイ（60インチ以上）', anchor: '#', path: '/img/category/display/1-01.png' },
              { name: '液晶ディスプレイ（30～60インチ）', anchor: '#', path: '/img/category/display/1-01.png' },
              { name: '液晶ディスプレイ（30インチ未満）', anchor: '#', path: '/img/category/display/1-03.png' },
              { name: '有機ELディスプレイ', anchor: '#', path: '/img/category/display/1-04.png' },
            ],
          },
          {
            name: 'その他ディスプレイ',
            grandchildCategoryLists: [
              { name: 'タッチパネルディスプレイ', anchor: '#', path: '/img/category/display/2-01.png' },
              { name: 'マルチディスプレイ', anchor: '#', path: '/img/category/display/2-02.png' },
              { name: 'ホログラムディスプレイ', anchor: '#', path: '/img/category/display/2-03.png' },
              { name: 'シースルー液晶ディスプレイ', anchor: '#', path: '/img/category/display/2-04.png' },
              { name: 'ハーフカットモニター', anchor: '#', path: '/img/category/display/2-05.png' },
              { name: 'パソコン用モニター', anchor: '#', path: '/img/category/display/2-06.png' },
              { name: 'ピクチャー・マスター・モニター', anchor: '#', path: '/img/category/display/2-07.png' },
            ],
          },
          {
            name: '自立スタンド / 壁掛・吊金具',
            grandchildCategoryLists: [
              { name: '自立スタンド', anchor: '#', path: '/img/category/display/3-01.png' },
              { name: '壁掛け金具', anchor: '#', path: '/img/category/display/3-02.png' },
              { name: '吊り金具', anchor: '#', path: '/img/category/display/3-03.png' },
            ],
          },
        ],
      },
      {// Media/Player
        name: 'Media/Player',
        nameJp: 'メディア/プレイヤー',
        anchor: 'media-player',
        icon: 'icon-media-player',
        path: '/img/category/media-player.png',
        childCategoryLists: [
          {
            name: 'メディアサーバー',
            grandchildCategoryLists: [
              { name: 'メディアサーバー', anchor: '#', path: '/img/category/media-player/1-01.png' }
            ],
          },
          {
            name: 'プレーヤー / レコーダー',
            grandchildCategoryLists: [
              { name: 'DVD', anchor: '#', path: '/img/category/media-player/2-01.png' },
              { name: 'ブルーレイ', anchor: '#', path: '/img/category/media-player/2-02.png' },
            ],
          },
          {
            name: 'ハードディスク（メディア）レコーダー / プレーヤー',
            grandchildCategoryLists: [
              { name: 'ハードディスクレコーダー', anchor: '#', path: '/img/category/media-player/3-01.png' },
              { name: 'メディアプレーヤー', anchor: '#', path: '/img/category/media-player/3-02.png' },
              { name: '関連機器', anchor: '#', path: '/img/category/media-player/3-03.png' },
            ],
          },
          {
            name: 'ビデオカセットレコーダー(VCR)',
            grandchildCategoryLists: [
              { name: 'デジタルVCR', anchor: '#', path: '/img/category/media-player/4-01.png' },
            ],
            note: 'アナログVCR のレンタル取扱は終了しました。',
          },
        ],
      },
      {// Video Peripheral Devices/Cable
        name: 'Video Peripheral Devices/Cable',
        nameJp: '映像周辺機器・ケーブル',
        anchor: 'video-peripheral',
        icon: 'icon-video-device',
        path: '/img/category/video-peripheral.png',
        childCategoryLists: [
          {
            name: '映像周辺機器',
            grandchildCategoryLists: [
              { name: 'シームレススイッチャー', anchor: '#', path: '/img/category/video-peripheral/1-01.png' },
              { name: 'ライブビデオスイッチャー', anchor: '#', path: '/img/category/video-peripheral/1-02.png' },
              { name: 'マトリックススイッチャー', anchor: '#', path: '/img/category/video-peripheral/1-03.png' },
              { name: 'セレクター', anchor: '#', path: '/img/category/video-peripheral/1-04.png' },
              { name: '分配器 / インターフェイス', anchor: '#', path: '/img/category/video-peripheral/1-05.png' },
              { name: 'スキャンコンバーター/コンバーター', anchor: '#', path: '/img/category/video-peripheral/1-06.png' },
              { name: 'フレームシンクロナイザー/TBC', anchor: '#', path: '/img/category/video-peripheral/1-07.png' },
              { name: 'エンハンサー / ケーブル補償器', anchor: '#', path: '/img/category/video-peripheral/1-08.png' },
              { name: 'ハムノイズフィルター', anchor: '#', path: '/img/category/video-peripheral/1-09.png' },
              { name: 'ジェネレーター', anchor: '#', path: '/img/category/video-peripheral/1-10.png' },
              { name: '波形モニター', anchor: '#', path: '/img/category/video-peripheral/1-11.png' },
              { name: '伝送器', anchor: '#', path: '/img/category/video-peripheral/1-12.png' },
              { name: 'マルチビューワ', anchor: '#', path: '/img/category/video-peripheral/1-13.png' },
              { name: 'デジタル・アナログ放送システム', anchor: '#', path: '/img/category/video-peripheral/1-14.png' },
              { name: 'midiタイムコードインターフェース', anchor: '#', path: '/img/category/video-peripheral/1-15.png' },
            ],
          },
          {
            name: 'ケーブル',
            grandchildCategoryLists: [
              { name: 'HDMIケーブル/DVIケーブル', anchor: '#', path: '/img/category/video-peripheral/2-01.png' },
              { name: '光ファイバーケーブル', anchor: '#', path: '/img/category/video-peripheral/2-02.png' },
              { name: 'RGBマルチケーブル/Dsubケーブル', anchor: '#', path: '/img/category/video-peripheral/2-03.png' },
              { name: 'PC/ITネットワーク関連ケーブル', anchor: '#', path: '/img/category/video-peripheral/2-04.png' },
              { name: 'HD-SDIケーブル', anchor: '#', path: '/img/category/video-peripheral/2-05.png' },
              { name: '音響ケーブル', anchor: '#', path: '/img/category/video-peripheral/2-06.png' },
            ],
          },
        ],
      },
      {// Camera
        name: 'Camera',
        nameJp: 'カメラ',
        anchor: 'camera',
        icon: 'icon-camera',
        path: '/img/category/camera.png',
        childCategoryLists: [
          {
            name: 'カメラ',
            grandchildCategoryLists: [
              { name: 'ビデオカメラ（HD / 4K）', anchor: '#', path: '/img/category/camera/1-01.png' },
              { name: 'サーマルカメラ', anchor: '#', path: '/img/category/camera/1-02.png' },
              { name: 'ビデオカメラ関連機器', anchor: '#', path: '/img/category/camera/1-03.png' },
              { name: '固定用ビデオカメラ・ウェアラブルカメラ', anchor: '#', path: '/img/category/camera/1-04.png' },
              { name: 'デジタル一眼レフカメラ', anchor: '#', path: '/img/category/camera/1-05.png' },
              { name: '書画カメラ（資料提示装置）', anchor: '#', path: '/img/category/camera/1-06.png' },
              { name: 'ビデオカメラ用三脚', anchor: '#', path: '/img/category/camera/1-07.png' },
            ],
            note: 'SDビデオカメラのレンタル取扱は終了しました。',
          },
        ],
      },
      {// Sensor/App
        name: 'Sensor/App',
        nameJp: 'センサー/App',
        anchor: 'sensor',
        icon: 'icon-sensor',
        path: '/img/category/sensor.png',
        childCategoryLists: [
          {
            name: 'メディアアプリケーション/ センサー/インタラクティブ関連',
            grandchildCategoryLists: [
              { name: 'センサー', anchor: '#', path: '/img/category/sensor/1-01.png' },
              { name: 'VR機器', anchor: '#', path: '/img/category/sensor/1-02.png' }
            ],
          },
        ],
      },
      {// Sound
        name: 'Sound',
        nameJp: '音響機器',
        anchor: 'sound',
        icon: 'icon-sound',
        path: '/img/category/sound.png',
        childCategoryLists: [
          {
            name: '音響機器',
            grandchildCategoryLists: [
              { name: '有線マイク', anchor: '#', path: '/img/category/sound/1-01.png' },
              { name: 'ワイヤレス機器', anchor: '#', path: '/img/category/sound/1-02.png' },
              { name: 'マイクスタンド', path: '/img/category/sound/1-03.png' },
              { name: 'CD / MD / カセットテープデッキ / フィールドレコーダー', anchor: '#', path: '/img/category/sound/1-04.png' },
              { name: 'ミキサー', anchor: '#', path: '/img/category/sound/1-05.png' },
              { name: 'DJ機器', anchor: '#', path: '/img/category/sound/1-06.png' },
              { name: 'アンプ', anchor: '#', path: '/img/category/sound/1-07.png' },
              { name: 'スピーカー', anchor: '#', path: '/img/category/sound/1-08.png' },
              { name: 'ポータブルアンプ', anchor: '#', path: '/img/category/sound/1-09.png' },
              { name: '音響周辺機器', anchor: '#', path: '/img/category/sound/1-10.png' },
            ],
          },
          {
            name: 'インカム / トランシーバー',
            grandchildCategoryLists: [
              { name: 'インカム・トランシーバー', anchor: '#', path: '/img/category/sound/2-01.png' }
            ],
          },
        ],
      },
      {// Network
        name: 'Network',
        nameJp: 'ネットワーク/会議',
        anchor: 'network',
        icon: 'icon-network',
        path: '/img/category/network.png',
        childCategoryLists: [
          {
            name: '会議用機器',
            grandchildCategoryLists: [
              { name: 'レーザーポインター', anchor: '#', path: '/img/category/network/1-01.png' },
              { name: '会場設備用機器', anchor: '#', path: '/img/category/network/1-02.png' },
              { name: 'シャウカステン', anchor: '#', path: '/img/category/network/1-03.png' },
            ],
          },
          {
            name: 'PC / ICTネットワーク機器',
            grandchildCategoryLists: [
              { name: 'PC周辺機器', anchor: '#', path: '/img/category/network/2-01.png' },
              { name: '会議用ヘッドセットマイク', anchor: '#', path: '/img/category/network/2-02.png' },
              { name: 'ネットワーク機器', anchor: '#', path: '/img/category/network/2-03.png' },
              { name: 'IPエンコーダ/デコーダ', anchor: '#', path: '/img/category/network/2-04.png' },
              { name: 'メディアコンバーター', anchor: '#', path: '/img/category/network/2-05.png' },
            ],
          },
        ],
      },
      {// Other
        name: 'Other',
        nameJp: 'その他',
        anchor: 'other',
        icon: 'icon-other',
        path: '/img/category/other.png',
        childCategoryLists: [
          {
            name: '照明機器',
            grandchildCategoryLists: [
              { name: '照明機器', anchor: '#', path: '/img/category/other/1-01.png' }
            ],
          },
          {
            name: '多目的用品 ',
            grandchildCategoryLists: [
              { name: '多目的台・ステージ', anchor: '#', path: '/img/category/other/2-01.png' },
              { name: 'ケーブルプロテクター', anchor: '#', path: '/img/category/other/2-02.png' },
              { name: '電源用アップトランス', anchor: '#', path: '/img/category/other/2-03.png' },
              { name: '安定化電源', anchor: '#', path: '/img/category/other/2-04.png' },
              { name: 'オートポール', anchor: '#', path: '/img/category/other/2-05.png' },
            ],
          },
        ],
      },
    ]
  })
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

.mont-zenkaku {
  font-family: 'Montserrat', 'Zen Kaku Gothic Antique', sans-serif !important;
}
.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}
.category {
  &__heading {
    background-color: $cushion;
  }
  &__list {
    border: 1px solid $cushion;
    ul {
      list-style: none;
    }
  }
}
.cat-group {
  &__ttl {
    &-icon {
      display: inline-block;
      font-size: 4rem;
      width: 100% !important;
    }
  }
  &__child {
    &-ttl {
      border-style: solid;
      border-width: 1px;
      overflow: hidden;
      position: relative;
    }
    &-icon {
      opacity: .5;
      top: 50%;
      right: 7%;
      transform: translateY(-50%) rotate(20deg);
      position: absolute;
      #online &{
        font-size: 163px;
      }
      #led & {
        font-size: 156px;
      }
      #projector & {
        font-size: 159px;
        top: 60%;
      }
      #display & {
        font-size: 160px;
        top: 62%;
      }
      #media-player & {
        font-size: 169px;
        top: 40%;
      }
      #video-peripheral & {
        font-size: 163px;
        top: 75%;
      }
      #camera & {
        font-size: 165px;
        transform: translateY(-36%) rotate(14deg);
      }
      #sensor & {
        font-size: 174px;
        transform: translateY(-43%) rotate(0deg);
      }
      #sound & {
        font-size: 162px;
        top: 63%;
      }
      #network & {
        font-size: 163px;
        transform: translateY(-48%) rotate(-16deg);
      }
      #other & {
        font-size: 128px;
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
  }
  &__col {
    height: 82px;// 82px-padding:14px =中身68px
    padding: 7px 8px !important;
  }
  &__btn {
    background: {
      repeat: no-repeat;
      position: right -5% center;
    }
    border: {
      width: 1px;
      style: solid;
      radius: .5em;
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
      #online & {
        background-color: rgba($online-bg, .6);
      }
      #led & {
        background-color: rgba($led-bg, .5);
      }
      #projector & {
        background-color: rgba($pj-bg, .5);
      }
      #display & {
        background-color: rgba($display-bg, .5);
      }
      #media-player & {
        background-color: rgba($media-bg, .5);
      }
      #video-peripheral & {
        background-color: rgba($video-bg, .5);
      }
      #camera & {
        background-color: rgba($camera-bg, .5);
      }
      #sensor & {
        background-color: rgba($sensor-bg, .5);
      }
      #sound & {
        background-color: rgba($sound-bg, .5);
      }
      #network & {
        background-color: rgba($network-bg, .5);
      }
      #other & {
        background-color: rgba($other-bg, .5);
      }
    }
  }
  &__child-ttl,
  &__btn {
    #online & {
      border-color: $online;
    }
    #led & {
      border-color: $led;
    }
    #projector & {
      border-color: $pj;
    }
    #display & {
      border-color: $display;
    }
    #media-player & {
      border-color: $media;
    }
    #video-peripheral & {
      border-color: $video;
    }
    #camera & {
      border-color: $camera;
    }
    #sensor & {
      border-color: $sensor;
    }
    #sound & {
      border-color: $sound;
    }
    #network & {
      border-color: $network;
    }
    #other & {
      border-color: $other;
    }
  }
}
#online {
  .cat-group__child {
    &:nth-of-type(1) {// オンラインイベント機器
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
#led {
  .cat-group__child {
    &:nth-of-type(1) {// LEDディスプレイ
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
#projector {
  .cat-group__child {
    &:nth-of-type(1) {// プロジェクター本体 / レンズ
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
    &:nth-of-type(2) {// プロジェクター関連機器
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
    &:nth-of-type(3) {// スクリーン
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
#display {
  .cat-group__child {
    &:nth-of-type(1) {// フラットディスプレイ
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
    &:nth-of-type(2) {// その他ディスプレイ
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
    &:nth-of-type(3) {// 自立スタンド / 壁掛・吊金具
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
#media-player {
  .cat-group__child {
    &:nth-of-type(1) {// メディアサーバー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/1-01.png');
        }
      }
    }
    &:nth-of-type(2) {// プレーヤー / レコーダー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/2-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/media-player/2-02.png');
        }
      }
    }
    &:nth-of-type(3) {// ハードディスク（メディア）レコーダー / プレーヤー
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
    &:nth-of-type(4) {// ビデオカセットレコーダー(VCR)
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/4-01.png');
        }
      }
    }
  }
}
#video-peripheral {
  .cat-group__child {
    &:nth-of-type(1) {// 映像周辺機器
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
    &:nth-of-type(2) {// ケーブル
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
#camera {
  .cat-group__child {
    &:nth-of-type(1) {// カメラ
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
    &:nth-of-type(1) {// メディアアプリケーション/ センサー/インタラクティブ関連
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
#sound {
  .cat-group__child {
    &:nth-of-type(1) {// 音響機器
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
    &:nth-of-type(2) {// インカム / トランシーバー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/sound/2-01.png');
        }
      }
    }
  }
}
#network {
  .cat-group__child {
    &:nth-of-type(1) {// 会議用機器
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
    &:nth-of-type(2) {// PC / ICTネットワーク機器
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
#other {
  .cat-group__child {
    &:nth-of-type(1) {// 照明機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/other/1-01.png');
          background-position-y: top;
        }
      }
    }
    &:nth-of-type(2) {// 多目的用品
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
