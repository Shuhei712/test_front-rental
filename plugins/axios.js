import Vue from 'vue'
import axios from 'axios'
const memberAxios = axios.create({
  baseURL: 'https://member-api-test.takenaka-co.co.jp/member/'
})
export default (context, inject) => {
  inject('memberAxios', memberAxios)
}

// export default  ({ app }, inject) =>{
//   app.$memberAxios = axios.create({
//       baseURL: 'https://member-api-test.takenaka-co.co.jp/member/'
//     })
// }
// export default function ({ $axios }) {
//   $axios.onRequest((config) => {
//     // console.log(config)
//   })

//   $axios.onResponse((config) => {
//     // console.log(config)
//   })

//   $axios.onError((config) => {
//     console.log(config)
//   })

//   Vue.prototype.$memberAxios = axios.create({
//     baseURL: 'https://member-api-test.takenaka-co.co.jp/member/'
//     // baseURL: this.$config.MEMBER_API_URL

//   })

// }