import { createApp } from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from "vue-router";
import './main.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App }
    ],
})


const app = createApp(App);
app.use(router);
app.mount('#app');