<template>
   <div class="app-profile-image-selector">
      <div class="profile-avatar-cover">
         <app-loader v-if="loading" color="foreground" />
         
         <img
            v-show="!loading"
            class="profile-avatar-image"
            :src="$USER_PROFILE_IMAGE"
            :alt="user.fullname"
            @click="showSelectorModal = true"
            @error="handleImageLoadEvent"
            @load="loading = false"
         />
      </div>

      <profile-image-selector-modal
         v-if="showSelectorModal"
         @close="showSelectorModal = false" 
      />
   </div>
</template>

<script>
import Vue from "vue";
import ProfileImageSelectorModal from "./Modals/ProfileImageSelectorModal.vue";

export default Vue.extend({
   name: "ProfileAvatarSelector",
   components: {
      'profile-image-selector-modal': ProfileImageSelectorModal
   },
   computed: {
      user() {
         return this.$store.getters["user/user"];
      },
   },
   data() {
      return {
         loading: false,
         showSelectorModal: false
      }
   },
   methods: {
      handleImageLoadEvent() {
         this.$toast.error("Failed to load profile image");
         this.loading = false;
      },
   }
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
