import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, localize, setInteractionMode } from 'vee-validate'
import { required,email } from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json';
localize('ja', ja);
extend('required', required)
extend('email', email)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
setInteractionMode('lazy')
