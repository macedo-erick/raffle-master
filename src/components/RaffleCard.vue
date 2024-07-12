<script lang="ts" setup>
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';

const props = defineProps({
  raffle: {
    type: Object,
    required: true
  }
});

const truncatedDescription = computed(() => {
  const description = String(props.raffle.description);

  return description.length >= 400
    ? description.slice(0, 400).concat('...')
    : description;
});

const formattedRaffleDate = computed(() => {
  const raffleDate = new Date(props.raffle.raffleDate);

  return formatDistanceToNow(raffleDate, {
    addSuffix: true
  });
});

const createdBy = computed(() => props.raffle.createdBy?.slice(0, 1));
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
          {{ truncatedDescription }}
        </h3>
      </template>

      <template #footer>
        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-400">
            {{ formattedRaffleDate }}
          </span>

          <RouterLink :to="`/user/${createdBy}`">
            <Avatar
              v-tooltip="{ value: props.raffle.createdBy }"
              :label="createdBy"
              shape="circle"
            />
          </RouterLink>
        </div>
      </template>
    </Card>
  </RouterLink>
</template>

<style scoped></style>
