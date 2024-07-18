import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RaffleDetailView from '@/views/RaffleDetailView.vue';
import UserDetailView from '@/views/UserDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/raffle/:raffleId',
      name: 'Raffle Detail',
      component: RaffleDetailView
    },
    {
      path: '/user/:userId',
      name: 'User Detail',
      component: UserDetailView
    }
  ]
});

export default router;
