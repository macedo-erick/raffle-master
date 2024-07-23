/* eslint-disable no-useless-catch */
import type { SignInRequest } from '@/models/sign-in.model';
import { useBaseService } from '@/services/base.service';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthService = defineStore('auth', () => {
  const { instance } = useBaseService();

  const isUserAuthenticated = ref(!!localStorage.getItem('SESSION_ID'));
  const userAvatarLabel = ref(
    localStorage.getItem('FIRSTNAME')?.slice(0, 1) || ''
  );

  const signIn = async (signInRequest: SignInRequest) => {
    try {
      const { data } = await instance.post('/auth/signin/', signInRequest);

      localStorage.setItem('SESSION_ID', data.accessToken);
      localStorage.setItem('FIRSTNAME', data.firstName);

      isUserAuthenticated.value = true;
      userAvatarLabel.value = data.firstName.slice(0, 1);
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem('SESSION_ID');
    localStorage.removeItem('FIRSTNAME');

    isUserAuthenticated.value = false;
    userAvatarLabel.value = '';
  };

  return {
    isUserAuthenticated,
    userAvatarLabel,
    signIn,
    signOut
  };
});
