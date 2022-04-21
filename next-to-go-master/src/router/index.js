import Vue from 'vue';
import Router from 'vue-router';
import NextToGo from '@/components/NextToGo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NextToGo',
      component: NextToGo,
    },
  ],
});
