// 采用异步按需加载组件模式
import Index from '../views/index.vue';
// const Index = () => import('../views/index.vue');

const routes = [
  {
    path: '/',
    redirect: 'index'
  },
  {
    path: '/index',
    meta: {keepAlive: false},
    component: Index
  }
];

export default routes;
