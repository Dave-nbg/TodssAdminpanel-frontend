<script setup>
const props = defineProps({
    categories: Array
})
</script>

<template>

    <div class="m-8">
        <table>
            <tr>
                <th class="p-2">Naam</th>
                <th class="p-2"></th>
                <th class="p-2"></th>
            </tr>

            <tr v-for="(category, index) in categories" :key="index" class="p-2 border my-2">
                <td class="p-2">{{ category.name }}</td>
                <td class="p-2">
                    <input type="button" @click="$emit('openEditCategory', category)" value="✏️" class="edit cursor-pointer hover:opacity-60">
                </td>
                <td class="p-2">
                    <input type="button" @click="$emit('deleteCategory', category.id)" value="🗑️" class="delete cursor-pointer hover:opacity-60">
                </td>
            </tr>
        </table>
    </div>
</template>>