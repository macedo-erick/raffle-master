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
import Tag from 'primevue/tag';
import ScrollPanel from 'primevue/scrollpanel';

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
        maxTicketsError: 'You can only purchase 5000 tickets at a time',
        buyButtonLabel: 'Buy',
        buyButtonLabelNotAuthenticated:
          'You need to be logged in to buy tickets',
        ticketsPurchasedSuccess:
          'Purchase of tickets made successfully. You will receive a notification once your tickets have been generated',
        pixGuide: "Open your bank's app, scan the image or paste the QR Code",
        pixGuideLine2:
          'Do not close this page, your tickets will be generated when payment is detected',
        copyQrCode: 'Copy QR Code',
        copiedToClipboard: 'QR Code copied to clipboard',
        awaitingPayment: 'Awaiting payment',
        paymentCompleted: 'Payment completed'
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
        maxTicketsError: 'Você só comprar 5000 números por vez',
        buyButtonLabel: 'Comprar',
        buyButtonLabelNotAuthenticated:
          'Você precisa estar logado para comprar entradas',
        ticketsPurchasedSuccess:
          'Compra de entradas realizada com sucesso. Você receberá uma notificação assim que suas entradas forem geradas',
        pixGuide:
          'Abra o app do seu banco, escaneie a imagem ou cole o código QR Code',
        pixGuideLine2:
          'Não feche esta página, os números serão gerados quando o pagamento for detectado',
        copyQrCode: 'Copiar QR Code',
        copiedToClipboard: 'QR Code copiado para a área de transferência',
        awaitingPayment: 'Aguardando pagamento',
        paymentCompleted: 'Pagamento realizado'
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
      preset: Aura,
      options: {
        cssLayer: {
          name: 'primevue',
          order: 'tailwind-base, primevue, tailwind-utilities'
        }
      }
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
  .component('Tag', Tag)
  .component('ScrollPanel', ScrollPanel)
  .directive('tooltip', Tooltip)
  .mount('#app');
