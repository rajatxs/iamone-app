<template>
   <app-modal 
      width="430px" 
      :height="modalHight" 
      minheight="12pt" 
      :close-button="false"
      radius="14px">
      <div class="logo">
         <img src="/icons/im1.svg" class="logo-image" />
      </div>

      <div class="auth-actions">
         <button :class="toActionButtonClass('login')" aria-label="login" @click="toggleAuthAction">Login</button>
         <button :class="toActionButtonClass('signup')" aria-label="signup" @click="toggleAuthAction">Signup</button>
      </div>

      <div class="auth-active-area">
         <LoginControls v-if="authAction === 'login'" />
         <SignupControls v-else />
      </div>
   </app-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginControls from './LoginControls.vue'
import SignupControls from './SignupControls.vue'

type AuthActionType = 'login' | 'signup'

export default defineComponent({
   name: 'AuthModal',
   components: {
      LoginControls,
      SignupControls
   },
   data() {
      return {
         authAction: 'login' as AuthActionType,
         modalHight: '455px'
      }
   },

   watch: {
      authAction(newValue: AuthActionType) {
         switch (newValue) {
            case 'login':
               this.modalHight = '455px'
               break
            
            case 'signup':
               this.modalHight = '550px'
               break
         }
      }
   },

   methods: {
      toActionButtonClass(val: string): string[] {
         let classes = ['auth-action']

         if (val === this.authAction) {
            classes.push('active')
         }

         return classes
      },
      toggleAuthAction($event: MouseEvent) {
         const { authAction } = this
         let newAction: AuthActionType
         let label: string

         label = ($event.target as any).ariaLabel

         if (label === authAction) {
            return
         }

         switch(authAction) {
            default:
            case 'login':
               newAction = 'signup'
               break
            
            case 'signup':
               newAction = 'login'
               break
         }

         this.authAction = newAction
      },
      handleAuthAction() {
         switch(this.authAction) {
            case 'login':
               this.handleLoginFormSubmission()
               break

            case 'signup':
               this.handleSignupFormSubmission()
               break
         }
      },
      handleLoginFormSubmission() { },
      handleSignupFormSubmission() { }
   }
})
</script>

<style scoped lang="scss">
@import "./index.scss";

@keyframes transformBackground {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.app-modal-outlayer {
   background: linear-gradient(-45deg, #3F5EFB, #e100ff, #7f00ff, #FF0F7B);
	background-size: 400% 400%;
	animation: transformBackground 8s ease infinite;
}

.logo {
   display: flex;
   height: 42pt;
   align-items: center;
   justify-content: center;

   .logo-image {
      width: 80px;
      height: auto;
   }
}

.auth-actions {
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   width: 190px;
   padding: var(--gap-quarter);
   height: 26px;
   border-radius: 25px;
   margin-left: auto;
   gap: var(--gap-quarter);
   margin-right: auto;
   margin-top: var(--gap-half);
   border: 1px solid var(--accents-2);

   .auth-action {
      display: flex;
      outline: none;
      align-items: center;
      border: none;
      justify-content: center;
      flex: 1;
      height: inherit;
      border-radius: inherit;
      font-size: 92%;
      background-color: transparent;
      cursor: pointer;
      transition: background-color 40ms linear;

      &:hover {
         background-color: var(--accents-1);
      }

      &.active {
         font-weight: 500;
         background-color: var(--accents-2);
         background-image: linear-gradient(270deg, var(--foreground) 0%, var(--foreground-light) 100%);
         color: var(--foreground);
      }
   }
}
</style>
