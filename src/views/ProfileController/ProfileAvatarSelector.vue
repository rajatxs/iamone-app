<template>
   <div class="app-profile-image-selector">
      <div class="profile-avatar-cover">
         <app-loader v-if="loading" color="foreground" />

         <img
            v-show="!loading"
            class="profile-avatar-image"
            :src="user.image | USER_IMAGE"
            :alt="user.fullname"
            @click="openFileMenu"
            @error="handleImageLoadEvent"
            @load="handleImageLoadEvent"
         />
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

export default Vue.extend({
   name: "ProfileAvatarSelector",
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
               this.$store.dispatch('user/loadUser');
            } else {
               throw new Error();
            }
         } catch (error) {
            this.$toast.error("Failed to upload avatar");
         }
      },

      openFileMenu() {
         this.avatarSelector.click();
      },

      async handleAvatarSelection($event) {
         const files = $event.target.files;
         let file = null;

         file = files && files.length > 0 ? files[0] : null;

         if (!file) {
            return;
         }

         this.selectedFile = file;
      },
   },
});
</script>

<style scoped>
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
</style>
