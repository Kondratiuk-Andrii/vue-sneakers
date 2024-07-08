import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import Favorites from 'pages/Favorites.vue';
import Home from 'pages/Home.vue';
import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/favorites', name: 'Favorites', component: Favorites },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(router);
app.use(autoAnimatePlugin);
app.use(pinia);

app.mount('#app');
