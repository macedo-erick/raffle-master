<script lang="ts" setup>
import { LocaleStore } from '@/store/locale.store';
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';
import { storeToRefs } from 'pinia';
import type { Raffle } from '@/models/raffle.model';

const localeStore = LocaleStore();

const { currentLocale } = storeToRefs(localeStore);
const props = defineProps<{ raffle: Raffle }>();
const createdBy = computed(() => props.raffle.createdBy);
const userAvatarLabel = computed(() => createdBy.value.firstName.slice(0, 1));

const truncatedRaffleDescription = computed(() => {
  const description = String(props.raffle.description);

  return description.length >= 400
    ? description.slice(0, 400).concat('...')
    : description;
});

const parsedRaffleEventDate = computed(() => {
  const raffleDate = new Date(props.raffle.raffleDate);

  return formatDistanceToNow(raffleDate, {
    addSuffix: true,
    locale: currentLocale.value.fns
  });
});
</script>

<template>
  <RouterLink :to="`/raffle/${props.raffle.id}`">
    <Card class="h-full">
      <template #title
        ><h2 class="text-base text-gray-700">
          {{ props.raffle.name }}
        </h2></template
      >

      <template #content>
        <h3 class="text-sm text-gray-600">
          {{ truncatedRaffleDescription }}
        </h3>
      </template>

      <template #footer>
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-400">
            {{ parsedRaffleEventDate }}
          </span>

          <RouterLink :to="`/user/${createdBy.id}`">
            <Avatar
              v-tooltip="{ value: createdBy.firstName }"
              :label="userAvatarLabel"
              shape="circle"
            />
          </RouterLink>
        </div>
      </template>
    </Card>
  </RouterLink>
</template>

<style scoped></style>
