<template>
   <app-card title="Risk zone" gap="large">
      <template #body>
         <p>Deleting your account permanently deletes your page and all your data.</p>

         <app-button
            background="red"
            size="medium"
            @click="handleAccountDeleteAction">
            Delete Account
         </app-button>
      </template>
   </app-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import toast from '@/utils/toast'

const { mapActions: mapUserActions } = createNamespacedHelpers('user')

export default defineComponent({
   name: 'RiskZone',

   methods: {
      ...mapUserActions(['deleteAccount']),

      async handleAccountDeleteAction() {
         const perm = confirm("Confirm again to proceed account deletion")

         if (!perm) {
            return
         }

         try {
            await this.deleteAccount()
            toast.success({
               text: "Your account has no longer exists",
               duration: 3800
            })
         } catch (error: any) {
            toast.error({ text: error.response.data.message })
         }
      }
   }
})
</script>
