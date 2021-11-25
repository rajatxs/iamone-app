<template>
   <app-modal
      title="Add new social link"
      width="510px"
      height="350px"
      @close="$emit('close')"
      @blur="$emit('blur')"
   >
      <div class="custom-link-editor">
         <div class="favicon-icon">
            <div class="favicon-icon-boundary">
               <app-loader v-if="faviconLoading" class="black favicon-loader" />
               <img
                  v-else
                  class="favicon-icon-image"
                  :src="favicon || socialIconPath('im1')"
               />
            </div>
         </div>

         <div class="link-editor-inputs">
            <app-input-field>
               <app-input
                  v-model="href"
                  format="text"
                  hint="Link or URL"
                  expanded
                  @change="assignSiteMetadata"
               />
            </app-input-field>

            <app-input-field>
               <app-input v-model="title" format="text" hint="Title" expanded />
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
         </div>
      </div>

      <template #footer>
         <app-button
            v-if="actionType === 'UPDATE'"
            class="stack-item"
            background="red"
            @click="handleDeleteAction"
         >
            Delete
         </app-button>

         <app-button
            class="stack-item"
            background="blue"
            @click="dispatchAction"
            :loading="loading"
         >
            Save
         </app-button>
      </template>
   </app-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { createNamespacedHelpers } from "vuex"
import { Clink } from "@/types/clink"
import { socialIconPath } from "@/utils/common"
import { fetchSiteMetadata } from "@/utils/fetch"
import toast from "@/utils/toast"

const { 
   mapGetters: mapCLinkGetters, 
   mapActions: mapCLinkActions 
} = createNamespacedHelpers("clink")

export default defineComponent({
   name: "EditCustomLinkModal",
   props: {
      linkId: {
         type: String,
         required: true,
      },
   },
   data() {
      return {
         loading: false,
         href: "",
         title: "",
         thumb: "",
         description: "",
         favicon: "",
         faviconLoading: false,
      }
   },
   computed: {
      ...mapCLinkGetters(["clinks"]),

      actionType(): "ADD" | "UPDATE" {
         return this.linkId ? "UPDATE" : "ADD"
      },
      payload(): Partial<Clink> {
         return {
            title: this.title,
            favicon: this.favicon,
            href: this.href,
            thumb: this.thumb,
            description: this.description,
         }
      },
      link(): Partial<Clink> {
         let link = null

         if (this.actionType === "UPDATE") {
            link = (this.clinks as Clink[]).find(
               (link) => link._id === this.linkId
            )
         }

         return link
      },
   },
   created() {
      if (this.actionType === "UPDATE") {
         this.title = this.link.title
         this.favicon = this.link.favicon
         this.href = this.link.href
         this.thumb = this.link.thumb
         this.description = this.link.description
      }
   },
   methods: {
      ...mapCLinkActions(["addCLink", "updateCLink"]),

      socialIconPath,
      async assignSiteMetadata() {
         let { href } = this
         let data = null,
            result

         if (href.length === 0) {
            return
         }

         if (!href.startsWith("http")) {
            href = "http://" + href
            this.href = href
         }

         this.faviconLoading = true

         data = await fetchSiteMetadata(href)

         this.faviconLoading = false

         if (typeof data === "object" && data.result) {
            result = data.result
            this.title = result.title
            this.thumb = result.thumb
            this.favicon = result.favicon
            this.description = result.description
         }
      },
      async addNewLink() {
         const { payload } = this

         try {
            await this.addCLink(payload)
            this.$emit("done")
            toast.success({
               text: "Link has been added",
               duration: 1200,
            })
         } catch (error) {
            console.log(error)
            toast.error({
               text: "Failed to add new link",
               duration: 1200,
            })
         }
      },
      async updateCurrentLink() {
         const { payload } = this

         payload._id = this.linkId

         try {
            console.log("PAYLOAD", payload)
            this.updateCLink(payload)
            this.$emit("done")
            toast.success({
               text: "Link has been updated",
               duration: 1200,
            })
         } catch (error) {
            toast.error({
               text: "Failed to update link",
               duration: 1200,
            })
         }
      },
      async dispatchAction() {
         this.loading = true
         switch (this.actionType) {
            case "ADD":
               await this.addNewLink()
               break

            case "UPDATE":
               await this.updateCurrentLink()
               break
         }
         this.loading = false
      },
      handleDeleteAction() {
         this.$emit("delete", this.linkId)
         this.$emit("close")
      },
   },
})
</script>

<style lang="scss" scoped>
.custom-link-editor {
   display: flex;
}

.favicon-icon {
   width: 170px;
   margin-top: 32pt;
   text-align: center;

   .favicon-icon-boundary {
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
   .favicon-icon-image {
      width: 80%;
      height: 80%;
   }

   .favicon-loader {
      width: 28px;
      height: 28px;
   }
}
.link-editor-inputs {
   width: 340px;
   margin-top: var(--gap);
}
</style>
