<template>
  <div>
    <template v-for="item in formList">
      <dl v-if="check(item.if)" :key="item.val" class="form__dl">
        <dt class="mb-1">
          <v-chip v-if="typeof item.require === 'boolean' && !read"
            label small class="text-white"
            :color="item.require? 'red' : 'outline'"
          >
            {{ item.require? '必須' : '任意' }}
          </v-chip>
          {{ item.title }}
        </dt>
        <dd class="mb-6">
          <div v-if="read&&item.type" class="form__read-wrap">

            <template v-if="item.type === 'addressHQ'">
              <span>〒</span><span v-text="userJson.HQ_ZIP_CODE"></span>
              <span v-text="userJson.HQ_PREFECT"></span><span v-text="userJson.HQ_ADDRESS"></span>
            </template>
            <template v-else-if="item.type === 'address'">
              <span>〒</span><span v-text="userJson.ZIP_CODE"></span>
              <span v-text="userJson.PREFECT"></span><span v-text="userJson.ADDRESS"></span>
            </template>
            <span v-else v-text="userJson[item.val]"></span>
          </div>
          <div v-else>
            <ValidationProvider v-if="item.type === 'text'"
              v-slot="{ errors }"
              :name="item.val"
              :rules="item.rule?item.rule:'max:50'">
              <v-text-field
                v-model="userJson[item.val]" outlined dense
                :error-messages="errors" hide-details="auto" :readonly="read"
              ></v-text-field>
            </ValidationProvider>
            <v-radio-group v-else-if="item.type === 'radio'"
              v-model="userJson[item.val]" row
              class="mt-0" hide-details="auto" :readonly="read"
            >
              <v-radio v-for="option in item.options"
                :key="option" :label="option" :value="option"
              ></v-radio>
            </v-radio-group>
            <template v-else-if="item.type === 'checkbox'">
              <div class="d-flex flex-wrap">
                <v-checkbox v-for="service in services" :key="service"
                  v-model="userJson[item.val]"
                  :label="service"
                  dense
                  color="primary"
                  class="flex-grow-0 me-3 "
                  :value="service"
                  hide-details
                  :readonly="read"
                ></v-checkbox>
              </div>
              <v-text-field
                v-model="userJson.BUSS_CONTENT_OTH" outlined dense
                label="その他、法人/個人(エンドユーザー以外)"
                class="mt-2" hide-details="auto" :readonly="read"
              ></v-text-field>
            </template>
            <v-menu v-else-if="item.type === 'date'"
              v-model="datePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="userJson[item.val]"
                  :readonly="read" outlined dense hide-details="auto"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="userJson[item.val]" :readonly="read"
                @input="datePicker = false"
              ></v-date-picker>
            </v-menu>
            <div v-else-if="item.type === 'addressHQ'">
              <set-address
                :set-zip-code.sync="userJson.HQ_ZIP_CODE"
                :set-prefect.sync="userJson.HQ_PREFECT"
                :set-address.sync="userJson.HQ_ADDRESS"
                :required="false" :read="read">
              </set-address>
            </div>
            <div v-else-if="item.type === 'address'">
              <set-address
                :set-zip-code.sync="userJson.ZIP_CODE"
                :set-prefect.sync="userJson.PREFECT"
                :set-address.sync="userJson.ADDRESS"
                :required="false" :read="read">
              </set-address>
            </div>

            <ValidationProvider v-else-if="item.type === 'textarea'"
              v-slot="{ errors }"
              :name="item.val"
              :rules="'max:1500'">
              <v-textarea
                v-model="userJson[item.val]"
                outlined dense auto-grow rows="1"
                :error-messages="errors" hide-details="auto" :read="read"
              ></v-textarea>
            </ValidationProvider>

            <ul v-else-if="item.val === 'FILE'&&!read" class="pa-4 mt-1 cushion">
              <li class="note">
                登録できる添付ファイルはJPG、PNG、PDFで1枚につき3MBまでのファイルとなります。
              </li>
              <li class="note">
                住所確認できる書類が無い場合は保証金をお預かりする場合があります。
              </li>
              <li v-if="isCorp" class="note">
                国民健康保険(被用者保険以外)などの場合は以下が必要となります。<br>
                銀行取引の証明できるもの(取引銀行通帳の表紙裏１枚目の写し又は、法人番号指定通知書の写し)
              </li>
              <li v-if="!isCorp" class="note">
                現住所記載書類<br>
                ・発行後3ヶ月以内の書類 (住民票/公共料金郵便物/ 国税、地方税領収証書/ 納税証明書/社会保険料領収書)<br>
                ・マイナンバーカード
              </li>
              <li v-if="!isCorp" class="note">学生の方は学生証を事前に提出いただきますと、学生支援割引をいたします。</li>
              <li class="red--text note">
                マイナンバーカードは顔写真・住所記載面のみ(ナンバー記載面は添付しないでください)
              </li>
              <li class="note">
                書類の提出等で対応できない場合は、
                <a href="https://www.takenaka-co.co.jp/contact/" target="_blank" class="link">お問い合わせ</a>からご相談ください。
              </li>
            </ul>
          </div>
          <v-card v-if="item.items" outlined>
            <v-card-text class="text-body-1 text--text pa-5 pb-2">
              <p v-if="isSameFileName&&item.val === 'FILE'"
                class="red--text mb-3">同一のファイル名では登録できません。
              </p>
              <template v-for="subItem,index in item.items">
                <dl
                  v-if="check(subItem.if)"
                  :key="subItem.val" class="form__dl">
                  <dt class="mb-1">
                    <v-chip v-if="typeof subItem.require === 'boolean' && !read"
                      label small class="text-white"
                      :color="subItem.require? 'error' : 'outline'"
                    >
                      {{ subItem.require? '必須' : '任意' }}
                    </v-chip>
                    {{ subItem.title }}
                  </dt>
                  <dd class="mb-4">
                    <div v-if="read" class="form__read-wrap">
                      <span v-if="subItem.type === 'file'"
                      v-text="fileArr[index].name"></span>
                      <span v-else-if="subItem.type === 'checkbox'"
                      v-text="arrVal(userJson[subItem.val])"></span>
                      <template v-else-if="subItem.type === 'addressLiaison'">
                        <span>〒</span><span v-text="userJson.OFFICE_ZIP_CODE"></span>
                        <span v-text="userJson.OFFICE_PREFECT"></span><span v-text="userJson.OFFICE_ADDRESS"></span>
                      </template>
                      <span v-else v-text="userJson[subItem.val]"></span>
                    </div>
                    <div v-else>
                      <ValidationProvider v-if="subItem.type === 'text'"
                        v-slot="{ errors }"
                        :name="subItem.val"
                        :rules="subItem.rule?subItem.rule:'max:50'">
                        <v-text-field
                          v-model="userJson[subItem.val]" outlined dense
                          :error-messages="errors" hide-details="auto"
                          :readonly="read"
                        ></v-text-field>
                      </ValidationProvider>
                      <v-radio-group v-else-if="subItem.type === 'radio'"
                        v-model="userJson[subItem.val]" row
                        class="mt-0" hide-details="auto" :readonly="read"
                      >
                        <v-radio v-for="option in subItem.options"
                          :key="option" :label="option" :value="option"
                        ></v-radio>
                      </v-radio-group>
                      <div v-else-if="subItem.type === 'addressLiaison'">
                        <set-address
                          :set-zip-code.sync="userJson.OFFICE_ZIP_CODE"
                          :set-prefect.sync="userJson.OFFICE_PREFECT"
                          :set-address.sync="userJson.OFFICE_ADDRESS"
                          :required="false" :read="read"
                          >
                        </set-address>
                      </div>

                      <template v-else-if="subItem.type === 'checkbox'">
                        <div class="d-flex flex-wrap">
                          <v-checkbox v-for="service in services" :key="service"
                            v-model="userJson[subItem.val]"
                            :label="service"
                            dense
                            color="primary"
                            class="flex-grow-0 me-3 "
                            :value="service"
                            hide-details
                            :readonly="read"
                          ></v-checkbox>
                        </div>
                        <!-- <v-text-field
                          v-model="userJson.BUSS_CONTENT_OTH" outlined dense
                          label="その他、法人/個人(エンドユーザー以外)"
                          class="mt-2" hide-details="auto" :readonly="read"
                        ></v-text-field> -->
                      </template>
                      <ValidationProvider v-else-if="subItem.type === 'file'">
                        <set-file
                          :file-name="subItem.val" :rule="'file'"
                          :file-obj.sync="fileArr[index]"
                          :read="read"
                        ></set-file>
                      </ValidationProvider>
                    </div>
                  </dd>
                </dl>
              </template>
            </v-card-text>
          </v-card>
        </dd>
      </dl>
    </template>
    <v-checkbox v-if="!read" v-model="isAgree">
      <template #label>
        当社の<a target="_blank" href="https://www.takenaka-co.co.jp/form/rental/privacypolicy.html" class="link" @click.stop>個人情報の取扱い</a>について同意する
      </template>
    </v-checkbox>
  </div>
