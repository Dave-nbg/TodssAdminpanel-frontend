<script setup>
import {onMounted, ref} from "vue";
import {UserService} from "../service/UserService";

const userService = new UserService();
const props = defineProps({
    users: Array
});

async function deleteUser(user) {
    await userService.deleteUser(user);
}

</script>

<template>
    <div class="m-8">
        <table class="table-auto">
            <tr>
                <th>Gebruikersnaam</th>
                <th>Verwijderen</th>
            </tr>
            <tr v-for="(user, index) in users" :key="index" class="p-2 border my-2">
                <td class="p-2">{{ user.username }}</td>
                <td class="p-2 cursor-pointer" @click="deleteUser(user)">🗑</td>
            </tr>
        </table>
    </div>
</template>