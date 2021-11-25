<script lang="ts">
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import toast from '../../../utils/toast'

const { mapActions: mapAuthActions } = createNamespacedHelpers('auth')

export default defineComponent({
   name: 'LoginControls',
   data() {
      return {
         loadingState: false,
         address: '',
         password: ''
      }
   },
   computed: {
      payload() {
         // @ts-ignore
         const address = this.address, password = this.password
         let uniqueProp: string

         uniqueProp = (address.includes('@'))? 'email': 'username'

         return {
            [uniqueProp]: address,
            password
         }
      }
   },

   methods: {
      ...mapAuthActions(['generateAuthToken']),

      async handleLoginAction() {
         const payload = this.payload
         this.loadingState = true

         try {
            await this.generateAuthToken(payload)
            toast.success({
               text: "You're successfully signed in"
            })
         } catch (error) {
            console.log("FAILED TO LOGIN", error)
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
   <div class="login-auth-workarea">
      <div class="workarea-header">
         <h3>Continue to im1</h3>
      </div>

      <form name="login" class="auth-controls" @submit.prevent="handleLoginAction">
         <app-input-field>
            <app-input v-model="address" hint="Username or Email" expanded required />
         </app-input-field>

         <app-input-field>
            <app-input format="password" v-model="password" hint="Password" expanded required />
         </app-input-field>
         <app-input-field justify="right">
            <a href="#" class="text-center text-grey">
               <small>Forgot password</small>
            </a>
         </app-input-field>

         <br />

         <app-input-field>
            <app-button background="blue" size="small" :loading="loadingState" expanded>Login</app-button>
         </app-input-field>
      </form>
   </div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
