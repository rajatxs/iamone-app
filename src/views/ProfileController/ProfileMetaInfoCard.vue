<template>
   <app-card gap="medium">
      <template #body>
         <div class="profile-meta-info-card">
            <div class="profile-avatar h-auto margin-y-medium xstack justify-center">
               <profile-avatar-selector />
            </div>

            <div class="profile-meta-inputs">
               <div class="meta-input-grid">
                  <div class="meta-input-field w-100 meta-name-input-field">
                     <app-input
                        v-model="fullname"
                        :spellcheck="false"
                        autocomplete="name"
                        hint="Name"
                        expanded
                     />
                  </div>

                  <div class="meta-input-field w-100 meta-location-input-field">
                     <app-input
                        v-model="location"
                        :spellcheck="false"
                        autocomplete="country-name"
                        hint="Location"
                        expanded
                     />
                  </div>
               </div>

               <div class="meta-input-field meta-bio-input-field">
                  <app-input
                     v-model="bio"
                     hint="Bio"
                     multiline
                     minlines="3"
                     expanded
                  />
               </div>

               <div class="meta-input-field meta-trigger-action text-center">
                  <app-button
                     role="button"
                     gradient="5"
                     expanded
                     :loading="inProgress"
                     @click="saveUserData">
                     Save
                  </app-button>
               </div>
            </div>
         </div>
      </template>
   </app-card>
</template>

<script>
import Vue from "vue";
import ProfileAvatarSelector from "./ProfileAvatarSelector.vue";

export default Vue.extend({
   name: "ProfleMetaInfoCard",
   components: {
      'profile-avatar-selector': ProfileAvatarSelector
   },
   data() {
      return {
         fullname: "",
         location: "",
         bio: "",
         inProgress: false,
      };
   },
   computed: {
      user() {
         return this.$store.getters['user/user']
      },

      payload() {
         return {
            fullname: this.fullname,
            location: this.location,
            bio: this.bio,
         };
      },
   },
   mounted() {
      const { user } = this;

      this.fullname = user.fullname;
      this.location = user.location;
      this.bio = user.bio;
   },
   methods: {
      async saveUserData() {
         const { payload } = this;
         let response = null;

         console.log("DATA", payload)

         this.inProgress = true;

         try {
            response = await this.axios.put('/user/detail', payload);

            if (response.status === 200) {
               await this.$store.dispatch('user/loadUser');
               this.$toast.success("Profile updated");
            }
         } catch (error) {
            this.$toast.error("Failed to update user profile");
         }

         this.inProgress = false;
      },
   },
});
</script>

<style scoped>
.profile-meta-info-card {
   display: flex;
   flex-direction: row;
}
.profile-meta-info-card .meta-input-grid {
   display: flex;
   gap: var(--gap-half);
}
.profile-meta-info-card .meta-input-field {
   margin-top: var(--gap-quarter);
   margin-bottom: var(--gap-quarter);
}
.profile-meta-info-card .profile-avatar {
   min-width: 160px;
}
.profile-meta-info-card .profile-meta-inputs .meta-trigger-action {
   margin-top: var(--gap-half);
}
@media (max-width: 480px) {
   .profile-meta-info-card {
      flex-direction: column;
   }
   .profile-meta-info-card .meta-input-grid {
      flex-direction: column;
      gap: 0;
   }
}
@media (min-width: 481px) and (max-width: 767px) {
   .profile-meta-info-card {
      flex-direction: column;
   }
}
</style>
