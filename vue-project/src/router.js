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

// router.beforeEach((to, from, next) => {
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (!user && (to.path === '/landlord' || to.path === '/renter')) {
//         return next('/home');
//     }

//     if (to.path === '/landlord' && user?.role !== 'landlord') {
//         return next('/home');
//     }

//     if (to.path === '/renter' && user?.role !== 'renter') {
//         return next('/home');
//     }

//     if (to.path === '/home' && user) {
//         if (user.role === 'landlord') return next('/landlord');
//         if (user.role === 'renter') return next('/renter');
//     }

//     next();
// });


export default router;
