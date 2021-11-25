<template>
   <app-view name="profile">
      <ProfileMetaInfoCard />
      <SocialLinkCard />
      <CustomLinkCard />

      <br />
   </app-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileMetaInfoCard from "./ProfileMetaInfoCard.vue"
import SocialLinkCard from "./SocialLinkCard.vue"
import CustomLinkCard from "./CustomLinkCard.vue"

export default defineComponent({
   name: 'ProfileController',

   components: {
      ProfileMetaInfoCard,
      SocialLinkCard,
      CustomLinkCard
   }
})
</script>
