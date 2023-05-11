<template>
  <v-dialog v-model="addressDialog" width="580">
    <v-card>
      <v-toolbar
        height="50px"
        elevation="0"
      >
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="addressDialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list class="px-2">
        <v-list-item v-for="item in branchList" :key="item.ShopID" :title="item.ShopName">
          <v-list-item-content>
            <v-list-item-title class="primary--text mb-1">{{ item.ShopName }}</v-list-item-title>
            <v-list-item-subtitle>
              <v-card class="px-5 py-3" outlined>
                <ul>
                  <li>
                    〒{{ item.ZipCode }}
                    <v-btn small target="_blank"
                      :href=item.WebURL color="white" elevation="0">
                      <v-icon color="primary" small>mdi-map-marker</v-icon>Map
                    </v-btn>
                    <br>
                    <span class="d-inline-block">{{ item.Address1 }}</span>
                    <span class="d-inline-block">{{ item.Address2 }}</span><br>
                  </li>
                  <li>
                    <v-divider class="my-2"></v-divider>
                    <v-icon color="primary" small>mdi-phone</v-icon>
                    {{ item.Tel }}
                  </li>
                </ul>
              </v-card>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      branchList: null,
    }
  },
  async fetch() {
    await this.getBranch()
  },
  computed: {
    addressDialog: {
      get(){
        return this.dialog
      },
      set(val){
        this.$emit('update:dialog', val)
      }
    }
  },
  methods: {
    async getBranch(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      const res = await this.$memberBaseAxios.post(`comm/getShopList`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.branchList = res.data.ShopList
        this.$emit('get-branch', this.branchList)
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.getBranch()
      }
    },
  }
}
</script>

<style lang="scss" scoped>
li{
  list-style: none;
}
</style>
