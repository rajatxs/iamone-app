<template>
   <div class="feature-preview h-100 ystack align-center">
      <div class="feature-icon xstack justify-center align-center rounded">
         <img class="feature-icon-image" :src="icon" :alt="title" />
      </div>

      <div class="feature-info text-center">
         <div class="feature-name">
            <h3>{{ title }}</h3>
         </div>
         <div v-if="desc" class="feature-desc">{{ desc }}</div>
      </div>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AppFeaturePreview",
   props: {
      icon: {
         type: String,
         required: true,
      },
      title: {
         type: String,
         required: true,
      },
      desc: {
         type: String,
         required: false,
      },
   },
});
</script>

<style>
.feature-preview {
   margin-top: 42pt;
}
.feature-icon {
   width: 110px;
   height: 110px;
}
.feature-icon .feature-icon-image {
   width: 70px;
   height: 70px;
}
.feature-info {
   margin-top: 6pt;
}
</style>
