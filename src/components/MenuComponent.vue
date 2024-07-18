<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import { AuthStore } from '@/store/auth.store';

const { signOut } = AuthStore();

const menu = ref();
const menuItems: Ref<MenuItem[]> = ref([
  {
    label: 'menuProfileLabel',
    items: [
      {
        label: 'menuLogoutLabel',
        icon: 'pi pi-sign-out',
        command: signOut
      }
    ]
  }
]);

const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};

defineExpose({ toggleMenu });
</script>

<template>
  <Menu ref="menu" :model="menuItems" :popup="true">
    <template #submenulabel="{ item }">
      <span>{{ $t(`messages.${item.label}`) }}</span>
    </template>

    <template #item="{ item, props }">
      <a v-ripple class="flex items-center" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ $t(`messages.${item.label}`) }}</span>
      </a>
    </template>
  </Menu>
</template>

<style scoped></style>
