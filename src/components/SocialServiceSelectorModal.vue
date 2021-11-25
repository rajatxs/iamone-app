<template>
   <app-modal 
      v-if="show"
      title="Choose an service"
      width="380px"
      height="340px"
      @close="$emit('close')"
      @blur="$emit('blur')">

      <div class="searchbar">
         <app-input v-model="search" hint="Seach" expanded />
      </div>

      <div class="icon-selection-menu">
         <div 
            v-for="service in filteredSocialIcons" 
            :key="service.key" 
            class="icon-option"
            @click="selectSocialService(service)">
            <img :src="toSocialIcon(service.key)" class="icon" />
            <span class="label">{{ service.name }}</span>
         </div>
      </div>
   </app-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import { SocialService } from '../types'

const { mapGetters: mapSocialServiceGetters } = createNamespacedHelpers('socialService')

export default defineComponent({
   name: 'SocialServiceSelectorModal',
   computed: {
      ...mapSocialServiceGetters(['socialServices', 'loaded']),

      filteredSocialIcons() {
         if (this.search.length === 0) {
            // @ts-ignore
            return this.socialServices.sort((a, b) => {
               if (a.name < b.name) {
                  return -1
               } 
   
               if (a.name > b.name) {
                  return 1
               } else {
                  return 0
               }
            })
         } else {
            // @ts-ignore
            return this.socialServices.filter(item => {
               let name = item.name.toUpperCase()
               
               // @ts-ignore
               let search = this.search.toUpperCase()

               return name.includes(search)
            })
         }
      },
   },
   data() {
      return {
         show: true,
         search: ''
      }
   },
   methods: {
      selectSocialService(service: SocialService) {
         this.$emit('select', service)
      },
      toSocialIcon(key: string) {
         return `/icons/${key}.svg`
      }
   }
})
</script>

<style lang="scss" scoped>
.searchbar {
   position: sticky;
   top: 0;
   padding-right: var(--gap-half);
   padding-left: var(--gap-half);
   z-index: 200;
   background-color: var(--background);
}
.icon-selection-menu {
   display: flex;
   flex-direction: column;
   margin: var(--gap-quarter) var(--gap-half);
   overflow: auto;

   .icon-option {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding-left: var(--gap-half);
      padding-right: var(--gap-half);
      cursor: pointer;
      border-radius: var(--radius);
      height: 45px;
      transition: transform 80ms ease, background-color 110ms linear;
      transform: scale(1);

      &:hover {
         background-color: var(--accents-1);
      }
      &:active {
         background-color: var(--accents-2);
         transform: scale(0.98);
      }

      .icon {
         width: 30px;
         height: 30px;
      }
      .label {
         margin-left: var(--gap-half);
         font-weight: 400;
         user-select: none;
      }
   }
}
</style>
