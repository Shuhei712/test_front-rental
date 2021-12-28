<template>
  <v-card
    width="300"
  >
    <v-list>
      <v-list-item link>
        <v-list-item-title>All</v-list-item-title>
      </v-list-item>
      <v-list-group
        v-for="category in categoryList"
        :key="category.name"
        :value="false"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="category.name"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item link
          v-for="subcategory in category.subcategoryList"
          :key="subcategory.name"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subcategory.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      categoryList: [
        {
          name: 'オンラインイベント機器',
          subcategoryList: [
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
        {
          name: 'LEDディスプレイ',
          subcategoryList: [
            { name: '屋外・屋内兼用' },
            { name: '屋内専用' },
            { name: 'ビジョン用' },
            { name: '特殊形状' },
            { name: 'シースルー' },
            { name: '床用' },
            { name: 'センダーボックス' },
            { name: '電源BOX' },
          ],
        },
        {
          name: 'プロジェクター',
          subcategoryList: [
            { name: 'プロジェクター本体/レンズ' },
            { name: 'プロジェクター用レンズ' },
          ],
        },
        {
          name: 'プロジェクター関連機器',
          subcategoryList: [
            { name: '吊り金具' },
            { name: 'シャッター' },
            { name: 'スタック設置用台' },
            { name: 'リモートコントローラー' },
            { name: '簡易反射ミラー' },
            { name: 'その他プロジェクター関連機器' },
            { name: '映写台・PJステージ' },
          ],
        },
      ],
    })
  }
</script>
