<template>
   <app-card title="Links" gap="large">
      <template #body>
         <div class="links ystack gap-medium">
            <div
               v-for="link in links"
               :key="link._id"
               class="link w-auto h-auto xstack cursor-pointer radius-medium"
               @click="editCutomLink(link._id)">

               <div class="link-thumb xstack align-center justify-center">
                  <img
                     class="thumb-image"
                     :src="link.favicon || '/icons/im1.svg'"
                     alt=""
                  />
               </div>
               <div class="link-metadata pad-y-medium">
                  <div class="title">{{ truncate(link.title, 46) }}</div>
                  <div class="desc">{{ truncate(link.description, 58) }}</div>
               </div>
            </div>

            <div class="xstack justify-center">
               <app-button 
                  gradient="2" 
                  expanded 
                  :loading="loading"
                  @click="openEditorModal">
                  Add new one
               </app-button>
            </div>
         </div>

         <edit-link-modal 
            v-if="viewEditorModal" 
            :link-id="linkId"
            @done="handleCompletion"
            @close="closeEditorModal" />
      </template>
   </app-card>
</template>

<script>
import Vue from "vue";
import EditLinkModal from "./Modals/EditLinkModal.vue";

export default Vue.extend({
   name: "SocialLinkCard",
   components: {
      'edit-link-modal': EditLinkModal
   },
   computed: {
      links() {
         return this.$store.getters['links/links'];
      }
   },
   data() {
      return {
         linkId: "",
         viewEditorModal: false,
         loading: false
      };
   },

   methods: {
      editCutomLink(id) {
         this.linkId = id;
         this.openEditorModal();
      },
      openEditorModal() {
         this.viewEditorModal = true;
      },
      closeEditorModal() {
         this.viewEditorModal = false;
         this.linkId = "";
      },
      async handleCompletion() {
         this.viewEditorModal = false;
         this.linkId = "";
         this.loading = true;
         await this.$store.dispatch('links/loadAll');
         this.loading = false;
      },
   },
});
</script>

<style scoped>
.links .link {
   border: 1px solid var(--accents-2);
}
.links .link .link-thumb {
   min-width: 90px;
}
.links .link .link-thumb .thumb-image {
   width: 32px;
   height: 32px;
}
.links .link .link-metadata {
   padding-right: var(--gap-half);
}
.links .link .title {
   font-weight: bold;
   line-height: 1.8rem;
}
.links .link .desc {
   font-size: 85%;
}

body.dark .links .link {
   border-color: var(--accents-1);
}
</style>
