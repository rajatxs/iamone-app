<template>
   <app-controller-view name="profile">
      <profile-meta-info-card />
      <social-card />
      <links-card />
      <br />
   </app-controller-view>
</template>

<script>
import Vue from "vue";
import ProfileMetaInfoCard from "./ProfileMetaInfoCard.vue";
import SocialCard from "./SocialCard.vue";
import LinksCard from "./LinksCard.vue";

export default Vue.extend({
   name: "ProfileController",
   components: {
      "profile-meta-info-card": ProfileMetaInfoCard,
      "social-card": SocialCard,
      "links-card": LinksCard
   },
});
</script>
