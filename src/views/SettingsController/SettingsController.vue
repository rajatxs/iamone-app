<template>
   <app-controller-view name="settings">
     <page-settings />
     <account-settings />
     <risk-zone />

     <br />
   </app-controller-view>
</template>

<script>
import Vue from 'vue'
import AccountSettings from './AccountSettings.vue'
import RiskZone from './RiskZone.vue'
import PageSettings from './PageSettings.vue'

export default Vue.extend({
   name: 'SettingsController',
   components: {
      'account-settings': AccountSettings,
      'risk-zone': RiskZone,
      'page-settings': PageSettings
   }
})
</script>
