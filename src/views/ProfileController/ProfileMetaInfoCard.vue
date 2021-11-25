<template>
   <app-card gap="medium">
      <template #body>
         <div class="profile-meta-info-card">
            <div class="profile-avatar">
               <ProfileAvatarSelector />
            </div>

            <div class="profile-meta-inputs">
               <div class="meta-input-grid">
                  <div class="meta-input-field meta-name-input-field">
                     <app-input
                        v-model="fullname"
                        hint="Name"
                        expanded
                        :spellcheck="false"
                     />
                  </div>

                  <div class="meta-input-field meta-company-input-field">
                     <app-input
                        v-model="company"
                        hint="Location"
                        expanded
                        :spellcheck="false"
                        :value="company"
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
                     :value="bio"
                  />
               </div>

               <div class="meta-input-field meta-trigger-action">
                  <app-button
                     gradient="5"
                     expanded
                     :loading="inProgress"
                     @click="saveUserData"
                     >Save</app-button
                  >
               </div>
            </div>
         </div>
      </template>
   </app-card>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { createNamespacedHelpers } from "vuex"
import ProfileAvatarSelector from "../../partials/ProfileAvatarSelector.vue"
import toast from "../../utils/toast"

const { 
   mapGetters: mapUserGetters, 
   mapActions: mapUserActions 
} = createNamespacedHelpers("user")

interface ProfileDataPayload {
   fullname?: string
   company?: string
   bio?: string
}

export default defineComponent({
   name: "ProfleMetaInfoCard",
   components: {
      ProfileAvatarSelector,
   },
   data() {
      return {
         fullname: "Rajat",
         company: "",
         bio: "",

         inProgress: false,
      }
   },
   computed: {
      ...mapUserGetters(["user", "loaded"]),

      payload(): ProfileDataPayload {
         return {
            fullname: this.fullname,
            company: this.company,
            bio: this.bio,
         }
      },
   },
   mounted() {
      const { user } = this

      this.fullname = user.fullname
      this.company = user.company
      this.bio = user.bio
   },
   methods: {
      ...mapUserActions(["updateUserDetails"]),

      async saveUserData() {
         const { payload } = this

         this.inProgress = true

         try {
            await this.updateUserDetails(payload)
            toast.success("Profile updated")
         } catch (error) {
            console.log("Failed to update user profile", error)
         }

         this.inProgress = false
      },
   },
})
</script>

<style scoped lang="scss">
.profile-meta-info-card {
   display: flex;
   flex-direction: row;

   .meta-input-grid {
      display: flex;
      gap: 12px;
   }

   .meta-input-field {
      margin-top: var(--gap-quarter);
      margin-bottom: var(--gap-quarter);
   }

   .profile-avatar {
      display: flex;
      padding-top: var(--gap);
      min-width: 160px;
      justify-content: center;
      height: auto;
   }

   .profile-meta-inputs {
      width: 430px;

      .meta-trigger-action {
         margin-top: var(--gap-half);
      }
   }
}
</style>
