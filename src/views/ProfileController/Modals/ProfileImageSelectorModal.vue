<template>
   <app-modal
      title="Select profile image"
      width="610px"
      height="450px"
      gap="large"
      @close="$emit('close')"
      @blur="$emit('blur')">

      <div class="profile-image-selector xstack justify-space-between">
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
                  type="file"
                  ref="profileImageSelectorInput"
                  class="profile-image-selector-input"
                  accept="image/jpeg,image/png"
                  hidden
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

         <div class="profile-image-gallery">
            <div class="searchbar">
               <app-input hint="Seach" expanded />
            </div>

            <div v-if="false" class="ystack align-center pad-y-large">
               <br />
               <app-loader size="24px" />
               <br />
               <small>Loading avatars</small>
            </div>

            <div class="profile-image-collections pad-y-medium">
               <div v-for="(collection, collectionIndex) in collections" :key="collectionIndex" class="profile-image-collection xstack gap-medium">
                  <div v-for="avatar in collection" :key="avatar" class="profile-image-avatar">
                     <img class="profile-image-avatar-image" :src="'/icons/' + avatar + '.svg'" alt="Avatar" width="34" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </app-modal>
</template>

<script>
import XIcon from "../../../assets/vue-icons/x.vue";

export default {
   components: {
      XIcon,
   },

   watch: {
      selectedFile(newFile) {
         if (!newFile) {
            return;
         }

         this.loading = true;
         setTimeout(async () => {
            await this.uploadAvatar(newFile);
            this.loading = false;
         }, 1200);
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
         return !Boolean(this.user.image);
      },
   },

   data() {
      return {
         loading: false,
         selectedFile: null,
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

   methods: {
      handleImageLoadEvent() {
         this.loading = false;
      },
      async uploadAvatar(file) {
         const formData = new FormData()
         let response = null

         formData.append('file', file)

         try {
            response = await this.axios.post('/user/image', formData, {
               headers: {
                  'Content-Type': 'multipart/form-data'
               }
            })

            if (response.status === 200 || response.status === 201) {
               this.$toast.success("Profile image has been uploaded");
               this.$store.commit('user/SET_IMAGE', response.data.result.imageId);
            } else {
               throw new Error();
            }
         } catch (error) {
            this.$toast.error("Failed to upload avatar");
         }
      },

      async removeAvatar() {
         let response;

         try {
            response = await this.axios.delete('/user/image');

            if (response.status === 200) {
               this.$toast.success("Profile image has been removed");
               this.$store.commit('user/SET_IMAGE', "");
            }
         } catch (error) {
            this.$toast.error("Failed to remove avatar");
         }
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

      async handleAvatarSelection($event) {
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
   /* background-color: aqua; */
}
.profile-image-gallery {
   width: 410px;
   /* background-color: violet; */
}
.profile-image-avatar {
   width: 34pt;
   height: 34pt;
}
.profile-image-avatar .profile-image-avatar-image {
   width: 100%;
   height: 100%;
}
</style>
