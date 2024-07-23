import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export enum PageState {
  LOADING = 'LOADING',
  LOADED = 'LOADED'
}

export const useBaseService = defineStore('baseService', () => {
  const pageState = ref(PageState.LOADED);

  const instance = ref(
    axios.create({
      baseURL: `http://localhost:3000`
    })
  );

  instance.value.interceptors.request.use((config) => {
    pageState.value = PageState.LOADING;

    const sessionId = localStorage.getItem('SESSION_ID');

    if (sessionId) {
      config.headers.Authorization = `Bearer ${sessionId}`;
    }

    return config;
  });

  instance.value.interceptors.response.use((res) => {
    pageState.value = PageState.LOADED;

    return res;
  });

  return { pageState, instance };
});
