<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faFilter, faLocationDot, faBurger, faNavicon, faQrcode} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {reactive, ref} from "vue";

library.add(faUser, faFilter, faLocationDot, faBurger, faNavicon, faQrcode);


let navIsOpen = ref(false);

function toggleNav() {
    navIsOpen.value = !navIsOpen.value;
}
</script>

<template>
    <nav class="bg-primary-500 w-screen sm:hidden">
        <button class="m-2 p-2 hover:bg-primary-700" @click="toggleNav">
            <font-awesome-icon icon="navicon"/>
        </button>

        <div v-show="navIsOpen" class="grid grid-cols-1 gap-y-4 bg-secondary-500">
            <router-link to="/gebruikers" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="user" class="mr-4"/>
                <span>Gebruikers</span>
            </router-link>
            <router-link to="/categorieen" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="filter"  class="mr-4"/>
                <span>Categorieën</span>
            </router-link>
            <router-link to="/locaties" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="location-dot" class="mr-4"/>
                <span>Locaties</span>
            </router-link>
            <router-link to="/menuitems" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="burger" class="mr-4"/>
                <span>Menu Items</span>
            </router-link>
          <router-link to="/qrcode">
            <font-awesome-icon icon="fa-solid fa-qrcode" />
            <span>Qr code</span>
          </router-link>
        </div>
    </nav>

    <nav class="bg-secondary-500 h-screen hidden sm:block">
        <div class="bg-primary-500 flex justify-center items-center">
            <img src="/images/kikker.png" alt="Kikker logo" class="h-12 w-12 my-4 mx-4">
        </div>

        <div class="grid grid-cols-1 gap-y-4 mt-8">
            <router-link to="/gebruikers" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="user" class="mr-4"/>
                <span>Gebruikers</span>
            </router-link>
            <router-link to="/categorieen" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="filter"  class="mr-4"/>
                <span>Categorieën</span>
            </router-link>
            <router-link to="/locaties" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="location-dot" class="mr-4"/>
                <span>Locaties</span>
            </router-link>
            <router-link to="/menuitems" class="px-8 py-2 hover:bg-secondary-700">
                <font-awesome-icon icon="burger" class="mr-4"/>
                <span>Menu Items</span>
            </router-link>
          <router-link to="/qrcode" class="px-8 py-2 hover:bg-secondary-700">
            <font-awesome-icon icon="qrcode" class="mr-4" />
            <span>Qr code</span>
          </router-link>
        </div>
    </nav>
</template>

<style scoped>

</style>