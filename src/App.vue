<template>
  <template v-if="isDataLoaded">
    <AppControlbar />
    <AppMockup name="default-mobile" />
  </template>

  <div v-else class="universal-data-loading">
    <app-loader class="black universal-loader" />
    <h3 class="universal-data-loading-message">Just a moment</h3>
  </div>

  <UniversalArea />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { api } from './utils/axios'
import { mapState, createNamespacedHelpers } from 'vuex'
import AppControlbar from './partials/Controlbar/Controlbar.vue'
import AppMockup from './partials/Mockups/Mockup.vue'
import UniversalArea from './partials/UniversalArea.vue'
import commonMixin from './mixins/common'

const { 
  mapGetters: mapAuthGetters, 
  mapActions: mapAuthActions 
} = createNamespacedHelpers('auth')

export default defineComponent({
  name: 'App',
  mixins: [commonMixin],
  components: {
    AppControlbar,
    AppMockup,
    UniversalArea
  },
  data() {
    return {
      isDataLoaded: false
    }
  },
  computed: {
    ...mapState(['showQRCodeModal']),
    ...mapAuthGetters(['authStatus'])
  },
  created() {
    this.signInFromSavedTokens()
  },
  watch: {
    async authStatus(newStatus: boolean) {
      if (newStatus) {
        try {

          api.interceptors.request.use((config) => {
            // @ts-ignore
            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
            
            return config
          })

          // @ts-ignore
          await this.loadAllData()
          this.isDataLoaded = true
        } catch (error) {
          console.error("Something went wrong", error)
        }
      }
    }
  },
  methods: mapAuthActions(['signInFromSavedTokens'])
})
</script>

<style lang="scss">
#app {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--background);

  .universal-data-loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);

    .universal-loader {
      width: 37pt;
      height: 37pt;
    }

    .universal-data-loading-message {
      margin-top: 28pt;
      line-height: 2.6rem;
    }
  }
}
</style>
