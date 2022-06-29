import { createApp } from 'vue';
import App from './App.vue';
import LoginPage from './Views/inlog/loginpage.vue';
import UserPage from './Views/users/userpage.vue';
import CategoryPage from './Views/category/categorypage.vue';
import LocationPage from './Views/location/locationpage.vue';
import MenuItemPage from './Views/menuitem/menuitempage.vue';
import qrcodePage from './Views/qrcode/qrcodePage.vue';
import {createRouter, createWebHistory} from "vue-router";
import './main.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LoginPage },
        { path: '/inlog', component: LoginPage},
        { path: '/gebruikers', component: UserPage},
        { path: '/categorieen', component: CategoryPage},
        { path: '/locaties', component: LocationPage},
        { path: '/menuitems', component: MenuItemPage},
        { path: '/qrcode', component: qrcodePage}
    ],
})


const app = createApp(App);
app.use(router);
app.mount('#app');