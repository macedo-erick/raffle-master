<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { AuthStore } from '@/shared/services/auth.service';
import SignInComponent from '@/components/SignInComponent.vue';
import MenuComponent from '@/components/MenuComponent.vue';

const dialogVisible = ref(false);
const menu = ref();

const authState = AuthStore();

const { isUserAuthenticated, userAvatarLabel } = storeToRefs(authState);

const toggleMenu = (event: Event) => {
  menu.value.toggleMenu(event);
};
</script>

<template>
  <header
    class="bg-white fixed w-full top-0 h-24 flex items-center justify-between p-4 shadow-md"
  >
    <RouterLink to="/">
      <h1 class="text-3xl font-bold">{{ $t('messages.appTitle') }}</h1>
    </RouterLink>

    <Button
      v-if="!isUserAuthenticated"
      icon="pi pi-lock"
      rounded
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

    <MenuComponent ref="menu" />

    <SignInComponent v-model:visible="dialogVisible" />
  </header>
</template>

<style scoped></style>
