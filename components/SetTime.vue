<template>
  <div class="d-flex align-center">
    <v-select
      v-model="hours"
      :items='hoursArr'
      outlined
      dense
      hide-details="auto"
      @change="setTime"></v-select>
    ：
    <v-select
      v-model="mins"
      :items='minsArr'
      outlined
      dense
      hide-details="auto"
      @change="setTime"></v-select>
  </div>

</template>
<script>
export default {
  data(){
    return{
      hoursArr: this.timeNum(24),
      minsArr: this.timeNum(60,5),
      hours: null,
      mins: null
    }
  },
  methods:{
    setTime(){
      // console.log(arr)
      if( this.hours && this.mins ){
        const time = this.hours + this.mins + '00'
        this.$emit('change-time', time)
      }
    },
    timeNum(num, mult=1){
      const arr = []
      for(let i = 0 ; i < num ; i++) {
        if (i % mult === 0) {
          arr.push(String(i).padStart(2, '0'))
        }
      }
      return arr
    }
  }
}
</script>