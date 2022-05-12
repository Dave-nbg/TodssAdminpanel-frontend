<script setup>
import {LocationService} from "./service/locationService";
import {onMounted, ref} from "vue";
import AddLocation from "./components/addLocation.vue";

const locationService = new LocationService();
const locations = ref(null);

onMounted(async () => {
  locations.value = await locationService.getLocations();
});
</script>

<template>

<add-location></add-location>
  <div>
    <p v-for="location in locations">{{location.name}}</p>
  </div>

</template>