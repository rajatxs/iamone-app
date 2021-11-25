<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ icon: string, title: string, desc?: string }>()
</script>

<template>
   <div class="feature-preview">
      <div class="feature-icon">
         <img 
            class="feature-icon-image" 
            :src="icon"
            :alt="title" />
      </div>

      <div class="feature-info">
         <div class="feature-name"><h3>{{ title }}</h3></div>
         <div v-if="desc" class="feature-desc">{{ desc }}</div>
      </div>
   </div>
</template>

<style lang="scss">
.feature-preview {
   display: flex;
   flex-direction: column;
   width: 100%;
   height: 100%;
   margin-top: 42pt;
   align-items: center;

   .feature-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background-color: transparent;

      .feature-icon-image {
         width: 70px;
         height: 70px;
      }
   }

   .feature-info {
      margin-top: 6pt;
      text-align: center;
   }
}
</style>
