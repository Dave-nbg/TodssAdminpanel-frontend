<script setup>
import {Category} from "../domain/Category";
import {CategoryService} from "../service/CategoryService";
import {onMounted, ref} from "vue";

const categoryService = new CategoryService();
const categories = ref([]);

onMounted(async () => {
    categories.value = await categoryService.getAllCategories();
});

const props = defineProps({
    category: Object
});

async function editCategory() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    let upperCategory = document.getElementById("upperCategory").value;
    categoryService.updateCategory(new Category(props.category.id, name, description, upperCategory)).then(r => console.log(r));



    // await categoryService.updateCategoryOrder(props.category.id);
}

</script>

<template>
    <form method="POST" class="flex flex-col" @submit.prevent="editCategory">
        <label for="name">Naam</label>
        <input type="text" id="name" name="name" class="rounded border-2 mt-1 p-2">

        <label for="description">Omschrijving</label>
        <textarea name="description" id="description" cols="30" rows="5" class="rounded border-2 mt-1 p-2"></textarea>

        <label for="upperCategory">Hogere categorie</label>
        <select id="upperCategory" name="upperCategory">
            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
        </select>

        <button type="submit" class="bg-primary-500 text-white m-2  rounded">Categorie aanpassen</button>
    </form>

</template>