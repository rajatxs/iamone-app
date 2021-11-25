<template>
   <div class="app-profile-image-selector">
      <div class="profile-avatar-cover">
         <app-loader v-if="loading" class="black avatar-loader" />

         <img
            v-else
            class="profile-avatar-image"
            :src="toUrl('/_/api/user/image/', user.image)"
            alt=""
            @click="openFileMenu" />

      </div>

      <input 
         type="file"
         ref="avatarSelector"
         class="avatar-selector-input"
         accept="image/jpeg,image/png"
         @change="handleAvatarSelection" />
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import { toUrl } from '../utils/common'

const { mapActions: mapUserActions, mapGetters: mapUserGetters } = createNamespacedHelpers('user')

export default defineComponent({
   name: 'ProfileAvatarSelector',
   data() {
      return {
         loading: false,
         selectedFile: null as (File | null)
      }
   },
   computed: {
      ...mapUserGetters(['user']),
      avatarSelector() {
         return this.$refs['avatarSelector'] as HTMLInputElement
      }
   },
   watch: {
      selectedFile(newFile: File) {
         if (!newFile) {
            return
         }

         this.loading = true
         setTimeout(async () => {
            await this.uploadAvatar(newFile)
            this.loading = false
         }, 1200)
      }
   },
   methods: {
      ...mapUserActions(['uploadAvatar']),
      toUrl,
      openFileMenu() {
         this.avatarSelector.click()
      },
      async handleAvatarSelection($event: Event) {
         const files = ($event.target as HTMLInputElement).files
         let file: File | null

         file = (files && files.length > 0)? files[0]: null

         if (!file) {
            return
         }

         this.selectedFile = file
      }
   }
})
</script>

<style scoped lang="scss">
.profile-avatar-cover {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 76pt;
   height: 76pt;
   border-radius: 50%;
   background-color: var(--accents-1);
   border: 1px solid var(--accents-2);
   cursor: pointer;
   transition: filter 160ms ease;
   
   &:hover {
      filter: brightness(0.8);
   }

   .avatar-loader {
      width: 20pt;
      height: 20pt;
   }

   .profile-avatar-image {
      width: 100%;
      height: 100%;
      border-radius: inherit;
   }
}
.avatar-selector-input {
   display: none;
}
</style>
