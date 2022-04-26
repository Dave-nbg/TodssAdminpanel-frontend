import { createApp } from 'vue';
import App from './App.vue';
import LoginPage from './Views/inlog/loginpage';
import UserPage from './Views/users/userpage';
import CategoryPage from './Views/category/categorypage';
import LocationPage from './Views/location/locationpage';
import MenuItemPage from './Views/menuitem/menuitempage';
import {createRouter, createWebHistory} from "vue-router";
import './main.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: App },
        { path: '/inlog', name: 'Inlog' component: LoginPage},
        { path: '/gebruikers', component: UserPage},
        { path: '/categorieën', component: CategoryPage},
        { path: '/locaties', component: LocationPage},
        { path: '/menuitems', component: MenuItemPage}
    ],
})


const app = createApp(App);
app.use(router);
app.mount('#app');