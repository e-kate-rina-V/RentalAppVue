import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    key: "8b0ee0720a1b5dd20658",
    cluster: "mt1",
    forceTLS: true,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
