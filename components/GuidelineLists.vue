<template>
  <section v-if="menuFlg" class="guidelineList v-list__color">
    <div class="guidelineList__sticky">
      <div class="d-flex align-center justify-center guidelineList__heading text-h6 font-weight-regular px-12 text-center letter-space-015em">
        <v-icon class="mr-2" color="accent">mdi-menu</v-icon>目次
      </div>
      <div class="guidelineList__lists v-list__color my-5">
        <v-list nav dense>
          <v-list-group
            v-for="(menuItem, key, index) in menuList" :key="key"
            v-model="menuItem.open">
            
            <template #activator>
              <v-list-item-content>
                <v-list-item-title class="text-subtitle-1">{{ index + 1 }}. {{ menuItem.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <template #appendIcon>
              <v-icon color="primary">{{ menuItem.open ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
            </template>

            <v-list-item
              v-for="section in menuItem.sections"
              :key="section.title"
              v-scroll-to="{ el: '#' + section.id,duration: 500,offset: -20 }"
              :to="section.id ? '/guide/'+key+'#'+section.id : '/guide/'+key">
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center pl-3">
                  <div class="txt-limit">{{ section.title }}</div>
                  <v-icon class="ml-1" color="primary">mdi-chevron-right</v-icon>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </div>
    </div>

  </section>

  <section v-else id="guidelineList__sp" class="guidelineList__sp guidelineList__sp__sticky">
    <v-expansion-panels v-model="openPanel" class="mt-n7 pt-1 mb-7" hover>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <template #actions>
            <v-icon  color="accent">
              {{ openPanel===0 ? 'mdi-minus' : 'mdi-plus' }}
            </v-icon>
          </template>
          <h3 class="guide__heading text-md-h5 d-flex align-center justify-center text-gray font-weight-medium"><v-icon class="mr-2" color="accent">mdi-menu</v-icon>ご利用ガイド目次</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="v-list__color">
          <div class="guidelineList__sp__lists my-5">
            <v-list nav dense>
              <v-list-group
                v-for="(menuItem, key, index) in menuList" :key="key"
                v-model="menuItem.open">
                
                <template #activator>
                  <v-list-item-content>
                    <v-list-item-title class="text-subtitle-1">{{ index + 1 }}. {{ menuItem.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <template #appendIcon>
                  <v-icon color="primary">{{ menuItem.open ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
                </template>

                <v-list-item
                  v-for="section in menuItem.sections"
                  :key="section.title"
                  :href="'/guide/'+key+'#'+section.id"
                  @click="openPanel=''">
                  <v-list-item-content>
                    <v-list-item-title class="d-flex align-center pl-3">
                      <div class="txt-limit">{{ section.title }}</div>
                      <v-icon class="ml-1" color="primary">mdi-chevron-right</v-icon>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
            </v-list>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </section>
    
</template>

<script>
// 各タイトル等jsonから取得
import items from '@/assets/json/guideline.json'
export default {
  data: () => ({
    menuList: items,
    openPanel: '',
    windowWidth: '',
    scrollPosition: 0,
    menuFlg: null,
  }),
  computed: {
    isMobile() {
      const menuBP = 1263
      if (this.windowWidth < menuBP) {
        return true
      } else {
        return false
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.ensureImagesLoaded(() => {
        this.scrollToHash();
      });
    });
    window.addEventListener('scroll', this.onScroll)
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.resizeWindow)
    if (this.windowWidth > 1263) {
      this.menuFlg = true
    } else {
      this.menuFlg = false
    }
  },
  methods: {
    // ページ内のすべての画像が読み込まれたかをチェックし、全て読み込まれた後にスクロール処理を実行する
    ensureImagesLoaded(callback) {
      const images = document.querySelectorAll('img');
      let loadedCount = 0;
      images.forEach(image => {
        if (image.complete) {
          loadedCount++;
        } else {
          image.addEventListener('load', () => {
            loadedCount++;
            if (loadedCount === images.length) {
              callback();
            }
          });
          image.addEventListener('error', () => {
            loadedCount++;
            if (loadedCount === images.length) {
              callback();
            }
          });
        }
      });
      if (loadedCount === images.length) {
        callback();
      }
    },
    scrollToHash() {
      const hash = window.location.hash;
      if (hash) {
        const refName = hash.replace('#', '');
        const element = document.getElementById(refName);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }
    },

    resizeWindow() {
      const menuBP = 1263
      this.windowWidth = window.innerWidth
      if (this.windowWidth > 1263) {
      this.menuFlg = true
      } else {
        this.menuFlg = false
      }
    },
    onScroll() {
      const headerElm = window.document.getElementById('guidelineList__sp')
      if (headerElm) {
        const scroll = window.scrollY
        if (this.scrollPosition < scroll) {
          headerElm.classList.add('is-scroll')
        } else {
          headerElm.classList.remove('is-scroll')
        }
        this.scrollPosition = scroll
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';

.v-list {
  padding: 0;
}

.txt-limit {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.1em;
}

::v-deep {
  .v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
    min-width: 20px;
  }
}

.guidelineList {
  display: flex;
  flex-direction: column;
  min-width: 270px;
  &__sticky {
    position: sticky;
    top: 13%;
  }
  &__lists {
    height: 78vh;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  &__heading {
    background-color: $cushion;
  }

  @include mq(lg) {
    display: none;
  }
}

.guidelineList__sp {
  z-index: 100;
  &__sticky {
    position: sticky;
    top: 90px;
    transition: top 0.4s;
    @include mq(md) {
      top: 82px;
    }
    @include mq(sm) {
      top: 66px;
    }
    &.is-scroll {
      top: 70px;
      transition: top 0.4s;
      @include mq(sm) {
        top: 59px;
      }
    }
  }
  &__lists {
    height: 420px;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  &__heading {
    background-color: $cushion;
  }
  .v-expansion-panel-header {
    padding: 0 3%;
    border: solid 2px $cushion;
  }
}

.guide {
  &__heading {
    @include mq(md){
      font-size: 1.3rem;
    }
    @include mq(sm){
      font-size: 1rem;
    }
  }
}

</style>
