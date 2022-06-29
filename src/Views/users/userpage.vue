<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/vue';
import UserList from "../users/component/UserList.vue";
import {ref, onMounted} from "vue";
import {User} from "./domain/User";
import {UserService} from "./service/UserService";

const isOpen = ref(false);
const userService = new UserService();
const users = ref([]);

onMounted(async () => {
    users.value = await userService.getUsers();
});

function setIsOpen(value) {
    isOpen.value = value
}

async function addUser(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = new User(username, password);

    await userService.createUser(user);
    users.value = await userService.getUsers();

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

            <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
                <div class="fixed inset-0 bg-black/70" aria-hidden="true"></div>
                <div class="fixed flex items-center inset-0 justify-center">
                    <DialogPanel class="bg-white rounded">
                        <button class="float-right bg-red-700 text-white w-9 h-9 content-center rounded-tr"
                                @click="setIsOpen(false)">X
                        </button>
                        <div class="p-8">
                            <DialogTitle class="text-lg ">Gebruiker Aanmaken</DialogTitle>


                            <form id="addItemForm" class="mt-8" method="post" @submit="addUser">
                                <div class="flex flex-col mb-10">
                                    <label for="username">Gebruikersnaam</label>
                                    <input id="username" name="username" class="rounded border-2 mt-1 p-2">

                                    <label for="password">Wachtwoord</label>
                                    <input type="password" name="password" id="password" class="rounded border-2 mt-1 p-2">

                                    <button type="submit" class="bg-primary-500 my-2 h-12 rounded p-3">
                                        Gebruiker toevoegen
                                    </button>
                                </div>
                            </form>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>


            <UserList :users="users"></UserList>
        </main>
    </div>
</template>