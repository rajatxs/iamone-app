<template>
   <app-modal
      title="Email verification"
      width="320pt"
      height="325px"
      gap="large"
      @close="$emit('close')">

      <div>
         <div class="pad-y-large text-center">
            <img :src="'/images/email-verification.svg' | STATIC_URL" height="72" />
         </div>
         <p>We will send email verification code on your email</p>

         <app-input-field hgap="none">
            <app-input v-model="code" format="number" hint="Verification code" expanded />
         </app-input-field>
      </div>

      <template #footer>
         <app-button
            nogap
            expanded
            color="accents-2"
            loader-color="foreground"
            :loading="tasks.sendingVerificationCode"
            :disabled="resendDelay !== 0 || tasks.sendingVerificationCode" 
            @click="sendVerificationCode">
            {{ (resendDelay === 0)? "Send code": `Resend in ${resendDelay / 1000}s` }}
         </app-button>

         <app-button 
            expanded 
            color="primary"
            :loading="tasks.verifyingCode" 
            :disabled="!code.length || tasks.verifyingCode" 
            @click="verifyCode">Verify</app-button>
      </template>
   </app-modal>
</template>

<script>
export default {
   data() {
      return {
         code: '',
         timer: null,
         resendDelay: 0,
         tasks: {
            sendingVerificationCode: false,
            verifyingCode: false,
         }
      }
   },
   methods: {
      async sendVerificationCode() {
         let response;

         this.tasks.sendingVerificationCode = true;
         try {
            response = await this.axios.get('/user/email/verification');
            this.$toast.success(response.data.message);
            this.resendDelay = 45000;

            this.timer = setInterval(() => {
               this.resendDelay -= 1000;

               if (this.resendDelay <= 0) {
                  clearInterval(this.timer);
               }
            }, 1000);
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.tasks.sendingVerificationCode = false;
      },

      async verifyCode() {
         const code = this.code;

         this.tasks.verifyingCode = true;

         try {
            await this.axios.post('/user/email/verify', { code });
            this.$toast.success("Email successfully verified");

            this.$store.commit('user/SET_EMAIL_VERIFIED', true);
            this.$store.commit('ui/SHOW_EMAIL_VERIFICATION_MODAL', false);
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.tasks.verifyingCode = false;
      }
   }
}
</script>
