import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

// TOPへ戻るボタン設置方法
// 読み込む先のページにGSAP発動トリガーとなる[.back-btn-trigger]を定義する
// 戻る位置に[#top]を定義する

const scrollBackButton = () => {
  gsap.to('.top__back', {
    scrollTrigger: {
      trigger: '.back-btn-trigger',
      markers: false,
      start: 'top top',
      end: 'bottom top',
      toggleClass: {
        targets: '.top__back',
        className: 'top__back--active',
      },
    },
  })
}

export default (context, inject) => {
  inject('scrollBackButton', scrollBackButton)
}
