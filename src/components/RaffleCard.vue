<script lang="ts" setup>
import { computed } from 'vue';
import { formatDistanceToNow } from 'date-fns';

const props = defineProps({
  title: { required: true, type: String },
  description: {
    required: true,
    type: String
  },
  createdBy: {
    required: true,
    type: String
  },
  raffleDate: {
    required: true,
    type: Date
  }
});

const truncatedDescription = computed(() => {
  const description = String(props.description);

  return description.length >= 400
    ? description.slice(0, 400).concat('...')
    : description;
});

const formattedRaffleDate = computed(() => {
  const raffleDate = new Date(props.raffleDate);

  return formatDistanceToNow(raffleDate, {
    addSuffix: true
  });
});

const createdBy = computed(() => props.createdBy?.slice(0, 1));
</script>

<template>
  <li>
    <RouterLink to="/">
      <Card class="h-full">
        <template #title
          ><h2 class="text-base text-gray-700">
            {{ props.title }}
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

            <Avatar
              v-tooltip="{ value: props.createdBy }"
              :label="createdBy"
              shape="circle"
            />
          </div>
        </template>
      </Card>
    </RouterLink>
  </li>
</template>

<style scoped></style>
