<script lang="ts" setup>
import type { SignInRequest } from '@/models/sign-in.model';
import type { AxiosError } from 'axios';
import type { ErrorResponse } from '@/models/error.model';
import { type Ref, ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useAuthService } from '@/services/auth.service';

const authService = useAuthService();
const toastService = useToast();

const dialogVisible = defineModel('dialogVisible', { default: false });
const signInRequest: Ref<SignInRequest> = ref({
  email: '',
  password: ''
});

const signIn = async () => {
  try {
    await authService.signIn(signInRequest.value);

    dialogVisible.value = false;

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
    v-model:visible="dialogVisible"
    :dismissableMask="true"
    modal
    position="topright"
  >
    <form class="flex flex-col py-8 px-4 gap-8" @keyup.enter="signIn">
      <FloatLabel>
        <InputText id="email" v-model="signInRequest.email" class="w-full" />
        <label for="email">{{ $t('messages.emailLabel') }}</label>
      </FloatLabel>

      <FloatLabel>
        <Password
          id="password"
          v-model="signInRequest.password"
          class="w-full"
          toggleMask
        />
        <label for="password">{{ $t('messages.passwordLabel') }}</label>
      </FloatLabel>

      <div class="actions__container flex justify-center">
        <Button
          :label="$t('messages.signInButton')"
          severity="contrast"
          @click="signIn"
        />
      </div>
    </form>
  </Dialog>
</template>
<style scoped></style>
