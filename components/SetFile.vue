<template>
  <div>
    <template v-if="!read">
      <ValidationProvider
        v-slot="{ errors }"
        :name="fileName"
        :rules=rule>
        <v-file-input
          v-model="file"
          accept="image/*,.pdf"
          show-size
          outlined
          dense
          hide-details="auto"
          prepend-icon=""
          :error-messages="errors"
          @change="setImage($event)"
        >
          <template #selection="{ text }">
            <img v-if="imageURL"
              :src="imageURL"
              class="me-2 image-area__img"
              alt="image">
            {{text}}
          </template>
        </v-file-input>
      </ValidationProvider>
    </template>
    <template v-else>

      <v-text-field
        :value="fileObj.name"
        readonly
        outlined
        dense
        hide-details="auto"
      ></v-text-field>
    </template>
  </div>
</template>

<script>

export default {
  props: {
    rule:{
      type: String,
      required: true,
    },
    fileName:{
      type: String,
      required: true,
    },
    fileObj:{
      type: null,
      required: false,
      default: null
    },
    read: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data(){
    return{
      // file2: [],
      imageURL: null
    }
  },
  computed:{
    file: {
      get(){
        return this.fileObj
      },
      set(val){
        this.$emit('update:file-obj', val)
      }
    }
  },
  methods:{
    setImage(file){
      if(file){
        const reader = new FileReader()
        reader.onload = (e) => {
          if(file.type!=='application/pdf'){
            this.imageURL = e.target.result
          }else{
            this.imageURL = 'https://rental.takenaka-co.co.jp/img/detail/pdf.png'
          }
        }
        reader.readAsDataURL(file)
      }else{
        this.imageURL = null
      }
      // this.$emit('set-file', file)
    },
  }
}
</script>

<style lang="scss" scoped>
.image-area{
  position: relative;
  &__img{
    height: 60px;
    width: 50px;
    object-fit: contain;
  }
}
</style>