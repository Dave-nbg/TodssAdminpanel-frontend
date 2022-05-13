<script setup>
import {LocationService} from "../service/locationService";
import {onMounted, ref} from "vue";

const locationService = new LocationService();
const locations = ref(null);

onMounted(async () => {
  locations.value = await locationService.getLocations();
});
</script>

<template>
  <div v-for="location in locations">
    <label class="opmerking-item" for="opmerking">
    <span class="ml-10">{{location.name}}</span>
    </label>
    <input type="button" value="✏️" class="edit">
    <input type="button" value="🗑️" class="delete">
  </div>
</template>