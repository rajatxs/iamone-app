<template>
   <app-modal
      title="Choose an Avatar"
      width="380px"
      height="340px"
      @close="$emit('close')"
      @blur="$emit('blur')">

      <div v-if="avatars.length" class="xstack wrap gap-large pad-small avatar-group">
         <div
            v-for="avatar in avatars"
            :key="avatar"
            class="avatar"
            @click="handleAvatarSelectionAction(avatar)">
            <img :src="avatar | TO_AVATAR_SOURCE_URL" alt="" class="avatar-image" />
         </div>
      </div>

      <div v-else class="w-100 ystack align-center gap-large justify-center pad-y-medium">
         <app-loader size="28px" />
         <small>Loading avatars...</small>
      </div>
   </app-modal>
</template>

<script>
import Vue from "vue";
import { STATIC_URL } from "../../../config";

export default Vue.extend({
   name: "SocialPlatformSelectorModal",
   filters: {
      TO_AVATAR_SOURCE_URL(avatarName) {
         return STATIC_URL + '/images/avatars/' + avatarName + '.svg';
      }
   },
   data() {
      return {
         avatars: []
      };
   },
   computed: {},
   async mounted() {
      await this.loadAvatarList();
   },

   methods: {
      async loadAvatarList() {
         let response, avatars = [];

         try {
            response = await fetch(STATIC_URL + '/avatars.json', { 
               method: 'GET',
               headers: {
                  'Accept': 'application/json'
               } 
            });
            avatars = await response.json();
            this.avatars = avatars;
         } catch (error) {
            this.$toast.error("Failed to load avatars");
         }
      },

      async handleAvatarSelectionAction(avatarName) {
         const url = STATIC_URL + '/images/avatars/' + avatarName + '.svg';
         let response, file, code;

         try {
            response = await fetch(url, {
               method: 'GET',
               headers: {
                  'Accept': 'image/svg+xml'
               }
            });
            code = await response.text();
            file = new File([code], avatarName + '.svg', { type: 'image/svg+xml' });

            this.$emit('select', file);
         } catch (error) {
            this.$toast.error("Failed to load avatar source");
         }
      },
   },
});
</script>

<style scoped>
.avatar-group .avatar {
   cursor: pointer;
   transition: filter 80ms linear, transform 120ms ease;
}
.avatar-group .avatar:hover {
   filter: brightness(0.85);
}
.avatar-group .avatar:active {
   transform: scale(0.89);
} 
.avatar-group .avatar .avatar-image {
   width: 38pt;
   height: 38pt;
}
</style>
