import './assets/styles.scss';

import { createApp } from 'vue';
import router from './router';

import App from './App.vue';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';

import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';

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
import Chip from 'primevue/chip';
import InputNumber from 'primevue/inputnumber';
import ProgressBar from 'primevue/progressbar';
import Galleria from 'primevue/galleria';

const app = createApp(App);

const pinia = createPinia();
const i18n = createI18n({
  fns: 'pt-BR',
  legacy: false,
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {
      messages: {
        appTitle: 'Raffle Master',
        pendingRaffles: 'Pending Raffles',
        finishedRaffles: 'Finished Raffles',
        createRaffle: 'Create Raffle',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm Password',
        signInButton: 'Sign In',
        signUpButton: 'Sign Up',
        forgotPassword: 'Forgot Password?',
        menuProfileLabel: 'Profile',
        menuLogoutLabel: 'Logout',
        createdDate: 'Created',
        raffleDate: 'Raffle date',
        raffleTickets: 'My tickets',
        buyRaffleTickets: 'Buy tickets',
        maxTicketsError: 'You can only purchase 500 tickets at a time',
        ticketsPurchasedSuccess: 'Tickets purchased successfully'
      }
    },
    'pt-BR': {
      messages: {
        appTitle: 'Mestre das Rifas',
        pendingRaffles: 'Sorteios Pendentes',
        finishedRaffles: 'Sorteios Concluídos',
        createRaffle: 'Criar Sorteio',
        emailLabel: 'Email',
        passwordLabel: 'Senha',
        confirmPasswordLabel: 'Confirmação de senha',
        signInButton: 'Login',
        signUpButton: 'Cadastro',
        forgotPassword: 'Esqueceu sua senha?',
        menuProfileLabel: 'Perfil',
        menuLogoutLabel: 'Sair',
        createdDate: 'Criado',
        raffleDate: 'Data so sorteio',
        raffleTickets: 'Meus números',
        buyRaffleTickets: 'Comprar números',
        maxTicketsError: 'Você só comprar 500 números por vez',
        ticketsPurchasedSuccess: 'Entradas compradas com sucesso'
      }
    }
  }
});

app
  .use(i18n)
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
  .component('Chip', Chip)
  .component('ProgressBar', ProgressBar)
  .component('InputNumber', InputNumber)
  .component('Galleria', Galleria)
  .directive('tooltip', Tooltip)
  .mount('#app');
