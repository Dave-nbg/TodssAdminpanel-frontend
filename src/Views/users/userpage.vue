<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/vue';
import UserList from "../users/component/UserList.vue";
import {ref} from "vue";
const isOpen = ref(false);

function setIsOpen(value) {
    isOpen.value = value
}
</script>

<template>
    <div class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">

        <nav class="grid-in-nav">
            <TheSidebar></TheSidebar>
        </nav>

        <main class="grid-in-main grid">
            <h1 class="m-auto mt-5 font-bold text-2xl">Gebruikers</h1>

            <div>
                <button @click="setIsOpen(true)" class="bg-primary-500 text-white float-right h-10 p-2 mr-2 rounded">
                    Gebruiker Toevoegen
                </button>
            </div>

            <UserList></UserList>
        </main>
    </div>
</template>