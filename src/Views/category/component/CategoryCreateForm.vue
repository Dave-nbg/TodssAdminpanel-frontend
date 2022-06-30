<script setup>
import {ref} from "vue";
import {CategoryService} from "../service/CategoryService";
import {CategoryDTO} from "../domain/CategoryDTO";

const categoryService = new CategoryService();
const categoryName = ref("");
const categoryDescription = ref("");
let url = ref(null);

function createCategory() {
    let category = new CategoryDTO(categoryName.value, categoryDescription.value);
    const file = document.getElementById("categoryImage").files[0]


    categoryService.createCategory(category,file)
}

function previewImage(input) {
  let image = input.target.files[0];
  url.value = URL.createObjectURL(image);
}


</script>

<template>

    <form method="POST" @submit.prevent="createCategory" class="mt-8">

        <div class="flex flex-col">
            <label for="name">Naam</label>
            <input type="text" id="name" name="name" v-model="categoryName" class="rounded border-2 mt-1 p-2">

            <label for="description">Omschrijving</label>
            <textarea name="description" id="description" v-model="categoryDescription" class="rounded border-2 mt-1 p-2"></textarea>

            <label for="itemImage">Upload een afbeelding</label>
            <input type="file" id="categoryImage" name="categoryImage" accept="image/png, .jpg, .jpeg" @change="previewImage">
            <div id="imagePreview" class="py-4">
              <p v-if="url">Afbeelding preview</p>
              <img v-if="url" :src="url" alt="image preview" width="100" height="100"/>
            </div>

            <button type="submit" name="submit" class="bg-primary-500 my-2 text-white h-12 rounded p-3">Categorie aanmaken</button>
        </div>

    </form>
</template>