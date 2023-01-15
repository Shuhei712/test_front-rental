<template>
  <div class="popup text-center">
    <v-dialog v-model="cancelDialog"
      persistent
      width="580">
      <v-card class="pa-5 text-center">
        <template v-if="!result">
          <p>以下の申し込みをキャンセルいたしますか？</p>
          注文番号：{{ id }}
          <v-card-actions class="justify-center">
            <v-btn
              class="mt-4 mx-2"
              dark
              color="secondary"
              @click="cancelDialog = false">戻る
            </v-btn>
            <v-btn
              class="mt-4 mx-2"
              dark
              color="feature"
              :loading="loading"
              @click="cancelItem">申し込みをキャンセル
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <p v-if="result==='success'" class="text-left text-md-center">
            申し込みをキャンセルいたしました。
          </p>
          <p v-else class="text-left text-md-center">
            処理が正常に行われませんでした。<br>
            しばらくしてもう一度お試しいただくか、お問い合わせ下さい。
          </p>
          <v-card-actions class="justify-center">
            <v-btn
              class="mt-4 mx-2"
              dark
              color="secondary"
              @click="cancelDialog = false">戻る
            </v-btn>
          </v-card-actions>
        </template>
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
    id: {
      type: Number,
      required: false,
      default: null
    }

  },
  data() {
    return{
      loading: false,
      result: false
    }
  },
  computed: {
    cancelDialog: {
      get(){
        return this.$props.dialog
      },
      set(value){
        this.$emit('change-cancel-dialog', value)
      }
    }
  },
  methods: {
    async cancelItem(){
      this.loading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      const res = await this.$memberBaseAxios.put(`order/cancelOrder/${this.id}`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.loading = false
        this.result = 'success'
        this.$emit('get-new-info')
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        this.cancelItem()
      }else{
        this.loading = false
        this.result = res.data.ErrorNo
      }

    },
  }
}
</script>