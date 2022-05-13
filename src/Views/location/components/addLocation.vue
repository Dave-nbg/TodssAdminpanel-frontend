<script setup>
import {Location} from "../domain/location";
import {LocationService} from "../service/locationService";
import {onMounted, ref} from "vue";

const locationService = new LocationService();
const locations = ref(null);

onMounted(async () => {
  locations.value = await locationService.getLocations();
});

function openLocationMenu(){
  document.querySelector('#location').style.display = "block";
  document.querySelector('#addButton').style.display = "none";
}

function closeScreen(){
  document.querySelector('#location').style.display = "none";
  document.querySelector('#addButton').style.display = "block";
}

async function addLocation() {
  let location = new Location(document.querySelector('#locationName').value)
  await locationService.postLocation(location);
  locations.value = await locationService.getLocations();
}

async function editLocation(){

  await locationService.editLocation(1,"test");
  locations.value = await locationService.getLocations();
}




</script>

<template>

  <div id="addLocationMenu" class="w-full h-full">
    <button id="addButton" class="bg-primary-500 text-white float-right h-10 p-2  rounded" @click="openLocationMenu()">Toevoegen</button>

    <div id="location" class="hidden text-center bg-gray-300 border-2 rounded">

        <button class="float-right bg-red-700 text-white w-9 h-9 content-center" @click="closeScreen()">X</button>
        <strong class="mb-10">Locatie toevoegen</strong>
        <form>
          <div class="flex flex-col mb-10">
            <label for="locationName">Locatie naam:</label>
            <input id="locationName" name="locatieNaam" class="rounded border-2" placeholder="Locatie">
          </div>
          <button class="bg-primary-500 my-3 h-12 rounded p-3 w-max" type="button" @click="addLocation">locatie toevoegen</button>
        </form>

    </div>


    <div v-for="location in locations">
      <label class="opmerking-item" for="opmerking">
        <span class="ml-10">{{location.name}}</span>
      </label>
      <input type="button" value="✏️" class="edit">
      <input type="button" value="🗑️" class="delete">
    </div>
  </div>
</template>