<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/vue';
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

            <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
                <div class="fixed inset-0 bg-black/70" aria-hidden="true"></div>
                <div class="fixed flex items-center inset-0 justify-center">
                    <DialogPanel class="bg-white rounded">
                        <button class="float-right bg-red-700 text-white w-9 h-9 content-center rounded-tr"
                                @click="setIsOpen(false)">X
                        </button>
                        <div class="p-8">
                            <DialogTitle class="text-lg ">Menuitem Aanmaken</DialogTitle>

<!--                            <CategoryCreateForm></CategoryCreateForm>-->
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
        </main>
    </div>
</template>