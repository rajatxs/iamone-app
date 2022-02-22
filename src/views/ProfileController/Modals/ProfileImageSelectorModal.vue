<template>
   <app-modal
      title="Change profile image"
      width="380px"
      height="280px"
      gap="large"
      @close="$emit('close')"
      @blur="$emit('blur')">

      <div class="profile-image-selector justify-space-between">
         <div class="current-profile-image-selector margin-x-auto">
            <div class="current-profile-image" @click="openFileMenu">
               <app-loader v-if="loading" class="black image-loader" />

               <img
                  v-else
                  class="profile-image"
                  :src="$USER_PROFILE_IMAGE"
                  :alt="user.username"
               />

               <input
                  hidden
                  type="file"
                  ref="profileImageSelectorInput"
                  class="profile-image-selector-input"
                  accept="image/jpeg,image/png,image/svg+xml"
                  @change="handleProfileImageSelection"
               />
            </div>

            <div 
               v-if="hasAvatar"
               class="profile-image-remove-button cursor-pointer pos-abs rounded bg-light" 
               role="button" 
               title="Remove profile image"
               @click="removeAvatar">
               <XIcon />
            </div>
         </div>
      </div>

      <template #footer>
         <div class="ystack w-100">
            <app-button color="default" expanded @click="showAvatarSelectorModal = true">Choose Avatar</app-button>
            <app-button color="primary" expanded @click="$emit('done')">Done</app-button>
         </div>
      </template>

      <AvatarSelectorModal 
         v-if="showAvatarSelectorModal"
         @close="showAvatarSelectorModal = false"
         @select="handleAvatarSelection" />
   </app-modal>
</template>

<script>
import AvatarSelectorModal from "./AvatarSelectorModal.vue";
import XIcon from "../../../assets/vue-icons/x.vue";

export default {
   components: {
      XIcon,
      AvatarSelectorModal
   },

   data() {
      return {
         loading: false,
         selectedFile: null,
         showAvatarSelectorModal: false,
         collections: [
            [
               "facebook",
               "twitter",
               "youtube",
               "github"
            ]
         ]
      };
   },

   watch: {
      async selectedFile(newFile) {
         if (!newFile) {
            return;
         }

         this.loading = true;
         await this.uploadAvatar(newFile);
         this.loading = false;
      },
   },

   computed: {
      user() {
         return this.$store.getters["user/user"];
      },
      profileImageSelectorInput() {
         return this.$refs["profileImageSelectorInput"];
      },
      hasAvatar() {
         return Boolean(this.user.imageHash);
      },
   },

   methods: {
      handleImageLoadEvent() {
         this.loading = false;
      },

      async handleAvatarSelection(file) {
         try {
            await this.axios.delete('/user/image');
            this.selectedFile = file;
         } catch (error) {
            this.$toast.error("Failed to apply Avatar");
         }
      },

      async uploadAvatar(file) {
         const formData = new FormData()
         let response = null

         formData.append('file', file)

         if (this.showAvatarSelectorModal) {
            this.selectedFile = file;
            this.showAvatarSelectorModal = false;
         }

         try {
            response = await this.axios.put('/user/image', formData, {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            })

            if (response.status === 200 || response.status === 201) {
               this.$toast.success({
                  text: "Profile image has been uploaded",
                  duration: 1200
               });

               this.$store.commit('user/SET_IMAGE', response.data.result.imageHash);
            } else {
               throw new Error();
            }
         } catch (error) {
            this.$toast.error("Failed to upload avatar");
         }
      },

      async _removeAvatar() {
         let response;

         try {
            response = await this.axios.delete('/user/image');

            if (response.status === 200) {
               return response.data;
            }
         } catch (error) {
            throw new Error(response.data.message);
         }
      },

      async removeAvatar() {
         let result = await this._removeAvatar();

         if (result instanceof Error) {
            this.$toast.error("Failed to remove avatar");
            return;
         }
         
         this.$toast.success(result.message);
         this.$store.commit('user/SET_IMAGE', "");
      },

      openFileMenu() {
         if (this.loading) {
            return;
         }

         this.profileImageSelectorInput.click();
      },

      validateFile(file) {
         if (!file) {
            return false;
         }

         if (file.size > 2097152) {
            this.$toast.error('File size exceeds size limit');
            return false;
         }

         return true;
      },

      async handleProfileImageSelection($event) {
         const files = $event.target.files;
         let file = null;

         file = files && files.length > 0 ? files[0] : null;

         if (!this.validateFile(file)) {
            return;
         }

         this.selectedFile = file;
      },
   },
}
</script>

<style scoped>
.current-profile-image {
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
}
.current-profile-image:hover {
   filter: brightness(0.9);
}
.current-profile-image .image-loader {
   width: 20pt;
   height: 20pt;
}
.current-profile-image .profile-image {
   width: 100%;
   height: 100%;
   border-radius: inherit;
}
.profile-image-remove-button {
   z-index: 80;
   top: 2pt;
   right: 2pt;
   width: 18pt;
   height: 18pt;
   transition: background-color 80ms linear;
}
.profile-image-remove-button .app-icon {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   fill: var(--accents-5);
}
.profile-image-remove-button:hover {
   background-color: var(--error);
}
.profile-image-remove-button:hover .app-icon {
   fill: var(--error-fr);
}

.current-profile-image-selector {
   position: relative;
   width: max-content;
   margin-top: 18pt;
}
</style>
