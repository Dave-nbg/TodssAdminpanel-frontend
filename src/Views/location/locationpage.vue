<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import Searchbar from "../searchbar/searchbar.vue";
import {onMounted, ref} from "vue";
import {LocationService} from "./service/locationService";
import AddLocation from "./components/addLocation.vue";
const items = ref(null);
const locationService = new LocationService();
const locations = ref([]);

onMounted(async () => {
  locations.value = await locationService.getLocations();
  const service = new LocationService();
  const getItems = await service.getLocations();
  const array = [];
  getItems.forEach(item => {array.push(item)})
  items.value = array;
});


</script>

<template>

<!--<<<<<<< Updated upstream-->
    <div class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">
        <nav class="grid-in-nav">
            <TheSidebar></TheSidebar>
        </nav>
        <main class="grid-in-main grid">
            <h1 class="m-auto mt-5 font-bold text-2xl">Locatie</h1>
            <div class="flex m-10">
              <Searchbar :items="items" class="m-auto"></Searchbar>
            </div>
          <add-location></add-location>
        </main>

    </div>
</template>