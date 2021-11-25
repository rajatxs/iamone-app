<template>
   <app-card title="Links" gap="large">
      <template #body>
         <div class="custom-links">
            <div v-for="link in clinks" :key="link._id" class="custom-link" @click="editCutomLink(link._id)">
               <div class="link-thumb">
                  <img class="thumb-image" :src="link.favicon || '/icons/im1.svg'" alt="">
               </div>
               <div class="link-metadata">
                  <div class="title">{{ truncate(link.title, 46) }}</div>
                  <div class="desc">{{ truncate(link.description, 58) }}</div>
               </div>
            </div>

            <app-button gradient="2" expanded @click="openEditorModal">Add new one</app-button>
         </div>
         <EditCustomLinkModal 
            v-if="viewEditorModal" 
            :link-id="linkId"
            @close="closeEditorModal"
            @done="closeEditorModal"
            @delete="deleteCustomClink" />
      </template>
   </app-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import PlusIcon from '../Icons/plus.vue'
import EditCustomLinkModal from '../EditCustomLinkModal.vue'
import { truncate } from '../../utils/common'
import toast from '../../utils/toast'

const { mapGetters: mapCLinkGetters, mapActions: mapCLinkActions } = createNamespacedHelpers('clink')

export default defineComponent({
   name: 'SocialLinkCard',

   components: {
      PlusIcon,
      EditCustomLinkModal
   },

   computed: mapCLinkGetters(['clinks']),

   data() {
      return {
         linkId: '',
         viewEditorModal: false
      }
   },

   methods: {
      ...mapCLinkActions(['deleteCLink']),

      truncate,
      editCutomLink(id: string) {
         this.linkId = id
         this.openEditorModal()
      },
      openEditorModal() {
         this.viewEditorModal = true
      },
      closeEditorModal() {
         this.viewEditorModal = false
         this.linkId = ''
      },
      async deleteCustomClink(id: string) {
         try {
            await this.deleteCLink(id)
            toast.success({
               text: "Link has been removed",
               duration: 1200
            })
         } catch (error) {
            toast.error({
               text: "Failed to delete link"
            })
         }
      }
   }
})
</script>

<style scoped lang="scss">
.custom-links {
   display: flex;
   flex-direction: column;
   gap: 8pt;

   .custom-link {
      width: auto;
      display: flex;
      // gap: 2pt;
      justify-content: flex-start;
      flex-direction: row;
      cursor: pointer;
      border-radius: var(--radius);
      border: 1px solid var(--accents-2);
      height: auto;

      .link-thumb {
         display: flex;
         align-items: center;
         justify-content: center;
         min-width: 90px;
         // background-color: turquoise;

         .thumb-image {
            width: 32px;
            height: 32px;
         }
      }

      .link-metadata {
         padding-top: var(--gap-half);
         padding-bottom: var(--gap-half);
         padding-right: var(--gap-half);
      }

      .title {
         font-weight: bold;
         line-height: 1.8rem;
      }
      .desc {
         font-size: 85%;
      }
   }
}
</style>
