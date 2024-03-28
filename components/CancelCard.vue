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
              class="mt-4 mx-2 white--text"
              color="secondary"
              :disabled="loading"
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
          <result-card
            :result="result"
            :action="'申し込みのキャンセル'"
            :path="'stay'"
            :dialog.sync="cancelDialog"
          ></result-card>
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
      result: null
    }
  },
  computed: {
    cancelDialog: {
      get(){
        return this.$props.dialog
      },
      set(value){
        this.$emit('update:dialog', value)
        if (!value) {
          setTimeout(() => {
            this.result = null
          }, 200)
        }
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
      this.$setLog('会員申し込み', 'キャンセル', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.result = 'success'
        this.$emit('get-new-info')
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.cancelItem()
      }else{
        this.result = String( res.data.ErrorNo )
      }
      this.loading = false
    },
  }
}
</script>
