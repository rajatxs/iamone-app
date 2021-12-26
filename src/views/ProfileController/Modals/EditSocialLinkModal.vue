<template>
   <app-modal
      title="Add new social link"
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
               hint="Label"
               :autofocus="true" 
               expanded />
         </app-input-field>

         <app-input-field>
            <app-input 
               v-model="slug" 
               format="text" 
               :hint="hint" 
               autocomplete="username"
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
            Done
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
      socialPlatform() {
         return this.currentSocialPlatform || { name: "im1", key: "im1" };
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
      payload() {
         return {
            label: this.label,
            slug: this.slug,
            socialServiceKey: this.socialPlatform.key,
         };
      },
   },
   watch: {
      currentSocialPlatform(newPlatform) {
         this.hint = newPlatform.hint;
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
         ).find((service) => service.key === this.social.socialServiceKey);
      }
   },
   methods: {

      /** add new social item */
      async addNewSocialItem() {
         try {
            await this.axios.post('/social-ref', this.payload);
            this.$emit("done");
            this.$toast.success("Link has been added");
         } catch (error) {
            this.$toast.error("Failed to add new link");
         }
      },

      /** update selected social item */
      async updateSocialItem() {
         try {
            await this.axios.put('/social-ref/' + this.linkId, this.payload);
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
            await this.axios.delete('/social-ref/' + this.linkId);
            this.$toast.success("Link has been removed");
            this.$emit('done');
         } catch (error) {
            this.$toast.error("Failed to delete social link");
         }
         this.status.deletion = false;
      },

      async dispatchAction() {
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
