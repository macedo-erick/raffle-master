/* eslint-disable no-useless-catch */
import { type AxiosResponse } from 'axios';
import type { SignInRequest, SignInResponse } from '@/models/sign-in.model';
import BaseService from '@/services/base.service';

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
