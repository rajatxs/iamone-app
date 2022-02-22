<template>
   <app-card title="Socials" gap="large">
      <template #body>
         <div :class="socialLinkListClasses">
            <div
               v-for="ref in socials"
               :key="ref._id"
               :class="socialLinkClasses"
               :title="ref.label"
               @click.prevent="editSocialRef($event, ref._id)">

               <img
                  class="social-service-icon-image"
                  :src="ref.platformKey | SOCIAL_ICON"
                  alt=""
               />
            </div>

            <div :class="addActionButtonClasses" @click="openEditorModal">
               <app-loader v-if="loading" />
               <plus-icon v-else />
            </div>
         </div>

         <edit-social-link-modal 
            v-if="viewEditorModal" 
            @done="handleCompletion"
            @close="closeEditorModal"
            :link-id="linkId" />
      </template>
   </app-card>
</template>

<script>
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import PlusIcon from "../../assets/vue-icons/plus.vue";
import EditSocialLinkModal from "./Modals/EditSocialLinkModal.vue";

const { mapGetters: mapSocialGetters } = createNamespacedHelpers("socials");

export default Vue.extend({
   name: "SocialLinkCard",

   components: {
      'plus-icon': PlusIcon,
      'edit-social-link-modal': EditSocialLinkModal,
   },

   data() {
      return {
         linkId: "",
         viewEditorModal: false,
         loading: false
      };
   },
   computed: {
      ...mapSocialGetters(["socials", "loaded"]),

      socialLinkListClasses() {
         return [
            'social-link-list',
            'xstack',
            'gap-medium',
            'justify-start',
            'wrap'
         ];
      },
      socialLinkClasses() {
         return [
            'social-link',
            'pos-rel',
            'xstack',
            'justify-center',
            'align-center',
            'rounded',
            'cursor-pointer'
         ];
      },
      addActionButtonClasses() {
         return [
            'add-action-button',
            ...this.socialLinkClasses
         ];
      }
   },
   async mounted() {
      await this.loadSocialPlatforms();
   },
   methods: {
      toSocialIcon(key) {
         return `/icons/${key}.svg`;
      },

      editSocialRef($event, id) {
         this.linkId = id;
         this.openEditorModal();
      },
      openEditorModal() {
         this.viewEditorModal = true;
      },
      async handleCompletion() {
         this.viewEditorModal = false;
         this.linkId = "";
         this.loading = true;
         await this.$store.dispatch('socials/loadAll');
         this.loading = false;
      },
      closeEditorModal() {
         this.viewEditorModal = false;
         this.linkId = "";
      },

      async loadSocialPlatforms() {
         this.loading = true;
         try {
            await this.$store.dispatch("socialPlatforms/loadAll");
         } catch (error) {
            this.$toast.error("Failed to get social platforms");
         }
         this.loading = false;
      }
   },
});
</script>

<style scoped>
.social-link-list .social-link {
   width: 38pt;
   height: 38pt;
   box-sizing: border-box;
   border: 1px solid var(--accents-2);
   transform: translateY(0);
   transition: transform 160ms ease, background-color 80ms linear;
}
.social-link-list .social-link:hover:not(.add-action-button) {
   transform: translateY(-2px);
   box-shadow: var(--shadow-small);
}
.social-link-list .social-link .social-service-icon-image {
   width: 26pt;
   height: 26pt;
}
.social-link-list .social-link.add-action-button {
   border-width: 2px;
   border-style: dashed;
   border-color: var(--accents-2);
}
.social-link-list .social-link.add-action-button:hover {
   background-color: var(--accents-2);
}
.social-link-list .social-link.add-action-button .app-icon {
   width: 26px;
   height: 26px;
   color: var(--accents-5);
}

body.dark .social-link {
   background-color: var(--accents-1);
   border-color: var(--accents-2);
}
</style>
