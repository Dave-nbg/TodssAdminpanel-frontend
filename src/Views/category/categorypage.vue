<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import CategoryList from "../category/component/CategoryList.vue";
import CategoryCreateForm from "../category/component/CategoryCreateForm.vue";
import {CategoryService} from "./service/CategoryService";
import {Dialog, DialogPanel, DialogTitle} from '@headlessui/vue';
import {ref, onMounted} from "vue";

const categoryService = new CategoryService();
const categories = ref([]);
const isOpen = ref(false);

onMounted(async () => {
    categories.value = await categoryService.getCategories();
});

function setIsOpen(value) {
    isOpen.value = value
}

function openEditCategory(category) {
    console.log(category);
}

async function deleteCategory(id) {
    await categoryService.deleteCategory(id);
    categories.value = await categoryService.getCategories();
}

</script>

<template>
    <div class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">
        <nav class="grid-in-nav">
            <TheSidebar></TheSidebar>
        </nav>
        <main class="grid-in-main grid">
            <h1 class="m-auto mt-5 font-bold text-2xl">Categorieën</h1>

            <div>
                <button @click="setIsOpen(true)" class="bg-primary-500 text-white float-right h-10 p-2 mr-2 rounded">
                    Categorie Toevoegen
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

                            <CategoryCreateForm></CategoryCreateForm>
                        </div>
                    </DialogPanel>

                </div>
            </Dialog>
            <CategoryList :categories="categories" @deleteCategory="deleteCategory"></CategoryList>
        </main>

    </div>
</template>