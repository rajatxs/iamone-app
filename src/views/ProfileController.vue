<script setup lang="ts">
import ProfileMetaInfoCard from "../components/ProfileView/ProfileMetaInfoCard.vue"
import SocialLinkCard from "../components/ProfileView/SocialLinkCard.vue"
import CustomLinkCard from "../components/ProfileView/CustomLinkCard.vue"
</script>

<template>
   <app-view name="profile">
      <ProfileMetaInfoCard />
      <SocialLinkCard />
      <CustomLinkCard />

      <br />
   </app-view>
</template>
