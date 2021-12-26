<template>
   <app-modal
      title="Share on"
      width="320pt"
      gap="small"
      @close="$emit('close')"
      @blur="$emit('close')">

      <div class="share-link-menu xstack justify-center pad-x-large gap-medium">
         <a
            v-for="platform in socialPlatforms"
            :key="platform.name"
            :href="platform.link"
            target="_blank"
            role="button"
            class="social-platform ystack align-center justify-center radius-small">

            <img
               class="platform-icon"
               :src="platform.icon"
               :alt="platform.name"
            />
            <small class="platform-name">{{ platform.name }}</small>
         </a>
      </div>
   </app-modal>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "ShareLinkModal",

   computed: {
      socialPlatforms() {
         const pageUrl = encodeURI(this.$livePageUrl);

         return [
            {
               name: "Facebook",
               icon: "/icons/facebook.svg",
               link: encodeURI(
                  `https://www.facebook.com/sharer.php?u=${pageUrl}`
               ),
            },

            {
               name: "Twitter",
               icon: "/icons/twitter.svg",
               link: encodeURI(
                  `https://twitter.com/intent/tweet?url=${pageUrl}&text=I created my link page on iamone.link`
               ),
            },
            {
               name: "WhatsApp",
               icon: "/icons/whatsapp.svg",
               link: encodeURI(
                  `https://api.whatsapp.com/send?text=I created page for my all links\n${pageUrl}`
               ),
            },
            {
               name: "LinkedIn",
               icon: "/icons/linkedin.svg",
               link: encodeURI(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
               ),
            },
         ];
      },
   },
});
</script>

<style>
.social-platform {
   height: 68pt;
   width: 60pt;
   cursor: pointer;
   transition: background-color 80ms linear;
}
.social-platform:hover {
   background-color: var(--accents-1);
}
.social-platform .platform-icon {
   width: 32pt;
   height: 32pt;
}
.social-platform .platform-name {
   margin-top: var(--gap-quarter);
   color: var(--accents-6);
}
</style>
