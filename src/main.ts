import './assets/styles.scss';

import { createApp } from 'vue';
import router from './router';

import App from './App.vue';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);

app
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura
    }
  })
  .component('Button', Button)
  .component('Card', Card)
  .component('Avatar', Avatar)
  .directive('tooltip', Tooltip)
  .mount('#app');
