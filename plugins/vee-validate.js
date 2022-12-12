import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, setInteractionMode } from 'vee-validate'
import { required, email, min, max} from 'vee-validate/dist/rules'

const errMessage = {
  messages:{
    "required": "必須項目です",
    "email": "有効なメールアドレスではありません",
    "min": "{length}文字以上にしてください",
    "max": "{length}文字以内にしてください",
  }
}
localize('ja', errMessage);
extend('required', required, {message:"必須です"})
extend('email', email)
extend('min', min)
extend('max', max)
extend('pass', {
  validate(value) {
    if( value.match(/^[A-Za-z0-9]*$/) ) return true
    return false
  },
  message: '半角英数字でお願いいたします'
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
setInteractionMode('lazy')
