<template>
   <app-modal
      title="Change password"
      width="410px"
      height="350px"
      @close="$emit('close')"
      @blur="$emit('close')"
   >
      <div class="ystack">
         <!-- Current password input field -->
         <app-input-field>
            <app-input
               v-model="currentPassword"
               :format="inputFormat"
               hint="Current password"
               expanded
               required
            />
         </app-input-field>

         <!-- New password input field -->
         <app-input-field>
            <app-input
               v-model="newPassword"
               :format="inputFormat"
               hint="New password"
               expanded
               required
            />
         </app-input-field>

         <!-- Confirm new password input field -->
         <app-input-field>
            <app-input
               v-model="confirmNewPassword"
               :format="inputFormat"
               hint="Confirm new password"
               expanded
               required
            />
         </app-input-field>
      </div>

      <div class="xstack pad-y-medium justify-center">
         <app-button
            class="gap-medium"
            size="small"
            type="text"
            text="primary"
            @click="togglePasswordViewMode"
         >
            <template v-if="!viewPassword">
               <show-icon />
               <span class="label">Show password</span>
            </template>
            <template v-else>
               <hide-icon />
               <span class="label">Hide password</span>
            </template>
         </app-button>
      </div>

      <template #footer>
         <app-button
            background="blue"
            :loading="loading"
            :disabled="!allowToChange"
            @click="changePassword"
            expanded>
            Done
         </app-button>
      </template>
   </app-modal>
</template>

<script>
import Vue from "vue";
import ShowIcon from "../../../assets/vue-icons/show.vue";
import HideIcon from "../../../assets/vue-icons/hide.vue";

export default Vue.extend({
   name: "UpdatePasswordModal",
   components: {
      "show-icon": ShowIcon,
      "hide-icon": HideIcon,
   },

   data() {
      return {
         loading: false,
         viewPassword: false,
         currentPassword: "",
         newPassword: "",
         confirmNewPassword: "",
      };
   },

   computed: {
      inputFormat() {
         // @ts-ignore
         return this.viewPassword ? "text" : "password";
      },
      allowToChange() {
         // @ts-ignore
         const { currentPassword, newPassword, confirmNewPassword } = this;

         return currentPassword && newPassword && confirmNewPassword;
      },
   },

   methods: {
      togglePasswordViewMode() {
         this.viewPassword = !this.viewPassword;
      },
      async changePassword() {
         const payload = this.validate();

         if (!payload) {
            return;
         }
         this.loading = true;

         try {
            const response = await this.axios.put("/user/password", payload);
            this.$toast.success(response.data.message);
            this.$emit("close");
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.loading = false;
      },
      validate() {
         if (this.confirmNewPassword !== this.newPassword) {
            this.$toast.error("Confirm password does not match");
            return null;
         }
         return {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword,
         };
      },
   },
});
</script>
