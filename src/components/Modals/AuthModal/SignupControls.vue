<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import { AuthPayload } from '../../../types/auth'
import toast from '../../../utils/toast'

const { mapActions: mapAuthActions } = createNamespacedHelpers('auth')

export default defineComponent({
   name: 'SignupControls',
   data() {
      return {
         loadingState: false,
         username: '',
         email: '',
         password: '',
         confirmPassword: ''
      }
   },
   computed: {
      payload(): Required<AuthPayload> {
         return {
            username: this.username,
            email: this.email,
            password: this.password
         }
      }
   },
   methods: {
      ...mapAuthActions(['createAccount']),

      validate(): boolean {
         const { password, confirmPassword } = this

         if (password !== confirmPassword) {
            toast.error({
               text: 'Password does not match'
            })

            return false
         }

         return true
      },

      async handleSignupAction() {
         const validated = this.validate()
         let payload: Required<AuthPayload>

         if (!validated) {
            return
         }

         payload = this.payload

         this.loadingState = true

         try {
            await this.createAccount(payload)
            toast.success({
               text: "Account is successfully created"
            })
         } catch (error) {
            console.log("FAILED TO SIGNUP", error)
            toast.error({
               text: (error as any).response.data.message
            })
         }
         this.loadingState = false
      }
   }
})
</script>

<template>
   <div class="signup-auth-workarea">
      <div class="workarea-header">
         <h3>Create new profile</h3>
      </div>

      <form name="signup" class="auth-controls" @submit.prevent="handleSignupAction">
         <app-input-field>
            <app-input v-model="username" hint="Create username" expanded required />
         </app-input-field>

         <app-input-field>
            <app-input v-model="email" format="email" hint="Email address" expanded required />
         </app-input-field>

         <app-input-field>
            <app-input v-model="password" format="password" hint="Create password" expanded required />
         </app-input-field>

         <app-input-field>
            <app-input v-model="confirmPassword" format="password" hint="Confirm password" expanded required />
         </app-input-field>

         <app-input-field>
            <p><small>Read <a href="#" class="text-blue">Privacy policy</a></small></p>
         </app-input-field>

         <app-input-field>
            <app-button background="blue" size="small" expanded>Signup</app-button>
         </app-input-field>
      </form>
   </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
