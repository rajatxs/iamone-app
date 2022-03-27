<template>
   <app-controller-view name="analytics">
      <app-feature-preview
         :icon="'/icons/iamone-analytics.svg' | STATIC_URL" 
         title="Analytics"
         desc="We are working on this feature" />
   </app-controller-view>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
   name: 'AnalyticsController'
})
</script>
