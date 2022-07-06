<template>
  <div class="terms__maker d-flex flex-column text-body-1" :class="{ active: makerFlg }">
    <div class="maker__title d-flex align-center text-body-2 text-md-body-1 px-4 px-sm-6 px-lg-8 py-3">
      <span>メーカーを<span class="word-keep">選択</span></span>
      <v-btn class="text-light-gray ml-5" elevation="0" color="cushion" small @click="resetSelectedMakerLists()">
        <v-icon class="mr-2" color="line" small>mdi-selection-ellipse</v-icon>選択解除
      </v-btn>
    </div>
    <div class="maker__lists flex-grow-1 px-4 px-sm-6 px-lg-8">
      <div v-for="(list, index) in searchMakerLists" :key="index" class="maker-list pb-5">
        <div class="index-label d-flex mb-3 text-subtitle-2 text-gray px-3 py-1">
          <v-icon class="mr-2" small>mdi-check</v-icon>{{ list.MakerIndex }}
        </div>
        <div class="d-flex flex-wrap">
          <label v-for="maker in list.MakerList" :key="maker.MakerID" class="terms__label">
            <input
              v-model="selectedMakerLists"
              class="terms__checkbox"
              type="checkbox"
              :value="{ MakerID: maker.MakerID, MakerName: maker.MakerName }"
              @change="sendMakerLists()" />
            <div class="checkbox d-flex align-flex-start">
              <span class="checkbox__parts"></span>
              <span class="text-body-2 text-gray pt-1 px-3">{{ maker.MakerName }}</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    makerFlg: {
      type: Boolean,
      required: true,
    },
    searchMakerLists: {
      type: Array,
      required: true,
    },
    queryMakerLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedMakerLists: this.queryMakerLists,
    }
  },
  methods: {
    sendMakerLists() {
      this.$emit('received-maker-lists', this.selectedMakerLists)
    },
    resetSelectedMakerLists() {
      this.selectedMakerLists = []
      this.sendMakerLists()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.terms__maker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 460px;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;
  overflow: hidden;

  .maker__title {
    color: $primary;
  }
}

.index-label {
  width: 100%;
  background-color: $cushion;
}

.terms__maker.active {
  transform: translate(0, 0);
  overflow: visible;
}

.terms__label {
  display: inline-block;
  margin-bottom: 20px;
  min-width: 50%;

  .terms__checkbox {
    display: none;
  }

  .checkbox {
    cursor: pointer;
  }

  .checkbox__parts {
    display: block;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border: 1px solid $outline;
    border-radius: 5px;
    background-color: $cushion;
    position: relative;
  }

  .checkbox__parts::after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 9px;
    width: 10px;
    height: 18px;
    transform: rotate(40deg);
    border-bottom: 3px solid $line;
    border-right: 3px solid $line;
  }

  .terms__checkbox:checked + .checkbox .checkbox__parts {
    background-color: #ffffff;
  }

  .terms__checkbox:checked + .checkbox .checkbox__parts::after {
    border-bottom: 3px solid $primary;
    border-right: 3px solid $primary;
  }
}
</style>
