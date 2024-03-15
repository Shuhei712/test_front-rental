<template>
  <div>
    <!-- <top-bar title="新規登録" :bread-crumbs="breadCrumbs"></top-bar> -->
    <div class="pb-16">
      <v-container>
        <p>
          会員登録の前に、必ず以下の「レンタル規約」をご確認ください。
        </p>
        <v-card class="mt-3 overflow-y-auto" height="40vh" min-height="280">
          <v-card-title>レンタル規約（2017年6月改定）</v-card-title>
          <v-card-text>
            <ul>
              <li class="list-style-none">
                <v-divider class="mb-3"></v-divider>
                <h3 class="pb-1">お申し込み内容</h3>
                <div>
                  <ul class="ps-4">
                    <li class="rental-rule__entry-list">ご希望の機材名、数量</li>
                    <li class="rental-rule__entry-list">ご使用日時、場所</li>
                    <li class="rental-rule__entry-list">
                      機材お渡し方法
                      <ul>
                        <li class="list-style-none"><dl class="d-flex">
                          <dt class="flex-shrink-0">ご来社：</dt>
                          <dd>お引き取り / ご返却日</dd>
                        </dl></li>
                        <li class="list-style-none"><dl class="d-flex">
                          <dt class="flex-shrink-0">ご郵送：</dt>
                          <dd>貴社着日 / 弊社戻り着日（送料はご負担となります。）</dd>
                        </dl></li>
                        <li class="list-style-none"><dl class="d-flex">
                          <dt class="flex-shrink-0">搬入出：</dt>
                          <dd>搬入 / 搬出ご希望日時（別途料金となります。）</dd>
                        </dl></li>
                      </ul>
                    </li>
                  </ul>
                  <p class="pt-1">上記と合わせて機材ご使用期間をお知らせ下さい。</p>
                  <p>また、設営・撤去および当日オペレート（別途料金）も承っております。</p>
                </div>
                <v-divider class="my-3"></v-divider>
              </li>
              <li class="list-style-none">
                <h3 class="pb-1">レンタル期間および料金</h3>
                <div>
                  <ul>
                    <li class="list-style-none">
                      <dl class="d-flex">
                        <dt class="flex-shrink-0">期間：</dt>
                        <dd>弊社渡しより、弊社戻りまでとさせて頂きます。</dd>
                      </dl>
                    </li>
                    <li class="list-style-none">
                      <dl class="d-flex">
                        <dt class="flex-shrink-0">料金：</dt>
                        <dd>基本的に機材ご使用日数とさせて頂きます。</dd>
                      </dl>
                      <p class="pt-2">※お渡し日・ご返却日によっては拘束期間料金が発生致します。</p>
                      <p>地方など遠距離の場合はご相談下さい。</p>
                    </li>
                  </ul>
                  <div class="mt-2">
                    <h4 class="color-title fw-m">期日・期間の変更</h4>
                    <p>お申し込み後の機材変更・期日変更につきましては、お渡し日の5営業日前までにご連絡下さい。</p>
                  </div>
                  <div class="mt-2">
                    <h4 class="color-title fw-m">キャンセル料金</h4>
                    <div>
                      原則として、次の相当額をキャンセル料として申し受けます。
                      <ul class="pt-2">
                        <li class="list-style-none"><dl class="d-flex">
                          <dt class="flex-shrink-0">当日：</dt>
                          <dd>レンタル料金の80%</dd>
                        </dl></li>
                        <li class="list-style-none"><dl class="d-flex">
                          <dt class="flex-shrink-0">前日：</dt>
                          <dd>レンタル料金の50%</dd>
                        </dl></li>
                        <li class="list-style-none"><dl class="d-flex">
                          <dt class="flex-shrink-0">2日～3日前：</dt>
                          <dd>レンタル料金の40%</dd>
                        </dl></li>
                        <li class="list-style-none"><dl class="d-flex">
                          <dt class="flex-shrink-0">4日～5日前：</dt>
                          <dd>レンタル料金の20%</dd>
                        </dl></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <v-divider class="my-3"></v-divider>
              </li>
              <li class="list-style-none">
                <h3 class="pb-1">保証金</h3>
                <div>
                  <p>
                    場合により、保証金を頂く場合がありますので、ご了承下さい。&nbsp;また、身分証明書を提示して頂く事があります。
                  </p>
                </div>
                <v-divider class="my-3"></v-divider>
              </li>
              <li class="list-style-none">
                <h3 class="pb-1">お支払い方法</h3>
                <div>
                  <p>原則、事前のお支払いとなりますが、あらかじめ契約時に御支払い条件をご確認させて頂きます。</p>
                </div>
                <v-divider class="my-3"></v-divider>
              </li>
              <li class="list-style-none">
                <h3 class="pb-1">お願い</h3>
                <div>
                  <ul class="ps-5">
                    <li>機材は全て精密機器につき、御取り扱いに充分ご注意下さい。</li>
                    <li>機材は整備・点検の上レンタルいたしておりますが、使用前に必ず動作チェック、付属品のご確認等を行って下さい。</li>
                    <li>レンタル期間中、お客様の故意または過失による事故・破損・盗難・紛失等により、弊社に損害が発生した場合は、
                    お客様において当該損害を賠償する責任が有ります。
                    また、お客様に損害が生じた場合であっても、私どもは一切の責任を負いません。</li>
                    <li>商品の構造上の欠陥により万ー不都合が生じた場合には、代替品の提供またはレンタル料金の全部
                    または一部の返金をいたしますが、それ以上の賠償には応じかねますのでご了承ください。</li>
                    <li>レンタル期間が終了してからのクレームについては責任を負いかねます。</li>
                    <li>催物を成功させるために予備機材を用意される事をお勧め致します。
                    （料金などについてはご相談下さい。）</li>
                    <li>電池・テープなどは、消耗品として御客様のご負担になります。</li>
                    <li>レンタル期間中どのようなトラブルもすみやかにご連絡下さい。</li>
                    <li>本規約は、発注をもって同意したものとみなされます。</li>
                  </ul>
                </div>
              </li>
            </ul>
          </v-card-text>
        </v-card>
        <v-checkbox
          v-model="checkbox"
          label="サービス内容を理解し、利用規約に同意します。"
        ></v-checkbox>
        <div class="d-flex flex-wrap justify-center">
          <v-btn color="primary"
            class="white--text ma-1"
            :disabled="!checkbox"
            @click="setUserType(0)"
          >一般WEB会員</v-btn>
          <v-btn color="primary"
            class="white--text ma-1"
            :disabled="!checkbox"
            @click="setUserType(1)"
          >法人WEB会員</v-btn>
        </div>
      </v-container>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    user:{
      type: Object,
      required: true
    },
  },
  data(){
    return{
      checkbox: false
    }
  },
  computed: {
    syncedUser: {
      get(){
        return this.user
      },
      set(val){
        this.$emit('update:user', val)
      }
    }
  },
  watch: {
    'checkbox'(){
      if (this.checkbox) {
        this.$emit('agree', true)
        return true
      }else{
        this.$emit('agree', false)
        return false
      }
    }
  },
  methods: {
    setUserType(num) {
      this.$set(this.syncedUser, 'MemberType', num)
      this.$router.push('/register#input')
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.list-style-none{
  list-style: none;
}
</style>
