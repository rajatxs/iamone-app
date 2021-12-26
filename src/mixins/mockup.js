import Vue from 'vue'

export default Vue.extend({
   computed: {
      mockupScreen() {
         return this.$refs['mockupScreen'];
      }
   },
   mounted() {
      this.observeMockupContent();
   },
   methods: {
      observeMockupContent() {
         const { mockupScreen } = this;
         const observer = new MutationObserver((mutationList) => {
            mutationList.forEach(mutation => {
               if (mutation.addedNodes.length) {
                  this.$emit('content', mockupScreen);
               }
            })
         });

         observer.observe(mockupScreen, {
            subtree: false,
            childList: true
         });
      }
   }
});
