<template>
   <div class="mockup-area">
      <link 
         v-if="themeSourceUrl" 
         rel="stylesheet" 
         itemprop="url" 
         @error="$toast.error('Failed to load theme')"
         :href="themeSourceUrl" />

      <keep-alive v-if="mockupComponent">
         <component 
            :is="mockupComponent" 
            :code="code"
            @content="handleContentEvent"></component>
      </keep-alive>
   </div>
</template>

<script>
import Vue from "vue";
import handlebars from "handlebars";
import { templateApi } from '../../http';
import { REMOTE_API_SERVER_URL } from "../../config";

export default Vue.extend({
   name: "AppMockup",
   data() {
      return {
         code: "",
         templateSource: "",
         mockupComponent: null,
         themeStateNonce: 0
      };
   },
   computed: {
      templateData() {
         return this.$store.getters.templateData;
      },
      pageConfigId() {
         return this.$store.getters.templateData.page._id;
      },
      templateName() {
         return this.$store.getters['pageConfig/pageConfig'].templateName;
      },
      themeName() {
         return this.$store.getters['pageConfig/pageConfig'].theme;
      },
      themeSourceUrl() {
         return `${REMOTE_API_SERVER_URL}/page/themes/source/${this.pageConfigId}?nonce=${this.themeStateNonce}`;
      }
   },
   watch: {
      async templateName() {
         await this.loadMockup();
         await this.loadTemplateSource();
      },
      themeName() {
         this.themeStateNonce++;
      },
      templateSource() {
         this.compile();
      }
   },

   async mounted() {
      await this.loadMockup();
      await this.loadTemplateSource();
      this.registerWatchers();

      window['pageAction'].call(this, "RENDER_SOCIAL_ICONS");
   },

   methods: {
      /** Compile remote template */
      compile() {
         const delegate = handlebars.compile(this.templateSource);
         const source = delegate(this.templateData);

         this.code = source;
      },

      /** Load custom mockup component */
      async loadMockup() {
         this.mockupComponent = (await import("./DefaultMobile.vue")).default;
      },

      /** Load template source */
      async loadTemplateSource() {
         let { templateName } = this;
         let response = null, endpoint = '/';

         if (!templateName) {
            templateName = 'default';
         }

         endpoint += templateName;

         try {
            response = await templateApi.get(endpoint);

            if (typeof response.data === 'string') {
               this.templateSource = response.data;
            }
         } catch (error) {
            this.$toast.error("Failed to get design template");
         }
      },

      /** Register update events */
      registerWatchers() {
         const watchers = [
            "templateData.user.fullname",
            "templateData.user.company",
            "templateData.user.bio",
            "templateData.user.imageHash",
            "templateData.social",
            "templateData.links"
         ];

         watchers.forEach((prop) => {
            this.$watch(prop, () => this.compile());
         });
      },

      handleContentEvent() {
         window['pageAction'].call(this, "RENDER_SOCIAL_ICONS");
      }
   },
});
</script>

<style scoped>
@keyframes mockup-screen-enter-view {
   from {
      opacity: 0;
      transform: translateX(-68px);
   }
   to {
      opacity: 1;
      transform: translateX(0);
   }
}

.mockup-area {
   display: flex;
   width: 40vw;
   height: 100%;
   justify-content: center;
   align-items: center;
   animation-name: mockup-screen-enter-view;
   animation-duration: 640ms;
}
</style>
