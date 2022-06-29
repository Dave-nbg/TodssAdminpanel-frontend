<script setup>
import TheSidebar from "../../../components/TheSidebar.vue";
import { Dialog,DialogPanel,DialogTitle } from '@headlessui/vue'
import {Location} from "../domain/location";
// import Searchbar from "../searchbar/searchbar.vue";
import {onMounted, ref} from "vue";
import {LocationService} from "../service/locationService";
const items = ref(null);
const locationService = new LocationService();
const isOpen = ref(false)
const locations = ref([]);
let locationIdEdit = ref(0);

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

  locationService.postLocation(location).then(async response => {
    locations.value = await locationService.getLocations();
  });

  setIsOpen(false);
}

async function editLocation(){
  const locationName = document.querySelector('#locationEditName').value
  if(locationName !== ""){
  await locationService.editLocation(locationIdEdit.value,locationName);
  locations.value = await locationService.getLocations();}
  else{
    alert("Er is niks ingevuld.")
  }
}

async function deleteLocation(locationId){
    await locationService.deleteLocation(locationId);
    locations.value = await locationService.getLocations();
}

function openEditMenu(locationId){
  document.querySelector('#locationEdit').style.display = 'block'
  locationIdEdit.value = locationId;
  console.log(locationId)
  console.log(locationIdEdit.value)
}


function closeEditMenu(){
  document.querySelector('#locationEdit').style.display = 'none'
}
</script>

<template>
  <main>
                  <div id="addLocationMenu" class="w-full h-full">
                      <button id="addButton" class="bg-primary-500 text-white float-right h-10 p-2 mr-2 rounded" @click="setIsOpen(true)">Locatie toevoegen</button>
                  </div>

  <div v-for="(location, index) in locations" :key="index">
                  <div class="hidden" id="locationEdit">
                  <input id="locationEditName" class="rounded border-2 m-2">
                  <button class="bg-primary-500 text-white m-2  rounded" @click="editLocation()">Edit locatie</button>
                  <button class="bg-red-700 text-white m-2 w-5" @click="closeEditMenu">X</button>
                </div>
                    <label class="opmerking-item" for="opmerking">
                        <span class="ml-10">{{location.name}}</span>
                    </label>
                    <input type="button" @click="openEditMenu(location.id)" value="✏️" class="edit">
                    <input type="button" value="🗑️" @click="deleteLocation(location.id)" class="delete">

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
</template>