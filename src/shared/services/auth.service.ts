/* eslint-disable no-useless-catch */
import { type AxiosResponse } from 'axios';
import type { SignInRequest, SignInResponse } from '@/models/sign-in.model';
import BaseService from '@/shared/services/base.service';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const AuthService = () => {
  const baseService = BaseService('auth');

  const signIn = (
    signInRequest: SignInRequest
  ): Promise<AxiosResponse<SignInResponse>> => {
    return baseService.post('/sign-in', signInRequest);
  };

  return {
    signIn
  };
};

export const AuthStore = defineStore('auth', () => {
  const authService = AuthService();

  const isUserAuthenticated = ref(!!localStorage.getItem('SESSION_ID'));
  const userAvatarLabel = ref(
    localStorage.getItem('FIRSTNAME')?.slice(0, 1) || ''
  );

  const signIn = async (signInRequest: SignInRequest) => {
    try {
      const { data } = await authService.signIn(signInRequest);

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
