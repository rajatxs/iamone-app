<template>
   <app-modal 
      title="Change password" 
      width="410px" 
      height="310px"
      @close="$emit('close')">

      <div class="ystack gap-small">

         <!-- Current password input field -->
         <app-input-field vgap="small">
            <app-input 
               v-model="currentPassword"
               :format="inputFormat" 
               hint="Current password" 
               expanded
               required />
         </app-input-field>

         <!-- New password input field -->
         <app-input-field vgap="small">
            <app-input 
               v-model="newPassword"
               :format="inputFormat" 
               hint="New password" 
               expanded
               required />
         </app-input-field>

         <!-- Confirm new password input field -->
         <app-input-field vgap="small">
            <app-input 
               v-model="confirmNewPassword"
               :format="inputFormat" 
               hint="Confirm new password" 
               expanded
               required />
         </app-input-field>
      </div>

      <div class="xstack pad-y-medium justify-center">
         <app-button 
            class="gap-medium" 
            size="small" 
            type="text" 
            text="blue"
            @click="togglePasswordViewMode">

            <template v-if="!viewPassword">
               <ShowIcon />
               <span class="label">Show password</span>
            </template>
            <template v-else>
               <HideIcon />
               <span class="label">Hide password</span>
            </template>
         </app-button>
      </div>

      <template #footer>
         <app-button 
            background="blue" 
            :loading="loading"
            :disabled="!allowToChange"
            @click="handlePasswordChangeAction"
            expanded>Done</app-button>
      </template>
   </app-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import toast from '../../utils/toast'
import ShowIcon from '../Icons/show.vue'
import HideIcon from '../Icons/hide.vue'

const { mapActions: mapUserActions } = createNamespacedHelpers('user')

export default defineComponent({
   name: 'UpdatePasswordModal',
   components: {
      ShowIcon,
      HideIcon
   },

   data() {
      return {
         loading: false,
         viewPassword: false,
         currentPassword: '',
         newPassword: '',
         confirmNewPassword: ''
      }
   },

   computed: {
      inputFormat() {
         // @ts-ignore
         return (this.viewPassword)? 'text': 'password'
      },
      allowToChange() {
         // @ts-ignore
         const { currentPassword, newPassword, confirmNewPassword } = this
         
         return currentPassword && newPassword && confirmNewPassword
      }
   },

   methods: {
      ...mapUserActions(['changePassword']),

      togglePasswordViewMode() {
         this.viewPassword = !this.viewPassword
      },
      async handlePasswordChangeAction() {
         const payload = this.validate()

         this.loading = true
         if (!payload) {
            return
         }

         setTimeout(async () => {
            try {
               await this.changePassword(payload)
   
               toast.success({
                  text: "Password has been changed"
               })
               this.$emit('close')
            } catch (error: any) {
               toast.error({
                  text: error.response.data.message
               })
            }

            this.loading = false
         }, 2400)
      },
      validate() {
         if (this.confirmNewPassword !== this.newPassword) {
            toast.error({
               text: "Confirm password does not match"
            })
            return null
         }
         return {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
         }
      }
   }
})
</script>
