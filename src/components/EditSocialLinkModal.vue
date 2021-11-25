<template>
   <app-modal
      title="Add new social link"
      width="395px"
      height="350px"
      @close="$emit('close')"
      @blur="$emit('blur')"
   >
      <div class="service-icon">
         <div class="service-icon-boundary" @click="showSelectorModal">
            <img
               class="service-icon-image"
               :src="socialIconPath(socialService.key)"
            />
         </div>
         <h6 class="service-label">{{ socialService.name }}</h6>
      </div>

      <div class="link-editor-inputs">
         <app-input-field>
            <app-input v-model="label" format="text" hint="Label" expanded />
         </app-input-field>

         <app-input-field>
            <app-input v-model="slug" format="text" :hint="hint" expanded />
         </app-input-field>
      </div>

      <template #footer>
         <app-button
            v-if="actionType === 'UPDATE'"
            background="red"
            @click="handleDeleteAction"
         >
            Delete
         </app-button>

         <app-button
            background="blue"
            @click="dispatchAction"
            :loading="loading"
            >Done</app-button
         >
      </template>

      <SocialServiceSelectorModal
         v-if="viewSelectorModal"
         @select="handleSocialServiceSelection"
         @blur="closeSelectorModal"
         @close="closeSelectorModal"
      />
   </app-modal>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
import { SocialService } from "../types";
import { SocialRef } from "../types/social-ref";
import { socialIconPath } from "../utils/common";
import toast from "../utils/toast";
import SocialServiceSelectorModal from "./SocialServiceSelectorModal.vue";

const { mapGetters: mapSocialServiceGetters } =
   createNamespacedHelpers("socialService");
const { mapGetters: mapSocialRefGetters, mapActions: mapSocialRefActions } =
   createNamespacedHelpers("socialRef");

export default defineComponent({
   name: "SocialLinkEditorModal",
   components: {
      SocialServiceSelectorModal,
   },
   props: {
      linkId: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         loading: false,
         currentSocialService: null as SocialService,
         label: "" as string,
         slug: "" as string,
         hint: "Username or unique id",
         viewSelectorModal: false,
      };
   },
   computed: {
      ...mapSocialServiceGetters(["socialServices"]),
      ...mapSocialRefGetters(["socialRefs"]),

      actionType(): "ADD" | "UPDATE" {
         return this.linkId ? "UPDATE" : "ADD";
      },
      socialService(): SocialService {
         return this.currentSocialService || { name: "im1", key: "im1" };
      },
      socialRef(): SocialRef {
         let ref: SocialRef = null;

         if (this.actionType === "UPDATE") {
            ref = (this.socialRefs as SocialRef[]).find(
               (ref) => ref._id === this.linkId
            );
         }

         return ref;
      },
      payload(): SocialRef {
         return {
            label: this.label,
            slug: this.slug,
            socialServiceKey: this.socialService.key,
         };
      },
   },
   watch: {
      currentSocialService(newService: SocialService) {
         this.hint = newService.hint;
      },
   },
   created() {
      if (this.actionType === "UPDATE") {
         this.label = this.socialRef.label;
         this.slug = this.socialRef.slug;
      }
   },
   beforeMount() {
      if (this.actionType === "UPDATE") {
         this.currentSocialService = (
            this.socialServices as SocialService[]
         ).find((service) => service.key === this.socialRef.socialServiceKey);
      }
   },
   methods: {
      ...mapSocialRefActions(["addSocialRef", "updateSocialRef"]),

      socialIconPath,
      async addNewSocialRef() {
         const { payload } = this;

         console.log("PAYLOAD", payload);
         try {
            await this.addSocialRef(payload);
            this.$emit("done");
            toast.success({
               text: "Link has been added",
               duration: 1200,
            });
         } catch (error) {
            toast.error({
               text: "Failed to add new link",
               duration: 1200,
            });
         }
      },
      async updateCurrentSocialRef() {
         const { payload } = this;

         payload._id = this.linkId;

         try {
            await this.updateSocialRef(payload);
            this.$emit("done");
            toast.success({
               text: "Link has been updated",
               duration: 1200,
            });
         } catch (error) {
            toast.error({
               text: "Failed to update link",
               duration: 1200,
            });
         }
      },
      async dispatchAction() {
         this.loading = true;
         switch (this.actionType) {
            case "ADD":
               await this.addNewSocialRef();
               break;

            case "UPDATE":
               await this.updateCurrentSocialRef();
               break;
         }
         this.loading = false;
      },
      handleSocialServiceSelection(service: SocialService) {
         this.currentSocialService = service;
         this.closeSelectorModal();
      },
      handleDeleteAction() {
         this.$emit("delete", this.linkId);
         this.$emit("close");
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

<style lang="scss" scoped>
.app-button {
   flex: 1;
}
.service-icon {
   margin-top: var(--gap-half);
   text-align: center;

   .service-icon-boundary {
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
   .service-icon-image {
      width: 100%;
      height: 100%;
      transform: filter 120ms ease;

      &:hover {
         filter: brightness(0.95);
      }
   }

   .service-label {
      margin-top: var(--gap-quarter);
   }
}
.link-editor-inputs {
   margin-top: var(--gap);

   .app-edit-input-field {
      margin-top: var(--gap);
      margin-bottom: var(--gap);
   }
}
</style>
