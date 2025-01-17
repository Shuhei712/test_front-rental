import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, setInteractionMode } from 'vee-validate'
import { required, email, min, max, numeric} from 'vee-validate/dist/rules'

const errMessage = {
  messages:{
    "required": "必須項目です",
    "email": "有効なフォーマットではありません",
    "min": "{length}文字以上でお願いします",
    "max": "{length}文字以内でお願いします",
    "numeric": "半角数字のみ"
  }
}
localize('ja', errMessage);
extend('required', required, {message:"必須項目です"})
extend('email', email)
extend('numeric', numeric)
extend('min', min)
extend('max', max)
extend('pass', {
  validate(value) {
    if( String(value).match( /^[A-Za-z0-9]*$/) ) return true
    return false
  },
  message: '半角英数字でお願いします'
})
extend('zipCode', {
  validate(value) {
    if( String(value).match( /^[0-9０-９]{7,8}$/) ) return true
    return false
  },
  message: '正しい形式でお願いします'
})
extend('num', {
  validate(value) {
    if( String(value).match( /^[0-9０-９]{0,14}$/) ) return true
    return false
  },
  message: '半角数字14桁以内でお願いします'
})
extend('file', (value) => {
  const name = value.name.split('.')[0]
  let err = ''
  if (value.size > 3145728) {
    err += '3MB以内でお願いします\r\n'
  }
  if (value.type!== 'image/jpeg' && value.type !== 'image/gif' && value.type !== 'image/png' && value.type !== 'application/pdf') {
    err += 'JPG・PNG・PDFいずれかのファイルでお願いします\r\n'
  }
  if (name.length > 50) {
    err += 'ファイル名は50文字以内でお願いします'
  }
  return err || true
})
extend('kana', {
  validate(value) {
    if( ( /^[ァ-ヴ\sｦ-ﾟー]+$/u ).test(String(value)) ) return true
    return false
  },
  message: 'カタカナでお願いします'
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
setInteractionMode('lazy')
