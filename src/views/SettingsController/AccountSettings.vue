<template>
   <app-card title="Account" gap="large">
      <template #body>

         <!-- Username field -->
         <div class="input-field">
            <app-input v-model="username.text" hint="Username" expanded />

            <app-button
               size="small"
               color="primary"
               :loading="username.loading"
               :disabled="!hasUsernameChanged"
               @click="changeUsername"
               expanded>
               Change username
            </app-button>

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
               expanded
            />

            <app-button
               v-if="user.emailVerified"
               expanded
               size="small"
               color="primary"
               :loading="email.loading"
               :disabled="!hasEmailChanged"
               @click="changeEmail">
               Change email
            </app-button>
            
            <app-button
               v-else
               expanded
               color="primary"
               size="small"
               background="blue"
               @click="$store.commit('ui/SHOW_EMAIL_VERIFICATION_MODAL', true)">
               Verify email
            </app-button>

            <p v-if="email.errorMessage" class="pad-x-small text-red">
               <small>{{ email.errorMessage }}</small>
            </p>
         </div>

         <div class="pad-y-small">
            <app-button size="small" @click="openUpdatePasswordModal">
               Change password
            </app-button>
         </div>

         <update-password-modal 
            v-if="viewUpdatePasswordModal"
            @close="closeUpdatePasswordModal" />
      </template>
   </app-card>
</template>

<script>
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import UpdatePasswordModal from './Modals/UpdatePasswordModal.vue'

const { mapGetters: mapUserGetters } = createNamespacedHelpers("user");

export default Vue.extend({
   name: "AccountSettings",
   components: {
      'update-password-modal': UpdatePasswordModal
   },
   data() {
      return {
         username: {
            text: "",
            errorMessage: "",
            loading: false,
         },

         email: {
            text: "",
            errorMessage: "",
            loading: false,
         },
         viewUpdatePasswordModal: false
      };
   },
   computed: {
      ...mapUserGetters(["user"]),
      hasEmailChanged() {
         return this.user.email !== this.email.text;
      },
      hasUsernameChanged() {
         return this.user.username !== this.username.text;
      },
   },
   watch: {
      "user.username"(newUsername) {
         this.username.text = newUsername;
      },
      "user.email"(newEmail) {
         this.email.text = newEmail;
      },
   },
   mounted() {
      this.username.text = this.user.username;
      this.email.text = this.user.email;
   },
   methods: {
      openUpdatePasswordModal() {
         this.viewUpdatePasswordModal = true;
      },
      closeUpdatePasswordModal() {
         this.viewUpdatePasswordModal = false;
      },

      async changeUsername() {
         const { username } = this;
         let payload = {};

         if (!this.hasUsernameChanged) {
            this.username.errorMessage = "";
            return;
         }

         this.username.loading = true;
         payload['username'] = username.text;

         try {
            const response = await this.axios.put("/user/username", payload);
            this.$store.commit('user/SET_USERNAME', username.text);
            this.$toast.success(response.data.message);
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.username.loading = false;
      },

      async changeEmail() {
         const { email } = this;
         let payload = {};
         const perm = confirm("Confirm again to proceed", false);

         if (!this.hasEmailChanged) {
            this.email.errorMessage = "";
            return;
         }

         if (!perm) {
            this.email.text = this.user.email;
            return;
         }

         this.email.loading = true;
         payload['email'] = email.text;

         try {
            const response = await this.axios.put("/user/email", payload);
            this.$toast.success(response.data.message);
            this.$store.commit('user/SET_EMAIL', email.text);
            this.$store.commit('user/SET_EMAIL_VERIFIED', false);
            this.$store.commit('ui/SHOW_EMAIL_VERIFICATION_MODAL', true);
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.email.loading = false;
      },
   },
});
</script>

<style>
.input-field {
   display: grid;
   grid-template-columns: auto 140pt;
   grid-column-gap: 8pt;
   align-items: center;
}
@media (max-width: 480px) {
   .input-field {
      grid-template-columns: 1fr;
   }
}
</style>
