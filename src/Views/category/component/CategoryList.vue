<script setup>
const props = defineProps({
    categories: Array
})
</script>

<template>

    <div class="m-8">
        <table>
            <tr>
                <th>Naam</th>
                <th>Omschrijving</th>
                <th></th>
                <th></th>
            </tr>

            <tr v-for="(category, index) in categories" :key="index">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                    <input type="button" @click="$emit('openEditCategory', category)" value="✏️" class="edit cursor-pointer hover:opacity-60">
                </td>
                <td>
                    <input type="button" @click="$emit('deleteCategory', category.id)" value="🗑️" class="delete cursor-pointer hover:opacity-60">
                </td>
            </tr>
        </table>
    </div>
</template>>