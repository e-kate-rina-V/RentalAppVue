import { createRouter, createWebHistory } from 'vue-router';
import MainLandlord from './components/MainLandlord.vue';
import MainRenter from './components/MainRenter.vue';
import Home from './components/Home.vue';

const routes = [
    {
        path: '/landlord',
        name: 'MainLandlord',
        component: MainLandlord,
    },
    {
        path: '/renter',
        name: 'MainRenter',
        component: MainRenter,
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
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
