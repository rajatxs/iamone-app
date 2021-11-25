<template>
   <div class="app-card">

      <!-- Card header -->
      <div v-if="title || $slots['controls']" class="card-header">
         <div class="card-title">
            <h4 class="title-text">{{ title }}</h4>
         </div>

         <div class="card-controls">
            <slot name="controls"></slot>
         </div>
      </div>

      <!-- Card body -->
      <div :class="bodyClasses">
         <slot name="body"></slot>
      </div>

      <!-- Card footer -->
      <div class="card-footer">
         <slot name="footer"></slot>
      </div>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
   name: 'AppCard',
   props: {
      title: {
         type: String,
         required: false
      },
      gap: {
         type: String,
         default: 'medium'
      }
   },
   computed: {
      bodyClasses() {
         const list = ['card-body']
         list.push('gap__' + this.gap)

         return list
      }
   }
})
</script>

<style scoped lang="scss">
.app-card {
   display: flex;
   flex-direction: column;
   margin-top: var(--gap);
   margin-bottom: var(--gap);
   border-radius: var(--radius);
   // box-shadow: rgb(0, 0, 0 / 12%) 0px 8px 16px;
   box-shadow: var(--shadow-small);
   background-color: var(--background);
}

.card-header {
   display: flex;
   justify-content: space-between;
   padding-left: var(--gap);
   padding-right: var(--gap);
   border-top-left-radius: inherit;
   border-top-right-radius: inherit;
   align-items: center;
   height: 48px;
   border-bottom: 1px solid var(--accents-2);

   .card-title .title-text {
      margin: 0;
   }
}

.card-body {
   &.gap__small {
      padding: var(--gap-quarter);
   }
   &.gap__medium {
      padding: var(--gap-half);
   }
   &.gap__large {
      padding: var(--gap);
   }
}
</style>
