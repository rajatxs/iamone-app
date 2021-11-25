<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
import * as handlebars from 'handlebars'
import { loadStyleSheet } from '../../utils/common'

export default defineComponent({
   data() {
      return {
         code: '' as string,
      }
   },
   computed: {
      ...mapGetters(['templateSource', 'templateData']),

      mockupComponent() {
         return defineAsyncComponent(() => import('./DefaultMobile.vue'))
      }
   },

   async mounted() {
      loadStyleSheet('https://iamone.link/_/static/page/css/master.css')
      loadStyleSheet('https://iamone.link/_/static/page/css/default.css')
      this.compile()
      this.registerWatchers()
   },
   methods: {
      compile(): void {
         const delegate = handlebars.compile(this.templateSource)
         const source = delegate(this.templateData)

         this.code = source
      },
      registerWatchers() {
         const watchers = [
            'templateData.user.fullname',
            'templateData.user.company',
            'templateData.user.bio',
            'templateData.user.image',
            'templateData.social',
            'templateData.links'
         ]

         watchers.forEach(prop => {
            this.$watch(prop, () => this.compile())
         })
      }
   }
})
</script>

<template>
   <div class="mockup-area">
      <keep-alive>
         <component :is="mockupComponent" :code="code"></component>
      </keep-alive>
   </div>
</template>

<style scoped lang="scss">
@import "../../scss/const";
@import "../../scss/mixins/scale";

.mockup-area {
   display: flex;
   width: $mockup-area-width;
   height: 100%;
   justify-content: center;
   align-items: center;
}

@media screen and (max-width: 1060px) {
   .mockup-area {
      display: none;
   }
}

</style>
