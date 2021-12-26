<template>
   <app-card title="Page" gap="large">
      <template #body>
         <div>
            <h5>SEO</h5>
            <p><small>Choose the title and description to appear on search engines and social posts.</small></p>
         </div>

         <app-input-field hgap="none" vgap="medium">
            <app-input v-model="title" hint="Title" expanded />
         </app-input-field>
         
         <app-input-field hgap="none" vgap="medium">
            <app-input v-model="description" hint="Description" :spellcheck="false" multiline expanded />
         </app-input-field>

         <app-input-field hgap="none" justify="start">
            <app-button :loading="loading" size="small" color="gradient-5" nogap @click="savePageSettings">
               Save changes
            </app-button>
         </app-input-field>
      </template>
   </app-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "PageSettings",
   data() {
      return {
         title: '',
         description: '',
         loading: false
      };
   },
   computed: {
      pageConfig() {
         return this.$store.getters['pageConfig/pageConfig']
      },
      payload() {
         return {
            title: this.title,
            description: this.description
         }
      }
   },
   mounted() {
      this.title = this.pageConfig.title || '';
      this.description = this.pageConfig.description || '';
   },
   methods: {
      async savePageSettings() {
         this.loading = true;
         try {
            await this.axios.put('/page-config', this.payload);
            this.$toast.success("Changes saved");
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.loading = false;
      }
   },
});
</script>
