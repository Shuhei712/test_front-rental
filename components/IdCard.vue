<template>
  <div>
    <ul class="pa-4 mb-8 mt-3 cushion">
      <li class="note">
        本人登録確認後にレンタルがご利用可能となります。
      </li>
      <li class="note">
        登録できる添付ファイルはJPG、PNG、PDFで1枚につき3MBまでのファイルとなります。
      </li>
      <li class="note">
        住所確認できる書類が無い場合は保証金をお預かりする場合があります
      </li>
      <li class="note">
        国民健康保険(被用者保険以外)などの場合は以下が必要となります。<br>
        銀行取引の証明できるもの(取引銀行通帳の表紙裏１枚目の写し又は、法人番号指定通知書の写し)
      </li>
      <li class="red--text note">
        マイナンバーカードは顔写真・住所記載面のみ(ナンバー記載面は添付しないでください)
      </li>
    </ul>
    <v-row class="my-1">
      <v-col cols="12" md="6" class="pb-0 d-flex align-start">
        <span class="white--text red darken-1 px-2 me-2 rounded text-no-wrap body-2 line-height-sm">必須</span>
        <template v-if="user.MemberType===1">名刺</template>
        <span v-else class="line-height-sm">身分証明書<br>
        ( 運転免許証/健康保険証/パスポート )</span>
      </v-col>
      <v-col cols="12" md="6">
        <set-file :file-name="'file1'" :rule="'required|file'"
        :file-obj.sync="fileJson[0]" :read="read"></set-file>
      </v-col>
    </v-row>
    <v-row class="my-1">
      <v-col cols="12" md="6" class="pb-0 d-flex align-start">
        <span class="white--text red darken-1 px-2 me-2 rounded text-no-wrap body-2 line-height-sm">必須</span>
        <template v-if="user.MemberType===1">社会保険被保険証</template>
        <span v-else class="line-height-sm">現住所記載書類<br>( マイナンバーカード/発行後3ヶ月以内の書類<sup>*1</sup> )</span>
      </v-col>
      <v-col cols="12" md="6">
        <set-file :file-name="'file2'" :rule="'required|file'" :file-obj.sync="fileJson[1]" :read="read"></set-file>
      </v-col>
    </v-row>
    <v-row v-if="!(read&&!fileJson[2])" class="my-1">
      <v-col cols="12" md="6" class="pb-0 d-flex align-start">
        <template v-if="user.MemberType===1">
          <span class="white--text red darken-1 px-2 me-2 rounded text-no-wrap body-2 line-height-sm">必須</span>
          <span class="line-height-sm">
            運転免許証・パスポート又はマイナンバーカード
          </span>
        </template>
        <template v-else>
          <span class="white--text secondary px-2 me-2 rounded body-2 line-height-sm">任意</span>
          <span>学生証<sup>*2</sup></span>
        </template>
      </v-col>
      <v-col cols="12" md="6">
        <set-file v-if="user.MemberType===1"
          :file-name="'file3'" :rule="'required|file'"
          :file-obj.sync="fileJson[2]" :read="read"
        ></set-file>
        <set-file v-else
          :file-name="'file3'" :rule="'file'"
          :file-obj.sync="fileJson[2]" :read="read"
        ></set-file>
      </v-col>
    </v-row>

    <div v-if="user.MemberType===0" class="note mt-6">
      <p>*1 住民票/公共料金郵便物/国税・地方税領収証書/納税証明書/社会保険料領収書</p>
      <p>*2 学生証を事前に提出いただくことで、学生支援割引をいたします。</p>
    </div>

    <v-dialog v-model="resultDialog" width="600" persistent>
      <v-card class="pa-5 pb-0 text-center">
        <v-card-text>
          <result-card
            :result="result" :action="'本人確認の登録'"
            :path="'/myaccount'" :dialog.sync="resultDialog">
          </result-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
      // default: () => ({})
    },
    file: {
      type: Array,
      // required: true
      required: false,
      default: () => ([])
    },
    read: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      result: null,
      resultDialog: false,
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
    fileJson: {
      get(){
        return this.file
      },
      set(val){
        this.$emit('update:file', val)
      }
    }
  },
  methods: {
    async register(){
      const formData = new FormData()
      formData.append('File_01', this.fileJson[0] )
      formData.append('File_02', this.fileJson[1] )
      if(this.fileJson[2]) formData.append('File_03', this.fileJson[2] )
      formData.append('FileCnt', this.fileJson[2] ? 3:2 )
      const res = await this.$memberAxios.post(`comm/uploadFile/`, formData, {
      header: {
          "Content-Type": "multipart/form-data",
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員情報', '本人確認ファイル登録', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.$set(this.userJson, 'UploadKey', res.data.FileUploadKey)
        this.$set(this.userJson, 'DocFileName1', this.fileJson[0].name)
        this.$set(this.userJson, 'DocFileName2', this.fileJson[1].name)
        if(this.fileJson[2]) this.$set(this.userJson, 'DocFileName3', this.fileJson[2].name)
        this.$set(this.userJson, 'NecDocFlg', 1)
        return true
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) await this.register()
      }else{
        this.result = String(res.data.ErrorNo)
        this.resultDialog = true
      }
    },
    async updateUser(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const stringJson = JSON.stringify(this.userJson)
      const param = new URLSearchParams()
      param.append('JsonData', stringJson)
      const res = await this.$memberAxios.put(`member/${loginID}`, param,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員情報', '更新', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.result = 'success'
        this.resultDialog = true
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.updateUser()
      }else{
        this.result = String(res.data.ErrorNo)
        this.resultDialog = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.line-height-sm{
  line-height: 1.5rem !important;
}
.note{
  margin-bottom: 0;
  padding-left: 1.2rem;
  position: relative;
  list-style: none;
  &::before{
    content: "※";
    left: 0;
    position: absolute;
  }
}
</style>