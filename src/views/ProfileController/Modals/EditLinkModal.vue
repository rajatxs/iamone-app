<template>
   <app-modal
      :title="modalTitle"
      width="510px"
      @close="$emit('close')"
      @blur="$emit('blur')">

      <div class="custom-link-editor">
         <div class="favicon-icon">
            <div class="favicon-icon-boundary">
               <app-loader v-if="faviconLoading" class="black favicon-loader" />
               <img
                  v-else
                  class="favicon-icon-image"
                  :src="favicon || '/icons/iamone.svg'"
               />
            </div>
         </div>

         <form ref="linkEditorForm" class="link-editor-inputs" @submit.prevent="dispatchAction">
            <app-input-field>
               <app-input
                  v-model="href"
                  :required="true"
                  :autofocus="true"
                  :autocapitalize="false"
                  autocomplete="url"
                  format="text"
                  hint="Link or URL"
                  expanded
                  @change="assignSiteMetadata"
               />
            </app-input-field>

            <app-input-field>
               <app-input 
                  v-model="title" 
                  required 
                  format="text" 
                  hint="Title" 
                  expanded />
            </app-input-field>

            <app-input-field>
               <app-input
                  v-model="description"
                  :minlines="3"
                  multiline
                  format="text"
                  hint="Description"
                  expanded
               />
            </app-input-field>

            <br />
            <br />
            <br />
         </form>
      </div>

      <template #footer>
         <app-button
            v-if="actionType === 'UPDATE'"
            class="stack-item"
            color="error"
            :loading="status.deletion"
            @click="deleteLink">
            Delete
         </app-button>

         <app-button
            class="stack-item"
            color="primary"
            @click="submitForm('linkEditorForm')"
            :loading="status.additionOrUpdation">
            {{ actionLabel }}
         </app-button>
      </template>
   </app-modal>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "EditLinkModal",
   props: {
      linkId: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         status: {
            additionOrUpdation: false,
            deletion: false
         },
         href: "",
         title: "",
         thumb: "",
         description: "",
         favicon: "",
         faviconLoading: false,
      };
   },
   computed: {
      links() {
         return this.$store.getters['links/links'];
      },
      actionType() {
         return this.linkId ? "UPDATE" : "ADD";
      },
      actionLabel() {
         return (this.actionType === 'ADD')? "Add": "Update";
      },
      modalTitle() {
         return (this.actionType === 'ADD')? "Add new link": 'Update link';
      },
      payload() {
         return {
            title: this.title,
            favicon: this.favicon,
            href: this.href,
            thumb: this.thumb,
            description: this.description,
         };
      },
      link() {
         let link = null;

         if (this.actionType === "UPDATE") {
            link = this.links.find((link) => link._id === this.linkId);
         }

         return link;
      },
   },
   created() {
      if (this.actionType === "UPDATE") {
         this.title = this.link.title;
         this.favicon = this.link.favicon;
         this.href = this.link.href;
         this.thumb = this.link.thumb;
         this.description = this.link.description;
      }
   },
   methods: {
      /** fetch public site metadata by url  */
      async fetchSiteMetadata(url) {
         const response = await this.axios.post('/clink/metadata', { url });
         return response.data;
      },

      async assignSiteMetadata() {
         let { href } = this;
         let data = null, result;

         if (href.length === 0) {
            return;
         }

         if (!href.startsWith("http")) {
            href = "http://" + href;
            this.href = href;
         }

         this.faviconLoading = true;

         data = await this.fetchSiteMetadata(href);

         this.faviconLoading = false;

         if (typeof data === "object" && data.result) {
            result = data.result;
            this.title = result.title;
            this.thumb = result.thumb;
            this.favicon = result.favicon;
            this.description = result.description;
         }
      },

      /** add new custom link */
      async addNewLink() {
         try {
            const response = await this.axios.post('/clink', this.payload);
            this.$emit("done");
            this.$toast.success(response.data.message);
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
      },

      /** update existing custom link */
      async updateCurrentLink() {
         try {
            const response = await this.axios.put('/clink/' + this.linkId, this.payload);
            this.$emit("done");
            this.$toast.success(response.data.message);
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
      },

      /** delete selected link */
      async deleteLink() {
         this.status.deletion = true;
         try {
            const response = await this.axios.delete('/clink/' + this.linkId);
            this.$emit("done");
            this.$toast.success(response.data.message);
         } catch (error) {
            this.$toast.error(error.response.data.message);
         }
         this.status.deletion = false;
      },

      async dispatchAction() {
         this.status.additionOrUpdation = true;
         switch (this.actionType) {
            case "ADD":
               await this.addNewLink();
               break;

            case "UPDATE":
               await this.updateCurrentLink();
               break;
         }
         this.status.additionOrUpdation = false;
      },
   },
});
</script>

<style scoped>
.custom-link-editor {
   display: flex;
}
.favicon-icon {
   width: 170px;
   margin-top: 32pt;
   text-align: center;
}
.favicon-icon .favicon-icon-boundary {
   display: flex;
   align-items: center;
   justify-content: center;
   margin-left: auto;
   margin-right: auto;
   width: 54pt;
   height: 54pt;
   padding: 10px;
   border-radius: 50%;
   border: 1px solid var(--accents-2);
   background-color: var(--accents-1);
   cursor: pointer;
}
.favicon-icon .favicon-icon-image {
   width: 80%;
   height: 80%;
}
.favicon-icon .favicon-loader {
   width: 28px;
   height: 28px;
}
.link-editor-inputs {
   width: 340px;
   margin-top: var(--gap);
}
@media (max-width: 480px) {
   .custom-link-editor {
      flex-direction: column;
      align-items: center;
   }
   .favicon-icon {
      margin-top: var(--gap-half);
   }
   .link-editor-inputs {
      width: 100%;
   }
}
</style>
