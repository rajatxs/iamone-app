<template>
   <div class="app-profile-image-selector">
      <div class="profile-avatar-cover">
         <app-loader v-if="loading" color="foreground" />

         <img
            v-show="!loading"
            class="profile-avatar-image"
            :src="$USER_PROFILE_IMAGE"
            :alt="user.fullname"
            @click="openFileMenu"
            @error="handleImageLoadEvent"
            @load="handleImageLoadEvent"
         />
      </div>

      <div 
         v-if="hasAvatar"
         class="avatar-remove-button cursor-pointer pos-abs rounded bg-light" 
         role="button" 
         title="Remove profile image"
         @click="removeAvatar">
         <XIcon />
      </div>

      <input
         type="file"
         ref="avatarSelector"
         class="avatar-selector-input"
         accept="image/jpeg,image/png"
         @change="handleAvatarSelection"
      />
   </div>
</template>

<script>
import Vue from "vue";
import XIcon from "../../assets/vue-icons/x.vue";

export default Vue.extend({
   name: "ProfileAvatarSelector",
   components: {
      XIcon
   },
   data() {
      return {
         loading: true,
         selectedFile: null,
      };
   },
   computed: {
      user() {
         return this.$store.getters["user/user"];
      },
      avatarSelector() {
         return this.$refs["avatarSelector"];
      },
      hasAvatar() {
         return Boolean(this.user.image);
      },
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
               this.$store.dispatch('user/loadUser');
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
         this.avatarSelector.click();
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
});
</script>

<style scoped>
.app-profile-image-selector {
   position: relative;
}
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
}
.profile-avatar-cover:hover {
   filter: brightness(0.9);
}
.profile-avatar-cover .avatar-loader {
   width: 20pt;
   height: 20pt;
}
.profile-avatar-cover .profile-avatar-image {
   width: 100%;
   height: 100%;
   border-radius: inherit;
}
.avatar-selector-input {
   display: none;
}
.avatar-remove-button {
   z-index: 80;
   top: 2pt;
   right: 2pt;
   width: 18pt;
   height: 18pt;
}
.avatar-remove-button .app-icon {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   fill: var(--accents-5);
}
</style>
