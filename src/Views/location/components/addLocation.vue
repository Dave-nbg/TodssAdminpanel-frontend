<script setup>
import {Location} from "../domain/location";
import {LocationService} from "../service/locationService";
import {onMounted, ref} from "vue";

const locationService = new LocationService();
const locations = ref(null);

onMounted(async () => {
  locations.value = await locationService.getLocations();
});

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




    <div v-for="location in locations">
      <label class="opmerking-item" for="opmerking">
        <span class="ml-10">{{location.name}}</span>
      </label>
      <input type="button" value="✏️" class="edit">
      <input type="button" value="🗑️" class="delete">
    </div>
</template>