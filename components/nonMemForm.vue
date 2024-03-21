<template>
  <div :class="read?'form-read':''">
    <loading v-if="isLoading"></loading>
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
            <template v-if="item.type === 'address'">{{ joinAddress(item) }}</template>
            <template v-else-if="item.type === 'date'">{{ dateFormat('add', userJson[item.val], '-') }}</template>
            <span v-else v-text="userJson[item.val]"></span>
          </div>
          <div v-else>
            <ValidationProvider v-if="item.type === 'text'||item.type === 'tel'||item.type === 'email'"
              v-slot="{ errors }"
              :name="item.val"
              :rules="item.rule?item.rule:'max:50'">
              <v-text-field
                v-model="userJson[item.val]" outlined dense
                :error-messages="errors" hide-details="auto" :readonly="read"
                :type="item.type === 'tel'?'tel':item.type === 'email'?'email':'text'"
                :inputmode="item.inputMode||''"
                :autocomplete="item.type === 'tel'?'tel':item.type === 'email'?'email':''"
                @blur="item.type === 'tel'?userJson[item.val]=toNum(userJson[item.val]):''"
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
                  v-model="incorporation"
                  readonly outlined dense hide-details="auto"
                  clearable
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="incorporation" :readonly="read"
                type="month"
                locale="jp-ja"
                :active-picker.sync="activePicker"
                :max="incorporateMaxDate"
                min="1700-01"
                @input="datePicker = false"
              ></v-date-picker>
            </v-menu>
            <div v-else-if="item.type === 'address'">
              <set-address
                :set-zip-code.sync="userJson[item.addressArr[0]]"
                :set-prefect.sync="userJson[item.addressArr[1]]"
                :set-address.sync="userJson[item.addressArr[2]]"
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
                登録できる添付ファイルはJPG・PNG・PDFで1枚につき3MBまでのファイルとなります。
              </li>
              <li class="note">
                住所確認できる書類が無い場合は保証金をお預かりする場合があります。
              </li>
              <li v-if="isCorp" class="note">
                国民健康保険証(被用者保険証以外)などの場合は以下が必要となります。<br>
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
                      <template v-else-if="subItem.type === 'address'">{{ joinAddress(subItem) }}</template>
                      <span v-else v-text="userJson[subItem.val]"></span>
                    </div>
                    <div v-else>
                      <ValidationProvider v-if="subItem.type === 'text'||subItem.type === 'tel'||subItem.type === 'email'"
                        v-slot="{ errors }"
                        :name="subItem.val"
                        :rules="subItem.rule?subItem.rule:'max:50'">
                        <v-text-field
                          v-model="userJson[subItem.val]" outlined dense
                          :error-messages="errors" hide-details="auto"
                          :readonly="read"
                          :type="subItem.type === 'tel'?'tel':subItem.type === 'email'?'email':'text'"
                          :inputmode="subItem.inputMode||''"
                          :autocomplete="subItem.type === 'tel'?'tel':subItem.type === 'email'?'email':''"
                          @blur="subItem.type === 'tel'?userJson[subItem.val]=toNum(userJson[subItem.val]):''"
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
                      <div v-else-if="subItem.type === 'address'">
                        <set-address
                          :set-zip-code.sync="userJson[subItem.addressArr[0]]"
                          :set-prefect.sync="userJson[subItem.addressArr[1]]"
                          :set-address.sync="userJson[subItem.addressArr[2]]"
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

    <!-- <p style="white-space: pre-wrap;">{{mailText}}</p> -->
    <!-- <v-btn @click="createMail">送信</v-btn>
    <p class="form__read-wrap"> {{ mailText }}</p> -->
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
        { require: true, type: 'text', title: 'お名前', val: 'NAME' },
        { require: false, type: 'text', title: 'お名前(フリガナ)', val: 'NAME_KANA', rule: 'kana|max:50' },
        { require: true, type: 'email', title: 'メールアドレス', val: 'EMAIL', rule: 'email|max:50' },
        { require: true, type: 'address', title: '住所', val: 'ADDRESS',
          addressArr:['ZIP_CODE', 'PREFECT', 'ADDRESS']
        },
        { require: false, type: 'tel', title: '電話番号', val: 'TEL', rule: 'num', inputMode: 'numeric' },
        { require: false, type: 'tel', title: 'FAX番号', val: 'FAX', rule: 'num', inputMode: 'numeric' },
        { require: false, type: 'tel', title: '携帯番号', val: 'TEL_MOBILE', rule: 'num', inputMode: 'numeric' },
        { require: false, type: 'text', title: '勤務先/学校名', val: 'WORK_PLACE' },
        { require: false, type: 'tel', title: '上記電話番号', val: 'WORK_TEL', rule: 'num', inputMode: 'numeric' },
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
        { require: true, type: 'text', title: '会社名(フリガナ)', val: 'COMPANY_KANA', rule: 'kana|max:50' },
        { require: true, type: 'text', title: '代表者名', val: 'REPRESENTATIVE' },
        { require: true, type: 'address', title: '本社 住所', val: 'HQ_ADDRESS',
          addressArr:['HQ_ZIP_CODE', 'HQ_PREFECT', 'HQ_ADDRESS']
        },
        { require: true, type: 'tel', title: '本社 電話番号', val: 'HQ_TEL', rule: 'num', inputMode: 'numeric' },
        { require: false, type: 'tel', title: '本社 FAX番号', val: 'HQ_FAX', rule: 'num', inputMode: 'numeric' },
        { require: true, title: '事業内容', val: 'BUSS_CONTENT',
          items: [
            { type: 'checkbox',title: '', val: 'BUSS_CONTENT'},
            { type: 'text', title: 'その他、法人/個人(エンドユーザー以外)', val: 'BUSS_CONTENT_OTH'}
          ]
        },
        { title: 'ご担当者様 ▼',
          items: [
            { require: true, type: 'text', title: 'お名前', val: 'NAME' },
            { require: false, type: 'text', title: '部署', val: 'SECT', rule: 'max:255' },
            { require: true, type: 'email', title: 'メールアドレス', val: 'EMAIL', rule: 'email|max:50' },
        ]},
        { title: '窓口事業所が異なる場合 ▼',
          items: [
            { require: false, type: 'text', title: '事業所名', val: 'OFFICE_NAME', rule: 'max:255' },
            { require: false, type: 'address', title: '住所', val: 'OFFICE_ADDRESS',
              addressArr:['OFFICE_ZIP_CODE', 'OFFICE_PREFECT', 'OFFICE_ADDRESS']
            },
            { require: false, type: 'tel', title: '電話番号', val: 'OFFICE_TEL', rule: 'num', inputMode: 'numeric' },
            { require: false, type: 'tel', title: 'FAX番号', val: 'OFFICE_FAX', rule: 'num', inputMode: 'numeric' },
          ]
        },
        { require: false, type: 'date', title: '設立年月', val: 'FOUNDED' },
        { require: false, type: 'text', title: '法人番号', val: 'CORPORATE_NO', inputMode: 'numeric' },
        { require: false, type: 'radio', title: '法人区分', val: 'CORPORATE_CLASS',
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
            { type: 'email', title: 'メールアドレス(複数可)', val: 'BILLING_EMAIL_1', rule: 'email|max:50',
              if:['invoiceFlg','あり'] },
            { type: 'email', title: '', val: 'BILLING_EMAIL_2', rule: 'email|max:50',
              if:['invoiceFlg','あり']
            },
            { type: 'email', title: '', val: 'BILLING_EMAIL_3', rule: 'email|max:50',
              if:['invoiceFlg','あり']
            },
            { type: 'email', title: '', val: 'BILLING_EMAIL_4', rule: 'email|max:50',
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
      activePicker: null,
      incorporation: null,
      incorporateMaxDate: this.getMaxDate(),
      services: [
        '広告代理店','イベント企画制作会社','会議運営サービス/学会代理店(PCO)','ほかプロダクション','放送局/マスコミ','イベント制作＋建装/ディスプレイ会社','デザイン/設計事務所','旅行代理店','ホテル/ホール/会館/結婚式場/展示会場','ホテル/ホール/会館/結婚式場/展示会場付業者','同業者(JVR系)','同業者(JVR以外)','同業者(総合レンタル)','同業者(音響系)','関連業者(映像専門以外)','建装/舞台技術/ディスプレイ会社','映像中継/収録技術','映像/音響メーカー/機器代理店/販売特約店','法人/団体(エンドユーザー)','学校法人(大学/専門学校)','法人/各種団体(学術会議系)','製薬会社/医療機器ﾒｰｶｰ','個人(エンドユーザー)'
      ],
      isAgree: false,
      mailText: '',
      url: this.$config.NONMEMBER_API_URL,
      isLoading: false,
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
        }else if(e.val==='ADDRESS'||e.val==='HQ_ADDRESS'){
          return !this.userJson[e.addressArr[0]] || !this.userJson[e.addressArr[1]] || !this.userJson[e.addressArr[2]]
        }else if(e.items) return e.items.some((item,index) => {
          const val = (item.type==='file') ? this.fileArr[index] : this.userJson[item.val]
          return item.require && !val
        })
        else return e.require && !this.userJson[e.val]
      })
    },
  },
  watch: {
    isValid(val){
      this.$emit('update:valid', val)
    },
    'incorporation'(val){
      this.userJson.FOUNDED = this.dateFormat('remove',val,'-')
    },
    datePicker (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  created() {
    this.$emit('update:valid', this.isValid)
    if (this.read) this.createMail()
  },
  methods: {
    check(arr){ // 条件によって見た目を変える
      if(!arr) return true
      else if(arr[1]) return this.userJson[arr[0]] === arr[1]
      else {
        return !(!this.fileArr[arr[0]] && this.read)
      }
    },
    arrVal(arr){ // 配列の値を１つずつ改行する
      let val = ''
      arr.forEach(item=>{
        val += item + '\r\n'
      })
      return val
    },
    joinAddress(item){
      const arr = []
      for (let i = 0; i < 3; i++) {
        arr[i] = this.userJson[item.addressArr[i]] ? this.userJson[item.addressArr[i]] : ''
      }
      const [zip, prefect, address] = arr
      return `${zip?`〒${zip}  `:''}${prefect}${address}`
    },
    dateFormat(action, date, separator){
      if(!date) return ''
      if(action==='add'){
        const year = date.substring(0, 4)
        const month = date.substring(4, 6)
        const formateDate = year+separator+month
        return formateDate
      }else if(action==='remove'){
        return date.replace(new RegExp(separator, 'g'), "")
      }
    },
    createMail(){
      this.formList.forEach(e=>{
        let val = ''
        const postFileArr = this.$sameFileNameCheck(this.fileArr)
        if (e.val==='BUSS_CONTENT') {
          val = this.userJson[e.val].length?`${this.userJson[e.val]}`:''
          const oth = this.userJson.BUSS_CONTENT_OTH
          if (oth) val += `\r\nその他、法人/個人(エンドユーザー以外)： ${oth}`
          this.mailText += `■${e.title}\r\n${val}\r\n\r\n`
        } else if (e.items) {
          if (e.if && !this.check(e.if)) return
          if (e.title) this.mailText += `--------------------------------------------------\r\n${e.title}\r\n--------------------------------------------------\r\n`
          e.items.forEach((item,index)=>{
            if (item.if && !this.check(item.if)) return
            else if (e.val=== 'FILE') {
              if(!postFileArr[index]) return
              val = postFileArr[index].name
            }else if(item.type==='address'){
              val = this.joinAddress(item)
            }else val = this.userJson[item.val] ? this.userJson[item.val] : ''
            this.mailText += `${item.title?`  ■${item.title}\r\n`:''}`
            this.mailText += `  ${item.title&&item.val!=='BILLING_EMAIL_1'?`${val}\r\n`:`・${val}`}\r\n`
          })
          this.mailText += '\r\n'
        }else {
          if (e.type==='address') val = this.joinAddress(e)
          else if (e.type==='date') val = this.dateFormat('add', this.userJson[e.val], '-')
          else val = this.userJson[e.val] ? this.userJson[e.val] : ''
          this.mailText += `■${e.title}\r\n${val}\r\n\r\n`
        }
      })
      this.$emit('mailText', this.mailText)
    },
    toNum(e){
      if (!e) return
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|ー|－/g,'')
    },
    getMaxDate(){
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      return `${year+1}-${month}`
    },
    async submit(contentKey, completePath) {
      this.isLoading = true
      const accessKey = await this.getAccessKey(contentKey)
      const uploadKey = await this.registerFile(accessKey, contentKey)
      if (uploadKey) {
        await this.$emit('registerInfo',{
          accessKey,
          uploadKey,
          url: this.url
        })
      } else this.$router.push(`${completePath}/complete`)
      // this.isLoading = false
    },
    async getAccessKey(contentKey){
      const param = new URLSearchParams()
      param.append('ContentsKey', contentKey)
      param.append('UserAgent', navigator.userAgent)
      const res = await this.$axios.$post(`${this.url}get_access_key.php`, param, {
        timeout: 15000,
      })
      return res.AccessKey
    },
    async registerFile(accessKey, contentKey){
      const formData = new FormData()
      let fileCnt = 0
      const postFileArr = this.$sameFileNameCheck(this.fileArr)
      postFileArr.forEach((file)=>{
        if(!file) return
        fileCnt++
        formData.append(`File0${fileCnt}`, file)
      })
      formData.append('ContentsKey', contentKey)
      formData.append('AccessKey', accessKey )
      formData.append('FileCnt', fileCnt )
      const res = await this.$axios.post(`${this.url}upload_attachment.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
        },
        timeout: 15000,
      })
      if(res.data.Status==='TRUE'){
        return res.data.UploadKey
      }else{
        this.$store.commit('register/setFormErr', res.data)
        return false
      }
    },
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
.form-read .v-input--is-readonly::v-deep {
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
