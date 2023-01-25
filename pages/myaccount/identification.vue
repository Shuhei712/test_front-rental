<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="本人確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <p>
        <span v-if="userInfo.NecDocFlg===1">
          <div class="green--text text-h6">登録済みファイル</div>
          <v-divider class="mb-3"></v-divider>
          <ul class="pl-5">
            <template v-if="userInfo.MemberType">
              <li v-if="userInfo.DocFileName1">名刺</li>
              <li v-if="userInfo.DocFileName2">社会保険被保険証</li>
              <li v-if="userInfo.DocFileName3">運転免許証・パスポート又はマイナンバーカード</li>
            </template>
            <template v-else>
              <li v-if="userInfo.DocFileName1">身分証明書</li>
              <li v-if="userInfo.DocFileName2">現住所記載書類</li>
              <li v-if="userInfo.DocFileName3">学生証</li>
            </template>
          </ul>
          <v-divider class="mt-3"></v-divider>
        </span>
        <span v-else class="red--text text-h6">未登録</span>
      </p>
      <id-card :member-type="userInfo.MemberType"></id-card>

      <!-- <ValidationObserver v-slot="ObserverProps" ref="observer">
        <v-form
          ref="form">
          <v-container>
            <p>
              <span v-if="userInfo.NecDocFlg===1">
                <div class="green--text text-h6">登録済みファイル</div>
                <v-divider class="mb-3"></v-divider>
                <ul class="pl-5">
                  <template v-if="userInfo.MemberType">
                    <li v-if="userInfo.DocFileName1">名刺</li>
                    <li v-if="userInfo.DocFileName2">社会保険被保険証</li>
                    <li v-if="userInfo.DocFileName3">運転免許証・パスポート又はマイナンバーカード</li>
                  </template>
                  <template v-else>
                    <li v-if="userInfo.DocFileName1">身分証明書</li>
                    <li v-if="userInfo.DocFileName2">現住所記載書類</li>
                    <li v-if="userInfo.DocFileName3">学生証</li>
                  </template>
                </ul>
                <v-divider class="mt-3"></v-divider>
              </span>
              <span v-else class="red--text text-h6">未登録</span>
            </p>
            <ul class="pa-4 mb-8 mt-10 cushion">
              <li class="note">
                登録できる添付ファイルはJPG、PNG、PDFで1枚につき3MBまでのファイルのみとなります。
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
            <div v-if="userInfo.MemberType===1">

              <ValidationProvider
                v-slot="{ errors }"
                name="file_01"
                rules="required|file">
                <v-row class="my-1">
                  <v-col cols="12" md="6" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 名刺</v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      v-model="File_01"
                      accept="image/*,.pdf"
                      show-size
                      outlined
                      required
                      dense
                      hide-details="auto"
                      prepend-icon=""
                      :error-messages="errors"
                      @change="setImage($event,0)"
                    >
                      <template #selection="{ text }">
                        <img
                          :src="imageURL[0]"
                          class="me-2 image-area__img"
                          alt="image">
                        {{text}}
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="file_02"
                rules="required|file">
                <v-row class="my-1">
                  <v-col cols="12" md="6" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 社会保険被保険証</v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      v-model="File_02"
                      accept="image/*,.pdf"
                      show-size
                      outlined
                      required
                      dense
                      hide-details="auto"
                      prepend-icon=""
                      :error-messages="errors"
                      @change="setImage($event,1)"
                    >
                      <template #selection="{ text }">
                        <img
                          :src="imageURL[1]"
                          class="me-2 image-area__img"
                          alt="image">
                        {{text}}
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="file_03"
                rules="required|file">
                <v-row class="my-1">
                  <v-col cols="12" md="6" class="pb-0">
                    <div class="d-flex align-start">
                      <span class="white--text red darken-1 px-2 me-1 rounded text-no-wrap">必須</span>
                      <span class="line-height-sm">
                        運転免許証・パスポート又はマイナンバーカード
                      </span>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      v-model="File_03"
                      accept="image/*,.pdf"
                      show-size
                      outlined
                      required
                      dense
                      hide-details="auto"
                      prepend-icon=""
                      :error-messages="errors"
                      @change="setImage($event,2)"
                    >
                      <template #selection="{ text }">
                        <img
                          :src="imageURL[2]"
                          class="me-2 image-area__img"
                          alt="image">
                        {{text}}
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </ValidationProvider>
            </div>
            <div v-else>

              <ValidationProvider
                v-slot="{ errors }"
                name="file_01"
                rules="required|file">
                <v-row class="my-1">
                  <v-col cols="12" md="6" class="pb-0 d-flex align-start">
                    <span class="white--text red darken-1 px-2 me-1 rounded">必須</span>
                    <span class="line-height-sm">身分証明書<br>( 運転免許証/健康保険証/パスポート )</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      v-model="File_01"
                      accept="image/*,.pdf"
                      show-size
                      outlined
                      required
                      dense
                      hide-details="auto"
                      prepend-icon=""
                      :error-messages="errors"
                      @change="setImage($event,0)"
                    >
                      <template #selection="{ text }">
                        <img
                          :src="imageURL[0]"
                          class="me-2 image-area__img"
                          alt="image">
                        {{text}}
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="file_02"
                rules="required|file">
                <v-row class="my-1">
                  <v-col cols="12" md="6" class="pb-0 d-flex align-start">
                    <span class="white--text red darken-1 px-2 me-1 rounded">必須</span>
                    <span class="line-height-sm">現住所記載書類<br>( マイナンバーカード/発行後3ヶ月以内の書類<sup>*1</sup> )</span>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      v-model="File_02"
                      accept="image/*,.pdf"
                      show-size
                      outlined
                      required
                      dense
                      hide-details="auto"
                      prepend-icon=""
                      :error-messages="errors"
                      @change="setImage($event,1)"
                    >
                      <template #selection="{ text }">
                        <img
                          :src="imageURL[1]"
                          class="me-2 image-area__img"
                          alt="image">
                        {{text}}
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="file_03"
                rules="file">
                <v-row class="my-1">
                  <v-col cols="12" md="6" class="pb-0"><span class="white--text secondary px-2 py-1 rounded">任意</span> 学生証<sup>*2</sup></v-col>
                  <v-col cols="12" md="6">
                    <v-file-input
                      v-model="File_03"
                      accept="image/*,.pdf"
                      show-size
                      outlined
                      required
                      dense
                      hide-details="auto"
                      prepend-icon=""
                      :error-messages="errors"
                      @change="setImage($event,2)"
                    >
                      <template #selection="{ text }">
                        <img
                          :src="imageURL[2]"
                          class="me-2 image-area__img"
                          alt="image">
                        {{text}}
                      </template>
                    </v-file-input>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <div class="note mt-6">
                <p>*1 住民票/公共料金郵便物/国税・地方税領収証書/納税証明書/社会保険料領収書</p>
                <p>*2 学生証を事前に提出いただくことで、学生支援割引をいたします。</p>
              </div>

            </div>
            <div class="text-center mt-6">
              <v-btn large
                :disabled="ObserverProps.invalid"
                class="my-4 mx-2 white--text"
                color="primary"
                :loading="registerLoading"
                @click="register"
              >登録</v-btn>
            </div>
          </v-container>
        </v-form>
      </ValidationObserver> -->
    </div>
    <!-- <v-dialog v-model="doneDialog" width="600" persistent>
      <v-card class="text-center pa-5">

        <template v-if="registerErr" class="err mb-5 red--text">
          <p v-if="registerErr==='120107'||registerErr==='120108'">。
          </p>
          <p v-else>
            処理が正常に行われませんでした。<br>
            しばらくして、もう一度お試しいただくか、お問い合わせ下さい。
          </p>
          <v-card-actions class="justify-center">
            <v-btn
              color="outline"
              class="mx-3 white--text"
              @click="doneDialog=false">
              戻る
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <p class="mb-4 text-left text-md-center">
            登録が完了いたしました。
          </p>
          <v-card-actions class="justify-center">
            <v-btn
              color="outline"
              class="mx-3 white--text"
              to="/myaccount">
              マイページ
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog> -->
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
      userInfo: {},
      userJson: {},
      imageSet : false,
      File_01: null,
      File_02: null,
      File_03: null,
      imageURL: [],
      registerErr: null,
      doneDialog: false,
      registerLoading: false
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.userInfo = await this.$getUserInfo()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "本人確認",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "本人確認", path: "/myaccount/" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async register(){
      this.registerLoading = true
      const formData = new FormData()
      formData.append('File_01', this.File_01 )
      formData.append('File_02', this.File_02 )
      if(this.File_03) formData.append('File_03', this.File_03 )
      formData.append('FileCnt', this.File_03 ? 3:2 )
      const res = await this.$memberAxios.post(`comm/uploadFile/`, formData, {
      header: {
          "Content-Type": "multipart/form-data",
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }

      if(res.data.Status === 'TRUE'){
        this.$set(this.userJson, 'UploadKey', res.data.FileUploadKey)
        this.$set(this.userJson, 'DocFileName1', this.File_01.name)
        this.$set(this.userJson, 'DocFileName2', this.File_02.name)
        if(this.File_03) this.$set(this.userJson, 'DocFileName3', this.File_03.name)
        await this.updateUser()
        // if(update) this.doneDialog = true
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        await this.register()
      }else{
        this.registerErr = res.data.ErrorNo
      }
      this.registerLoading = false
    },
    async updateUser(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      this.$set(this.userJson, 'NecDocFlg', 1)
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
      if(res.data.Status === 'TRUE'){
        this.doneDialog = true
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        this.updateUser()
      }else{
        this.registerErr = res.data.ErrorNo
        this.doneDialog = true
      }
    },
    setImage(file, num){
      if(file){
        this.imageSet = true
        const reader = new FileReader()
        reader.onload = (e) => {
          if(file.type!=='application/pdf'){
            this.imageURL[num] = e.target.result
          }else{
            this.imageURL[num] = 'https://rental.takenaka-co.co.jp/img/detail/pdf.png'
          }
        }
        reader.readAsDataURL(file)
      }else{
        this.imageSet = false
        this.imageURL[num] = null
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
}
.line-height-sm{
  line-height: 1.5rem;
}
.image-area{
  position: relative;
  &__img{
    height: 60px;
    width: 50px;
    object-fit: contain;
  }
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