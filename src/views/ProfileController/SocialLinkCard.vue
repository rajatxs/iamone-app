<template>
   <app-card title="Socials" gap="large">
      <template #body>
         <div class="social-link-list">
            <div 
               v-for="ref in socialRefs" 
               :key="ref._id" 
               class="social-link" 
               :title="ref.label"
               @click.prevent="editSocialRef($event, ref._id)">
               <img class="social-service-icon-image" :src="toSocialIcon(ref.socialServiceKey)" alt="" />

               <span class="remove-action-button" >
                  <app-icon-button name="x" background="primary" />
               </span>
            </div>
            
            <div class="add-action-button social-link" @click="openEditorModal">
               <PlusIcon />
            </div>
         </div>

         <EditSocialLinkModal 
            v-if="viewEditorModal" 
            @close="closeEditorModal"
            @done="closeEditorModal"
            @delete="deleteSocialRef"
            :link-id="linkId" />
      </template>
   </app-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import PlusIcon from '@/components/Icons/plus.vue'
import EditSocialLinkModal from './Modals/EditSocialLinkModal.vue'
import toast from '@/utils/toast'

const { 
   mapGetters: mapSocialRefGetters, 
   mapActions: mapSocialRefActions 
} = createNamespacedHelpers('socialRef')

export default defineComponent({
   name: 'SocialLinkCard',

   components: {
      PlusIcon,
      EditSocialLinkModal
   },

   data() {
      return {
         linkId: '',
         viewEditorModal: false
      }
   },

   computed: mapSocialRefGetters(['socialRefs']),

   methods: {
      ...mapSocialRefActions(['deleteOneSocialRef']),

      toSocialIcon(key: string) {
         return `/icons/${key}.svg`
      },

      editSocialRef($event: MouseEvent, id: string) {
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

      async deleteSocialRef(id: string) {
         try {
            await this.deleteOneSocialRef(id)
            toast.success({
               text: "Link has been removed",
               duration: 1200
            })
         } catch (error) {
            toast.error({
               text: "Failed to delete social link"
            })
         }
      }
   }
})
</script>

<style scoped lang="scss">
.social-link-list {
   display: flex;
   gap: var(--gap-half);

   .social-link {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 38pt;
      height: 38pt;
      cursor: pointer;
      box-sizing: border-box;
      border: 1px solid var(--accents-2);
      transform: translateY(0);
      transition: transform 160ms ease, background-color 80ms linear;

      &:hover:not(.add-action-button) {
         transform: translateY(-2px);
         box-shadow: var(--shadow-small);
      }

      &:hover .remove-action-button {
         display: inline-flex;
      }

      .social-service-icon-image {
         width: 26pt;
         height: 26pt;
      }

      &.add-action-button {
         border-width: 2px;
         border-style: dashed;
         border-color: var(--accents-2);

         &:hover {
            background-color: var(--accents-2);
         }

         .app-icon {
            width: 26px;
            height: 26px;
            color: var(--accents-5);
         }
      }

      .remove-action-button {
         display: none;
         position: absolute;
         top: -5pt;
         right: -5pt;
      }
   }
}
</style>
