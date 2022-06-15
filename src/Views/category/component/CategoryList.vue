<script setup>
import {onMounted, ref} from "vue";
import {CategoryService} from "../service/CategoryService";
import {Category} from "../domain/Category";

const categoryService = new CategoryService();
const categories = ref([]);

onMounted(async () => {
    categories.value = await categoryService.getCategories();
    console.log(categories.value);
})
</script>

<template>

    <div v-for="(category, index) in categories" :key="index">
        <ul>
            <li>{{ category.name }}</li>
            <li>{{ category.description }}</li>
        </ul>
    </div>
</template>