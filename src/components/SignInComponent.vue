<script lang="ts" setup>
import type { SignInRequest } from '@/models/sign-in.model';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/models/error.model';
import { type Ref, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { AuthStore } from '@/shared/services/auth.service';

const authStore = AuthStore();

const toastService = useToast();
const visible = defineModel('visible', { default: false });

const signInRequest: Ref<SignInRequest> = ref({
  email: '',
  password: ''
});

const signIn = async () => {
  try {
    await authStore.signIn(signInRequest.value);

    visible.value = false;

    signInRequest.value = {
      email: '',
      password: ''
    };
  } catch (err) {
    const errorData = (err as AxiosError).response?.data as ErrorResponse;

    toastService.add({
      summary: 'Error',
      severity: 'error',
      detail: `${errorData.status} - ${errorData.error}`,
      life: 3000
    });
  }
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :dismissableMask="true"
    modal
    position="topright"
  >
    <form class="flex flex-col py-8 px-4 gap-8">
      <FloatLabel>
        <InputText id="email" v-model="signInRequest.email" class="w-full" />
        <label for="email">Email</label>
      </FloatLabel>

      <FloatLabel>
        <Password
          id="password"
          v-model="signInRequest.password"
          class="w-full"
          toggleMask
        />
        <label for="password">Password</label>
      </FloatLabel>

      <div class="actions__container flex justify-center">
        <Button label="Sign in" severity="contrast" @click="signIn" />
      </div>
    </form>
  </Dialog>

  <Toast />
</template>
<style scoped></style>
