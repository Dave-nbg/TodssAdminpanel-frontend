<script setup>
import {Location} from "../domain/location";
import {LocationService} from "../service/locationService";


const locationService = new LocationService();

function openLocationMenu(){
  document.querySelector('#location').style.display = "block";
  document.querySelector('#addButton').style.display = "none";
}

function closeScreen(){
  document.querySelector('#location').style.display = "none";
  document.querySelector('#addButton').style.display = "block";
}

function addLocation() {
  let location = new Location(document.querySelector('#locationName').value)
  console.log(location)
  locationService.postLocation(location).then(() => alert('Opslaan is gelukt.')).catch(() => alert('Opslaan is mislukt'));
}


</script>

<template>

  <div id="addLocationMenu" class="w-full h-full">
    <button id="addButton" class="bg-primary-500 text-white float-right m-24 h-10 content-center p-2  rounded" @click="openLocationMenu()">Toevoegen</button>

    <div id="location" class="hidden text-center m-auto bg-gray-300 border-2 rounded">
      <div class="flex flex-col text-center">
        <button class="float-right bg-red-700 text-white w-9 h-9 content-center" @click="closeScreen()">X</button>
        <strong class="mb-10">Locatie toevoegen</strong>
        <form>
          <div class="flex flex-col mb-10">
            <label for="locationName">Locatie naam:</label>
            <input id="locationName" name="locatieNaam" class="rounded broder-2 mx-5" placeholder="Locatie">
          </div>
          <button class="bg-primary-500 my-3 h-12 rounded p-3 w-max" type="button" @click="addLocation">locatie toevoegen</button>
        </form>
      </div>
    </div>

  </div>
</template>