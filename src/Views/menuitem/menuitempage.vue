<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import Searchbar from "../searchbar/searchbar.vue";
import {onMounted, ref} from "vue";
import {LocationService} from "../location/service/locationService";

const items = ref(null);

onMounted(async () => {
  const array = [];
  getItems.forEach(item => {array.push(item)})
  items.value = array;
});

</script>

<template>
  <div class="grid grid-areas-layout grid-cols-layout grid-rows-layout h-full w-full">
    <nav class="grid-in-nav">
      <TheSidebar></TheSidebar>
    </nav>
    <main class="grid-in-main grid">
      <h1 class="m-auto mt-5 font-bold text-2xl">Menu-items</h1>
      <div class="flex m-10">
        <Searchbar :items="items" class="m-auto"></Searchbar>
      </div>
<!--      <add-location></add-location>-->
    </main>

  </div>

</template>