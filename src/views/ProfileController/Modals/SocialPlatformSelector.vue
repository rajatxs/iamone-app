<template>
   <app-modal
      v-if="show"
      title="Choose an service"
      width="380px"
      height="340px"
      @close="$emit('close')"
      @blur="$emit('blur')"
   >
      <div class="searchbar">
         <app-input v-model="search" hint="Seach" expanded />
      </div>

      <div class="icon-selection-menu">
         <div
            v-for="platform in filteredSocialIcons"
            :key="platform.key"
            class="icon-option"
            @click="selectSocialPlatform(platform)"
         >
            <img :src="toSocialIcon(platform.key)" class="icon" />
            <span class="label">{{ platform.name }}</span>
         </div>
      </div>
   </app-modal>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "SocialPlatformSelectorModal",
   computed: {
      socialPlatforms() {
         return this.$store.getters['socialPlatforms/socialPlatforms'];
      },

      filteredSocialIcons() {
         if (this.search.length === 0) {
            // @ts-ignore
            return this.socialPlatforms.sort((a, b) => {
               if (a.name < b.name) {
                  return -1;
               }

               if (a.name > b.name) {
                  return 1;
               } else {
                  return 0;
               }
            });
         } else {
            // @ts-ignore
            return this.socialPlatforms.filter((item) => {
               let name = item.name.toUpperCase();

               // @ts-ignore
               let search = this.search.toUpperCase();

               return name.includes(search);
            });
         }
      },
   },
   data() {
      return {
         show: true,
         search: "",
      };
   },
   methods: {
      selectSocialPlatform(service) {
         this.$emit("select", service);
      },
      toSocialIcon(key) {
         return `/icons/${key}.svg`;
      },
   },
});
</script>

<style scoped>
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
}
.icon-selection-menu .icon-option {
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
}
.icon-selection-menu .icon-option:hover {
   background-color: var(--accents-1);
}
.icon-selection-menu .icon-option:active {
   background-color: var(--accents-2);
   transform: scale(0.98);
}
.icon-selection-menu .icon-option .icon {
   width: 30px;
   height: 30px;
}
.icon-selection-menu .icon-option .label {
   margin-left: var(--gap-half);
   font-weight: 400;
   user-select: none;
}
</style>
