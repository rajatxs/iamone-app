<template>
   <app-card title="Account" gap="large">
      <template #body>
         
         <!-- Username field -->
         <div class="input-field">
            <app-input 
               v-model="username.text" 
               hint="Username" 
               expanded />

               <app-button 
                  size="small" 
                  background="blue" 
                  :loading="username.loading"
                  :disabled="!hasUsernameChanged"
                  @click="handleUsernameChanges"
                  expanded>Change username</app-button>

               <p v-if="username.errorMessage" class="pad-x-small text-red">
                  <small>{{ username.errorMessage }}</small>
               </p>
         </div>

         <!-- Email field -->
         <div class="input-field pad-y-medium">
            <app-input 
               format="email"
               v-model="email.text" 
               hint="Email address" 
               expanded />

               <app-button 
                  size="small" 
                  background="blue" 
                  :loading="email.loading"
                  :disabled="!hasEmailChanged"
                  @click="handleEmailChanges"
                  expanded>Change email</app-button>

               <p v-if="email.errorMessage" class="pad-x-small text-red">
                  <small>{{ email.errorMessage }}</small>
               </p>
         </div>

         <div class="pad-y-small">
            <app-button size="small" @click="SHOW_UPDATE_PASSWORD_MODAL(true)">Change password</app-button>
         </div>
      </template>
   </app-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import toast from '../../utils/toast'

interface InputValueContext {
   text: string,
   errorMessage: string,
   loading: false
}

const { 
   mapGetters: mapUserGetters, 
   mapActions: mapUserActions
} = createNamespacedHelpers('user')

const { mapMutations: mapUIMutations } = createNamespacedHelpers('ui')

export default defineComponent({
   name: 'AccountSettings',
   data() {
      return {
         username: <InputValueContext>{
            text: '',
            errorMessage: '',
            loading: false
         },

         email: <InputValueContext>{
            text: '',
            errorMessage: '',
            loading: false
         }
      }
   },
   computed: {
      ...mapUserGetters(['user']),

      hasEmailChanged() {
         return this.user.email !== this.email.text
      },
      hasUsernameChanged() {
         return this.user.username !== this.username.text
      }
   },
   watch: {
      'user.username'(newUsername: string) {
         this.username.text = newUsername

         toast.success({
            text: 'Username changed'
         })
      },
      'user.email'(newEmail: string) {
         this.email.text = newEmail

         toast.success({
            text: 'Email changed'
         })
      }
   },
   mounted() {
      this.username.text = this.user.username
      this.email.text = this.user.email
   },
   methods: {
      ...mapUserActions(['changeUsername', 'changeEmail']),
      ...mapUIMutations(['SHOW_UPDATE_PASSWORD_MODAL']),

      async handleUsernameChanges() {
         const { username } = this

         if (!this.hasUsernameChanged) {
            this.username.errorMessage = ''
            return
         }

         this.username.loading = true

         try {
            await this.changeUsername(username.text)
            this.username.loading = false
         } catch (error: any) {
            toast.error({
               text: error.response.data.message
            })
         }
      },

      async handleEmailChanges() {
         const { email } = this

         if (!this.hasEmailChanged) {
            this.email.errorMessage = ''
            return
         }

         this.email.loading = true

         try {
            await this.changeEmail(email.text)
            this.email.loading = false
         } catch (error: any) {
            toast.error({
               text: error.response.data.message
            })
         }
      }
   }
})
</script>

<style lang="scss">
.input-field {
   display: grid;
   grid-template-columns: auto 140pt;
   grid-column-gap: 8pt;
   align-items: center;
}
</style>