</template>
<script>

export default {
  props: {
    user:{
      type: Object,
      required: true,
      default: () => {},
    },
    file:{
      type: Array,
      required: false,
      default: () => ([])
    },
    valid: {
      type: Boolean,
      required: false,
      default: false
    },
    read: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      err: null,
      isCorp: this.$route.path.includes('corporate'),
      indList: [
        { require: true, type: 'text', title: '氏名', val: 'NAME' },
        { require: false, type: 'text', title: '氏名（フリガナ）', val: 'NAME_KANA', rule: 'kana|max:50' },
        { require: true, type: 'text', title: 'メールアドレス', val: 'EMAIL', rule: 'email|max:50' },
        { require: true, type: 'address', title: '住所', val: 'ADDRESS' },
        { require: false, type: 'text', title: '電話番号', val: 'TEL', rule: 'max:20' },
        { require: false, type: 'text', title: 'FAX番号', val: 'FAX', rule: 'max:20' },
        { require: false, type: 'text', title: '携帯番号', val: 'TEL_MOBILE', rule: 'max:20' },
        { require: false, type: 'text', title: '勤務先/学校名', val: 'WORK_PLACE' },
        { require: false, type: 'text', title: '上記電話番号', val: 'WORK_TEL', rule: 'max:20' },
        { require: true, type: 'text', title: '弊社担当者名 (※担当者がわからない場合は不明と記載ください。)', val: 'STAFF_NAME' },
        { require: false, type: 'textarea', title: 'ご質問など', val: 'CONTACTS' },
        { title: '必要書類▼', val: 'FILE',
          items: [
            { require: true, type: 'file', title: '身分証明書(運転免許証/健康保険証/パスポート)', val: 'file1' },
            { require: true, type: 'file', title: '現住所記載書類', val: 'file2' },
            { require: false, type: 'file', title: '学生証', val: 'file3', if:['2'] },
          ]
        },
      ],
      corpList: [
        { require: true, type: 'text', title: '会社名', val: 'COMPANY_NAME' },
        { require: true, type: 'text', title: '会社名（フリガナ）', val: 'COMPANY_KANA', rule: 'kana|max:50' },
        { require: true, type: 'text', title: '代表者名', val: 'REPRESENTATIVE' },
        { require: true, type: 'addressHQ', title: '本社 住所', val: 'HQ_ADDRESS' },
        { require: true, type: 'text', title: '本社 電話番号', val: 'HQ_TEL', rule: 'max:20' },
        { require: false, type: 'text', title: '本社 FAX番号', val: 'HQ_FAX', rule: 'max:20' },
        { require: true, title: '事業内容', val: 'BUSS_CONTENT',
          items: [
            { type: 'checkbox',title: '', val: 'BUSS_CONTENT'},
            { type: 'text', title: 'その他、法人/個人(エンドユーザー以外)', val: 'BUSS_CONTENT_OTH'}
          ]
        },
        { title: 'ご担当者様 ▼',
          items: [
            { require: true, type: 'text', title: '氏名', val: 'NAME' },
            { require: false, type: 'text', title: '部署', val: 'SECT', rule: 'max:255' },
            { require: true, type: 'text', title: 'メールアドレス', val: 'EMAIL', rule: 'email|max:50' },
        ]},
        { title: '窓口事業所が異なる場合 ▼',
          items: [
            { require: false, type: 'text', title: '事業所名', val: 'OFFICE_NAME', rule: 'max:255' },
            { require: false, type: 'addressLiaison', title: '住所', val: 'OFFICE_ADDRESS' },
            { require: false, type: 'text', title: '電話番号', val: 'OFFICE_TEL', rule: 'max:20' },
            { require: false, type: 'text', title: 'FAX番号', val: 'OFFICE_FAX', rule: 'max:20' },
          ]
        },
        { require: false, type: 'date', title: '設立', val: 'FOUNDED' },
        { require: false, type: 'text', title: '法人番号', val: 'CORPORATE_NO' },
        { require: false, type: 'radio', title: '区分', val: 'CORPORATE_CLASS',
          options:['上場', '非上場', '公共団体ほか']
        },
        { title: '非上場の場合 ▼', if:['CORPORATE_CLASS','非上場'],
          items: [
            { require: false, type: 'text', title: '資本金', val: 'CAPITAL' },
            { require: false, type: 'text', title: '年商 前年', val: 'ANNUAL_SALES_1' },
            { require: false, type: 'text', title: '年商 前々年', val: 'ANNUAL_SALES_2' },
            { require: false, type: 'text', title: '従業員数', val: 'NUM_EMP' },
          ]
        },
        { require: false, title: '主要 販売先',
          items: [
            { type: 'text', title: '', val: 'SALES_DIST_1' },
            { type: 'text', title: '', val: 'SALES_DIST_2' },
            { type: 'text', title: '', val: 'SALES_DIST_3' },
          ]
        },
        { require: false, title: '主要 仕入先',
          items: [
            { type: 'text', title: '', val: 'SUPPLIER_1' },
            { type: 'text', title: '', val: 'SUPPLIER_2' },
            { type: 'text', title: '', val: 'SUPPLIER_3' },
          ]
        },
        { require: false, type: 'radio', title: 'お支払方法', val: 'PAY_METHOD',
          options:['事前振込', '現金(店頭お支払)',]
        },
        { require: true, type: 'text', title: 'お振込名義', val: 'TRANS_NAME' },
        { require: false, type: 'text', title: '経理ご担当者名', val: 'MG_ACCOUNTING' },
        { require: false, title: '電子請求書 (原則、電子メールでの配信(PDF))',
          items: [
            { type: 'radio', title: '固有の受信メールアドレス',val: 'invoiceFlg',
              options:['あり','なし']
            },
            { type: 'radio', title: '受信先', val: 'BILLING_ACCEPT',
              if:['invoiceFlg','なし'],
              options:['その都度確認','営業担当者宛','その他']
            },
            { type: 'text', title: 'その他の場合', val: 'billingOther',
              if:['invoiceFlg','なし']
            },
            { type: 'text', title: 'メールアドレス(複数可)', val: 'BILLING_EMAIL_1', rule: 'email|max:50',
              if:['invoiceFlg','あり'] },
            { type: 'text', title: '', val: 'BILLING_EMAIL_2', rule: 'email|max:50',
              if:['invoiceFlg','あり']
            },
            { type: 'text', title: '', val: 'BILLING_EMAIL_3', rule: 'email|max:50',
              if:['invoiceFlg','あり']
            },
            { type: 'text', title: '', val: 'BILLING_EMAIL_4', rule: 'email|max:50',
              if:['invoiceFlg','あり']
            },
          ]
        },
        { require: true, type: 'text', title: '弊社担当者名 (※担当者がわからない場合は不明と記載ください。)', val: 'STAFF_NAME' },
        { require: false, type: 'text', title: '弊社を知ったきっかけ', val: 'YOU_KNOWN', rule: 'max:255' },
        { require: false, type: 'textarea', title: 'ご質問など', val: 'CONTACTS' },
        { title: '必要書類▼', val: 'FILE',
          items: [
            { require: true, type: 'file', title: '名刺', val: 'file1' },
            { require: true, type: 'file', title: '社会保険被保険証', val: 'file2' },
            { require: true, type: 'file', title: '運転免許証、パスポート又はマイナンバーカード', val: 'file3' },
          ]
        },
      ],
      datePicker: false,
      services: [
        '広告代理店','イベント企画制作会社','会議運営サービス/学会代理店(PCO)','ほかプロダクション','放送局/マスコミ','イベント制作＋建装/ディスプレイ会社','デザイン/設計事務所','旅行代理店','ホテル/ホール/会館/結婚式場/展示会場','ホテル/ホール/会館/結婚式場/展示会場付業者','同業者(JVR系)','同業者(JVR以外)','同業者(総合レンタル)','同業者(音響系)','関連業者(映像専門以外)','建装/舞台技術/ディスプレイ会社','映像中継/収録技術','映像/音響メーカー/機器代理店/販売特約店','法人/団体(エンドユーザー)','学校法人(大学/専門学校)','法人/各種団体(学術会議系)','製薬会社/医療機器ﾒｰｶｰ','個人(エンドユーザー)'
      ],
      isAgree: false
    }
  },
  computed: {
    userJson: {
      get(){
        return this.user
      },
      set(val){
        this.$emit('update:user', val)
      }
    },
    fileArr: {
      get(){
        return this.file
      },
      set(val){
        this.$emit('update:file', val)
      }
    },
    formList(){
      return this.isCorp ? this.corpList : this.indList
    },
    isValid(){
      return this.formList.some(e => {
        if(!this.isAgree) return true
        else if(e.val==='BUSS_CONTENT'){
          return !this.userJson[e.val].length && !this.userJson.BUSS_CONTENT_OTH
        }else if(e.val==='HQ_ADDRESS'){
          return !this.userJson.HQ_ZIP_CODE || !this.userJson.HQ_PREFECT || !this.userJson.HQ_ADDRESS
        }else if(e.val==='ADDRESS'){
          return !this.userJson.ZIP_CODE || !this.userJson.PREFECT || !this.userJson.ADDRESS
        }else if(e.items) return e.items.some((item,index) => {
          const val = (item.type==='file') ? this.fileArr[index] : this.userJson[item.val]
          return item.require && !val || this.isSameFileName
        })
        else return e.require && !this.userJson[e.val]
      })
    },
    isSameFileName(){
      const fileNames = this.fileArr.filter(file => file ).map((file) => file.name)
      const uniqueFileNames = new Set(fileNames)
      return uniqueFileNames.size !== fileNames.length
    }

  },
  watch: {
    isValid(val){
      this.$emit('update:valid', val)
    }
  },
  created() {
    this.$emit('update:valid', this.isValid)
  },
  methods: {
    check(arr){
      if(!arr) return true
      else if(arr[1]) return this.userJson[arr[0]] === arr[1]
      else {
        return !(!this.fileArr[arr[0]] && this.read)
      }
    },
    arrVal(arr){
      let val = ''
      arr.forEach(item=>{
        val += item + '\r\n'
      })
      return val
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.v-input--checkbox::v-deep .v-input--selection-controls__input{
  margin-right: 0;
}
.v-text-field::v-deep .v-text-field__details{
  margin-bottom: 0;
}
.note{
  padding-left: 1.4rem;
  list-style: none;
  @include wordSymbol('※')
}
.v-input--is-readonly::v-deep {
  pointer-events: none;
}
.form__read-wrap{
  min-height: 1.5rem;
  border-bottom: 1px solid rgba($outline,0.4);
  white-space: pre-wrap;
  background-color: rgba($outline,0.1);
  padding-left: 5px;
  line-height: 1.8em;
  word-break: break-word;
}
dt{
  font-weight: 500;
}
</style>
