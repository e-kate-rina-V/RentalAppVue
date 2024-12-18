import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/landlord',
        name: 'MainLandlord',
        component: () => import('@/components/MainLandlord.vue'),
    },
    {
        path: '/renter',
        name: 'MainRenter',
        component: () => import('@/components/MainRenter.vue'),
    },
    {
        path: '/ads',
        name: 'PostedAds',
        component: () => import('@/components/PostedAds.vue'),
    },
    {
        path: '/ads/:id',
        name: 'AdDetails',
        component: () => import('@/components/AdDetails.vue'),
    },
    {
        path: '/chat/:chatId',
        name: 'chat',
        component: () => import('@/components/Chat.vue'),
    },
    {
        path: '/chats',
        name: 'UserChats',
        component: () => import('@/components/UserChats.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/components/Home.vue'),
    },
    {
        path: '/',
        redirect: '/home',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
