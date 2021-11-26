<template>
   <div class="app-preview-link hide-under-phone xstack radius-medium align-center">
      <a class="preview-link-text xstack align-center" :href="link" target="_blank">{{ link }}</a>

      <div class="link-clipboard-action xstack justify-center align-center" @click="copyToClipboard">
         <ClipboardIcon />
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { toRemoteUrl } from '@/utils/common'
import toast from '@/utils/toast'
import ClipboardIcon from '@/components/Icons/clipboard.vue'

export default defineComponent({
   name: 'PreviewLink',
   components: {
      ClipboardIcon
   },

   setup() {
      const store = useStore()
      const user = store.getters['user/user']
      const link = computed(() => toRemoteUrl('/' + user.username))

      return { link }
   },

   methods: {
      copyToClipboard() {
         try {
            window.navigator.clipboard.writeText(this.link)
            toast.success("Copied to clipboard")
         } catch (error) {
            toast.error("Can't access your clipboard")
         }
      }
   }
})
</script>

<style lang="scss">
@import "../../scss/mixins/scale";

.app-preview-link {
   color: inherit;
   height: 32pt;
   font-size: 11.2pt;
   border: 1px solid var(--accents-2);
   background-color: var(--background);
}
.preview-link-text {
   height: 100%;
   border-top-left-radius: inherit;
   border-bottom-left-radius: inherit;
   padding-left: var(--gap-half);
   padding-right: var(--gap-quarter);
   color: inherit;
   transition: background-color 120ms linear;

   &:hover {
      background-color: var(--accents-1);
   }
}
.link-clipboard-action {
   cursor: pointer;
   height: 100%;
   width: 28pt;
   border-top-right-radius: inherit;
   border-bottom-right-radius: inherit;
   background-color: transparent;
   transition: background-color 120ms linear;

   &:hover {
      background-color: var(--foreground);
      color: var(--primary-fr);
   }
   .app-icon {
      width: 11pt;
      height: 11pt;
   }
}
</style>
