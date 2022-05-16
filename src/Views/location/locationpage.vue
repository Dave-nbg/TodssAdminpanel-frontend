<script setup>
import TheSidebar from "../../components/TheSidebar.vue";
import { Dialog,DialogPanel,DialogTitle } from '@headlessui/vue'
import {Location} from "./domain/location";
import Searchbar from "../searchbar/searchbar.vue";
import {onMounted, ref} from "vue";
import {LocationService} from "./service/locationService";
const items = ref(null);
const locationService = new LocationService();
const isOpen = ref(false)
const locations = ref([]);
onMounted(async () => {
  locations.value = await locationService.getLocations();
  const service = new LocationService();
  const getItems = await service.getLocations();
  const array = [];
  getItems.forEach(item => {array.push(item)})
  items.value = array;
});

function setIsOpen(value) {
  isOpen.value = value
}

async function addLocation() {
  let location = new Location(document.querySelector('#locationName').value)

  locationService.postLocation(location).then(response => {
    locations.value.push(new Location(response.name));
  });

  setIsOpen(false);
}

async function editLocation(){
  await locationService.editLocation(1,"test");
  locations.value = await locationService.getLocations();
}

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
              <Searchbar :items="items"></Searchbar>
                <div id="addLocationMenu" class="w-full h-full">
                    <button id="addButton" class="bg-primary-500 text-white float-right h-10 p-2  rounded" @click="setIsOpen(true)">Toevoegen</button>
                </div>
            </div>

            <div v-for="(location, index) in locations" :key="index">
                <label class="opmerking-item" for="opmerking">
                    <span class="ml-10">{{location.name}}</span>
                </label>
                <input type="button" value="✏️" class="edit">
                <input type="button" value="🗑️" class="delete">
            </div>
        </main>


        <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
            <div class="fixed inset-0 bg-black/70" aria-hidden="true"></div>
            <div class="fixed flex items-center inset-0 justify-center">
                <DialogPanel class="bg-white rounded">
                    <button class="float-right bg-red-700 text-white w-9 h-9 content-center rounded-tr" @click="setIsOpen(false)">X</button>
                    <div class="p-8">
                        <DialogTitle class="text-lg ">Locatie Aanmaken</DialogTitle>


                        <form class="mt-8">
                            <div class="flex flex-col mb-10">
                                <label for="locationName">Locatie naam:</label>
                                <input id="locationName" name="locatieNaam" class="rounded border-2 mt-1 p-2" placeholder="Locatie">
                            </div>
                        </form>
                        <button @click="addLocation" class="bg-primary-500 my-2 h-12 rounded p-3">Locatie toevoegen</button>
                    </div>
                </DialogPanel>

            </div>
        </Dialog>
    </div>
</template>