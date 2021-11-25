<template>
   <app-view name="settings">
     <AccountSettings />
     <RiskZone />
   </app-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AccountSettings from './AccountSettings.vue'
import RiskZone from './RiskZone.vue'

export default defineComponent({
   name: 'SettingsController',
   components: {
      AccountSettings,
      RiskZone
   }
})
</script>
