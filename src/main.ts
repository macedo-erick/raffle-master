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

const app = createApp(App);

const pinia = createPinia();
const i18n = createI18n({
  locale: 'pt-BR',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {
      messages: {
        appTitle: 'Raffle Master',
        home: 'Home',
        myAccount: 'My Account',
        pendingRaffles: 'Pending Raffles',
        finishedRaffles: 'Finished Raffles',
        createRaffle: 'Create Raffle',
        name: 'Name',
        description: 'Description',
        prize: 'Prize',
        date: 'Date',
        create: 'Create',
        close: 'Close',
        success: 'Success',
        error: 'Error',
        raffleCreated: 'Raffle created successfully!',
        raffleNotCreated: 'An error occurred while creating the raffle.',
        raffleDeleted: 'Raffle deleted successfully!',
        raffleNotDeleted: 'An error occurred while deleting the raffle.',
        emailLabel: 'Email',
        passwordLabel: 'Password',
        confirmPasswordLabel: 'Confirm Password',
        signInButton: 'Sign In',
        signUpButton: 'Sign Up',
        forgotPassword: 'Forgot Password?',
        menuProfileLabel: 'Profile',
        menuLogoutLabel: 'Logout'
      }
    },
    'pt-BR': {
      messages: {
        appTitle: 'Mestre das Rifas',
        home: 'Início',
        myAccount: 'Minha Conta',
        pendingRaffles: 'Sorteios Pendentes',
        finishedRaffles: 'Sorteios Concluídos',
        createRaffle: 'Criar Sorteio',
        name: 'Nome',
        description: 'Descrição',
        prize: 'Prêmio',
        date: 'Data',
        create: 'Criar',
        close: 'Fechar',
        success: 'Sucesso',
        error: 'Erro',
        raffleCreated: 'Sorteio criado com sucesso!',
        raffleNotCreated: 'Ocorreu um erro ao tentar criar o sorteio.',
        raffleDeleted: 'Sorteio excluído com sucesso!',
        raffleNotDeleted: 'Ocorreu um erro ao tentar deletar o sorteio',
        menuProfileLabel: 'Perfil',
        menuLogoutLabel: 'Sair'
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
  .directive('tooltip', Tooltip)
  .mount('#app');
