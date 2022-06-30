<script setup>
import {UserService} from "../service/UserService";

const userService = new UserService();
const props = defineProps({
    users: Array
});
</script>

<template>
    <div class="m-8">
        <table class="table-auto">
            <tr>
                <th class="p-2">Gebruikersnaam</th>
                <th class="p-2">Verwijderen</th>
            </tr>
            <tr v-for="(user, index) in users" :key="index" class="p-2 border my-2">
                <td class="p-2">{{ user.username }}</td>
                <td class="p-2 cursor-pointer" @click="$emit('deleteUser', user)">🗑</td>
            </tr>
        </table>
    </div>
</template>