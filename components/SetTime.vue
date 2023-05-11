<template>
  <div>
    <v-select
      v-model="time"
      :items='timeNum()'
      outlined
      dense
      hide-details="auto"
      @change="setTime"
    ></v-select>
  </div>

</template>
<script>
export default {
  props: {
    minH: { // 最小 時間
      type: Number,
      required: false,
      default: 0
    },
    minM: { // 最小 分
      type: Number,
      required: false,
      default: 0
    },
    maxH: { // 最高 時間
      type: Number,
      required: false,
      default: 23
    },
    maxM: { // 最高 分
      type: Number,
      required: false,
      default: 45
    },
    minute: { // 間隔
      type: Number,
      required: false,
      default: 60
    },
    period:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return{
      time: null,
    }
  },
  methods: {
    setTime(){
      if( this.time ){
        let timeNum
        if(!this.period){
          timeNum = this.time.replace(/:/g, '') + '00'
        }else{
          timeNum = this.time
        }
        this.$emit('change-time', timeNum)
      }
    },
    timeNum(){
      // console.log(this.minH)
      const arr = []
      for(let i = this.minH ; i <= this.maxH ; i++) {
        let time = null
        time = String(i).padStart(2, '0')
        let finishTime = String(i+1).padStart(2, '0')
        for(let j = 0 ; j < 60 ; j++) {
          let min = j * this.minute
          if(this.minH === i && min < this.minM){
            continue
          }else if(this.maxH === i && this.maxM < min){
            break
          }else if( min < 60 ){
            min = String(min).padStart(2, '0')
            if(this.period){
              finishTime = `-${finishTime}:${min}`
            }else{
              finishTime = ''
            }
            arr.push(`${time}:${min}${finishTime}`)
          }else{
            break
          }
        }
      }
      return arr
    },
    reset(){
      this.time = ''
      this.$emit( 'change-time', '')
    }
  }
}
</script>
