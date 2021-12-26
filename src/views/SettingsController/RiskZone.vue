<template>
   <app-card title="Risk zone" gap="large">
      <template #body>
         <p>
            Deleting your account permanently deletes your page and all your
            data.
         </p>

         <app-button
            color="error"
            size="small"
            :loading="loading"
            @click="deleteUserAccount">
            Delete Account
         </app-button>
      </template>
   </app-card>
</template>

<script>
import Vue from "vue";
import { clearAuthTokens, redirectToLoginPage } from '../../utils/common'

export default Vue.extend({
   name: "RiskZone",
   data() {
      return {
         loading: false
      }
   },
   methods: {
      async deleteUserAccount() {
         const perm = confirm("Confirm again to proceed account deletion");

         if (!perm) {
            return;
         }
         this.loading = true;

         try {
            const response = await this.axios.delete("/user/account");
            this.$toast.success(response.data.message);
            clearAuthTokens();
            redirectToLoginPage();
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.loading = false;
      },
   },
});
</script>
