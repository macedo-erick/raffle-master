import './assets/styles.scss';

import { createApp } from 'vue';
import router from './router';

import App from './App.vue';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';

import { createPinia } from 'pinia';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Tooltip from 'primevue/tooltip';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const app = createApp(App);
const pinia = createPinia();

app
  .use(pinia)
  .use(router)
  .use(ToastService)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .component('Button', Button)
  .component('Card', Card)
  .component('Menu', Menu)
  .component('Avatar', Avatar)
  .component('Toast', Toast)
  .component('Dialog', Dialog)
  .component('FloatLabel', FloatLabel)
  .component('InputText', InputText)
  .component('Password', Password)
  .directive('tooltip', Tooltip)
  .mount('#app');
