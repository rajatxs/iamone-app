<template>
   <app-modal
      :title="modalTitle"
      width="395px"
      height="350px"
      @close="$emit('close')"
      @blur="$emit('blur')">

      <!-- Platform icons -->
      <div class="platform-icon">
         <div class="platform-icon-boundary" @click="showSelectorModal">
            <img class="platform-icon-image" :src="socialPlatform.key | SOCIAL_ICON" />
         </div>
         <h6 class="service-label">{{ socialPlatform.name }}</h6>
      </div>

      <!-- Link input -->
      <form ref="socialEditorForm" class="link-editor-inputs" @submit.prevent="dispatchAction">
         <app-input-field>
            <app-input 
               v-model="label" 
               format="text" 
               hint="Label (optional)"
               :autofocus="true" 
               expanded />
         </app-input-field>

         <app-input-field>
            <app-input 
               v-model="slug" 
               format="text" 
               :hint="hint" 
               :autocomplete="slugType"
               :autocapitalize="false"
               required 
               expanded />
         </app-input-field>
      </form>

      <template #footer>
         <app-button
            v-if="actionType === 'UPDATE'"
            color="error"
            :loading="status.deletion"
            @click="deleteSocialItem">
            Delete
         </app-button>

         <app-button
            color="primary"
            @click="submitForm('socialEditorForm')"
            :loading="status.additionOrUpdation">
            {{ actionLabel }}
         </app-button>
      </template>

      <social-platform-selector
         v-if="viewSelectorModal"
         @select="handleSocialPlatformSelection"
         @blur="closeSelectorModal"
         @close="closeSelectorModal"
      />
   </app-modal>
</template>

<script>
import Vue from "vue";
import * as regex from "../../../utils/regex";
import SocialPlatformSelector from "./SocialPlatformSelector.vue";

export default Vue.extend({
   name: "SocialLinkEditorModal",

   components: {
      'social-platform-selector': SocialPlatformSelector,
   },

   props: {
      linkId: {
         type: String,
         required: true,
      },
   },

   data() {
      return {
         status: {
            additionOrUpdation: false,
            deletion: false
         },
         currentSocialPlatform: null,
         label: "",
         slug: "",
         slugPattern: null,
         hint: "Username or unique id",
         viewSelectorModal: false,
      };
   },

   computed: {
      socialPlatforms() {
         return this.$store.getters['socialPlatforms/socialPlatforms'];
      },
      socials() {
         return this.$store.getters['socials/socials'];
      },
      actionType() {
         return this.linkId ? "UPDATE" : "ADD";
      },
      actionLabel() {
         return (this.actionType === 'ADD')? "Add": "Update";
      },
      socialPlatform() {
         return this.currentSocialPlatform || { name: "Select platform", key: "iamone" };
      },
      slugType() {
         return (this.currentSocialPlatform)? this.currentSocialPlatform.type: 'text';
      },
      social() {
         let ref = null;

         if (this.actionType === "UPDATE") {
            ref = (this.socials).find(
               (ref) => ref._id === this.linkId
            );
         }

         return ref;
      },
      modalTitle() {
         return (this.actionType === 'ADD')? "Add new social link": 'Update social link';
      },
      payload() {
         return {
            label: this.label,
            slug: this.slug,
            platformKey: this.socialPlatform.key,
         };
      },
   },

   watch: {
      currentSocialPlatform(newPlatform) {
         this.hint = newPlatform.hint;
         this.updateSlugPattern(newPlatform.type);
      },
   },

   created() {
      if (this.actionType === "UPDATE") {
         this.label = this.social.label;
         this.slug = this.social.slug;
      }
   },

   beforeMount() {
      if (this.actionType === "UPDATE") {
         this.currentSocialPlatform = (
            this.socialPlatforms
         ).find((service) => service.key === this.social.platformKey);
      }
   },

   methods: {

      /** update slug regex for validation */
      updateSlugPattern(type) {
         switch(type) {
            case 'username':
               this.slugPattern = regex.USERNAME; 
               break;

            case 'url':
               this.slugPattern = regex.ABSOLUTE_URL;
               break;

            case 'phone':
               this.slugPattern = regex.PHONE;
               break;

            case 'email':
               this.slugPattern = regex.EMAIL;
               break;
         }
      },

      /** add new social item */
      async addNewSocialItem() {
         try {
            await this.axios.post('/social-links', this.payload);
            this.$emit("done");
            this.$toast.success("Link has been added");
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
      },

      /** update selected social item */
      async updateSocialItem() {
         try {
            await this.axios.put('/social-links/' + this.linkId, this.payload);
            this.$toast.success("Link has been updated");
            this.$emit("done");
         } catch (error) {
            this.$toast.error("Failed to update link");
         }
      },

      /** delete selected social item */
      async deleteSocialItem() {
         this.status.deletion = true;
         try {
            await this.axios.delete('/social-links/' + this.linkId);
            this.$toast.success("Link has been removed");
            this.$emit('done');
         } catch (error) {
            this.$toast.error("Failed to delete social link");
         }
         this.status.deletion = false;
      },

      /** validate inputs */
      validateInputs() {
         if (this.slugPattern && !this.slug.match(this.slugPattern)) {
            this.$toast.error(`Invalid ${this.currentSocialPlatform.type}`);
            return false;
         }

         return true;
      },

      async dispatchAction() {
         if (!this.validateInputs()) {
            return;
         }

         this.status.additionOrUpdation = true;

         switch (this.actionType) {
            case "ADD":
               await this.addNewSocialItem();
               break;

            case "UPDATE":
               await this.updateSocialItem();
               break;
         }
         this.status.additionOrUpdation = false;
      },

      handleSocialPlatformSelection(service) {
         this.currentSocialPlatform = service;
         this.closeSelectorModal();
      },
      showSelectorModal() {
         this.viewSelectorModal = true;
      },
      closeSelectorModal() {
         this.viewSelectorModal = false;
      },
   },
});
</script>

<style scoped>
.app-button {
   flex: 1;
}
.platform-icon {
   margin-top: var(--gap-half);
   text-align: center;
}
.platform-icon .platform-icon-boundary {
   display: block;
   margin-left: auto;
   margin-right: auto;
   width: 44pt;
   height: 44pt;
   padding: 10px;
   border-radius: 50%;
   border: 1px solid var(--accents-2);
   background-color: var(--accents-1);
   cursor: pointer;
}
.platform-icon .platform-icon-image {
   width: 100%;
   height: 100%;
   transform: filter 120ms ease;
}
.platform-icon .platform-icon-image:hover {
   filter: brightness(0.95);
}
.platform-icon .service-label {
   margin-top: var(--gap-quarter);
}
.link-editor-inputs {
   margin-top: var(--gap);
}
.link-editor-inputs .app-edit-input-field {
   margin-top: var(--gap);
   margin-bottom: var(--gap);
}
</style>
