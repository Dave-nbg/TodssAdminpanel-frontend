<script setup>
import {ref} from "vue";
import {CategoryService} from "../service/CategoryService";
import {CategoryDTO} from "../domain/CategoryDTO";

const categoryService = new CategoryService();
const categoryName = ref("");
const categoryDescription = ref("");

function createCategory() {
    let category = new CategoryDTO(categoryName.value, categoryDescription.value);

    let data = {
        postCategoryDTO: category,
        image: ""
    }

    categoryService.createCategory(data).then(res => {
        console.log(res);
    });
}
</script>

<template>

    <form method="POST" @submit.prevent="createCategory" class="mt-8">

        <div class="flex flex-col">
            <label for="name">Naam</label>
            <input type="text" id="name" name="name" v-model="categoryName" class="rounded border-2 mt-1 p-2">

            <label for="description">Omschrijving</label>
            <textarea name="description" id="description" v-model="categoryDescription" class="rounded border-2 mt-1 p-2"></textarea>

            <button type="submit" name="submit" class="bg-primary-500 my-2 text-white h-12 rounded p-3">Categorie aanmaken</button>
        </div>

    </form>
</template>