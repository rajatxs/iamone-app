<template>
   <div :class="authActionsClasses">
      <router-link
         v-for="action in actions"
         :key="action.key"
         :to="action.path"
         v-slot="{ isActive }">
         <button
            :class="authActionClasses"
            :data-active="isActive"
            :aria-label="action.label"
            @click="handleClickAction(action)">
            {{ action.label }}
         </button>
      </router-link>
   </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
   name: "AuthActions",
   computed: {
      authActionsClasses() {
         return [
            "auth-actions",
            "xstack",
            "justify-space-evenly",
            "align-center",
            "pad-small",
            "margin-x-auto",
            "gap-small",
            "radius-large",
         ];
      },
      authActionClasses() {
         return [
            "auth-action",
            "xstack",
            "align-center",
            "justify-center",
            "nooutline",
            "noborder",
            "h-inherit",
            "cursor-pointer",
            "color-inherit",
         ];
      },
      actions() {
         return [
            {
               label: "Login",
               key: "LOGIN",
               path: "/auth/login",
            },
            {
               label: "Signup",
               key: "SIGNUP",
               path: "/auth/signup",
            },
         ];
      },
   },
   mounted() {
      switch (this.$route.path) {
         case "/auth/login":
            this.$emit("change", this.actions[0]);
            break;

         case "/auth/signup":
            this.$emit("change", this.actions[1]);
            break;
      }
   },
   methods: {
      handleClickAction(action) {
         this.$emit("change", action);
         this.$router.push(action.path);
      },
   },
});
</script>

<style scoped>
.auth-actions {
   width: 190px;
   height: 26px;
   margin-top: var(--gap);
   border: 1px solid var(--accents-2);
}
.auth-action {
   flex: 1;
   border-radius: inherit;
   font-size: 92%;
   background-color: transparent;
   transition: background-color 40ms linear;
}
.auth-action:hover {
   background-color: var(--accents-1);
}
.auth-action[data-active] {
   font-weight: 500;
   background-color: var(--accents-2);
   background-image: linear-gradient(
      270deg,
      var(--foreground) 0%,
      var(--foreground-light) 100%
   );
   color: var(--foreground);
}
</style>
