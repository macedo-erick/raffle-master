<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import { useI18n } from 'vue-i18n';
import { useAuthService } from '@/services/auth.service';

const { signOut } = useAuthService();

const { t } = useI18n();
const menu = ref();
const menuItems: Ref<MenuItem[]> = ref([
  /**
   * TODO: Add Raffle section with items: My Raffles, New Raffle
   */
  {
    label: t('messages.menuProfileLabel'),
    items: [
      {
        label: t('messages.menuLogoutLabel'),
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
  <Menu ref="menu" :model="menuItems" :popup="true" />
</template>

<style scoped></style>
