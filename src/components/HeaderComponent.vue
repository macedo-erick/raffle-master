<script lang="ts" setup>
import { AuthStore } from '@/shared/services/auth.service';
import { type Ref, ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import SignInComponent from '@/components/SignInComponent.vue';
import { storeToRefs } from 'pinia';

const authState = AuthStore();
const { isUserAuthenticated, userAvatarLabel } = storeToRefs(authState);

const dialogVisible = ref(false);

const menu = ref();

const menuItems: Ref<MenuItem[]> = ref([
  {
    label: 'Profile',
    items: [
      { label: 'Logout', icon: 'pi pi-sign-out', command: authState.signOut }
    ]
  }
]);

const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <header
    class="bg-white fixed w-full top-0 h-24 flex items-center justify-between p-4 shadow-md"
  >
    <RouterLink to="/">
      <h1 class="text-3xl font-bold">Raffle Master</h1>
    </RouterLink>

    <Button
      v-if="!isUserAuthenticated"
      icon="pi pi-lock"
      severity="secondary"
      @click="dialogVisible = true"
    />

    <Avatar
      v-if="isUserAuthenticated"
      :label="userAvatarLabel"
      class="hover:cursor-pointer select-none"
      shape="circle"
      @click="toggleMenu"
    />

    <Menu ref="menu" :model="menuItems" :popup="true" />

    <SignInComponent v-model:visible="dialogVisible" />
  </header>
</template>

<style scoped></style>
