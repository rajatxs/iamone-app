<template>
   <div :class="previewLinkClasses">
      <a
         :class="previewLinkTextClasses"
         :href="$livePageUrl"
         target="_blank">{{ $livePageUrl }}</a>

      <div :class="linkClipboardActionClasses" @click="copyToClipboard">
         <clipboard-icon />
      </div>
   </div>
</template>

<script>
import Vue from "vue";
import ClipboardIcon from "../../assets/vue-icons/clipboard.vue";

export default Vue.extend({
   name: "PreviewLink",
   components: {
      "clipboard-icon": ClipboardIcon,
   },
   computed: {
      previewLinkClasses() {
         return [
            'app-preview-link',
            'hide-under-phone',
            'xstack',
            'radius-medium',
            'align-center',
            'color-inherit',
         ]
      },
      previewLinkTextClasses() {
         return [
            'preview-link-text',
            'h-100',
            'xstack',
            'align-center',
            'pad-x-medium',
            'color-inherit'
         ]
      },
      linkClipboardActionClasses() {
         return [
            'link-clipboard-action',
            'h-100',
            'xstack',
            'justify-center',
            'align-center',
            'cursor-pointer'
         ]
      }
   },
   methods: {
      copyToClipboard() {
         try {
            window.navigator.clipboard.writeText(this.$livePageUrl);
            this.$toast.success("Copied to clipboard");
         } catch (error) {
            this.$toast.error("Can't access your clipboard");
         }
      }
   }
});
</script>

<style>
.app-preview-link {
   height: 28pt;
   font-size: 10.2pt;
   background-color: var(--background);
   border: 1px solid var(--accents-2);
}
@media (max-width: 480px) {
   .app-preview-link {
      display: none;
   }
}

.preview-link-text {
   border-top-left-radius: inherit;
   border-bottom-left-radius: inherit;
   transition: background-color 120ms linear;
}
.preview-link-text:hover {
   background-color: var(--accents-1);
}
.link-clipboard-action {
   width: 28pt;
   border-top-right-radius: inherit;
   border-bottom-right-radius: inherit;
   background-color: transparent;
   transition: background-color 120ms linear;
}
.link-clipboard-action:hover {
   background-color: var(--foreground);
   color: var(--primary-fr);
}
.link-clipboard-action .app-icon {
   width: 11pt;
   height: 11pt;
}

body.dark .app-preview-link {
   background-color: transparent;
}
body.dark .preview-link-text:hover,
body.dark .link-clipboard-action:hover {
   background-color: var(--accents-1);
}
</style>
