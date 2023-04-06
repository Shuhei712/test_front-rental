<template>
  <div>
    <v-select
      v-model="time"
      :items='timeNum()'
      outlined
      dense
      hide-details="auto"
      @change="setTime"></v-select>
  </div>

</template>
<script>
export default {
  props: {
    minH: {
      type: Number,
      required: false,
      default: 0
    },
     minM: {
      type: Number,
      required: false,
      default: 0
    },
     maxH: {
      type: Number,
      required: false,
      default: 23
    },
     maxM: {
      type: Number,
      required: false,
      default: 45
    },
     minute: {
      type: Number,
      required: false,
      default: 15
    },
  },
  data() {
    return{
      time: null,
    }
  },
  methods: {
    setTime(){
      if( this.time ){
        const timeNum = this.time.replace(/:/g, '') + '00'
        this.$emit('change-time', timeNum)
      }
    },
    timeNum(){
      console.log(this.minH)
      const arr = []
      for(let i = this.minH ; i <= this.maxH ; i++) {
        let time = null
        time = String(i).padStart(2, '0')
        for(let j = 0 ; j < 60 ; j++) {
          let min = j * this.minute
          if(this.minH === i && min < this.minM){
            continue
          }else if(this.maxH === i && this.maxM < min){
            break
          }else if( min < 60 ){
            min = String(min).padStart(2, '0')
            arr.push(time + ':' + min)
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
